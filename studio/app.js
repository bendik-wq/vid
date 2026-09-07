/* G&L Ops — Bendik & Josh.
   Hormozi (constraint, four lead sources, value equation, offer math)
   + Haynes (operator audit, partner webinars) frameworks.
   Every mutation is written to a local, device-only change log. */

const KEY = 'gl.ops.v4';
const PEOPLE = {
  bendik: { name: 'Bendik', initials: 'B', color: 'var(--accent)' },
  josh:   { name: 'Josh',   initials: 'J', color: 'var(--purple)' }
};
const NOBODY = { name: 'Unassigned', initials: '–', color: 'var(--ink-3)' };
const who = (id) => PEOPLE[id] || NOBODY;
const nextOwner = (id) => (id === 'bendik' ? 'josh' : id === 'josh' ? null : 'bendik');

/* One owner chip, one behaviour: click to cycle, always logged. */
function ownerChip(current, label, commit) {
  const chip = el('span', 'avatar sm' + (current ? '' : ' none'));
  chip.style.background = who(current).color;
  chip.textContent = who(current).initials;
  chip.title = who(current).name + ' — click to reassign';
  chip.addEventListener('click', (e) => {
    e.stopPropagation();
    const to = nextOwner(current);
    change('assigned', label, who(current).name, who(to).name, () => commit(to));
  });
  return chip;
}


/* ── Seed ───────────────────────────────────────────────────── */
const seed = () => ({
  me: 'bendik',
  constraint: 'Not enough qualified calls. Fix the top of funnel before touching anything else.',
  model: {
    target: 150000,
    workDays: 22,
    now:   { leads: 620, book: 12, show: 60, close: 11, price: 9500 },
    bench: { book: 15, show: 70, close: 20, price: 9500 }
  },
  econ: { cac: 850, ltgp: 6200, cash30: 4750 },
  leadSources: [
    { id: 'warm',    label: 'Warm outreach', note: 'Old clients, LinkedIn 1st degree, past no-shows', owner: null,   target: 100, done: 14 },
    { id: 'content', label: 'Free content',  note: 'Reels, threads, long-form — 4 reels a day', owner: null,   target: 56,  done: 38 },
    { id: 'cold',    label: 'Cold outreach', note: 'Owner lists, 55–70, EBITDA £300k+', owner: null,   target: 250, done: 24 },
    { id: 'paid',    label: 'Paid ads',      note: 'Meta + YouTube to the funnel',                       owner: null, target: 120, done: 45 }
  ],
  valueEq: { dream: 9, likelihood: 7, time: 5, effort: 6 },
  operator: [
    { t: 'Every recurring task has a written SOP, not a person', done: false, who: null },
    { t: 'Weekly scorecard reviewed Friday — numbers before opinions', done: false, who: null },
    { t: 'One dashboard is the source of truth (this one)', done: false, who: null },
    { t: 'CRM fires the booking, reminder and no-show sequences without us', done: false, who: null },
    { t: 'Call recordings scored against a rubric every week', done: false, who: null },
    { t: 'One person owns the whole close, start to finish', done: false, who: null },
    { t: 'Automation maps to a named bottleneck, not novelty', done: false, who: null }
  ],
  output: {
    bendik: { unit: 'tweets', quota: 5 },
    josh:   { unit: 'reels',  quota: 4 }
  },
  posts: {},
  kpis: [
    { id: 'posts',    label: 'Posts / week',        value: 0,   target: 63,  unit: '',  up: true, derived: true },
    { id: 'calls',    label: 'Qualified calls',     value: 14,  target: 20,  unit: '',  up: true },
    { id: 'showups',  label: 'Webinar show-up',     value: 43,  target: 50,  unit: '%', up: true },
    { id: 'close',    label: 'Close rate',          value: 11,  target: 15,  unit: '%', up: true },
    { id: 'cac',      label: 'CAC',                 value: 142, target: 150, unit: '$', up: false },
    { id: 'cash',     label: 'Cash collected',      value: 46,  target: 60,  unit: 'k$', up: true }
  ],
  recurring: [],
  icps: [
    { id: 'seller', name: 'The owner ready to exit', audience: 'owners in their sixties', verb: 'get out without gutting the business',
      who: 'UK/EU owner, 55–70, £300k–£3m EBITDA, no succession plan',
      pains: ['The business cannot run a week without them', 'Brokers quoted a multiple that felt like an insult', 'Their kids do not want it'],
      desires: ['A clean exit that does not gut the team', 'A number that funds the rest of their life', 'To stop being the bottleneck'],
      objections: ['“Nobody would buy a business this dependent on me”', '“I would be handing it to a stranger”', '“I will just work two more years”'],
      triggers: ['A health scare', 'A key employee resigning', 'An unsolicited approach from a competitor'] },
    { id: 'buyer', name: 'The would-be acquirer', audience: 'first-time buyers', verb: 'buy a cash-flowing business without a deposit',
      who: 'Operator or exec, 30–50, wants to own rather than start',
      pains: ['No capital and assumes that ends the conversation', 'Cannot find deals that are not already picked over', 'Does not know what a fair structure looks like'],
      desires: ['Own a cash-flowing business inside 12 months', 'Terms instead of a deposit', 'A repeatable process, not one lucky deal'],
      objections: ['“You need money to buy a business”', '“Sellers will never finance it”', '“The good ones never come to market”'],
      triggers: ['Redundancy or a stalled career', 'Selling a first business', 'Watching a peer buy one'] }
  ],
  savedTopics: [],
  laneOwners: { demand: null, machine: null },
  us: [
    { id: 'bendik', role: '', focus: '', hours: '' },
    { id: 'josh',   role: '', focus: '', hours: '' }
  ],
  roles: [
    { id: 'setter', title: 'Appointment setter', dept: 'Revenue · Remote', comp: '$2.5k + $100 / held call',
      buys: 'Outreach comes off whoever sells — they only talk to booked prospects', target: 'Hire at 40 booked calls/mo', owner: null,
      stages: [['Applied', 34], ['Screened', 12], ['Interview', 5], ['Offer', 1]] },
    { id: 'editor', title: 'Video editor', dept: 'Content · Remote', comp: '$2.5–3.5k',
      buys: 'One person films, the editor ships — the only way 4 reels/day survives a full calendar', target: 'Hire now', owner: null,
      stages: [['Applied', 21], ['Screened', 8], ['Interview', 3], ['Offer', 0]] },
    { id: 'closer', title: 'Second closer', dept: 'Revenue · Remote', comp: '$3k + 8% commission',
      buys: 'One closer caps out around 60 held calls a month', target: 'Hire at 60 held calls/mo', owner: null,
      stages: [['Applied', 6], ['Screened', 2], ['Interview', 0], ['Offer', 0]] }
  ],
  delegation: [
    { t: 'Reel editing and captions → editor', done: false, who: null },
    { t: 'First-touch outreach and follow-up → setter', done: false, who: null },
    { t: 'Webinar reminders and no-show follow-up → automation', done: false, who: null },
    { t: 'Proposal and contract generation → templated in the CRM', done: false, who: null },
    { t: 'Ad creative uploads, naming and reporting → automated', done: false, who: null },
    { t: 'Partner webinar sourcing → setter, once trained', done: false, who: null }
  ],
  tasks: [
    { id: 't1', title: 'Call rubric + score the last 20 recordings — close rate is the constraint', track: 'sales', owner: null, status: 'now' },
    { id: 't2', title: 'Rebuild booking flow: qualify on the form, not on the call', track: 'systems', owner: null, status: 'now' },
    { id: 't3', title: 'No-show sequence: SMS + call at T−10min', track: 'systems', owner: null, status: 'now' },
    { id: 't4', title: 'Pillar: “The 3C model in 12 minutes”', track: 'content', owner: null, status: 'doing' },
    { id: 't5', title: 'Retarget campaign to webinar replay', track: 'ads', owner: null, status: 'doing' },
    { id: 't6', title: 'Book 3 partner webinars for October', track: 'webinar', owner: null, status: 'doing' },
    { id: 't7', title: 'Editor hire — final trial edits', track: 'team', owner: null, status: 'review' },
    { id: 't8', title: 'Attribution: every booked call tagged to its source', track: 'systems', owner: null, status: 'review' },
    { id: 't9', title: 'Weekly scorecard automated', track: 'systems', owner: null, status: 'done' }
  ],
  log: [],
  reviewedTs: 0
});

