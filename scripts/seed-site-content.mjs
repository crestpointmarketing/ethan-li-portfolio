// One-time (safely re-runnable) script that migrates the previously
// hardcoded About/Contact/Experience/Achievements content into the new
// site_content/experiences/achievement_categories tables. Run via:
//   node scripts/seed-site-content.mjs
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in a local .env, and
// supabase/003_site_content.sql already applied.

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

const about = {
  schoolName: 'Highland Park High School',
  location: 'Dallas, TX',
  gradeText: '12th Grade (Fall 2026)',
  yearRange: '2023 - 2027',
  academicFocus: [
    'Computer Science & AI Systems Development',
    'AP Calculus BC — Advanced Mathematics',
    'Multivariable Calculus (12th Grade, planned)',
    'Latin I – IV (Classical Languages)',
  ],
  certifications: [
    { title: 'Full-Stack Web Development Certificate', org: 'UT Austin' },
    { title: 'CS50: Introduction to Computer Science', org: 'Harvard University' },
    { title: 'Introduction to Java (Grade A)', org: 'Johns Hopkins Center for Talented Youth' },
    { title: 'Competitive Programming Practice', org: 'LeetCode, Codeforces (C++, Python)' },
    { title: 'Prompt Engineering Bootcamp', org: 'Udemy' },
  ],
  skills: [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++',
    'React', 'Node.js', 'Express.js', 'LLM Systems',
    'Speech Processing', 'Docker', 'API Design',
    'Dify', 'n8n', 'Prompt Engineering',
  ],
};

const contact = {
  headingLine1: "Let's Build",
  headingAccent: 'Something Great',
  blurb:
    "Interested in collaborating on AI systems, discussing technical projects, or exploring opportunities? I'd love to connect.",
  email: 'Ethanli2009@gmail.com',
  phone: '972-809-7208',
  location: 'Dallas, TX',
  socialLinks: [
    { platform: 'LinkedIn', url: '#' },
    { platform: 'GitHub', url: 'https://github.com/3than777' },
  ],
  footerText: '© 2026 Ethan Li. Building AI systems for real-world impact.',
};

const experience = {
  slug: 'onesource-cloud',
  company: 'OneSource Cloud',
  companyTagline: 'AI Data Center & Private AI Service Provider',
  role: 'AI Systems / AI Infrastructure Intern',
  badgeText: 'Internship',
  period: 'Summer 2025 – Present',
  location: 'Richardson, TX',
  orderIndex: 0,
  published: true,
  summaryHighlights: [
    'Gained exposure to real-world AI infrastructure environments and learned how large language models are deployed and operated at scale.',
    'Assisted with internal projects related to AI inference testing, deployment workflows, and system performance observation.',
    'Learned about practical considerations in production AI systems, including GPU utilization, inference latency, throughput, and deployment efficiency.',
    'Supported benchmarking and evaluation efforts for different AI models and deployment configurations.',
    'Explored optimization concepts such as lightweight models, quantization, and efficient inference strategies for real-world deployment scenarios.',
    'Participated in industry conferences, including GenAI 2025 and Ai4 2025, helping introduce company services and learning about enterprise AI infrastructure trends.',
  ],
  heroStats: [
    { value: 'LLM', label: 'Inference & Deployment' },
    { value: 'GPU', label: 'Utilization & Optimization' },
    { value: '2', label: 'Industry Conferences' },
    { value: 'AI4', label: 'GenAI & Ai4 2025' },
  ],
  overviewParagraphs: [
    'At OneSource Cloud, a Richardson, TX-based AI data center and private AI service provider, I gained direct exposure to real-world AI infrastructure environments and observed how large language models are deployed and operated at scale.',
    'This experience bridged theory and production reality — I moved from academic understanding of AI systems to seeing firsthand the engineering constraints, operational tradeoffs, and business considerations that shape enterprise-grade AI deployment.',
  ],
  responsibilities: [
    {
      title: 'AI Inference Testing & Deployment Workflows',
      body: 'Assisted with internal projects related to AI inference testing, deployment workflows, and system performance observation — gaining hands-on exposure to how production AI pipelines are built and monitored.',
    },
    {
      title: 'Infrastructure & Performance Observation',
      body: 'Learned about practical considerations in production AI systems, including GPU utilization, inference latency, throughput, and deployment efficiency — concepts that are rarely visible outside of real operational environments.',
    },
    {
      title: 'Scalability & Storage Systems',
      body: 'Observed how infrastructure design, storage systems, and deployment conditions can affect AI model performance and scalability, developing intuition for the engineering decisions behind large-scale AI services.',
    },
    {
      title: 'Benchmarking & Model Evaluation',
      body: 'Supported benchmarking and evaluation efforts for different AI models and deployment configurations, contributing to data-driven decision-making around model selection and infrastructure planning.',
    },
    {
      title: 'Optimization Strategies',
      body: 'Explored optimization concepts such as lightweight models, quantization, and efficient inference strategies for real-world deployment scenarios — understanding how to balance model quality with cost and latency constraints.',
    },
    {
      title: 'Industry Conference Participation',
      body: 'Participated in GenAI 2025 and Ai4 2025, helping introduce company services and learning about enterprise AI infrastructure trends and real-world AI deployment challenges from industry leaders.',
    },
    {
      title: 'Cross-Functional Team Collaboration',
      body: 'Worked alongside engineering and business teams to better understand both the technical and operational aspects of scalable AI deployment — gaining perspective on how AI infrastructure decisions connect to business outcomes.',
    },
  ],
  techColumns: [
    {
      heading: 'AI Deployment',
      items: [
        'LLM inference at scale',
        'Deployment workflow design',
        'Model benchmarking & evaluation',
        'Production performance monitoring',
      ],
    },
    {
      heading: 'Infrastructure & Optimization',
      items: [
        'GPU utilization & latency analysis',
        'Model quantization techniques',
        'Lightweight & efficient inference',
        'Storage systems & scalability',
      ],
    },
  ],
  highlights: [
    {
      title: 'GenAI 2025',
      body: 'Represented OneSource Cloud at GenAI 2025, helping introduce company services to attendees and gaining exposure to the latest enterprise AI infrastructure trends and deployment challenges discussed by industry practitioners.',
    },
    {
      title: 'Ai4 2025',
      body: "Attended Ai4 2025, one of the largest enterprise AI conferences, helping showcase OneSource Cloud's private AI and data center services while learning about real-world AI deployment challenges faced by organizations at scale.",
    },
  ],
  takeawayParagraphs: [
    'This internship gave me a ground-level view of what it actually takes to run AI in production — not just the models themselves, but the full stack of infrastructure decisions, operational tradeoffs, and business constraints that shape real-world AI deployment.',
    'Working alongside both engineering and business teams helped me understand that scalable AI is as much an operational challenge as it is a technical one. The exposure to concepts like quantization, efficient inference, and GPU cost optimization has directly informed how I think about building AI systems in my own projects.',
  ],
};

