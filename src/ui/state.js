/** Session state: one audit, one roll-up, persisted locally. */

import { CRITERIA } from '../data/criteria.js';
import { DEFAULT_STRUCTURE, DEFAULT_FINANCIALS } from '../engine/valuation.js';
import { BROKER_CASE } from '../data/cases.js';
import { config, applyConfig, resetConfig } from '../data/config.js';
import { SECTORS_BY_ID } from '../data/sectors.js';
import { DEFAULT_ASSUMPTIONS } from '../engine/build.js';
import { runAudit } from '../engine/valuation.js';

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

export const blankGroup = () => ({
  /** Left null until the audit has a number; the platform is the seller's own business. */
  holdcoEbitda: null,
  holdcoIndustry: null,
  nodes: [],
  nextId: 1,
  assumptions: { ...DEFAULT_ASSUMPTIONS },
});

export const state = {
  audit: blankAudit(),
  group: blankGroup(),
  capital: { cash: 0, industryId: 'trades', stretch: false },
  future: {
    dealsPerYear: 2,
    avgDealProfit: 250_000,
    maxBusinesses: 12,
    structureId: 'vendor',
    synergyRate: 0.15,
    advisoryCost: 50_000,
  },
  /** Interface state. Not part of the audit, not exported. */
  ui: { openPillar: 'credibility', selectedNode: null },
};

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
  try {
    localStorage.setItem(KEY, JSON.stringify({
      audit: state.audit,
      group: state.group,
      capital: state.capital,
      future: state.future,
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
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.audit) state.audit = { ...blankAudit(), ...parsed.audit };
    if (parsed.group) state.group = { ...blankGroup(), ...parsed.group };
    if (parsed.capital) state.capital = { ...state.capital, ...parsed.capital };
    if (parsed.future) state.future = { ...state.future, ...parsed.future };
    if (parsed.ui) state.ui = { ...state.ui, ...parsed.ui };
    if (parsed.config) applyConfig(parsed.config);
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

export function resetTuning() {
  resetConfig();
  notify();
}
