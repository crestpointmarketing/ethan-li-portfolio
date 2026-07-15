import { useEffect, useState } from 'react';
import type { Moment } from '@shared/siteContentSchema';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; moments: Moment[] };

export default function MomentsSection() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/moments')
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          setState({ status: 'error' });
          return;
        }
        const data = await res.json();
        setState({ status: 'ready', moments: data.moments ?? [] });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing published yet — don't show an empty section on the public site.
  if (state.status === 'ready' && state.moments.length === 0) return null;

  return (
    <section id="moments" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Moments
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
            A few glimpses outside the résumé &mdash; volunteering, race weekends, and everyday life.
          </p>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#16A34A] mt-6" />
        </div>

        {state.status === 'loading' && <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>}
        {state.status === 'error' && (
          <p className="text-[var(--muted-foreground)]">Couldn&apos;t load this section right now.</p>
        )}

        {state.status === 'ready' && state.moments.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {state.moments.map((moment) => (
              <figure
                key={moment.id}
                className="group bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[#08874a]/30 dark:hover:border-[#16A34A]/30 transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={moment.imageUrl}
                    alt={moment.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="p-4">
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">{moment.caption}</p>
                  {(moment.tag || moment.momentDate) && (
                    <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
                      {moment.tag && (
                        <span className="px-2.5 py-1 bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] rounded-full border border-[#08874a]/20 dark:border-[#16A34A]/20">
                          {moment.tag}
                        </span>
                      )}
                      {moment.momentDate && <span className="whitespace-nowrap">{moment.momentDate}</span>}
                    </div>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
