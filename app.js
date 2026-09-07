/* G&L Ops — Bendik & Josh.
   Hormozi (constraint, four lead sources, value equation, offer math)
   + Haynes (operator audit, partner webinars) frameworks.
   Every mutation is written to a local, device-only change log. */

const KEY = 'gl.ops.v2';
const PEOPLE = {
  bendik: { name: 'Bendik', initials: 'B', color: 'var(--accent)' },
  josh:   { name: 'Josh',   initials: 'J', color: 'var(--purple)' }
};
const REEL_QUOTA = 4;

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
    { id: 'warm',    label: 'Warm outreach', note: 'Old clients, LinkedIn 1st degree, past webinar no-shows', owner: 'josh',   target: 100, done: 14 },
    { id: 'content', label: 'Free content',  note: 'Reels, threads, long-form — 4 reels a day, Josh on camera', owner: 'josh',   target: 56,  done: 38 },
    { id: 'cold',    label: 'Cold outreach', note: 'Owner lists, 55–70, EBITDA £300k+ — sequences Bendik built', owner: 'josh',   target: 250, done: 24 },
    { id: 'paid',    label: 'Paid ads',      note: 'Meta + YouTube to the webinar funnel',                       owner: 'bendik', target: 120, done: 45 }
  ],
  valueEq: { dream: 9, likelihood: 7, time: 5, effort: 6 },
  operator: [
    { t: 'Every recurring task has a written SOP, not a person', done: true,  who: 'bendik' },
    { t: 'Weekly scorecard reviewed Friday — numbers before opinions', done: true, who: 'bendik' },
    { t: 'One dashboard is the source of truth (this one)', done: true, who: 'bendik' },
    { t: 'CRM fires the booking, reminder and no-show sequences without us', done: false, who: 'bendik' },
    { t: 'Call recordings scored against a rubric every week', done: false, who: 'josh' },
    { t: 'Bendik is not in any sales call — Josh owns the whole close', done: false, who: 'josh' },
    { t: 'Automation maps to a named bottleneck, not novelty', done: false, who: 'bendik' }
  ],
  reels: {},
  kpis: [
    { id: 'reels',    label: 'Reels / week',        value: 0,   target: 56,  unit: '',  up: true, derived: true },
    { id: 'calls',    label: 'Qualified calls',     value: 14,  target: 20,  unit: '',  up: true },
    { id: 'showups',  label: 'Webinar show-up',     value: 43,  target: 50,  unit: '%', up: true },
    { id: 'close',    label: 'Close rate',          value: 11,  target: 15,  unit: '%', up: true },
    { id: 'cac',      label: 'CAC',                 value: 142, target: 150, unit: '$', up: false },
    { id: 'cash',     label: 'Cash collected',      value: 46,  target: 60,  unit: 'k$', up: true }
  ],
  webinar: {
    title: 'How to buy a business without using your own money',
    sub: 'The 3C model, live — Capabilities, Capital, Closing. Then the offer.',
    funnel: { registered: 412, showed: 178, stayed: 121, bought: 39 },
    partners: [
      { name: 'Accountancy network — SE England', audience: '4,200 owners', status: 'Booked 14 Oct',   owner: 'josh' },
      { name: 'Business brokers association',      audience: '1,800',       status: 'Proposal sent',   owner: 'josh' },
      { name: 'Exit-planning newsletter',          audience: '9,500',       status: 'In conversation', owner: 'josh' },
      { name: 'Franchise owners community',        audience: '2,600',       status: 'To approach',     owner: 'josh' }
    ]
  },
  us: [
    { id: 'bendik', role: 'Systems, funnels, paid, data', focus: 'Build the machine that books Josh’s calendar without either of us touching it', hours: 'Build 09–15 · no calls' },
    { id: 'josh',   role: 'Content, sales, closing', focus: 'On camera every day, on the phone every afternoon', hours: 'Film 09–11 · calls 12–18' }
  ],
  roles: [
    { id: 'setter', title: 'Appointment setter', dept: 'Revenue · Remote', comp: '$2.5k + $100 / held call',
      buys: 'Takes outreach off Josh so he only talks to booked prospects', target: 'Hire at 40 booked calls/mo', owner: 'josh',
      stages: [['Applied', 34], ['Screened', 12], ['Interview', 5], ['Offer', 1]] },
    { id: 'editor', title: 'Video editor', dept: 'Content · Remote', comp: '$2.5–3.5k',
      buys: 'Josh films, editor ships — the only way 4 reels/day survives a full call calendar', target: 'Hire now', owner: 'josh',
      stages: [['Applied', 21], ['Screened', 8], ['Interview', 3], ['Offer', 0]] },
    { id: 'closer', title: 'Second closer', dept: 'Revenue · Remote', comp: '$3k + 8% commission',
      buys: 'Josh cannot hold more than ~60 calls a month alone', target: 'Hire at 60 held calls/mo', owner: 'josh',
      stages: [['Applied', 6], ['Screened', 2], ['Interview', 0], ['Offer', 0]] }
  ],
  delegation: [
    { t: 'Reel editing and captions → editor (Josh films only)', done: false, who: 'josh' },
    { t: 'First-touch outreach and follow-up → setter', done: false, who: 'josh' },
    { t: 'Webinar reminders and no-show follow-up → automation', done: true, who: 'bendik' },
    { t: 'Proposal and contract generation → templated in the CRM', done: false, who: 'bendik' },
    { t: 'Ad creative uploads, naming and reporting → automated', done: false, who: 'bendik' },
    { t: 'Partner webinar sourcing → setter, once trained', done: false, who: 'josh' }
  ],
  tasks: [
    { id: 't1', title: 'Call rubric + score last 20 recordings — close rate is the constraint', track: 'sales', owner: 'josh', status: 'now' },
    { id: 't2', title: 'Rebuild booking flow: qualify on the form, not on the call', track: 'systems', owner: 'bendik', status: 'now' },
    { id: 't3', title: 'No-show sequence: SMS + call at T−10min', track: 'systems', owner: 'bendik', status: 'now' },
    { id: 't4', title: 'Pillar: “The 3C model in 12 minutes”', track: 'content', owner: 'josh', status: 'doing' },
    { id: 't5', title: 'Retarget campaign to webinar replay', track: 'ads', owner: 'bendik', status: 'doing' },
    { id: 't6', title: 'Book 3 partner webinars for October', track: 'webinar', owner: 'josh', status: 'doing' },
    { id: 't7', title: 'Editor hire — final trial edits', track: 'team', owner: 'josh', status: 'review' },
    { id: 't8', title: 'Attribution: every booked call tagged to its source', track: 'systems', owner: 'bendik', status: 'review' },
    { id: 't9', title: 'Weekly scorecard automated', track: 'systems', owner: 'bendik', status: 'done' }
  ],
  log: [],
  reviewedTs: 0
});

