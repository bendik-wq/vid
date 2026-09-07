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
