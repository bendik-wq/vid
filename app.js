/* Studio — content & hiring operations. All state lives in localStorage. */

const STORE_KEY = 'studio.state.v1';

const ICONS = {
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.28 5 12 5 12 5s-6.28 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.72 19 12 19 12 19s6.28 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.1" cy="6.9" r="1.2" fill="currentColor"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.4 3h6.4l4.4 5.8L17.5 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3Z"/></svg>',
  hiring: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  sales: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 18.5 9.5 13l3.5 3.5L20 9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 9H20v4.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  manager: '<svg viewBox="0 0 24 24" fill="none"><circle cx="8.5" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><circle cx="16.5" cy="9.5" r="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M3 19a5.5 5.5 0 0 1 11 0M15 14.8a4.6 4.6 0 0 1 6 4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
};

const CHANNEL_META = {
  youtube:   { name: 'YouTube',   handle: '@studio',      color: 'var(--yt)',     grad: 'linear-gradient(145deg,#ff5f57,#d70015)', unit: 'videos' },
  instagram: { name: 'Instagram', handle: '@studio.daily', color: 'var(--ig)',    grad: 'linear-gradient(145deg,#f9ce34,#ee2a7b 45%,#6228d7)', unit: 'posts' },
  x:         { name: 'X',         handle: '@studio',      color: 'var(--x)',      grad: 'linear-gradient(145deg,#3a3a3c,#000)', unit: 'posts' },
  hiring:    { name: 'Hiring',    handle: 'People ops',   color: 'var(--purple)', grad: 'linear-gradient(145deg,#bf5af2,#7d3ac1)', unit: 'roles' }
};

const COLUMNS = [
  { id: 'ideas',      label: 'Ideas' },
  { id: 'production', label: 'In production' },
  { id: 'review',     label: 'Review' },
  { id: 'published',  label: 'Published' }
];

const seed = () => ({
  channels: {
    youtube:   { posts: 48, goal: 60, delta: 12, lastPost: '2 days ago' },
    instagram: { posts: 132, goal: 150, delta: 9, lastPost: '4 hours ago' },
    x:         { posts: 214, goal: 240, delta: 21, lastPost: '1 hour ago' }
  },
  weekly: [
    { week: 'W1', youtube: 3, instagram: 9, x: 14 },
    { week: 'W2', youtube: 4, instagram: 11, x: 18 },
    { week: 'W3', youtube: 2, instagram: 8, x: 12 },
    { week: 'W4', youtube: 5, instagram: 12, x: 21 },
    { week: 'W5', youtube: 4, instagram: 10, x: 17 },
    { week: 'W6', youtube: 6, instagram: 14, x: 24 }
  ],
  roles: [
    {
      id: 'sales', title: 'Sales Person', icon: 'sales', dept: 'Revenue · Remote / Oslo',
      comp: '$70–90k + commission', target: 'Start Nov 3',
      grad: 'linear-gradient(145deg,#34c759,#248a3d)', color: 'var(--green)',
      stages: [ ['Applied', 34], ['Screened', 12], ['Interview', 5], ['Offer', 1] ]
    },
    {
      id: 'manager', title: 'Content Manager', icon: 'manager', dept: 'Studio · Hybrid',
      comp: '$85–110k', target: 'Start Dec 1',
      grad: 'linear-gradient(145deg,#0a84ff,#5e5ce6)', color: 'var(--accent)',
      stages: [ ['Applied', 21], ['Screened', 8], ['Interview', 3], ['Offer', 0] ]
    }
  ],
  tasks: [
    { id: 't1', title: 'Script the Q4 launch teaser', channel: 'youtube', owner: 'Mia', status: 'ideas' },
    { id: 't2', title: 'Behind-the-scenes carousel', channel: 'instagram', owner: 'Jonas', status: 'ideas' },
    { id: 't3', title: 'Thread: how we cut render time 4x', channel: 'x', owner: 'Ada', status: 'ideas' },
    { id: 't4', title: 'Edit episode 12 — colour pass', channel: 'youtube', owner: 'Leo', status: 'production' },
    { id: 't5', title: 'Reels: studio tour', channel: 'instagram', owner: 'Mia', status: 'production' },
    { id: 't6', title: 'Screen sales candidates (round 2)', channel: 'hiring', owner: 'Bendik', status: 'production' },
    { id: 't7', title: 'Thumbnail A/B set for ep. 11', channel: 'youtube', owner: 'Leo', status: 'review' },
    { id: 't8', title: 'Manager role — final interview loop', channel: 'hiring', owner: 'Bendik', status: 'review' },
    { id: 't9', title: 'Weekly recap post', channel: 'x', owner: 'Ada', status: 'published' },
    { id: 't10', title: 'Ep. 11 — full episode', channel: 'youtube', owner: 'Leo', status: 'published' },
    { id: 't11', title: 'Launch-day carousel', channel: 'instagram', owner: 'Jonas', status: 'published' }
  ]
});

