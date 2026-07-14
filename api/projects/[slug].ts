import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { projectRowToProject, type ProjectRow, type SectionRow } from '../_lib/mappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  // Fetch the ordered list of published slugs first so prev/next can be
  // computed from order_index without ever exposing a draft's slug.
  const { data: allRows, error: listError } = await supabase
    .from('projects')
    .select('id, slug, title, order_index')
    .eq('published', true)
    .order('order_index', { ascending: true });

  if (listError) {
    console.error('GET /api/projects/[slug] list', listError);
    return res.status(500).json({ error: 'Failed to load project' });
  }

  const list = allRows ?? [];
  const index = list.findIndex((r) => r.slug === slug);
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  const { data: row, error: rowError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', list[index].id)
    .single();

  if (rowError || !row) {
    console.error('GET /api/projects/[slug] row', rowError);
    return res.status(500).json({ error: 'Failed to load project' });
  }

  const { data: sectionRows, error: sectionsError } = await supabase
    .from('project_sections')
    .select('*')
    .eq('project_id', row.id)
    .order('order_index', { ascending: true });

  if (sectionsError) {
    console.error('GET /api/projects/[slug] sections', sectionsError);
    return res.status(500).json({ error: 'Failed to load project' });
  }

  const project = projectRowToProject(row as ProjectRow, (sectionRows ?? []) as SectionRow[]);
  const prev = index > 0 ? { slug: list[index - 1].slug, title: list[index - 1].title } : null;
  const next = index < list.length - 1 ? { slug: list[index + 1].slug, title: list[index + 1].title } : null;

  return res.status(200).json({ project, prev, next });
}
