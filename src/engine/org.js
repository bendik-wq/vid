/**
 * The people, priced.
 *
 * Hiring is the only thing in this tool that costs profit and buys value at the same time,
 * which is exactly why owners put it off: the cost lands this month and the value lands at
 * exit. Putting both on the same line is the whole point of this module.
 *
 * A board is the exception and the reason the framework works — it is bought with equity, so
 * it moves credibility without touching the profit at all.
 */

import { ROLES, ROLES_BY_ID, STAGES, rolesForTier } from '../data/roles.js';
import { runAudit } from './valuation.js';

export const blankOrg = () => ({ board: [], holdco: [], units: {} });

/** Every seat that has somebody in it, with where they sit. */
export function filledSeats(org) {
  const seats = [];
  for (const id of org.board ?? []) seats.push({ role: ROLES_BY_ID[id], where: 'board', unit: null });
  for (const id of org.holdco ?? []) seats.push({ role: ROLES_BY_ID[id], where: 'holdco', unit: null });
  for (const [unit, ids] of Object.entries(org.units ?? {})) {
    for (const id of ids) seats.push({ role: ROLES_BY_ID[id], where: 'unit', unit });
  }
  return seats.filter((s) => s.role);
}

/**
 * The scores the audit would have once these people are in place.
 *
 * Only the seats that touch your own business count: the board, head office, and whoever runs
 * the business being audited. Somebody managing a business you bought is a real cost and a
 * real risk if the seat is empty, but it does not change what YOUR business scores.
 */
export function scoresWith(org, baseScores, platformUnit = 'platform') {
  const scores = { ...baseScores };
  for (const seat of filledSeats(org)) {
    const touchesAudit = seat.where !== 'unit' || seat.unit === platformUnit;
    if (!touchesAudit) continue;
    for (const [criterion, points] of Object.entries(seat.role.moves ?? {})) {
      scores[criterion] = Math.min(5, (Number(scores[criterion]) || 0) + points);
    }
  }
  return scores;
}

const salaryOf = (seats) => seats.reduce((s, x) => s + (x.role.cost || 0), 0);
const equityOf = (seats) => seats.reduce((s, x) => s + (x.role.equityPct || 0), 0);

/**
 * The audit as it stands once these people are paid.
 *
 * Two things happen at once and only one of them is obvious. The salaries come off the profit
 * — that is the visible cost. But management hired into your own business IS the replacement
 * the audit was already deducting for, so the same job cannot be charged twice: once as a
 * salary you now pay, and again as a cost a buyer would have to bear. Whatever you have hired
 * counts against the replacement, and only the shortfall is still deducted.
 */
function auditWith(audit, org, platformUnit, extraSalary = 0) {
  const seats = filledSeats(org);
  const salaries = salaryOf(seats) + extraSalary;
  const replacing = seats
    .filter((s) => s.where === 'holdco' || (s.where === 'unit' && s.unit === platformUnit))
    .reduce((sum, x) => sum + (x.role.cost || 0), 0) + extraSalary;

  return runAudit({
    ...audit,
    financials: {
      ...audit.financials,
      claimedEbitda: Math.max(0, audit.financials.claimedEbitda - salaries),
      // Counts as owner pay that stays in the P&L, which is exactly what it now is.
      ownerSalaryDrawn: (audit.financials.ownerSalaryDrawn || 0) + replacing,
    },
    scores: scoresWith(org, audit.scores, platformUnit),
  });
}

/**
 * What the team you have drawn costs, what it is worth, and what is still missing.
 *
 * @param {object} input audit (the platform business), org, and the units that exist
 */
export function runOrg({ audit, org = blankOrg(), units = [], platformUnit = 'platform' }) {
  const seats = filledSeats(org);
  const salaries = salaryOf(seats);
  const equityGiven = equityOf(seats);

  const before = runAudit(audit);
  const after = auditWith(audit, org, platformUnit);

  /** One seat at a time, from where you are now: what it costs and what it is worth. */
  const marginal = ROLES.map((role) => {
    const already = seats.some((s) => s.role.id === role.id && (role.tier !== 'unit' || s.unit === platformUnit));
    const trial = {
      ...org,
      board: role.tier === 'board' ? [...new Set([...(org.board ?? []), role.id])] : org.board,
      holdco: role.tier === 'holdco' ? [...new Set([...(org.holdco ?? []), role.id])] : org.holdco,
      units: role.tier === 'unit'
        ? { ...org.units, [platformUnit]: [...new Set([...(org.units?.[platformUnit] ?? []), role.id])] }
        : org.units,
    };
    const withRole = auditWith(audit, trial, platformUnit, 0);
    const worth = withRole.achievableValue - after.achievableValue;
    return {
      role,
      already,
      cost: role.cost || 0,
      equityPct: role.equityPct || 0,
      worth,
      // A salary is paid every year; the value it unlocks is paid once, at exit.
      payback: role.cost > 0 && worth > 0 ? role.cost / worth : 0,
    };
  }).sort((a, b) => b.worth - a.worth);

  // Essential seats that nobody is in. A board seat missing is a credibility problem; a unit
  // with no manager is you, personally, being the management team.
  const gaps = [];
  for (const tier of ['board', 'holdco']) {
    for (const role of rolesForTier(tier).filter((r) => r.essential)) {
      if (!(org[tier] ?? []).includes(role.id)) gaps.push({ role, where: tier, unit: null });
    }
  }
  const unmanaged = [];
  for (const unit of units) {
    const has = (org.units?.[unit.id] ?? []).includes('gm');
    if (!has) unmanaged.push(unit);
  }

  const plan = STAGES.map((stage) => {
    const wanted = ROLES.filter((r) => r.stage === stage.id);
    const done = wanted.filter((r) => seats.some((s) => s.role.id === r.id));
    return {
      stage,
      roles: wanted,
      done: done.length,
      cost: wanted.reduce((s, r) => s + (r.cost || 0), 0),
      equity: wanted.reduce((s, r) => s + (r.equityPct || 0), 0),
      complete: done.length === wanted.length,
    };
  });

  return {
    seats, salaries, equityGiven,
    before, after,
    valueGain: after.achievableValue - before.achievableValue,
    profitCost: salaries,
    marginal,
    gaps,
    unmanaged,
    plan,
    boardComplete: rolesForTier('board').every((r) => (org.board ?? []).includes(r.id)),
    // The framework's own claim, made checkable: a full board costs no cash at all.
    boardCostsNothing: seats.filter((s) => s.where === 'board').every((s) => (s.role.cost || 0) === 0),
  };
}
