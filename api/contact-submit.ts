import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { supabase } from './_lib/supabase.js';

const FALLBACK_TO = 'Ethanli2009@gmail.com';
// Resend's shared sender works without domain verification, but only delivers
// to the address that owns the Resend account. Since we notify Ethan's own
// inbox, that's fine. Override with CONTACT_FROM_EMAIL once ethanli.ai is
// verified in Resend (e.g. "Ethan Li Portfolio <contact@ethanli.ai>").
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

const bodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(200),
  message: z.string().trim().min(1, 'Message is required').max(5000),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid submission', details: parsed.error.flatten() });
  }
  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('POST /api/contact-submit: RESEND_API_KEY not configured');
    return res.status(503).json({ error: 'Email service is not configured yet.' });
  }

  // Recipient comes from the site's contact content, falling back to a constant.
  let to = FALLBACK_TO;
  try {
    const { data } = await supabase.from('site_content').select('data').eq('key', 'contact').maybeSingle();
    const configured = (data?.data as { email?: string } | undefined)?.email;
    if (configured) to = configured;
  } catch {
    /* fall back to constant */
  }

  const subject = `Portfolio inquiry from ${name}`;
  const text = `${message}\n\n— ${name} (${email})`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      console.error('POST /api/contact-submit: Resend error', resp.status, detail);
      return res.status(502).json({ error: 'Failed to send message. Please try again later.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('POST /api/contact-submit: send failed', err);
    return res.status(502).json({ error: 'Failed to send message. Please try again later.' });
  }
}
