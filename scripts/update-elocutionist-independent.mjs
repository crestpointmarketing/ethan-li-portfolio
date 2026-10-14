// Reframe Elocutionist as Ethan's independent college-interview project, matching
// the Common App (Short Answer 1: "my own project, Elocutionist" with expressive AI
// avatars). Replaces the "Internship Project" / job-interview framing.
// Run via: node scripts/update-elocutionist-independent.mjs

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
  title: 'Elocutionist — AI College Interview Coach',
  subtitles: ['Independent Project | AI Mock College-Interview Practice with Expressive AI Avatars'],
  badges: [
    { text: 'Independent Project', variant: 'accent' },
    { text: '2024 - 2025', variant: 'neutral' },
  ],
  card_highlights: [
    "Built an AI mock college-interview app that generates questions from each student's own profile and documents",
    'Students type or speak their answers (with an optional interviewer voice); spoken answers are transcribed with Whisper, and GPT-4 gives category scores and suggestions on content and structure',
    'Also supports speech and presentation rehearsal, with timed drafts and optional recordings to listen back',
    'Added interactive 3D AI interviewer avatars so practice feels like a real conversation',
    'Recorded sessions for playback, with scoring and analytics to track improvement over time',
    'Full-stack TypeScript: React + Vite frontend, Express backend, MongoDB, deployed on Vercel',
  ],
  tech_tags: ['React', 'Express.js', 'TypeScript', 'GPT-4', 'Whisper', 'MongoDB'],
  stats: [
    { label: 'Interview Practice', value: 'College' },
    { label: 'AI Interviewer', value: '3D Avatars', noWrap: true },
    { label: 'Speech-to-Text', value: 'Whisper' },
    { label: 'Feedback Engine', value: 'GPT-4' },
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
          'College admissions interviews are short, high-stakes conversations, and most students walk into them with little real practice. Private interview coaching is expensive, and many students — especially first-generation applicants — have no one to rehearse with or to tell them how they actually came across.',
          '**Elocutionist gives every student an unlimited, patient practice partner**: an AI interviewer that asks questions grounded in the student’s own background, listens to spoken answers, and returns specific, actionable feedback.',
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
        title: 'Practice Loop',
        items: [
          { marker: '1', title: 'Profile-Based Questions', body: 'Students add their background — including uploaded PDF, DOCX, or image documents, parsed with text extraction and OCR — and the app generates interview questions tailored to them.' },
          { marker: '2', title: 'Spoken Answers', body: 'Students read the question or turn on the interviewer voice, then type or record their answer; recordings are transcribed with OpenAI Whisper.' },
          { marker: '3', title: 'AI Feedback', body: 'GPT-4 scores each answer by category for content and structure — not vocal delivery — and turns the evaluation into concrete suggestions rather than a bare score.' },
          { marker: '4', title: 'Review & Track', body: 'Sessions are recorded for playback, and performance analytics track improvement across practice sessions.' },
        ],
      },
      {
        type: 'prose',
        variant: 'flat',
        title: 'Expressive AI Interviewer Avatars',
        paragraphs: [
          'Inspired by Proxona, a project from Professor Min Kyung Lee’s lab, I added interactive 3D AI interviewer avatars. Practicing in front of an expressive interviewer, rather than a text box, makes the session feel closer to a real conversation — which is exactly what students need to rehearse.',
        ],
      },
    ],
  },
  {
    heading: 'Human-AI Interaction Design',
    blocks: [
      {
        type: 'labeled_bullets',
        density: 'loose',
        variant: 'flat',
        items: [
          { label: 'Conversational Practice', body: 'Speaking to an avatar interviewer lowers anxiety and builds the habit of answering out loud, not just thinking through answers.' },
          { label: 'Personalized Questions', body: "Questions draw on the student's own activities and background, so practice matches the conversations they will actually have." },
          { label: 'Constructive Feedback', body: 'Feedback is specific and framed around how to improve, so a nervous student leaves with next steps instead of just a grade.' },
          { label: 'Progress Over Time', body: 'Playback and analytics let students hear themselves and see improvement across sessions.' },
        ],
      },
    ],
  },
  {
    heading: 'Technical Development',
    blocks: [
      {
        type: 'tech_columns',
        variant: 'flat',
        title: 'Tech Stack',
        columns: [
          { heading: 'Frontend', items: ['React 19 + Vite', 'React Router', 'Interactive 3D interviewer avatars'] },
          { heading: 'Backend & AI', items: ['Node.js + Express + TypeScript', 'MongoDB with Mongoose', 'OpenAI GPT-4 + Whisper', 'JWT authentication', 'PDF/DOCX parsing and Tesseract OCR'] },
        ],
      },
      {
        type: 'prose',
        variant: 'flat',
        title: 'Deployment',
        paragraphs: ['Deployed on Vercel, serving the static frontend and the Express backend as serverless functions, with a public site at elocutionist.app.'],
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
          'The hardest and most valuable part of Elocutionist was turning an LLM’s raw evaluation into feedback a nervous student can actually use. A score alone tells you nothing; a specific note about structure or pacing tells you what to do next time.',
          'Adding expressive avatars taught me that interaction design matters as much as the model behind it — the same feedback lands differently when practice feels like a conversation with someone rather than a form to fill in.',
          'The part I care about most is who this is for. Students without mentors or money for coaching are the ones who most need a place to practice, and I wanted the AI to feel like a patient coach that builds their confidence and voice, never one that speaks for them.',
        ],
      },
    ],
  },
];

const { data: elo, error } = await supabase.from('projects').select('id, title').eq('slug', 'elocutionist').single();
if (error) throw error;
console.log('Updating', elo.title);

const { error: updErr } = await supabase.from('projects').update(project).eq('id', elo.id);
if (updErr) throw updErr;

const { error: delErr } = await supabase.from('project_sections').delete().eq('project_id', elo.id);
if (delErr) throw delErr;
const { error: insErr } = await supabase.from('project_sections').insert(
  sections.map((s, i) => ({ project_id: elo.id, heading: s.heading, order_index: i, blocks_version: 1, blocks: s.blocks })),
);
if (insErr) throw insErr;
console.log(`Wrote project fields and ${sections.length} sections.`);
