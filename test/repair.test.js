import test from 'node:test';
import assert from 'node:assert/strict';

import { repairPlan, blankRepair, debtBook, REPAIR_ACTIONS } from '../src/engine/repair.js';
import { runBuild } from '../src/engine/build.js';
import { workedExample, allExamples } from '../src/engine/examples.js';
import { SCENARIOS } from '../src/data/scenarios.js';
import { config, resetConfig } from '../src/data/config.js';
import { blankGroup } from '../src/ui/state.js';

test.beforeEach(() => resetConfig());

/** The forecourt portfolio: bought at full price on bank terms, and it shows. */
const broken = () => {
  const s = SCENARIOS.find((x) => x.id === 'cover');
  return { ...blankGroup(), ...s.group, holdcoEbitda: 2_572_500, holdcoIndustry: 'hospitality' };
};

const withActions = (group, chosen) => repairPlan(group, { ...blankRepair(), chosen });

test('the debt book lists every tranche across every business', () => {
  const group = broken();
  const built = runBuild(group);
  const book = debtBook(built);
  assert.ok(book.length >= built.nodes.length, 'at least one tranche per business');
  const total = book.reduce((s, t) => s + t.amount, 0);
  assert.ok(Math.abs(total - built.debt) < 1, 'and it has to add up to what the group owes');
});

test('a badly structured group is caught before anything is done to it', () => {
  const plan = repairPlan(broken(), blankRepair());
  assert.ok(plan.before.cover < config.dscrFloor, `expected it to fail cover, got ${plan.before.cover}`);
  assert.equal(plan.fixed, false);
  assert.equal(plan.steps.length, 1, 'no actions means one step');
});

test('every lever is at least neutral, and none of them changes the trading', () => {
  const group = broken();
  const base = repairPlan(group, blankRepair());
  for (const action of REPAIR_ACTIONS) {
    const plan = withActions(group, [action.id]);
    assert.ok(plan.after.cover >= base.before.cover - 1e-9, `${action.id} made cover worse`);
    assert.ok(plan.after.profit <= base.before.profit + 1e-9, 'no lever invents profit');
  }
});

test('stretching the term and paying interest only both cut the payments', () => {
  const group = broken();
  const base = repairPlan(group, blankRepair());
  for (const id of ['extend', 'interestOnly']) {
    const plan = withActions(group, [id]);
    assert.ok(plan.after.service < base.before.service, `${id} should cut the payments`);
    assert.equal(plan.after.debt, base.before.debt, `${id} must not repay a penny of the balance`);
    assert.equal(plan.deferred, true, 'and it has to be flagged as deferral, not repayment');
  }
});

test('refinancing replaces the whole book with one facility', () => {
  const plan = withActions(broken(), ['refinance']);
  assert.equal(plan.book.length, 1);
  assert.equal(plan.book[0].label, 'One consolidated facility');
  assert.ok(Math.abs(plan.after.debt - plan.before.debt) < 1, 'the money owed does not change, only the terms');
});

test('selling the worst takes its profit as well as its debt', () => {
  const group = broken();
  const base = repairPlan(group, blankRepair());
  const plan = withActions(group, ['divest']);
  assert.equal(plan.sold.length, 1);
  assert.ok(plan.after.profit < base.before.profit, 'the profit goes with it');
  assert.ok(plan.after.debt < base.before.debt, 'and so does more of the debt');
});

test('putting your own money in is the lever that buys the least', () => {
  const group = broken();
  const cash = withActions(group, ['inject']);
  const free = withActions(group, ['interestOnly']);
  assert.ok(cash.cashIn > 0, 'it costs you cash');
  assert.ok(free.cashIn === 0, 'and the strongest lever costs none');
  assert.ok(free.after.cover > cash.after.cover, 'the free lever should also do more');
});

test('the levers stack, and each step is reported on the way', () => {
  const plan = withActions(broken(), ['renegotiate', 'extend', 'refinance']);
  assert.equal(plan.steps.length, 4, 'the starting point plus one step per action');
  assert.equal(plan.steps[0].name, 'As it stands');
  assert.ok(plan.after.cover > plan.before.cover);
  assert.ok(plan.coverGain > 0);
});

test('a group that already covers is left alone rather than alarmed', () => {
  const healthy = {
    ...blankGroup(), holdcoEbitda: 3_000_000, holdcoIndustry: 'trades',
    nodes: [{ id: 1, industryId: 'trades', ebitda: 300_000, multiple: 2, structureId: 'vendor',
      levers: ['backoffice'], interestOnly: true }],
  };
  const plan = repairPlan(healthy, blankRepair());
  assert.ok(plan.before.cover >= config.dscrFloor);
  assert.equal(plan.fixed, true);
});

test('every worked example computes, with a before and an after for each row', () => {
  const examples = allExamples(SCENARIOS);
  assert.equal(examples.length, SCENARIOS.length);
  for (const ex of examples) {
    assert.ok(ex.rows.length >= 3, `${ex.id} has too little to show`);
    assert.ok(ex.lesson.length > 20, `${ex.id} has no lesson`);
    assert.ok(ex.remedy && ex.remedy !== '—', `${ex.id} has no remedy`);
    for (const row of ex.rows) {
      assert.ok(row.before !== undefined && row.after !== undefined, `${ex.id}: ${row.label} is half a row`);
      for (const v of [row.before, row.after]) {
        if (typeof v === 'number') assert.ok(isFinite(v), `${ex.id}: ${row.label} is not a finite number`);
      }
    }
  }
});

test('the examples move when the assumptions behind them move', () => {
  const exit = SCENARIOS.find((s) => s.id === 'exit');
  const before = workedExample(exit);
  config.ceilings.manufacturing = 12;
  const after = workedExample(exit);
  resetConfig();
  assert.notEqual(before.rows[1].after, after.rows[1].after,
    'a tuned industry price has to reach the worked example');
});
