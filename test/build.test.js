import test from 'node:test';
import assert from 'node:assert/strict';

import { runBuild, priceNode, capitalOptions, horizon } from '../src/engine/build.js';
import { STRUCTURES, STRUCTURES_BY_ID, synergyFrom, MAX_SYNERGY } from '../src/data/structures.js';
import { SECTORS_BY_ID } from '../src/data/sectors.js';
import { config, resetConfig } from '../src/data/config.js';

test.beforeEach(() => resetConfig());

const node = (over = {}) => ({
  id: 1, industryId: 'trades', ebitda: 300_000, multiple: 2.5, structureId: 'vendor', levers: [], ...over,
});

test('three of the four structures need none of the buyer’s money', () => {
  const free = STRUCTURES.filter((s) => s.depositPct === 0);
  assert.equal(free.length, 3);
  for (const s of free) {
    assert.equal(priceNode(node({ structureId: s.id })).cashNeeded, 0);
  }
  assert.ok(priceNode(node({ structureId: 'deposit' })).cashNeeded > 0);
});

test('a payment holiday only moves the first year, never the real cover', () => {
  const n = priceNode(node({ structureId: 'vendor' }));
  assert.equal(STRUCTURES_BY_ID.vendor.holidayMonths, 9);
  assert.ok(n.firstYearService < n.service);
  assert.ok(n.firstYearDscr > n.dscr, 'the holiday should flatter year one');
});

test('merging adds profit, and only the levers you actually pull', () => {
  const bare = priceNode(node({ levers: [] }));
  const merged = priceNode(node({ levers: ['backoffice', 'buying'] }));
  assert.equal(bare.synergy, 0);
  assert.equal(merged.synergyRate, synergyFrom(['backoffice', 'buying']));
  assert.ok(merged.contributed > bare.contributed);

  const everything = priceNode(node({ levers: STRUCTURES.map(() => '') .concat(['backoffice', 'buying', 'premises', 'owner', 'crosssell', 'systems']) }));
  assert.ok(Math.abs(everything.synergyRate - MAX_SYNERGY) < 1e-9);
});

test('the group is worth more per pound than the businesses in it', () => {
  const g = runBuild({
    holdcoEbitda: 500_000, holdcoIndustry: 'trades',
    nodes: [node(), node({ id: 2, ebitda: 250_000, structureId: 'blend' })],
  });
  assert.ok(g.exitMultiple > g.blendedEntry, 'no arbitrage means no strategy');
  assert.ok(g.arbitrage > 0);
  assert.equal(g.cashRequired, 0, 'vendor and blend structures need no deposit');
  assert.ok(g.groupProfit > g.holdcoEbitda + g.acquiredEbitda - 1, 'synergies should be included');
});

test('the group ceiling follows where the profit actually comes from', () => {
  const trades = runBuild({ holdcoEbitda: 0, nodes: [node({ industryId: 'trades' })] });
  const software = runBuild({ holdcoEbitda: 0, nodes: [node({ industryId: 'software' })] });
  assert.ok(software.blendedCeiling > trades.blendedCeiling);
});

test('what you can pay does not depend on how big the business is', () => {
  const small = capitalOptions(0, { industryId: 'trades' });
  const same = capitalOptions(5_000_000, { industryId: 'trades' });
  for (let i = 0; i < small.length; i += 1) {
    if (!small[i].needsCash) {
      assert.equal(small[i].maxMultiple, same[i].maxMultiple,
        'the deposit-free structures should not care what cash you hold');
    }
  }
});

test('stretching the terms raises what a buyer can pay', () => {
  const plain = capitalOptions(0, { industryId: 'trades', stretch: false });
  const stretched = capitalOptions(0, { industryId: 'trades', stretch: true });
  for (let i = 0; i < plain.length; i += 1) {
    assert.ok(stretched[i].maxMultiple >= plain[i].maxMultiple - 1e-9);
  }
  assert.ok(stretched[0].maxMultiple > plain[0].maxMultiple);
});

