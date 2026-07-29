// One-off (safely re-runnable) script that adds the in-depth GEO evaluation
// V1 -> V2/V2.1 -> V3 comparison section to the PomeloLabs project, using the
// new `comparison_table` block. Placed right after the existing
// "GEO Evaluation — Product Evolution & Principles" section.
//
// Idempotent: re-running updates the section's blocks in place and re-derives
// ordering so the section always follows the evolution/principles section.
//
// Run via: node scripts/add-pomelo-geo-version-comparison.mjs

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
const HEADING = 'GEO Evaluation — V1 → V2 → V3, Dimension by Dimension';
const AFTER_HEADING = 'GEO Evaluation — Product Evolution & Principles';

const COLUMNS = [
  'Dimension',
  'V1 — Weighted Visibility',
  'V2 / V2.1 — Auditable, Evidence-Based',
  'V3 — Statistical GEO Optimization',
];

const ROWS = [
  ['Product positioning',
    'One score to quickly judge whether a brand is "visible" in AI.',
    'Separates GEO signals to answer where the brand appears, with what stance, and whether the evidence is sufficient.',
    'A full measurement platform whose optimization gains are repeatable, comparable, predictable, and verifiable.'],
  ['Current status',
    'Legacy version; old results kept for auditing.',
    'Core shipped; the latest V2.1 optimizations are already pushed to the current dev branch.',
    'Patent filing and product roadmap — not yet fully implemented.'],
  ['Test questions',
    '~10 questions (free) / ~30 (full).',
    '12 fixed controlled buyer questions, plus up to 6 custom tracking questions.',
    'A dynamic Query Universe generating large question sets by industry, intent, audience, region, language, and buying stage.'],
  ['AI platforms',
    'Claude, ChatGPT, Gemini, Perplexity.',
    'Same four platforms, currently all configured in grounded / web-connected mode.',
    'Extensible to more models, search interfaces, AI Overviews, regions, and device environments.'],
  ['Core calls per run',
    'Full ≈ 30×4 = 120; up to ≈144 with tracking questions.',
    'Core 12×4 = 48; up to ≈72 with 6 tracking questions.',
    'Scales to thousands of observations (e.g. 120 questions × 5 surfaces × 7 repeats = 4,200) — illustrative, not a default single synchronous run.'],
  ['Question taxonomy',
    'Awareness 10%, Problem 25%, Comparison 25%, Direct 40% (weighted).',
    'Discovery, Competitive Shortlist, Consideration, Citation, and Coverage measured separately.',
    'Finer layers — discovery, recommendation, comparison, trust, citation, stance, position, share, factual accuracy, and more.'],
  ['Final score',
    'A single 0–100 weighted GEO Score.',
    'No single misleading total; shows multiple independent metrics.',
    'Multi-metric dashboards; can also produce a standardized composite index given a baseline and confidence.'],
  ['Most obvious V1 flaw',
    'Writing the brand name into a question could inflate the score just because the model echoed it — "being asked" was mistaken for "discovered."',
    '**Fixed:** brand mentions inside a question no longer count as organic discovery; evaluation also requires classifying positive / mixed / neutral / critical.',
    'Goes further — repeated sampling, control groups, and confidence intervals judge whether change is real.'],
  ['Brand recognition',
    'Name and simple phrase matching.',
    'Handles brand aliases and company suffixes with flexible delimiter matching.',
    'Exact, fuzzy, semantic, and contextual entity resolution, with confidence scores and human review on matches.'],
  ['Answer stance',
    'Mainly "mentioned / not mentioned."',
    'Also classifies positive, mixed, neutral, critical, and unknown.',
    'Further measures narrative quality, recommendation strength, prominence, first-mention position, and Share of Answer.'],
  ['API failure handling',
    'Early results could count a platform failure as a brand miss; later partial fixes left V1 batches inconsistent across history.',
    'success / error / unavailable are clearly separated; failures and un-configured platforms do not count as a brand miss.',
    'Adds a missing-data strategy, staleness flags, confidence intervals, and coverage thresholds on top.'],
  ['Test coverage',
    'No stable, unified coverage-quality reporting.',
    'Explicitly shows valid / expected / failed / unavailable results and how many platforms returned data.',
    'Computes coverage rate, sample size, and statistical power per test layer.'],
  ['Repeated sampling',
    'Usually one call per question / platform.',
    'Still mainly one observation per question / platform, so results are directional only.',
    'Repeats the same test unit many times to measure model randomness and result stability.'],
  ['Time / region / environment control',
    'No formal stratification.',
    'Stores test time, model, retrieval mode, and a context fingerprint, but does not repeat by region / device.',
    'A Condition Vector records time, region, device, language, user agent, model version, search interface, and session isolation.'],
  ['Caching & cost control',
    '6–24h cooldown; daily / monthly quotas.',
    'Company-level results reused for 7 days; re-entering the GEO page within a week shows the first result without triggering new paid API calls.',
    'Scheduled batch sampling within a measurement window; supports budget-aware sampling and async measurement.'],
  ['Historical results',
    'Keeps the latest result and GEO Score trend.',
    'Latest result + immutable run history; trends shown per signal under the same V2 method.',
    'Append-only Evidence Store retaining raw answers, parsed results, conditions, models, and the measurement manifest.'],
  ['Version control',
    'Lacks stable methodology-version boundaries; scores over time could use different questions or models.',
    'Has methodology_version, prompt_version, classifier_version, run_id, and a context fingerprint.',
    'A full Measurement Manifest; a method change automatically creates a baseline break and comparability graph.'],
  ['Recomputing old results',
    'No reliable replay.',
    'Mainly shows the results saved at the time.',
    'Replays historical raw evidence with a new parser while keeping both the "original published value" and the "recomputed value."'],
  ['Citation monitoring',
    'Relies mainly on Perplexity citations; coverage inconsistent across other models.',
    'All four platforms use grounded mode, logging cited URLs and separately tracking owned-domain citation rate.',
    'Folds citation position, source quality, attribution, sentence-level evidence, and fact triples into one evidence structure.'],
  ['Factual accuracy',
    'No formal verification of whether the model’s brand claims are true.',
    'Prompts the model not to fabricate, but does not yet verify each answer against authoritative company sources.',
    'Compares answer facts against an authoritative company knowledge base and computes hallucination / factual-error metrics.'],
  ['Cross-platform comparison',
    'Directly compares mention rates across models.',
    'Shows per-platform coverage and results, but does not normalize for platform difficulty.',
    'Normalizes against each platform’s historical baseline so a naturally brand-friendly platform does not distort conclusions.'],
  ['Confidence intervals',
    'None.',
    'No formal statistical CIs; explicitly labeled as directional conclusions.',
    'Provides confidence intervals and statistical significance for mention rate, stance, citation rate, and change values.'],
  ['Recommendation logic',
    'Generates content suggestions from missed questions; once displayed an estimated score lift.',
    'Recommendations based on measured gaps; distinguishes content to create vs. work the user must complete externally, and explains how to verify.',
    'Ranks by "expected gain × evidence confidence ÷ implementation cost," linking each recommendation to its raw evidence and expected impact.'],
  ['Prediction capability',
    'Mostly heuristic estimates, e.g. "may raise the score by a few points."',
    'Removed unreliable guaranteed-lift claims; currently predicts no definite score.',
    'Trains a Citation-Likelihood Model to estimate the probability a page or piece of content gets cited by different AI platforms.'],
  ['Optimization loop',
    'After creating an article, could not prove the GEO gain came from that article.',
    'Can create tasks, content, and follow-up re-tests, but no rigorous causal attribution.',
    'Registers the specific content change, runs treatment / control groups, and measures true uplift via difference-in-differences.'],
  ['User interface',
    'Emphasizes a single GEO Score, red-x / green-check, weighted stages, and recommended content.',
    'Auto-shows the latest real result, exact test date, per-metric breakdown, platform coverage, evidence answers, brand highlighting, citations, and actionable suggestions.',
    'Adds confidence, sample size, version comparability, change attribution, and prediction explanations on top of the V2 UI.'],
  ['Report credibility',
    'Simple and intuitive, but prone to over-confident conclusions.',
    'More transparent and auditable — suited to customer-facing directional judgments.',
    'Supports enterprise-grade audits, research reports, baseline comparison, and verifiable ROI.'],
  ['Biggest remaining risk',
    'Scores can swing noticeably with brand-term weighting, model failures, and question mix.',
    'Single-sample results are still affected by model randomness; no CIs, fact verification, or cross-platform normalization.',
    'Cost, runtime, and system complexity rise sharply — requires stratified sampling, async runs, and plan-tier controls.'],
  ['What V2.1 borrowed from V3',
    'None.',
    'Per-signal metrics; failures not counted as misses; coverage thresholds; version numbers; run IDs; immutable history; context fingerprint; evidence-based recommendations; 7-day result reuse; real test timestamps.',
    'The full target version.'],
  ['One-line summary',
    '"Give me a GEO score."',
    '"Tell me where the brand actually appears, on what evidence, and what to do next."',
    '"Predict and prove, with statistical evidence, which changes actually improved GEO."'],
];

