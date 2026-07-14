import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  // Every route needs these, so fail loudly and immediately rather than
  // letting each handler hit a confusing downstream error.
  throw new Error(
    'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (see .env.example). ' +
      'This key is server-only — never prefix it with VITE_ or expose it to the client.',
  );
}

// Module-scoped: instantiated once per cold start and reused across warm
// invocations of the same serverless function instance, instead of being
// re-created on every request.
export const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
