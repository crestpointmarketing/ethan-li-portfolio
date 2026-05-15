import { Link } from 'react-router';

export default function OneSoureCloudDetail() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-16">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300 mb-12 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Experience
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] text-sm rounded-full border border-[#08874a]/20 dark:border-[#39FF14]/20">
              Internship
            </span>
            <span className="px-4 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]">
              Summer 2025 – Present
            </span>
            <span className="px-4 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]">
              Richardson, TX
            </span>
          </div>

          <h1
            className="text-5xl lg:text-6xl mb-4 leading-tight text-[var(--foreground)]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
          >
            AI Systems / AI Infrastructure Intern
          </h1>
          <p className="text-2xl text-[#08874a] dark:text-[#39FF14] font-medium mb-2">OneSource Cloud</p>
          <p className="text-lg text-[var(--muted-foreground)]">AI Data Center &amp; Private AI Service Provider</p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-3xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">LLM</div>
              <div className="text-sm text-[var(--muted-foreground)]">Inference &amp; Deployment</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-3xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">GPU</div>
              <div className="text-sm text-[var(--muted-foreground)]">Utilization &amp; Optimization</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-3xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">2</div>
              <div className="text-sm text-[var(--muted-foreground)]">Industry Conferences</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-3xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">AI4</div>
              <div className="text-sm text-[var(--muted-foreground)]">GenAI &amp; Ai4 2025</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">

          {/* Overview */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Overview
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                At <span className="text-[#08874a] dark:text-[#39FF14] font-medium">OneSource Cloud</span>, a Richardson, TX-based AI data center and private AI service provider,
                I gained direct exposure to real-world AI infrastructure environments and observed how large language models
                are deployed and operated at scale.
              </p>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                This experience bridged theory and production reality — I moved from academic understanding of AI systems
                to seeing firsthand the engineering constraints, operational tradeoffs, and business considerations that
                shape enterprise-grade AI deployment.
              </p>
            </div>
          </section>

          {/* Responsibilities */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Key Responsibilities &amp; Contributions
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'AI Inference Testing & Deployment Workflows',
                  body: 'Assisted with internal projects related to AI inference testing, deployment workflows, and system performance observation — gaining hands-on exposure to how production AI pipelines are built and monitored.',
                },
                {
                  title: 'Infrastructure & Performance Observation',
                  body: 'Learned about practical considerations in production AI systems, including GPU utilization, inference latency, throughput, and deployment efficiency — concepts that are rarely visible outside of real operational environments.',
                },
                {
                  title: 'Scalability & Storage Systems',
                  body: 'Observed how infrastructure design, storage systems, and deployment conditions can affect AI model performance and scalability, developing intuition for the engineering decisions behind large-scale AI services.',
                },
                {
                  title: 'Benchmarking & Model Evaluation',
                  body: 'Supported benchmarking and evaluation efforts for different AI models and deployment configurations, contributing to data-driven decision-making around model selection and infrastructure planning.',
                },
                {
                  title: 'Optimization Strategies',
                  body: 'Explored optimization concepts such as lightweight models, quantization, and efficient inference strategies for real-world deployment scenarios — understanding how to balance model quality with cost and latency constraints.',
                },
                {
                  title: 'Industry Conference Participation',
                  body: 'Participated in GenAI 2025 and Ai4 2025, helping introduce company services and learning about enterprise AI infrastructure trends and real-world AI deployment challenges from industry leaders.',
                },
                {
                  title: 'Cross-Functional Team Collaboration',
                  body: 'Worked alongside engineering and business teams to better understand both the technical and operational aspects of scalable AI deployment — gaining perspective on how AI infrastructure decisions connect to business outcomes.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[#08874a]/40 dark:hover:border-[#39FF14]/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <span className="text-[#08874a] dark:text-[#39FF14] mt-0.5 flex-shrink-0 text-lg">▹</span>
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                      <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Concepts */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Technical Areas Explored
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">AI Deployment</h3>
                <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />LLM inference at scale</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />Deployment workflow design</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />Model benchmarking &amp; evaluation</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />Production performance monitoring</li>
                </ul>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Infrastructure & Optimization</h3>
                <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />GPU utilization &amp; latency analysis</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />Model quantization techniques</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />Lightweight &amp; efficient inference</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] flex-shrink-0" />Storage systems &amp; scalability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conferences */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Industry Conference Participation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/30 dark:border-[#39FF14]/30 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-3">GenAI 2025</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed text-sm">
                  Represented OneSource Cloud at GenAI 2025, helping introduce company services to attendees
                  and gaining exposure to the latest enterprise AI infrastructure trends and deployment challenges
                  discussed by industry practitioners.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/30 dark:border-[#39FF14]/30 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-3">Ai4 2025</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed text-sm">
                  Attended Ai4 2025, one of the largest enterprise AI conferences, helping showcase OneSource Cloud's
                  private AI and data center services while learning about real-world AI deployment challenges
                  faced by organizations at scale.
                </p>
              </div>
            </div>
          </section>

          {/* Takeaways */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Key Takeaways
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                This internship gave me a ground-level view of what it actually takes to run AI in production —
                not just the models themselves, but the full stack of infrastructure decisions, operational tradeoffs,
                and business constraints that shape real-world AI deployment.
              </p>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Working alongside both engineering and business teams helped me understand that scalable AI is as much
                an operational challenge as it is a technical one. The exposure to concepts like{' '}
                <span className="text-[#08874a] dark:text-[#39FF14] font-medium">quantization, efficient inference, and GPU cost optimization</span>{' '}
                has directly informed how I think about building AI systems in my own projects.
              </p>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300 group"
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
