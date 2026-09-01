/**
 * Roll-up engine — multiple arbitrage.
 *
 * You buy small at a small-business multiple, you sell the group at a group multiple.
 * The spread between the two is the return; the debt is what makes it a return on
 * very little equity. Everything here is checked against the same DSCR floor the
 * audit uses, because a roll-up that cannot service its debt is not a strategy.
 */

import { ceilingFor, sizePremium } from '../data/sectors.js';
import { annualDebtService, DSCR_FLOOR, DEFAULT_STRUCTURE } from './valuation.js';

export const DEFAULT_ROLLUP = {
  sector: 'generic',
  platformEbitda: 1_000_000,
  platformMultiple: 4.5,
  boltOnCount: 4,
  boltOnEbitda: 400_000,
  boltOnMultiple: 3.0,
  synergyPct: 0.15,
  holdingYears: 5,
  taxRate: 0.25,
  maintenanceCapexPct: 0.1,
  structure: DEFAULT_STRUCTURE,
};

/** Outstanding balance on an amortising loan after `yearsElapsed`. */
export function remainingBalance(principal, annualRate, termYears, yearsElapsed, interestOnly = false) {
  if (principal <= 0 || termYears <= 0) return 0;
  if (interestOnly) return yearsElapsed >= termYears ? 0 : principal;
  if (yearsElapsed >= termYears) return 0;
  if (annualRate === 0) return principal * (1 - yearsElapsed / termYears);
  const r = annualRate / 12;
  const n = termYears * 12;
  const k = Math.min(n, yearsElapsed * 12);
  const payment = (principal * r) / (1 - Math.pow(1 + r, -n));
  return principal * Math.pow(1 + r, k) - payment * ((Math.pow(1 + r, k) - 1) / r);
}

/** One acquisition, funded and stress-tested on its own cash flow. */
export function priceDeal({ ebitda, multiple, structure, taxRate, maintenanceCapexPct }) {
  const s = { ...DEFAULT_STRUCTURE, ...structure };
  const price = ebitda * multiple;
  const deposit = price * s.depositPct;
  const sellerNote = price * s.sellerNotePct;
  const bankDebt = price - deposit - sellerNote;

  const service =
    annualDebtService(bankDebt, s.bankRate, s.bankTermYears) +
    annualDebtService(sellerNote, s.sellerNoteRate, s.sellerNoteTermYears, s.sellerNoteInterestOnly);

  const freeCashFlow = Math.max(0, (ebitda * (1 - maintenanceCapexPct)) * (1 - taxRate));
  const dscr = service > 0 ? freeCashFlow / service : Infinity;

  return {
    price, deposit, sellerNote, bankDebt, service, freeCashFlow,
    dscr, passes: dscr >= DSCR_FLOOR, structure: s,
  };
}

