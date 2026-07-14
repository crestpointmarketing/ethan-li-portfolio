import { useEffect, useState } from 'react';

export type AdminAuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

/** Wraps GET /api/admin/me — 200 means authenticated, 401 means not (see api/admin/me.ts). */
export function useAdminAuth(): AdminAuthStatus {
  const [status, setStatus] = useState<AdminAuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/me')
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? 'authenticated' : 'unauthenticated');
      })
      .catch(() => {
        if (!cancelled) setStatus('unauthenticated');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
