// Positioning fix (2026-08-22): PomeloLabs is presented as an AI-powered
// marketing PLATFORM (the "AI marketing team" is its in-product agent
// experience, not the positioning line). Updates the live subtitle only.
// Run via: node scripts/fix-pomelo-platform-subtitle.mjs

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

const { data: row, error } = await supabase
  .from('projects')
  .select('id, subtitles')
  .eq('slug', 'pomelo-labs')
  .single();
if (error) {
  console.error('Failed to read pomelo-labs:', error);
  process.exit(1);
}
console.log('Before:', row.subtitles);
const subtitles = row.subtitles.map((s) =>
  s === 'AI Marketing Team for B2B Growth' ? 'AI-Powered Marketing Platform for B2B Growth' : s,
);
if (JSON.stringify(subtitles) === JSON.stringify(row.subtitles)) {
  console.log('No matching subtitle found — nothing to do.');
  process.exit(0);
}
const { error: updErr } = await supabase.from('projects').update({ subtitles }).eq('id', row.id);
if (updErr) {
  console.error('Update failed:', updErr);
  process.exit(1);
}
console.log('After: ', subtitles);
console.log('Done.');
