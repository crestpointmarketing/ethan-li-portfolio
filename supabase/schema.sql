-- Ethan Li portfolio CMS schema.
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query -> paste -> Run).
--
-- All access to these tables happens server-side only, via /api serverless
-- functions using the Supabase service role key. The frontend never talks to
-- Supabase directly. RLS is enabled with zero policies below as
-- defense-in-depth: the anon/authenticated roles get zero access even if
-- the anon key were ever accidentally exposed, while the service role
-- (used only inside our API functions) always bypasses RLS.

create extension if not exists pgcrypto; -- for gen_random_uuid()

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  subtitles text[] not null default '{}',
  badges jsonb not null default '[]',            -- [{text, variant: 'accent'|'neutral'}]
  period text,
  card_highlights text[] not null default '{}',  -- homepage bullet summary
  card_teaser jsonb,                             -- {label, items: string[]} | null
  tech_tags text[] not null default '{}',
  github_url text,
  order_index int not null default 0,
  published boolean not null default false,
  video jsonb,                                   -- {type:'embed',src,title} | {type:'placeholder',message,subMessage} | null
  stats jsonb not null default '[]',              -- [{value, label, noWrap?}]
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_order_idx on projects (order_index);
create index if not exists projects_published_idx on projects (published);

create table if not exists project_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  heading text not null,
  order_index int not null default 0,
  blocks_version int not null default 1,          -- reserved for future block-shape migrations
  blocks jsonb not null default '[]'
);

create index if not exists project_sections_project_idx on project_sections (project_id, order_index);

-- Keep updated_at current on every row update.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at
  before update on projects
  for each row
  execute function set_updated_at();

alter table projects enable row level security;
alter table project_sections enable row level security;
-- Intentionally no policies: this blocks the anon/authenticated Supabase
-- roles from touching these tables entirely. Only the service role
-- (used exclusively inside our /api functions) bypasses RLS.
