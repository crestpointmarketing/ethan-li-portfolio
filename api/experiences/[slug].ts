import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { experienceRowToExperience, type ExperienceRow } from '../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('GET /api/experiences/[slug]', error);
    return res.status(500).json({ error: 'Failed to load experience' });
  }
  if (!data) return res.status(404).json({ error: 'Not found' });

  return res.status(200).json({ experience: experienceRowToExperience(data as ExperienceRow) });
}
