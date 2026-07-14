import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { projectRowToCard, type ProjectRow } from '../_lib/mappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('GET /api/projects', error);
    return res.status(500).json({ error: 'Failed to load projects' });
  }

  return res.status(200).json({ projects: ((data ?? []) as ProjectRow[]).map(projectRowToCard) });
}
