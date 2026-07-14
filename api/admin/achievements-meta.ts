import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/auth.js';
import { supabase } from '../_lib/supabase.js';
import { achievementsMetaSchema } from '../../shared/siteContentSchema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('key', 'achievements_meta')
      .maybeSingle();
    if (error) {
      console.error('GET /api/admin/achievements-meta', error);
      return res.status(500).json({ error: 'Failed to load content' });
    }
    return res.status(200).json({ meta: data?.data ?? null });
  }

  if (req.method === 'PUT') {
    const parsed = achievementsMetaSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid content', details: parsed.error.flatten() });
    }
    const { error } = await supabase
      .from('site_content')
      .upsert({ key: 'achievements_meta', data: parsed.data }, { onConflict: 'key' });
    if (error) {
      console.error('PUT /api/admin/achievements-meta', error);
      return res.status(500).json({ error: 'Failed to save content' });
    }
    return res.status(200).json({ meta: parsed.data });
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
