/**
 * Session state.
 *
 * The tool holds several named cases — one per business you are working on — and one of
 * them is live at a time. The live copy is what every screen reads and writes; it is
 * folded back into its case record on every change, so switching cases never loses work.
 */

import { CRITERIA } from '../data/criteria.js';
import { DEFAULT_STRUCTURE, DEFAULT_FINANCIALS } from '../engine/valuation.js';
import { BROKER_CASE } from '../data/cases.js';
import { config, applyConfig, resetConfig } from '../data/config.js';
import { SECTORS_BY_ID } from '../data/sectors.js';
import { DEFAULT_ASSUMPTIONS } from '../engine/build.js';
import { runAudit } from '../engine/valuation.js';

const KEY = 'vid-audit-platform-v2';
const LEGACY_KEY = 'vid-audit-platform-v1';

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

export const blankGroup = () => ({
  /** Left null until the audit has a number; the platform is the seller's own business. */
  holdcoEbitda: null,
  holdcoIndustry: null,
  nodes: [],
  nextId: 1,
  assumptions: { ...DEFAULT_ASSUMPTIONS },
});

export const blankCapital = () => ({ cash: 0, industryId: 'trades', stretch: false });

export const blankFuture = () => ({
  dealsPerYear: 2,
  avgDealProfit: 250_000,
  maxBusinesses: 12,
  structureId: 'vendor',
  synergyRate: 0.15,
  advisoryCost: 50_000,
});

let caseSeq = 1;
const nextCaseId = () => `case-${caseSeq++}-${Math.random().toString(36).slice(2, 7)}`;

export const blankCase = (name = 'New case') => ({
  id: nextCaseId(),
  name,
  created: Date.now(),
  updated: Date.now(),
  audit: blankAudit(),
  group: blankGroup(),
  capital: blankCapital(),
  future: blankFuture(),
});

export const state = {
  /** Every case you have entered. The live copy below belongs to whichever is active. */
  cases: [],
  activeCaseId: null,
  audit: blankAudit(),
  group: blankGroup(),
  capital: blankCapital(),
  future: blankFuture(),
  /** Interface state. Not part of any case, never exported. */
  ui: { openPillar: 'credibility', selectedNode: null },
};

export const activeCase = () => state.cases.find((c) => c.id === state.activeCaseId) ?? null;

/** Fold the live copy back into its case record. Called before every save. */
function syncActive() {
  const record = activeCase();
  if (!record) return;
  record.audit = state.audit;
  record.group = state.group;
  record.capital = state.capital;
  record.future = state.future;
  record.updated = Date.now();
  if (state.audit.business.name && record.name === 'New case') record.name = state.audit.business.name;
}

/** Make a case live, taking its stored copy as the working copy. */
export function openCase(id) {
  const record = state.cases.find((c) => c.id === id);
  if (!record) return;
  syncActive();
  state.activeCaseId = id;
  state.audit = record.audit;
  state.group = record.group;
  state.capital = record.capital;
  state.future = record.future;
  state.ui.selectedNode = null;
  notify();
}

export function newCase(name = 'New case', seed = null) {
  const record = blankCase(name);
  if (seed) {
    record.audit = {
      ...blankAudit(),
      business: { ...seed.business },
      askingPrice: seed.askingPrice,
      financials: { ...DEFAULT_FINANCIALS, ...seed.financials },
      scores: { ...blankAudit().scores, ...seed.scores },
    };
  }
  syncActive();
  state.cases.push(record);
  state.activeCaseId = record.id;
  state.audit = record.audit;
  state.group = record.group;
  state.capital = record.capital;
  state.future = record.future;
  state.ui.selectedNode = null;
  notify();
  return record.id;
}

export function renameCase(id, name) {
  const record = state.cases.find((c) => c.id === id);
  if (!record) return;
  record.name = name || 'Untitled case';
  if (id === state.activeCaseId) state.audit.business.name = record.name;
  notify();
}

export function duplicateCase(id) {
  const source = state.cases.find((c) => c.id === id);
  if (!source) return null;
  syncActive();
  const copy = structuredClone({ ...source, id: nextCaseId(), name: `${source.name} copy`, created: Date.now() });
  state.cases.push(copy);
  notify();
  return copy.id;
}

export function deleteCase(id) {
  state.cases = state.cases.filter((c) => c.id !== id);
  if (state.activeCaseId === id) {
    if (state.cases.length === 0) newCase();
    else openCase(state.cases[0].id);
    return;
  }
  notify();
}

/** A case as a portable object, so one can be sent to someone else and opened here. */
export function exportCase(id) {
  const record = state.cases.find((c) => c.id === id) ?? activeCase();
  if (!record) return null;
  syncActive();
  return {
    format: 'exit-audit-case',
    version: 1,
    name: record.name,
    audit: record.audit,
    group: record.group,
    capital: record.capital,
    future: record.future,
  };
}

/** Take a case someone sent you. Anything missing or malformed falls back to a blank. */
export function importCase(payload) {
  if (!payload || payload.format !== 'exit-audit-case') return null;
  const record = blankCase(typeof payload.name === 'string' ? payload.name : 'Imported case');
  if (payload.audit && typeof payload.audit === 'object') {
    record.audit = { ...blankAudit(), ...payload.audit };
    record.audit.financials = { ...DEFAULT_FINANCIALS, ...(payload.audit.financials ?? {}) };
    record.audit.structure = { ...DEFAULT_STRUCTURE, ...(payload.audit.structure ?? {}) };
    record.audit.scores = { ...blankAudit().scores, ...(payload.audit.scores ?? {}) };
  }
  if (payload.group && typeof payload.group === 'object') record.group = { ...blankGroup(), ...payload.group };
  if (payload.capital && typeof payload.capital === 'object') record.capital = { ...blankCapital(), ...payload.capital };
  if (payload.future && typeof payload.future === 'object') record.future = { ...blankFuture(), ...payload.future };
  syncActive();
  state.cases.push(record);
  openCase(record.id);
  return record.id;
}

