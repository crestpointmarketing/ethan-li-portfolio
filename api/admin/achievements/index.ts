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

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('achievement_categories')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) {
      console.error('GET /api/admin/achievements', error);
      return res.status(500).json({ error: 'Failed to load achievements' });
    }
    return res
      .status(200)
      .json({ categories: ((data ?? []) as AchievementCategoryRow[]).map(achievementCategoryRowToCategory) });
  }

  if (req.method === 'POST') {
    const parsed = achievementCategoryBaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid category data', details: parsed.error.flatten() });
    }

    const { data: inserted, error: insertError } = await supabase
      .from('achievement_categories')
      .insert(achievementCategoryInputToRow(parsed.data))
      .select('*')
      .single();

    if (insertError) {
      console.error('POST /api/admin/achievements', insertError);
      return res.status(500).json({ error: 'Failed to create category' });
    }

    return res.status(201).json({ category: achievementCategoryRowToCategory(inserted as AchievementCategoryRow) });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