/* ── State ──────────────────────────────────────────────────── */
let state;
try {
  state = JSON.parse(localStorage.getItem(STORE_KEY)) || seed();
} catch { state = seed(); }

const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {} };
const $ = (sel) => document.querySelector(sel);
const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

/* ── Theme ──────────────────────────────────────────────────── */
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = (t) => document.documentElement.setAttribute('data-theme', t);
let theme = (() => { try { return localStorage.getItem('studio.theme'); } catch { return null; } })()
  || (prefersDark.matches ? 'dark' : 'light');
applyTheme(theme);
$('#themeToggle').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('studio.theme', theme); } catch {}
  renderChart();
});

/* ── Navigation ─────────────────────────────────────────────── */
document.querySelectorAll('.seg').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.seg').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    $('#view-' + btn.dataset.view).classList.add('active');
    if (btn.dataset.view === 'overview') requestAnimationFrame(animateOverview);
    if (btn.dataset.view === 'hiring') requestAnimationFrame(animateFunnels);
  });
});

/* ── Overview ───────────────────────────────────────────────── */
function renderChannels() {
  const grid = $('#channelGrid');
  grid.innerHTML = '';
  Object.entries(state.channels).forEach(([key, data]) => {
    const meta = CHANNEL_META[key];
    const card = el('article', 'card channel');
    const pct = Math.min(100, Math.round((data.posts / data.goal) * 100));
    card.innerHTML = `
      <div class="glow" style="background:${meta.grad}"></div>
      <div class="channel-top">
        <div class="channel-logo" style="background:${meta.grad}">${ICONS[key]}</div>
        <div>
          <div class="channel-name">${meta.name}</div>
          <div class="channel-handle">${meta.handle}</div>
        </div>
      </div>
      <div class="count">
        <b>${data.posts}</b>
        <small>${meta.unit} published</small>
      </div>
      <div class="bar"><i data-w="${pct}" style="background:${meta.grad}"></i></div>
      <div class="meta-row">
        <span>${pct}% of ${data.goal} goal</span>
        <span class="delta">▲ ${data.delta} this month</span>
      </div>
      <div class="meta-row" style="margin-top:6px"><span>Last post ${data.lastPost}</span><span></span></div>`;
    grid.appendChild(card);
  });
}

function renderChart() {
  const wrap = $('#chart');
  wrap.innerHTML = '';
  const max = Math.max(...state.weekly.map(w => w.youtube + w.instagram + w.x));
  const colors = { youtube: 'var(--yt)', instagram: 'var(--ig)', x: 'var(--x)' };
  state.weekly.forEach(w => {
    const col = el('div', 'col');
    const stack = el('div', 'stack');
    ['x', 'instagram', 'youtube'].forEach(k => {
      const bar = el('div', 'seg-bar');
      bar.style.background = colors[k];
      bar.dataset.h = Math.round((w[k] / max) * 150);
      stack.appendChild(bar);
    });
    const lbl = el('span'); lbl.textContent = w.week;
    col.append(stack, lbl);
    wrap.appendChild(col);
  });
  const total = state.weekly.reduce((s, w) => s + w.youtube + w.instagram + w.x, 0);
  $('#chartTotal').textContent = total + ' in 6 weeks';
  requestAnimationFrame(() => wrap.querySelectorAll('.seg-bar').forEach(b => b.style.height = b.dataset.h + 'px'));
}

function renderPipeline() {
  const list = $('#pipelineList');
  list.innerHTML = '';
  const colors = ['var(--ink-3)', 'var(--orange)', 'var(--purple)', 'var(--green)'];
  const max = Math.max(1, ...COLUMNS.map(c => state.tasks.filter(t => t.status === c.id).length));
  COLUMNS.forEach((c, i) => {
    const n = state.tasks.filter(t => t.status === c.id).length;
    const li = el('li');
    li.innerHTML = `<span class="dot" style="background:${colors[i]}"></span>
      <span class="lbl">${c.label}</span>
      <span class="track"><i data-w="${Math.round((n / max) * 100)}" style="background:${colors[i]}"></i></span>
      <span class="val">${n}</span>`;
    list.appendChild(li);
  });
  $('#pipeTotal').textContent = state.tasks.length + ' tasks';
}