const blocks = [
  {
    type: 'prose',
    variant: 'flat',
    paragraphs: [
      'The three generations are compared below on a single, consistent basis. **V2 already incorporates the V2.1 improvements borrowed from V3.** V1 is the historical baseline (kept for auditability), V2 / V2.1 is the version best suited to ship and put in front of customers today, and V3 is the patent-stage target.',
    ],
  },
  {
    type: 'comparison_table',
    variant: 'flat',
    columns: COLUMNS,
    rows: ROWS,
  },
  {
    type: 'prose',
    variant: 'gradient',
    title: 'Where Each Version Fits',
    paragraphs: [
      'V1 reads like a marketing scorecard — simple, but its single number is easy to distort. V2 / V2.1 is the version best suited to ship and put in front of customers today: transparent, explainable, and cost-controlled. V3’s core value — repeated sampling, confidence intervals, a prediction model, and causal validation — is best built incrementally rather than launched all at once.',
    ],
  },
];

async function main() {
  const { data: project, error: projErr } = await supabase
    .from('projects')
    .select('id, slug')
    .eq('slug', SLUG)
    .single();
  if (projErr) throw projErr;

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
      .update({ blocks, blocks_version: 1 })
      .eq('id', existing.id);
    if (error) throw error;
    console.log(`Updated "${HEADING}" blocks on [${SLUG}].`);
  } else {
    const { error } = await supabase.from('project_sections').insert({
      project_id: project.id,
      heading: HEADING,
      order_index: 999, // temporary; renumbered below
      blocks_version: 1,
      blocks,
    });
    if (error) throw error;
    console.log(`Inserted "${HEADING}" into [${SLUG}].`);
  }

  // Re-derive ordering: place this section immediately after the evolution/principles section.
  const { data: allSecs, error: allErr } = await supabase
    .from('project_sections')
    .select('id, heading, order_index')
    .eq('project_id', project.id)
    .order('order_index', { ascending: true });
  if (allErr) throw allErr;

  const rest = allSecs.filter((s) => s.heading !== HEADING);
  const self = allSecs.find((s) => s.heading === HEADING);
  const anchorIdx = rest.findIndex((s) => s.heading === AFTER_HEADING);

  const ordered = [...rest];
  if (anchorIdx === -1) ordered.push(self);
  else ordered.splice(anchorIdx + 1, 0, self);

  for (let i = 0; i < ordered.length; i++) {
    if (ordered[i].order_index !== i) {
      const { error } = await supabase.from('project_sections').update({ order_index: i }).eq('id', ordered[i].id);
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
