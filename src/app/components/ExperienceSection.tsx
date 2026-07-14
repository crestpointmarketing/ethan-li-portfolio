import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { ExperienceCard } from '@shared/siteContentSchema';

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; experiences: ExperienceCard[] };

export default function ExperienceSection() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/experiences')
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          setState({ status: 'error' });
          return;
        }
        const data = await res.json();
        setState({ status: 'ready', experiences: data.experiences ?? [] });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="experience" className="relative py-24 lg:py-32 border-t border-[var(--border)]">
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
            Experience
          </h2>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#16A34A]" />
        </div>

        {state.status === 'loading' && <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>}
        {state.status === 'error' && (
          <p className="text-[var(--muted-foreground)]">Couldn&apos;t load this section right now.</p>
        )}
        {state.status === 'ready' && state.experiences.length === 0 && (
          <p className="text-[var(--muted-foreground)]">No experience entries yet.</p>
        )}

        {state.status === 'ready' && state.experiences.length > 0 && (
          <div className="space-y-12">
            {state.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-[#08874a]/30 dark:border-[#16A34A]/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#08874a] dark:bg-[#16A34A]" />

                <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-8 hover:border-[#08874a]/40 dark:hover:border-[#16A34A]/40 transition-all duration-300">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {exp.role}
                      </h3>
                      <p className="text-[#08874a] dark:text-[#16A34A] font-medium text-lg">{exp.company}</p>
                      <p className="text-sm text-[var(--muted-foreground)] mt-1">{exp.location}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                      <span className="px-3 py-1 text-xs font-medium bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] border border-[#08874a]/20 dark:border-[#16A34A]/20 rounded-full">
                        {exp.badgeText}
                      </span>
                      <span className="text-sm text-[var(--muted-foreground)] mt-1">{exp.period}</span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  {exp.summaryHighlights.length > 0 && (
                    <ul className="space-y-4 mb-8">
                      {exp.summaryHighlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[var(--muted-foreground)]">
                          <span className="text-[#08874a] dark:text-[#16A34A] mt-1 flex-shrink-0">&#9657;</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`/experience/${exp.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] border border-[#08874a]/30 dark:border-[#16A34A]/30 rounded-lg text-sm font-medium hover:bg-[#08874a]/20 dark:hover:bg-[#16A34A]/20 hover:border-[#08874a]/60 dark:hover:border-[#16A34A]/60 transition-all duration-300 group"
                  >
                    View Full Experience
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
