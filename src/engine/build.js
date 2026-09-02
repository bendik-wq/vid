/**
 * The group model.
 *
 * A group is a holding company and the businesses hanging off it. Every business is
 * priced, funded with one of the real structures, integrated with the levers you actually
 * pull, and tested on its own cash before it is allowed into the group.
 */

import { SECTORS_BY_ID, SIZE_BANDS, sizePremium } from '../data/sectors.js';
import { STRUCTURES, STRUCTURES_BY_ID, asFunding, synergyFrom } from '../data/structures.js';
import { config, ceilingFor } from '../data/config.js';
import { annualDebtService } from './valuation.js';

export const DEFAULT_ASSUMPTIONS = {
  taxRate: 0.25,
  capexPct: 0.1,
  organicGrowth: 0.03,
};

/** One business, priced and funded. */
export function priceNode(node, assumptions = {}) {
  const a = { ...DEFAULT_ASSUMPTIONS, ...assumptions };
  const industry = SECTORS_BY_ID[node.industryId] ?? SECTORS_BY_ID.generic;
  const structure = STRUCTURES_BY_ID[node.structureId] ?? STRUCTURES[0];
  const funding = asFunding(structure.id);

  const ebitda = Math.max(0, node.ebitda || 0);
  const multiple = node.multiple ?? industry.low;
  const price = ebitda * multiple;

  const cashNeeded = price * funding.depositPct;
  const sellerNote = price * funding.sellerNotePct;
  const bankDebt = Math.max(0, price - cashNeeded - sellerNote);

  const interestOnly = Boolean(node.interestOnly);
  const fullService =
    annualDebtService(bankDebt, funding.bankRate, funding.bankTermYears) +
    annualDebtService(sellerNote, funding.sellerNoteRate, funding.sellerNoteTermYears, interestOnly);
  const firstYearService = fullService * Math.max(0, (12 - funding.holidayMonths) / 12);

  const synergyRate = synergyFrom(node.levers ?? []);
  const synergy = ebitda * synergyRate;
  const contributed = ebitda + synergy;

  const freeCashFlow = Math.max(0, contributed * (1 - a.capexPct) * (1 - a.taxRate));
  const dscr = fullService > 0 ? freeCashFlow / fullService : Infinity;
  const firstYearDscr = firstYearService > 0 ? freeCashFlow / firstYearService : Infinity;

  return {
    ...node,
    industry, structure, multiple, price, interestOnly,
    cashNeeded, sellerNote, bankDebt,
    service: fullService, firstYearService,
    synergyRate, synergy, contributed,
    freeCashFlow, dscr, firstYearDscr,
    passes: dscr >= config.dscrFloor,
    // The most it could be worth and still cover its own repayments, so a business that
    // fails comes with the price that would fix it rather than just a red mark.
    maxMultiple: fullService > 0 && price > 0 && ebitda > 0
      ? freeCashFlow / (config.dscrFloor * (fullService / price)) / ebitda
      : Infinity,
  };
}

/** The whole group: what it earns, what it owes, what it is worth. */
export function runBuild(group) {
  const assumptions = { ...DEFAULT_ASSUMPTIONS, ...(group.assumptions ?? {}) };
  const nodes = (group.nodes ?? []).map((n) => priceNode(n, assumptions));

  const holdcoEbitda = Math.max(0, group.holdcoEbitda || 0);
  const acquiredEbitda = nodes.reduce((s, n) => s + n.ebitda, 0);
  const synergies = nodes.reduce((s, n) => s + n.synergy, 0);
  const groupProfit = holdcoEbitda + acquiredEbitda + synergies;

  const totalPrice = nodes.reduce((s, n) => s + n.price, 0);
  const cashRequired = nodes.reduce((s, n) => s + n.cashNeeded, 0);
  const debt = nodes.reduce((s, n) => s + n.bankDebt + n.sellerNote, 0);
  const service = nodes.reduce((s, n) => s + n.service, 0);

  const groupFreeCashFlow = Math.max(
    0,
    groupProfit * (1 - assumptions.capexPct) * (1 - assumptions.taxRate),
  );
  const dscr = service > 0 ? groupFreeCashFlow / service : Infinity;

  // The group's ceiling is weighted by where the profit actually comes from.
  const weights = nodes.map((n) => ({ ceiling: ceilingFor(n.industryId), weight: n.contributed }));
  if (holdcoEbitda > 0) weights.push({ ceiling: ceilingFor(group.holdcoIndustry ?? 'generic'), weight: holdcoEbitda });
  const totalWeight = weights.reduce((s, w) => s + w.weight, 0);
  const blendedCeiling = totalWeight > 0
    ? weights.reduce((s, w) => s + w.ceiling * w.weight, 0) / totalWeight
    : ceilingFor('generic');

  const premium = sizePremium(groupProfit);
  const exitMultiple = blendedCeiling + premium;
  const groupValue = groupProfit * exitMultiple;
  const equityValue = Math.max(0, groupValue - debt);
  const blendedEntry = acquiredEbitda > 0 ? totalPrice / acquiredEbitda : 0;

  return {
    nodes, assumptions,
    holdcoEbitda, acquiredEbitda, synergies, groupProfit,
    totalPrice, cashRequired, debt, service,
    groupFreeCashFlow, dscr, passes: dscr >= config.dscrFloor,
    blendedCeiling, premium, exitMultiple, groupValue, equityValue,
    blendedEntry, arbitrage: exitMultiple - blendedEntry,
    // What the group could still absorb before cover breaks.
    headroom: Math.max(0, groupFreeCashFlow / config.dscrFloor - service),
  };
}