export function runRollup(inputRaw) {
  const input = { ...DEFAULT_ROLLUP, ...inputRaw };
  const structure = { ...DEFAULT_STRUCTURE, ...(inputRaw?.structure ?? {}) };
  const common = { structure, taxRate: input.taxRate, maintenanceCapexPct: input.maintenanceCapexPct };

  const platform = priceDeal({ ebitda: input.platformEbitda, multiple: input.platformMultiple, ...common });

  const boltOns = Array.from({ length: input.boltOnCount }, (_, i) => ({
    index: i + 1,
    ...priceDeal({ ebitda: input.boltOnEbitda, multiple: input.boltOnMultiple, ...common }),
    ebitda: input.boltOnEbitda,
  }));

  const acquiredEbitda = input.platformEbitda + input.boltOnCount * input.boltOnEbitda;
  const synergies = input.boltOnCount * input.boltOnEbitda * input.synergyPct;
  const combinedEbitda = acquiredEbitda + synergies;

  const totalPrice = platform.price + boltOns.reduce((s, b) => s + b.price, 0);
  const equityInvested = platform.deposit + boltOns.reduce((s, b) => s + b.deposit, 0);
  const blendedEntryMultiple = acquiredEbitda > 0 ? totalPrice / acquiredEbitda : 0;

  const exitMultiple = ceilingFor(input.sector) + sizePremium(combinedEbitda);
  const exitEnterpriseValue = combinedEbitda * exitMultiple;

  const deals = [platform, ...boltOns];
  const debtAtClose = deals.reduce((s, d) => s + d.bankDebt + d.sellerNote, 0);
  const scheduledDebtAtExit = deals.reduce((sum, d) => {
    return (
      sum +
      remainingBalance(d.bankDebt, structure.bankRate, structure.bankTermYears, input.holdingYears) +
      remainingBalance(
        d.sellerNote, structure.sellerNoteRate, structure.sellerNoteTermYears,
        input.holdingYears, structure.sellerNoteInterestOnly,
      )
    );
  }, 0);

  const groupService = deals.reduce((s, d) => s + d.service, 0);
  const groupFreeCashFlow = Math.max(
    0,
    (combinedEbitda * (1 - input.maintenanceCapexPct)) * (1 - input.taxRate),
  );
  const groupDscr = groupService > 0 ? groupFreeCashFlow / groupService : Infinity;

  // Debt only comes down if the cash is actually there to pay it. A model that amortises
  // debt the business cannot service manufactures a return out of nothing.
  const scheduledPrincipalRepaid = debtAtClose - scheduledDebtAtExit;
  const cumulativeService = groupService * input.holdingYears;
  const cumulativeInterest = Math.max(0, cumulativeService - scheduledPrincipalRepaid);
  const cashForPrincipal = groupFreeCashFlow * input.holdingYears - cumulativeInterest;
  const principalRepaid = Math.min(scheduledPrincipalRepaid, Math.max(0, cashForPrincipal));
  const debtAtExit = debtAtClose - principalRepaid;
  const cashShortfall = Math.max(0, scheduledPrincipalRepaid - principalRepaid);

  const exitEquityValue = Math.max(0, exitEnterpriseValue - debtAtExit);
  const moic = equityInvested > 0 ? exitEquityValue / equityInvested : Infinity;
  const irr = equityInvested > 0 && input.holdingYears > 0
    ? Math.pow(exitEquityValue / equityInvested, 1 / input.holdingYears) - 1
    : 0;

  return {
    input, platform, boltOns,
    acquiredEbitda, synergies, combinedEbitda,
    totalPrice, equityInvested, blendedEntryMultiple,
    exitMultiple, exitEnterpriseValue, exitEquityValue,
    debtAtClose, debtAtExit, principalRepaid, scheduledPrincipalRepaid, cashShortfall,
    moic, irr,
    feasible: groupDscr >= DSCR_FLOOR,
    arbitrage: exitMultiple - blendedEntryMultiple,
    group: {
      service: groupService,
      freeCashFlow: groupFreeCashFlow,
      dscr: groupDscr,
      passes: groupDscr >= DSCR_FLOOR,
      headroom: groupFreeCashFlow - groupService * DSCR_FLOOR,
    },
    // What the arbitrage is made of, in pounds of enterprise value.
    waterfall: [
      { label: 'Platform at entry', value: input.platformEbitda * input.platformMultiple },
      { label: 'Bolt-ons at entry', value: input.boltOnCount * input.boltOnEbitda * input.boltOnMultiple },
      { label: 'Synergy EBITDA at exit multiple', value: synergies * exitMultiple },
      {
        label: 'Multiple re-rating on acquired EBITDA',
        value: acquiredEbitda * exitMultiple - totalPrice,
      },
    ],
  };
}

/** Largest bolt-on the group can absorb before group DSCR breaches the floor. */
export function absorptionCapacity(result) {
  const { input, group } = result;
  const s = { ...DEFAULT_STRUCTURE, ...(input.structure ?? {}) };
  const headroomService = Math.max(0, group.freeCashFlow / DSCR_FLOOR - group.service);
  const servicePerPound =
    annualDebtService(1 - s.depositPct - s.sellerNotePct, s.bankRate, s.bankTermYears) +
    annualDebtService(s.sellerNotePct, s.sellerNoteRate, s.sellerNoteTermYears, s.sellerNoteInterestOnly);
  const price = servicePerPound > 0 ? headroomService / servicePerPound : 0;
  return {
    price,
    ebitda: input.boltOnMultiple > 0 ? price / input.boltOnMultiple : 0,
    equityNeeded: price * s.depositPct,
  };
}
