import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { ProjectCard } from '@shared/projectSchema';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; projects: ProjectCard[] };

export default function ProjectsSection() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/projects')
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          setState({ status: 'error' });
          return;
        }
        const data = await res.json();
        setState({ status: 'ready', projects: data.projects ?? [] });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[var(--secondary)]">
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
            Projects
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
            Production-level AI systems across speech processing, human-AI interaction, and financial reasoning
          </p>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#16A34A] mt-6" />
        </div>

        {state.status === 'loading' && (
          <p className="text-[var(--muted-foreground)]">Loading projects…</p>
        )}

        {state.status === 'error' && (
          <p className="text-[var(--muted-foreground)]">Couldn&apos;t load projects right now — please try again later.</p>
        )}

        {state.status === 'ready' && state.projects.length === 0 && (
          <p className="text-[var(--muted-foreground)]">No published projects yet — check back soon.</p>
        )}

        {state.status === 'ready' && state.projects.length > 0 && (
          <div className="space-y-12">
            {state.projects.map((project) => (
              <div
                key={project.id}
                className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[#08874a]/30 dark:hover:border-[#16A34A]/30 hover:bg-white/[0.07] transition-all duration-500"
              >
                <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-[#08874a] dark:group-hover:text-[#16A34A] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="space-y-1">
                      {project.subtitles.map((subtitle, i) => (
                        <p
                          key={i}
                          className={
                            i === 0
                              ? 'text-[#08874a] dark:text-[#16A34A] font-medium'
                              : 'text-[#08874a]/80 dark:text-[#16A34A]/80 text-sm'
                          }
                        >
                          {subtitle}
                        </p>
                      ))}
                    </div>
                  </div>
                  {project.period && (
                    <span className="text-sm text-[var(--muted-foreground)] whitespace-nowrap">{project.period}</span>
                  )}
                </div>

                <div className="space-y-3">
                  {project.cardHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#16A34A] mt-2 flex-shrink-0" />
                      <p className="text-[var(--muted-foreground)] leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>

                {project.cardTeaser && (
                  <div className="mt-5 px-5 py-4 bg-[#08874a]/10 dark:bg-[#16A34A]/10 border border-[#08874a]/25 dark:border-[#16A34A]/25 rounded-xl">
                    <p className="text-xs font-semibold text-[#08874a] dark:text-[#16A34A] uppercase tracking-wider mb-3">
                      {project.cardTeaser.label}
                    </p>
                    <div className="space-y-3">
                      {project.cardTeaser.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full border border-[#08874a] dark:border-[#16A34A] mt-2 flex-shrink-0" />
                          <p className="text-[var(--muted-foreground)] leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech tags + Action buttons row */}
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] rounded-full border border-[#08874a]/20 dark:border-[#16A34A]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="px-6 py-2.5 bg-[#08874a] dark:bg-[#16A34A] text-white text-sm font-semibold rounded-lg hover:bg-[#0a9d56] dark:hover:bg-[#15803D] transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    {project.paperUrl && (
                      <a
                        href={project.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-semibold text-[#08874a] dark:text-[#16A34A] rounded-lg border border-[#08874a]/30 dark:border-[#16A34A]/30 hover:bg-[#08874a]/10 dark:hover:bg-[#16A34A]/10 transition-all duration-200"
                      >
                        Paper &rarr;
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-medium text-[var(--muted-foreground)] rounded-lg border border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-all duration-200"
                      >
                        GitHub &rarr;
                      </a>
                    )}
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
