import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';
import { projectCreateSchema } from '../../../shared/projectSchema.js';
import {
  projectInputToRow,
  projectRowToProject,
  sectionInputToRow,
  type ProjectRow,
  type SectionRow,
} from '../../_lib/mappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    // Dashboard listing (includes drafts). Sections aren't needed for the
    // table view, so skip that extra round trip per row.
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('GET /api/admin/projects', error);
      return res.status(500).json({ error: 'Failed to load projects' });
    }

    const projects = ((data ?? []) as ProjectRow[]).map((row) => projectRowToProject(row, []));
    return res.status(200).json({ projects });
  }

  if (req.method === 'POST') {
    const parsed = projectCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid project data', details: parsed.error.flatten() });
    }
    const input = parsed.data;

    const { data: inserted, error: insertError } = await supabase
      .from('projects')
      .insert(projectInputToRow(input))
      .select('*')
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(409).json({ error: 'A project with this slug already exists' });
      }
      console.error('POST /api/admin/projects', insertError);
      return res.status(500).json({ error: 'Failed to create project' });
    }

    const sectionRows = input.sections.map((s) => sectionInputToRow(s, inserted.id));
    if (sectionRows.length > 0) {
      const { error: sectionsError } = await supabase.from('project_sections').insert(sectionRows);
      if (sectionsError) {
        console.error('POST /api/admin/projects sections', sectionsError);
        return res.status(500).json({ error: 'Project created but its sections failed to save' });
      }
    }

    const { data: finalSections } = await supabase
      .from('project_sections')
      .select('*')
      .eq('project_id', inserted.id)
      .order('order_index', { ascending: true });

    return res
      .status(201)
      .json({ project: projectRowToProject(inserted as ProjectRow, (finalSections ?? []) as SectionRow[]) });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
