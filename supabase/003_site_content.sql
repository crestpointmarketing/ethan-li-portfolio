-- Adds admin-editable storage for the About, Contact, Experience, and
-- Achievements sections (previously hardcoded in React components).
-- Run this once in the Supabase SQL Editor, after 001 and 002.

-- Singleton sections (About, Contact): one row per `key`, whole content as jsonb.
create table if not exists site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_content_set_updated_at on site_content;
create trigger site_content_set_updated_at
  before update on site_content
  for each row
  execute function set_updated_at();

-- Experience entries (list, like projects — currently one, may grow).
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  company text not null,
  company_tagline text not null,
  role text not null,
  badge_text text not null,
  period text not null,
  location text not null,
  order_index int not null default 0,
  published boolean not null default false,
  summary_highlights text[] not null default '{}',
  hero_stats jsonb not null default '[]',
  overview_paragraphs text[] not null default '{}',
  responsibilities jsonb not null default '[]',
  tech_columns jsonb not null default '[]',
  highlights jsonb not null default '[]',
  takeaway_paragraphs text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists experiences_order_idx on experiences (order_index);
create index if not exists experiences_published_idx on experiences (published);

drop trigger if exists experiences_set_updated_at on experiences;
create trigger experiences_set_updated_at
  before update on experiences
  for each row
  execute function set_updated_at();

-- Achievement categories (each holding a list of awards).
create table if not exists achievement_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  order_index int not null default 0,
  awards jsonb not null default '[]'
);

create index if not exists achievement_categories_order_idx on achievement_categories (order_index);

alter table site_content enable row level security;
alter table experiences enable row level security;
alter table achievement_categories enable row level security;
-- Intentionally no policies, matching projects/project_sections: only the
-- service role (used exclusively inside /api) can read or write these.
