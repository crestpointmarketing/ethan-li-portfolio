import { useEffect, useState } from 'react';
import type { AboutContent } from '@shared/siteContentSchema';

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; about: AboutContent };

export default function AboutSection() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/about')
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          setState({ status: 'error' });
          return;
        }
        const data = await res.json();
        setState({ status: 'ready', about: data.about });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="about" className="relative py-24 lg:py-32 border-t border-[var(--border)]">
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
            Education
          </h2>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#16A34A]" />
        </div>

        {state.status === 'loading' && <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>}
        {state.status === 'error' && (
          <p className="text-[var(--muted-foreground)]">Couldn&apos;t load this section right now.</p>
        )}

        {state.status === 'ready' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - School */}
            <div className="space-y-8">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{state.about.schoolName}</h3>
                    <p className="text-[var(--muted-foreground)]">{state.about.location}</p>
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)]/70">{state.about.yearRange}</span>
                </div>
                <p className="text-[var(--foreground)]/90 mb-6">{state.about.gradeText}</p>

                {state.about.academicFocus.length > 0 && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-[#08874a] dark:text-[#16A34A] mb-3">Academic Focus</h4>
                      <ul className="space-y-2 text-[var(--muted-foreground)]">
                        {state.about.academicFocus.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#08874a] dark:text-[#16A34A] mt-1">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Certifications */}
            <div className="space-y-8">
              {state.about.certifications.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Certifications & Learning</h3>
                  <div className="space-y-6">
                    {state.about.certifications.map((cert, i) => (
                      <div key={i} className="group hover:bg-[var(--card)] p-4 rounded-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#16A34A] mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium mb-1">{cert.title}</h4>
                            <p className="text-sm text-[var(--muted-foreground)]">{cert.org}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {state.about.skills.length > 0 && (
                <div className="pt-8 border-t border-[var(--border)]">
                  <h4 className="text-lg font-medium mb-4">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {state.about.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs bg-[var(--card)] border border-[var(--border)] rounded-full text-[var(--foreground)]/90 hover:border-[#08874a]/50 dark:hover:border-[#16A34A]/50 hover:text-[#08874a] dark:hover:text-[#16A34A] transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