/* ── Store ──────────────────────────────────────────────────── */
let state;
try { state = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { state = seed(); }
if (!state.log) state = seed();

let undoStack = [];
const save = (localOnly) => {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  if (!localOnly && remote && !applyingRemote) Backend.pushState(sharedSlice(), state.me);
};
const $ = (s) => document.querySelector(s);
const el = (t, c) => { const n = document.createElement(t); if (c) n.className = c; return n; };
const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const todayKey = () => new Date().toISOString().slice(0, 10);
const quotaOf = (id) => (state.output[id] && state.output[id].quota) || 4;
const unitOf = (id) => (state.output[id] && state.output[id].unit) || 'posts';
const weeklyQuota = () => Object.keys(PEOPLE).reduce((a, id) => a + quotaOf(id) * 7, 0);

/* The one mutation path. Nothing changes state except through here. */
function change(verb, target, from, to, fn) {
  undoStack.push(JSON.stringify(state));
  if (undoStack.length > 25) undoStack.shift();
  const actor = state.me;
  fn();
  const entry = { ts: Date.now(), who: actor, verb, target,
                  from: from == null ? '' : String(from), to: to == null ? '' : String(to) };
  state.log.unshift(entry);
  if (state.log.length > 400) state.log.pop();
  save();
  if (remote && !applyingRemote) Backend.appendLog(entry);
  render();
}

function undoLast() {
  if (!undoStack.length) return;
  state = JSON.parse(undoStack.pop());
  save();
  render();
}

/* ── Theme ──────────────────────────────────────────────────── */
const applyTheme = (t) => document.documentElement.setAttribute('data-theme', t);
let theme = (() => { try { return localStorage.getItem('gl.theme'); } catch { return null; } })()
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(theme);
$('#themeToggle').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('gl.theme', theme); } catch {}
});

/* ── Identity ───────────────────────────────────────────────── */
$('#whoBtn').addEventListener('click', () => {
  const next = state.me === 'bendik' ? 'josh' : 'bendik';
  change('handed over to', PEOPLE[next].name, PEOPLE[state.me].name, PEOPLE[next].name, () => { state.me = next; });
});

/* ── Navigation ─────────────────────────────────────────────── */
function goto(view) {
  document.querySelectorAll('.seg').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
  requestAnimationFrame(animateBars);
}
document.querySelectorAll('.seg').forEach(b => b.addEventListener('click', () => goto(b.dataset.view)));
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]');
  if (g) goto(g.dataset.goto);
});
const animateBars = () => document.querySelectorAll('[data-w]').forEach(b => { b.style.width = b.dataset.w + '%'; });

/* ── Inline number editing ──────────────────────────────────── */
function editableNumber(node, get, commit, opts = {}) {
  node.classList.add('editable');
  node.tabIndex = 0;
  const start = () => {
    if (node.querySelector('input')) return;
    const cur = get();
    const input = el('input', 'inline-input');
    input.type = 'number';
    input.value = cur;
    if (opts.min != null) input.min = opts.min;
    if (opts.max != null) input.max = opts.max;
    const prev = node.innerHTML;
    node.innerHTML = '';
    node.appendChild(input);
    input.focus();
    input.select();
    const finish = (ok) => {
      const v = Number(input.value);
      if (ok && input.value !== '' && v !== cur && !Number.isNaN(v)) commit(v, cur);
      else { node.innerHTML = prev; }
    };
    input.addEventListener('blur', () => finish(true));
    input.addEventListener('keydown', ev => {
      if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
      if (ev.key === 'Escape') { ev.preventDefault(); node.innerHTML = prev; }
    });
  };
  node.addEventListener('click', start);
  node.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); start(); } });
}

/* ── Overview ───────────────────────────────────────────────── */
const constraintEl = $('#constraintText');
constraintEl.addEventListener('blur', () => {
  const to = constraintEl.textContent.trim();
  if (to && to !== state.constraint) {
    change('reset the constraint', 'Weekly constraint', state.constraint, to, () => { state.constraint = to; });
  } else constraintEl.textContent = state.constraint;
});
constraintEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); constraintEl.blur(); } });

const postsFor = (day, id) => (state.posts[day] && state.posts[day][id]) || 0;

function setPosts(day, id, n) {
  const from = postsFor(day, id);
  if (n === from) n = Math.max(0, n - 1);
  change('logged ' + unitOf(id), `${who(id).name}, ${day}`, `${from}/${quotaOf(id)}`, `${n}/${quotaOf(id)}`, () => {
    state.posts[day] = state.posts[day] || {};
    state.posts[day][id] = n;
  });
  if (remote) Backend.pushPost(day, id, n, unitOf(id));
  if (remote) Backend.pushPost(day, id, n, unitOf(id));
}

function renderOutputToday() {
  const host = $('#reelToday');
  host.innerHTML = '';
  const day = todayKey();
  Object.keys(PEOPLE).forEach(id => {
    const n = postsFor(day, id), q = quotaOf(id);
    const card = el('article', 'card reel-card');
    card.innerHTML = `
      <div class="reel-head">
        <span class="avatar" style="background:${who(id).color}">${who(id).initials}</span>
        <div><div class="reel-name">${who(id).name}</div>
          <div class="reel-sub"><span class="unit-edit" contenteditable="true" spellcheck="false">${esc(unitOf(id))}</span> today</div></div>
        <b class="reel-count ${n >= q ? 'hit' : ''}">${n}<small>/<span class="quota-edit">${q}</span></small></b>
      </div>
      <div class="dots"></div>`;
    const dots = card.querySelector('.dots');
    for (let i = 1; i <= q; i++) {
      const d = el('button', 'dot' + (i <= n ? ' on' : ''));
      d.style.setProperty('--c', who(id).color);
      d.title = `Set ${i} of ${q}`;
      d.addEventListener('click', () => setPosts(day, id, i));
      dots.appendChild(d);
    }
    const unitNode = card.querySelector('.unit-edit');
    unitNode.addEventListener('blur', () => {
      const to = unitNode.textContent.trim().toLowerCase();
      if (to && to !== unitOf(id)) {
        change('changed output type', who(id).name, unitOf(id), to, () => { state.output[id].unit = to; });
      } else unitNode.textContent = unitOf(id);
    });
    editableNumber(card.querySelector('.quota-edit'), () => quotaOf(id), (v, from) => {
      const q2 = Math.max(1, Math.min(20, v));
      change('changed daily quota', `${who(id).name} — ${unitOf(id)}`, from, q2, () => {
        state.output[id].quota = q2;
        const k = state.kpis.find(x => x.id === 'posts');
        if (k) k.target = Object.keys(PEOPLE).reduce((a, p) => a + (p === id ? q2 : quotaOf(p)) * 7, 0);
      });
    }, { min: 1, max: 20 });
    host.appendChild(card);
  });
}

function kpiCard(k) {
  const pct = Math.min(100, Math.round((k.up ? k.value / k.target : k.target / k.value) * 100));
  const ok = k.up ? k.value >= k.target : k.value <= k.target;
  const card = el('article', 'card kpi');
  card.innerHTML = `
    <div class="kpi-label">${esc(k.label)}</div>
    <div class="kpi-value"><b class="kpi-num"></b>
      <span class="trend ${ok ? 'up' : 'down'}">${ok ? 'on target' : 'behind'}</span></div>
    <div class="bar"><i data-w="${pct}" style="background:${ok ? 'var(--green)' : 'var(--orange)'}"></i></div>
    <div class="kpi-target"><span>${pct}% of target</span><span>Target ${k.unit === '$' || k.unit === 'k$' ? k.unit.replace('k$', '$') : ''}${k.target}${k.unit === '%' ? '%' : ''}${k.unit === 'k$' ? 'k' : ''}</span></div>`;
  const num = card.querySelector('.kpi-num');
  const fmt = () => (k.unit === '$' ? '$' : k.unit === 'k$' ? '$' : '') + k.value + (k.unit === '%' ? '%' : k.unit === 'k$' ? 'k' : '');
  num.textContent = fmt();
  if (k.derived) {
    card.querySelector('.kpi-target span').textContent = 'counted from the post log';
    return card;
  }
  editableNumber(num, () => k.value, (v, from) => {
    change('updated KPI', k.label, from, v, () => { state.kpis.find(x => x.id === k.id).value = v; });
  });
  return card;
}

