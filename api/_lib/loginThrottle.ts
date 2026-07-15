import { supabase } from './supabase.js';

const KEY = 'login_security';
const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_SECONDS = 15 * 60;

type ThrottleState = { failedAttempts: number; lockedUntil: string | null };

/**
 * Serverless functions are stateless across invocations, so login-attempt
 * tracking can't live in memory — it's stored in the same `site_content`
 * table used for About/Contact, keyed by 'login_security'. This is a
 * single global lockout (not per-IP): there is exactly one valid password
 * for this site, so a global lockout is simpler than per-IP tracking and
 * fully closes the "unlimited guesses" gap for the one credential that
 * matters.
 */
async function getState(): Promise<ThrottleState> {
  const { data } = await supabase.from('site_content').select('data').eq('key', KEY).maybeSingle();
  return (data?.data as ThrottleState) ?? { failedAttempts: 0, lockedUntil: null };
}

async function setState(state: ThrottleState): Promise<void> {
  await supabase.from('site_content').upsert({ key: KEY, data: state }, { onConflict: 'key' });
}

/** Returns retry-after seconds if currently locked out, or null if login attempts may proceed. */
export async function checkLoginLockout(): Promise<number | null> {
  const state = await getState();
  if (!state.lockedUntil) return null;
  const remainingMs = new Date(state.lockedUntil).getTime() - Date.now();
  if (remainingMs <= 0) return null;
  return Math.ceil(remainingMs / 1000);
}

export async function recordLoginResult(success: boolean): Promise<void> {
  if (success) {
    await setState({ failedAttempts: 0, lockedUntil: null });
    return;
  }

  const state = await getState();
  const failedAttempts = state.failedAttempts + 1;
  const lockedUntil =
    failedAttempts >= LOCKOUT_THRESHOLD ? new Date(Date.now() + LOCKOUT_SECONDS * 1000).toISOString() : null;
  await setState({ failedAttempts, lockedUntil });
}
