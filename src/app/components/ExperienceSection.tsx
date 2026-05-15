import { Link } from 'react-router';

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
                  AI Systems / AI Infrastructure Intern
                </h3>
                <p className="text-[#08874a] dark:text-[#39FF14] font-medium text-lg">OneSource Cloud</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  AI Data Center &amp; Private AI Service Provider · Richardson, TX
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                <span className="px-3 py-1 text-xs font-medium bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-full">
                  Internship
                </span>
                <span className="text-sm text-[var(--muted-foreground)] mt-1">Summer 2025 – Present</span>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
              AI Systems &amp; Infrastructure
            </p>

            {/* Responsibilities */}
            <ul className="space-y-4 mb-8">
              {[
                'Gained exposure to real-world AI infrastructure environments and learned how large language models are deployed and operated at scale.',
                'Assisted with internal projects related to AI inference testing, deployment workflows, and system performance observation.',
                'Learned about practical considerations in production AI systems, including GPU utilization, inference latency, throughput, and deployment efficiency.',
                'Supported benchmarking and evaluation efforts for different AI models and deployment configurations.',
                'Explored optimization concepts such as lightweight models, quantization, and efficient inference strategies for real-world deployment scenarios.',
                'Participated in industry conferences, including GenAI 2025 and Ai4 2025, helping introduce company services and learning about enterprise AI infrastructure trends.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--muted-foreground)]">
                  <span className="text-[#08874a] dark:text-[#39FF14] mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* View Details Button */}
            <Link
              to="/experience/onesource-cloud"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] border border-[#08874a]/30 dark:border-[#39FF14]/30 rounded-lg text-sm font-medium hover:bg-[#08874a]/20 dark:hover:bg-[#39FF14]/20 hover:border-[#08874a]/60 dark:hover:border-[#39FF14]/60 transition-all duration-300 group"
            >
              View Full Experience
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
