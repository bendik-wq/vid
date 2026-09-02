import test from 'node:test';
import assert from 'node:assert/strict';

import { SCENARIOS } from '../src/data/scenarios.js';
import { runAudit } from '../src/engine/valuation.js';
import { runBuild, requiredScale, portfolioHealth, industryFit } from '../src/engine/build.js';
import { SECTORS_BY_ID } from '../src/data/sectors.js';
import { blankAudit, blankGroup } from '../src/ui/state.js';
import { config, resetConfig } from '../src/data/config.js';
import { DEFAULT_FINANCIALS } from '../src/engine/valuation.js';

test.beforeEach(() => resetConfig());

const auditFor = (s) => ({
  ...blankAudit(),
  business: { ...s.audit.business },
  askingPrice: s.audit.askingPrice ?? 0,
  financials: { ...DEFAULT_FINANCIALS, ...s.audit.financials },
  scores: { ...blankAudit().scores, ...(s.audit.scores ?? {}) },
});

test('every situation says something true the moment it opens', () => {
  for (const s of SCENARIOS) {
    const r = runAudit(auditFor(s));
    assert.ok(r.defensibleEbitda > 0, `${s.id} has no provable profit`);
    assert.ok(r.achievableMultiple >= config.multipleFloor, `${s.id} priced below the floor`);
    assert.ok(SECTORS_BY_ID[s.audit.business.sector], `${s.id} names an industry that does not exist`);
    assert.ok(['business', 'build'].includes(s.goto), `${s.id} routes nowhere`);
  }
});

test('the seller who wants too much is told so, and told what would fix it', () => {
  const exit = SCENARIOS.find((s) => s.id === 'exit');
  const r = runAudit(auditFor(exit));
  assert.ok(r.gap > 0, 'the meat exporter should be short of his number');

  const scale = requiredScale({
    targetPrice: r.askingPrice, currentProfit: r.defensibleEbitda,
    industryId: exit.audit.business.sector, avgDealProfit: 500_000, dealsPerYear: 2,
  });
  assert.ok(scale.requiredProfit > r.defensibleEbitda, 'he has to get bigger');
  assert.ok(scale.businesses >= 1);
  assert.ok(scale.years >= 1);
  // The point of the section: reaching the number means a different bracket of buyer.
  assert.equal(scale.bandJump, true);
});

test('a business already big enough is told to fix quality, not buy more', () => {
  const scale = requiredScale({ targetPrice: 3_000_000, currentProfit: 1_500_000, industryId: 'manufacturing' });
  assert.equal(scale.alreadyThere, true);
  assert.equal(scale.businesses, 0);
});

test('the serial acquirer is shown which deals are eating the others', () => {
  const s = SCENARIOS.find((x) => x.id === 'serial');
  const group = { ...blankGroup(), ...s.group, holdcoEbitda: 2_000_000, holdcoIndustry: 'facilities' };
  const health = portfolioHealth(group);
  assert.ok(health.nodes.length >= 5);
  assert.ok(health.failing.length > 0, 'a mixed portfolio should contain some that do not cover');
  assert.ok(health.failing.length < health.nodes.length, 'and some that do');
  assert.ok(health.drag > 0, 'repricing the bad ones should be worth something');
  assert.ok(health.overpaid > 0);
  // Ranked worst first, so the conversation starts with the worst one.
  for (let i = 1; i < health.worstFirst.length; i += 1) {
    assert.ok(health.worstFirst[i - 1].dscr <= health.worstFirst[i].dscr);
  }
});

test('the forecourt portfolio fails cover, which is the whole point of that case', () => {
  const s = SCENARIOS.find((x) => x.id === 'cover');
  const group = { ...blankGroup(), ...s.group, holdcoEbitda: 3_000_000, holdcoIndustry: 'hospitality' };
  const health = portfolioHealth(group);
  assert.equal(health.failing.length, health.nodes.length, 'bought at full price on deposits, none should cover');
  for (const n of health.nodes) assert.ok(n.maxMultiple < n.multiple, 'each should name a lower price');
});

test('a portfolio where everything covers reports no drag', () => {
  const group = {
    ...blankGroup(), holdcoEbitda: 1_000_000, holdcoIndustry: 'trades',
    nodes: [1, 2, 3].map((id) => ({
      id, industryId: 'trades', ebitda: 300_000, multiple: 2.0,
      structureId: 'vendor', levers: ['backoffice', 'buying', 'premises', 'owner'], interestOnly: true,
    })),
  };
  const health = portfolioHealth(group);
  assert.equal(health.failing.length, 0);
  assert.equal(health.drag, 0);
});

test('next door only counts when the same things merge', () => {
  const same = industryFit('trades', 'trades');
  assert.equal(same.same, true);
  assert.equal(same.score, 1);

  const far = industryFit('trades', 'software');
  assert.ok(far.shared.length < (SECTORS_BY_ID.software.levers ?? []).length);
  assert.ok(far.only.length > 0, 'the savings that do not carry across must be named');
  assert.ok(far.score < 1);
});

test('the group screen is reachable from every situation that ships one', () => {
  for (const s of SCENARIOS.filter((x) => x.group)) {
    const group = { ...blankGroup(), ...s.group, holdcoEbitda: 1_000_000, holdcoIndustry: s.audit.business.sector };
    const r = runBuild(group);
    assert.ok(r.nodes.length > 0);
    assert.ok(r.groupProfit > 0);
    assert.ok(isFinite(r.exitMultiple));
  }
});
