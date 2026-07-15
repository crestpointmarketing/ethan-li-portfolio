import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { requireAdmin } from '../../_lib/auth.js';
import { supabase } from '../../_lib/supabase.js';

const reorderSchema = z.object({ ids: z.array(z.string().uuid()).min(1) });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = reorderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.flatten() });
  }

  const results = await Promise.all(
    parsed.data.ids.map((id, index) => supabase.from('moments').update({ order_index: index }).eq('id', id)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) {
    console.error('POST /api/admin/moments/reorder', failed.error);
    return res.status(500).json({ error: 'Failed to reorder moments' });
  }

  return res.status(200).json({ ok: true });
}