function postsLast7() {
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = state.posts[d.toISOString().slice(0, 10)];
    if (day) total += Object.values(day).reduce((a, b) => a + b, 0);
  }
  return total;
}

function renderOverviewKpis() {
  const host = $('#overviewKpis');
  host.innerHTML = '';
  state.kpis.forEach(k => {
    if (k.derived) { k.value = postsLast7(); k.target = weeklyQuota(); }
    host.appendChild(kpiCard(k));
  });
}

function renderOwnerLoad() {
  const host = $('#ownerLoad');
  host.innerHTML = '';
  const open = state.tasks.filter(t => t.status !== 'done');
  const keys = [...Object.keys(PEOPLE), null];
  const count = (k) => open.filter(t => (k ? t.owner === k : !t.owner)).length;
  const max = Math.max(1, ...keys.map(count));
  keys.forEach(k => {
    const n = count(k);
    const li = el('li');
    li.innerHTML = `<span class="dot" style="background:${who(k).color}"></span>
      <span class="lbl">${who(k).name}</span>
      <span class="track"><i data-w="${Math.round((n / max) * 100)}" style="background:${who(k).color}"></i></span>
      <span class="val">${n}</span>`;
    host.appendChild(li);
  });
}

function renderHero() {
  constraintEl.textContent = state.constraint;
  $('#todayLabel').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  const done = state.tasks.filter(t => t.status === 'done').length;
  const pct = Math.round((done / Math.max(1, state.tasks.length)) * 100);
  const ring = $('#heroRing'), c = 2 * Math.PI * 52;
  ring.style.strokeDasharray = c;
  ring.style.strokeDashoffset = c - (c * pct) / 100;
  $('#heroPct').textContent = pct + '%';
}

/* ── Scale ──────────────────────────────────────────────────── */
const pct = (x) => x / 100;
const money = (n) => '$' + Math.round(n).toLocaleString();

/* The whole engine: five numbers in, one revenue number out. */
function funnel(m, rates, leads) {
  const booked = leads * pct(rates.book);
  const held = booked * pct(rates.show);
  const sales = held * pct(rates.close);
  return { leads, booked, held, sales, cash: sales * rates.price };
}

function modelState() {
  const m = state.model;
  const now = funnel(m, m.now, m.now.leads);
  const salesNeeded = m.target / m.bench.price;
  const perLead = pct(m.bench.book) * pct(m.bench.show) * pct(m.bench.close);
  const leadsNeeded = salesNeeded / perLead;
  const need = funnel(m, m.bench, leadsNeeded);
  const levers = [
    { key: 'book',  label: 'Booking rate', ratio: m.now.book / m.bench.book },
    { key: 'show',  label: 'Show rate',    ratio: m.now.show / m.bench.show },
    { key: 'close', label: 'Close rate',   ratio: m.now.close / m.bench.close },
    { key: 'leads', label: 'Lead volume',  ratio: m.now.leads / leadsNeeded }
  ].sort((a, b) => a.ratio - b.ratio);
  return { now, need, salesNeeded, leadsNeeded, constraint: levers[0], levers };
}

function renderTarget() {
  const m = state.model, r = modelState();
  const done = Math.min(100, (r.now.cash / m.target) * 100);
  const host = $('#targetCard');
  host.innerHTML = `
    <div class="target-top">
      <div>
        <p class="eyebrow">Monthly target</p>
        <div class="target-num"><b class="t-target"></b><span class="target-now">run rate ${money(r.now.cash)}</span></div>
      </div>
      <div class="target-gap">
        <b>${money(Math.max(0, m.target - r.now.cash))}</b><span>gap to close</span>
      </div>
    </div>
    <div class="bar big"><i data-w="${Math.round(done)}" style="background:var(--green)"></i></div>
    <div class="meta-row"><span>${Math.round(done)}% of $150k</span><span>${r.salesNeeded.toFixed(1)} sales a month at ${money(m.bench.price)}</span></div>
    <div class="constraint-call">
      <span class="pill-flag">Constraint</span>
      <b>${r.constraint.label}</b>
      <span>at ${Math.round(r.constraint.ratio * 100)}% of what $150k needs — fix this before anything else</span>
    </div>`;
  const t = host.querySelector('.t-target');
  t.textContent = money(m.target);
  editableNumber(t, () => m.target, (v, from) => {
    change('changed the target', 'Monthly target', money(from), money(v), () => { state.model.target = v; });
  });
}

const LADDER_ROWS = [
  ['leads',  'Leads',            'people who enter the world',        null],
  ['booked', 'Calls booked',     'lead → booked',                     'book'],
  ['held',   'Calls held',       'booked → showed',                   'show'],
  ['sales',  'Sales',            'held → closed',                     'close'],
  ['cash',   'Cash collected',   'sales × price',                     'price']
];

function renderLadder() {
  const m = state.model, r = modelState();
  const host = $('#ladderTable');
  const fmt = (k, v) => k === 'cash' ? money(v) : Math.round(v).toLocaleString();
  host.innerHTML = ['Stage', 'Rate now', 'Today', 'Needed for $150k', 'Rate needed']
    .map(h => `<div class="th">${h}</div>`).join('');
  LADDER_ROWS.forEach(([key, label, sub, rate]) => {
    const rowNow = rate ? (rate === 'price' ? money(m.now.price) : m.now[rate] + '%') : '—';
    const rowNeed = rate ? (rate === 'price' ? money(m.bench.price) : m.bench[rate] + '%') : '—';
    host.insertAdjacentHTML('beforeend', `
      <div class="lt-stage"><b>${label}</b><span>${sub}</span></div>
      <div class="lt-now" data-rate="${rate || ''}">${rowNow}</div>
      <div class="lt-val">${fmt(key, r.now[key])}</div>
      <div class="lt-val need">${fmt(key, r.need[key])}</div>
      <div class="lt-bench" data-rate="${rate || ''}">${rowNeed}</div>`);
  });
  host.querySelectorAll('[data-rate]').forEach(cell => {
    const rate = cell.dataset.rate;
    if (!rate) return;
    const bench = cell.classList.contains('lt-bench');
    const bag = bench ? state.model.bench : state.model.now;
    editableNumber(cell, () => bag[rate], (v, from) => {
      change('updated the model', `${bench ? 'target' : 'current'} ${rate}`, from, v, () => {
        (bench ? state.model.bench : state.model.now)[rate] = v;
        if (rate === 'price' && bench) state.model.bench.price = v;
      });
    });
  });
  const mult = (r.leadsNeeded / m.now.leads);
  $('#ladderNote').textContent =
    `At the target rates you need ${Math.round(r.leadsNeeded).toLocaleString()} leads a month — ${mult.toFixed(1)}× today. ` +
    `Conversion first: fixing close rate alone is worth ${money(funnel(m, { ...m.now, close: m.bench.close }, m.now.leads).cash - r.now.cash)}/mo without one extra lead.`;
}