/**
 * What your money actually buys.
 *
 * The surprise is that debt cover does not care how big the business is — it cares what
 * multiple you pay. So the answer to "what can I afford" is a price per pound of profit,
 * not a size. Cash only ever buys you the deposit structure.
 */
export function capitalOptions(cash, { industryId = 'generic', stretch = false, assumptions = {} } = {}) {
  const a = { ...DEFAULT_ASSUMPTIONS, ...assumptions };
  const industry = SECTORS_BY_ID[industryId] ?? SECTORS_BY_ID.generic;
  const cashPerPound = (1 - a.capexPct) * (1 - a.taxRate);

  return STRUCTURES.map((s) => {
    const f = asFunding(s.id);
    const bankShare = Math.max(0, 1 - f.depositPct - f.sellerNotePct);

    // Debt service per £1 of price. Because both cash flow and debt service scale with the
    // deal, the size of the business cancels out and what is left is a maximum PRICE per
    // pound of profit. That is the whole answer to "what can I afford".
    const servicePer = (interestOnly) =>
      annualDebtService(bankShare, f.bankRate, f.bankTermYears) +
      annualDebtService(f.sellerNotePct, f.sellerNoteRate, f.sellerNoteTermYears, interestOnly);

    const maxMultiple = servicePer(false) > 0 ? cashPerPound / (config.dscrFloor * servicePer(false)) : Infinity;
    const stretchedMultiple = servicePer(true) > 0 ? cashPerPound / (config.dscrFloor * servicePer(true)) : Infinity;

    const cashLimitedPrice = f.depositPct > 0 ? cash / f.depositPct : Infinity;

    return {
      structure: s,
      maxMultiple: stretch ? stretchedMultiple : maxMultiple,
      plainMultiple: maxMultiple,
      stretchedMultiple,
      clearsIndustryEntry: (stretch ? stretchedMultiple : maxMultiple) >= industry.low,
      industryEntry: industry.low,
      cashLimitedPrice,
      cashLimitedProfit: isFinite(cashLimitedPrice) ? cashLimitedPrice / industry.low : Infinity,
      needsCash: f.depositPct > 0,
      limitedBy: f.depositPct > 0 ? 'your cash' : 'the price you pay, never your cash',
    };
  });
}

/**
 * Twenty years, two paths.
 *
 * Path one: keep the business, grow it, sell it at the end for what it is worth.
 * Path two: use it as the platform and buy others alongside it.
 *
 * Free cash after interest sweeps against debt, which is how these are actually run.
 * Two things stop it running away: acquisitions pause in any year where taking on more
 * would push cover below the floor, and there is a hard cap on how many businesses one
 * group can absorb. Without that cap the maths compounds into a number nobody believes,
 * which costs more credibility than it buys.
 */
