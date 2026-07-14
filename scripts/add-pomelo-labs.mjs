// One-off (safely re-runnable) script to add the "Pomelo Labs" project,
// authored from PomeloLabs_项目说明书_2026-07 (product overview doc).
// Run via: node scripts/add-pomelo-labs.mjs
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in a local .env (see .env.example).

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
  slug: 'pomelo-labs',
  title: 'Pomelo Labs: AI Marketing Operations Platform',
  subtitles: [
    'AI Marketing Operations System for B2B Growth',
    'From AI search visibility and market research to content production, publishing, and continuous improvement',
  ],
  badges: [
    { text: 'Independent Product', variant: 'accent' },
    { text: '2026 - Now', variant: 'neutral' },
  ],
  period: '2026 - Now',
  cardHighlights: [
    'Built an AI marketing operations system for B2B SMBs — four specialized agents (SEO Lead, Content Writer, Social Manager, Growth Analyst) collaborating on a shared brand context',
    'Pioneered a GEO (Generative Engine Optimization) execution loop: measuring brand visibility across ChatGPT, Claude, Gemini, and Perplexity, then auto-generating content to close visibility gaps',
    'Designed a full closed-loop workflow — Context → Observe → Reason → Execute → Govern → Measure — connecting research, content production, approval, and publishing',
    'Implemented multi-tenant architecture with Supabase Row-Level Security, role-based access control, and audit-logged publishing across LinkedIn, X, Webflow, and WordPress',
    'Shipped a tiered SaaS business model (Starter/Growth/Concierge/Enterprise) on Stripe billing, backed by full CI — lint, TypeScript, unit/API/integration tests, and Playwright E2E regression',
  ],
  cardTeaser: null,
  techTags: ['Next.js 16', 'Supabase', 'Multi-LLM Orchestration', 'DataForSEO / GA4', 'Stripe'],
  githubUrl: null,
  posterUrl: null,
  paperUrl: null,
  orderIndex: 3,
  published: true,
  video: {
    type: 'placeholder',
    message: 'Product walkthrough coming soon',
    subMessage: 'Live workspace demo available at pomelolabs.ai',
  },
  stats: [
    { value: '4', label: 'AI Marketing Agents' },
    { value: '4', label: 'AI Search Engines Tracked' },
    { value: 'Multi-Tenant', label: 'Architecture (org-level RLS)', noWrap: true },
    { value: '$99+/mo', label: 'Starting Price' },
  ],
  sections: [
    {
      heading: 'Product Experience & Core User Journey',
      orderIndex: 0,
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'The core of the Pomelo Labs experience is the **brand workspace**. Instead of starting from a blank prompt, a user first establishes company positioning, audience, brand voice, competitors, and keyword context — the system then continuously reuses that context across every AI agent and workflow.',
          ],
        },
        {
          type: 'steps',
          title: 'Core User Journey',
          items: [
            { marker: '01', title: 'Establish brand context', body: 'Complete onboarding — website, positioning, audience, goals, and competitors — to build a reusable Brand Hub.' },
            { marker: '02', title: 'Get prioritized', body: 'The Dashboard and Weekly Plan surface current GEO, SEO, content queue, and task priorities in one place.' },
            { marker: '03', title: 'Collaborate with the AI team', body: 'Chat with the SEO Lead, Content Writer, Social Manager, and Growth Analyst in Team Chat; agents read connected data and brand context.' },
            { marker: '04', title: 'Research into execution', body: 'Opportunities from competitors, keywords, Search Console, GA4, DataForSEO, and GEO tests convert directly into briefs, articles, or tasks.' },
            { marker: '05', title: 'Review and publish', body: 'Content moves through a queue with Owner/Admin/Editor/Viewer permissions, optional approval, and publishing to LinkedIn, X, Webflow, or WordPress.' },
            { marker: '06', title: 'Measure and improve', body: 'SEO, Links, Technical, and GEO views track performance, competitive shifts, and AI-visibility trends to inform the next cycle.' },
          ],
        },
        {
          type: 'mini_cards',
          title: 'Key Product Modules',
          items: [
            { title: 'Dashboard / Weekly Plan', body: 'Understand current state and decide weekly priorities across GEO, traffic, content, and tasks.' },
            { title: 'AI Agents / Team Chat', body: '4 agents, @-routing, context injection, and shared history for cross-role collaboration.' },
            { title: 'Tasks', body: 'Turn AI suggestions into trackable work — creation, assignment, status, brand ownership.' },
            { title: 'Content', body: 'Generation, imagery, editing, approval, queueing, and multi-channel publishing.' },
            { title: 'Competitors', body: 'Competitor profiles, website-change tracking, crawling, and AI intelligence.' },
            { title: 'Keywords / SEO', body: 'Intent, volume, difficulty, CPC, rankings, and landing-page opportunities.' },
            { title: 'GEO / LLM Visibility', body: 'Multi-model scoring, trends, recommendations, and shareable public reports.' },
            { title: 'Settings / Billing / Team', body: 'Multi-workspace management, RBAC, Stripe, OAuth, and API keys.' },
          ],
        },
      ],
    },
    {
      heading: 'Motivation & Market Need',
      orderIndex: 1,
      blocks: [
        {
          type: 'labeled_bullets',
          title: 'Structural Problems Facing the Target Customer',
          density: 'loose',
          items: [
            { label: 'Expensive marketing talent', body: 'Most SMBs can’t staff strategy, SEO, content, social, and analytics roles at once, and agency fees often exceed what they can absorb.' },
            { label: 'No execution continuity', body: 'Founders and small teams know marketing matters, but daily operations keep crowding out research, writing, publishing, and review time.' },
            { label: 'Fragmented data and tools', body: 'GA4, Search Console, keyword tools, competitor monitoring, CMSs, and AI writing tools each provide a partial view with no unified priority.' },
            { label: 'AI output with no business memory', body: 'A plain ChatGPT conversation relies on the user re-explaining brand, audience, evidence, and goals each time, so output stays generic and doesn’t compound into a process.' },
            { label: 'AI search is a new blind spot', body: 'Prospects now ask AI directly which product to buy, but most SMBs don’t know whether their brand is mentioned, why they’re losing, or what to do about it.' },
          ],
        },
        {
          type: 'prose',
          title: 'Market Opportunity',
          paragraphs: [
            'Pomelo Labs’ value isn’t generating more text — it’s lowering the barrier to professional-grade marketing capability, compressing work that normally spans multiple specialist roles and SaaS subscriptions into one sustained decision-and-execution environment.',
            '**As search shifts from result pages to AI-generated answers, GEO is becoming a new front door for brand discovery and trust.** Pomelo Labs’ angle is helping SMBs not just see that shift, but turn visibility gaps directly into content and tasks.',
          ],
        },
      ],
    },
    {
      heading: 'Core Innovation & Technical Approach',
      orderIndex: 2,
      blocks: [
        {
          type: 'steps',
          title: 'Closed-Loop Marketing Execution Architecture',
          intro: 'The system’s core isn’t any single model — it’s an execution loop built around long-lived brand context.',
          items: [
            { marker: '1', title: 'Context', body: 'Persist company, product, audience, tone, evidence, competitors, keywords, and channel information.' },
            { marker: '2', title: 'Observe', body: 'Connect GA4, Search Console, DataForSEO, PageSpeed, competitor crawls, and multi-model GEO results.' },
            { marker: '3', title: 'Reason', body: 'Each agent analyzes problems within its role, explains priority, and generates recommendations.' },
            { marker: '4', title: 'Execute', body: 'Turn recommendations into tasks, content briefs, articles, social posts, or publishing actions.' },
            { marker: '5', title: 'Govern', body: 'Constrain execution with RBAC, approvals, audit logs, usage controls, and failure handling.' },
            { marker: '6', title: 'Measure', body: 'Track publishing, traffic, rankings, technical performance, competitor shifts, and GEO trends into the next cycle.' },
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Four Key Innovations',
          density: 'loose',
          items: [
            { label: 'GEO measurement and execution, unified', body: 'Not just monitoring AI visibility — generating remediation content and action plans directly from specific prompts and competitive results.' },
            { label: 'Multi-agent division of labor', body: 'SEO, content, social, and growth analysis each own clear task boundaries while sharing organization and brand context.' },
            { label: 'Continuous context and data continuity', body: 'Users never re-explain brand background; historical content, keywords, competitors, tasks, and outcomes form a lasting record.' },
            { label: 'Human-AI collaborative governance', body: 'Approvals, role permissions, manual-publish flags for external CMSs, publishing audits, and recoverable business state fit how real teams work.' },
          ],
        },
        {
          type: 'prose',
          title: 'Security, Reliability & Scalability',
          paragraphs: [
            'The platform uses an organization-level multi-tenant architecture, isolating workspace data by `org_id` and Supabase Row-Level Security. Owner/Admin/Editor/Viewer permissions are enforced consistently across the frontend, API, and database layers. Third-party keys and OAuth tokens are read server-side only; publishing and billing use audited, stable error responses that never leak sensitive information to users or logs.',
            'GitHub CI runs lint, TypeScript, unit/API/integration tests, coverage, Supabase RLS isolation tests, and desktop/mobile Playwright regression on every change, alongside a production build. Vercel handles production deployment and background jobs; Sentry provides live error tracking.',
          ],
        },
      ],
    },
    {
      heading: 'Marketing Domain Knowledge Integration',
      orderIndex: 3,
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'Pomelo Labs’ AI reasoning is built on the actual objects and constraints of marketing work, not generic prompting alone. The system maps the following domain knowledge into its data structures, workflows, and output requirements:',
          ],
        },
        {
          type: 'mini_cards',
          items: [
            { title: 'Brand & Positioning', body: 'Company positioning, audience, products, differentiation, proof points, brand tone, banned phrasing, and CTA rules — kept distinct per brand across multi-brand workspaces.' },
            { title: 'SEO & GEO', body: 'Keyword intent, volume, difficulty, CPC, rankings, landing pages, and Search Console performance, alongside multi-model AI-answer mentions forming a trendable GEO Score.' },
            { title: 'Content Operations', body: 'Long-form, social, newsletter, Reddit, and Hacker News content each follow different structure, tone, length, and CTA rules, with clear draft → queued → approved → published state boundaries.' },
            { title: 'Competitive & Growth Analysis', body: 'Crawls competitor sites, describes positioning shifts, and feeds differentiation signals into strategy — interpreting external data as "why it matters, what to prioritize" rather than raw metrics.' },
          ],
        },
        {
          type: 'prose',
          title: 'Difference from Plain ChatGPT',
          paragraphs: [
            'Pomelo Labs’ distinct value comes from persistent brand memory, real marketing data, executable workflows, approval and publishing capability, and a history of outcomes. The model is only one layer — the product’s value comes from the whole system.',
          ],
        },
      ],
    },
    {
      heading: 'Technical Development & Market Value',
      orderIndex: 4,
      blocks: [
        {
          type: 'tech_columns',
          title: 'Tech Stack',
          columns: [
            { heading: 'Application & Data', items: ['Next.js 16, React 19, TypeScript', 'Supabase Postgres, Auth, RLS'] },
            { heading: 'AI & Marketing Data', items: ['Anthropic, OpenAI, Gemini, Perplexity', 'DataForSEO, GA4, GSC, PageSpeed, Firecrawl'] },
            { heading: 'Operations & Infra', items: ['Stripe, Resend, Sentry', 'Vercel, GitHub Actions, Playwright'] },
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Business Model',
          intro: 'Pomelo Labs tiers by customer scale and service depth rather than unbundling core capability. Starter and Growth are self-serve via Stripe; Concierge and Enterprise are sales-led with custom delivery.',
          density: 'loose',
          items: [
            { label: 'Starter · $99/mo', body: 'Single brand, individual operator — a complete AI marketing team for one company’s ongoing operations.' },
            { label: 'Growth · $299/mo', body: 'Growing teams and small agencies — more brands, seats, competitors, keywords, and content volume.' },
            { label: 'Concierge · $799+/mo', body: 'Teams without marketing headcount that need a co-pilot — Growth capability plus strategy sessions, calibration, and human review.' },
            { label: 'Agency / Enterprise', body: 'Agencies or platform buyers with 5–15+ clients — custom capacity, API, white-label, and service tiers built to need.' },
          ],
        },
        {
          type: 'prose',
          title: 'Market Gap',
          paragraphs: [
            'Jasper/Copy.ai skew toward writing assistance; Semrush/Ahrefs are strong on research but don’t execute; HubSpot excels at CRM and marketing automation but is heavier to deploy and price; GEO-monitoring products can measure AI visibility but typically don’t generate the content that improves the score; traditional agencies deliver results at higher cost and slower turnaround.',
            '**Pomelo Labs’ gap**: at an SMB-affordable price, it connects AI-visibility measurement, marketing research, content production, team approval, publishing, and retesting into one closed loop.',
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Risks Requiring Ongoing Management',
          density: 'loose',
          items: [
            { label: 'AI uncertainty', body: 'Output must show its basis, data freshness, and reasoning; high-risk publishing should keep an approval step.' },
            { label: 'Third-party dependency', body: 'Models, DataForSEO, OAuth, CMS, Stripe, and email providers can fail — needs stable errors, retries, audits, and graceful degradation.' },
            { label: 'Data freshness', body: 'Rankings and GEO results aren’t real-time guarantees; crawl time, coverage, and the meaning of "unranked" need to be shown clearly.' },
            { label: 'Cost control', body: 'Content, imagery, GEO, and competitor intelligence carry different unit costs, requiring usage lines, hard caps, and append-only usage events to protect margin.' },
          ],
        },
      ],
    },
    {
      heading: 'Expected Outcomes & Product Contribution',
      orderIndex: 5,
      blocks: [
        {
          type: 'labeled_bullets',
          title: 'Expected Customer Outcomes',
          density: 'loose',
          items: [
            { label: 'Faster activation', body: 'After completing a brand profile, users get concrete tasks, topics, or GEO gaps in their first session instead of starting from a blank prompt.' },
            { label: 'More consistent execution', body: 'Marketing work shifts from ad-hoc inspiration to a weekly plan, content queue, approval, and publishing cadence.' },
            { label: 'Less tool-switching', body: 'Keywords, competitors, content, publishing, tasks, and results all flow through the same brand context.' },
            { label: 'Clearer outcome explanations', body: 'Users see not just activity counts but traffic, ranking, GEO trends, competitive shifts, and next-step recommendations.' },
            { label: 'Lower expertise barrier', body: 'Small businesses combine software with optional human service to approximate the coverage of a small marketing team.' },
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Product & Industry Contribution',
          density: 'loose',
          items: [
            { label: 'GEO as an operating workflow', body: 'Turns GEO from a standalone monitoring metric into an executable process connecting content, publishing, and retesting.' },
            { label: 'The "AI team" product form', body: 'Organizes marketing work through agent roles and shared context, testing an "AI team" model rather than a single-shot AI assistant.' },
            { label: 'Durable data assets', body: 'Brand data, long-term trends, approval history, and publishing audits build compounding data assets and switching costs.' },
            { label: 'A dual-axis business model', body: 'Software and human service together — Growth provides scale, Concierge provides done-with-you support.' },
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Metrics Being Validated',
          items: [
            { label: 'Activation', body: 'Time-to-first-value and onboarding completion — success means a user gets and acts on one concrete recommendation in their first session.' },
            { label: 'Execution', body: 'Weekly task completion, content approval and publish rates — recommendations should keep converting into real output, not just get read.' },
            { label: 'Value', body: 'GEO/ranking/traffic trends and content contribution — users should be able to connect product activity to observed results.' },
            { label: 'Retention', body: 'Weekly active brands and Weekly Plan return rate — users come back each week to work through new suggestions, alerts, and queues.' },
            { label: 'Business', body: 'Trial→Paid, Starter→Growth, and Concierge conversion — upgrades triggered by brand count, team collaboration, or need for human service.' },
          ],
        },
        {
          type: 'prose',
          variant: 'gradient',
          title: 'Live Product, Continuous Validation',
          paragraphs: [
            'Pomelo Labs is not a hypothetical concept — it’s a shipped, production product with a full CI pipeline (lint, TypeScript, unit/API/integration tests, Supabase RLS isolation tests, desktop and mobile Playwright regression) deployed on Vercel with Sentry error monitoring. The business outcomes described here are working hypotheses being tested against real customer usage, retention, and revenue — not settled claims.',
          ],
        },
      ],
    },
    {
      heading: "What's Already Live",
      orderIndex: 6,
      blocks: [
        {
          type: 'bullets',
          title: 'Shipped',
          items: [
            'Four AI agents, shared Team Chat, brand workspaces, and a task system',
            'Content generation, imagery, editing, approval, publishing queue, and multi-channel connections',
            'SEO, keywords, competitors, technical analysis, GA4/GSC, and multi-model GEO',
            'Team RBAC, multi-tenant RLS, usage controls, audit logs, Stripe subscriptions, and lifecycle email',
            'Unit, API, database, RLS, third-party-failure-simulation, desktop/mobile E2E tests, and CI',
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Current Boundaries',
          density: 'loose',
          items: [
            { label: 'API v1 scope', body: 'Currently focused on content reads and status management; a full cross-workspace generation/publishing API still needs real Enterprise requirements to define it.' },
            { label: 'Agency capabilities', body: 'White-label reporting and deeper agency-platform features aren’t a complete product yet and shouldn’t be sold as fully delivered.' },
            { label: 'Sandbox discipline', body: 'Third-party publishing, payment webhooks, OAuth, and email should keep regressing against dedicated test accounts and sandboxes — automation must never touch real customer data.' },
            { label: 'Unproven at scale', body: 'Business value still needs validation with real customer data, especially the relationship between first-week activation, long-term content quality, GEO improvement, and paid retention.' },
          ],
        },
      ],
    },
    {
      heading: "What's Next — Pomelo Labs Roadmap",
      orderIndex: 7,
      blocks: [
        {
          type: 'next_steps',
          statusLabel: 'In Active Development',
          intro:
            'Pomelo Labs is best suited to B2B SMBs with a clear product and website but no full marketing team, and to small marketing teams managing 2–3 brands. Its sharpest edge isn’t "generating content" — it’s finding where a brand is missing from search and AI answers, and continuously turning that gap into reviewable, publishable, and retestable marketing execution.',
          items: [
            'Strengthen the first moment of value: get users a prioritized action plan based on their own site and competitive landscape within 10 minutes',
            'Turn research directly into execution, further cutting manual hand-off between Competitors, Keywords, GEO, Tasks, and Content',
            'Evolve the Dashboard from activity counts to outcomes, trends, contribution, and recommendations — a real reason to return weekly',
            'Build trust by consistently surfacing data sources, freshness, confidence, failure reasons, and the basis for AI recommendations',
            'Validate Concierge as a repeatable, measurable service — strategy sessions, brand calibration, human review, and monthly reporting',
          ],
        },
      ],
    },
  ],
};

async function main() {
  const { data: existing, error: findError } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', project.slug)
    .maybeSingle();
  if (findError) throw findError;

  const row = {
    slug: project.slug,
    title: project.title,
    subtitles: project.subtitles,
    badges: project.badges,
    period: project.period,
    card_highlights: project.cardHighlights,
    card_teaser: project.cardTeaser,
    tech_tags: project.techTags,
    github_url: project.githubUrl,
    poster_url: project.posterUrl,
    paper_url: project.paperUrl,
    order_index: project.orderIndex,
    published: project.published,
    video: project.video,
    stats: project.stats,
  };

  let projectId;
  if (existing) {
    const { data: updated, error: updateError } = await supabase
      .from('projects')
      .update(row)
      .eq('id', existing.id)
      .select('id')
      .single();
    if (updateError) throw updateError;
    projectId = updated.id;
    console.log(`Updated existing project "${project.slug}" (${projectId})`);
  } else {
    const { data: inserted, error: insertError } = await supabase.from('projects').insert(row).select('id').single();
    if (insertError) throw insertError;
    projectId = inserted.id;
    console.log(`Created project "${project.slug}" (${projectId})`);
  }

  const { error: deleteError } = await supabase.from('project_sections').delete().eq('project_id', projectId);
  if (deleteError) throw deleteError;

  const sectionRows = project.sections.map((s) => ({
    project_id: projectId,
    heading: s.heading,
    order_index: s.orderIndex,
    blocks_version: 1,
    blocks: s.blocks,
  }));
  const { error: insertSectionsError } = await supabase.from('project_sections').insert(sectionRows);
  if (insertSectionsError) throw insertSectionsError;

  console.log(`Wrote ${sectionRows.length} sections.`);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
