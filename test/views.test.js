import test from 'node:test';
import assert from 'node:assert/strict';

import { auditView, resultView, restructureView, rollupView, bankView, methodView } from '../src/ui/views.js';
import { state, loadBrokerCase, blankAudit } from '../src/ui/state.js';

const VIEWS = { auditView, resultView, restructureView, rollupView, bankView, methodView };

test('every view renders for the calibration case without leaking undefined or NaN', () => {
  loadBrokerCase();
  for (const [name, view] of Object.entries(VIEWS)) {
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

test('the result screen states the gap and the DSCR verdict', () => {
  loadBrokerCase();
  const html = resultView();
  assert.ok(html.includes('The gap'));
  assert.ok(/implies a \d+\.\d\dx DSCR/.test(html), 'DSCR sentence missing');
  assert.ok(html.includes('unfundable'), 'the broker case should be called unfundable');
});
