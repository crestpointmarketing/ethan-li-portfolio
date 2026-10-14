// One-off (safely re-runnable): uploads the ActivityHub product tour + poster frame
// to Supabase Storage and attaches them as the project's video.
// Run via: node scripts/add-activityhub-video.mjs <video.mp4> <poster.jpg>

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

const [videoFile, posterFile] = process.argv.slice(2);
if (!videoFile || !posterFile) {
  console.error('Usage: node scripts/add-activityhub-video.mjs <video.mp4> <poster.jpg>');
  process.exit(1);
}
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const BUCKET = 'project-assets';

async function upload(localFile, storagePath, contentType) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, readFileSync(localFile), { contentType, upsert: true });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

const src = await upload(videoFile, 'videos/activityhub-product-tour.mp4', 'video/mp4');
const posterUrl = await upload(posterFile, 'posters/activityhub-product-tour-poster.jpg', 'image/jpeg');
console.log('Uploaded:', src, posterUrl);

const { error } = await supabase
  .from('projects')
  .update({ video: { type: 'file', src, title: 'ActivityHub Product Tour', posterUrl } })
  .eq('slug', 'activityhub');
if (error) throw error;
console.log('Attached video to activityhub.');
