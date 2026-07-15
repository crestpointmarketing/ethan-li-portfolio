// One-off (safely re-runnable) script to add the DreamCollege.ai internship
// experience entry. Run via: node scripts/add-dreamcollege-experience.mjs

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

const experience = {
  slug: 'dreamcollege-ai',
  company: 'DreamCollege.ai',
  companyTagline: 'AI-Powered College Selection & Application Coaching Platform',
  role: 'Backend Developer Intern',
  badgeText: 'Internship',
  period: 'Summer 2025',
  location: 'Remote',
  orderIndex: 1,
  published: true,
  summaryHighlights: [
    'Built backend systems for the platform’s AI mock-interview module, helping students practice for college admissions interviews.',
    'Developed the interview question bank system, covering storage, categorization, and retrieval of practice questions.',
    'Implemented interview scheduling functionality so students could book and manage mock interview sessions.',
    'Worked on AI-driven scoring and feedback for practice interviews, helping translate model output into actionable student feedback.',
    'Collaborated with a fully remote engineering team to ship features end-to-end, from API design through deployment.',
  ],
  heroStats: [
    { value: '3', label: 'Core Modules Shipped' },
    { value: 'AI', label: 'Interview Scoring' },
    { value: 'Remote', label: 'Engineering Team' },
    { value: 'Backend', label: 'API & Data Design' },
  ],
  overviewParagraphs: [
    'DreamCollege.ai is an AI-powered platform that helps students with college selection and application, including practicing for admissions interviews. As a backend developer intern, I worked primarily on the platform’s college interview module.',
    'The role involved building the backend that powers AI-based mock interviews — from managing the bank of practice interview questions, to scheduling practice sessions, to generating AI-driven scoring and feedback on a student’s recorded answers.',
  ],
  responsibilities: [
    {
      title: 'AI Mock Interview Scoring',
      body: 'Built backend logic to route student interview responses through an AI scoring pipeline and return structured feedback on their answers.',
    },
    {
      title: 'Interview Question Bank',
      body: 'Designed and implemented the system for storing, categorizing, and serving practice interview questions to students.',
    },
    {
      title: 'Interview Scheduling',
      body: 'Built the scheduling functionality that let students book, reschedule, and track their mock interview sessions.',
    },
    {
      title: 'API Design',
      body: 'Designed and implemented the backend APIs connecting the interview module to the rest of the platform.',
    },
    {
      title: 'Remote Team Collaboration',
      body: 'Worked asynchronously with a fully remote engineering team, taking features from design through implementation and deployment.',
    },
  ],
  techColumns: [
    {
      heading: 'Backend Development',
      items: ['API design & implementation', 'Database schema design', 'Session scheduling logic'],
    },
    {
      heading: 'AI Integration',
      items: ['AI-driven interview scoring', 'Feedback generation from model output', 'Question bank retrieval'],
    },
  ],
  highlights: [],
  takeawayParagraphs: [
    'This internship gave me hands-on experience building backend features for a real, in-production AI product — not just prototyping, but shipping systems that real students used to prepare for college interviews.',
    'Working fully remote on a small team taught me how to take a feature from an initial spec to a deployed API on my own, and how to think about AI output (interview scores and feedback) as something that has to be turned into a clear, useful product experience.',
  ],
};

async function main() {
  const { data: existing, error: findError } = await supabase
    .from('experiences')
    .select('id')
    .eq('slug', experience.slug)
    .maybeSingle();
  if (findError) throw findError;

  const row = {
    slug: experience.slug,
    company: experience.company,
    company_tagline: experience.companyTagline,
    role: experience.role,
    badge_text: experience.badgeText,
    period: experience.period,
    location: experience.location,
    order_index: experience.orderIndex,
    published: experience.published,
    summary_highlights: experience.summaryHighlights,
    hero_stats: experience.heroStats,
    overview_paragraphs: experience.overviewParagraphs,
    responsibilities: experience.responsibilities,
    tech_columns: experience.techColumns,
    highlights: experience.highlights,
    takeaway_paragraphs: experience.takeawayParagraphs,
  };

  if (existing) {
    const { error } = await supabase.from('experiences').update(row).eq('id', existing.id);
    if (error) throw error;
    console.log(`Updated experience "${experience.slug}".`);
  } else {
    const { error } = await supabase.from('experiences').insert(row);
    if (error) throw error;
    console.log(`Created experience "${experience.slug}".`);
  }
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
