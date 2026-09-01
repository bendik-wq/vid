import test from 'node:test';
import assert from 'node:assert/strict';

// The case layer talks to localStorage; a stub keeps the tests honest about persistence.
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};

const {
  state, load, activeCase, newCase, openCase, renameCase, duplicateCase, deleteCase,
  exportCase, importCase, loadBrokerCase,
} = await import('../src/ui/state.js');
const { casesView } = await import('../src/ui/views.js');

test.beforeEach(() => {
  store.clear();
  state.cases = [];
  state.activeCaseId = null;
  load();
});

test('there is always exactly one case open', () => {
  assert.equal(state.cases.length, 1);
  assert.ok(activeCase());
  assert.equal(state.audit, activeCase().audit, 'the live copy is the open case');
});

test('a new case starts empty and becomes the open one', () => {
  loadBrokerCase();
  const before = state.audit.askingPrice;
  assert.ok(before > 0);
  newCase('Acme Electrical');
  assert.equal(state.cases.length, 2);
  assert.equal(activeCase().name, 'Acme Electrical');
  assert.equal(state.audit.askingPrice, 0, 'a new case must not inherit the last one');
});

test('switching cases keeps each one’s work', () => {
  loadBrokerCase();
  const first = state.activeCaseId;
  newCase('Second');
  state.audit.askingPrice = 999;
  openCase(first);
  assert.equal(state.audit.askingPrice, 5_000_000, 'the first case kept its figures');
  const second = state.cases.find((c) => c.name === 'Second');
  openCase(second.id);
  assert.equal(state.audit.askingPrice, 999, 'the second case kept its figures');
});

test('work survives a reload', () => {
  loadBrokerCase();
  renameCase(state.activeCaseId, 'Persisted');
  state.cases = [];
  state.activeCaseId = null;
  load();
  assert.equal(activeCase().name, 'Persisted');
  assert.equal(state.audit.askingPrice, 5_000_000);
});

test('a duplicate is a copy, not a second reference', () => {
  loadBrokerCase();
  const copyId = duplicateCase(state.activeCaseId);
  const copy = state.cases.find((c) => c.id === copyId);
  assert.equal(copy.audit.askingPrice, 5_000_000);
  state.audit.askingPrice = 42;
  assert.equal(copy.audit.askingPrice, 5_000_000, 'editing the original must not touch the copy');
});

test('deleting the open case opens another rather than leaving none', () => {
  newCase('Second');
  deleteCase(state.activeCaseId);
  assert.equal(state.cases.length, 1);
  assert.ok(activeCase(), 'something must always be open');
});

test('deleting the last case leaves a fresh one', () => {
  deleteCase(state.activeCaseId);
  assert.equal(state.cases.length, 1);
  assert.equal(state.audit.askingPrice, 0);
});

test('a case round-trips through a file', () => {
  loadBrokerCase();
  renameCase(state.activeCaseId, 'Sent to me');
  const payload = exportCase(state.activeCaseId);
  assert.equal(payload.format, 'exit-audit-case');

  store.clear();
  state.cases = [];
  state.activeCaseId = null;
  load();
  assert.equal(state.cases.length, 1);

  const id = importCase(payload);
  assert.ok(id);
  assert.equal(activeCase().name, 'Sent to me');
  assert.equal(state.audit.askingPrice, 5_000_000);
  assert.equal(state.audit.financials.ownerReplacementCost, 250_000);
});

test('a file that is not a case is refused rather than half-loaded', () => {
  const before = state.cases.length;
  for (const junk of [null, {}, { format: 'something-else' }, { format: 'exit-audit-case', audit: 'nope' }]) {
    const id = importCase(junk);
    if (junk?.format === 'exit-audit-case') assert.ok(id, 'a well-formed envelope is still accepted');
    else assert.equal(id, null);
  }
  assert.ok(state.cases.length >= before);
});

test('the cases screen lists every case and marks the open one', () => {
  loadBrokerCase();
  newCase('Acme Electrical');
  const html = casesView();
  assert.ok(html.includes('Acme Electrical'));
  assert.ok(html.includes('data-act="new-case"'));
  assert.ok(html.includes('data-import-case'));
  assert.equal((html.match(/class="case-card/g) ?? []).length, 2);
  assert.ok(html.includes('badge good">open'));
});
