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
    'Brings event registration, waiting lists, attendance, and service records into one place',
    'Volunteers submit hours with supporting documents; administrators approve them or return them for corrections before they count',
    'Supports multiple organizations, each with its own members and records',
    "Tracks each volunteer's progress toward the President's Volunteer Service Award",
    'Built as a volunteer contribution to the community, not for profit',
  ],
  card_teaser: null,
  tech_tags: ['Full-Stack Web App', 'Approval Workflow', 'Role-Based Access', 'Multi-Organization'],
  github_url: null,
  website_url: 'https://www.activityhub.online',
  poster_url: null,
  paper_url: null,
  order_index: 5,
  published: true,
  video: null,
  stats: [
    { label: 'Built For', value: 'Nonprofit' },
    { label: 'Service Hours', value: 'Verified' },
    { label: 'Event Sign-ups', value: 'Waitlists' },
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
        title: 'From Sign-up to Approved Hours',
        items: [
          { marker: '1', title: 'Register', body: 'Volunteers sign up for events; when an event fills, they join a waiting list.' },
          { marker: '2', title: 'Attend', body: 'Organizers track attendance for each event.' },
          { marker: '3', title: 'Submit Hours', body: 'Volunteers submit their service hours along with supporting documents.' },
          { marker: '4', title: 'Review', body: 'Administrators approve each record, or return it to the volunteer for corrections.' },
          { marker: '5', title: 'Count', body: 'Only approved hours count toward a volunteer’s approved totals and service record.' },
        ],
      },
      {
        type: 'mini_cards',
        variant: 'flat',
        title: 'Built for Two Kinds of Users',
        items: [
          { title: 'Volunteers', body: 'Find and register for events, submit hours with documentation, fix records that were sent back, and see their service history.' },
          { title: 'Administrators', body: 'Manage events and attendance, and verify service records before they count.' },
          { title: 'Service Award Progress', body: 'Confirmed hours roll up into each volunteer’s progress toward the President’s Volunteer Service Award.' },
          { title: 'Multiple Organizations', body: 'Each organization keeps its own members and records within the same platform.' },
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
