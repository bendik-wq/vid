/**
 * The valuation engine.
 *
 * Two haircuts, not one:
 *   1. EBITDA   claimed EBITDA  →  defensible EBITDA
 *   2. MULTIPLE premium multiple →  achievable multiple
 *
 * Every input belongs to the seller. The engine only does arithmetic on what they typed,
 * which is the entire design: there is nothing here for them to argue with.
 */

import {
  CRITERIA,
  CRITERIA_BY_ID,
  MAX_COMBINED_EBITDA_HAIRCUT,
  MULTIPLE_FLOOR,
} from '../data/criteria.js';
import { ceilingFor, sizePremium } from '../data/sectors.js';

export const DSCR_FLOOR = 1.5;

export const DEFAULT_STRUCTURE = {
  depositPct: 0.2,
  bankRate: 0.09,
  bankTermYears: 7,
  sellerNotePct: 0.3,
  sellerNoteRate: 0.06,
  sellerNoteTermYears: 5,
  // Deferred consideration is frequently interest-only with a bullet at the end. It is the
  // single biggest lever on whether a price is fundable, which is why it is a structure
  // problem and not a price problem.
  sellerNoteInterestOnly: false,
};

export const DEFAULT_FINANCIALS = {
  revenue: 0,
  claimedEbitda: 0,
  ownerSalaryDrawn: 0,
  ownerSalaryAddedBack: 0,
  ownerReplacementCost: 0,
  maintenanceCapex: 0,
  taxRate: 0.25,
};

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/** Proportion of a criterion's impact applied at a given score. 5 → 0, 1 → 1. */
export const severity = (score) => clamp((5 - Number(score)) / 4, 0, 1);

/** Annual payment on a fully amortising loan. */
export function annualDebtService(principal, annualRate, termYears, interestOnly = false) {
  if (principal <= 0 || termYears <= 0) return 0;
  if (interestOnly) return principal * annualRate;
  if (annualRate === 0) return principal / termYears;
  const r = annualRate / 12;
  const n = termYears * 12;
  const monthly = (principal * r) / (1 - Math.pow(1 + r, -n));
  return monthly * 12;
}

/**
 * C1 — owner salary add-back. Computed, not self-scored.
 * The haircut is what it costs to replace the owner, net of any owner pay a buyer
 * already inherits as a cost in the P&L.
 */
export function ownerSalaryHaircut(financials) {
  const { claimedEbitda, ownerSalaryDrawn, ownerSalaryAddedBack, ownerReplacementCost } = financials;
  if (claimedEbitda <= 0) return { amount: 0, fraction: 0, capped: false };
  const stillInPL = Math.max(0, ownerSalaryDrawn - ownerSalaryAddedBack);
  const raw = Math.max(0, ownerReplacementCost - stillInPL);
  const cap = CRITERIA_BY_ID.C1.impact.cap * claimedEbitda;
  const amount = Math.min(raw, cap);
  return { amount, fraction: amount / claimedEbitda, capped: raw > cap, uncapped: raw };
}

/** Every EBITDA haircut, itemised, before and after the combined cap. */
export function ebitdaHaircuts(financials, scores) {
  const lines = [];

  const c1 = ownerSalaryHaircut(financials);
  lines.push({
    id: 'C1',
    name: CRITERIA_BY_ID.C1.name,
    fraction: c1.fraction,
    amount: c1.amount,
    computed: true,
    capped: c1.capped,
  });

  for (const c of CRITERIA) {
    if (c.impact.kind !== 'ebitda') continue;
    const fraction = c.impact.maxHaircut * severity(scores[c.id] ?? 5);
    lines.push({
      id: c.id,
      name: c.name,
      fraction,
      amount: fraction * financials.claimedEbitda,
      score: Number(scores[c.id] ?? 5),
      computed: false,
    });
  }

  const rawFraction = lines.reduce((s, l) => s + l.fraction, 0);
  const appliedFraction = Math.min(rawFraction, MAX_COMBINED_EBITDA_HAIRCUT);
  const capApplied = rawFraction > MAX_COMBINED_EBITDA_HAIRCUT;
  const scale = rawFraction > 0 ? appliedFraction / rawFraction : 0;

  return {
    lines: lines.map((l) => ({
      ...l,
      appliedFraction: l.fraction * scale,
      appliedAmount: l.fraction * scale * financials.claimedEbitda,
    })),
    rawFraction,
    appliedFraction,
    capApplied,
  };
}

/** Every multiple penalty, itemised. */
export function multiplePenalties(scores) {
  const lines = CRITERIA
    .filter((c) => c.impact.kind === 'multiple')
    .map((c) => {
      const score = Number(scores[c.id] ?? 5);
      return {
        id: c.id,
        name: c.name,
        pillar: c.pillar,
        score,
        penalty: c.impact.maxPenalty * severity(score),
        maxPenalty: c.impact.maxPenalty,
      };
    });
  return { lines, total: lines.reduce((s, l) => s + l.penalty, 0) };
}

