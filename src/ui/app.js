/** Router, event delegation, persistence wiring. */

import { state, load, notify, setScore, resetAudit, resetTuning, loadBrokerCase } from './state.js';
import { config, setConfig, clearOverride } from '../data/config.js';
import { state_currency, num } from './format.js';
import { auditView, valueView, planView, rollupView, tuneView, methodView, dock } from './views.js';
import { runAudit } from '../engine/valuation.js';
import { remediationPlan } from '../engine/restructure.js';
import { runRollup } from '../engine/rollup.js';

const VIEWS = {
  audit: { label: 'Audit', primary: true, render: auditView, dock: true },
  value: { label: 'Value', primary: true, render: valueView },
  plan: { label: 'Plan', primary: true, render: planView },
  rollup: { label: 'Roll-up', primary: true, render: rollupView },
  tune: { label: 'Tune', primary: false, render: tuneView },
  method: { label: 'Method', primary: false, render: methodView },
};

const currentView = () => {
  const v = location.hash.replace('#', '');
  return VIEWS[v] ? v : 'audit';
};

function topbar() {
  const view = currentView();
  const link = ([id, v]) => `<a href="#${id}" class="${id === view ? 'on' : ''}">${v.label}</a>`;
  const entries = Object.entries(VIEWS);
  return `
    <span class="mark">Exit Audit</span>
    <nav class="tabs" aria-label="Sections">
      ${entries.filter(([, v]) => v.primary).map(link).join('')}
      <span class="sep" aria-hidden="true"></span>
      ${entries.filter(([, v]) => !v.primary).map(link).join('')}
    </nav>`;
}

/** Re-render in place, keeping scroll position and the caret where the user left it. */
function render() {
  const view = currentView();
  const main = document.getElementById('main');
  const sameView = main.dataset.view === view;
  const keepScroll = sameView ? window.scrollY : 0;

  const active = document.activeElement;
  const key = active && (active.dataset?.bind || active.dataset?.rollup || active.dataset?.config);
  const caret = key && active.selectionStart != null ? active.selectionStart : null;

  document.getElementById('topbar').innerHTML = topbar();
  main.dataset.view = view;
  main.innerHTML = VIEWS[view].render();
  document.getElementById('dock').innerHTML = VIEWS[view].dock ? dock() : '';
  window.scrollTo(0, keepScroll);

  if (key) {
    const el = main.querySelector(`[data-bind="${key}"], [data-rollup="${key}"], [data-config="${key}"]`);
    if (el) {
      el.focus();
      if (caret != null && el.setSelectionRange) {
        try { el.setSelectionRange(caret, caret); } catch { /* checkbox and select have no range */ }
      }
    }
  }
}

function readInput(el) {
  const kind = el.dataset.kind ?? 'number';
  if (kind === 'text') return el.value;
  if (kind === 'bool') return el.checked;
  if (kind === 'rate') return num(el.value) / 100;
  return num(el.value);
}

function writePath(root, path, value) {
  const keys = path.split('.');
  let node = root;
  while (keys.length > 1) node = node[keys.shift()];
  node[keys[0]] = value;
}

function onInput(e) {
  const el = e.target;
  if (el.dataset.bind) writePath(state.audit, el.dataset.bind, readInput(el));
  else if (el.dataset.rollup) writePath(state.rollup, el.dataset.rollup, readInput(el));
  else if (el.dataset.config) setConfig(el.dataset.config, readInput(el));
  else return;
  refreshLive();
}

/** Typing repaints the derived numbers, debounced so it never fights the keyboard. */
let liveTimer = null;
function refreshLive() {
  clearTimeout(liveTimer);
  liveTimer = setTimeout(() => { notify(); render(); }, 200);
}

function onClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  if (act === 'score') { setScore(el.dataset.id, Number(el.dataset.score)); render(); }
  else if (act === 'toggle-pillar') {
    state.ui.openPillar = state.ui.openPillar === el.dataset.pillar ? null : el.dataset.pillar;
    notify(); render();
  } else if (act === 'open-pillar') {
    state.ui.openPillar = el.dataset.pillar;
    notify();
    location.hash = 'audit';
  } else if (act === 'goto') { location.hash = el.dataset.view; }
  else if (act === 'reset') { resetAudit(); render(); }
  else if (act === 'reset-config') { resetTuning(); render(); }
  else if (act === 'clear-config') { clearOverride(el.dataset.path); notify(); render(); }
  else if (act === 'load-broker') { loadBrokerCase(); render(); }
  else if (act === 'print') { window.print(); }
  else if (act === 'export') { exportReport(); }
}

/** Brief inline message for outcomes that have nowhere else to go. */
function notice(text) {
  let el = document.getElementById('notice');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notice';
    el.style.cssText =
      'position:fixed;bottom:96px;left:50%;transform:translateX(-50%);z-index:40;' +
      'background:var(--raised);border:1px solid var(--hair);border-radius:12px;' +
      'padding:12px 18px;font-size:14px;color:var(--ink-2);max-width:min(420px,90vw);' +
      'box-shadow:var(--shadow)';
    document.body.appendChild(el);
  }
  el.textContent = text;
  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => el.remove(), 5000);
}

function reportPayload() {
  const audit = runAudit(state.audit);
  return {
    generated: new Date().toISOString(),
    business: state.audit.business,
    inputs: {
      askingPrice: state.audit.askingPrice,
      financials: state.audit.financials,
      structure: state.audit.structure,
      scores: state.audit.scores,
    },
    tuning: {
      dscrFloor: config.dscrFloor,
      multipleFloor: config.multipleFloor,
      ebitdaHaircutCap: config.ebitdaHaircutCap,
      deltas: config.deltas,
      ceilings: config.ceilings,
    },
    result: {
      claimedEbitda: audit.claimedEbitda,
      defensibleEbitda: audit.defensibleEbitda,
      totalHaircut: audit.haircuts.appliedFraction,
      ceiling: audit.ceiling,
      multiplePenalty: audit.penalties.total,
      achievableMultiple: audit.achievableMultiple,
      achievableValue: audit.achievableValue,
      askingPrice: audit.askingPrice,
      gap: audit.gap,
      impliedMultipleAtAsking: audit.impliedMultipleAtAsking,
      dscr: audit.dscr.dscr,
      maxFundablePrice: audit.dscr.maxFundablePrice,
      binding: audit.binding,
    },
    pillarScores: audit.pillarScores,
    haircuts: audit.haircuts.lines,
    penalties: audit.penalties.lines,
    remediation: remediationPlan(state.audit).items,
    rollup: (() => {
      const r = runRollup(state.rollup);
      return {
        blendedEntryMultiple: r.blendedEntryMultiple, exitMultiple: r.exitMultiple, arbitrage: r.arbitrage,
        equityInvested: r.equityInvested, exitEquityValue: r.exitEquityValue, moic: r.moic, irr: r.irr,
        groupDscr: r.group.dscr, feasible: r.feasible,
      };
    })(),
  };
}

/**
 * Published pages cannot start a download themselves, so save through the host when it is
 * there and fall back to a plain link when the page is served locally.
 */
async function exportReport() {
  const json = JSON.stringify(reportPayload(), null, 2);
  const filename = `${(state.audit.business.name || 'exit-audit').replace(/\W+/g, '-').toLowerCase()}.json`;

  const downloads = window.claude?.use ? await window.claude.use('downloads') : null;
  if (downloads) {
    try {
      await downloads.save({ filename, data: json });
    } catch (err) {
      if (err?.code !== 'declined') notice(`Could not save the report: ${err?.message ?? 'saving is unavailable here'}`);
    }
    return;
  }

  const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function start() {
  load();
  state_currency.symbol = config.currency;
  document.addEventListener('input', onInput);
  document.addEventListener('change', onInput);
  document.addEventListener('click', onClick);
  window.addEventListener('hashchange', render);
  render();
}
