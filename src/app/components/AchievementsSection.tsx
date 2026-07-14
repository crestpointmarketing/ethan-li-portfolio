import { useEffect, useState } from 'react';
import type { AchievementCategory, AchievementsMeta } from '@shared/siteContentSchema';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; categories: AchievementCategory[]; meta: AchievementsMeta | null };

export default function AchievementsSection() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/achievements')
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          setState({ status: 'error' });
          return;
        }
        const data = await res.json();
        setState({ status: 'ready', categories: data.categories ?? [], meta: data.meta });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="achievements" className="relative py-24 lg:py-32 border-t border-white/5">
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
            Achievements
          </h2>
          {state.status === 'ready' && state.meta && (
            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">{state.meta.subtitle}</p>
          )}
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#16A34A] mt-6" />
        </div>

        {state.status === 'loading' && <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>}
        {state.status === 'error' && (
          <p className="text-[var(--muted-foreground)]">Couldn&apos;t load this section right now.</p>
        )}

        {state.status === 'ready' && (
          <>
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {state.categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 hover:border-[#08874a]/30 dark:hover:border-[#16A34A]/30 transition-all duration-500"
                >
                  <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#16A34A] mb-6">
                    {category.category}
                  </h3>

                  <div className="space-y-6">
                    {category.awards.map((award, i) => (
                      <div key={i} className="group">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#16A34A] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                          <div className="flex-1">
                            <h4 className="font-medium text-[var(--foreground)] mb-1 group-hover:text-[#08874a] dark:group-hover:text-[#16A34A] transition-colors duration-300">
                              {award.title}
                            </h4>
                            <p className="text-sm text-[#08874a]/90 dark:text-[#16A34A]/90 mb-1">{award.achievement}</p>
                            <p className="text-sm text-[var(--muted-foreground)]">{award.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            {state.meta && state.meta.stats.length > 0 && (
              <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
                {state.meta.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#16A34A]/10 to-transparent border border-[#08874a]/20 dark:border-[#16A34A]/20 rounded-xl p-6 text-center"
                  >
                    <div
                      className="text-4xl lg:text-5xl font-bold text-[#08874a] dark:text-[#16A34A] mb-2"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
