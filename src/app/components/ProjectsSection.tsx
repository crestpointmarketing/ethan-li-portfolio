import { Link } from 'react-router';

export default function ProjectsSection() {
  const projects = [
    {
      id: 'speakwise',
      github: 'https://github.com/3than777',
      title: 'SpeakWise: AI-Powered Speech Therapy Platform',
      subtitle: 'HPHS Sci Tech Fair — 1st Place & Jay Ingram Award',
      subtitle2: 'DRSEF — Honorable Mention (Top 4)',
      period: '2024 - 2025',
      metrics: [
        { value: '46%', label: 'Fluency Improvement' },
        { value: '95%+', label: 'Stutter Reduction' },
        { value: '<300ms', label: 'Real-Time Latency' },
      ],
      highlights: [
        'Built a multi-stage neural speech repair system achieving 46% fluency improvement and 95%+ stutter reduction',
        'Designed pipeline: Whisper (ASR) → LLM correction → XTTS synthesis with real-time streaming',
        'Introduced a correction coefficient (λ) to control fluency vs. speech naturalness trade-off',
        'Implemented latency-aware architecture and mitigated error propagation across stages',
        'Targeted real-world pediatric speech use, addressing ASR instability and deployment constraints'
      ]
    },
    {
      id: 'eelocutionist',
      github: 'https://github.com/3than777',
      title: 'Eelocutionist — AI Interview Coaching Platform',
      subtitle: 'Internship Project, Deployed Product',
      period: '2024 - 2025',
      highlights: [
        'Built a production-level AI interview system deployed on a live platform, supporting real-time user interactions',
        'Developed backend using Express.js + LLM evaluation, integrating speech APIs',
        'Designed multi-format interview engine (behavioral, technical, case-based)',
        'Implemented performance analytics dashboard with scoring and feedback tracking',
        'Contributed to a scalable AI system focused on human-AI interaction'
      ]
    },
    {
      id: 'zeitgeist',
      github: 'https://github.com/3than777',
      title: 'Zeitgeist — AI System for Financial Reasoning',
      subtitle: 'Independent Project | Real-Time AI System',
      period: '2024 - 2025',
      highlights: [
        'Built a real-time AI system for financial reasoning under uncertainty, analyzing options data and market signals',
        'Designed pipeline integrating Polygon.io APIs with LLM-based interpretation of volatility and Greeks',
        'Developed backend using FastAPI + Docker for scalable, low-latency deployment',
        'Implemented continuous data ingestion and inference pipeline for dynamic market conditions',
        'Explored LLM-based reasoning in structured financial domains'
      ]
    }
  ];

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
              letterSpacing: '-0.02em'
            }}
          >
            Projects
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
            Production-level AI systems across speech processing, human-AI interaction, and financial reasoning
          </p>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#39FF14] mt-6" />
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 lg:p-10 hover:border-[#08874a]/30 dark:hover:border-[#39FF14]/30 hover:bg-white/[0.07] transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-[#08874a] dark:group-hover:text-[#39FF14] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-[#08874a] dark:text-[#39FF14] font-medium">{project.subtitle}</p>
                    {project.subtitle2 && (
                      <p className="text-[#08874a]/80 dark:text-[#39FF14]/80 text-sm">{project.subtitle2}</p>
                    )}
                  </div>
                </div>
                <span className="text-sm text-white/40 whitespace-nowrap">{project.period}</span>
              </div>

              {'metrics' in project && project.metrics && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {(project.metrics as { value: string; label: string }[]).map((m) => (
                    <div key={m.label} className="flex flex-col items-center px-5 py-3 bg-[#08874a]/10 dark:bg-[#39FF14]/10 border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-xl min-w-[90px]">
                      <span className="text-2xl font-bold text-[#08874a] dark:text-[#39FF14] leading-none mb-1">{m.value}</span>
                      <span className="text-xs text-[var(--muted-foreground)] text-center">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <p className="text-[var(--muted-foreground)] leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>

              {/* Tech tags + Action buttons row */}
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {index === 0 && ['Python', 'Whisper ASR', 'LLM', 'XTTS', 'Real-Time Streaming'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] rounded-full border border-[#08874a]/20 dark:border-[#39FF14]/20">
                      {tech}
                    </span>
                  ))}
                  {index === 1 && ['Express.js', 'LLM', 'Speech APIs', 'Real-Time', 'Production'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] rounded-full border border-[#08874a]/20 dark:border-[#39FF14]/20">
                      {tech}
                    </span>
                  ))}
                  {index === 2 && ['FastAPI', 'Docker', 'Polygon.io', 'LLM', 'Financial AI'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] rounded-full border border-[#08874a]/20 dark:border-[#39FF14]/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link
                    to={`/projects/${project.id}`}
                    className="px-6 py-2.5 bg-[#08874a] dark:bg-[#39FF14] text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-[#0a9d56] dark:hover:bg-[#5EFF35] transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 text-sm font-medium text-[var(--muted-foreground)] rounded-lg border border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-all duration-200"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
