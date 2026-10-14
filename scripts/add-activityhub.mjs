// Add ActivityHub — the volunteer-management platform Ethan built for ACAESUSA
// (Common App activity: "Built ActivityHub for admin event management & volunteer
// registration and tracking"). Places it after Expressive, matching the Common App order.
// Run via: node scripts/add-activityhub.mjs

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

const project = {
  slug: 'activityhub',
  title: 'ActivityHub — Volunteer Management Platform for ACAESUSA',
  subtitles: [
    'Built for the Asian Culture and Education Society USA (ACAESUSA) · President, Computer Science Chapter',
    'Event registration, attendance, and verified service hours in one place',
  ],
  badges: [
    { text: 'Independently Built', variant: 'accent' },
    { text: 'Community Impact', variant: 'accent' },
    { text: '2026 - Now', variant: 'neutral' },
  ],
  period: '2026 - Now',
  card_highlights: [
    'Independently designed, built, and launched ActivityHub from scratch — the platform ACAESUSA uses to run volunteer events and track service hours',
    'Event publishing, registration with capacity limits and auto-promoting waitlists, and QR-code / event-code check-in',
    'Two-step integrity: check-in is only pending until an administrator confirms it, and batch confirmation is idempotent so hours are never double-counted',
    'Auto-calculates President’s Volunteer Service Award (PVSA) levels and generates downloadable certificates',
    'AI-written event copy and auto-laid-out event posters; bilingual (English/Chinese) and mobile-friendly',
    'Multi-organization platform with org-scoped roles and database-level access control (Supabase Row-Level Security)',
  ],
  card_teaser: null,
  tech_tags: ['Next.js 16', 'TypeScript', 'Supabase (Postgres, RLS)', 'Tailwind CSS', 'Playwright', 'Vercel'],
  github_url: null,
  website_url: 'https://www.activityhub.online',
  poster_url: null,
  paper_url: null,
  order_index: 5,
  published: true,
  video: {
    type: 'file',
    src: 'https://szshmccgvzjyrvefhlsz.supabase.co/storage/v1/object/public/project-assets/videos/activityhub-product-tour.mp4',
    title: 'ActivityHub Product Tour',
    posterUrl: 'https://szshmccgvzjyrvefhlsz.supabase.co/storage/v1/object/public/project-assets/posters/activityhub-product-tour-poster.jpg',
  },
  stats: [
    { label: 'Hours Confirmation', value: 'Verified' },
    { label: 'Check-in', value: 'QR Code' },
    { label: 'PVSA Certificates', value: 'Auto' },
    { label: 'Organizations', value: 'Multi' },
  ],
};

