import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';
import { momentBaseSchema } from '../../../shared/siteContentSchema.js';
import { momentInputToRow, momentRowToMoment, type MomentRow } from '../../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  const id = typeof req.query.id === 'string' ? req.query.id : undefined;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('moments').select('*').eq('id', id).single();
    if (error || !data) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ moment: momentRowToMoment(data as MomentRow) });
  }

  if (req.method === 'PUT') {
    const parsed = momentBaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid moment data', details: parsed.error.flatten() });
    }

    const { data: updated, error: updateError } = await supabase
      .from('moments')
      .update(momentInputToRow(parsed.data))
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      console.error('PUT /api/admin/moments/[id]', updateError);
      return res.status(500).json({ error: 'Failed to update moment' });
    }
    if (!updated) return res.status(404).json({ error: 'Not found' });

    return res.status(200).json({ moment: momentRowToMoment(updated as MomentRow) });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('moments').delete().eq('id', id);
    if (error) {
      console.error('DELETE /api/admin/moments/[id]', error);
      return res.status(500).json({ error: 'Failed to delete moment' });
    }
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PUT, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
