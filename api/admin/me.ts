import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthenticated } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // Contract: 200 only when authenticated, 401 otherwise — an unambiguous
  // signal for the frontend route guard to key off (never 200 + a boolean).
  if (!isAuthenticated(req)) {
    return res.status(401).json({ authenticated: false });
  }
  return res.status(200).json({ authenticated: true });
}
