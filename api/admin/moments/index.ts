import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';
import { momentBaseSchema } from '../../../shared/siteContentSchema.js';
import { momentInputToRow, momentRowToMoment, type MomentRow } from '../../_lib/siteMappers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('moments').select('*').order('order_index', { ascending: true });
    if (error) {
      console.error('GET /api/admin/moments', error);
      return res.status(500).json({ error: 'Failed to load moments' });
    }
    return res.status(200).json({ moments: ((data ?? []) as MomentRow[]).map(momentRowToMoment) });
  }

  if (req.method === 'POST') {
    const parsed = momentBaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid moment data', details: parsed.error.flatten() });
    }

    const { data: inserted, error: insertError } = await supabase
      .from('moments')
      .insert(momentInputToRow(parsed.data))
      .select('*')
      .single();

    if (insertError) {
      console.error('POST /api/admin/moments', insertError);
      return res.status(500).json({ error: 'Failed to create moment' });
    }

    return res.status(201).json({ moment: momentRowToMoment(inserted as MomentRow) });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
