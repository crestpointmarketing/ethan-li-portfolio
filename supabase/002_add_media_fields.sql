-- Adds poster-image and research-paper-PDF fields to existing projects,
-- plus a read policy for the "project-assets" storage bucket (already
-- created for you via the Supabase Admin API — no need to create it here).
-- Run this once in the Supabase SQL Editor, after 001 (schema.sql) has
-- already been applied.

alter table projects add column if not exists poster_url text;
alter table projects add column if not exists paper_url text;

-- Public read for uploaded posters/papers; only the service role (used by
-- /api/admin/uploads) can write, matching the rest of this project's
-- security model — anon/authenticated get no write policy at all.
-- Storage RLS policies can only be created via SQL, not the Admin API, so
-- this part still needs to be run here even though the bucket itself
-- already exists.
drop policy if exists "Public read project-assets" on storage.objects;
create policy "Public read project-assets"
  on storage.objects for select
  using (bucket_id = 'project-assets');