function renderHero() {
  const totals = Object.values(state.channels).reduce(
    (a, c) => ({ posts: a.posts + c.posts, goal: a.goal + c.goal }), { posts: 0, goal: 0 });
  const pct = Math.min(100, Math.round((totals.posts / totals.goal) * 100));
  const ring = $('#heroRing');
  const c = 2 * Math.PI * 52;
  ring.style.strokeDasharray = c;
  ring.style.strokeDashoffset = c;
  ring.dataset.pct = pct;
  $('#heroPct').textContent = pct + '%';
  $('#todayLabel').textContent = new Date().toLocaleDateString(undefined,
    { weekday: 'long', month: 'long', day: 'numeric' });
}

function animateOverview() {
  const ring = $('#heroRing');
  const c = 2 * Math.PI * 52;
  ring.style.strokeDashoffset = c - (c * Number(ring.dataset.pct)) / 100;
  document.querySelectorAll('.bar i, .pipeline .track i').forEach(b => b.style.width = b.dataset.w + '%');
}

/* ── Board ──────────────────────────────────────────────────── */
let filter = 'all';

function renderBoard() {
  const board = $('#board');
  board.innerHTML = '';
  COLUMNS.forEach(col => {
    const tasks = state.tasks.filter(t => t.status === col.id && (filter === 'all' || t.channel === filter));
    const wrap = el('div', 'column');
    wrap.dataset.status = col.id;
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
      const id = e.dataTransfer.getData('text/plain');
      const task = state.tasks.find(t => t.id === id);
      if (task && task.status !== col.id) { task.status = col.id; save(); renderBoard(); renderPipeline(); }
    });
    board.appendChild(wrap);
  });
}

function taskCard(t) {
  const meta = CHANNEL_META[t.channel];
  const card = el('article', 'task');
  card.draggable = true;
  card.dataset.id = t.id;
  const initials = (t.owner || '?').trim().slice(0, 2).toUpperCase();
  card.innerHTML = `
    <p class="task-title"></p>
    <div class="task-foot">
      <span class="tag" style="background:color-mix(in srgb, ${meta.color} 15%, transparent); color:${meta.color}">
        ${ICONS[t.channel]} ${meta.name}
      </span>
      <span style="display:flex;align-items:center;gap:6px">
        <button class="del" title="Delete task" aria-label="Delete task">&times;</button>
        <span class="avatar" title="${escapeAttr(t.owner || 'Unassigned')}">${escapeHtml(initials)}</span>
      </span>
    </div>`;
  card.querySelector('.task-title').textContent = t.title;
  card.querySelector('.del').addEventListener('click', () => {
    state.tasks = state.tasks.filter(x => x.id !== t.id);
    save(); renderBoard(); renderPipeline();
  });
  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', t.id);
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
  return card;
}

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, ch =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const escapeAttr = escapeHtml;

document.querySelectorAll('#filters .chip-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#filters .chip-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderBoard();
  });
});

/* ── Hiring ─────────────────────────────────────────────────── */
function renderRoles() {
  const grid = $('#roleGrid');
  grid.innerHTML = '';
  state.roles.forEach(role => {
    const max = Math.max(...role.stages.map(s => s[1]), 1);
    const card = el('article', 'card');
    card.innerHTML = `
      <div class="role-head">
        <div class="role-icon" style="background:${role.grad}">${ICONS[role.icon]}</div>
        <div>
          <h3>${escapeHtml(role.title)}</h3>
          <div class="role-meta">${escapeHtml(role.dept)}</div>
        </div>
        <span class="status-badge">Open</span>
      </div>
      <div class="funnel">
        ${role.stages.map(([name, n]) => `
          <div class="stage">
            <span class="name">${name}</span>
            <span class="track"><i data-w="${Math.round((n / max) * 100)}" style="background:${role.grad}"></i></span>
            <span class="n">${n}</span>
          </div>`).join('')}
      </div>
      <div class="role-foot"><span>${escapeHtml(role.comp)}</span><span>${escapeHtml(role.target)}</span></div>`;
    grid.appendChild(card);
  });
}

function animateFunnels() {
  document.querySelectorAll('.funnel .track i').forEach(b => b.style.width = b.dataset.w + '%');
}

/* ── New-task sheet ─────────────────────────────────────────── */
const sheet = $('#sheet'), scrim = $('#scrim');
const openSheet = () => { sheet.hidden = false; scrim.hidden = false; $('#f-title').focus(); };
const closeSheet = () => { sheet.hidden = true; scrim.hidden = true; $('#f-title').value = ''; $('#f-owner').value = ''; };

$('#newTaskBtn').addEventListener('click', openSheet);
$('#cancelTask').addEventListener('click', closeSheet);
scrim.addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

$('#saveTask').addEventListener('click', () => {
  const title = $('#f-title').value.trim();
  if (!title) { $('#f-title').focus(); return; }
  state.tasks.unshift({
    id: 't' + Date.now(),
    title,
    channel: $('#f-channel').value,
    owner: $('#f-owner').value.trim() || 'Unassigned',
    status: $('#f-status').value
  });
  save();
  closeSheet();
  renderBoard(); renderPipeline();
  document.querySelector('.seg[data-view="board"]').click();
});

