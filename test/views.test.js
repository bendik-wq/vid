import test from 'node:test';
import assert from 'node:assert/strict';

import { businessView, buildView, dealView, repairView, teamView, differenceView, examplesView, tuneView, methodView, dock, threeCStrip } from '../src/ui/views.js';
import { runAudit } from '../src/engine/valuation.js';
import { esc } from '../src/ui/format.js';
import { state, loadBrokerCase, blankAudit } from '../src/ui/state.js';

const VIEWS = { businessView, buildView, dealView, repairView, teamView, differenceView, examplesView, tuneView, methodView };
// The dock is deliberately empty until there are earnings, so it is checked on its own.
const ALL = { ...VIEWS, dock };

test('every view renders for the calibration case without leaking undefined or NaN', () => {
  loadBrokerCase();
  for (const [name, view] of Object.entries(ALL)) {
    const html = view();
    assert.ok(html.length > 400, `${name} rendered almost nothing`);
    assert.ok(!html.includes('undefined'), `${name} leaked "undefined"`);
    assert.ok(!html.includes('NaN'), `${name} leaked "NaN"`);
    assert.ok(!/\[object Object\]/.test(html), `${name} leaked an object`);
  }
});

test('every view renders for an empty audit', () => {
  state.audit = blankAudit();
  for (const [name, view] of Object.entries(VIEWS)) {
    const html = view();
    assert.ok(html.length > 400, `${name} rendered almost nothing`);
    assert.ok(!html.includes('NaN'), `${name} leaked "NaN" on empty input`);
  }
});

test('the business screen states the gap and the cover verdict', () => {
  loadBrokerCase();
  const html = businessView();
  assert.ok(/covers the repayments \d+\.\d\dx over/.test(html), 'loan cover sentence missing');
  assert.ok(html.includes('unpayable'), 'the worked example should be called unpayable');
  assert.ok(!/EBITDA|DSCR|multiple arbitrage/.test(html), 'the value screen should avoid jargon');
  assert.ok(html.includes('<svg'), 'the value screen should carry figures');
});

test('the three C strip names all three pillars and what each costs', () => {
  loadBrokerCase();
  const html = threeCStrip(runAudit(state.audit));
  for (const name of ['Credibility', 'Capital', 'Closing']) {
    assert.ok(html.includes(name), `${name} missing from the 3C strip`);
  }
  assert.ok(html.includes('cover'), 'Capital should report the loan cover');
  assert.ok(/data-pillar="closing"/.test(html));
});

test('the difference screen ships the scrubber it needs to animate', () => {
  loadBrokerCase();
  const html = differenceView();
  for (const id of ['race', 'race-rect', 'race-dot-group', 'race-dot-alone', 'year', 'play',
                    'fig-alone', 'fig-group', 'fig-count', 'fig-year', 'fig-mult', 'chips']) {
    assert.ok(html.includes(`id="${id}"`), `the scrubber needs #${id}`);
  }
  assert.ok(/data-scale='\{[^']+\}'/.test(html), 'the chart must carry its scale for the interaction');
});

test('the dock is empty until there are earnings to report', () => {
  state.audit = blankAudit();
  assert.equal(dock(), '');
  loadBrokerCase();
  assert.ok(dock().includes('Short by'));
});

test('the method screen is organised by the three questions, not by mechanism', async () => {
  const { METHOD, VOICES } = await import('../src/data/method.js');
  const { PILLARS } = await import('../src/data/criteria.js');
  const html = methodView();

  for (const id of ['credibility', 'capital', 'closing']) {
    assert.ok(html.includes(`data-pillar="${id}"`), `${id} has no section of its own`);
    assert.ok(html.includes(PILLARS[id].name));
    // Each pillar states what it computes, how, and what is not settled.
    for (const d of METHOD[id].does) assert.ok(html.includes(esc(d.what)), `missing: ${d.what}`);
    for (const f of METHOD[id].formulas) assert.ok(html.includes(esc(f.label)), `missing formula: ${f.label}`);
  }
  // The same question in all three voices is the reason one tool serves all three audiences.
  for (const v of VOICES) assert.ok(html.includes(v.name), `voice missing: ${v.name}`);
  for (const id of ['credibility', 'capital', 'closing']) {
    for (const v of VOICES) assert.ok(html.includes(esc(PILLARS[id][v.id])), `${id} has no ${v.id} voice`);
  }
  assert.ok(html.includes('threeCMechanism') === false, 'the diagram should be rendered, not named');
  assert.ok(/<svg[\s\S]*Credibility[\s\S]*Capital[\s\S]*<\/svg>/.test(html), 'the mechanism diagram is missing');
});

test('every claim on the method screen is marked settled or a working assumption', async () => {
  const { METHOD } = await import('../src/data/method.js');
  for (const [id, m] of Object.entries(METHOD)) {
    assert.ok(m.assumptions.length >= 2, `${id} declares almost nothing`);
    for (const a of m.assumptions) {
      assert.ok(['fixed', 'working'].includes(a.status), `${id} has an unlabelled claim`);
      assert.ok(a.text.length > 30);
    }
  }
  // Capital is arithmetic; the other two carry judgement. That should be visible in the data.
  assert.ok(METHOD.capital.assumptions.some((a) => a.status === 'fixed'));
  assert.ok(METHOD.closing.assumptions.every((a) => a.status === 'working'));
});
