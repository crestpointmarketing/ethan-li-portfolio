import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';
import { momentRowToMoment, type MomentRow } from './_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('moments')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('GET /api/moments', error);
    return res.status(500).json({ error: 'Failed to load moments' });
  }

  return res.status(200).json({ moments: ((data ?? []) as MomentRow[]).map(momentRowToMoment) });
}