$('#resetBtn').addEventListener('click', () => {
  state = seed(); save(); renderAll();
});

/* ── Boot ───────────────────────────────────────────────────── */
function renderAll() {
  renderHero(); renderChannels(); renderChart(); renderPipeline(); renderBoard(); renderRoles();
  requestAnimationFrame(() => { animateOverview(); animateFunnels(); });
}
renderAll();

/* ═══════════════════════════════════════════════════════════════
   KPIs · Schedule · Ads · Webinar · Angles
   ═══════════════════════════════════════════════════════════════ */

const CHECK_KEY = 'studio.checks.v1';
let checks;
try { checks = JSON.parse(localStorage.getItem(CHECK_KEY)) || {}; } catch { checks = {}; }
const saveChecks = () => { try { localStorage.setItem(CHECK_KEY, JSON.stringify(checks)); } catch {} };

/* ── KPI data ───────────────────────────────────────────────── */
const KPI_GROUPS = [
  { group: 'Audience', items: [
    { label: 'Followers — all channels', value: '78.4k', target: '90k by Dec', dir: 'up', delta: '+6.2%', color: 'var(--accent)', series: [61,63,64,67,69,72,75,78] },
    { label: 'Reach / week', value: '1.24M', target: '1.5M', dir: 'up', delta: '+11%', color: 'var(--purple)', series: [780,840,910,880,1010,1090,1160,1240] },
    { label: 'Story completion rate', value: '68%', target: '70%', dir: 'up', delta: '+3 pts', color: 'var(--ig)', series: [59,61,60,63,64,66,67,68] },
    { label: 'Engagement rate', value: '4.7%', target: '5.0%', dir: 'down', delta: '−0.3 pts', color: 'var(--orange)', series: [5.4,5.2,5.3,5.0,4.9,5.0,4.8,4.7] }
  ]},
  { group: 'Content output', items: [
    { label: 'Posts / week', value: '31', target: '30', dir: 'up', delta: '+4', color: 'var(--green)', series: [22,24,23,26,27,29,28,31] },
    { label: 'Stories / week', value: '21', target: '21', dir: 'up', delta: 'on pace', color: 'var(--ig)', series: [12,14,15,17,18,20,20,21] },
    { label: 'Avg. idea → published', value: '6.2d', target: '< 5d', dir: 'down', good: true, delta: '−1.1d', color: 'var(--accent)', series: [9.1,8.8,8.2,7.9,7.4,7.0,6.6,6.2] },
    { label: 'Repurpose ratio', value: '3.4×', target: '4×', dir: 'up', delta: '+0.5', color: 'var(--purple)', series: [2.1,2.3,2.4,2.7,2.9,3.0,3.2,3.4] }
  ]},
  { group: 'Paid & pipeline', items: [
    { label: 'Ad spend / week', value: '$8,450', target: '$9k cap', dir: 'up', delta: '+$620', color: 'var(--orange)', series: [4100,5200,5800,6400,7000,7600,7900,8450] },
    { label: 'Blended CAC', value: '$142', target: '< $150', dir: 'down', good: true, delta: '−$18', color: 'var(--green)', series: [206,198,187,179,171,160,154,142] },
    { label: 'ROAS', value: '3.1×', target: '3.0×', dir: 'up', delta: '+0.4', color: 'var(--accent)', series: [1.9,2.1,2.2,2.4,2.6,2.7,2.9,3.1] },
    { label: 'Webinar → customer', value: '9.4%', target: '10%', dir: 'up', delta: '+1.2 pts', color: 'var(--yt)', series: [5.8,6.4,6.9,7.2,7.8,8.4,8.9,9.4] }
  ]}
];

function sparkPath(series, w = 220, h = 38) {
  const min = Math.min(...series), max = Math.max(...series);
  const span = max - min || 1;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * w,
    h - ((v - min) / span) * (h - 6) - 3
  ]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return { line, area: `${line} L ${w} ${h} L 0 ${h} Z` };
}

