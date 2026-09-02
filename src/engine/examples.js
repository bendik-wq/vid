/**
 * Worked examples, computed rather than written.
 *
 * Every figure on the examples screen comes out of the same engines the tool uses on a real
 * case. If a delta is tuned or a floor is moved, the examples move with it — which is the only
 * way a worked example stays honest once anyone starts editing the assumptions behind it.
 */

import { runAudit, DEFAULT_FINANCIALS } from './valuation.js';
import { runBuild, requiredScale, portfolioHealth, capitalOptions, horizon, industryFit } from './build.js';
import { repairPlan, blankRepair } from './repair.js';
import { CRITERIA } from '../data/criteria.js';
import { SECTORS_BY_ID } from '../data/sectors.js';
import { config } from '../data/config.js';

const auditOf = (scenario) => ({
  business: { ...scenario.audit.business },
  askingPrice: scenario.audit.askingPrice ?? 0,
  financials: { ...DEFAULT_FINANCIALS, ...scenario.audit.financials },
  structure: undefined,
  applySizePremium: true,
  scores: {
    ...Object.fromEntries(CRITERIA.filter((c) => c.impact.kind !== 'computed').map((c) => [c.id, 3])),
    ...(scenario.audit.scores ?? {}),
  },
});

const groupOf = (scenario, holdcoEbitda) => ({
  holdcoEbitda,
  holdcoIndustry: scenario.audit.business.sector,
  nodes: scenario.group?.nodes ?? [],
  nextId: scenario.group?.nextId ?? 1,
  assumptions: {},
});

/**
 * One example: the situation, what it looks like now, what one change does, and the lesson.
 * Every `rows` entry is a before/after pair ready to draw.
 */