test('a lower cover floor lets a buyer pay more', () => {
  const strict = capitalOptions(0, { industryId: 'trades' })[0].maxMultiple;
  config.dscrFloor = 1.2;
  const loose = capitalOptions(0, { industryId: 'trades' })[0].maxMultiple;
  assert.ok(loose > strict);
  resetConfig();
});

test('cash only ever buys the deposit structure, and buys a fixed amount of profit', () => {
  const options = capitalOptions(200_000, { industryId: 'trades' });
  const deposit = options.find((o) => o.needsCash);
  const industry = SECTORS_BY_ID.trades;
  assert.equal(deposit.cashLimitedPrice, 200_000 / 0.2);
  assert.equal(deposit.cashLimitedProfit, (200_000 / 0.2) / industry.low);
  for (const o of options.filter((x) => !x.needsCash)) {
    assert.equal(o.cashLimitedPrice, Infinity);
  }
});

test('twenty years: the group beats going it alone, and stops where it is told', () => {
  const h = horizon({
    startingProfit: 500_000, todayValue: 2_000_000, industryId: 'trades',
    dealsPerYear: 2, avgDealProfit: 250_000, maxBusinesses: 12, advisoryCost: 50_000,
  });
  const final = h.rows[h.rows.length - 1];
  assert.equal(h.rows.length, 20);
  assert.equal(h.businessesBought, 12, 'it must stop at the integration cap');
  assert.ok(final.groupEquity > final.aloneValue);
  assert.ok(h.difference > 0);
  assert.ok(h.milestones.map((m) => m.year).join() === '3,5,10,20');
});

test('buying nothing means the two roads are the same road', () => {
  const h = horizon({
    startingProfit: 500_000, todayValue: 2_000_000, industryId: 'trades',
    dealsPerYear: 0, maxBusinesses: 0,
  });
  const final = h.rows[h.rows.length - 1];
  assert.equal(h.businessesBought, 0);
  assert.ok(Math.abs(final.groupEquity - final.aloneValue) < 1e-6);
});

test('debt never goes negative and profit never goes backwards', () => {
  const h = horizon({
    startingProfit: 200_000, todayValue: 600_000, industryId: 'hospitality',
    dealsPerYear: 4, avgDealProfit: 400_000, maxBusinesses: 20,
  });
  for (const row of h.rows) {
    assert.ok(row.debt >= 0, `debt went negative in year ${row.year}`);
    assert.ok(row.groupProfit > 0);
    assert.ok(row.groupEquity >= 0);
  }
});

test('interest only turns a deal that cannot cover itself into one that can', () => {
  const amortising = priceNode(node({ industryId: 'healthcare', multiple: 4 }));
  const deferred = priceNode(node({ industryId: 'healthcare', multiple: 4, interestOnly: true }));
  assert.equal(amortising.passes, false, 'a 4x healthcare deal should not cover on amortising terms');
  assert.ok(deferred.dscr > amortising.dscr);
  assert.equal(deferred.passes, true);
  assert.equal(deferred.price, amortising.price, 'the price must not move — only the terms');
});

test('a failing deal reports the price that would fix it', () => {
  const n = priceNode(node({ industryId: 'healthcare', multiple: 4 }));
  assert.ok(n.maxMultiple < n.multiple, 'the fix should be a lower price');
  const fixed = priceNode(node({ industryId: 'healthcare', multiple: n.maxMultiple }));
  assert.ok(Math.abs(fixed.dscr - config.dscrFloor) < 1e-6, `paying the stated price should land on the floor, got ${fixed.dscr}`);
});

test('the platform carries deals that cannot yet carry themselves', () => {
  const weak = node({ industryId: 'healthcare', multiple: 4 });
  const alone = runBuild({ holdcoEbitda: 0, nodes: [weak] });
  const withPlatform = runBuild({ holdcoEbitda: 900_000, holdcoIndustry: 'trades', nodes: [weak] });
  assert.equal(alone.passes, false);
  assert.equal(withPlatform.passes, true);
  assert.equal(withPlatform.nodes[0].passes, false, 'the deal itself is unchanged');
});
