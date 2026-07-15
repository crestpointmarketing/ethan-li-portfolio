import { Outlet, useLocation, Link } from 'react-router';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { logout } from '../lib/adminApi';

/**
 * Layout for everything under /admin. Deliberately NOT nested under
 * RootLayout so it skips the public site's Navbar. Guards every child route
 * except /admin/login behind GET /api/admin/me.
 */
export default function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const status = useAdminAuth();

  if (!isLoginPage && status === 'unauthenticated') {
    // Full navigation (not client-side <Navigate>) so the login page starts
    // from a clean slate and re-checks auth status fresh after logging in.
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    return null;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {!isLoginPage && (
          <nav className="border-b border-[var(--border)] bg-[var(--card)]">
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
              <Link to="/admin" className="font-semibold">
                Ethan Li &mdash; Admin
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link to="/" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  View site
                </Link>
                {status === 'authenticated' && (
                  <button
                    onClick={async () => {
                      await logout();
                      window.location.href = '/admin/login';
                    }}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
            <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center gap-6 text-sm border-t border-[var(--border)]">
              {[
                { to: '/admin', label: 'Projects' },
                { to: '/admin/about', label: 'About' },
                { to: '/admin/experience', label: 'Experience' },
                { to: '/admin/achievements', label: 'Achievements' },
                { to: '/admin/moments', label: 'Moments' },
                { to: '/admin/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    location.pathname === item.to
                      ? 'text-[#08874a] dark:text-[#16A34A] font-medium'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}

        <main className="max-w-[1200px] mx-auto px-6 py-10">
          {isLoginPage ? (
            <Outlet />
          ) : status === 'loading' ? (
            <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}
