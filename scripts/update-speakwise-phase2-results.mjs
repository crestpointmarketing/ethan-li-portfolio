// Phase 2 update (2026-08-31): SpeakWise's Phase 2 ASR research produced
// completed results — replace the "in progress" Phase 2 section and card
// teaser with the actual findings (child-adapted ASR, SPROUT domain
// adaptation, disfluency-preservation metric, paper status), and surface the
// patent on the project card. Idempotent.
// Run via: node scripts/update-speakwise-phase2-results.mjs

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

const SLUG = 'speakwise';
const OLD_HEADING = "What's Next — SpeakWise Phase 2";
const NEW_HEADING = 'Phase 2 — Child-Adapted, Disfluency-Preserving ASR';

const blocks = [
  {
    type: 'prose',
    variant: 'flat',
    paragraphs: [
      '**Phase 1** of SpeakWise — the Whisper → LLM → XTTS pipeline described above — won 1st place at the HPHS SciTech Fair and Honorable Mention at DRSEF in 2026. **Phase 2** set out to replace the third-party ASR dependency with SpeakWise’s own foundation: a speech recognizer adapted to children’s voices that **preserves** — rather than silently smooths over — the stutters, repetitions, and filler words that speech repair needs as input. That work is now complete through full experiments, statistical testing, and a research paper draft.',
    ],
  },
  {
    type: 'labeled_bullets',
    variant: 'gradient',
    title: 'Research Results',
    density: 'loose',
    items: [
      {
        label: 'Child-Speech ASR',
        body: 'Fine-tuned wav2vec 2.0 with character-level CTC on 116 hours of child speech, reaching 21.7% WER (95% CI [21.4%, 22.1%]) on a speaker-disjoint validation set of 434 unseen children.',
      },
      {
        label: 'Ages 5–7',
        body: 'WER reduced from a 110.7% Whisper zero-shot baseline to 27.9%, with substantially fewer hallucinations on short utterances.',
      },
      {
        label: 'Preschool Domain Adaptation',
        body: 'A second-stage adaptation on SPROUT age-4 data (~3.88 hours of quality-controlled speech) cut WER from 79.3% to 69.0% — a 13.1% relative reduction. All 9 held-out children improved, across every assessment task, site, and duration bin; error decomposition shows deletion errors falling sharply, meaning the model shifts from refusing to transcribe toward attempting recognition.',
      },
      {
        label: 'Disfluency Preservation',
        body: 'A new transcription-fidelity / repair-readiness metric beyond WER: the fine-tuned Wav2Vec2-CTC model preserves 69.1% of surface disfluency markers versus 25.7% for Whisper-base — a 2.7× gain that makes preserved stutters, repetitions, and fillers a core contribution of the work.',
      },
      {
        label: 'Research Paper',
        body: 'A complete draft — Abstract, Introduction, Related Work, System, Data, Methods, Results, Discussion, Limitations & Ethics, Conclusion/Future Work, and Appendices — with statistical testing (bootstrap and sign tests), error decomposition, and data-governance documentation, now in final competition-ready polish.',
      },
    ],
  },
  {
    type: 'next_steps',
    variant: 'gradient',
    statusLabel: 'Downstream — Next',
    intro:
      'The paper centers on SpeakWise’s ASR foundation — **child-adapted, disfluency-preserving speech recognition**. The λ-controlled repair stage, identity-preserving voice synthesis, and the full platform are presented as downstream application architecture, to be validated on top of this foundation.',
    items: [
      'Validate λ-controlled speech repair end-to-end on the new child-adapted ASR foundation',
      'Extend evaluation of identity-preserving synthesis with the repaired transcripts',
      'Streaming speech processing and more efficient inference for real-world deployment',
      'Integrate the fine-tuned recognizer into the SpeakWise platform',
    ],
  },
];

const cardTeaser = {
  label: 'Phase 2 — Research Results · Patent Pending',
  items: [
    'Child-adapted ASR (wav2vec 2.0 + CTC, 116 hrs): 21.7% WER on a speaker-disjoint set of 434 unseen children',
    'Ages 5–7: WER cut from a 110.7% Whisper zero-shot baseline to 27.9%',
    'Disfluency preservation raised to 69.1% vs Whisper-base’s 25.7% — a 2.7× gain',
    'U.S. Provisional Patent Application No. 64/139,376 filed Aug 2026 — Inventor: Ethan Li',
  ],
};

async function main() {
  const { data: project, error: projErr } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', SLUG)
    .single();
  if (projErr) throw projErr;

  const { data: sections, error: secErr } = await supabase
    .from('project_sections')
    .select('id, heading')
    .eq('project_id', project.id);
  if (secErr) throw secErr;

  const section = sections.find((s) => s.heading === OLD_HEADING || s.heading === NEW_HEADING);
  if (!section) {
    console.error('Phase 2 section not found. Headings:', sections.map((s) => s.heading));
    process.exit(1);
  }
  const { error: updErr } = await supabase
    .from('project_sections')
    .update({ heading: NEW_HEADING, blocks, blocks_version: 1 })
    .eq('id', section.id);
  if (updErr) throw updErr;
  console.log(`Updated section "${section.heading}" -> "${NEW_HEADING}".`);

  const { error: teaserErr } = await supabase
    .from('projects')
    .update({ card_teaser: cardTeaser })
    .eq('id', project.id);
  if (teaserErr) throw teaserErr;
  console.log('Updated card teaser.');
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
