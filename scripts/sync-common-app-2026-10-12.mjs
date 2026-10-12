// Align live site content with Ethan's final Common App (2026-10-11 export).
// Every edit asserts its "before" text exists; all checks run before any write.
// Run via: node scripts/sync-common-app-2026-10-12.mjs

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

async function one(table, col, val) {
  const { data, error } = await supabase.from(table).select('*').eq(col, val).single();
  if (error) throw new Error(`${table}.${col}=${val}: ${error.message}`);
  return data;
}

// Replace exactly one occurrence of `from` inside a JSON-serialisable value.
// Fragments starting with `{` or `"` are matched as raw JSON; anything else as plain text.
function swap(value, from, to, where) {
  const raw = /^[{"]/.test(from);
  const enc = (t) => (raw ? t : JSON.stringify(t).slice(1, -1));
  const s = JSON.stringify(value);
  const f = enc(from);
  const n = s.split(f).length - 1;
  if (n !== 1) throw new Error(`${where}: expected 1 match for "${from.slice(0, 60)}", found ${n}`);
  return JSON.parse(s.replace(f, () => enc(to)));
}

const writes = [];
const queue = (label, table, id, patch) => writes.push({ label, table, id, patch });

// ---------- About ----------
const about = await one('site_content', 'key', 'about');
{
  let d = about.data;
  d = swap(d, 'Linear Algebra (12th Grade)', 'Sequences, Series & Multivariable Calculus (UT Austin M408D, 12th Grade)', 'about');
  d = swap(d, 'Latin I – IV (Classical Languages)', 'Latin I – V (Classical Languages)', 'about');
  writes.push({ label: 'about', table: 'site_content', key: 'about', patch: { data: d } });
}

// ---------- Achievements ----------
const meta = await one('site_content', 'key', 'achievements_meta');
writes.push({
  label: 'achievements_meta',
  table: 'site_content',
  key: 'achievements_meta',
  patch: { data: swap(meta.data, '"label":"Major Projects","value":"5"', '"label":"Major Projects","value":"6"', 'meta') },
});

const honors = await one('achievement_categories', 'id', '49f65f02-d663-42ce-b6ca-113d1b29fba4');
{
  let a = honors.awards;
  a = swap(a, 'National Merit / PSAT (NMSQT) Recognition', 'National Merit Scholarship Program', 'honors');
  a = swap(a, '"date":"2025 – 2026","title":"National Merit Scholarship Program","achievement":"Academic Distinction"', '"date":"2026","title":"National Merit Scholarship Program","achievement":"Semifinalist"', 'honors');
  a = swap(a, 'Recognition for PSAT/NMSQT performance (Highland Park ISD).', 'Named a National Merit Semifinalist based on PSAT/NMSQT performance.', 'honors');
  a = swap(a, '"title":"HPHS Sci Tech Fair","achievement":"1st Place — Technology Division"', '"title":"HPHS SciTech Fair","achievement":"1st Place — Technology Division ($3,000 Award)"', 'honors');
  a = swap(a, '"achievement":"3rd Place","description":"Vision-Language-Action (VLA) robot manipulation project', '"achievement":"3rd Place of 20+ Teams","description":"Research Team Leader of a five-person team — Vision-Language-Action (VLA) robot manipulation project', 'honors');
  a.push({
    date: '2026',
    title: 'IEEE BigData 2026 High School Symposium',
    achievement: 'Paper Accepted for Presentation (Sole Author)',
    description: '“SpeakWise: Repair-Ready Child Speech Recognition via Verbatim Evidence Preservation” — presentation December 17, 2026, Phoenix, AZ.',
  });
  queue('achievements: Awards & Honors', 'achievement_categories', honors.id, { awards: a });
}

const leadership = await one('achievement_categories', 'id', 'f9a40634-f1ef-4862-b59a-44505c55170e');
{
  let a = swap(
    leadership.awards,
    '"description":"Asian Culture and Education Society USA"',
    '"description":"Asian Culture and Education Society USA (ACAESUSA) — taught computer-science fundamentals to members and built ActivityHub for event management, volunteer registration, and service-hour tracking."',
    'leadership',
  );
  a.push({
    date: '2024 – Now',
    title: 'Highland Park Youth Toastmasters (HPYT)',
    achievement: 'Member',
    description: "Weekly public-speaking practice; evaluates peers' speeches and delivers constructive feedback on clarity and articulation.",
  });
  queue('achievements: Academic & Leadership', 'achievement_categories', leadership.id, { awards: a });
}

// ---------- Experience: DreamCollege.ai ----------
const dc = await one('experiences', 'slug', 'dreamcollege-ai');
{
  const p = {
    role: 'Lead Developer & Team Leader',
    company_tagline: 'AI-Powered College & Career Readiness Platform',
    summary_highlights: [
      "Led a team of four building the platform's AI college interview and practice module, integrated into the live product used by clients.",
      ...dc.summary_highlights.slice(0, 4).map((h, i) =>
        i === 0 ? swap(h, 'Built backend systems for', 'Built the backend for', 'dc highlight') : h,
      ),
      "Coordinated the team's work end-to-end, from API design through deployment.",
    ],
    hero_stats: swap(dc.hero_stats, '{"label":"Engineering Team","value":"Remote"}', '{"label":"Team Led","value":"4"}', 'dc stats'),
    overview_paragraphs: swap(
      dc.overview_paragraphs,
      'As a backend developer intern, I worked primarily on the platform’s college interview module.',
      'As Lead Developer and team leader, I led a team of four building the platform’s college interview module.',
      'dc overview',
    ),
    responsibilities: swap(
      dc.responsibilities,
      '{"body":"Worked asynchronously with a fully remote engineering team, taking features from design through implementation and deployment.","title":"Remote Team Collaboration"}',
      '{"body":"Led a four-person remote team — dividing work, reviewing progress, and taking features from design through implementation and deployment.","title":"Team Leadership"}',
      'dc resp',
    ),
    takeaway_paragraphs: swap(
      dc.takeaway_paragraphs,
      'Working fully remote on a small team taught me how to take a feature from an initial spec to a deployed API on my own, and how',
      'Leading a small remote team taught me how to take a feature from an initial spec to a deployed API, how to coordinate other people’s work toward it, and how',
      'dc takeaway',
    ),
  };
  if (dc.summary_highlights.length !== 5) throw new Error('dc: unexpected highlight count');
  queue('experience: dreamcollege-ai', 'experiences', dc.id, p);
}

// ---------- Experience: OneSource Cloud ----------
const os = await one('experiences', 'slug', 'onesource-cloud');
{
  const p = {
    role: 'Intern & Assistant Developer',
    company_tagline: 'Texas-Based Private AI Infrastructure Company',
    summary_highlights: [
      "Tested the LLM development platform's model performance and API costs alongside a senior developer.",
      ...swap(
        os.summary_highlights,
        'Participated in industry conferences, including GenAI 2025 and Ai4 2025, helping introduce company services and learning about enterprise AI infrastructure trends.',
        "Marketed the company's B2B compute services at GenAI Week Santa Clara 2025, and attended Ai4 2025 to learn about enterprise AI infrastructure trends.",
        'os highlights',
      ),
    ],
    hero_stats: swap(os.hero_stats, '{"label":"GenAI & Ai4 2025","value":"AI4"}', '{"label":"Model Performance & Cost Testing","value":"API"}', 'os stats'),
    responsibilities: swap(
      swap(
        os.responsibilities,
        'Supported benchmarking and evaluation efforts for different AI models and deployment configurations, contributing',
        "Tested the LLM development platform's model performance and API costs with a senior developer, and supported benchmarking of different models and deployment configurations, contributing",
        'os resp1',
      ),
      'Participated in GenAI 2025 and Ai4 2025, helping introduce company services and learning',
      "Marketed OneSource Cloud's B2B compute services at GenAI Week Santa Clara 2025 and attended Ai4 2025, learning",
      'os resp2',
    ),
    highlights: swap(
      os.highlights,
      '{"body":"Represented OneSource Cloud at GenAI 2025, helping introduce company services to attendees',
      '{"body":"Represented OneSource Cloud at GenAI Week in Santa Clara, marketing its B2B compute services to attendees',
      'os hl',
    ),
  };
  p.highlights = swap(p.highlights, '"title":"GenAI 2025"', '"title":"GenAI Week Santa Clara 2025"', 'os hl title');
  queue('experience: onesource-cloud', 'experiences', os.id, p);
}

// ---------- Experience: UT Austin SPEC ----------
const spec = await one('experiences', 'slug', 'ut-austin-power-electronics');
{
  const p = {
    company: 'UT Austin Semiconductor Power Electronics Center (SPEC)',
    company_tagline: 'Power electronics, battery-cell, and renewable-energy research center at The University of Texas at Austin, led by Dr. Alex Huang',
    role: 'Student Research Assistant',
    badge_text: 'University Research',
    summary_highlights: [
      "Mentored by two graduate students in Dr. Alex Huang's group; built components for next-generation battery cells and tested the output of UT Austin's solar panels.",
      ...spec.summary_highlights,
    ],
    overview_paragraphs: swap(
      spec.overview_paragraphs,
      'This laboratory experience at UT Austin spanned',
      'This research experience at UT Austin’s Semiconductor Power Electronics Center (SPEC), mentored by two graduate students under Dr. Alex Huang, spanned',
      'spec overview',
    ),
  };
  queue('experience: ut-austin-power-electronics', 'experiences', spec.id, p);
}

// ---------- Projects ----------
const projects = {};
for (const slug of ['speakwise', 'pomelo-labs', 'vla-robot-manipulation', 'zeitgeist', 'elocutionist']) {
  projects[slug] = await one('projects', 'slug', slug);
}
async function sectionOf(id) {
  return one('project_sections', 'id', id);
}

// SpeakWise — IEEE BigData 2026 acceptance
{
  const sw = projects.speakwise;
  queue('project: speakwise', 'projects', sw.id, {
    subtitles: ['IEEE BigData 2026 High School Symposium — Paper Accepted (Sole Author)', ...sw.subtitles],
    badges: [sw.badges[0], { text: 'IEEE BigData 2026', variant: 'accent' }, ...sw.badges.slice(1)],
    card_teaser: {
      label: 'Phase 2 — Research Results · IEEE BigData 2026 · Patent Pending',
      items: [
        'Sole-author paper accepted at the IEEE BigData 2026 High School Symposium (Dec 17, Phoenix)',
        ...sw.card_teaser.items,
      ],
    },
  });
  const s = await sectionOf('e3478bf6-0278-4136-ade3-ceb41d6ff146');
  let b = swap(
    s.blocks,
    'That work is now complete through full experiments, statistical testing, and a research paper draft.',
    'That work is now complete through full experiments, statistical testing, and a sole-authored research paper accepted for presentation at the **IEEE BigData 2026 High School Symposium** (December 17, 2026, Phoenix).',
    'sw phase2 prose',
  );
  b = swap(
    b,
    '{"body":"A complete draft — Abstract, Introduction, Related Work, System, Data, Methods, Results, Discussion, Limitations & Ethics, Conclusion/Future Work, and Appendices — with statistical testing (bootstrap and sign tests), error decomposition, and data-governance documentation, now in final competition-ready polish.","label":"Research Paper"}',
    '{"body":"“SpeakWise: Repair-Ready Child Speech Recognition via Verbatim Evidence Preservation” (sole author) — accepted for presentation at the IEEE BigData 2026 High School Symposium, December 17, 2026, Phoenix. Includes statistical testing (bootstrap and sign tests), error decomposition, and data-governance documentation.","label":"Research Paper — IEEE BigData 2026"}',
    'sw paper bullet',
  );
  queue('section: speakwise phase 2', 'project_sections', s.id, { blocks: b });
}

// PomeloLabs — Founder & Lead Developer, 21% → 63%, patent date July 27
{
  const pl = projects['pomelo-labs'];
  queue('project: pomelo-labs', 'projects', pl.id, {
    badges: swap(pl.badges, '"text":"Independent Product"', '"text":"Founder & Lead Developer"', 'pl badges'),
    card_highlights: [
      "Raised a B2B client's AI search discovery rate from 21% to 63% after deployment.",
      ...pl.card_highlights,
    ],
    stats: swap(
      pl.stats,
      '{"label":"Research → Publish Workflow","value":"Closed-Loop"}',
      '{"label":"Client AI Discovery Rate","value":"21% → 63%","noWrap":true}',
      'pl stats',
    ),
  });
  const patent = await sectionOf('a8cd857d-ce58-4d60-a06e-e89c5b7b422c');
  let pb = swap(patent.blocks, 'filed July 26, 2026', 'filed July 27, 2026', 'pl patent prose');
  pb = swap(pb, '"body":"July 26, 2026"', '"body":"July 27, 2026"', 'pl patent field');
  queue('section: pomelo patent', 'project_sections', patent.id, { blocks: pb });

  const outcomes = await sectionOf('d6b02694-5431-48af-a9bb-10dda249f400');
  queue('section: pomelo outcomes', 'project_sections', outcomes.id, {
    blocks: swap(
      outcomes.blocks,
      'The business outcomes described here are working hypotheses being tested against real customer usage, retention, and revenue — not settled claims.',
      "In its first B2B client deployment, the client's AI search discovery rate rose from 21% to 63%. Broader outcomes — retention, revenue, and results across more customers — are still being measured rather than claimed.",
      'pl outcomes',
    ),
  });

  const live = await sectionOf('db76ca67-58b2-40d2-b185-fd5246c060d5');
  queue('section: pomelo live', 'project_sections', live.id, {
    blocks: swap(
      live.blocks,
      '{"body":"Business value still needs validation with real customer data, especially the relationship between first-week activation, long-term content quality, GEO improvement, and paid retention.","label":"Unproven at scale"}',
      '{"body":"Beyond the first client\'s 21% → 63% AI-discovery gain, business value still needs validation across more customers — especially the relationship between first-week activation, long-term content quality, GEO improvement, and paid retention.","label":"Next validation step"}',
      'pl live',
    ),
  });
}

// VLA — Research Team Leader, 3rd of 20+ teams
{
  const v = projects['vla-robot-manipulation'];
  queue('project: vla', 'projects', v.id, {
    subtitles: [...v.subtitles, 'Research Team Leader · 3rd Place of 20+ Teams'],
    badges: [...v.badges, { text: '3rd of 20+ Teams', variant: 'accent' }],
  });
  const team = await sectionOf('d58d9a3c-33d7-495a-a0bc-db108111229a');
  queue('section: vla team', 'project_sections', team.id, {
    blocks: swap(
      team.blocks,
      'A collaborative project with Xincan (Alice) Li, Daniel Zhou, and Yifeng Zhao at UT Dallas STEM Bridge · Intelligent Robotics and Vision Lab (IRVL), advised by Dr. Yu Xiang, Sai Haneesh Allu, and Qifan Zhang.',
      'A five-person team project, led by Ethan as Research Team Leader, with Xincan (Alice) Li, Daniel Zhou, and Yifeng Zhao at UT Dallas STEM Bridge · Intelligent Robotics and Vision Lab (IRVL), advised by Dr. Yu Xiang, Sai Haneesh Allu, and Qifan Zhang. The project placed 3rd of 20+ teams.',
      'vla team',
    ),
  });
}

// Zeitgeist — grades 11–12, continuing; AI Stock Advisor, Founder & Developer
{
  const z = projects.zeitgeist;
  queue('project: zeitgeist', 'projects', z.id, {
    period: '2025 - Now',
    subtitles: ['AI Stock Advisor · Founder & Developer', ...z.subtitles],
    badges: [
      { text: 'Founder & Developer', variant: 'accent' },
      { text: '2025 - Now', variant: 'neutral' },
    ],
    card_highlights: [
      'Built an AI-powered stock advisor with deep-research stock analysis and interactive CFO insight agents',
      'Reached 1,000+ clicks from Google Search (Search Console)',
      ...z.card_highlights.slice(0, 3),
    ],
    stats: swap(z.stats, '{"label":"Containerized Deploy","value":"Docker"}', '{"label":"Google Search Clicks","value":"1,000+"}', 'z stats'),
    order_index: 5,
  });
}

// Elocutionist moves after Expressive/Zeitgeist (not among the Common App activities)
queue('project: elocutionist order', 'projects', projects.elocutionist.id, { order_index: 6 });

// Expressive — new project (Common App activity #3)
const expressive = {
  slug: 'expressive',
  title: 'Expressive — Open-Source Audio Plugin',
  subtitles: ['Velocity-Driven Stereo Panning Effect (VST3 / AU / Standalone) · Independent Developer'],
  badges: [
    { text: 'Open Source', variant: 'accent' },
    { text: '2026 - Now', variant: 'neutral' },
  ],
  period: '2026 - Now',
  card_highlights: [
    'Built an open-source VST3 effects & panning plugin for music producers in C++ with JUCE',
    'Maps each MIDI note’s velocity to a stereo pan position — soft notes drift left, hard notes push right',
    'Smooths pan movement over a few milliseconds and applies an equal-power panning law to avoid clicks',
    '3,400+ downloads from producers and 40+ GitHub stars',
  ],
  card_teaser: null,
  tech_tags: ['C++', 'JUCE', 'VST3', 'Audio DSP', 'MIDI', 'CMake'],
  github_url: 'https://github.com/3than777/Expressive',
  poster_url: null,
  paper_url: null,
  order_index: 4,
  published: true,
  video: null,
  stats: [
    { label: 'Downloads', value: '3,400+' },
    { label: 'GitHub Stars', value: '40+' },
    { label: 'Plugin Formats', value: 'VST3 / AU', noWrap: true },
    { label: 'License', value: 'MIT' },
  ],
};
const expressiveSections = [
  {
    heading: 'Motivation',
    blocks: [
      {
        type: 'prose',
        variant: 'flat',
        paragraphs: [
          'Expressive grew out of my own music production. Most panning is static — a sound sits in one place in the stereo field no matter how it is played. I wanted performance dynamics to move the sound: the harder a note is played, the further it travels across the stereo image, adding depth and intensity to melodies and drums.',
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
        title: 'Velocity-to-Pan Signal Path',
        items: [
          { marker: '1', title: 'Read note velocity', body: 'Each incoming MIDI note-on velocity (0–127) is mapped to a pan position — 0 hard left, 64 center, 127 hard right — with a linear or logarithmic curve.' },
          { marker: '2', title: 'Smooth the movement', body: 'The pan position glides to its new value over a configurable 1–100 ms window, avoiding audible clicks.' },
          { marker: '3', title: 'Apply equal-power panning', body: 'The signal is repositioned with an equal-power panning law, either collapsing to mono first or balancing the existing stereo image.' },
        ],
      },
      {
        type: 'mini_cards',
        variant: 'flat',
        title: 'Controls',
        items: [
          { title: 'Smoothing Time', body: '1–100 ms — how quickly the pan glides to a new position.' },
          { title: 'Pan Width', body: '0–100% — scales the pan range (0% stays centered).' },
          { title: 'Pan Curve', body: 'Linear to logarithmic velocity mapping.' },
          { title: 'Mono Collapse', body: 'Sum to mono then reposition, or balance the existing stereo signal.' },
        ],
      },
    ],
  },
  {
    heading: 'Release & Adoption',
    blocks: [
      {
        type: 'tech_columns',
        variant: 'flat',
        title: 'Tech Stack',
        columns: [
          { heading: 'Audio & Plugin', items: ['C++ with the JUCE framework', 'VST3 / AU / Standalone targets', 'Real-time audio DSP'] },
          { heading: 'Build & Release', items: ['CMake + Ninja builds', 'Prebuilt Windows VST3 and Standalone releases', 'MIT-licensed on GitHub'] },
        ],
      },
      {
        type: 'bullets',
        variant: 'flat',
        title: 'Adoption',
        items: [
          '3,400+ downloads from music producers',
          '40+ stars on GitHub',
          'Standalone build with an on-screen keyboard so anyone can hear the effect without a DAW',
        ],
      },
    ],
  },
];

// ---------- Apply ----------
if (process.env.DRY) {
  console.log(`DRY run: all ${writes.length} checks passed; nothing written.`);
  process.exit(0);
}
console.log(`All checks passed. Applying ${writes.length} updates + 1 new project...`);
for (const w of writes) {
  const q = supabase.from(w.table).update(w.patch);
  const { error } = w.key ? await q.eq('key', w.key) : await q.eq('id', w.id);
  if (error) throw new Error(`${w.label}: ${error.message}`);
  console.log('  updated', w.label);
}

const { data: existing } = await supabase.from('projects').select('id').eq('slug', 'expressive').maybeSingle();
let expressiveId = existing?.id;
if (expressiveId) {
  const { error } = await supabase.from('projects').update(expressive).eq('id', expressiveId);
  if (error) throw error;
} else {
  const { data, error } = await supabase.from('projects').insert(expressive).select('id').single();
  if (error) throw error;
  expressiveId = data.id;
}
await supabase.from('project_sections').delete().eq('project_id', expressiveId);
const { error: secErr } = await supabase.from('project_sections').insert(
  expressiveSections.map((s, i) => ({ project_id: expressiveId, heading: s.heading, order_index: i, blocks_version: 1, blocks: s.blocks })),
);
if (secErr) throw secErr;
console.log('  wrote project: expressive');
console.log('Done.');