function renderDaily() {
  const m = state.model, r = modelState();
  const d = (n) => Math.max(1, Math.round(n / m.workDays));
  const lanes = [
    { id: 'demand', title: 'Demand — content & sales', rows: [
      [Object.keys(PEOPLE).map(id => `${quotaOf(id)} ${unitOf(id)}`).join(' + '), 'posted, every day', 'the volume engine, non-negotiable'],
      ['100', 'outreach touches', 'Rule of 100 — DMs, comments, replies'],
      [String(d(r.need.held)), 'calls held', `${d(r.need.booked)} booked to hold that many`],
      ['20', 'call minutes reviewed', 'score yesterday against the rubric']
    ]},
    { id: 'machine', title: 'Machine — funnels, paid, data', rows: [
      ['$' + Math.max(100, Math.round((r.need.leads * 6) / m.workDays)), 'ad spend / day', 'at ~$6 a lead, held to CAC'],
      ['1', 'funnel fix shipped', 'one measurable improvement, daily'],
      ['100%', 'of bookings attributed', 'no lead lands without a source tag'],
      ['1', 'manual step deleted', 'weekly — something stops needing a human']
    ]}
  ];
  const host = $('#dailyEngine');
  host.innerHTML = '';
  lanes.forEach(lane => {
    const owner = state.laneOwners[lane.id] || null;
    const card = el('article', 'card');
    card.innerHTML = `
      <div class="reel-head">
        <div><div class="reel-name">${lane.title}</div><div class="reel-sub">every working day</div></div>
      </div>
      <ul class="daily-list">${lane.rows.map(([n, l, note]) =>
        `<li><b>${n}</b><span class="dl-label">${l}</span><span class="dl-note">${note}</span></li>`).join('')}</ul>`;
    card.querySelector('.reel-head').appendChild(
      ownerChip(owner, lane.title, (to) => { state.laneOwners[lane.id] = to; }));
    host.appendChild(card);
  });
}

function renderEcon() {
  const e = state.econ, r = modelState();
  const ratio = e.ltgp / e.cac;
  const ok = ratio >= 3;
  const cashOk = e.cash30 > e.cac;
  const host = $('#econCard');
  host.innerHTML = `
    <div class="econ-row">
      <div class="econ-cell"><span>CAC</span><b class="e-cac"></b></div>
      <div class="econ-cell"><span>LTGP</span><b class="e-ltgp"></b></div>
      <div class="econ-cell ${ok ? 'good' : 'bad'}"><span>LTGP : CAC</span><b>${ratio.toFixed(1)} : 1</b></div>
      <div class="econ-cell ${cashOk ? 'good' : 'bad'}"><span>Cash in 30 days</span><b class="e-cash"></b></div>
    </div>
    <p class="card-note">${ok ? 'Above 3:1 — the model funds itself.' : 'Under 3:1 — do not scale spend yet.'}
      ${cashOk ? `First payment of ${money(e.cash30)} covers CAC of ${money(e.cac)}, so every sale funds the next one — client-financed acquisition.`
               : 'First payment does not cover CAC — you are funding growth out of pocket. Raise the deposit or cut CAC.'}
      At ${money(e.cac)} CAC, ${r.need.sales.toFixed(1)} customers a month costs about ${money(r.need.sales * e.cac)} to acquire against ${money(state.model.target)} collected.</p>`;
  const bind = (sel, key) => {
    const n = host.querySelector(sel);
    n.textContent = money(e[key]);
    editableNumber(n, () => e[key], (v, from) => {
      change('updated economics', key.toUpperCase(), money(from), money(v), () => { state.econ[key] = v; });
    });
  };
  bind('.e-cac', 'cac'); bind('.e-ltgp', 'ltgp'); bind('.e-cash', 'cash30');
}

const LEVERS = [
  ['More customers', 'Lead volume × booking rate', 'Paid, funnels, attribution'],
  ['Higher price', 'Raise price or add a premium tier', 'Hold price on the call, no discounting'],
  ['Buy more often', 'A second offer for people who already bought', 'Deal-support retainer after the programme'],
  ['Keep them longer', 'Retention is revenue you already earned', 'Onboarding call inside 48 hours']
];

function renderLevers() {
  const host = $('#leverGrid');
  host.innerHTML = '';
  LEVERS.forEach(([title, what, how]) => {
    const card = el('article', 'card lever');
    card.innerHTML = `
      <div class="lead-top"><div class="lead-name">${title}</div></div>
      <p class="lead-note">${what}</p>
      <p class="lever-who">${how}</p>`;
    host.appendChild(card);
  });
}

function renderLeadSources() {
  const host = $('#leadSources');
  host.innerHTML = '';
  const weeklyLeads = modelState().leadsNeeded / 4.3;
  const share = { warm: 0.15, content: 0.35, cold: 0.2, paid: 0.3 };
  state.leadSources.forEach(s => {
    s.target = Math.round(weeklyLeads * (share[s.id] || 0.25));
    const pct = Math.min(100, Math.round((s.done / s.target) * 100));
    const card = el('article', 'card lead');
    card.innerHTML = `
      <div class="lead-top">
        <div class="lead-name">${esc(s.label)}</div>
      </div>
      <p class="lead-note">${esc(s.note)}</p>
      <div class="lead-count"><b class="lead-done"></b><span>/ ${s.target} leads this week</span></div>
      <div class="bar"><i data-w="${pct}" style="background:${pct >= 100 ? 'var(--green)' : 'var(--accent)'}"></i></div>`;
    const n = card.querySelector('.lead-done');
    n.textContent = s.done;
    editableNumber(n, () => s.done, (v, from) => {
      change('updated lead source', s.label, from, v, () => { state.leadSources.find(x => x.id === s.id).done = v; });
    });
    card.querySelector('.lead-top').appendChild(ownerChip(s.owner, s.label, (to) => {
      state.leadSources.find(x => x.id === s.id).owner = to;
    }));
    host.appendChild(card);
  });
}

const VE_ROWS = [
  ['dream', 'Dream outcome', 'higher is better'],
  ['likelihood', 'Perceived likelihood', 'higher is better'],
  ['time', 'Time delay', 'lower is better'],
  ['effort', 'Effort & sacrifice', 'lower is better']
];

function renderValueEq() {
  const v = state.valueEq;
  const score = ((v.dream * v.likelihood) / Math.max(1, v.time * v.effort)).toFixed(2);
  const host = $('#valueEq');
  host.innerHTML = `
    <div class="ve-head"><span>Offer score</span><b>${score}×</b></div>
    <div class="ve-rows"></div>
    <p class="card-note">(Dream × Likelihood) ÷ (Time × Effort). Move a lever, watch the score.</p>`;
  const rows = host.querySelector('.ve-rows');
  VE_ROWS.forEach(([k, label, hint]) => {
    const row = el('div', 'stage');
    row.innerHTML = `<span class="name">${label}</span>
      <span class="track"><i data-w="${v[k] * 10}" style="background:${k === 'time' || k === 'effort' ? 'var(--orange)' : 'var(--accent)'}"></i></span>
      <span class="n ve-n">${v[k]}</span><span class="ve-hint">${hint}</span>`;
    const n = row.querySelector('.ve-n');
    editableNumber(n, () => v[k], (val, from) => {
      const clamped = Math.max(1, Math.min(10, val));
      change('scored the offer', label, from, clamped, () => { state.valueEq[k] = clamped; });
    }, { min: 1, max: 10 });
    rows.appendChild(row);
  });
}

const TICK = '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderChecklist(host, items, label) {
  host.innerHTML = '';
  items.forEach((item, i) => {
    const li = el('li', item.done ? 'done' : '');
    li.innerHTML = `<span class="box">${TICK}</span><span class="txt">${esc(item.t)}</span>`;
    li.appendChild(ownerChip(item.who, item.t, (to) => { items[i].who = to; }));
    li.addEventListener('click', () => {
      change(item.done ? 'unchecked' : 'checked', item.t, item.done ? 'done' : 'open', item.done ? 'open' : 'done', () => {
        items[i].done = !items[i].done;
      });
    });
    host.appendChild(li);
  });
}

/* ── Content ────────────────────────────────────────────────── */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const LADDER = [
  ['1 pillar', 'One 12-minute recorded teaching — the week’s single idea'],
  ['→ short-form, daily', 'Each person’s daily quota, every post one claim from the pillar'],
  ['→ 3 threads', 'The pillar’s argument, unrolled'],
  ['→ 3 emails', 'Value, invite, replay + deadline'],
  ['→ 1 webinar block', 'The pillar becomes the teach segment on Thursday'],
  ['→ ad creative', 'Top 3 reels by retention become paid creative on Monday']
];
const ANGLES = [
  ['“You don’t need money to buy a business. You need terms.”', 'The whole thesis in one line. Highest-retention hook we have.'],
  ['Deal teardown: what we’d have paid, and why', 'Specific numbers beat theory. Use a real deal with details changed.'],
  ['The seller’s real motivation is never price', 'Reframes the objection before the call happens.'],
  ['Hiring in public: the setter scorecard', 'Recruits candidates and clients in the same post.'],
  ['We killed every ad under 1.5× ROAS — revenue went up', 'Counter-intuitive plus a number. Travels on X.'],
  ['8 weeks, every number on screen', 'Public metrics compound trust and feed the webinar.']
];

