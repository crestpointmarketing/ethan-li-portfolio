-- Adds an optional live-website link to projects (rendered as a button on the
-- project card and detail page). Run once in the Supabase SQL Editor.

alter table projects add column if not exists website_url text;