function renderKpis() {
  const host = $('#kpiGroups');
  host.innerHTML = '';
  KPI_GROUPS.forEach(g => {
    const wrap = el('div', 'kpi-group');
    const grid = el('div', 'kpi-grid');
    g.items.forEach(k => {
      const p = sparkPath(k.series);
      const card = el('article', 'card kpi');
      card.innerHTML = `
        <div class="kpi-label">${escapeHtml(k.label)}</div>
        <div class="kpi-value"><b>${escapeHtml(k.value)}</b>
          <span class="trend ${(k.good ?? k.dir === 'up') ? 'up' : 'down'}">${k.dir === 'up' ? '▲' : '▼'} ${escapeHtml(k.delta)}</span></div>
        <svg class="spark" viewBox="0 0 220 38" preserveAspectRatio="none" aria-hidden="true">
          <path class="area" d="${p.area}" fill="${k.color}"></path>
          <path class="line" d="${p.line}" stroke="${k.color}"></path>
        </svg>
        <div class="kpi-target"><span>8-week trend</span><span>Target ${escapeHtml(k.target)}</span></div>`;
      grid.appendChild(card);
    });
    const h3 = el('h3'); h3.textContent = g.group;
    wrap.append(h3, grid);
    host.appendChild(wrap);
  });
}

/* ── Weekly schedule ────────────────────────────────────────── */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const LANES = [
  { id: 'youtube',  label: 'YouTube',    color: 'var(--yt)' },
  { id: 'igfeed',   label: 'IG feed',    color: 'var(--ig)' },
  { id: 'igstory',  label: 'IG stories', color: 'var(--purple)' },
  { id: 'x',        label: 'X',          color: 'var(--ink-2)' },
  { id: 'ads',      label: 'Ads',        color: 'var(--orange)' },
  { id: 'webinar',  label: 'Webinar',    color: 'var(--accent)' }
];
const SCHEDULE = {
  youtube: { Tue: ['Long-form drop', '16:00'], Fri: ['Short', '12:00'], Sun: ['Short', '11:00'] },
  igfeed:  { Mon: ['Carousel', '09:00'], Wed: ['Reel', '18:00'], Thu: ['Reel', '12:00'], Sat: ['Carousel', '10:00'] },
  igstory: { Mon: ['3 stories', 'all day'], Tue: ['3 stories', 'all day'], Wed: ['3 stories', 'all day'],
             Thu: ['Webinar push', 'all day'], Fri: ['3 stories', 'all day'], Sat: ['2 stories', 'all day'], Sun: ['Recap', '19:00'] },
  x:       { Mon: ['Thread', '08:00'], Tue: ['2 posts', '—'], Wed: ['Thread', '08:00'], Thu: ['Live-post', '18:00'], Fri: ['2 posts', '—'], Sat: ['Repost', '11:00'] },
  ads:     { Mon: ['New creative live', '10:00'], Thu: ['Budget review', '09:00'] },
  webinar: { Thu: ['LIVE session', '18:00'] }
};
const STORY_RHYTHM = [
  ['08:30', 'Behind the scenes — what we are shipping today', 'BTS'],
  ['13:00', 'Value slide + poll sticker', 'Value'],
  ['19:30', 'CTA — link to today’s post or webinar', 'CTA']
];
const RITUALS = [
  ['Mon 09:00', 'Content standup — lock the week’s slots'],
  ['Tue 14:00', 'Creative review — thumbnails, hooks, first 3 seconds'],
  ['Thu 09:00', 'Ads review — kill under 1.5× ROAS, scale over 3×'],
  ['Thu 18:00', 'Webinar goes live'],
  ['Fri 15:00', 'KPI readout + next week’s angles picked']
];

function renderSchedule() {
  const cal = $('#calendar');
  cal.innerHTML = '';
  const todayIdx = (new Date().getDay() + 6) % 7;
  cal.appendChild(el('div', 'cal-h'));
  DAYS.forEach((d, i) => {
    const h = el('div', 'cal-h' + (i === todayIdx ? ' today' : ''));
    h.textContent = d;
    cal.appendChild(h);
  });
  let slots = 0;
  LANES.forEach(lane => {
    const lbl = el('div', 'cal-row-label');
    lbl.innerHTML = `<span class="dotc" style="background:${lane.color}"></span>${lane.label}`;
    cal.appendChild(lbl);
    DAYS.forEach((d, i) => {
      const cell = el('div', 'cal-cell' + (i === todayIdx ? ' today' : ''));
      const item = SCHEDULE[lane.id][d];
      if (item) {
        slots++;
        const s = el('div', 'slot');
        s.style.background = `color-mix(in srgb, ${lane.color} 14%, transparent)`;
        s.style.color = lane.color;
        s.innerHTML = `${escapeHtml(item[0])}<small>${escapeHtml(item[1])}</small>`;
        cell.appendChild(s);
      }
      cal.appendChild(cell);
    });
  });
  $('#slotCount').textContent = slots + ' slots / week';

  const sl = $('#storyList');
  sl.innerHTML = '';
  STORY_RHYTHM.forEach(([time, what, kind]) => {
    const li = el('li');
    li.innerHTML = `<span class="time">${time}</span><span class="what">${escapeHtml(what)}</span><span class="kind">${kind}</span>`;
    sl.appendChild(li);
  });

  const rl = $('#ritualList');
  rl.innerHTML = '';
  RITUALS.forEach(([time, what]) => {
    const li = el('li');
    li.innerHTML = `<span class="time">${time}</span><span class="what">${escapeHtml(what)}</span>`;
    rl.appendChild(li);
  });
}

