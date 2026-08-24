// Adds the SpeakWise U.S. provisional patent filing (Aug 23, 2026) to the live
// speakwise project: a "Patent Pending" badge and a patent-filing section
// placed right after "Core Innovation & Technical Approach".
// Public info only — internal filing-portal refs are never published.
// Idempotent: re-running updates the section blocks in place.
// Run via: node scripts/add-speakwise-patent.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}
const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

const SLUG = 'speakwise';
const HEADING = 'U.S. Provisional Patent Filing';
const AFTER_HEADING = 'Core Innovation & Technical Approach';
const PATENT_BADGE = { text: 'Patent Pending', variant: 'accent' };

const blocks = [
  {
    type: 'labeled_bullets',
    variant: 'gradient',
    title: 'U.S. Provisional Patent Filing',
    density: 'loose',
    items: [
      {
        label: 'Title',
        body: 'Systems and Methods for Controllable, Evidence-Preserving Speech Repair with Identity-Preserving Synthesis',
      },
      { label: 'Application Number', body: '64/139,376' },
      // Patent Center / confirmation numbers are internal filing-portal refs — never publish them.
      { label: 'Filing / Receipt Date', body: 'August 23, 2026' },
      { label: 'Inventor', body: 'Ethan Li' },
    ],
  },
  {
    type: 'prose',
    variant: 'flat',
    title: 'What It Covers',
    paragraphs: [
      'The filing covers SpeakWise’s core speech-repair approach: controllable correction of disfluent speech — including the tunable correction coefficient that balances fluency against naturalness — combined with evidence-preserving processing that keeps the speaker’s original utterance intact alongside the repaired output, and identity-preserving synthesis that renders the corrected speech in the speaker’s own voice.',
    ],
  },
];

async function main() {
  const { data: project, error: projErr } = await supabase
    .from('projects')
    .select('id, badges')
    .eq('slug', SLUG)
    .single();
  if (projErr) throw projErr;

  // 1) Patent Pending badge.
  const badges = Array.isArray(project.badges) ? project.badges : [];
  if (!badges.some((b) => b?.text === PATENT_BADGE.text)) {
    const { error } = await supabase
      .from('projects')
      .update({ badges: [...badges, PATENT_BADGE] })
      .eq('id', project.id);
    if (error) throw error;
    console.log(`Added "${PATENT_BADGE.text}" badge to [${SLUG}].`);
  } else {
    console.log(`"${PATENT_BADGE.text}" badge already present on [${SLUG}].`);
  }

  // 2) Upsert the patent section.
  const { data: sections, error: secErr } = await supabase
    .from('project_sections')
    .select('id, heading, order_index')
    .eq('project_id', project.id)
    .order('order_index', { ascending: true });
  if (secErr) throw secErr;

  let existing = (sections ?? []).find((s) => s.heading === HEADING);
  if (existing) {
    const { error } = await supabase
      .from('project_sections')
      .update({ blocks, blocks_version: 1 })
      .eq('id', existing.id);
    if (error) throw error;
    console.log(`Updated "${HEADING}" blocks on [${SLUG}].`);
  } else {
    const { data: inserted, error } = await supabase
      .from('project_sections')
      .insert({
        project_id: project.id,
        heading: HEADING,
        order_index: 999, // temporary; renumbered deterministically below
        blocks_version: 1,
        blocks,
      })
      .select('id, heading, order_index')
      .single();
    if (error) throw error;
    existing = inserted;
    console.log(`Inserted "${HEADING}" into [${SLUG}].`);
  }

  // 3) Renumber so the patent section sits right after the core-innovation section.
  const { data: allSecs, error: allErr } = await supabase
    .from('project_sections')
    .select('id, heading, order_index')
    .eq('project_id', project.id)
    .order('order_index', { ascending: true });
  if (allErr) throw allErr;

  const rest = allSecs.filter((s) => s.heading !== HEADING);
  const patent = allSecs.find((s) => s.heading === HEADING);
  const anchorIdx = rest.findIndex((s) => s.heading === AFTER_HEADING);

  const ordered = [...rest];
  if (anchorIdx === -1) {
    ordered.push(patent);
  } else {
    ordered.splice(anchorIdx + 1, 0, patent);
  }

  for (let i = 0; i < ordered.length; i++) {
    if (ordered[i].order_index !== i) {
      const { error } = await supabase
        .from('project_sections')
        .update({ order_index: i })
        .eq('id', ordered[i].id);
      if (error) throw error;
    }
  }

  console.log('Final section order:');
  ordered.forEach((s, i) => console.log(`  ${i}: ${s.heading}`));
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