export function horizon({
  startingProfit,
  todayValue,
  industryId = 'generic',
  dealsPerYear = 2,
  avgDealProfit = 250_000,
  maxBusinesses = 12,
  entryMultiple,
  structureId = 'vendor',
  synergyRate = 0.15,
  advisoryCost = 0,
  years = 20,
  assumptions = {},
}) {
  const a = { ...DEFAULT_ASSUMPTIONS, ...assumptions };
  const industry = SECTORS_BY_ID[industryId] ?? SECTORS_BY_ID.generic;
  const entry = entryMultiple ?? industry.low;
  const f = asFunding(structureId);
  const blendedRate =
    f.sellerNoteRate * f.sellerNotePct + f.bankRate * Math.max(0, 1 - f.depositPct - f.sellerNotePct);
  const avgTerm = Math.max(f.bankTermYears, f.sellerNoteTermYears);

  const rows = [];
  let aloneProfit = startingProfit;
  let groupProfit = startingProfit;
  let debt = 0;
  let cashIn = advisoryCost;
  let bought = 0;
  let paused = 0;

  for (let year = 1; year <= years; year += 1) {
    aloneProfit *= 1 + a.organicGrowth;
    groupProfit *= 1 + a.organicGrowth;

    const freeCash = Math.max(0, groupProfit * (1 - a.capexPct) * (1 - a.taxRate));
    const service = annualDebtService(debt, blendedRate, avgTerm);

    // Would another year of buying still clear the floor?
    const wouldAdd = dealsPerYear * avgDealProfit * entry * (1 - f.depositPct);
    const wouldService = annualDebtService(debt + wouldAdd, blendedRate, avgTerm);
    const wouldProfit = groupProfit + dealsPerYear * avgDealProfit * (1 + synergyRate);
    const wouldCash = Math.max(0, wouldProfit * (1 - a.capexPct) * (1 - a.taxRate));
    const canBuy = wouldService === 0 || wouldCash / wouldService >= config.dscrFloor;

    const capacityLeft = Math.max(0, maxBusinesses - bought);
    const buying = Math.min(dealsPerYear, capacityLeft);

    if (canBuy && buying > 0) {
      groupProfit += buying * avgDealProfit * (1 + synergyRate);
      debt += buying * avgDealProfit * entry * (1 - f.depositPct);
      cashIn += buying * avgDealProfit * entry * f.depositPct;
      bought += buying;
    } else if (buying > 0) {
      paused += 1;
    }

    // Sweep free cash after interest against the balance.
    const interest = debt * blendedRate;
    debt = Math.max(0, debt - Math.max(0, freeCash - interest));

    const aloneMultiple = ceilingFor(industryId) + sizePremium(aloneProfit);
    const groupMultiple = ceilingFor(industryId) + sizePremium(groupProfit);
    const groupEquity = Math.max(0, groupProfit * groupMultiple - debt);

    rows.push({
      year,
      aloneProfit,
      aloneValue: aloneProfit * aloneMultiple,
      groupProfit,
      groupMultiple,
      groupValue: groupProfit * groupMultiple,
      debt,
      groupEquity,
      businesses: bought,
      cashIn,
      canBuy,
    });
  }

  const at = (y) => rows.find((r) => r.year === y) ?? rows[rows.length - 1];
  const final = rows[rows.length - 1];

  return {
    rows,
    milestones: [3, 5, 10, 20].filter((y) => y <= years).map(at),
    todayValue,
    entry,
    pausedYears: paused,
    businessesBought: bought,
    maxBusinesses,
    totalCashIn: cashIn,
    difference: final.groupEquity - final.aloneValue,
    // Every pound put in, against every pound of extra value out. Large by design when the
    // structures need no deposit — the fee is then genuinely the only cash in the deal.
    returnOnCash: cashIn > 0 ? (final.groupEquity - final.aloneValue) / cashIn : Infinity,
  };
}

/**
 * What you would have to become to get your number.
 *
 * The seller who says "I want fifteen million" is usually not wrong about wanting it — he is
 * wrong about the size of business that gets it. Because the price per pound of profit steps
 * up with scale, this solves backwards: the smallest profit that, at the multiple its own
 * size earns, is worth the number he has in mind. Then it says how many businesses that is.
 */
