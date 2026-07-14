import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';
import { achievementCategoryBaseSchema } from '../../../shared/siteContentSchema.js';
import {
  achievementCategoryInputToRow,
  achievementCategoryRowToCategory,
  type AchievementCategoryRow,
} from '../../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  const id = typeof req.query.id === 'string' ? req.query.id : undefined;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('achievement_categories').select('*').eq('id', id).single();
    if (error || !data) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ category: achievementCategoryRowToCategory(data as AchievementCategoryRow) });
  }

  if (req.method === 'PUT') {
    const parsed = achievementCategoryBaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid category data', details: parsed.error.flatten() });
    }

    const { data: updated, error: updateError } = await supabase
      .from('achievement_categories')
      .update(achievementCategoryInputToRow(parsed.data))
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      console.error('PUT /api/admin/achievements/[id]', updateError);
      return res.status(500).json({ error: 'Failed to update category' });
    }
    if (!updated) return res.status(404).json({ error: 'Not found' });

    return res.status(200).json({ category: achievementCategoryRowToCategory(updated as AchievementCategoryRow) });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('achievement_categories').delete().eq('id', id);
    if (error) {
      console.error('DELETE /api/admin/achievements/[id]', error);
      return res.status(500).json({ error: 'Failed to delete category' });
    }
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PUT, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
