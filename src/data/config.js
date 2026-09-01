/**
 * Live configuration.
 *
 * Every number the engine treats as a judgement call lives here rather than in the
 * criteria bank, so it can be tuned in the interface and the change flows through the
 * audit, the restructure plan and the roll-up at once. The criteria themselves are not
 * editable: the criteria are uncontroversial, the numbers are the risk.
 */

import { CRITERIA_BY_ID, MULTIPLE_FLOOR, MAX_COMBINED_EBITDA_HAIRCUT } from './criteria.js';
import { SECTORS_BY_ID } from './sectors.js';

export const DEFAULT_CONFIG = {
  currency: '$',
  dscrFloor: 1.5,
  multipleFloor: MULTIPLE_FLOOR,
  ebitdaHaircutCap: MAX_COMBINED_EBITDA_HAIRCUT,
  /** criterion id → delta. Fraction of EBITDA, or turns of multiple, per its own kind. */
  deltas: {},
  /** sector id → premium ceiling. */
  ceilings: {},
};

export const config = { ...DEFAULT_CONFIG, deltas: {}, ceilings: {} };

/** The delta a criterion carries right now: an override if one is set, else its own. */
export function deltaFor(criterion) {
  const override = config.deltas[criterion.id];
  if (typeof override === 'number' && isFinite(override)) return Math.max(0, override);
  return criterion.impact.kind === 'ebitda'
    ? criterion.impact.maxHaircut
    : criterion.impact.maxPenalty ?? 0;
}

export const defaultDeltaFor = (criterion) =>
  criterion.impact.kind === 'ebitda' ? criterion.impact.maxHaircut : criterion.impact.maxPenalty ?? 0;

/** The premium ceiling for a sector right now. */
export function ceilingFor(sectorId) {
  const override = config.ceilings[sectorId];
  if (typeof override === 'number' && isFinite(override)) return Math.max(0, override);
  return (SECTORS_BY_ID[sectorId] ?? SECTORS_BY_ID.generic).ceiling;
}

export const isTuned = (criterionId) => typeof config.deltas[criterionId] === 'number';
export const isSectorTuned = (sectorId) => typeof config.ceilings[sectorId] === 'number';

/** How far the current configuration has drifted from the shipped defaults. */
export function tuningSummary() {
  const deltas = Object.entries(config.deltas).filter(([id, v]) =>
    CRITERIA_BY_ID[id] && v !== defaultDeltaFor(CRITERIA_BY_ID[id]));
  const ceilings = Object.entries(config.ceilings).filter(([id, v]) =>
    SECTORS_BY_ID[id] && v !== SECTORS_BY_ID[id].ceiling);
  const bounds = [
    ['DSCR floor', config.dscrFloor, DEFAULT_CONFIG.dscrFloor],
    ['Multiple floor', config.multipleFloor, DEFAULT_CONFIG.multipleFloor],
    ['EBITDA haircut cap', config.ebitdaHaircutCap, DEFAULT_CONFIG.ebitdaHaircutCap],
  ].filter(([, now, was]) => now !== was);
  return { deltas, ceilings, bounds, count: deltas.length + ceilings.length + bounds.length };
}

export function setConfig(path, value) {
  const keys = path.split('.');
  let node = config;
  while (keys.length > 1) {
    const k = keys.shift();
    if (!node[k]) node[k] = {};
    node = node[k];
  }
  node[keys[0]] = value;
}

export function clearOverride(path) {
  const keys = path.split('.');
  let node = config;
  while (keys.length > 1) node = node[keys.shift()];
  delete node[keys[0]];
}

export function resetConfig() {
  Object.assign(config, DEFAULT_CONFIG, { deltas: {}, ceilings: {} });
}

/** Restore a saved configuration, ignoring anything that is not a finite number. */
export function applyConfig(saved) {
  if (!saved || typeof saved !== 'object') return;
  const numeric = (v) => (typeof v === 'number' && isFinite(v) ? v : undefined);
  config.currency = typeof saved.currency === 'string' ? saved.currency : config.currency;
  config.dscrFloor = numeric(saved.dscrFloor) ?? config.dscrFloor;
  config.multipleFloor = numeric(saved.multipleFloor) ?? config.multipleFloor;
  config.ebitdaHaircutCap = numeric(saved.ebitdaHaircutCap) ?? config.ebitdaHaircutCap;
  for (const [id, v] of Object.entries(saved.deltas ?? {})) {
    if (CRITERIA_BY_ID[id] && numeric(v) !== undefined) config.deltas[id] = v;
  }
  for (const [id, v] of Object.entries(saved.ceilings ?? {})) {
    if (SECTORS_BY_ID[id] && numeric(v) !== undefined) config.ceilings[id] = v;
  }
}
