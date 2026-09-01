/** Router, event delegation, persistence wiring. */

import { state, load, notify, setAudit, setRollup, setScore, resetAudit, loadBrokerCase } from './state.js';
import { state_currency, num } from './format.js';
import { auditView, resultView, restructureView, rollupView, bankView, methodView } from './views.js';
import { runAudit } from '../engine/valuation.js';
import { remediationPlan } from '../engine/restructure.js';
import { runRollup } from '../engine/rollup.js';

const VIEWS = {
  audit: { label: 'Audit', group: 'Seller', render: auditView },
  result: { label: 'Result', group: 'Seller', render: resultView },
  restructure: { label: 'Restructure', group: 'Seller', render: restructureView },
  rollup: { label: 'Roll-up', group: 'Buyer', render: rollupView },
  bank: { label: 'Criteria bank', group: 'Reference', render: bankView },
  method: { label: 'Method', group: 'Reference', render: methodView },
};

const currentView = () => {
  const v = location.hash.replace('#', '');
  return VIEWS[v] ? v : 'audit';
};

function nav() {
  const view = currentView();
  const groups = [];
  for (const [id, v] of Object.entries(VIEWS)) {
    let g = groups.find((x) => x.name === v.group);
    if (!g) groups.push((g = { name: v.group, items: [] }));
    g.items.push({ id, label: v.label });
  }
  return `
    <div class="brand"><h1>Exit Audit</h1><p>Credibility · Capital · Closing</p></div>
    ${groups.map((g) => `
      <div class="group">${g.name}</div>
      ${g.items.map((i) => `<a href="#${i.id}" class="${i.id === view ? 'on' : ''}">${i.label}</a>`).join('')}
    `).join('')}`;
}

/** Re-render in place, keeping scroll position and the caret where the user left it. */
function render() {
  const view = currentView();
  const main = document.getElementById('main');
  const sameView = main.dataset.view === view;
  const keepScroll = sameView ? window.scrollY : 0;

  const active = document.activeElement;
  const key = active && (active.dataset?.bind || active.dataset?.rollup);
  const caret = key && active.selectionStart != null ? active.selectionStart : null;

  document.getElementById('nav').innerHTML = nav();
  main.dataset.view = view;
  main.innerHTML = VIEWS[view].render();
  window.scrollTo(0, keepScroll);

  if (key) {
    const el = main.querySelector(`[data-bind="${key}"], [data-rollup="${key}"]`);
    if (el) {
      el.focus();
      if (caret != null && el.setSelectionRange) {
        try { el.setSelectionRange(caret, caret); } catch { /* checkbox and select have no range */ }
      }
    }
  }
}

/** Inputs write through on change; re-render is deferred so typing is not interrupted. */
function bindInput(el) {
  const kind = el.dataset.kind ?? 'number';
  let value;
  if (kind === 'text') value = el.value;
  else if (kind === 'bool') value = el.checked;
  else if (kind === 'rate') value = num(el.value) / 100;
  else value = num(el.value);
  return value;
}

function onInput(e) {
  const el = e.target;
  if (el.dataset.bind) {
    const value = bindInput(el);
    const path = el.dataset.bind;
    const keys = path.split('.');
    let node = state.audit;
    while (keys.length > 1) node = node[keys.shift()];
    node[keys[0]] = value;
    refreshLive();
  } else if (el.dataset.rollup) {
    const value = bindInput(el);
    const keys = el.dataset.rollup.split('.');
    let node = state.rollup;
    while (keys.length > 1) node = node[keys.shift()];
    node[keys[0]] = value;
    refreshLive();
  }
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
  else if (act === 'goto') { location.hash = el.dataset.view; }
  else if (act === 'reset') { resetAudit(); render(); }
  else if (act === 'load-broker') { loadBrokerCase(); render(); }
  else if (act === 'print') { window.print(); }
  else if (act === 'export') { exportReport(); }
}

function exportReport() {
  const audit = runAudit(state.audit);
  const payload = {
    generated: new Date().toISOString(),
    business: state.audit.business,
    inputs: { askingPrice: state.audit.askingPrice, financials: state.audit.financials, structure: state.audit.structure, scores: state.audit.scores },
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
    haircuts: audit.haircuts.lines,
    penalties: audit.penalties.lines,
    remediation: remediationPlan(state.audit).items,
    rollup: (() => { const r = runRollup(state.rollup); return {
      blendedEntryMultiple: r.blendedEntryMultiple, exitMultiple: r.exitMultiple, arbitrage: r.arbitrage,
      equityInvested: r.equityInvested, exitEquityValue: r.exitEquityValue, moic: r.moic, irr: r.irr,
      groupDscr: r.group.dscr, feasible: r.feasible,
    }; })(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(state.audit.business.name || 'exit-audit').replace(/\W+/g, '-').toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function start() {
  load();
  state_currency.symbol = state.currency;
  document.addEventListener('input', onInput);
  document.addEventListener('change', onInput);
  document.addEventListener('click', onClick);
  window.addEventListener('hashchange', render);
  render();
}
