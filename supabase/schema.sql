-- CeritaKita Database Schema
-- Run this in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- 1. BOOKS
create table public.books (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null default '',
  cover_url text not null default '',
  read_time_minutes integer not null default 5,
  category text not null default '4-5 tahun',
  status text not null default 'draft' check (status in ('draft', 'published', 'unpublished')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. SLIDES
create table public.slides (
  id uuid primary key default uuid_generate_v4(),
  book_id uuid not null references public.books(id) on delete cascade,
  "order" integer not null default 0,
  image_url text not null default '',
  created_at timestamptz not null default now()
);
create index idx_slides_book_id on public.slides(book_id);
create index idx_slides_order on public.slides(book_id, "order");

-- 3. SOUND TRIGGERS
create table public.sound_triggers (
  id uuid primary key default uuid_generate_v4(),
  slide_id uuid not null references public.slides(id) on delete cascade,
  x numeric not null default 50,
  y numeric not null default 50,
  audio_url text not null default '',
  label text not null default '',
  created_at timestamptz not null default now()
);
create index idx_sound_triggers_slide_id on public.sound_triggers(slide_id);

-- 4. MINI GAMES (one per book)
create table public.mini_games (
  id uuid primary key default uuid_generate_v4(),
  book_id uuid not null unique references public.books(id) on delete cascade,
  question text not null default '',
  created_at timestamptz not null default now()
);
create index idx_mini_games_book_id on public.mini_games(book_id);

-- 5. GAME OPTIONS
create table public.game_options (
  id uuid primary key default uuid_generate_v4(),
  game_id uuid not null references public.mini_games(id) on delete cascade,
  image_url text not null default '',
  label text not null default '',
  is_correct boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index idx_game_options_game_id on public.game_options(game_id);

-- 6. RLS
alter table public.books enable row level security;
alter table public.slides enable row level security;
alter table public.sound_triggers enable row level security;
alter table public.mini_games enable row level security;
alter table public.game_options enable row level security;

-- Public read for published books
create policy "Anyone can read published books" on public.books for select using (status = 'published');

create policy "Anyone can read slides of published books" on public.slides for select
  using (exists (select 1 from public.books where books.id = slides.book_id and books.status = 'published'));

create policy "Anyone can read sound triggers of published books" on public.sound_triggers for select
  using (exists (select 1 from public.slides join public.books on books.id = slides.book_id where slides.id = sound_triggers.slide_id and books.status = 'published'));

create policy "Anyone can read mini games of published books" on public.mini_games for select
  using (exists (select 1 from public.books where books.id = mini_games.book_id and books.status = 'published'));

create policy "Anyone can read game options of published books" on public.game_options for select
  using (exists (select 1 from public.mini_games join public.books on books.id = mini_games.book_id where mini_games.id = game_options.game_id and books.status = 'published'));

-- Admin full access
create policy "Auth full access books" on public.books for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth full access slides" on public.slides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth full access sound_triggers" on public.sound_triggers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth full access mini_games" on public.mini_games for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth full access game_options" on public.game_options for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 7. Auto-update updated_at
create or replace function public.handle_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger on_books_updated before update on public.books for each row execute function public.handle_updated_at();