const sections = [
  {
    heading: 'Motivation',
    blocks: [
      {
        type: 'prose',
        variant: 'flat',
        paragraphs: [
          'ACAESUSA is a Dallas–Fort Worth nonprofit promoting Asian-American culture, cultural exchange, and youth leadership. Its volunteer work runs on everyday logistics: organizers need to know who is coming to an event and whether service records are accurate, and volunteers need a clear way to submit their hours, fix missing information, and get a record of their service.',
          'As President of the Computer Science Chapter, I designed and built **ActivityHub** myself, from scratch, so both groups could do that in one place instead of across scattered forms and spreadsheets.',
        ],
      },
    ],
  },
  {
    heading: 'How It Works',
    blocks: [
      {
        type: 'steps',
        variant: 'flat',
        title: 'From Sign-up to Certificate',
        items: [
          { marker: '1', title: 'Publish', body: 'Administrators create and publish events, with AI-generated event copy and an auto-laid-out poster.' },
          { marker: '2', title: 'Register', body: 'Volunteers sign up online; when an event fills, they join a waitlist that auto-promotes when a spot opens.' },
          { marker: '3', title: 'Check In', body: 'On event day, volunteers check in by scanning a QR code or entering the event code within the check-in window.' },
          { marker: '4', title: 'Confirm Hours', body: 'Check-in alone is not service time: administrators review and batch-confirm hours, and only confirmed hours enter the official record.' },
          { marker: '5', title: 'Recognize', body: 'Confirmed hours roll up into PVSA levels, with downloadable certificates and exportable records for award season.' },
        ],
      },
      {
        type: 'mini_cards',
        variant: 'flat',
        title: 'Built for Two Kinds of Users',
        items: [
          { title: 'Volunteers', body: 'Register for events, check in, submit outside service with proof, resubmit records that were sent back, and track progress toward PVSA.' },
          { title: 'Administrators', body: 'Run events, rosters, and check-in, batch-confirm hours, review outside submissions, and export audited records.' },
          { title: 'Multiple Organizations', body: 'Each organization has its own members, roles, invite codes, and records, with a platform console above them.' },
          { title: 'Bilingual & Mobile', body: 'One-click English/Chinese switching and a layout that works in any phone browser.' },
        ],
      },
    ],
  },
  {
    heading: 'Technical Design',
    blocks: [
      {
        type: 'labeled_bullets',
        density: 'loose',
        variant: 'flat',
        title: 'Built So the Records Can Be Trusted',
        items: [
          { label: 'Events ≠ records', body: 'Public events and each volunteer’s personal activity records live in separate tables, so editing an event never silently rewrites anyone’s history.' },
          { label: 'Atomic, idempotent operations', body: 'Registration claims the last open spot in a single transaction, and batch confirmation writes one record per person — repeating it never double-counts hours.' },
          { label: 'Authorization in the database', body: 'Every core table enforces Supabase Row-Level Security; hiding a button in the UI is never treated as access control.' },
          { label: 'Append-only audit trail', body: 'Audit logs can only be appended, hour adjustments require a reason, and edits to a confirmed record keep the previous version.' },
          { label: 'Private evidence storage', body: 'Proof documents go to a private storage bucket and are shown only through short-lived signed URLs.' },
        ],
      },
      {
        type: 'tech_columns',
        variant: 'flat',
        title: 'Tech Stack',
        columns: [
          { heading: 'Application', items: ['Next.js 16 (App Router) + TypeScript', 'Tailwind CSS v4', 'QR-code check-in, PDF certificates (pdf-lib)'] },
          { heading: 'Data & Infrastructure', items: ['Supabase Postgres, Auth, Row-Level Security, Storage', 'Vercel hosting with scheduled reminder jobs', 'Verification scripts + Playwright end-to-end tests'] },
        ],
      },
    ],
  },
  {
    heading: 'Reflection',
    blocks: [
      {
        type: 'prose',
        variant: 'gradient',
        paragraphs: [
          'ActivityHub taught me to design for the moments when something goes wrong — a missing document, an incorrect hour count — and to give people a clear way to fix it rather than a dead end. Thinking through what organizers and volunteers each needed mattered more than any single feature.',
          'Building it purely to help my community was one of the most rewarding things I have done. It showed me that technology can be meaningful without any monetary incentive, and that ethos carried into my other community-first projects.',
        ],
      },
    ],
  },
];

const { data: existing, error: findErr } = await supabase.from('projects').select('id').eq('slug', project.slug).maybeSingle();
if (findErr) throw findErr;
let id = existing?.id;
if (id) {
  const { error } = await supabase.from('projects').update(project).eq('id', id);
  if (error) throw error;
} else {
  const { data, error } = await supabase.from('projects').insert(project).select('id').single();
  if (error) throw error;
  id = data.id;
}
const { error: delErr } = await supabase.from('project_sections').delete().eq('project_id', id);
if (delErr) throw delErr;
const { error: insErr } = await supabase.from('project_sections').insert(
  sections.map((s, i) => ({ project_id: id, heading: s.heading, order_index: i, blocks_version: 1, blocks: s.blocks })),
);
if (insErr) throw insErr;

// Keep Common App order: ... Expressive (4), ActivityHub (5), Zeitgeist (6), Elocutionist (7)
for (const [slug, order] of [['zeitgeist', 6], ['elocutionist', 7]]) {
  const { error } = await supabase.from('projects').update({ order_index: order }).eq('slug', slug);
  if (error) throw error;
}

const { data: meta, error: metaErr } = await supabase.from('site_content').select('data').eq('key', 'achievements_meta').single();
if (metaErr) throw metaErr;
const stat = meta.data.stats.find((s) => s.label === 'Major Projects');
if (stat) {
  stat.value = '7';
  const { error } = await supabase.from('site_content').update({ data: meta.data }).eq('key', 'achievements_meta');
  if (error) throw error;
}

console.log(`ActivityHub written (${id}) with ${sections.length} sections; order and project count updated.`);
