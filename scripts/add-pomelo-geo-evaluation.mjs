// One-off (safely re-runnable) script that adds the "GEO Evaluation" section
// to the PomeloLabs project, adds a "Patent Pending" badge (the evaluation
// methodology + model framework are filed as a U.S. provisional patent), and
// positions the new section right after "Core Innovation & Technical Approach".
//
// Idempotent: re-running updates the section's blocks in place, keeps the
// badge de-duplicated, and re-derives the full section ordering deterministically.
//
// Run via: node scripts/add-pomelo-geo-evaluation.mjs

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

const SLUG = 'pomelo-labs';
const HEADING = 'GEO Evaluation — Product Evolution & Principles';
const AFTER_HEADING = 'Core Innovation & Technical Approach';
const PATENT_BADGE = { text: 'Patent Pending', variant: 'accent' };

const blocks = [
  {
    type: 'prose',
    variant: 'flat',
    paragraphs: [
      'Pomelo Labs’ GEO evaluation is a product direction in its own right — a **patent-pending multi-model GEO evaluation system** that reduces prompt and model bias through repeated sampling, evidence-based scoring, confidence measurement, and auditable cross-platform analysis. **The evaluation methodology and model framework have been filed as a U.S. provisional patent** — *System and Method for Statistical Measurement, Scoring, and Predictive Optimization of Entity Visibility in Generative Artificial-Intelligence Search Engines* (U.S. Provisional Application No. 64/119,527, filed July 26, 2026; first named inventor: Ethan Li). Its design has evolved across three generations, from simply detecting visibility to a proprietary model that scores answer quality the way a real user would judge it.',
    ],
  },
  {
    type: 'labeled_bullets',
    variant: 'gradient',
    title: 'U.S. Provisional Patent Filing',
    density: 'loose',
    items: [
      {
        label: 'Title',
        body: 'System and Method for Statistical Measurement, Scoring, and Predictive Optimization of Entity Visibility in Generative Artificial-Intelligence Search Engines',
      },
      { label: 'Application Number', body: '64/119,527' },
      { label: 'Patent Center Number', body: '79336791' },
      { label: 'Filing / Receipt Date', body: 'July 26, 2026' },
      { label: 'First Named Inventor', body: 'Ethan Li' },
    ],
  },
  {
    type: 'prose',
    variant: 'flat',
    title: "A Mention Isn't a Recommendation",
    paragraphs: [
      'Pomelo Labs’ GEO evaluation began from a simple observation: a brand can appear in an AI answer and still be losing. The same product might sit at the bottom of a competitor list, be described accurately and favorably, or be named inside an unflattering comparison — yet a presence-only score counts all three the same. So the system separates **presence from quality**: Is the brand central to the answer or buried in a list? Is the context positive, negative, or neutral? Does the model describe the product accurately, or only mention it in passing? A score that can’t tell those apart can’t tell a company what is actually working.',
    ],
  },
  {
    type: 'steps',
    title: 'How the Evaluation Has Evolved',
    variant: 'flat',
    items: [
      {
        marker: 'V1',
        title: 'Baseline Visibility Detection',
        body: 'Detects whether a brand is mentioned by AI at all, how often it is mentioned, and whether the answer actually contains brand-relevant content.',
      },
      {
        marker: 'V2',
        title: 'Real-User-Perspective Evaluation',
        body: 'Starts from real users’ search intent, questions, and decision-making scenarios to generate realistic queries, then evaluates each AI answer for accuracy, completeness, bias, strength of recommendation, and overall quality.',
      },
      {
        marker: 'V3',
        title: 'Proprietary Evaluation Model',
        body: 'The theoretical framework is established. The next step combines real evaluation data, industry differences, and user feedback in a proprietary model that continuously improves question-generation quality, scoring credibility, and the usefulness of its improvement recommendations.',
      },
    ],
  },
  {
    type: 'prose',
    variant: 'gradient',
    title: 'Our Principle — Reveal the Truth, Not a Flattering Score',
    paragraphs: [
      'Pomelo’s goal isn’t to please users or manufacture false progress with pretty numbers. It’s to help a company see how it truly performs in AI search: what the main problems are, why they occur, and which concrete, actionable steps can improve them.',
      'Only by honestly surfacing the real problems — and continuously offering credible, executable directions for improvement — does a GEO evaluation product earn long-term value and a genuine competitive moat.',
      'Generative models are also unstable, so a single response can’t represent a market. Useful measurement depends on repeated observations, varied query types, and comparisons across platforms — and on reporting uncertainty rather than hiding it behind one polished number. Integrity here starts earlier than the data itself: in the definitions and categories that decide what a score is allowed to say.',
    ],
  },
];

async function main() {
  const { data: project, error: projErr } = await supabase
    .from('projects')
    .select('id, slug, badges')
    .eq('slug', SLUG)
    .single();
  if (projErr) throw projErr;

  // 1) Ensure the "Patent Pending" badge exists (de-duplicated by text).
  const badges = Array.isArray(project.badges) ? project.badges : [];
  if (!badges.some((b) => b?.text === PATENT_BADGE.text)) {
    const nextBadges = [...badges, PATENT_BADGE];
    const { error } = await supabase.from('projects').update({ badges: nextBadges }).eq('id', project.id);
    if (error) throw error;
    console.log(`Added "${PATENT_BADGE.text}" badge to [${SLUG}].`);
  } else {
    console.log(`"${PATENT_BADGE.text}" badge already present on [${SLUG}].`);
  }

  // 2) Upsert the GEO Evaluation section.
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

  // 3) Re-derive ordering: keep existing order, but force the GEO section to sit
  //    immediately after "Core Innovation & Technical Approach".
  const { data: allSecs, error: allErr } = await supabase
    .from('project_sections')
    .select('id, heading, order_index')
    .eq('project_id', project.id)
    .order('order_index', { ascending: true });
  if (allErr) throw allErr;

  const rest = allSecs.filter((s) => s.heading !== HEADING);
  const geo = allSecs.find((s) => s.heading === HEADING);
  const anchorIdx = rest.findIndex((s) => s.heading === AFTER_HEADING);

  const ordered = [...rest];
  if (anchorIdx === -1) {
    ordered.push(geo); // fallback: append at end
  } else {
    ordered.splice(anchorIdx + 1, 0, geo);
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
