/**
 * Restructure engine.
 *
 * The audit tells a seller what their business is worth. This tells them what each fix
 * is worth, so the conversation stops being "your price is wrong" and becomes
 * "here is the sequence that closes the gap". That is a structure problem, not a price
 * problem — which is the mandate.
 */

import { CRITERIA, CRITERIA_BY_ID } from '../data/criteria.js';
import { runAudit } from './valuation.js';

/** Value of the business if one criterion moved to `target`, all else unchanged. */
function valueWithScore(input, criterionId, target) {
  const scores = { ...(input.scores ?? {}), [criterionId]: target };
  return runAudit({ ...input, scores }).achievableValue;
}

/**
 * Every fix, priced.
 * `fullUplift` moves the criterion to 5. `nextStepUplift` moves it one point.
 * Effort is the criterion's own months/difficulty; the ratio is what sequences the plan.
 */
export function remediationPlan(input) {
  const base = runAudit(input);
  const items = [];

  for (const c of CRITERIA) {
    if (c.impact.kind === 'computed') continue;
    const current = Number(input.scores?.[c.id] ?? 5);
    if (current >= 5) continue;

    const fullUplift = valueWithScore(input, c.id, 5) - base.achievableValue;
    const nextStepUplift = valueWithScore(input, c.id, Math.min(5, current + 1)) - base.achievableValue;
    const months = c.effort.months || 1;

    items.push({
      id: c.id,
      name: c.name,
      pillar: c.pillar,
      currentScore: current,
      fullUplift,
      nextStepUplift,
      months,
      difficulty: c.effort.difficulty,
      valuePerMonth: fullUplift / months,
      // Cheap and fast beats large and slow when a seller has a horizon.
      priority: fullUplift / (months * c.effort.difficulty),
      anchorNow: c.anchors[current] ?? c.anchors[3],
      anchorTarget: c.anchors[5],
      why: c.why,
    });
  }

  items.sort((a, b) => b.priority - a.priority);

  const totalRecoverable = items.reduce((s, i) => s + i.fullUplift, 0);

  return {
    base,
    items,
    totalRecoverable,
    horizons: {
      // What is reachable inside each window if the work runs in parallel.
      months6: items.filter((i) => i.months <= 6),
      months12: items.filter((i) => i.months <= 12),
      months24: items.filter((i) => i.months <= 24),
    },
  };
}

/** Value reachable within a time horizon, assuming parallel workstreams. */
export function valueAtHorizon(input, months) {
  const scores = { ...(input.scores ?? {}) };
  for (const c of CRITERIA) {
    if (c.impact.kind === 'computed') continue;
    if ((c.effort.months || 0) <= months) scores[c.id] = 5;
  }
  return runAudit({ ...input, scores });
}

/** The three-point picture a seller sees: today, 12 months, 24 months. */
export function restructureTrajectory(input) {
  const now = runAudit(input);
  return [
    { label: 'Today', months: 0, result: now },
    { label: '12 months', months: 12, result: valueAtHorizon(input, 12) },
    { label: '24 months', months: 24, result: valueAtHorizon(input, 24) },
  ];
}

/** Named summary of a single fix, for the report. */
export function describeFix(id) {
  const c = CRITERIA_BY_ID[id];
  return c ? { name: c.name, question: c.question, target: c.anchors[5], why: c.why } : null;
}
