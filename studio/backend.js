/* Supabase backend for G&L Ops.
   Three tables: ops_state (the board), post_log (daily output), activity_log
   (append-only history). Credentials live in this browser, never in the repo. */

const CFG_KEY = 'gl.ops.supabase';
const DEFAULT_URL = 'https://krvxplyjsuvvjaebwgxa.supabase.co';

const Backend = {
  client: null,
  status: 'offline',      // offline | needs-config | needs-auth | live | error
  detail: 'This device only',
  onChange: null,          // (what) => void, called when remote data lands
  onStatus: null,

  config() {
    try { return JSON.parse(localStorage.getItem(CFG_KEY)) || null; } catch { return null; }
  },
  saveConfig(url, key) {
    try { localStorage.setItem(CFG_KEY, JSON.stringify({ url, key })); } catch {}
  },
  clearConfig() {
    try { localStorage.removeItem(CFG_KEY); } catch {}
  },

  setStatus(status, detail) {
    this.status = status;
    this.detail = detail;
    if (this.onStatus) this.onStatus(status, detail);
  },

  async connect() {
    const cfg = this.config();
    if (!cfg || !cfg.url || !cfg.key) { this.setStatus('needs-config', 'Not connected'); return false; }
    if (typeof window.supabase === 'undefined') { this.setStatus('error', 'Library blocked'); return false; }

    this.client = window.supabase.createClient(cfg.url, cfg.key, {
      auth: { persistSession: true, autoRefreshToken: true }
    });

    const { data: { session } } = await this.client.auth.getSession();
    if (!session) { this.setStatus('needs-auth', 'Sign in'); return false; }

    this.setStatus('live', session.user.email || 'Connected');
    this.subscribe();
    return true;
  },

  async signIn(email) {
    if (!this.client) {
      const cfg = this.config();
      if (!cfg) throw new Error('No project configured');
      this.client = window.supabase.createClient(cfg.url, cfg.key);
    }
    const { error } = await this.client.auth.signInWithOtp({
      email, options: { emailRedirectTo: window.location.href }
    });
    if (error) throw error;
  },

  async signOut() {
    if (this.client) await this.client.auth.signOut();
    this.setStatus('needs-auth', 'Sign in');
  },

  subscribe() {
    this.client
      .channel('gl-ops')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ops_state' },
        (p) => this.onChange && this.onChange('state', p.new))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_log' },
        (p) => this.onChange && this.onChange('post', p.new))
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' },
        (p) => this.onChange && this.onChange('log', p.new))
      .subscribe();
  },

  /* ── Reads ─────────────────────────────────────────────── */
  async loadAll() {
    const [stateRes, postsRes, logRes] = await Promise.all([
      this.client.from('ops_state').select('data').eq('id', 'main').maybeSingle(),
      this.client.from('post_log').select('day, person, count'),
      this.client.from('activity_log').select('*').order('ts', { ascending: false }).limit(400)
    ]);
    const posts = {};
    (postsRes.data || []).forEach(r => {
      posts[r.day] = posts[r.day] || {};
      posts[r.day][r.person] = r.count;
    });
    return {
      state: stateRes.data ? stateRes.data.data : null,
      posts,
      log: (logRes.data || []).map(r => ({
        ts: new Date(r.ts).getTime(), who: r.actor, verb: r.verb,
        target: r.target, from: r.from_val || '', to: r.to_val || ''
      }))
    };
  },

  /* ── Writes ────────────────────────────────────────────── */
  async pushState(data, actor) {
    const { error } = await this.client.from('ops_state')
      .upsert({ id: 'main', data, updated_at: new Date().toISOString(), updated_by: actor });
    if (error) this.setStatus('error', 'Save failed');
  },

  async pushPost(day, person, count, unit) {
    const { error } = await this.client.from('post_log')
      .upsert({ day, person, count, unit, updated_at: new Date().toISOString() });
    if (error) this.setStatus('error', 'Save failed');
  },

  async appendLog(entry) {
    const { error } = await this.client.from('activity_log').insert({
      ts: new Date(entry.ts).toISOString(), actor: entry.who, verb: entry.verb,
      target: entry.target, from_val: entry.from, to_val: entry.to
    });
    if (error) this.setStatus('error', 'Log failed');
  }
};
