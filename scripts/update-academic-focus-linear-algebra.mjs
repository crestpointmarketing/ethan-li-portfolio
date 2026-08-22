// Targeted fix: replace "Multivariable Calculus" with "Linear Algebra" in the
// live About content's academicFocus, without touching any other field.
// Run via: node scripts/update-academic-focus-linear-algebra.mjs

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
  .from('site_content')
  .select('data')
  .eq('key', 'about')
  .single();
if (error) {
  console.error('Failed to read about row:', error);
  process.exit(1);
}

const focus = row.data.academicFocus ?? [];
const idx = focus.findIndex((s) => /multivariable/i.test(s));
if (idx === -1) {
  console.log('No "Multivariable" entry found — nothing to do. Current academicFocus:', focus);
  process.exit(0);
}

console.log('Before:', focus[idx]);
focus[idx] = 'Linear Algebra (12th Grade, planned)';
console.log('After: ', focus[idx]);

const { error: updateError } = await supabase
  .from('site_content')
  .update({ data: { ...row.data, academicFocus: focus } })
  .eq('key', 'about');
if (updateError) {
  console.error('Update failed:', updateError);
  process.exit(1);
}
console.log('Live About content updated.');
