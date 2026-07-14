import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { experienceRowToCard, type ExperienceRow } from '../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('GET /api/experiences', error);
    return res.status(500).json({ error: 'Failed to load experiences' });
  }

  return res.status(200).json({ experiences: ((data ?? []) as ExperienceRow[]).map(experienceRowToCard) });
}
