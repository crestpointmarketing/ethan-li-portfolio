// One-off (safely re-runnable) script to add the "Learning Robot
// Manipulation Using Vision-Language-Action Models" project, authored from
// VLA 项目说明书_2026_07 (UT Dallas STEM Bridge / IRVL project write-up).
// Run via: node scripts/add-vla-robot-manipulation.mjs
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
  slug: 'vla-robot-manipulation',
  title: 'Learning Robot Manipulation Using Vision-Language-Action Models',
  subtitles: [
    'Vision-Language-Action (VLA) Models for Real-World Robot Manipulation',
    'UT Dallas STEM Bridge · Intelligent Robotics and Vision Lab (IRVL)',
  ],
  badges: [
    { text: 'AI & Robotics Research', variant: 'accent' },
    { text: '2026', variant: 'neutral' },
  ],
  period: '2026',
  cardHighlights: [
    'Built a full VLA research pipeline — arm/camera calibration, teleoperated demonstration collection, imitation-learning policy training, and real-robot deployment — on low-cost LeRobot SO-101 leader-follower arms',
    'Collected 75 teleoperated demonstrations across two conditions (50 on a natural tabletop, 25 in a controlled lightbox) to study generalization across lighting and background changes',
    'Trained and evaluated SmolVLA and π0.5 policies via imitation learning across 10 VLARePlica benchmark tasks and multiple train/test environment pairings',
    'Found in-distribution success rates up to 100%, dropping to ~20% when a single-environment policy is deployed in an unseen environment',
    'Showed merging Table-top + Lightbox training data recovered 80% success in both environments, cutting the out-of-distribution performance drop seen with single-environment training',
  ],
  cardTeaser: null,
  techTags: ['LeRobot SO-101', 'Vision-Language-Action (VLA)', 'SmolVLA', 'π0.5', 'Imitation Learning', 'Robot Calibration'],
  githubUrl: null,
  posterUrl: null,
  paperUrl: null,
  orderIndex: 4,
  published: true,
  video: {
    type: 'placeholder',
    message: 'Demo video coming soon',
    subMessage: 'Real-robot execution footage is being edited.',
  },
  stats: [
    { value: '100%', label: 'In-Distribution Success Rate' },
    { value: '~20%', label: 'Cross-Environment Success Rate' },
    { value: '80%', label: 'Success After Merging Environments' },
    { value: '75', label: 'Teleoperated Demonstrations Collected' },
  ],
  sections: [
    {
      heading: 'Motivation & Research Value',
      orderIndex: 0,
      blocks: [
        {
          type: 'prose',
          title: 'Team & Mentorship',
          paragraphs: [
            'A collaborative project with Xincan (Alice) Li, Daniel Zhou, and Yifeng Zhao at UT Dallas STEM Bridge · Intelligent Robotics and Vision Lab (IRVL), advised by Dr. Yu Xiang, Sai Haneesh Allu, and Qifan Zhang.',
          ],
        },
        {
          type: 'prose',
          paragraphs: [
            'Real-world robot manipulation has to hold up under changing lighting, backgrounds, object positions, and camera viewpoints. Traditional robotic systems typically need hand-written rules for every task, while Vision-Language-Action (VLA) models connect visual input, language instructions, and motor control directly — a path toward more general, more transferable robot learning.',
            '**Core research question**: can VLA models replace rule-heavy traditional robotic systems, and hold up when the environment changes?',
          ],
        },
        {
          type: 'prose',
          title: 'Project Value',
          paragraphs: [
            'The project validates VLA policy training and deployment on reproducible, low-cost hardware, and uses controlled-vs-natural environment comparisons to expose how much performance degrades on out-of-distribution data — evidence that informs future data collection, training strategy, and robustness work.',
          ],
        },
      ],
    },
    {
      heading: 'System Setup & Calibration',
      orderIndex: 1,
      blocks: [
        {
          type: 'mini_cards',
          items: [
            {
              title: 'Robot System',
              body: 'Built a SO-101 Leader–Follower dual-arm teleoperation and camera system to support both teleoperated demonstration and real-robot execution.',
            },
            {
              title: 'Controlled Environment (Lightbox)',
              body: 'Collected data inside a lightbox with consistent lighting and background to establish a stable, reproducible baseline.',
            },
            {
              title: 'Variable Environment (Tabletop)',
              body: 'Recorded additional demonstrations under natural lighting and varied tabletop backgrounds to evaluate real-world robustness.',
            },
            {
              title: 'Arm Calibration',
              body: 'Recorded reference positions to fix the physical bounds and zero point of motion, keeping the action space consistent.',
            },
            {
              title: 'Camera Calibration',
              body: 'Aligned the task space using reference images and coordinates so training data and policy execution stay consistent.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Data Collection & Model Training',
      orderIndex: 2,
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'The team used a Leader Arm to drive a Follower Arm, recording task run-throughs from the camera viewpoint. SmolVLA was then trained for roughly 100,000 steps on the collected demonstrations, and the resulting policy was deployed to the real arm for evaluation.',
          ],
        },
        {
          type: 'mini_cards',
          title: 'Demonstration Data by Environment',
          items: [
            {
              title: 'Table-top — 50 demonstrations',
              body: 'Natural lighting, with more variation in background and scene.',
            },
            {
              title: 'Lightbox — 25 demonstrations',
              body: 'Controlled lighting and background, for more consistent conditions.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Experiments & Results',
      orderIndex: 3,
      blocks: [
        {
          type: 'prose',
          paragraphs: [
            'Pretrained π0.5 and SmolVLA policies were evaluated on 10 tasks from the VLARePlica benchmark (5 trials per task, objects positioned via overlay alignment). π0.5 reached a higher success rate but at substantially higher training compute cost, so the team used SmolVLA for further ablation and cross-environment experiments.',
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Benchmark Comparison (Lightbox, VLARePlica)',
          density: 'compact',
          items: [
            { label: 'π0.5', body: '30% success rate — higher accuracy, higher training compute cost.' },
            { label: 'SmolVLA', body: '18% success rate — chosen for further experiments given its lower training cost.' },
          ],
        },
        {
          type: 'prose',
          title: 'Real-Robot Task Example',
          paragraphs: [
            'Task: "Pick the bread and place it on the red plate." Success rate and runtime were measured for every pairing of training environment against execution environment.',
          ],
        },
        {
          type: 'labeled_bullets',
          title: 'Cross-Environment Success Rate',
          density: 'loose',
          items: [
            { label: 'Table-top → Table-top', body: '100% success, 22.29s average runtime' },
            { label: 'Table-top → Lightbox', body: '20% success, 84.95s average runtime' },
            { label: 'Merged → Table-top', body: '80% success, 50.94s average runtime' },
            { label: 'Merged → Lightbox', body: '80% success, 47.62s average runtime' },
            { label: 'Lightbox → Table-top', body: '20% success, 84.95s average runtime' },
            { label: 'Lightbox → Lightbox', body: '100% success, 24.38s average runtime' },
          ],
        },
      ],
    },
    {
      heading: 'Key Findings & Contribution',
      orderIndex: 4,
      blocks: [
        {
          type: 'labeled_bullets',
          density: 'loose',
          items: [
            {
              label: 'In-distribution performance far exceeds cross-environment performance',
              body: 'A policy trained on a single environment reaches 100% success in that same environment, but drops to 20% when moved to a different one.',
            },
            {
              label: 'Merged training data improves generalization',
              body: 'Training on combined Table-top + Lightbox data reached 80% success in both execution environments, clearly outperforming single-environment cross-domain results.',
            },
            {
              label: 'Out-of-distribution data remains the main challenge',
              body: 'Across the three separately-trained policies, success dropped by roughly 80% on average when deployed outside the training environment.',
            },
          ],
        },
        {
          type: 'prose',
          title: 'Project Contribution',
          paragraphs: [
            'Completed a full research loop — hardware setup, calibration, data collection, VLA policy training, and real-robot deployment — and used controlled experiments to quantify how data diversity drives generalization in robot manipulation policies.',
          ],
        },
      ],
    },
    {
      heading: 'Expected Outcomes & Research Value',
      orderIndex: 5,
      blocks: [
        {
          type: 'labeled_bullets',
          density: 'loose',
          items: [
            {
              label: 'Engineering',
              body: 'Established a reproducible, low-cost VLA training-and-evaluation pipeline that can extend to more tasks and environments.',
            },
            {
              label: 'Research',
              body: 'Used controlled experiments to relate environment distribution, data diversity, model cost, and execution success rate.',
            },
            {
              label: 'Practical',
              body: 'Validated that merging multi-environment demonstrations meaningfully improves cross-scene performance — evidence for low-cost robotics in home, lab, or light-industrial settings.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Current Limitations & Next Steps',
      orderIndex: 6,
      blocks: [
        {
          type: 'next_steps',
          statusLabel: 'Prototype-Stage Findings',
          intro:
            "Current results are based on a limited number of tasks and trials per condition, so they're best read as prototype validation rather than a final claim about model generality.",
          items: [
            'Expand task, object, and scene coverage, and add repeated trials for stronger statistical reliability',
            'Introduce more lighting and background perturbation across a wider range of environments',
            'Compare model scale, training cost, inference speed, and success-rate trade-offs across policies',
            'Study whether data augmentation, domain randomization, and richer cross-environment demonstrations reduce the out-of-distribution performance gap',
          ],
        },
        {
          type: 'prose',
          paragraphs: [
            'Source: UT Dallas STEM Bridge / Intelligent Robotics and Vision Lab (IRVL) project poster, "Learning Robot Manipulation Using Vision-Language-Action Models," July 2026.',
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
