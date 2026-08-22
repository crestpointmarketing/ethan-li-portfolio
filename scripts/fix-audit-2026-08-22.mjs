// Targeted audit fixes (2026-08-22):
// 1. Remove the internal "Patent Center Number" item from the pomelo-labs
//    "U.S. Provisional Patent Filing" block (internal ref — never publish).
// 2. Correct Elocutionist period from "2025 - 2026" to "2024 - 2025"
//    (user-confirmed dates), including the date badge.
// Run via: node scripts/fix-audit-2026-08-22.mjs

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

// --- 1. Strip Patent Center Number from pomelo-labs section blocks ---
const SECTION_ID = 'a8cd857d-ce58-4d60-a06e-e89c5b7b422c';
const { data: section, error: secErr } = await supabase
  .from('project_sections')
  .select('id, heading, blocks')
  .eq('id', SECTION_ID)
  .single();
if (secErr) {
  console.error('Failed to read pomelo section:', secErr);
  process.exit(1);
}
let removed = 0;
const newBlocks = section.blocks.map((b) => {
  if (!Array.isArray(b.items)) return b;
  const items = b.items.filter((it) => {
    const hit = it?.label === 'Patent Center Number' || it?.body === '79336791';
    if (hit) removed++;
    return !hit;
  });
  return { ...b, items };
});
if (removed === 0) {
  console.log('No Patent Center Number item found in section blocks — already clean.');
} else {
  const { error: updErr } = await supabase
    .from('project_sections')
    .update({ blocks: newBlocks })
    .eq('id', SECTION_ID);
  if (updErr) {
    console.error('Failed to update section blocks:', updErr);
    process.exit(1);
  }
  console.log(`Removed ${removed} Patent Center Number item(s) from "${section.heading}".`);
}

// --- 2. Fix Elocutionist dates ---
const { data: elo, error: eloErr } = await supabase
  .from('projects')
  .select('id, period, badges')
  .eq('slug', 'elocutionist')
  .single();
if (eloErr) {
  console.error('Failed to read elocutionist project:', eloErr);
  process.exit(1);
}
console.log('Elocutionist before:', JSON.stringify({ period: elo.period, badges: elo.badges }));
const newPeriod = elo.period.replace(/2025\s*[-–]\s*2026/, '2024 - 2025');
const newBadges = (elo.badges ?? []).map((badge) =>
  typeof badge?.text === 'string'
    ? { ...badge, text: badge.text.replace(/2025\s*[-–]\s*2026/, '2024 - 2025') }
    : badge,
);
const { error: eloUpdErr } = await supabase
  .from('projects')
  .update({ period: newPeriod, badges: newBadges })
  .eq('id', elo.id);
if (eloUpdErr) {
  console.error('Failed to update elocutionist:', eloUpdErr);
  process.exit(1);
}
console.log('Elocutionist after: ', JSON.stringify({ period: newPeriod, badges: newBadges }));
console.log('Done.');
