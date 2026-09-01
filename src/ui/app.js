/** Router, event delegation, dragging, persistence. */

import {
  state, load, notify, setScore, resetAudit, resetTuning, loadBrokerCase,
  addNode, removeNode, findNode, setNode, toggleLever, clearGroup, groupInput, stretchAll,
} from './state.js';
import { config, setConfig, clearOverride } from '../data/config.js';
import { state_currency, num } from './format.js';
import { auditView, valueView, buildView, futureView, tuneView, methodView, dock } from './views.js';
import { runAudit } from '../engine/valuation.js';
import { remediationPlan } from '../engine/restructure.js';
import { runBuild, horizon } from '../engine/build.js';

const VIEWS = {
  audit: { label: 'Audit', primary: true, render: auditView, dock: true },
  value: { label: 'Value', primary: true, render: valueView },
  build: { label: 'Build', primary: true, render: buildView },
  future: { label: 'Future', primary: true, render: futureView },
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
  const key = active && (active.dataset?.bind || active.dataset?.config
    || active.dataset?.group || active.dataset?.capital || active.dataset?.future);
  const caret = key && active.selectionStart != null ? active.selectionStart : null;

  document.getElementById('topbar').innerHTML = topbar();
  main.dataset.view = view;
  main.innerHTML = VIEWS[view].render();
  document.getElementById('dock').innerHTML = VIEWS[view].dock ? dock() : '';
  window.scrollTo(0, keepScroll);

  if (key) {
    const el = main.querySelector(
      `[data-bind="${key}"], [data-config="${key}"], [data-group="${key}"], [data-capital="${key}"], [data-future="${key}"]`,
    );
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
  const d = el.dataset;
  if (d.bind) writePath(state.audit, d.bind, readInput(el));
  else if (d.config) setConfig(d.config, readInput(el));
  else if (d.capital) writePath(state.capital, d.capital, readInput(el));
  else if (d.future) writePath(state.future, d.future, readInput(el));
  else if (d.group) {
    // nodes.<id>.<key>
    const [, id, key] = d.group.split('.');
    setNode(id, key, readInput(el));
  } else return;
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
  else if (act === 'add-node') { addNode(el.dataset.industry); render(); }
  else if (act === 'remove-node') { removeNode(el.dataset.node); render(); }
  else if (act === 'set-structure') { setNode(el.dataset.node, 'structureId', el.dataset.structure); render(); }
  else if (act === 'toggle-lever') { toggleLever(el.dataset.node, el.dataset.lever); render(); }
  else if (act === 'clear-group') { clearGroup(); render(); }
  else if (act === 'stretch-all') { stretchAll(el.dataset.on === 'true'); render(); }
  else if (act === 'print') { window.print(); }
  else if (act === 'export') { exportReport(); }
}

// ── Dragging businesses around the web ────────────────────────────────────
/**
 * Positions are fractions of the canvas box, so the web survives a resize. During a drag
 * the node and its connector are moved directly rather than through a re-render — a
 * re-render every pointermove would fight the pointer and drop the capture.
 */
const DRAG_THRESHOLD = 4;
let drag = null;

function onPointerDown(e) {
  const el = e.target.closest('.gnode');
  if (!el) return;
  const canvas = el.closest('[data-canvas]');
  if (!canvas) return;
  drag = {
    el,
    canvas,
    id: Number(el.dataset.node),
    line: canvas.querySelector(`[data-line="${el.dataset.node}"]`),
    startX: e.clientX,
    startY: e.clientY,
    moved: false,
  };
  el.setPointerCapture(e.pointerId);
}

function onPointerMove(e) {
  if (!drag) return;
  if (!drag.moved) {
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < DRAG_THRESHOLD) return;
    drag.moved = true;
    drag.el.classList.add('dragging');
  }
  // Read the box every move: the page can scroll under a drag, and a stale box would
  // make the node jump.
  const box = drag.canvas.getBoundingClientRect();
  const x = Math.min(0.94, Math.max(0.06, (e.clientX - box.left) / box.width));
  const y = Math.min(0.92, Math.max(0.08, (e.clientY - box.top) / box.height));
  drag.pos = { x, y };
  drag.el.style.left = `${(x * 100).toFixed(2)}%`;
  drag.el.style.top = `${(y * 100).toFixed(2)}%`;
  if (drag.line) {
    drag.line.setAttribute('x2', (x * 100).toFixed(2));
    drag.line.setAttribute('y2', (y * 100).toFixed(2));
  }
}

function onPointerUp() {
  if (!drag) return;
  const { id, moved, pos } = drag;
  drag.el.classList.remove('dragging');
  drag = null;
  if (moved && pos) setNode(id, 'pos', pos);
  else { state.ui.selectedNode = id; notify(); }
  render();
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
  const group = runBuild(groupInput());
  const future = horizon({
    startingProfit: audit.defensibleEbitda || 500_000,
    todayValue: audit.achievableValue,
    industryId: state.audit.business.sector,
    ...state.future,
    years: 20,
  });
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
      dscr: audit.dscr.dscr,
      maxFundablePrice: audit.dscr.maxFundablePrice,
      binding: audit.binding,
    },
    pillarScores: audit.pillarScores,
    haircuts: audit.haircuts.lines,
    penalties: audit.penalties.lines,
    remediation: remediationPlan(state.audit).items,
    group: {
      businesses: group.nodes.map((n) => ({
        industry: n.industry.name, profit: n.ebitda, multiple: n.multiple, price: n.price,
        structure: n.structure.name, cashNeeded: n.cashNeeded, dscr: n.dscr, merged: n.levers,
      })),
      groupProfit: group.groupProfit,
      cashRequired: group.cashRequired,
      dscr: group.dscr,
      exitMultiple: group.exitMultiple,
      equityValue: group.equityValue,
      arbitrage: group.arbitrage,
    },
    future: {
      assumptions: state.future,
      milestones: future.milestones,
      difference: future.difference,
      totalCashIn: future.totalCashIn,
      businessesBought: future.businessesBought,
    },
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
  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('hashchange', render);
  render();
}
