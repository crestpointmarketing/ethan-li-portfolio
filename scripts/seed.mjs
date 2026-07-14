// One-time (and safely re-runnable) script to load the transcribed content
// in seed-data.mjs into Supabase. Run via `npm run seed` after:
//   1. Running supabase/schema.sql in the Supabase SQL editor
//   2. Creating a .env at the project root with SUPABASE_URL and
//      SUPABASE_SERVICE_ROLE_KEY (see .env.example)
//
// Upserts by slug, so re-running after editing seed-data.mjs just updates
// the existing rows instead of creating duplicates.

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projects } from './seed-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env');

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(envPath);

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error('Create a .env file at the project root (see .env.example), then run: npm run seed');
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

function projectToRow(p) {
  return {
    slug: p.slug,
    title: p.title,
    subtitles: p.subtitles ?? [],
    badges: p.badges ?? [],
    period: p.period ?? null,
    card_highlights: p.cardHighlights ?? [],
    card_teaser: p.cardTeaser ?? null,
    tech_tags: p.techTags ?? [],
    github_url: p.githubUrl ?? null,
    poster_url: p.posterUrl ?? null,
    paper_url: p.paperUrl ?? null,
    order_index: p.orderIndex ?? 0,
    published: !!p.published,
    video: p.video ?? null,
    stats: p.stats ?? [],
  };
}

function sectionToRow(section, projectId) {
  return {
    project_id: projectId,
    heading: section.heading,
    order_index: section.orderIndex ?? 0,
    blocks_version: 1,
    blocks: section.blocks ?? [],
  };
}

async function upsertProject(p) {
  const { data: existing, error: findError } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', p.slug)
    .maybeSingle();
  if (findError) throw findError;

  let projectId;
  if (existing) {
    const { data: updated, error: updateError } = await supabase
      .from('projects')
      .update(projectToRow(p))
      .eq('id', existing.id)
      .select('id')
      .single();
    if (updateError) throw updateError;
    projectId = updated.id;
    console.log(`Updated existing project "${p.slug}" (${projectId})`);
  } else {
    const { data: inserted, error: insertError } = await supabase
      .from('projects')
      .insert(projectToRow(p))
      .select('id')
      .single();
    if (insertError) throw insertError;
    projectId = inserted.id;
    console.log(`Created project "${p.slug}" (${projectId})`);
  }

  const { error: deleteError } = await supabase.from('project_sections').delete().eq('project_id', projectId);
  if (deleteError) throw deleteError;

  const sectionRows = (p.sections ?? []).map((s) => sectionToRow(s, projectId));
  if (sectionRows.length > 0) {
    const { error: insertSectionsError } = await supabase.from('project_sections').insert(sectionRows);
    if (insertSectionsError) throw insertSectionsError;
  }
  console.log(`  -> wrote ${sectionRows.length} sections`);
}

async function main() {
  for (const project of projects) {
    await upsertProject(project);
  }
  console.log('Seed complete.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
