/** Session state: one audit, one roll-up, persisted locally. */

import { CRITERIA } from '../data/criteria.js';
import { DEFAULT_STRUCTURE, DEFAULT_FINANCIALS } from '../engine/valuation.js';
import { DEFAULT_ROLLUP } from '../engine/rollup.js';
import { BROKER_CASE } from '../data/cases.js';

const KEY = 'vid-audit-platform-v1';

export const blankAudit = () => ({
  business: { name: '', sector: 'generic' },
  askingPrice: 0,
  financials: { ...DEFAULT_FINANCIALS },
  structure: { ...DEFAULT_STRUCTURE },
  applySizePremium: true,
  scores: Object.fromEntries(
    CRITERIA.filter((c) => c.impact.kind !== 'computed').map((c) => [c.id, 3]),
  ),
});

export const state = {
  audit: blankAudit(),
  rollup: { ...DEFAULT_ROLLUP, structure: { ...DEFAULT_STRUCTURE } },
  currency: '$',
};

const listeners = new Set();
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export const notify = () => { save(); listeners.forEach((fn) => fn()); };

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ audit: state.audit, rollup: state.rollup, currency: state.currency }));
  } catch { /* private browsing, quota, embedded contexts — the tool still works */ }
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.audit) state.audit = { ...blankAudit(), ...parsed.audit };
    if (parsed.rollup) state.rollup = { ...DEFAULT_ROLLUP, ...parsed.rollup };
    if (parsed.currency) state.currency = parsed.currency;
  } catch { /* corrupt or unreadable storage is not worth a broken page */ }
}

/** Deep-set on the audit: setAudit('financials.claimedEbitda', 1000000). */
export function setAudit(path, value) {
  const keys = path.split('.');
  let node = state.audit;
  while (keys.length > 1) node = node[keys.shift()];
  node[keys[0]] = value;
  notify();
}

export function setRollup(path, value) {
  const keys = path.split('.');
  let node = state.rollup;
  while (keys.length > 1) node = node[keys.shift()];
  node[keys[0]] = value;
  notify();
}

export function setScore(id, score) {
  state.audit.scores[id] = score;
  notify();
}

export function loadCase(sample) {
  state.audit = {
    ...blankAudit(),
    business: { ...sample.business },
    askingPrice: sample.askingPrice,
    financials: { ...DEFAULT_FINANCIALS, ...sample.financials },
    scores: { ...blankAudit().scores, ...sample.scores },
  };
  notify();
}

export const loadBrokerCase = () => loadCase(BROKER_CASE);

export function resetAudit() {
  state.audit = blankAudit();
  notify();
}
