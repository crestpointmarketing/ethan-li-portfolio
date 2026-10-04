// One-off (safely re-runnable) script: uploads the Zeitgeist 60s product
// video + a poster frame to Supabase Storage, attaches them as the project's
// demo video (replacing the "coming soon" placeholder), and sets the live-site link.
// Run via: node scripts/add-zeitgeist-demo.mjs
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

const BUCKET = 'project-assets';
const SRC_DIR = 'C:/Users/Vivian/Documents/ChatGPT/Zeitgeist/zeitgeist-app/public/video';
const WEBSITE_URL = 'https://zeitgeiststocks.com';

async function upload(localFile, storagePath, contentType) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, readFileSync(localFile), { contentType, upsert: true });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

const videoUrl = await upload(
  path.join(SRC_DIR, 'zeitgeist-product-intro-en.mp4'),
  'videos/zeitgeist-product-tour.mp4',
  'video/mp4',
);
const posterUrl = await upload(
  path.join(SRC_DIR, 'zeitgeist-product-intro-en-poster.jpg'),
  'posters/zeitgeist-product-tour-poster.jpg',
  'image/jpeg',
);
console.log('Uploaded:', videoUrl, posterUrl);

const { error: videoError } = await supabase
  .from('projects')
  .update({ video: { type: 'file', src: videoUrl, title: 'Zeitgeist Product Tour', posterUrl } })
  .eq('slug', 'zeitgeist');
if (videoError) throw videoError;
console.log('Set demo video on zeitgeist');

const { error: siteError } = await supabase
  .from('projects')
  .update({ website_url: WEBSITE_URL })
  .eq('slug', 'zeitgeist');
if (siteError) {
  console.error('Could not set website_url — run supabase/005_website_url.sql first, then re-run.', siteError.message);
  process.exit(1);
}
console.log('Set website_url on zeitgeist');
