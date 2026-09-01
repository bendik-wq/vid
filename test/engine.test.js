import test from 'node:test';
import assert from 'node:assert/strict';

import { runAudit, severity, annualDebtService } from '../src/engine/valuation.js';
import { config, resetConfig, deltaFor, tuningSummary } from '../src/data/config.js';
import { remediationPlan, restructureTrajectory } from '../src/engine/restructure.js';
import { BROKER_CASE, PREPARED_CASE } from '../src/data/cases.js';
import { CRITERIA, CRITERIA_BY_ID, MULTIPLE_FLOOR, MAX_COMBINED_EBITDA_HAIRCUT } from '../src/data/criteria.js';

const DSCR_FLOOR = 1.5;

// Every test starts from the shipped defaults; the tuning tests restore them when done.
test.beforeEach(() => resetConfig());

test('severity scales impact from full at 1 to none at 5', () => {
  assert.equal(severity(1), 1);
  assert.equal(severity(3), 0.5);
  assert.equal(severity(5), 0);
});

test('debt service on a known amortising loan', () => {
  // £100k at 9% over 7 years ≈ £1,609/month.
  const annual = annualDebtService(100_000, 0.09, 7);
  assert.ok(Math.abs(annual / 12 - 1609) < 5, `got ${annual / 12}`);
});

test('CALIBRATION — broker case lands near Josh’s own $500k figure', () => {
  const r = runAudit(BROKER_CASE);
  // He says the business is "realistically at $500,000 in profit".
  assert.ok(
    Math.abs(r.defensibleEbitda - 500_000) / 500_000 < 0.1,
    `defensible EBITDA ${r.defensibleEbitda} is more than 10% from Josh's $500k`,
  );
  // The owner salary add-back alone must account for the full $250k replacement cost.
  const c1 = r.haircuts.lines.find((l) => l.id === 'C1');
  assert.equal(c1.amount, 250_000);
});

test('broker case: the ask is unfundable and the gap is the product', () => {
  const r = runAudit(BROKER_CASE);
  assert.ok(r.dscr.dscr < 1.0, `DSCR ${r.dscr.dscr} should be below 1.0x`);
  assert.equal(r.dscr.passes, false);
  assert.ok(r.impliedMultipleAtAsking > 8, `implied ${r.impliedMultipleAtAsking}x should be absurd`);
  assert.ok(r.gap > 3_000_000, `gap ${r.gap} should exceed $3m`);
  assert.equal(r.binding, 'fundability');
});

test('a restructured seller beats the same business on every axis', () => {
  const bad = runAudit(BROKER_CASE);
  const good = runAudit(PREPARED_CASE);
  assert.ok(good.defensibleEbitda > bad.defensibleEbitda);
  assert.ok(good.achievableMultiple > bad.achievableMultiple);
  assert.ok(good.achievableValue > bad.achievableValue * 2);
});

test('worst possible business floors, it does not go negative', () => {
  const scores = Object.fromEntries(CRITERIA.map((c) => [c.id, 1]));
  const r = runAudit({ ...BROKER_CASE, scores });
  assert.equal(r.achievableMultiple, MULTIPLE_FLOOR);
  assert.ok(r.multipleFloored);
  assert.ok(r.haircuts.appliedFraction <= MAX_COMBINED_EBITDA_HAIRCUT + 1e-9);
  assert.ok(r.achievableValue > 0);
});

test('a perfect business takes no haircut and no penalty', () => {
  const scores = Object.fromEntries(CRITERIA.map((c) => [c.id, 5]));
  const r = runAudit({
    ...BROKER_CASE,
    scores,
    financials: { ...BROKER_CASE.financials, ownerSalaryAddedBack: 0, ownerReplacementCost: 0 },
  });
  assert.equal(r.haircuts.appliedFraction, 0);
  assert.equal(r.penalties.total, 0);
  assert.equal(r.achievableMultiple, r.ceiling);
});

test('EBITDA haircut cap binds and rescales the itemised lines', () => {
  const scores = Object.fromEntries(CRITERIA.map((c) => [c.id, 1]));
  const r = runAudit({ ...BROKER_CASE, scores });
  assert.ok(r.haircuts.capApplied);
  const summed = r.haircuts.lines.reduce((s, l) => s + l.appliedFraction, 0);
  assert.ok(Math.abs(summed - MAX_COMBINED_EBITDA_HAIRCUT) < 1e-9);
});

test('max fundable price is exactly the price that hits the DSCR floor', () => {
  const r = runAudit(BROKER_CASE);
  const atCap = runAudit({ ...BROKER_CASE, askingPrice: r.dscr.maxFundablePrice });
  assert.ok(Math.abs(atCap.dscr.dscr - DSCR_FLOOR) < 1e-6, `got ${atCap.dscr.dscr}`);
});

