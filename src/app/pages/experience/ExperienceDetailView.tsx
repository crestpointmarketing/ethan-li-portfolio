import { Link } from 'react-router';
import type { Experience } from '@shared/siteContentSchema';

/** Pure presentational experience detail page — same split as ProjectDetailView, for the same reason (admin preview reuse). */
export function ExperienceDetailView({ experience }: { experience: Experience }) {
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
          Back to Experience
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] text-sm rounded-full border border-[#08874a]/20 dark:border-[#16A34A]/20">
              {experience.badgeText}
            </span>
            <span className="px-4 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]">
              {experience.period}
            </span>
            <span className="px-4 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]">
              {experience.location}
            </span>
          </div>

          <h1
            className="text-5xl lg:text-6xl mb-4 leading-tight text-[var(--foreground)]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
          >
            {experience.role}
          </h1>
          <p className="text-2xl text-[#08874a] dark:text-[#16A34A] font-medium mb-2">{experience.company}</p>
          <p className="text-lg text-[var(--muted-foreground)]">{experience.companyTagline}</p>

          {experience.heroStats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {experience.heroStats.map((stat, i) => (
                <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#08874a] dark:text-[#16A34A] mb-2">{stat.value}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-16">
          {/* Overview */}
          {experience.overviewParagraphs.length > 0 && (
            <section>
              <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                Overview
              </h2>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
                {experience.overviewParagraphs.map((p, i) => (
                  <p key={i} className="text-[var(--foreground)]/90 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Responsibilities */}
          {experience.responsibilities.length > 0 && (
            <section>
              <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                Key Responsibilities &amp; Contributions
              </h2>
              <div className="space-y-4">
                {experience.responsibilities.map((item, i) => (
                  <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[#08874a]/40 dark:hover:border-[#16A34A]/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <span className="text-[#08874a] dark:text-[#16A34A] mt-0.5 flex-shrink-0 text-lg">&#9657;</span>
                      <div>
                        <h3 className="font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech columns */}
          {experience.techColumns.length > 0 && (
            <section>
              <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                Technical Areas Explored
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experience.techColumns.map((col, i) => (
                  <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#08874a] dark:text-[#16A34A] mb-4">{col.heading}</h3>
                    <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#16A34A] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Highlights (gradient cards) */}
          {experience.highlights.length > 0 && (
            <section>
              <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                Industry Conference Participation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experience.highlights.map((h, i) => (
                  <div key={i} className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#16A34A]/10 to-transparent border border-[#08874a]/30 dark:border-[#16A34A]/30 rounded-xl p-8">
                    <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#16A34A] mb-3">{h.title}</h3>
                    <p className="text-[var(--foreground)]/90 leading-relaxed text-sm">{h.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Takeaways */}
          {experience.takeawayParagraphs.length > 0 && (
            <section>
              <h2 className="text-3xl mb-6 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-8 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                Key Takeaways
              </h2>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
                {experience.takeawayParagraphs.map((p, i) => (
                  <p key={i} className="text-[var(--foreground)]/90 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