/* ── Ads ────────────────────────────────────────────────────── */
const CAMPAIGNS = [
  { name: 'Webinar registrations — broad', platform: 'instagram', objective: 'Meta · Leads', state: 'live',
    budget: 250, spend: 1740, metrics: [['CPM', '$8.40'], ['CTR', '2.1%'], ['CPL', '$6.90'], ['ROAS', '3.4×']], pace: 'Day 7 of 14' },
  { name: 'Retarget — 75% video viewers', platform: 'instagram', objective: 'Meta · Conversions', state: 'live',
    budget: 120, spend: 812, metrics: [['CPM', '$14.20'], ['CTR', '3.8%'], ['CPA', '$41'], ['ROAS', '5.1×']], pace: 'Evergreen' },
  { name: 'Episode 12 promo', platform: 'youtube', objective: 'YouTube · Views', state: 'testing',
    budget: 90, spend: 268, metrics: [['CPV', '$0.03'], ['VTR', '31%'], ['CPM', '$6.10'], ['ROAS', '1.6×']], pace: 'Day 3 of 7' },
  { name: 'Thread amplification', platform: 'x', objective: 'X · Engagement', state: 'live',
    budget: 60, spend: 384, metrics: [['CPM', '$5.30'], ['CTR', '1.4%'], ['CPE', '$0.21'], ['ROAS', '2.2×']], pace: 'Evergreen' },
  { name: 'Sales hire — job ad', platform: 'hiring', objective: 'Meta · Traffic', state: 'draft',
    budget: 40, spend: 0, metrics: [['CPM', '—'], ['CTR', '—'], ['CPA', '—'], ['ROAS', '—']], pace: 'Launches Mon' }
];
const LAUNCH_CHECKS = [
  ['Pixel + Conversions API firing on the registration page', 'Ada'],
  ['3 hooks × 2 formats per campaign in the creative queue', 'Mia'],
  ['UTM convention locked (source / medium / campaign / creative)', 'Ada'],
  ['Audiences built: 75% viewers, IG engagers 90d, customer lookalike 1%', 'Jonas'],
  ['Daily budget caps and automated kill rule below 1.5× ROAS', 'Bendik'],
  ['Landing page under 2s LCP on mobile', 'Leo'],
  ['Thank-you page + reminder sequence tested end to end', 'Mia']
];

function renderAds() {
  const grid = $('#campaignGrid');
  grid.innerHTML = '';
  let spend = 0, budget = 0, live = 0;
  CAMPAIGNS.forEach(c => {
    spend += c.spend; budget += c.budget;
    if (c.state === 'live') live++;
    const meta = CHANNEL_META[c.platform];
    const card = el('article', 'card campaign');
    card.innerHTML = `
      <div class="camp-top">
        <div class="channel-logo" style="background:${meta.grad}">${ICONS[c.platform]}</div>
        <div>
          <div class="camp-name">${escapeHtml(c.name)}</div>
          <div class="camp-obj">${escapeHtml(c.objective)}</div>
        </div>
        <span class="state ${c.state}">${c.state}</span>
      </div>
      <div class="metrics">
        ${c.metrics.map(([k, v]) => `<div class="metric"><b>${escapeHtml(v)}</b><span>${escapeHtml(k)}</span></div>`).join('')}
      </div>
      <div class="bar"><i data-w="${Math.min(100, Math.round((c.spend / (c.budget * 14)) * 100))}" style="background:${meta.grad}"></i></div>
      <div class="pace"><span>$${c.spend.toLocaleString()} spent · $${c.budget}/day</span><span>${escapeHtml(c.pace)}</span></div>`;
    grid.appendChild(card);
  });
  $('#adsSummary').innerHTML = `
    <div><b>$${spend.toLocaleString()}</b><span>Spent this cycle</span></div>
    <div><b>$${budget}</b><span>Daily budget</span></div>
    <div><b>${live}</b><span>Live campaigns</span></div>`;

  renderChecklist($('#launchList'), LAUNCH_CHECKS, 'launch');
}

const TICK = '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderChecklist(host, items, prefix) {
  host.innerHTML = '';
  items.forEach(([text, owner], i) => {
    const key = prefix + ':' + i;
    const li = el('li', checks[key] ? 'done' : '');
    li.innerHTML = `<span class="box">${TICK}</span><span class="txt">${escapeHtml(text)}</span><span class="owner">${escapeHtml(owner)}</span>`;
    li.addEventListener('click', () => {
      checks[key] = !checks[key];
      li.classList.toggle('done', checks[key]);
      saveChecks();
    });
    host.appendChild(li);
  });
}

