import test from 'node:test';
import assert from 'node:assert/strict';

import { tranche, runStack } from '../src/engine/stack.js';
import { blankSource, defaultStack, SOURCE_TYPES } from '../src/data/capital-stack.js';
import { config, resetConfig } from '../src/data/config.js';

test.beforeEach(() => resetConfig());

const seller = (over) => blankSource('seller', { amount: 500_000, rate: 0.05, holidayMonths: 0, ...over });

test('two of the five sources are debt and three are equity', () => {
  assert.deepEqual(SOURCE_TYPES.filter((s) => s.kind === 'debt').map((s) => s.id), ['seller', 'bank']);
  assert.deepEqual(SOURCE_TYPES.filter((s) => s.kind === 'equity').map((s) => s.id), ['cash', 'rollover', 'investor']);
});

test('a loan repaid over its term leaves nothing behind', () => {
  const t = tranche(seller({ mode: 'amortising', termYears: 5, amortYears: 5 }), 8);
  assert.ok(t.balloon < 0.01, `expected no balloon, got ${t.balloon}`);
  assert.ok(t.rows[4].balance < 0.01, 'it should be clear at the end of the term');
  assert.ok(t.totalPaid > 500_000, 'and it should have cost interest along the way');
});

test('paying it down over longer than the term is what creates the lump', () => {
  const short = tranche(seller({ mode: 'amortising', termYears: 5, amortYears: 5 }), 8);
  const long = tranche(seller({ mode: 'balloon', termYears: 5, amortYears: 15 }), 8);
  assert.ok(long.balloon > 300_000, `expected a real lump, got ${long.balloon}`);
  assert.equal(long.balloonYear, 5);
  assert.ok(long.rows[1].payment < short.rows[1].payment, 'the monthly cost is lower, which is the trade');
});

test('interest only owes the whole amount at the end', () => {
  const t = tranche(seller({ mode: 'interest', termYears: 5 }), 8);
  assert.ok(Math.abs(t.balloon - 500_000) < 1);
  assert.ok(Math.abs(t.rows[0].payment - 25_000) < 500, 'a year of interest at 5%');
});

test('paying nothing at all means owing more than you borrowed', () => {
  const t = tranche(seller({ mode: 'bullet', termYears: 5 }), 8);
  assert.equal(t.totalPaid, 0);
  assert.ok(t.balloon > 500_000, 'interest rolls up');
  assert.ok(t.balloon < 700_000, 'but not absurdly');
});

test('a holiday moves the cost, and rolling the interest up costs more than waiving it', () => {
  const none = tranche(seller({ mode: 'amortising', termYears: 6, holidayMonths: 0 }), 8);
  const rolled = tranche(seller({ mode: 'amortising', termYears: 6, holidayMonths: 12, accrueDuringHoliday: true }), 8);
  const waived = tranche(seller({ mode: 'amortising', termYears: 6, holidayMonths: 12, accrueDuringHoliday: false }), 8);

  assert.equal(rolled.rows[0].payment, 0, 'nothing is paid in the first year');
  assert.ok(none.rows[0].payment > 0);
  assert.ok(rolled.balloon > waived.balloon, 'interest that rolls up is still owed');
  assert.ok(waived.balloon >= 0);
});

test('equity is never serviced unless a preferred return was agreed', () => {
  const plain = tranche(blankSource('rollover', { amount: 300_000 }), 5);
  assert.equal(plain.rows.every((r) => r.payment === 0), true);
  const pref = tranche(blankSource('investor', { amount: 300_000, prefRate: 0.08 }), 5);
  assert.ok(Math.abs(pref.rows[0].payment - 24_000) < 1, 'a preferred return is a real cash cost');
});

test('the stack has to add up to the price, and says so when it does not', () => {
  const short = runStack({
    price: 1_000_000, fees: 50_000, ebitda: 250_000,
    sources: [blankSource('seller', { amount: 800_000 })],
  });
  assert.equal(short.balanced, false);
  assert.equal(short.shortfall, 250_000);

  const exact = runStack({
    price: 1_000_000, fees: 50_000, ebitda: 250_000,
    sources: [blankSource('seller', { amount: 1_050_000 })],
  });
  assert.equal(exact.balanced, true);
  assert.equal(exact.shortfall, 0);
});

test('the tightest year is the one that decides it, and it is rarely year one', () => {
  const r = runStack({
    price: 1_000_000, ebitda: 250_000,
    sources: [seller({ amount: 1_000_000, mode: 'amortising', termYears: 6, holidayMonths: 9 })],
  });
  assert.ok(r.worst.year > 1, 'a holiday flatters year one, so the worst year comes later');
  assert.ok(r.minDscr < r.schedule[0].dscrBeforeBalloon);
});

test('a balloon is reported separately from the payments that lead to it', () => {
  const r = runStack({
    price: 1_000_000, ebitda: 250_000,
    sources: [seller({ amount: 1_000_000, mode: 'balloon', termYears: 5, amortYears: 20 })],
  });
  assert.equal(r.balloons.length, 1);
  assert.equal(r.balloons[0].year, 5);
  assert.ok(r.totalBalloon > 600_000);
  // Cover in the balloon year looks fine on payments alone and terrible once the lump lands.
  const balloonYear = r.schedule[4];
  assert.ok(balloonYear.dscrBeforeBalloon > balloonYear.dscr);
  assert.ok(balloonYear.dscr < 1, 'nobody covers a balloon out of one year of profit');
});

test('what you walk away with depends on who owns the equity, not who lent the money', () => {
  const r = runStack({
    price: 1_000_000, ebitda: 250_000, exitYear: 5, exitMultiple: 6,
    sources: [
      blankSource('cash', { amount: 100_000 }),
      blankSource('rollover', { amount: 200_000 }),
      blankSource('investor', { amount: 100_000 }),
      seller({ amount: 600_000, mode: 'amortising', termYears: 6 }),
    ],
  });
  assert.ok(Math.abs(r.yourShare - 0.25) < 1e-9, 'a quarter of the equity was your money');
  const total = r.shares.reduce((s, x) => s + x.proceeds, 0);
  assert.ok(Math.abs(total - r.exitEquity) < 1, 'the split has to add up to what there is');
  assert.ok(r.exitEquity > 0);
  assert.ok(r.yourProceeds > 0 && r.yourProceeds < r.exitEquity);
});

test('a stated equity share overrides the proportional split', () => {
  const r = runStack({
    price: 1_000_000, ebitda: 250_000, exitYear: 5, exitMultiple: 6,
    sources: [
      blankSource('cash', { amount: 50_000, equityPct: 0.7 }),
      blankSource('investor', { amount: 450_000, equityPct: 0.3 }),
      seller({ amount: 500_000 }),
    ],
  });
  assert.ok(Math.abs(r.yourShare - 0.7) < 1e-9, 'you can negotiate a share that is not pro-rata');
});

test('the shipped starting stack is empty and safe to run', () => {
  const r = runStack({ price: 0, ebitda: 0, sources: defaultStack() });
  assert.equal(r.funded, 0);
  assert.ok(Array.isArray(r.schedule));
  assert.equal(r.covers, true, 'nothing owed is trivially covered');
});
