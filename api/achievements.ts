import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';
import { achievementCategoryRowToCategory, type AchievementCategoryRow } from './_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [categoriesResult, metaResult] = await Promise.all([
    supabase.from('achievement_categories').select('*').order('order_index', { ascending: true }),
    supabase.from('site_content').select('data').eq('key', 'achievements_meta').maybeSingle(),
  ]);

  if (categoriesResult.error) {
    console.error('GET /api/achievements categories', categoriesResult.error);
    return res.status(500).json({ error: 'Failed to load achievements' });
  }
  if (metaResult.error) {
    console.error('GET /api/achievements meta', metaResult.error);
    return res.status(500).json({ error: 'Failed to load achievements' });
  }

  return res.status(200).json({
    categories: ((categoriesResult.data ?? []) as AchievementCategoryRow[]).map(achievementCategoryRowToCategory),
    meta: metaResult.data?.data ?? null,
  });
}
