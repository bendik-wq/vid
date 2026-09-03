import test from 'node:test';
import assert from 'node:assert/strict';

import { runOrg, blankOrg, scoresWith, filledSeats } from '../src/engine/org.js';
import { ROLES, ROLES_BY_ID, rolesForTier, BOARD_EQUITY } from '../src/data/roles.js';
import { runAudit, DEFAULT_FINANCIALS } from '../src/engine/valuation.js';
import { BROKER_CASE } from '../src/data/cases.js';
import { blankAudit } from '../src/ui/state.js';
import { resetConfig } from '../src/data/config.js';

test.beforeEach(() => resetConfig());

const audit = () => ({
  ...blankAudit(),
  business: { ...BROKER_CASE.business },
  askingPrice: BROKER_CASE.askingPrice,
  financials: { ...DEFAULT_FINANCIALS, ...BROKER_CASE.financials },
  scores: { ...blankAudit().scores, ...BROKER_CASE.scores },
});

test('a board is paid in equity and costs no cash at all', () => {
  const board = rolesForTier('board');
  assert.equal(board.length, 4);
  for (const role of board) {
    assert.equal(role.cost, 0, `${role.title} should not cost salary`);
    assert.ok(role.equityPct > 0, `${role.title} should cost equity`);
  }
  const r = runOrg({ audit: audit(), org: { ...blankOrg(), board: board.map((b) => b.id) } });
  assert.equal(r.salaries, 0, 'a full board takes nothing off the profit');
  assert.ok(Math.abs(r.equityGiven - BOARD_EQUITY) < 1e-9);
  assert.equal(r.boardCostsNothing, true);
  assert.ok(r.valueGain > 0, 'and it still moves the number');
});

test('management is paid in salary, and everyone else is not', () => {
  for (const role of ROLES.filter((r) => r.tier !== 'board')) {
    assert.ok(role.cost > 0, `${role.title} should have a salary`);
    assert.ok(!role.equityPct, `${role.title} should not take equity`);
  }
});

test('hiring the person who replaces you is not charged twice', () => {
  const base = audit();
  const withGm = runOrg({ audit: base, org: { ...blankOrg(), units: { platform: ['gm'] } } });

  // The audit was already deducting the cost of replacing the owner. Once a manager is hired
  // and paid, that cost is a salary in the accounts — it cannot also be an unpriced adjustment.
  const c1Before = withGm.before.haircuts.lines.find((l) => l.id === 'C1');
  const c1After = withGm.after.haircuts.lines.find((l) => l.id === 'C1');
  assert.ok(c1After.amount < c1Before.amount, 'the replacement cut has to shrink');
  assert.ok(withGm.valueGain > 0, `hiring a manager should be worth something, got ${withGm.valueGain}`);
});

test('a general manager is the single best thing you can buy', () => {
  const r = runOrg({ audit: audit(), org: blankOrg() });
  const gm = r.marginal.find((m) => m.role.id === 'gm');
  assert.ok(gm.worth > gm.cost, 'it has to be worth more than it costs');
  assert.ok(gm.worth / gm.cost > 3, `expected a large multiple of the salary, got ${(gm.worth / gm.cost).toFixed(1)}x`);
  // Nothing paid in salary should beat it.
  const salaried = r.marginal.filter((m) => m.cost > 0);
  assert.equal(salaried[0].role.id, 'gm');
});

test('a whole team costs real money and is still worth having', () => {
  const org = {
    board: rolesForTier('board').map((r) => r.id),
    holdco: ['groupmd', 'groupfd'],
    units: { platform: ['gm', 'ops', 'unitfinance'] },
  };
  const r = runOrg({ audit: audit(), org });
  assert.ok(r.salaries > 300_000, 'it is not cheap');
  assert.ok(r.valueGain > 0, `the team has to earn its keep, got ${r.valueGain}`);
  assert.ok(r.after.achievableValue > r.before.achievableValue);
});

test('seats only move the audit when they touch your own business', () => {
  const base = audit().scores;
  const mine = scoresWith({ ...blankOrg(), units: { platform: ['gm'] } }, base);
  const theirs = scoresWith({ ...blankOrg(), units: { 7: ['gm'] } }, base);
  assert.ok(mine.C15 > base.C15, 'a manager in your business moves management depth');
  assert.equal(theirs.C15, base.C15, 'a manager in a business you bought does not');
});

test('no score is ever pushed past five', () => {
  const org = {
    board: rolesForTier('board').map((r) => r.id),
    holdco: rolesForTier('holdco').map((r) => r.id),
    units: { platform: rolesForTier('unit').map((r) => r.id) },
  };
  const scores = scoresWith(org, audit().scores);
  for (const [id, value] of Object.entries(scores)) {
    assert.ok(value <= 5, `${id} went to ${value}`);
    assert.ok(value >= 1);
  }
});

test('empty seats and unmanaged businesses are named, not glossed over', () => {
  const r = runOrg({ audit: audit(), org: blankOrg(), units: [{ id: '1' }, { id: '2' }] });
  assert.equal(r.gaps.length, rolesForTier('board').filter((x) => x.essential).length
    + rolesForTier('holdco').filter((x) => x.essential).length);
  assert.equal(r.unmanaged.length, 2, 'both bought businesses have nobody running them');

  const managed = runOrg({
    audit: audit(),
    org: { ...blankOrg(), units: { 1: ['gm'], 2: ['gm'] } },
    units: [{ id: '1' }, { id: '2' }],
  });
  assert.equal(managed.unmanaged.length, 0);
});

test('the hiring plan covers every role exactly once, in stages', () => {
  const r = runOrg({ audit: audit(), org: blankOrg() });
  const planned = r.plan.flatMap((p) => p.roles.map((x) => x.id));
  assert.equal(planned.length, ROLES.length);
  assert.equal(new Set(planned).size, ROLES.length, 'no role appears in two stages');
  // The board comes before anything that costs money, which is the point of the framework.
  const first = r.plan[0];
  assert.ok(first.roles.every((x) => x.tier === 'board'), 'the first stage should be the board');
  assert.equal(first.cost, 0);
});

test('filled seats report where they sit', () => {
  const seats = filledSeats({ board: ['chair'], holdco: ['groupfd'], units: { platform: ['gm'], 3: ['ops'] } });
  assert.equal(seats.length, 4);
  assert.equal(seats.find((s) => s.role.id === 'chair').where, 'board');
  assert.equal(seats.find((s) => s.role.id === 'ops').unit, '3');
  assert.ok(seats.every((s) => ROLES_BY_ID[s.role.id]));
});
