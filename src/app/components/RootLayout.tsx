import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { ThemeProvider } from './ThemeProvider';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Async sections above the anchor can change its position after mounting.
      // Keep it aligned briefly, stopping as soon as the visitor scrolls.
      let tries = 0;
      let timer: ReturnType<typeof setTimeout>;
      const align = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 88,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          });
          return true;
        }
        return false;
      };
      const tick = () => {
        if (!align() && tries++ < 40) timer = setTimeout(tick, 100);
      };
      const observer = new ResizeObserver(() => align());
      const container = document.querySelector('#root > div');
      if (container) observer.observe(container);
      const stop = () => {
        observer.disconnect();
        clearTimeout(timer);
        clearTimeout(settleTimer);
        window.removeEventListener('wheel', stop);
        window.removeEventListener('touchstart', stop);
        window.removeEventListener('keydown', stop);
      };
      const settleTimer = setTimeout(stop, 4000);
      window.addEventListener('wheel', stop, { passive: true });
      window.addEventListener('touchstart', stop, { passive: true });
      window.addEventListener('keydown', stop);
      timer = setTimeout(tick, 80);
      return stop;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden transition-colors duration-300">
        {/* Blue gradient background for dark mode */}
        <div className="fixed inset-0 pointer-events-none dark:opacity-100 opacity-0 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-900/10" />
        </div>

        {/* Noise texture overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

        <ScrollToTop />
        <Navbar />

        <Outlet />
      </div>
    </ThemeProvider>
  );
}