/* ── Webinar ────────────────────────────────────────────────── */
const WEBINAR = {
  title: 'The 3-Channel Content Engine',
  sub: 'How a two-person studio ships 31 posts a week — and turns them into pipeline.',
  funnel: [['Registered', 412], ['Showed up', 178], ['Stayed to offer', 121], ['Bought', 39]],
  runsheet: [
    ['0–5', 'Open + promise', 'Name the outcome and the time it takes. No bio yet.'],
    ['5–12', 'The problem, sharply', 'Why posting more has not worked for them.'],
    ['12–25', 'Teach the engine', 'The weekly grid, live. Screen-share the actual calendar.'],
    ['25–38', 'Case study', 'One channel, eight weeks, real numbers on screen.'],
    ['38–45', 'Transition', 'What it takes to run this without you doing it all.'],
    ['45–52', 'The offer', 'Price, what is included, the guarantee, the deadline.'],
    ['52–60', 'Live Q&A', 'Handle the three objections, close on each answer.']
  ],
  promo: [
    ['T−14', 'Announce on all channels + open registration', 'IG / X / YT'],
    ['T−10', 'Ad set live: broad + retarget 75% viewers', 'Meta'],
    ['T−7', 'Email 1 — the problem this session solves', 'Email'],
    ['T−3', 'Story sequence: 3 slides + registration sticker', 'IG stories'],
    ['T−1', 'Email 2 + X thread teasing the framework', 'Email / X'],
    ['T−2h', 'SMS + story reminder — "starting in 2 hours"', 'SMS / IG'],
    ['T+1', 'Replay email with 48h offer deadline', 'Email'],
    ['T+3', 'Clip the best 90 seconds → Reel + Short + X video', 'All']
  ]
};

function nextThursday() {
  const d = new Date();
  d.setSeconds(0, 0);
  const days = (4 - d.getDay() + 7) % 7;
  const next = new Date(d);
  next.setDate(d.getDate() + days);
  next.setHours(18, 0, 0, 0);
  if (next <= d) next.setDate(next.getDate() + 7);
  return next;
}

function renderWebinar() {
  $('#webinarTitle').textContent = WEBINAR.title;
  $('#webinarSub').textContent = WEBINAR.sub;

  const max = WEBINAR.funnel[0][1];
  $('#webinarFunnel').innerHTML = WEBINAR.funnel.map(([name, n]) => `
    <div class="stage">
      <span class="name">${name}</span>
      <span class="track"><i data-w="${Math.round((n / max) * 100)}" style="background:linear-gradient(145deg,#0a84ff,#5e5ce6)"></i></span>
      <span class="n">${n}</span>
    </div>`).join('');
  const conv = ((WEBINAR.funnel[3][1] / WEBINAR.funnel[0][1]) * 100).toFixed(1);
  $('#webinarConv').textContent = conv + '% register → buy';

  $('#promoList').innerHTML = WEBINAR.promo.map(([when, what, ch]) =>
    `<li><span class="when">${when}</span><span>${escapeHtml(what)}<br><span class="ch">${escapeHtml(ch)}</span></span></li>`).join('');

  $('#runsheet').innerHTML = WEBINAR.runsheet.map(([mins, title, note]) =>
    `<li><span class="mins">${mins} min</span><div><p class="rs-title">${escapeHtml(title)}</p><p class="rs-note">${escapeHtml(note)}</p></div></li>`).join('');

  tickCountdown();
}

function tickCountdown() {
  const target = nextThursday();
  const diff = Math.max(0, target - new Date());
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24,
        m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  const cd = $('#countdown');
  if (!cd) return;
  cd.innerHTML = [[d, 'days'], [h, 'hrs'], [m, 'min'], [s, 'sec']]
    .map(([v, l]) => `<div class="cd-unit"><b>${String(v).padStart(2, '0')}</b><span>${l}</span></div>`).join('');
}
setInterval(tickCountdown, 1000);