const achievementsMeta = {
  subtitle: 'Recognition in science fairs, academic competitions, leadership, and community service',
  stats: [
    { value: '3', label: 'Major Projects' },
    { value: '1st', label: 'Place Awards' },
    { value: '100+', label: 'Service Hours' },
    { value: 'Gold', label: 'USACO Division' },
  ],
};

const achievementCategories = [
  {
    category: 'Science & Engineering',
    orderIndex: 0,
    awards: [
      { title: 'HPHS SciTech Fair', achievement: '1st Place & Jay Ingram Award', description: 'Top recognition for AI-Powered Speech Therapy Platform' },
      { title: 'Dallas Regional Science & Engineering Fair (DRSEF)', achievement: 'Honorable Mention (Top 4)', description: 'Regional recognition in senior division' },
    ],
  },
  {
    category: 'Academic & Leadership',
    orderIndex: 1,
    awards: [
      { title: 'Scholastic Writing Awards', achievement: 'Regional Silver Key', description: 'Recognition for exceptional writing and communication' },
      { title: 'Youth Board of Governors', achievement: 'President — Computer Science Chapter', description: 'Asian Culture and Education Society USA' },
      { title: 'AI Club & Coding Interest Group', achievement: 'Active Member', description: 'Leadership in student technical organizations' },
    ],
  },
  {
    category: 'Service & Impact',
    orderIndex: 2,
    awards: [
      { title: "President's Volunteer Service Award", achievement: 'Gold', description: 'Recognition for 100+ hours of community service' },
      { title: 'International Service Honor Recognition', achievement: 'Gold Award', description: 'Global recognition for service and leadership' },
    ],
  },
  {
    category: 'Technical Development',
    orderIndex: 3,
    awards: [
      { title: 'Hackathon — Prompt Design & Agentic AI Systems', achievement: 'Participant', description: 'Summer 2025 advanced AI systems development' },
      { title: 'USACO (USA Computing Olympiad)', achievement: 'Gold Division', description: 'Promoted from Silver (perfect score) → Gold — top-tier competitive programming' },
    ],
  },
  {
    category: 'CTY — Johns Hopkins University',
    orderIndex: 4,
    awards: [
      { title: 'Talent Search Qualification', achievement: 'Advanced CTY-Level Verbal · CTY-Level Math · Advanced CTY-Level Math', description: 'Eligible across all three identification levels — gifted program recognition' },
      { title: 'Diagnosis: Be the Doctor (DDOC)', achievement: 'Successful Completion', description: 'Jan 2024 – Mar 2024' },
      { title: 'Biotechnology (BIOT)', achievement: 'Successful Completion', description: 'Jun 2024 – Jul 2024' },
      { title: 'Introduction to Java (IJAQ)', achievement: 'Grade: A', description: 'Nov 2024 – Mar 2025' },
    ],
  },
];

async function main() {
  await supabase.from('site_content').upsert({ key: 'about', data: about }, { onConflict: 'key' });
  console.log('Wrote About content.');

  await supabase.from('site_content').upsert({ key: 'contact', data: contact }, { onConflict: 'key' });
  console.log('Wrote Contact content.');

  await supabase.from('site_content').upsert({ key: 'achievements_meta', data: achievementsMeta }, { onConflict: 'key' });
  console.log('Wrote Achievements meta.');

  const { data: existingExp } = await supabase
    .from('experiences')
    .select('id')
    .eq('slug', experience.slug)
    .maybeSingle();
  const experienceRow = {
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
  if (existingExp) {
    await supabase.from('experiences').update(experienceRow).eq('id', existingExp.id);
    console.log(`Updated experience "${experience.slug}".`);
  } else {
    await supabase.from('experiences').insert(experienceRow);
    console.log(`Created experience "${experience.slug}".`);
  }

  await supabase.from('achievement_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const categoryRows = achievementCategories.map((c) => ({
    category: c.category,
    order_index: c.orderIndex,
    awards: c.awards,
  }));
  const { error: catError } = await supabase.from('achievement_categories').insert(categoryRows);
  if (catError) throw catError;
  console.log(`Wrote ${categoryRows.length} achievement categories.`);

  console.log('Seed complete.');
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