function setPostsAbsolute(day, id, n) {
  const from = postsFor(day, id);
  change('logged ' + unitOf(id), `${who(id).name}, ${day}`, `${from}/${quotaOf(id)}`, `${n}/${quotaOf(id)}`, () => {
    state.posts[day] = state.posts[day] || {};
    state.posts[day][id] = n;
  });
}

function renderPostGrid() {
  const host = $('#reelGrid');
  host.innerHTML = '';
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  host.appendChild(el('div', 'rg-corner'));
  days.forEach(d => {
    const h = el('div', 'rg-h' + (d.toDateString() === new Date().toDateString() ? ' today' : ''));
    h.innerHTML = `${DAYS[(d.getDay() + 6) % 7][0]}<small>${d.getDate()}</small>`;
    host.appendChild(h);
  });
  Object.keys(PEOPLE).forEach(id => {
    const q = quotaOf(id);
    const lbl = el('div', 'rg-label');
    lbl.innerHTML = `<span class="avatar sm" style="background:${who(id).color}">${who(id).initials}</span>
      <span>${who(id).name}<small class="rg-unit">${esc(unitOf(id))} · ${q}/day</small></span>`;
    host.appendChild(lbl);
    days.forEach(d => {
      const key = d.toISOString().slice(0, 10);
      const n = postsFor(key, id);
      const cell = el('button', 'rg-cell');
      if (n) {
        cell.style.background = `color-mix(in srgb, ${who(id).color} ${Math.round(Math.min(1, n / q) * 100)}%, transparent)`;
        cell.style.borderColor = 'transparent';
        cell.style.color = n / q > 0.45 ? '#fff' : 'var(--ink)';
      }
      cell.title = `${who(id).name} · ${key} · ${n}/${q} ${unitOf(id)}`;
      cell.textContent = n || '';
      cell.addEventListener('click', () => setPostsAbsolute(key, id, (n + 1) % (q + 1)));
      host.appendChild(cell);
    });
  });
}

function renderCalendar() {
  const cal = $('#calendar');
  if (!cal) return;
  cal.innerHTML = '';
  const todayIdx = (new Date().getDay() + 6) % 7;
  const tracks = [...new Set(state.recurring.map(r => r.track))];
  cal.appendChild(el('div', 'cal-h'));
  DAYS.forEach((d, i) => {
    const h = el('div', 'cal-h' + (i === todayIdx ? ' today' : ''));
    h.textContent = d;
    cal.appendChild(h);
  });
  if (!tracks.length) {
    const empty = el('div', 'cal-empty');
    empty.textContent = 'Nothing scheduled. Add a commitment and it lands here.';
    cal.appendChild(empty);
    return;
  }
  tracks.forEach(track => {
    const color = TRACK_COLOR[track] || 'var(--ink-3)';
    const lbl = el('div', 'cal-row-label');
    lbl.innerHTML = `<span class="dotc" style="background:${color}"></span>${track}`;
    cal.appendChild(lbl);
    DAYS.forEach((d, i) => {
      const cell = el('div', 'cal-cell' + (i === todayIdx ? ' today' : ''));
      state.recurring.filter(r => r.track === track).forEach(r => {
        const hits = r.cadence === 'daily'
          || (r.cadence === 'weekdays' && i < 5)
          || (r.cadence === 'weekly' && r.day === DAYS[i]);
        if (!hits) return;
        const s = el('div', 'slot');
        s.style.background = `color-mix(in srgb, ${color} 13%, transparent)`;
        s.style.color = color;
        s.innerHTML = `${esc(r.title)}<small>${esc(r.time)}${r.owner ? ' · ' + who(r.owner).name : ''}</small>`;
        cell.appendChild(s);
      });
      cal.appendChild(cell);
    });
  });
}

const TRACK_COLOR = {
  webinar: 'var(--accent)', content: 'var(--ig)', sales: 'var(--green)',
  systems: 'var(--purple)', ads: 'var(--orange)', team: 'var(--yt)'
};

function renderContentLists() {
  $('#ladder').innerHTML = LADDER.map(([a, b]) =>
    `<li><span class="rung">${esc(a)}</span><span class="rung-note">${esc(b)}</span></li>`).join('');
  $('#angleList').innerHTML = ANGLES.map(([a, b]) =>
    `<li><span class="angle-hook">${esc(a)}</span><span class="rung-note">${esc(b)}</span></li>`).join('');
}

/* ── Calendar: recurring commitments you define ─────────────── */
const DAY_IDX = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };

function nextOccurrence(r) {
  const now = new Date();
  const [hh, mm] = (r.time || '09:00').split(':').map(Number);
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);
    d.setHours(hh, mm, 0, 0);
    const dow = d.getDay();
    const hits = r.cadence === 'daily'
      || (r.cadence === 'weekdays' && dow >= 1 && dow <= 5)
      || (r.cadence === 'weekly' && dow === DAY_IDX[r.day]);
    if (hits && d > now) return d;
  }
  return null;
}

