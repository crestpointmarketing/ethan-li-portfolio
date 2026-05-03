export default function ExperienceSection() {
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
              letterSpacing: '-0.02em'
            }}
          >
            Experience
          </h2>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#39FF14]" />
        </div>

        {/* Internship Entry */}
        <div className="relative pl-8 border-l-2 border-[#08874a]/30 dark:border-[#39FF14]/30">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#08874a] dark:bg-[#39FF14]" />

          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-8 hover:border-[#08874a]/40 dark:hover:border-[#39FF14]/40 transition-all duration-300">

            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h3
                  className="text-2xl font-semibold mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  AI Systems Research Intern
                </h3>
                <p className="text-[#08874a] dark:text-[#39FF14] font-medium text-lg">OneSource Cloud</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  AI Data Center &amp; Private AI Service Provider
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                <span className="px-3 py-1 text-xs font-medium bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-full">
                  Internship
                </span>
                <span className="text-sm text-[var(--muted-foreground)] mt-1">July – August 2025</span>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
              LLM Infrastructure &amp; Optimization
            </p>

            {/* Responsibilities */}
            <ul className="space-y-4">
              {[
                'Investigated performance characteristics of LLM inference across GPU architectures, focusing on efficiency optimization under real-world constraints.',
                'Designed experimental frameworks to evaluate trade-offs between model size, latency, and cost in production-like environments.',
                'Explored system-level considerations for deploying AI models in privacy-constrained settings, including data locality and infrastructure isolation.',
                'Produced structured analyses and reports informing infrastructure design decisions and model deployment strategies.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--muted-foreground)]">
                  <span className="text-[#08874a] dark:text-[#39FF14] mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
