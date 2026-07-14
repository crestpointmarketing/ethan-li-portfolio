import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';
import { experienceBaseSchema } from '../../../shared/siteContentSchema.js';
import { experienceInputToRow, experienceRowToExperience, type ExperienceRow } from '../../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  const id = typeof req.query.id === 'string' ? req.query.id : undefined;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('experiences').select('*').eq('id', id).single();
    if (error || !data) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ experience: experienceRowToExperience(data as ExperienceRow) });
  }

  if (req.method === 'PUT') {
    const parsed = experienceBaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid experience data', details: parsed.error.flatten() });
    }

    const { data: updated, error: updateError } = await supabase
      .from('experiences')
      .update(experienceInputToRow(parsed.data))
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      if (updateError.code === '23505') {
        return res.status(409).json({ error: 'An experience with this slug already exists' });
      }
      console.error('PUT /api/admin/experiences/[id]', updateError);
      return res.status(500).json({ error: 'Failed to update experience' });
    }
    if (!updated) return res.status(404).json({ error: 'Not found' });

    return res.status(200).json({ experience: experienceRowToExperience(updated as ExperienceRow) });
  }

  if (req.method === 'PATCH') {
    // Mirrors projects' PATCH: publish toggle only, never touches the rest of the row.
    const patchSchema = z
      .object({ published: z.boolean() })
      .partial()
      .refine((v) => Object.keys(v).length > 0, 'Empty patch');
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid patch', details: parsed.error.flatten() });
    }

    const { data: updated, error: updateError } = await supabase
      .from('experiences')
      .update(parsed.data)
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      console.error('PATCH /api/admin/experiences/[id]', updateError);
      return res.status(500).json({ error: 'Failed to update experience' });
    }
    if (!updated) return res.status(404).json({ error: 'Not found' });

    return res.status(200).json({ experience: experienceRowToExperience(updated as ExperienceRow) });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) {
      console.error('DELETE /api/admin/experiences/[id]', error);
      return res.status(500).json({ error: 'Failed to delete experience' });
    }
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PUT, PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