/* The last N dates this commitment was due, most recent first. */
function dueDates(r, count) {
  const out = [];
  const [hh, mm] = (r.time || '09:00').split(':').map(Number);
  for (let i = 0; i < 60 && out.length < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(hh, mm, 0, 0);
    const dow = d.getDay();
    const hits = r.cadence === 'daily'
      || (r.cadence === 'weekdays' && dow >= 1 && dow <= 5)
      || (r.cadence === 'weekly' && dow === DAY_IDX[r.day]);
    if (hits && d <= new Date()) out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function streakOf(r) {
  let n = 0;
  for (const d of dueDates(r, 30)) {
    if (r.done && r.done.includes(d)) n++;
    else break;
  }
  return n;
}

function renderRecurring() {
  const host = $('#recurGrid');
  host.innerHTML = '';
  if (!state.recurring.length) {
    host.innerHTML = `<div class="card empty-card">
      <p><b>No commitments yet.</b></p>
      <p class="card-note">Add the things that only work if they happen on schedule — a webinar every
      Thursday, a batch-filming block on Sunday, a Friday numbers review. Each one shows up in the week
      below and keeps a streak.</p></div>`;
    return;
  }
  state.recurring.forEach((r, i) => {
    const next = nextOccurrence(r);
    const streak = streakOf(r);
    const card = el('article', 'card recur');
    const cadence = r.cadence === 'weekly' ? `Every ${r.day}` : r.cadence === 'weekdays' ? 'Every weekday' : 'Every day';
    card.innerHTML = `
      <div class="recur-top">
        <div>
          <div class="reel-name">${esc(r.title)}</div>
          <div class="reel-sub">${cadence} · ${esc(r.time)} · ${esc(r.track)}</div>
        </div>
      </div>
      <div class="recur-mid">
        <div><b>${streak}</b><span>streak</span></div>
        <div><b>${next ? next.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) : '—'}</b><span>next</span></div>
        <div><b>${next ? Math.max(0, Math.round((next - new Date()) / 36e5)) + 'h' : '—'}</b><span>from now</span></div>
      </div>
      <div class="recur-hist"></div>
      <button class="link-btn del-recur">Remove</button>`;
    card.querySelector('.recur-top').appendChild(ownerChip(r.owner, r.title, (to) => { state.recurring[i].owner = to; }));

    const hist = card.querySelector('.recur-hist');
    dueDates(r, 8).reverse().forEach(day => {
      const doneIt = (r.done || []).includes(day);
      const b = el('button', 'hist-cell' + (doneIt ? ' hit' : ''));
      b.textContent = day.slice(8);
      b.title = day + (doneIt ? ' — done' : ' — click to mark done');
      b.addEventListener('click', () => {
        change(doneIt ? 'un-marked' : 'marked done', `${r.title} · ${day}`, doneIt ? 'done' : 'missed', doneIt ? 'missed' : 'done', () => {
          const rec = state.recurring[i];
          rec.done = rec.done || [];
          rec.done = doneIt ? rec.done.filter(x => x !== day) : rec.done.concat(day);
        });
      });
      hist.appendChild(b);
    });
    card.querySelector('.del-recur').addEventListener('click', () => {
      change('removed commitment', r.title, 'recurring', 'deleted', () => { state.recurring.splice(i, 1); });
    });
    host.appendChild(card);
  });
}

const recurSheet = $('#recurSheet');
const closeRecur = () => { recurSheet.hidden = true; scrim.hidden = true; $('#r-title').value = ''; };
$('#newRecurBtn').addEventListener('click', () => {
  recurSheet.hidden = false; scrim.hidden = false; $('#r-title').focus();
});
$('#cancelRecur').addEventListener('click', closeRecur);
$('#r-cadence').addEventListener('change', () => {
  $('#r-day-wrap').style.display = $('#r-cadence').value === 'weekly' ? '' : 'none';
});
$('#saveRecur').addEventListener('click', () => {
  const title = $('#r-title').value.trim();
  if (!title) { $('#r-title').focus(); return; }
  const r = {
    id: 'r' + Date.now(), title,
    track: $('#r-track').value, cadence: $('#r-cadence').value,
    day: $('#r-day').value, time: $('#r-time').value || '09:00',
    owner: null, done: []
  };
  closeRecur();
  change('added commitment', title, '', r.cadence === 'weekly' ? `every ${r.day} ${r.time}` : `${r.cadence} ${r.time}`,
    () => { state.recurring.push(r); });
});

/* ── Topic generator, built from the ICPs ───────────────────── */
const HOOKS = {
  reel: [
    (c) => `“${c.objection}” — here’s the maths that says otherwise`,
    (c) => `If ${c.pain.toLowerCase()}, you do not have a ${c.noun} problem`,
    (c) => `The 60-second version of how ${c.audience} ${c.verb}`,
    (c) => `Nobody tells ${c.audience} this: ${c.pain.toLowerCase()}`,
    (c) => `What happens the week after ${c.trigger.toLowerCase()}`,
    (c) => `Three words that change the answer to “${c.objection}”`,
    (c) => `${c.desire} — without the part everyone assumes you need`,
    (c) => `I would not touch this deal. Here is the one line that gave it away`,
    (c) => `${c.pain}. That is a solvable problem, and here is the order to solve it in`,
    (c) => `The question to ask before you believe anyone about ${c.topic}`,
    (c) => `${c.audience.charAt(0).toUpperCase() + c.audience.slice(1)} keep losing money on ${c.topic}. Here is where`
  ],
  short: [
    (c) => `“${c.objection}” Wrong. Here’s why`,
    (c) => `${c.pain} → the fix takes one conversation`,
    (c) => `The number ${c.audience} always get wrong`,
    (c) => `${c.trigger}? That is the moment to move`,
    (c) => `${c.desire}, explained in 40 seconds`,
    (c) => `Stop asking about price. Ask this instead`,
    (c) => `One sentence that reframes ${c.topic}`,
    (c) => `${c.pain} — 30 seconds on why that is fixable`
  ],
  youtube: [
    (c) => `How ${c.audience} ${c.verb} — the full process, start to finish`,
    (c) => `Deal teardown: ${c.pain} and what we would have paid`,
    (c) => `“${c.objection}” — answered with real numbers on screen`,
    (c) => `The 12-minute version of everything we know about ${c.topic}`,
    (c) => `What to do in the 90 days after ${c.trigger.toLowerCase()}`,
    (c) => `We ran the numbers on ${c.topic}. Here is where it breaks`,
    (c) => `${c.desire}: the structure, the terms, the mistakes`,
    (c) => `Everything ${c.audience} get wrong about ${c.topic}`,
    (c) => `A full walkthrough for anyone facing ${c.trigger.toLowerCase()}`
  ]
};
const WHY = [
  'Leads with their objection, so the sceptics stay to argue.',
  'Specific enough that only your ICP feels spoken to.',
  'A number in the hook — the fastest credibility you can buy.',
  'Names the moment they are already living through.',
  'Contradicts the thing everyone repeats, so it earns a comment.',
  'Process transparency: they can steal it, which is why they save it.'
];
const NOUNS = ['pricing', 'buyer', 'timing', 'valuation', 'marketing'];
const TOPICS = ['seller financing', 'earn-outs', 'owner dependency', 'deal structure', 'due diligence', 'exit multiples'];


let genSeed = Date.now();
const rnd = () => { genSeed = (genSeed * 1103515245 + 12345) % 2147483648; return genSeed / 2147483648; };
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(rnd() * (i + 1));
    [a[i], a[k]] = [a[k], a[i]];
  }
  return a;
}

function generateTopics(icp, format, n = 10) {
  const out = [];
  const seen = new Set();
  let deck = [];
  const audience = icp.audience || 'them';
  for (let guard = 0; out.length < n && guard < n * 8; guard++) {
    if (!deck.length) deck = shuffle(HOOKS[format]);
    const template = deck.pop();
    const ctx = {
      pain: pick(icp.pains), desire: pick(icp.desires),
      objection: pick(icp.objections).replace(/[“”]/g, ''),
      trigger: pick(icp.triggers),
      audience, who: audience, verb: icp.verb || 'get there',
      noun: pick(NOUNS), topic: pick(TOPICS)
    };
    const title = template(ctx);
    if (seen.has(title)) continue;
    seen.add(title);
    out.push({ title, why: pick(WHY), format, icp: icp.id });
  }
  return out;
}

let lastGenerated = [];

function renderTopics() {
  const sel = $('#genIcp');
  if (sel.options.length !== state.icps.length) {
    sel.innerHTML = state.icps.map(i => `<option value="${i.id}">${esc(i.name)}</option>`).join('');
  }
  const host = $('#topicGrid');
  const items = lastGenerated.length ? lastGenerated : state.savedTopics;
  host.innerHTML = '';
  if (!items.length) {
    host.innerHTML = `<div class="card empty-card"><p><b>Nothing generated yet.</b></p>
      <p class="card-note">Pick an ICP and a format, then hit Generate. Ideas are built from the pains,
      objections and triggers you have written below — edit those and the output changes.</p></div>`;
  }
  items.forEach((t, i) => {
    const saved = state.savedTopics.some(s => s.title === t.title);
    const card = el('article', 'card topic');
    card.innerHTML = `
      <span class="fmt">${t.format === 'youtube' ? 'YouTube' : t.format === 'short' ? 'Short' : 'Reel'}</span>
      <p class="angle-hook">${esc(t.title)}</p>
      <p class="rung-note">${esc(t.why)}</p>
      <div class="topic-actions">
        <button class="chip-btn ${saved ? 'active' : ''}">${saved ? 'Saved' : 'Save'}</button>
        <button class="chip-btn to-board">Send to board</button>
      </div>`;
    const [saveBtn, boardBtn] = card.querySelectorAll('.chip-btn');
    saveBtn.addEventListener('click', () => {
      if (saved) return;
      change('saved topic', t.title, '', 'saved', () => { state.savedTopics.unshift(t); });
    });
    boardBtn.addEventListener('click', () => {
      change('added task', t.title, 'topic', 'This week', () => {
        state.tasks.unshift({ id: 't' + Date.now() + i, title: t.title, track: 'content', owner: null, status: 'now' });
      });
    });
    host.appendChild(card);
  });
  renderIcps();
}

$('#genBtn').addEventListener('click', () => {
  const icp = state.icps.find(i => i.id === $('#genIcp').value) || state.icps[0];
  const format = $('#genFormat').value;
  genSeed = Date.now();
  lastGenerated = generateTopics(icp, format);
  change('generated topics', `10 ${format} ideas for ${icp.name}`, '', 'drafted', () => {});
});

const ICP_FIELDS = [['pains', 'Pains'], ['desires', 'Desires'], ['objections', 'Objections'], ['triggers', 'Triggers']];

