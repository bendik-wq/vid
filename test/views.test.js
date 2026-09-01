import test from 'node:test';
import assert from 'node:assert/strict';

import { auditView, valueView, planView, rollupView, tuneView, methodView, dock, threeCStrip } from '../src/ui/views.js';
import { runAudit } from '../src/engine/valuation.js';
import { state, loadBrokerCase, blankAudit } from '../src/ui/state.js';

const VIEWS = { auditView, valueView, planView, rollupView, tuneView, methodView };
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

test('the value screen states the gap and the DSCR verdict', () => {
  loadBrokerCase();
  const html = valueView();
  assert.ok(/implies a \d+\.\d\dx DSCR/.test(html), 'DSCR sentence missing');
  assert.ok(html.includes('unfundable'), 'the broker case should be called unfundable');
  assert.ok(html.includes('<svg'), 'the value screen should carry figures');
});

test('the three C strip names all three pillars and what each costs', () => {
  loadBrokerCase();
  const html = threeCStrip(runAudit(state.audit));
  for (const name of ['Credibility', 'Capital', 'Closing']) {
    assert.ok(html.includes(name), `${name} missing from the 3C strip`);
  }
  assert.ok(html.includes('DSCR'), 'Capital should report the DSCR');
  assert.ok(/data-pillar="closing"/.test(html));
});

test('the dock is empty until there are earnings to report', () => {
  state.audit = blankAudit();
  assert.equal(dock(), '');
  loadBrokerCase();
  assert.ok(dock().includes('Gap'));
});
