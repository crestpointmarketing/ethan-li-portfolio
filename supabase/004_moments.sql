-- Adds the "Moments" section: a small photo-and-caption gallery for
-- personal life content (volunteering, F1, day-to-day moments, etc.)
-- alongside the more professional sections. Run this once in the
-- Supabase SQL Editor, after 001, 002, and 003.

create table if not exists moments (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text not null,
  tag text,
  moment_date text,
  order_index int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists moments_order_idx on moments (order_index);
create index if not exists moments_published_idx on moments (published);

drop trigger if exists moments_set_updated_at on moments;
create trigger moments_set_updated_at
  before update on moments
  for each row
  execute function set_updated_at();

alter table moments enable row level security;
-- Intentionally no policies, matching the other content tables: only the
-- service role (used exclusively inside /api) can read or write these.
