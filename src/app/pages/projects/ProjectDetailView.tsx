import { Link } from 'react-router';
import type { Project, ProjectRef } from '@shared/projectSchema';
import { BlockRenderer } from '../../components/project-blocks/BlockRenderer';

/**
 * Pure presentational project detail page. Takes fully-formed data as
 * props so it can be driven either by the public API (ProjectDetail.tsx)
 * or by an admin's in-memory draft (the admin "Preview" button), without
 * needing a save round-trip to see how a page will look.
 */
export function ProjectDetailView({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: ProjectRef | null;
  next: ProjectRef | null;
}) {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-16">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] transition-colors duration-300 mb-12 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Poster */}
        {project.posterUrl && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-[var(--border)]">
            <img src={project.posterUrl} alt={`${project.title} poster`} className="w-full h-auto block" />
          </div>
        )}

        {/* Project Header */}
        <div className="mb-16">
          {project.badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {project.badges.map((badge, i) =>
                badge.variant === 'accent' ? (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] text-sm rounded-full border border-[#08874a]/20 dark:border-[#16A34A]/20"
                  >
                    {badge.text}
                  </span>
                ) : (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-[var(--card)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]"
                  >
                    {badge.text}
                  </span>
                ),
              )}
            </div>
          )}

          <h1
            className="text-5xl lg:text-6xl mb-6 leading-tight text-[var(--foreground)]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
          >
            {project.title}
          </h1>

          {project.subtitles.length > 0 && (
            <div className="space-y-2">
              {project.subtitles.map((subtitle, i) => (
                <p
                  key={i}
                  className={i === 0 ? 'text-xl text-[#08874a] dark:text-[#16A34A]' : 'text-lg text-[#08874a]/80 dark:text-[#16A34A]/80'}
                >
                  {subtitle}
                </p>
              ))}
            </div>
          )}

          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#08874a] dark:bg-[#16A34A] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#0a9d56] dark:hover:bg-[#15803D]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Research Paper
            </a>
          )}

          {project.stats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {project.stats.map((stat, i) => (
                <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                  <div className={`text-4xl font-bold text-[#08874a] dark:text-[#16A34A] mb-2${stat.noWrap ? ' whitespace-nowrap' : ''}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Demo Video */}
        {project.video && (
          <div className="mb-16">
            <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
              Project Demo
            </h2>
            {project.video.type === 'embed' ? (
              <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)]" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={project.video.src}
                  title={project.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]"
                style={{ paddingTop: '56.25%' }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                  <span className="w-14 h-14 rounded-full bg-[#08874a]/10 dark:bg-[#16A34A]/10 border border-[#08874a]/30 dark:border-[#16A34A]/30 flex items-center justify-center text-[#08874a] dark:text-[#16A34A]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <p className="text-[var(--foreground)]/90 font-medium">{project.video.message}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{project.video.subMessage}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-16">
          {project.sections.map((section) => (
            <section key={section.id ?? section.heading}>
              <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                {section.heading}
              </h2>
              <div className="space-y-6">
                {section.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous Project
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          )}

          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] transition-colors duration-300 group"
            >
              Next Project
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] transition-colors duration-300 group"
            >
              Back to Home
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
