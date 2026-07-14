import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
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

  const id = typeof req.query.id === 'string' ? req.query.id : undefined;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (req.method === 'GET') {
    const { data: row, error: rowError } = await supabase.from('projects').select('*').eq('id', id).single();
    if (rowError || !row) return res.status(404).json({ error: 'Not found' });

    const { data: sectionRows, error: sectionsError } = await supabase
      .from('project_sections')
      .select('*')
      .eq('project_id', id)
      .order('order_index', { ascending: true });

    if (sectionsError) {
      console.error('GET /api/admin/projects/[id] sections', sectionsError);
      return res.status(500).json({ error: 'Failed to load project' });
    }

    return res
      .status(200)
      .json({ project: projectRowToProject(row as ProjectRow, (sectionRows ?? []) as SectionRow[]) });
  }

  if (req.method === 'PUT') {
    const parsed = projectCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid project data', details: parsed.error.flatten() });
    }
    const input = parsed.data;

    const { data: updated, error: updateError } = await supabase
      .from('projects')
      .update(projectInputToRow(input))
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      if (updateError.code === '23505') {
        return res.status(409).json({ error: 'A project with this slug already exists' });
      }
      console.error('PUT /api/admin/projects/[id]', updateError);
      return res.status(500).json({ error: 'Failed to update project' });
    }
    if (!updated) return res.status(404).json({ error: 'Not found' });

    // Whole-document replace of this project's sections: delete then reinsert
    // from the submitted payload rather than diffing individual blocks.
    const { error: deleteError } = await supabase.from('project_sections').delete().eq('project_id', id);
    if (deleteError) {
      console.error('PUT /api/admin/projects/[id] delete sections', deleteError);
      return res.status(500).json({ error: 'Project updated but its sections failed to refresh' });
    }

    const sectionRows = input.sections.map((s) => sectionInputToRow(s, id));
    if (sectionRows.length > 0) {
      const { error: insertError } = await supabase.from('project_sections').insert(sectionRows);
      if (insertError) {
        console.error('PUT /api/admin/projects/[id] insert sections', insertError);
        return res.status(500).json({ error: 'Project updated but its sections failed to save' });
      }
    }

    const { data: finalSections } = await supabase
      .from('project_sections')
      .select('*')
      .eq('project_id', id)
      .order('order_index', { ascending: true });

    return res
      .status(200)
      .json({ project: projectRowToProject(updated as ProjectRow, (finalSections ?? []) as SectionRow[]) });
  }

  if (req.method === 'PATCH') {
    // Deliberately separate from PUT: this only ever touches columns on the
    // `projects` row itself (e.g. the dashboard's publish toggle) and never
    // accepts or replaces `sections`, so a partial payload here can never
    // wipe a project's content the way submitting a stale/incomplete object
    // through the full-replace PUT could.
    const patchSchema = z
      .object({ published: z.boolean() })
      .partial()
      .refine((v) => Object.keys(v).length > 0, 'Empty patch');
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid patch', details: parsed.error.flatten() });
    }

    const { data: updated, error: updateError } = await supabase
      .from('projects')
      .update(parsed.data)
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      console.error('PATCH /api/admin/projects/[id]', updateError);
      return res.status(500).json({ error: 'Failed to update project' });
    }
    if (!updated) return res.status(404).json({ error: 'Not found' });

    return res.status(200).json({ project: projectRowToProject(updated as ProjectRow, []) });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      console.error('DELETE /api/admin/projects/[id]', error);
      return res.status(500).json({ error: 'Failed to delete project' });
    }
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PUT, PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
