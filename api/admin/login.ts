import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setSessionCookie, verifyPassword } from '../_lib/auth.js';
import { checkLoginLockout, recordLoginResult } from '../_lib/loginThrottle.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const retryAfterSeconds = await checkLoginLockout();
  if (retryAfterSeconds !== null) {
    res.setHeader('Retry-After', String(retryAfterSeconds));
    return res.status(429).json({ error: 'Too many failed attempts. Try again later.', retryAfterSeconds });
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const ok = verifyPassword(password);
  await recordLoginResult(ok);

  if (!ok) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  setSessionCookie(res);
  return res.status(200).json({ ok: true });
}