function renderIcps() {
  const host = $('#icpGrid');
  host.innerHTML = '';
  state.icps.forEach((icp, idx) => {
    const card = el('article', 'card icp');
    card.innerHTML = `<div class="reel-name">${esc(icp.name)}</div>
      <div class="icp-who" contenteditable="true" spellcheck="false">${esc(icp.who)}</div>
      ${ICP_FIELDS.map(([k, label]) => `
        <div class="icp-block" data-field="${k}">
          <div class="icp-label">${label}</div>
          <ul>${icp[k].map((v, i) => `<li contenteditable="true" spellcheck="false" data-i="${i}">${esc(v)}</li>`).join('')}</ul>
          <button class="link-btn add-line">+ add</button>
        </div>`).join('')}`;

    card.querySelector('.icp-who').addEventListener('blur', (e) => {
      const to = e.target.textContent.trim();
      if (to && to !== icp.who) change('edited ICP', `${icp.name} — who`, icp.who, to, () => { state.icps[idx].who = to; });
    });
    card.querySelectorAll('.icp-block').forEach(block => {
      const field = block.dataset.field;
      block.querySelectorAll('li').forEach(li => {
        li.addEventListener('blur', () => {
          const i = Number(li.dataset.i);
          const to = li.textContent.trim();
          const from = state.icps[idx][field][i];
          if (to === from) return;
          change('edited ICP', `${icp.name} — ${field}`, from, to || '(removed)', () => {
            if (to) state.icps[idx][field][i] = to;
            else state.icps[idx][field].splice(i, 1);
          });
        });
      });
      block.querySelector('.add-line').addEventListener('click', () => {
        change('added ICP line', `${icp.name} — ${field}`, '', 'new line', () => {
          state.icps[idx][field].push('New line — click to edit');
        });
      });
    });
    host.appendChild(card);
  });
}

/* ── Team ───────────────────────────────────────────────────── */
function renderTeam() {
  const us = $('#usGrid');
  us.innerHTML = '';
  state.us.forEach((p, idx) => {
    const card = el('article', 'card person');
    card.innerHTML = `
      <div class="reel-head">
        <span class="avatar" style="background:${who(p.id).color}">${who(p.id).initials}</span>
        <div><div class="reel-name">${who(p.id).name}</div>
          <div class="reel-sub role-edit" contenteditable="true" spellcheck="false" data-k="role">${esc(p.role) || 'Role — click to write'}</div></div>
      </div>
      <p class="person-focus role-edit" contenteditable="true" spellcheck="false" data-k="focus">${esc(p.focus) || 'What they are actually responsible for this quarter'}</p>
      <div class="meta-row"><span class="role-edit" contenteditable="true" spellcheck="false" data-k="hours">${esc(p.hours) || 'Working pattern'}</span><span>${state.tasks.filter(t => t.owner === p.id && t.status !== 'done').length} open tasks</span></div>`;
    card.querySelectorAll('.role-edit').forEach(node => {
      node.addEventListener('blur', () => {
        const k = node.dataset.k, to = node.textContent.trim(), from = state.us[idx][k];
        if (to === from || to.startsWith('Role —') || to.startsWith('What they') || to === 'Working pattern') return;
        change('edited profile', `${who(p.id).name} — ${k}`, from || '(empty)', to, () => { state.us[idx][k] = to; });
      });
    });
    us.appendChild(card);
  });

  const grid = $('#roleGrid');
  grid.innerHTML = '';
  state.roles.forEach(role => {
    const max = Math.max(...role.stages.map(s => s[1]), 1);
    const card = el('article', 'card');
    card.innerHTML = `
      <div class="role-head">
        <div>
          <h3>${esc(role.title)}</h3>
          <div class="role-meta">${esc(role.dept)}</div>
        </div>

      </div>
      <p class="buys">${esc(role.buys)}</p>
      <div class="funnel">
        ${role.stages.map(([n, v]) => `
          <div class="stage"><span class="name">${n}</span>
          <span class="track"><i data-w="${Math.round((v / max) * 100)}" style="background:${who(role.owner).color}"></i></span>
          <span class="n">${v}</span></div>`).join('')}
      </div>
      <div class="role-foot"><span>${esc(role.comp)}</span><span>${esc(role.target)}</span></div>`;
    card.querySelector('.role-head').appendChild(ownerChip(role.owner, role.title + ' (hiring owner)', (to) => {
      state.roles.find(r => r.id === role.id).owner = to;
    }));
    grid.appendChild(card);
  });

  renderChecklist($('#delegationList'), state.delegation);
}

/* ── Board ──────────────────────────────────────────────────── */
const COLUMNS = [
  { id: 'now',    label: 'This week' },
  { id: 'doing',  label: 'Doing' },
  { id: 'review', label: 'Review' },
  { id: 'done',   label: 'Done' }
];
let filter = 'all';

function renderBoard() {
  const board = $('#board');
  board.innerHTML = '';
  COLUMNS.forEach(col => {
    const tasks = state.tasks.filter(t => t.status === col.id &&
      (filter === 'all' || t.track === filter || t.owner === filter || (filter === 'unassigned' && !t.owner)));
    const wrap = el('div', 'column');
    const head = el('div', 'column-head');
    head.innerHTML = `<h4>${col.label}</h4><span class="count-pill">${tasks.length}</span>`;
    const stack = el('div', 'stack-cards');
    tasks.forEach(t => stack.appendChild(taskCard(t)));
    wrap.append(head, stack);
    wrap.addEventListener('dragover', e => { e.preventDefault(); wrap.classList.add('drag-over'); });
    wrap.addEventListener('dragleave', () => wrap.classList.remove('drag-over'));
    wrap.addEventListener('drop', e => {
      e.preventDefault();
      wrap.classList.remove('drag-over');
      const t = state.tasks.find(x => x.id === e.dataTransfer.getData('text/plain'));
      if (t && t.status !== col.id) {
        const fromLabel = COLUMNS.find(c => c.id === t.status).label;
        change('moved', t.title, fromLabel, col.label, () => { t.status = col.id; });
      }
    });
    board.appendChild(wrap);
  });
}

function taskCard(t) {
  const card = el('article', 'task');
  card.draggable = true;
  card.innerHTML = `
    <p class="task-title"></p>
    <div class="task-foot">
      <span class="tag">${esc(t.track)}</span>
      <span style="display:flex;align-items:center;gap:6px">
        <button class="del" title="Delete task" aria-label="Delete task">&times;</button>

      </span>
    </div>`;
  card.querySelector('.task-title').textContent = t.title;
  card.querySelector('.task-foot > span:last-child').appendChild(
    ownerChip(t.owner, t.title, (to) => { t.owner = to; }));
  card.querySelector('.del').addEventListener('click', () => {
    change('deleted task', t.title, 'on board', 'removed', () => {
      state.tasks = state.tasks.filter(x => x.id !== t.id);
    });
  });
  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', t.id);
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
  return card;
}

document.querySelectorAll('#filters .chip-btn').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('#filters .chip-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  filter = b.dataset.filter;
  renderBoard();
}));

/* ── Activity log ───────────────────────────────────────────── */
let actFilter = 'all';
document.querySelectorAll('#actFilters .chip-btn').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('#actFilters .chip-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  actFilter = b.dataset.actor;
  renderFeed();
}));