/**
 * The group, with the platform filled in from the audit.
 * Your own business is the platform — you should not have to type its profit twice.
 */
export function groupInput() {
  const audit = runAudit(state.audit);
  return {
    ...state.group,
    holdcoEbitda: state.group.holdcoEbitda ?? audit.defensibleEbitda ?? 0,
    holdcoIndustry: state.group.holdcoIndustry ?? state.audit.business.sector,
  };
}

/** Everything the twenty-year projection needs, with the platform taken from the audit. */
export function futureInput() {
  const audit = runAudit(state.audit);
  return {
    startingProfit: audit.defensibleEbitda || 500_000,
    todayValue: audit.achievableValue,
    industryId: state.audit.business.sector,
    ...state.future,
    years: 20,
  };
}

/** Add a business to the group, priced at what one like it usually costs. */
export function addNode(industryId) {
  const industry = SECTORS_BY_ID[industryId] ?? SECTORS_BY_ID.generic;
  const id = state.group.nextId;
  state.group.nextId += 1;
  state.group.nodes.push({
    id,
    industryId,
    ebitda: 250_000,
    multiple: industry.low,
    structureId: 'vendor',
    levers: [...(industry.levers ?? [])],
    interestOnly: false,
  });
  state.ui.selectedNode = id;
  notify();
  return id;
}

export function removeNode(id) {
  state.group.nodes = state.group.nodes.filter((n) => n.id !== Number(id));
  if (state.ui.selectedNode === Number(id)) state.ui.selectedNode = null;
  notify();
}

export function findNode(id) {
  return state.group.nodes.find((n) => n.id === Number(id));
}

export function setNode(id, key, value) {
  const node = findNode(id);
  if (node) { node[key] = value; notify(); }
}

export function toggleLever(id, leverId) {
  const node = findNode(id);
  if (!node) return;
  const levers = node.levers ?? [];
  node.levers = levers.includes(leverId) ? levers.filter((l) => l !== leverId) : [...levers, leverId];
  notify();
}

/** One switch across the whole group — the fastest way to show what terms are worth. */
export function stretchAll(on) {
  for (const n of state.group.nodes) n.interestOnly = on;
  notify();
}

export function clearGroup() {
  state.group = blankGroup();
  state.ui.selectedNode = null;
  notify();
}

const listeners = new Set();
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export const notify = () => { save(); listeners.forEach((fn) => fn()); };

export function save() {
  syncActive();
  try {
    localStorage.setItem(KEY, JSON.stringify({
      cases: state.cases,
      activeCaseId: state.activeCaseId,
      ui: state.ui,
      config: {
        currency: config.currency,
        dscrFloor: config.dscrFloor,
        multipleFloor: config.multipleFloor,
        ebitdaHaircutCap: config.ebitdaHaircutCap,
        deltas: config.deltas,
        ceilings: config.ceilings,
      },
    }));
  } catch { /* private browsing, quota, embedded contexts — the tool still works */ }
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.cases) && parsed.cases.length) {
        state.cases = parsed.cases.map((c) => ({
          ...blankCase(c.name ?? 'Untitled case'),
          ...c,
          audit: { ...blankAudit(), ...(c.audit ?? {}) },
          group: { ...blankGroup(), ...(c.group ?? {}) },
          capital: { ...blankCapital(), ...(c.capital ?? {}) },
          future: { ...blankFuture(), ...(c.future ?? {}) },
        }));
        state.activeCaseId = state.cases.some((c) => c.id === parsed.activeCaseId)
          ? parsed.activeCaseId : state.cases[0].id;
      }
      if (parsed.ui) state.ui = { ...state.ui, ...parsed.ui };
      if (parsed.config) applyConfig(parsed.config);
    } else {
      // One audit saved before cases existed becomes the first case rather than being lost.
      const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) ?? 'null');
      if (legacy?.audit) {
        const record = blankCase(legacy.audit?.business?.name || 'Saved case');
        record.audit = { ...blankAudit(), ...legacy.audit };
        if (legacy.group) record.group = { ...blankGroup(), ...legacy.group };
        if (legacy.capital) record.capital = { ...blankCapital(), ...legacy.capital };
        if (legacy.future) record.future = { ...blankFuture(), ...legacy.future };
        state.cases = [record];
        state.activeCaseId = record.id;
      }
      if (legacy?.config) applyConfig(legacy.config);
    }
  } catch { /* corrupt or unreadable storage is not worth a broken page */ }

  if (!state.cases.length) {
    const record = blankCase('New case');
    state.cases = [record];
    state.activeCaseId = record.id;
  }
  const live = activeCase();
  state.audit = live.audit;
  state.group = live.group;
  state.capital = live.capital;
  state.future = live.future;
}

/** Deep-set on the audit: setAudit('financials.claimedEbitda', 1000000). */
export function setAudit(path, value) {
  const keys = path.split('.');
  let node = state.audit;
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
  const record = activeCase();
  if (record && record.name === 'New case') record.name = sample.business.name || sample.label;
  notify();
}

export const loadBrokerCase = () => loadCase(BROKER_CASE);

export function resetAudit() {
  state.audit = blankAudit();
  notify();
}

export function resetTuning() {
  resetConfig();
  notify();
}
