import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';
import { experienceBaseSchema } from '../../../shared/siteContentSchema.js';
import { experienceInputToRow, experienceRowToExperience, type ExperienceRow } from '../../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) {
      console.error('GET /api/admin/experiences', error);
      return res.status(500).json({ error: 'Failed to load experiences' });
    }
    return res.status(200).json({ experiences: ((data ?? []) as ExperienceRow[]).map(experienceRowToExperience) });
  }

  if (req.method === 'POST') {
    const parsed = experienceBaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid experience data', details: parsed.error.flatten() });
    }

    const { data: inserted, error: insertError } = await supabase
      .from('experiences')
      .insert(experienceInputToRow(parsed.data))
      .select('*')
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(409).json({ error: 'An experience with this slug already exists' });
      }
      console.error('POST /api/admin/experiences', insertError);
      return res.status(500).json({ error: 'Failed to create experience' });
    }

    return res.status(201).json({ experience: experienceRowToExperience(inserted as ExperienceRow) });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