test('remediation plan prices every open fix and ranks it', () => {
  const plan = remediationPlan(BROKER_CASE);
  assert.ok(plan.items.length > 10);
  assert.ok(plan.items.every((i) => i.fullUplift >= 0));
  for (let i = 1; i < plan.items.length; i += 1) {
    assert.ok(plan.items[i - 1].priority >= plan.items[i].priority);
  }
  assert.ok(plan.totalRecoverable > 0);
});

test('restructure trajectory only ever improves', () => {
  const [now, y1, y2] = restructureTrajectory(BROKER_CASE);
  assert.ok(y1.result.achievableValue >= now.result.achievableValue);
  assert.ok(y2.result.achievableValue >= y1.result.achievableValue);
});






test('an interest-only seller note is a structure fix, not a price cut', () => {
  const amortising = runAudit(BROKER_CASE);
  const deferred = runAudit({
    ...BROKER_CASE,
    structure: { sellerNoteInterestOnly: true },
  });
  assert.equal(deferred.askingPrice, amortising.askingPrice);
  assert.ok(deferred.dscr.dscr > amortising.dscr.dscr);
  assert.ok(deferred.dscr.maxFundablePrice > amortising.dscr.maxFundablePrice);
  // The quality ceiling is untouched — structure never fixes a bad business.
  assert.equal(deferred.achievableValue, amortising.achievableValue);
});



test('tuning a delta moves the valuation and is reported as drift', () => {
  const before = runAudit(BROKER_CASE);
  config.deltas.C15 = 1.2; // management depth, doubled
  const after = runAudit(BROKER_CASE);
  assert.ok(after.achievableMultiple < before.achievableMultiple);
  assert.equal(deltaFor(CRITERIA_BY_ID.C15), 1.2);
  assert.equal(tuningSummary().count, 1);
  resetConfig();
  assert.equal(tuningSummary().count, 0);
  assert.equal(runAudit(BROKER_CASE).achievableMultiple, before.achievableMultiple);
});

test('tuning a sector ceiling moves only that sector', () => {
  config.ceilings.trades = 9;
  const trades = runAudit({ ...BROKER_CASE, business: { sector: 'trades' } });
  const generic = runAudit(BROKER_CASE);
  assert.equal(trades.baseCeiling, 9);
  assert.equal(generic.baseCeiling, 7);
  resetConfig();
});

test('tuning the DSCR floor moves the gate and the fundable price', () => {
  const before = runAudit(BROKER_CASE);
  config.dscrFloor = 1.0;
  const after = runAudit(BROKER_CASE);
  assert.ok(after.dscr.maxFundablePrice > before.dscr.maxFundablePrice);
  assert.equal(after.dscr.passes, after.dscr.dscr >= 1.0);
  resetConfig();
});

test('a saved configuration rejects values that are not finite numbers', async () => {
  const { applyConfig } = await import('../src/data/config.js');
  applyConfig({ dscrFloor: 'nonsense', deltas: { C15: null, NOPE: 3 }, ceilings: { trades: 4 } });
  assert.equal(config.dscrFloor, 1.5);
  assert.equal(config.deltas.C15, undefined);
  assert.equal(config.deltas.NOPE, undefined);
  assert.equal(config.ceilings.trades, 4);
  resetConfig();
});

test('each pillar is worth something on its own, and the marginals do not oversum', async () => {
  const { pillarUplift } = await import('../src/engine/restructure.js');
  const ups = pillarUplift(BROKER_CASE);
  assert.equal(ups.length, 3);
  assert.ok(ups.every((u) => u.value >= 0));
  assert.ok(ups.some((u) => u.value > 0));

  // The pillars compound: value is earnings x multiple, so lifting the base and lifting the
  // multiple together is worth more than the two marginals added up.
  const all = Object.fromEntries(CRITERIA.map((c) => [c.id, 5]));
  const together = runAudit({ ...BROKER_CASE, scores: all }).achievableValue - runAudit(BROKER_CASE).achievableValue;
  const summed = ups.reduce((s, u) => s + u.value, 0);
  assert.ok(together > summed, `combined fix ${together} should exceed the summed marginals ${summed}`);
});

test('total recoverable is the combined fix, not the sum of the parts', () => {
  const plan = remediationPlan(BROKER_CASE);
  const summed = plan.items.reduce((s, i) => s + i.fullUplift, 0);
  assert.ok(plan.totalRecoverable > summed, 'the programme should beat the sum of its fixes');

  // And it must agree with the 24-month horizon, which fixes everything reachable by then.
  const [, , y2] = restructureTrajectory(BROKER_CASE);
  assert.ok(y2.result.achievableValue <= plan.base.achievableValue + plan.totalRecoverable + 1e-6);
});
