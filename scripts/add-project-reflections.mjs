// One-off (safely re-runnable) script to add a first-person "Reflection"
// section to every project. Each reflection is grounded in that specific
// project's content and written in Ethan's voice, mirroring the takeaway
// paragraphs used on the Experience entries.
//
// Idempotent: if a project already has a section titled "Reflection", its
// blocks are updated in place; otherwise a new section is appended at the end.
//
// Run via: node scripts/add-project-reflections.mjs

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

const HEADING = 'Reflection';

// slug -> array of paragraphs for the reflection prose block.
const reflections = {
  'pomelo-labs': [
    'The biggest thing PomeloLabs taught me is that the value of an AI product lives in the system around the model, not the model itself. Persistent brand context, real marketing data, an approval-and-publishing workflow, and a record of what actually shipped are what turn a chat window into something a business can run on. **The model is only one layer — the product is the whole loop.**',
    'Shipping it as a real multi-tenant SaaS — Row-Level Security isolation, role-based access, Stripe billing, and a full CI and Playwright test suite — gave me a healthy respect for the unglamorous parts of production software. The security, reliable error handling, and testing are exactly what earn a user’s trust. Building GEO as an execution loop instead of a dashboard also changed how I think about metrics: a number only matters if you can act on it.',
    'On the human side, PomeloLabs is really about the small teams behind the dashboards — founders and one-person marketing departments who can’t afford a full specialist staff. Giving them professional-grade capability is a way of leveling the field, and it’s why the product’s commitment to honesty over flattering vanity metrics matters so much: the people relying on it deserve the truth about where they stand, not a number that feels good while their business stays invisible.',
  ],
  speakwise: [
    'Chaining Whisper, an LLM corrector, and XTTS together made error propagation real to me — a small transcription mistake early in the pipeline compounds into a wrong correction downstream, so a multi-stage system is only as strong as the seams between its stages. Designing the correction coefficient (λ) taught me that a good ML product hands humans a control — here, a therapist tuning intervention intensity — rather than just emitting an answer.',
    'Working on real pediatric speech turned accessibility, latency, and naturalness from nice-to-haves into hard engineering constraints. Winning first place and the Jay Ingram Award validated the idea, but it also made the gap between a working pipeline and a deployable clinical tool very clear — ASR instability with children’s voices, HIPAA, low-bandwidth realities — which is exactly what I want Phase 2 to close.',
    'What stayed with me most, though, is human rather than technical. A stutter isn’t only an acoustic pattern — it shapes how someone is heard, how confident they feel, and whether they get a fair chance in a classroom or an interview. Building SpeakWise made me insist that the system respect a person’s own voice and intent instead of mechanically “fixing” them, and that the real point of the technology is dignity and access — especially for children and families who could never afford ongoing one-on-one therapy.',
  ],
  'vla-robot-manipulation': [
    'Running the full loop with the team — calibration, teleoperated data collection, imitation-learning training, and real-robot deployment — showed me that robot learning is mostly a data problem, not just a model problem. The result that stuck with me was a policy hitting 100% success in the environment it was trained on and then collapsing to 20% the moment the lighting and background changed.',
    'Watching combined Table-top + Lightbox training recover 80% success in both environments made generalization concrete: **data diversity, not more compute, closed the gap** — which mattered given the cost trade-off between π0.5 and SmolVLA. The project taught me to design experiments that isolate a single variable, and that building on reproducible, low-cost hardware is what lets other people trust and extend your findings.',
    'Stepping back, the reason robustness across environments matters is ultimately human: these arms are meant to work someday in real homes and workplaces, alongside people and in the mess of everyday conditions, not in a pristine lab. I also came to value the choice of low-cost, reproducible hardware as a small act of fairness in research — it widens who gets to participate in robotics, not just the labs that can afford expensive platforms.',
  ],
  elocutionist: [
    'Because Elocutionist went to production with real users, I learned that "it runs locally" is only the starting line. Real-time human-AI interaction has to feel like talking to a supportive mentor, not being graded by a machine — and that turned out to be as much an interaction-design problem as a backend one.',
    'The hardest and most valuable part was shaping the LLM’s raw evaluation into structured, actionable feedback that a nervous job-seeker can actually use, instead of just a score. Building, deploying, and monitoring a live system taught me about scalability, stakeholder expectations, and the full product lifecycle in a way no class assignment could.',
    'The part I care about most is who this is for. Interview anxiety hits hardest for first-generation and underrepresented candidates who don’t have a network of mentors or the money for professional coaching, and an interview is a moment where a person’s livelihood is on the line. I wanted the AI to feel like a patient mentor that builds someone’s confidence and voice — augmenting human judgment in a high-stakes life moment, never quietly replacing the human on the other side.',
  ],
  zeitgeist: [
    'Zeitgeist started from a question — can an LLM reason in a structured, high-stakes domain like options markets? — and the design decision I’m most proud of is making it reason **under uncertainty**, producing probabilistic assessments with confidence intervals rather than false precision. Grounding it in real financial theory, from Black-Scholes to the Greeks, is what kept it from pattern-matching on surface correlations.',
    'As an independent project, it pushed me to build the whole stack myself — continuous data ingestion from Polygon.io, a low-latency FastAPI and Docker backend, and the reasoning layer on top — and to take model validation, latency, and regulatory limits seriously. The lasting lesson: applying AI to a domain means respecting that domain’s rules as much as the model’s capabilities.',
    'Underneath the Greeks and the volatility surfaces, Zeitgeist is really about a fairness question: institutions hold analytical tools ordinary investors don’t, and that gap has real consequences for people’s savings. That’s also why reasoning under uncertainty is an ethical choice as much as a technical one — in a domain where overconfidence can quietly hurt real people, communicating honest confidence and refusing false precision is a form of respect for the person on the other side of the screen.',
  ],
};

async function main() {
  const { data: projects, error: projErr } = await supabase
    .from('projects')
    .select('id, slug, title');
  if (projErr) throw projErr;

  const bySlug = new Map(projects.map((p) => [p.slug, p]));

  for (const [slug, paragraphs] of Object.entries(reflections)) {
    const project = bySlug.get(slug);
    if (!project) {
      console.warn(`! No project found for slug "${slug}" — skipping.`);
      continue;
    }

    const block = { type: 'prose', variant: 'gradient', paragraphs };

    const { data: sections, error: secErr } = await supabase
      .from('project_sections')
      .select('id, heading, order_index')
      .eq('project_id', project.id)
      .order('order_index', { ascending: true });
    if (secErr) throw secErr;

    const existing = (sections ?? []).find((s) => s.heading === HEADING);

    if (existing) {
      const { error } = await supabase
        .from('project_sections')
        .update({ blocks: [block], blocks_version: 1 })
        .eq('id', existing.id);
      if (error) throw error;
      console.log(`Updated "${HEADING}" section on [${slug}].`);
    } else {
      const maxOrder = (sections ?? []).reduce((m, s) => Math.max(m, s.order_index), -1);
      const { error } = await supabase.from('project_sections').insert({
        project_id: project.id,
        heading: HEADING,
        order_index: maxOrder + 1,
        blocks_version: 1,
        blocks: [block],
      });
      if (error) throw error;
      console.log(`Added "${HEADING}" section to [${slug}] at order_index ${maxOrder + 1}.`);
    }
  }
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
