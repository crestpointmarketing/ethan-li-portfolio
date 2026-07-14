import { createHmac, timingSafeEqual } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return secret;
}

function sign(payloadB64: string): string {
  return createHmac('sha256', getSessionSecret()).update(payloadB64).digest('hex');
}

function createSessionCookieValue(): string {
  const payload = { iat: Date.now(), exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${payloadB64}.${sign(payloadB64)}`;
}

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

/**
 * Verifies the signed session cookie. Every failure mode (missing cookie,
 * malformed value, bad signature, expired, corrupt JSON) fails closed and
 * returns false — never throws.
 */
function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const lastDot = cookieValue.lastIndexOf('.');
  if (lastDot === -1) return false;

  const payloadB64 = cookieValue.slice(0, lastDot);
  const sig = cookieValue.slice(lastDot + 1);

  let expectedSig: string;
  try {
    expectedSig = sign(payloadB64);
  } catch {
    return false;
  }

  // Verify the signature before touching JSON.parse at all.
  const sigBuf = Buffer.from(sig, 'hex');
  const expectedBuf = Buffer.from(expectedSig, 'hex');
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    return typeof payload?.exp === 'number' && Date.now() <= payload.exp;
  } catch {
    return false;
  }
}

export function isAuthenticated(req: VercelRequest): boolean {
  const cookies = parseCookies(req.headers.cookie);
  return isValidSession(cookies[COOKIE_NAME]);
}

/** Returns true and lets the caller proceed if authenticated; otherwise sends 401 and returns false. */
export function requireAdmin(req: VercelRequest, res: VercelResponse): boolean {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

function cookieAttributes(): string {
  // Secure requires HTTPS. `vercel dev` serves plain http://localhost, so a
  // Secure-flagged cookie would silently fail to persist locally — only add
  // it on real Vercel deployments (Preview and Production both set VERCEL_ENV).
  const secure = process.env.VERCEL_ENV ? '; Secure' : '';
  return `Path=/; HttpOnly; SameSite=Lax${secure}`;
}

export function setSessionCookie(res: VercelResponse): void {
  const value = createSessionCookieValue();
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${value}; Max-Age=${SESSION_MAX_AGE_SECONDS}; ${cookieAttributes()}`);
}

export function clearSessionCookie(res: VercelResponse): void {
  // Must match the attributes used at login time, or the browser treats it as a different cookie.
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Max-Age=0; ${cookieAttributes()}`);
}

/** Constant-time password check against the ADMIN_PASSWORD env var. */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof candidate !== 'string') return false;
  const candidateBuf = Buffer.from(candidate);
  const expectedBuf = Buffer.from(expected);
  if (candidateBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(candidateBuf, expectedBuf);
}