/* ── Store ──────────────────────────────────────────────────── */
let state;
try { state = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { state = seed(); }
if (!state.log) state = seed();

let undoStack = [];
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
const $ = (s) => document.querySelector(s);
const el = (t, c) => { const n = document.createElement(t); if (c) n.className = c; return n; };
const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const todayKey = () => new Date().toISOString().slice(0, 10);

/* The one mutation path. Nothing changes state except through here. */
function change(verb, target, from, to, fn) {
  undoStack.push(JSON.stringify(state));
  if (undoStack.length > 25) undoStack.shift();
  const actor = state.me;
  fn();
  state.log.unshift({ ts: Date.now(), who: actor, verb, target, from: from == null ? '' : String(from), to: to == null ? '' : String(to) });
  if (state.log.length > 400) state.log.pop();
  save();
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

const reelsFor = (day, who) => (state.reels[day] && state.reels[day][who]) || 0;

function setReels(day, who, n) {
  const from = reelsFor(day, who);
  if (n === from) n = n - 1 < 0 ? 0 : n - 1;
  change('logged reels for', `${PEOPLE[who].name}, ${day}`, from + '/' + REEL_QUOTA, n + '/' + REEL_QUOTA, () => {
    state.reels[day] = state.reels[day] || {};
    state.reels[day][who] = n;
  });
}

function renderReelToday() {
  const host = $('#reelToday');
  host.innerHTML = '';
  const day = todayKey();
  Object.keys(PEOPLE).forEach(who => {
    const n = reelsFor(day, who);
    const card = el('article', 'card reel-card');
    card.innerHTML = `
      <div class="reel-head">
        <span class="avatar" style="background:${PEOPLE[who].color}">${PEOPLE[who].initials}</span>
        <div><div class="reel-name">${PEOPLE[who].name}</div><div class="reel-sub">reels today</div></div>
        <b class="reel-count ${n >= REEL_QUOTA ? 'hit' : ''}">${n}<small>/${REEL_QUOTA}</small></b>
      </div>
      <div class="dots"></div>`;
    const dots = card.querySelector('.dots');
    for (let i = 1; i <= REEL_QUOTA; i++) {
      const d = el('button', 'dot' + (i <= n ? ' on' : ''));
      d.style.setProperty('--c', PEOPLE[who].color);
      d.title = `Set ${i} of ${REEL_QUOTA}`;
      d.addEventListener('click', () => setReels(day, who, i));
      dots.appendChild(d);
    }
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
    card.querySelector('.kpi-target span').textContent = 'counted from the reel log';
    return card;
  }
  editableNumber(num, () => k.value, (v, from) => {
    change('updated KPI', k.label, from, v, () => { state.kpis.find(x => x.id === k.id).value = v; });
  });
  return card;
}

function reelsLast7() {
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = state.reels[d.toISOString().slice(0, 10)];
    if (day) total += Object.values(day).reduce((a, b) => a + b, 0);
  }
  return total;
}

function renderOverviewKpis() {
  const host = $('#overviewKpis');
  host.innerHTML = '';
  state.kpis.forEach(k => {
    if (k.derived) k.value = reelsLast7();
    host.appendChild(kpiCard(k));
  });
}

function renderOwnerLoad() {
  const host = $('#ownerLoad');
  host.innerHTML = '';
  const open = state.tasks.filter(t => t.status !== 'done');
  const max = Math.max(1, ...Object.keys(PEOPLE).map(w => open.filter(t => t.owner === w).length));
  Object.keys(PEOPLE).forEach(w => {
    const n = open.filter(t => t.owner === w).length;
    const li = el('li');
    li.innerHTML = `<span class="dot" style="background:${PEOPLE[w].color}"></span>
      <span class="lbl">${PEOPLE[w].name}</span>
      <span class="track"><i data-w="${Math.round((n / max) * 100)}" style="background:${PEOPLE[w].color}"></i></span>
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
  const plan = {
    josh: { title: 'Josh — content & sales', color: PEOPLE.josh.color, rows: [
      ['4', 'reels filmed', 'non-negotiable, editor ships them'],
      ['100', 'outreach touches', 'Rule of 100 — DMs, comments, replies'],
      [String(d(r.need.held)), 'calls held', `${d(r.need.booked)} booked to hold that many`],
      ['1', 'webinar a week', 'he presents, every Thursday'],
      ['20', 'call minutes reviewed', 'score yesterday against the rubric']
    ]},
    bendik: { title: 'Bendik — systems & funnels', color: PEOPLE.bendik.color, rows: [
      ['$' + Math.max(100, Math.round((r.need.leads * 6) / m.workDays)), 'ad spend / day', 'at ~$6 a lead, held to CAC'],
      ['1', 'funnel fix shipped', 'one measurable improvement, daily'],
      ['0', 'sales calls', 'his calendar stays clear of them'],
      ['100%', 'of bookings attributed', 'no lead lands without a source tag'],
      ['1', 'automation removed from us', 'weekly: one manual step deleted']
    ]}
  };
  const host = $('#dailyEngine');
  host.innerHTML = '';
  Object.entries(plan).forEach(([who, p]) => {
    const card = el('article', 'card');
    card.innerHTML = `
      <div class="reel-head">
        <span class="avatar" style="background:${p.color}">${PEOPLE[who].initials}</span>
        <div><div class="reel-name">${p.title}</div><div class="reel-sub">every working day</div></div>
      </div>
      <ul class="daily-list">${p.rows.map(([n, l, note]) =>
        `<li><b>${n}</b><span class="dl-label">${l}</span><span class="dl-note">${note}</span></li>`).join('')}</ul>`;
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
  ['More customers', 'Lead volume × booking rate', 'Bendik — paid, funnels, attribution', 'bendik'],
  ['Higher price', 'Raise price or add a premium tier', 'Josh — hold price on the call, no discounting', 'josh'],
  ['Buy more often', 'A second offer for people who already bought', 'Both — deal-support retainer after the programme', 'bendik'],
  ['Keep them longer', 'Retention is revenue you already earned', 'Josh — onboarding call in the first 48 hours', 'josh']
];

function renderLevers() {
  const host = $('#leverGrid');
  host.innerHTML = '';
  LEVERS.forEach(([title, what, who, id]) => {
    const card = el('article', 'card lever');
    card.innerHTML = `
      <div class="lead-top"><div class="lead-name">${title}</div>
        <span class="avatar sm" style="background:${PEOPLE[id].color}" title="${PEOPLE[id].name}">${PEOPLE[id].initials}</span></div>
      <p class="lead-note">${what}</p>
      <p class="lever-who">${who}</p>`;
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
        <span class="avatar sm" style="background:${PEOPLE[s.owner].color}" title="${PEOPLE[s.owner].name}">${PEOPLE[s.owner].initials}</span>
      </div>
      <p class="lead-note">${esc(s.note)}</p>
      <div class="lead-count"><b class="lead-done"></b><span>/ ${s.target} leads this week</span></div>
      <div class="bar"><i data-w="${pct}" style="background:${pct >= 100 ? 'var(--green)' : 'var(--accent)'}"></i></div>`;
    const n = card.querySelector('.lead-done');
    n.textContent = s.done;
    editableNumber(n, () => s.done, (v, from) => {
      change('updated lead source', s.label, from, v, () => { state.leadSources.find(x => x.id === s.id).done = v; });
    });
    card.querySelector('.avatar').addEventListener('click', () => {
      const next = s.owner === 'bendik' ? 'josh' : 'bendik';
      change('reassigned', s.label, PEOPLE[s.owner].name, PEOPLE[next].name, () => {
        state.leadSources.find(x => x.id === s.id).owner = next;
      });
    });
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
    li.innerHTML = `<span class="box">${TICK}</span><span class="txt">${esc(item.t)}</span>
      <span class="avatar sm" style="background:${PEOPLE[item.who].color}">${PEOPLE[item.who].initials}</span>`;
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
const LANES = [
  { id: 'reels',   label: 'Reels (4×/day)', color: 'var(--ig)' },
  { id: 'pillar',  label: 'Pillar',         color: 'var(--yt)' },
  { id: 'x',       label: 'X / LinkedIn',   color: 'var(--ink-3)' },
  { id: 'email',   label: 'Email',          color: 'var(--green)' },
  { id: 'ads',     label: 'Ads',            color: 'var(--orange)' },
  { id: 'webinar', label: 'Webinar',        color: 'var(--accent)' }
];
const SCHEDULE = {
  reels:   { Mon: ['8 reels out', 'Josh + editor'], Tue: ['8 reels out', 'Josh + editor'], Wed: ['8 reels out', 'Josh + editor'],
             Thu: ['8 reels out', 'Josh + editor'], Fri: ['8 reels out', 'Josh + editor'], Sat: ['4 reels', 'J'], Sun: ['Batch film', 'J'] },
  pillar:  { Tue: ['Record pillar', '10:00'], Wed: ['Publish long-form', '16:00'] },
  x:       { Mon: ['Thread', '08:00'], Wed: ['Thread', '08:00'], Fri: ['Carousel', '09:00'] },
  email:   { Mon: ['Value email', '07:00'], Wed: ['Webinar invite', '07:00'], Fri: ['Replay + deadline', '07:00'] },
  ads:     { Mon: ['New creative live', '10:00'], Thu: ['Kill / scale — Bendik', '09:00'] },
  webinar: { Thu: ['LIVE 18:00', 'Josh presents'] }
};
const LADDER = [
  ['1 pillar', 'One 12-minute recorded teaching — the week’s single idea'],
  ['→ 20 reels', '4 a day each. Every reel is one claim from the pillar'],
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

function renderReelGrid() {
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
  Object.keys(PEOPLE).forEach(who => {
    const lbl = el('div', 'rg-label');
    lbl.innerHTML = `<span class="avatar sm" style="background:${PEOPLE[who].color}">${PEOPLE[who].initials}</span>${PEOPLE[who].name}`;
    host.appendChild(lbl);
    days.forEach(d => {
      const key = d.toISOString().slice(0, 10);
      const n = reelsFor(key, who);
      const cell = el('button', 'rg-cell');
      cell.style.setProperty('--c', PEOPLE[who].color);
      cell.dataset.level = n;
      cell.title = `${PEOPLE[who].name} · ${key} · ${n}/${REEL_QUOTA}`;
      cell.textContent = n || '';
      cell.addEventListener("click", () => setReelsAbsolute(key, who, (n + 1) % (REEL_QUOTA + 1)));
      host.appendChild(cell);
    });
  });
}

function renderCalendar() {
  const cal = $('#calendar');
  cal.innerHTML = '';
  const todayIdx = (new Date().getDay() + 6) % 7;
  cal.appendChild(el('div', 'cal-h'));
  DAYS.forEach((d, i) => {
    const h = el('div', 'cal-h' + (i === todayIdx ? ' today' : ''));
    h.textContent = d;
    cal.appendChild(h);
  });
  LANES.forEach(lane => {
    const lbl = el('div', 'cal-row-label');
    lbl.innerHTML = `<span class="dotc" style="background:${lane.color}"></span>${lane.label}`;
    cal.appendChild(lbl);
    DAYS.forEach((d, i) => {
      const cell = el('div', 'cal-cell' + (i === todayIdx ? ' today' : ''));
      const item = SCHEDULE[lane.id][d];
      if (item) {
        const s = el('div', 'slot');
        s.style.background = `color-mix(in srgb, ${lane.color} 13%, transparent)`;
        s.style.color = lane.color;
        s.innerHTML = `${esc(item[0])}<small>${esc(item[1])}</small>`;
        cell.appendChild(s);
      }
      cal.appendChild(cell);
    });
  });
}

function renderContentLists() {
  $('#ladder').innerHTML = LADDER.map(([a, b]) =>
    `<li><span class="rung">${esc(a)}</span><span class="rung-note">${esc(b)}</span></li>`).join('');
  $('#angleList').innerHTML = ANGLES.map(([a, b]) =>
    `<li><span class="angle-hook">${esc(a)}</span><span class="rung-note">${esc(b)}</span></li>`).join('');
}

/* ── Webinar ────────────────────────────────────────────────── */
const FUNNEL_ROWS = [['registered', 'Registered'], ['showed', 'Showed up'], ['stayed', 'Stayed to offer'], ['bought', 'Bought']];
const PROMO = [
  ['T−14', 'Registration page live, tracking verified', 'Bendik'],
  ['T−10', 'Ads live: broad + retarget 75% viewers', 'Bendik'],
  ['T−7',  'Partner sends invite to their list', 'Josh'],
  ['T−3',  'Reel sequence: 3 hooks pointing at the session', 'Josh'],
  ['T−1',  'Email 2 + personal DMs to the warm list', 'Josh'],
  ['T−2h', 'Automated SMS + story reminder', 'Bendik'],
  ['T+1',  'Replay email, 48h deadline, no-shows into a call sequence', 'Bendik'],
  ['T+3',  'Best 90 seconds becomes 4 reels and an ad', 'Josh']
];
const RUNSHEET = [
  ['0–5',   'Open + promise', 'Name the outcome and the time it takes. No credentials yet.'],
  ['5–12',  'Why the usual route fails', 'Why “save up and buy” has not worked for them.'],
  ['12–28', 'Teach the 3C model', 'Capabilities, Capital, Closing — one real deal on screen.'],
  ['28–40', 'Case study with numbers', 'The deal, the terms, the seller’s motivation.'],
  ['40–46', 'Transition', 'What it takes to do this without ten years of learning.'],
  ['46–54', 'The offer', 'Stack, price, guarantee, deadline. Read the value equation aloud.'],
  ['54–60', 'Q&A that closes', 'Three objections, each answered into a call to action.']
];

function nextThursday() {
  const d = new Date();
  const days = (4 - d.getDay() + 7) % 7;
  const next = new Date(d);
  next.setDate(d.getDate() + days);
  next.setHours(18, 0, 0, 0);
  if (next <= d) next.setDate(next.getDate() + 7);
  return next;
}

function renderWebinar() {
  const w = state.webinar;
  $('#webinarTitle').textContent = w.title;
  $('#webinarSub').textContent = w.sub;

  const max = w.funnel.registered || 1;
  const host = $('#webinarFunnel');
  host.innerHTML = '';
  FUNNEL_ROWS.forEach(([k, label]) => {
    const n = w.funnel[k];
    const row = el('div', 'stage');
    row.innerHTML = `<span class="name">${label}</span>
      <span class="track"><i data-w="${Math.round((n / max) * 100)}" style="background:var(--accent)"></i></span>
      <span class="n fn-n">${n}</span>`;
    editableNumber(row.querySelector('.fn-n'), () => w.funnel[k], (v, from) => {
      change('updated funnel', label, from, v, () => { state.webinar.funnel[k] = v; });
    });
    host.appendChild(row);
  });
  const conv = ((w.funnel.bought / Math.max(1, w.funnel.registered)) * 100).toFixed(1);
  $('#webinarConv').textContent = conv + '% register → buy';

  $('#promoList').innerHTML = PROMO.map(([when, what, who]) =>
    `<li><span class="when">${when}</span><span>${esc(what)}<br><span class="ch">${who}</span></span></li>`).join('');
  $('#runsheet').innerHTML = RUNSHEET.map(([m, t, n]) =>
    `<li><span class="mins">${m} min</span><div><p class="rs-title">${esc(t)}</p><p class="rs-note">${esc(n)}</p></div></li>`).join('');

  const pt = $('#partnerTable');
  pt.innerHTML = ['Partner', 'Their audience', 'Status', 'Owner'].map(h => `<div class="th">${h}</div>`).join('');
  state.webinar.partners.forEach((p, i) => {
    pt.insertAdjacentHTML('beforeend',
      `<div class="nm">${esc(p.name)}</div><div class="muted">${esc(p.audience)}</div><div>${esc(p.status)}</div><div></div>`);
    const cell = pt.lastElementChild;
    const av = el('span', 'avatar sm');
    av.style.background = PEOPLE[p.owner].color;
    av.textContent = PEOPLE[p.owner].initials;
    av.title = 'Click to reassign';
    av.addEventListener('click', () => {
      const next = p.owner === 'bendik' ? 'josh' : 'bendik';
      change('reassigned partner', p.name, PEOPLE[p.owner].name, PEOPLE[next].name, () => {
        state.webinar.partners[i].owner = next;
      });
    });
    cell.appendChild(av);
  });
  tickCountdown();
}

function tickCountdown() {
  const cd = $('#countdown');
  if (!cd) return;
  const diff = Math.max(0, nextThursday() - new Date());
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24,
        m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  cd.innerHTML = [[d, 'days'], [h, 'hrs'], [m, 'min'], [s, 'sec']]
    .map(([v, l]) => `<div class="cd-unit"><b>${String(v).padStart(2, '0')}</b><span>${l}</span></div>`).join('');
}
setInterval(tickCountdown, 1000);

/* ── Team ───────────────────────────────────────────────────── */
function renderTeam() {
  const us = $('#usGrid');
  us.innerHTML = '';
  state.us.forEach(p => {
    const card = el('article', 'card person');
    card.innerHTML = `
      <div class="reel-head">
        <span class="avatar" style="background:${PEOPLE[p.id].color}">${PEOPLE[p.id].initials}</span>
        <div><div class="reel-name">${PEOPLE[p.id].name}</div><div class="reel-sub">${esc(p.role)}</div></div>
      </div>
      <p class="person-focus">${esc(p.focus)}</p>
      <div class="meta-row"><span>${esc(p.hours)}</span><span>${state.tasks.filter(t => t.owner === p.id && t.status !== 'done').length} open tasks</span></div>`;
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
        <span class="avatar sm" style="background:${PEOPLE[role.owner].color}" title="Hiring owner">${PEOPLE[role.owner].initials}</span>
      </div>
      <p class="buys">${esc(role.buys)}</p>
      <div class="funnel">
        ${role.stages.map(([n, v]) => `
          <div class="stage"><span class="name">${n}</span>
          <span class="track"><i data-w="${Math.round((v / max) * 100)}" style="background:${PEOPLE[role.owner].color}"></i></span>
          <span class="n">${v}</span></div>`).join('')}
      </div>
      <div class="role-foot"><span>${esc(role.comp)}</span><span>${esc(role.target)}</span></div>`;
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
      (filter === 'all' || t.owner === filter || t.track === filter));
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
        <span class="avatar sm" style="background:${PEOPLE[t.owner].color}" title="Click to reassign">${PEOPLE[t.owner].initials}</span>
      </span>
    </div>`;
  card.querySelector('.task-title').textContent = t.title;
  card.querySelector('.avatar').addEventListener('click', () => {
    const next = t.owner === 'bendik' ? 'josh' : 'bendik';
    change('reassigned', t.title, PEOPLE[t.owner].name, PEOPLE[next].name, () => { t.owner = next; });
  });
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
  const p = PEOPLE[e.who] || PEOPLE.bendik;
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
  $('#f-owner').value = state.me;
  $('#f-title').focus();
});
$('#cancelTask').addEventListener('click', closeSheet);
scrim.addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
$('#saveTask').addEventListener('click', () => {
  const title = $('#f-title').value.trim();
  if (!title) { $('#f-title').focus(); return; }
  const task = {
    id: 't' + Date.now(), title,
    track: $('#f-track').value, owner: $('#f-owner').value, status: $('#f-status').value
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

/* ── Render ─────────────────────────────────────────────────── */
function render() {
  $('#whoAvatar').textContent = PEOPLE[state.me].initials;
  $('#whoAvatar').style.background = PEOPLE[state.me].color;
  $('#whoName').textContent = PEOPLE[state.me].name;

  renderHero(); renderReelToday(); renderOverviewKpis(); renderOwnerLoad();
  renderTarget(); renderLadder(); renderDaily(); renderEcon(); renderLevers(); renderLeadSources(); renderValueEq(); renderChecklist($('#operatorList'), state.operator);
  renderReelGrid(); renderCalendar(); renderContentLists();
  renderWebinar(); renderTeam(); renderBoard(); renderFeed();
  requestAnimationFrame(animateBars);
}
render();

function setReelsAbsolute(day, who, n) {
  const from = reelsFor(day, who);
  change('logged reels for', `${PEOPLE[who].name}, ${day}`, from + '/' + REEL_QUOTA, n + '/' + REEL_QUOTA, () => {
    state.reels[day] = state.reels[day] || {};
    state.reels[day][who] = n;
  });
}