export function workedExample(scenario) {
  const audit = runAudit(auditOf(scenario));
  const remedy = scenario.remedy ?? { kind: 'none', label: '—' };
  const base = {
    id: scenario.id,
    voice: scenario.voice,
    pain: scenario.pain,
    detail: scenario.detail,
    remedy: remedy.label,
    audit,
  };

  if (remedy.kind === 'scale') {
    const scale = requiredScale({
      targetPrice: audit.askingPrice,
      currentProfit: audit.defensibleEbitda,
      industryId: scenario.audit.business.sector,
      avgDealProfit: remedy.avgDealProfit,
      dealsPerYear: remedy.dealsPerYear,
    });
    return {
      ...base,
      kind: 'scale',
      scale,
      rows: [
        { label: 'Profit you can prove', before: audit.defensibleEbitda, after: scale.requiredProfit, fmt: 'money' },
        { label: 'What buyers pay for it', before: audit.achievableMultiple, after: scale.requiredMultiple, fmt: 'turns' },
        { label: 'What it is worth', before: audit.achievableValue, after: audit.askingPrice, fmt: 'money' },
        { label: 'Who is bidding', before: scale.todayBand.who, after: scale.band.who, fmt: 'text' },
      ],
      lesson: `The number was never the problem. ${scale.businesses} more businesses over ${scale.years} `
        + `year${scale.years === 1 ? '' : 's'} and the same trade sells into a different room.`,
    };
  }

  if (remedy.kind === 'reprice') {
    const health = portfolioHealth(groupOf(scenario, audit.defensibleEbitda));
    return {
      ...base,
      kind: 'reprice',
      health,
      rows: [
        { label: 'Businesses that cannot pay for themselves', before: `${health.failing.length} of ${health.nodes.length}`, after: '0', fmt: 'text' },
        { label: 'Group cover', before: health.dscr, after: health.repriced.dscr, fmt: 'turns' },
        { label: 'What the group is worth', before: health.equityValue, after: health.repriced.equityValue, fmt: 'money' },
        { label: 'Overpaid', before: health.overpaid, after: 0, fmt: 'money' },
      ],
      lesson: `The average said the group was fine. Priced one at a time, ${health.failing.length} of them `
        + `were eating what the rest earned — worth ${health.drag > 0 ? Math.round(health.drag) : 0} in group value.`,
    };
  }

  if (remedy.kind === 'structure') {
    const options = capitalOptions(0, { industryId: remedy.industryId });
    const deposit = options.find((o) => o.needsCash);
    const vendor = options.find((o) => !o.needsCash);
    const industry = SECTORS_BY_ID[remedy.industryId] ?? SECTORS_BY_ID.generic;
    const dealPrice = audit.defensibleEbitda * industry.low;
    return {
      ...base,
      kind: 'structure',
      options,
      rows: [
        { label: 'Cash needed to buy one like yours', before: dealPrice * 0.2, after: 0, fmt: 'money' },
        { label: 'What limits how much you can pay', before: 'your cash', after: 'the price and the terms', fmt: 'text' },
        { label: 'Deals you can do at once', before: 'one, if that', after: 'as many as cover allows', fmt: 'text' },
        // The lever is the terms, not the structure: the same money stretched buys a much higher price.
        { label: 'Most you can pay, if the seller takes interest only', before: vendor.plainMultiple, after: vendor.stretchedMultiple, fmt: 'turns' },
      ],
      lesson: 'Cover does not care how big the business is. It cares what you pay and how long you get '
        + 'to pay it — and neither of those is your bank balance.',
    };
  }

  if (remedy.kind === 'repair') {
    const group = groupOf(scenario, audit.defensibleEbitda);
    const plan = repairPlan(group, { ...blankRepair(), chosen: remedy.actions });
    return {
      ...base,
      kind: 'repair',
      plan,
      rows: [
        { label: 'Owed', before: plan.before.debt, after: plan.after.debt, fmt: 'money' },
        { label: 'Repayments a year', before: plan.before.service, after: plan.after.service, fmt: 'money' },
        { label: 'Cover', before: plan.before.cover, after: plan.after.cover, fmt: 'turns' },
        { label: 'Cash it cost', before: 0, after: plan.cashIn, fmt: 'money' },
      ],
      lesson: `Nothing about the sites changed. ${Math.round(plan.serviceSaved).toLocaleString()} a year `
        + `stopped leaving the business because the terms changed, not the trading.`,
    };
  }

  if (remedy.kind === 'build') {
    const h = horizon({
      startingProfit: audit.defensibleEbitda,
      todayValue: audit.achievableValue,
      industryId: scenario.audit.business.sector,
      dealsPerYear: scenario.future?.dealsPerYear ?? 2,
      avgDealProfit: scenario.future?.avgDealProfit ?? 400_000,
      maxBusinesses: scenario.future?.maxBusinesses ?? 10,
      structureId: scenario.future?.structureId ?? 'vendor',
      synergyRate: scenario.future?.synergyRate ?? 0.15,
      advisoryCost: scenario.future?.advisoryCost ?? 0,
      years: remedy.years ?? 10,
    });
    const end = h.rows[h.rows.length - 1];
    return {
      ...base,
      kind: 'build',
      horizon: h,
      rows: [
        { label: 'Profit', before: audit.defensibleEbitda, after: end.groupProfit, fmt: 'money' },
        { label: 'Businesses', before: '1', after: String(end.businesses + 1), fmt: 'text' },
        { label: `Worth in year ${end.year}`, before: end.aloneValue, after: end.groupEquity, fmt: 'money' },
        { label: 'Your money in', before: 0, after: h.totalCashIn, fmt: 'money' },
      ],
      lesson: `An established business is the strongest thing anyone can buy from: its own profit is what `
        + `covers the first few deals until they cover themselves.`,
    };
  }

  if (remedy.kind === 'merge') {
    const group = groupOf(scenario, audit.defensibleEbitda);
    const target = group.nodes[0];
    const fit = industryFit(scenario.audit.business.sector, target?.industryId ?? 'generic');
    const apart = runBuild({ ...group, nodes: group.nodes.map((n) => ({ ...n, levers: [] })) });
    const together = runBuild(group);
    return {
      ...base,
      kind: 'merge',
      fit,
      rows: [
        { label: 'Things that genuinely merge', before: '0', after: String(fit.shared.length), fmt: 'text' },
        { label: 'Profit together', before: apart.groupProfit, after: together.groupProfit, fmt: 'money' },
        { label: 'Cover on the new one', before: apart.nodes[0]?.dscr ?? Infinity, after: together.nodes[0]?.dscr ?? Infinity, fmt: 'turns' },
        { label: 'What the group is worth', before: apart.equityValue, after: together.equityValue, fmt: 'money' },
      ],
      lesson: fit.same
        ? 'Same trade, so one office, one yard and one set of vans do the work of two.'
        : `Only ${fit.shared.length} of the savings carry across. Claim the rest and you are buying a `
          + 'second company, not a bigger one.',
    };
  }

  return { ...base, kind: 'none', rows: [], lesson: '' };
}

export const allExamples = (scenarios) => scenarios.map(workedExample);
