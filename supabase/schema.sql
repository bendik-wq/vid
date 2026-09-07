-- G&L Ops — schema
-- Run once in the Supabase SQL editor (or via the Supabase MCP server).
-- Project: krvxplyjsuvvjaebwgxa

-- ─────────────────────────────────────────────────────────────
-- 1. The shared board. One row, whole document, last write wins.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.ops_state (
  id          text primary key default 'main',
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  text
);

-- ─────────────────────────────────────────────────────────────
-- 2. Daily output. One row per person per day — queryable.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.post_log (
  day        date not null,
  person     text not null,
  count      integer not null default 0 check (count >= 0),
  unit       text,
  updated_at timestamptz not null default now(),
  primary key (day, person)
);

create index if not exists post_log_day_idx on public.post_log (day desc);

-- ─────────────────────────────────────────────────────────────
-- 3. The change log. Append only — this is the audit trail.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.activity_log (
  id        bigint generated always as identity primary key,
  ts        timestamptz not null default now(),
  actor     text not null,
  verb      text not null,
  target    text not null,
  from_val  text,
  to_val    text
);

create index if not exists activity_log_ts_idx on public.activity_log (ts desc);

-- ─────────────────────────────────────────────────────────────
-- 4. Access. Signed-in users only — anonymous keys read nothing.
-- ─────────────────────────────────────────────────────────────
alter table public.ops_state    enable row level security;
alter table public.post_log     enable row level security;
alter table public.activity_log enable row level security;

drop policy if exists "authenticated read state"   on public.ops_state;
drop policy if exists "authenticated write state"  on public.ops_state;
drop policy if exists "authenticated read posts"   on public.post_log;
drop policy if exists "authenticated write posts"  on public.post_log;
drop policy if exists "authenticated read log"     on public.activity_log;
drop policy if exists "authenticated append log"   on public.activity_log;

create policy "authenticated read state"  on public.ops_state
  for select to authenticated using (true);
create policy "authenticated write state"  on public.ops_state
  for all to authenticated using (true) with check (true);

create policy "authenticated read posts"  on public.post_log
  for select to authenticated using (true);
create policy "authenticated write posts" on public.post_log
  for all to authenticated using (true) with check (true);

create policy "authenticated read log"    on public.activity_log
  for select to authenticated using (true);
-- Append only: no update or delete policy, so history cannot be rewritten.
create policy "authenticated append log"  on public.activity_log
  for insert to authenticated with check (true);

-- ─────────────────────────────────────────────────────────────
-- 5. Realtime — both browsers see each other's writes.
-- ─────────────────────────────────────────────────────────────
alter publication supabase_realtime add table public.ops_state;
alter publication supabase_realtime add table public.post_log;
alter publication supabase_realtime add table public.activity_log;

-- Full row bodies on updates, so subscribers get the new document.
alter table public.ops_state    replica identity full;
alter table public.post_log     replica identity full;
alter table public.activity_log replica identity full;
