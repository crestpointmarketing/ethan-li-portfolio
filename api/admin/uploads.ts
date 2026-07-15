import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { requireAdmin } from '../_lib/auth.js';
import { supabase } from '../_lib/supabase.js';

const BUCKET = 'project-assets';

const uploadRequestSchema = z.object({
  kind: z.enum(['poster', 'paper', 'moment']),
  fileName: z.string().min(1),
  contentType: z.string().min(1),
});

const ALLOWED_CONTENT_TYPES: Record<'poster' | 'paper' | 'moment', RegExp> = {
  poster: /^image\//,
  paper: /^application\/pdf$/,
  moment: /^image\//,
};

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100);
}

/**
 * Returns a signed Supabase Storage upload URL the admin's browser can PUT
 * the file to directly — the file bytes never pass through this function
 * (Vercel serverless functions have a request body size limit well under
 * what a poster image or PDF paper needs), and the service role key never
 * reaches the client.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = uploadRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() });
  }
  const { kind, fileName, contentType } = parsed.data;

  if (!ALLOWED_CONTENT_TYPES[kind].test(contentType)) {
    return res.status(400).json({
      error: kind === 'paper' ? 'Paper must be a PDF file' : 'File must be an image',
    });
  }

  const path = `${kind}s/${randomUUID()}-${sanitizeFileName(fileName)}`;

  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    console.error('POST /api/admin/uploads', error);
    return res.status(500).json({ error: 'Failed to prepare upload' });
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return res.status(200).json({
    signedUrl: data.signedUrl,
    token: data.token,
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  });
}