export function requiredScale({
  targetPrice,
  currentProfit,
  industryId = 'generic',
  avgDealProfit = 250_000,
  dealsPerYear = 2,
  synergyRate = 0.15,
}) {
  // The multiple used here is the best a well-run business in this industry gets, so the
  // answer already assumes the quality problems are fixed too. Anything less and the profit
  // needed is higher still.
  const ceiling = ceilingFor(industryId);
  if (!(targetPrice > 0) || !(ceiling > 0)) return null;

  // Walk the size bands from the bottom: the first one whose own multiple produces a profit
  // that actually sits inside that band is the honest answer.
  let solution = null;
  for (const band of SIZE_BANDS) {
    const multiple = ceiling + band.premium;
    const profit = targetPrice / multiple;
    if (profit >= band.from && profit < band.to) {
      solution = { profit, multiple, band };
      break;
    }
  }
  // No band contains its own answer — the number sits in a gap between two brackets, so it
  // takes the next bracket up and the profit that bracket starts at.
  if (!solution) {
    const band = [...SIZE_BANDS].reverse().find((b) => targetPrice / (ceiling + b.premium) >= b.from)
      ?? SIZE_BANDS[SIZE_BANDS.length - 1];
    solution = { profit: Math.max(band.from, targetPrice / (ceiling + band.premium)), multiple: ceiling + band.premium, band };
  }

  const profitNeeded = Math.max(0, solution.profit - currentProfit);
  const perDeal = avgDealProfit * (1 + synergyRate);
  const businesses = perDeal > 0 ? Math.ceil(profitNeeded / perDeal) : Infinity;
  const years = dealsPerYear > 0 ? Math.ceil(businesses / dealsPerYear) : Infinity;

  return {
    targetPrice,
    currentProfit,
    requiredProfit: solution.profit,
    requiredMultiple: solution.multiple,
    band: solution.band,
    profitNeeded,
    businesses,
    years,
    perDeal,
    // Reaching the number usually means moving up a bracket, not just earning more. That is
    // the part sellers never see coming, so it is called out rather than left to be inferred.
    todayBand: SIZE_BANDS.find((b) => currentProfit >= b.from && currentProfit < b.to) ?? SIZE_BANDS[0],
    bandJump: solution.band.premium > sizePremium(currentProfit),
    ceiling,
    reachable: isFinite(businesses) && businesses >= 0,
    alreadyThere: profitNeeded <= 0,
  };
}

/**
 * Which of the businesses you already own are dragging the rest down.
 *
 * A buyer who has done a dozen deals rarely knows which ones are the problem; the group's
 * average hides it. This names them and prices the drag: what the group is worth now against
 * what it would be worth if the ones that cannot cover their own repayments were fixed.
 */
export function portfolioHealth(group) {
  const now = runBuild(group);
  const failing = now.nodes.filter((n) => !n.passes);
  if (!failing.length) {
    return { ...now, failing: [], drag: 0, worstFirst: [], repriced: now };
  }

  // Repriced: every failing deal bought at the most it could carry instead of what was paid.
  const repriced = runBuild({
    ...group,
    nodes: group.nodes.map((n) => {
      const priced = priceNode(n, group.assumptions);
      return priced.passes ? n : { ...n, multiple: Math.max(0.5, priced.maxMultiple) };
    }),
  });

  return {
    ...now,
    failing,
    repriced,
    drag: repriced.equityValue - now.equityValue,
    overpaid: failing.reduce((s, n) => s + Math.max(0, n.price - n.maxMultiple * n.ebitda), 0),
    worstFirst: [...now.nodes].sort((a, b) => a.dscr - b.dscr),
  };
}

/**
 * Whether a business next door to yours actually merges with it.
 *
 * An electrician buying a roofer is either one van, one office and one customer list, or it is
 * two companies with a shared owner. The difference is which savings genuinely apply to both,
 * so this counts the ones they have in common rather than assuming a percentage.
 */
export function industryFit(platformIndustryId, targetIndustryId) {
  const platform = SECTORS_BY_ID[platformIndustryId] ?? SECTORS_BY_ID.generic;
  const target = SECTORS_BY_ID[targetIndustryId] ?? SECTORS_BY_ID.generic;
  const shared = (target.levers ?? []).filter((l) => (platform.levers ?? []).includes(l));
  const only = (target.levers ?? []).filter((l) => !(platform.levers ?? []).includes(l));
  const possible = (target.levers ?? []).length || 1;

  return {
    platform, target,
    shared, only,
    same: platform.id === target.id,
    score: shared.length / possible,
    verdict: platform.id === target.id
      ? 'The same trade. Everything that can merge, merges.'
      : shared.length >= 3
        ? 'Close enough that most of the savings are real.'
        : shared.length >= 2
          ? 'Some genuine overlap, but not the full set.'
          : 'Different businesses with a shared owner. Expect the savings to be thin.',
  };
}