/** The Capital gate: can a buyer service debt at the price the seller is asking? */
export function dscrAnalysis({ askingPrice, defensibleEbitda, financials, structure }) {
  const s = { ...DEFAULT_STRUCTURE, ...structure };
  const freeCashFlow = Math.max(
    0,
    (defensibleEbitda - financials.maintenanceCapex) * (1 - financials.taxRate),
  );

  // Debt service is linear in price: both tranches are fixed fractions of it.
  const servicePerPound =
    annualDebtService(1 - s.depositPct - s.sellerNotePct, s.bankRate, s.bankTermYears) +
    annualDebtService(s.sellerNotePct, s.sellerNoteRate, s.sellerNoteTermYears, s.sellerNoteInterestOnly);

  const service = servicePerPound * askingPrice;
  const dscr = service > 0 ? freeCashFlow / service : Infinity;
  const maxFundablePrice = servicePerPound > 0 ? freeCashFlow / (DSCR_FLOOR * servicePerPound) : Infinity;

  let gateScore;
  if (dscr < 1.0) gateScore = 1;
  else if (dscr < 1.25) gateScore = 2;
  else if (dscr < DSCR_FLOOR) gateScore = 3;
  else if (dscr < 2.0) gateScore = 4;
  else gateScore = 5;

  return {
    freeCashFlow,
    annualService: service,
    bankDebt: askingPrice * (1 - s.depositPct - s.sellerNotePct),
    sellerNote: askingPrice * s.sellerNotePct,
    deposit: askingPrice * s.depositPct,
    dscr,
    passes: dscr >= DSCR_FLOOR,
    maxFundablePrice,
    gateScore,
    structure: s,
  };
}

/**
 * Run the whole audit.
 * @param {object} input { business, financials, askingPrice, structure, scores, applySizePremium }
 */
export function runAudit(input) {
  const financials = { ...DEFAULT_FINANCIALS, ...input.financials };
  const structure = { ...DEFAULT_STRUCTURE, ...input.structure };
  const scores = input.scores ?? {};
  const askingPrice = Number(input.askingPrice) || 0;
  const sector = input.business?.sector ?? 'generic';

  const haircuts = ebitdaHaircuts(financials, scores);
  const defensibleEbitda = financials.claimedEbitda * (1 - haircuts.appliedFraction);

  const baseCeiling = ceilingFor(sector);
  const premium = input.applySizePremium ? sizePremium(defensibleEbitda) : 0;
  const ceiling = baseCeiling + premium;

  const penalties = multiplePenalties(scores);
  const achievableMultiple = clamp(ceiling - penalties.total, MULTIPLE_FLOOR, ceiling);
  const multipleFloored = ceiling - penalties.total < MULTIPLE_FLOOR;

  const achievableValue = defensibleEbitda * achievableMultiple;
  const dscr = dscrAnalysis({ askingPrice, defensibleEbitda, financials, structure });

  const impliedMultipleAtAsking = defensibleEbitda > 0 ? askingPrice / defensibleEbitda : Infinity;
  const impliedMultipleOnClaimed =
    financials.claimedEbitda > 0 ? askingPrice / financials.claimedEbitda : Infinity;

  return {
    input: { ...input, financials, structure, scores, askingPrice, sector },
    claimedEbitda: financials.claimedEbitda,
    defensibleEbitda,
    haircuts,
    ceiling,
    baseCeiling,
    sizePremium: premium,
    penalties,
    achievableMultiple,
    multipleFloored,
    achievableValue,
    askingPrice,
    gap: askingPrice - achievableValue,
    impliedMultipleAtAsking,
    impliedMultipleOnClaimed,
    dscr,
    // Two independent ceilings on price. Whichever is lower is what a seller actually gets,
    // and which one binds decides the conversation: a quality problem or a structure problem.
    realisticPrice: Math.min(achievableValue, dscr.maxFundablePrice),
    binding: dscr.maxFundablePrice < achievableValue ? 'fundability' : 'quality',
    pillarScores: pillarScores(scores, dscr.gateScore),
  };
}

/** Average self-assessed score per pillar, with the computed DSCR gate folded into Capital. */
export function pillarScores(scores, gateScore) {
  const out = {};
  for (const pillar of ['credibility', 'capital', 'closing']) {
    const items = CRITERIA.filter((c) => c.pillar === pillar);
    const values = items.map((c) => {
      if (c.id === 'C8') return gateScore;
      if (c.impact.kind === 'computed') return null;
      return Number(scores[c.id] ?? 5);
    }).filter((v) => v !== null);
    out[pillar] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 5;
  }
  return out;
}