/* ── Angles & data sources ──────────────────────────────────── */
const ANGLES = [
  { hook: 'We publish 31 things a week with two people. Here is the grid.',
    why: 'Process transparency out-performs polish. Screenshot the calendar and let people steal it.',
    fmt: ['Carousel', 'YT long-form', 'X thread'], color: 'var(--accent)' },
  { hook: 'The first 3 seconds decide everything. 12 openers, ranked by retention.',
    why: 'Retention-curve teardowns travel. Use your own analytics screenshots as proof.',
    fmt: ['Reel', 'Short', 'Story series'], color: 'var(--ig)' },
  { hook: 'We killed every ad under 1.5× ROAS. Revenue went up.',
    why: 'A counter-intuitive number in the hook. Contrarian + specific beats generic advice.',
    fmt: ['X thread', 'Carousel'], color: 'var(--orange)' },
  { hook: 'Rebuilding a competitor’s top post — and what we would change.',
    why: 'Teardown format borrows their audience’s attention and shows judgment, not just taste.',
    fmt: ['Reel', 'YT long-form'], color: 'var(--purple)' },
  { hook: 'Hiring in public: the scorecard we use to screen 34 sales applicants.',
    why: 'Hiring content attracts candidates and customers at once. Ties directly to the open roles.',
    fmt: ['Carousel', 'X thread', 'Story Q&A'], color: 'var(--green)' },
  { hook: '8 weeks, one channel, every number on screen.',
    why: 'Public metrics build compounding trust and are the natural bridge into the webinar.',
    fmt: ['YT long-form', 'Webinar segment'], color: 'var(--yt)' }
];

const API_SOURCES = [
  ['Instagram Graph API — Business Discovery', 'https://developers.facebook.com/docs/instagram-platform/',
   'Public follower counts, media, captions and engagement for any business/creator account — no permission from them needed.',
   'Free', 'Official. Needs a Business account + FB app review.'],
  ['Instagram Graph API — Hashtag Search', 'https://developers.facebook.com/docs/instagram-platform/',
   'Top and recent media for a hashtag. Best source for "what is working in our niche right now".',
   'Free', '30 unique hashtags per 7-day rolling window.'],
  ['Instagram Content Publishing API', 'https://developers.facebook.com/docs/instagram-platform/content-publishing',
   'Schedule and publish feed posts, reels and stories from your own tooling.',
   'Free', 'Publishes the weekly grid. Rate-limited per account.'],
  ['Apify Instagram Scraper', 'https://apify.com/apify/instagram-scraper',
   'No-code actors + REST API for profiles, posts, reels, comments. Scheduled runs out of the box.',
   '~$2.30 / 1k results', 'Fastest to a working pipeline.'],
  ['HikerAPI', 'https://hikerapi.com/',
   'Widest Instagram-only endpoint surface, lowest per-request price.',
   'from $0.0006 / req', 'Best unit economics for high volume.'],
  ['Scrape Creators', 'https://scrapecreators.com/',
   'Ready JSON for public profiles, posts, reels, search and comments across several platforms.',
   'Credit packs', 'Good multi-platform coverage.'],
  ['Bright Data Instagram dataset', 'https://brightdata.com/',
   'Managed large-scale datasets rather than a developer API.',
   '~$1.50 / 1k', 'Enterprise onboarding friction.'],
  ['Meta Ads Insights API', 'https://developers.facebook.com/docs/marketing-api/insights',
   'Spend, CPM, CTR, CPA and ROAS straight into the Ads and KPI views.',
   'Free', 'Pairs with Conversions API for attribution.']
];

function renderAngles() {
  const grid = $('#angleGrid');
  grid.innerHTML = '';
  ANGLES.forEach(a => {
    const card = el('article', 'card angle');
    card.innerHTML = `
      <span class="tag" style="background:color-mix(in srgb, ${a.color} 15%, transparent); color:${a.color}">Angle</span>
      <p class="hook">${escapeHtml(a.hook)}</p>
      <p class="why">${escapeHtml(a.why)}</p>
      <div class="tags">${a.fmt.map(f => `<span class="fmt">${escapeHtml(f)}</span>`).join('')}</div>`;
    grid.appendChild(card);
  });

  const t = $('#apiTable');
  t.innerHTML = ['Source', 'What you get', 'Cost', 'Notes']
    .map(h => `<div class="th">${h}</div>`).join('') +
    API_SOURCES.map(([name, url, what, cost, note]) => `
      <div class="nm"><a href="${url}" target="_blank" rel="noopener">${escapeHtml(name)}</a></div>
      <div class="muted">${escapeHtml(what)}</div>
      <div>${escapeHtml(cost)}</div>
      <div class="muted">${escapeHtml(note)}</div>`).join('');
}

/* ── Wire the new views in ──────────────────────────────────── */
function animateAll() {
  document.querySelectorAll('[data-w]').forEach(b => { b.style.width = b.dataset.w + '%'; });
  animateOverview();
}
document.querySelectorAll('.seg').forEach(btn =>
  btn.addEventListener('click', () => requestAnimationFrame(animateAll)));

const renderBase = renderAll;
renderAll = function () {
  renderBase();
  renderKpis(); renderSchedule(); renderAds(); renderWebinar(); renderAngles();
  requestAnimationFrame(animateAll);
};
renderAll();