function ago(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' ' + new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function entryHtml(e, full) {
  const p = who(e.who);
  const delta = e.from || e.to
    ? `<span class="delta-pair"><span class="was">${esc(e.from)}</span><span class="arrow">→</span><span class="now">${esc(e.to)}</span></span>` : '';
  return `<li class="${e.ts > state.reviewedTs ? 'unseen' : ''}">
    <span class="avatar sm" style="background:${p.color}">${p.initials}</span>
    <span class="entry">
      <span class="entry-line"><b>${p.name}</b> ${esc(e.verb)} <span class="target">${esc(e.target)}</span></span>
      ${full ? delta : ''}
    </span>
    <span class="when-ago">${ago(e.ts)}</span></li>`;
}

function renderFeed() {
  const list = state.log.filter(e => actFilter === 'all' || e.who === actFilter);
  $('#feed').innerHTML = list.length
    ? list.slice(0, 200).map(e => entryHtml(e, true)).join('')
    : '<li class="empty">No changes yet. Everything you edit here gets recorded.</li>';
  $('#miniFeed').innerHTML = state.log.length
    ? state.log.slice(0, 6).map(e => entryHtml(e, false)).join('')
    : '<li class="empty">No changes yet.</li>';
  const unseen = state.log.filter(e => e.ts > state.reviewedTs).length;
  const badge = $('#navBadge');
  badge.hidden = unseen === 0;
  badge.textContent = unseen;
  $('#footState').textContent =
    `${state.log.length} change${state.log.length === 1 ? '' : 's'} logged on this device · ${unseen} unreviewed`;
}

$('#markReviewed').addEventListener('click', () => {
  state.reviewedTs = Date.now();
  save();
  renderFeed();
});
$('#undoLast').addEventListener('click', undoLast);

/* localStorage is per-browser, so moving data between devices is a file. */
$('#exportState').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = el('a');
  a.href = URL.createObjectURL(blob);
  a.download = `gl-ops-${who(state.me).name.toLowerCase()}-${todayKey()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

$('#importState').addEventListener('click', () => $('#importFile').click());
$('#importFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    let incoming;
    try { incoming = JSON.parse(reader.result); } catch { alert('That file is not valid G&L Ops data.'); return; }
    if (!incoming || !Array.isArray(incoming.log)) { alert('That file is not valid G&L Ops data.'); return; }
    const mine = state.log.length, theirs = incoming.log.length;
    if (!confirm(`Replace this device's data (${mine} changes) with the imported file (${theirs} changes)?\n\nYour current data is kept in the undo stack.`)) return;
    change('imported data', file.name, `${mine} changes`, `${theirs} changes`, () => {
      const me = state.me;
      state = incoming;
      state.me = me;
    });
  };
  reader.readAsText(file);
  e.target.value = '';
});
$('#exportLog').addEventListener('click', () => {
  const text = state.log.map(e =>
    `${new Date(e.ts).toISOString()}\t${PEOPLE[e.who].name}\t${e.verb}\t${e.target}\t${e.from} -> ${e.to}`).join('\n');
  navigator.clipboard?.writeText(text).then(
    () => { $('#exportLog').textContent = 'Copied'; setTimeout(() => { $('#exportLog').textContent = 'Export log'; }, 1600); },
    () => {}
  );
});

/* ── New task sheet ─────────────────────────────────────────── */
const sheet = $('#sheet'), scrim = $('#scrim');
const closeSheet = () => { sheet.hidden = true; scrim.hidden = true; $('#f-title').value = ''; };
$('#newTaskBtn').addEventListener('click', () => {
  sheet.hidden = false; scrim.hidden = false;
  $('#f-title').focus();
});
$('#cancelTask').addEventListener('click', closeSheet);
scrim.addEventListener('click', () => { closeSheet(); closeRecur(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
$('#saveTask').addEventListener('click', () => {
  const title = $('#f-title').value.trim();
  if (!title) { $('#f-title').focus(); return; }
  const task = {
    id: 't' + Date.now(), title,
    track: $('#f-track').value, owner: $('#f-owner').value || null, status: $('#f-status').value
  };
  closeSheet();
  change('added task', title, '', COLUMNS.find(c => c.id === task.status).label, () => { state.tasks.unshift(task); });
  goto('board');
});

$('#resetBtn').addEventListener('click', () => {
  const keepLog = state.log;
  state = seed();
  state.log = keepLog;
  state.log.unshift({ ts: Date.now(), who: state.me, verb: 'reset', target: 'all data to seed values', from: '', to: '' });
  save();
  render();
});

/* ═══════════════════════════════════════════════════════════════
   Backend: ops_state (board), post_log (output), activity_log (history)
   ═══════════════════════════════════════════════════════════════ */

const LOCAL_ONLY = ['me', 'reviewedTs', 'log', 'posts'];
const sharedSlice = () => {
  const out = {};
  Object.keys(state).forEach(k => { if (!LOCAL_ONLY.includes(k)) out[k] = state[k]; });
  return out;
};

let remote = false;          // true once signed in and loaded
let applyingRemote = false;  // guard so incoming data does not echo back

function syncChip(mode, detail) {
  const chip = $('#sync');
  if (!chip) return;
  chip.dataset.mode = mode;
  $('#syncText').textContent = detail;
}

Backend.onStatus = syncChip;

Backend.onChange = async (what, row) => {
  if (!row) return;
  applyingRemote = true;
  if (what === 'state' && row.data) {
    Object.keys(row.data).forEach(k => { if (!LOCAL_ONLY.includes(k)) state[k] = row.data[k]; });
  } else if (what === 'post') {
    state.posts[row.day] = state.posts[row.day] || {};
    state.posts[row.day][row.person] = row.count;
  } else if (what === 'log') {
    const entry = { ts: new Date(row.ts).getTime(), who: row.actor, verb: row.verb,
                    target: row.target, from: row.from_val || '', to: row.to_val || '' };
    if (!state.log.some(e => e.ts === entry.ts && e.who === entry.who && e.target === entry.target)) {
      state.log.unshift(entry);
      state.log.sort((a, b) => b.ts - a.ts);
    }
  }
  applyingRemote = false;
  save(true);
  render();
};

async function goLive() {
  const ok = await Backend.connect();
  if (!ok) return;
  try {
    const data = await Backend.loadAll();
    applyingRemote = true;
    if (data.state) Object.keys(data.state).forEach(k => { if (!LOCAL_ONLY.includes(k)) state[k] = data.state[k]; });
    state.posts = data.posts || {};
    state.log = data.log || [];
    applyingRemote = false;
    remote = true;
    if (!data.state) await Backend.pushState(sharedSlice(), state.me);  // first run seeds the table
    save(true);
    render();
  } catch (e) {
    Backend.setStatus('error', 'Load failed');
  }
}

/* ── Connection sheet ───────────────────────────────────────── */
const dbSheet = $('#dbSheet');
const showErr = (msg) => { const e = $('#dbError'); e.hidden = !msg; e.textContent = msg || ''; };

function openDb() {
  const cfg = Backend.config();
  const configured = !!cfg;
  $('#dbStep1').hidden = configured;
  $('#dbStep2').hidden = !configured;
  $('#dbForget').hidden = !configured;
  $('#dbTitle').textContent = configured ? (Backend.status === 'live' ? 'Database' : 'Sign in') : 'Connect the database';
  $('#dbNext').textContent = configured ? 'Send link' : 'Save';
  $('#dbNext').hidden = Backend.status === 'live';
  $('#dbSent').hidden = true;
  showErr('');
  if (cfg) { $('#db-url').value = cfg.url; }
  dbSheet.hidden = false;
  scrim.hidden = false;
}
const closeDb = () => { dbSheet.hidden = true; scrim.hidden = true; };

$('#sync').addEventListener('click', openDb);
$('#dbCancel').addEventListener('click', closeDb);
$('#dbForget').addEventListener('click', async () => {
  await Backend.signOut().catch(() => {});
  Backend.clearConfig();
  remote = false;
  syncChip('local', 'This device only');
  closeDb();
});
$('#dbNext').addEventListener('click', async () => {
  showErr('');
  if (!Backend.config()) {
    const url = $('#db-url').value.trim().replace(/\/$/, '');
    const key = $('#db-key').value.trim();
    if (!url || !key) { showErr('Both fields are needed.'); return; }
    Backend.saveConfig(url, key);
    openDb();
    return;
  }
  const email = $('#db-email').value.trim();
  if (!email) { showErr('Enter your email.'); return; }
  try {
    await Backend.signIn(email);
    $('#dbSent').hidden = false;
  } catch (e) {
    showErr(e.message || 'Could not send the link.');
  }
});

/* ── Render ─────────────────────────────────────────────────── */
function render() {
  $('#whoAvatar').textContent = PEOPLE[state.me].initials;
  $('#whoAvatar').style.background = PEOPLE[state.me].color;
  $('#whoName').textContent = PEOPLE[state.me].name;

  renderHero(); renderOutputToday(); renderOverviewKpis(); renderOwnerLoad();
  renderTarget(); renderLadder(); renderDaily(); renderEcon(); renderLevers(); renderLeadSources(); renderValueEq(); renderChecklist($('#operatorList'), state.operator);
  renderPostGrid(); renderContentLists();
  renderRecurring(); renderCalendar(); renderTopics(); renderTeam(); renderBoard(); renderFeed();
  requestAnimationFrame(animateBars);
}
render();
goLive();
