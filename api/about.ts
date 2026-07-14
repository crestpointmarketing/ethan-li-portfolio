import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase.from('site_content').select('data').eq('key', 'about').maybeSingle();
  if (error) {
    console.error('GET /api/about', error);
    return res.status(500).json({ error: 'Failed to load content' });
  }
  if (!data) return res.status(404).json({ error: 'Not found' });

  return res.status(200).json({ about: data.data });
}
