-- KolyaJump leaderboard
create table if not exists public.kolyajump_scores (
  user_id uuid primary key references auth.users(id) on delete cascade,
  best_score bigint not null default 0,
  best_height integer not null default 0,
  hero text,
  updated_at timestamptz not null default now()
);

create index if not exists kolyajump_scores_best_idx
on public.kolyajump_scores(best_score desc);

alter table public.kolyajump_scores enable row level security;

drop policy if exists "scores readable" on public.kolyajump_scores;
create policy "scores readable" on public.kolyajump_scores for select using (true);

drop policy if exists "own score insert" on public.kolyajump_scores;
create policy "own score insert" on public.kolyajump_scores
for insert with check (auth.uid() = user_id);

drop policy if exists "own score update" on public.kolyajump_scores;
create policy "own score update" on public.kolyajump_scores
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
