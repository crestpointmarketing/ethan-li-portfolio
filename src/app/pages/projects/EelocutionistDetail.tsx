import { Link } from 'react-router';

export default function EelocutionistDetail() {
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
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-[#08874a]/10 dark:bg-[#39FF14]/10 text-[#08874a] dark:text-[#39FF14] text-sm rounded-full border border-[#08874a]/20 dark:border-[#39FF14]/20">
              Production Deployed
            </span>
            <span className="px-4 py-1.5 bg-[var(--card)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]">
              2024 - 2025
            </span>
          </div>

          <h1
            className="text-5xl lg:text-6xl mb-6 leading-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700
            }}
          >
            Eelocutionist — AI Interview Coaching Platform
          </h1>

          <p className="text-xl text-[#08874a] dark:text-[#39FF14]">Internship Project | Real-Time Human-AI Interaction System</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">Live</div>
              <div className="text-sm text-[var(--muted-foreground)]">Production Platform</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">Real-time</div>
              <div className="text-sm text-[var(--muted-foreground)]">User Interactions</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2 whitespace-nowrap">Multi-format</div>
              <div className="text-sm text-[var(--muted-foreground)]">Interview Engines</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2 whitespace-nowrap">LLM-powered</div>
              <div className="text-sm text-[var(--muted-foreground)]">Evaluation System</div>
            </div>
          </div>
        </div>

        {/* Project Demo Video */}
        <div className="mb-16">
          <h2
            className="text-3xl mb-6 flex items-center gap-4"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
            Project Demo
          </h2>
          <div
            className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)]"
            style={{ paddingTop: '56.25%' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Eelocutionist Project Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">

          {/* Motivation & Societal Need */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Motivation & Societal Need
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Job interviews remain one of the most high-stakes, anxiety-inducing experiences in professional life.
                Studies show that <span className="text-[#08874a] dark:text-[#39FF14] font-medium">up to 93% of job seekers</span> experience
                interview anxiety, with many reporting it as a significant barrier to career advancement.
              </p>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Traditional interview preparation resources—coaching services, mock interviews, and self-study materials—have
                critical limitations:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Expensive:</span> Professional coaching
                  costs $100-500+ per hour</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Limited availability:</span> Coaches have
                  finite time and geographic constraints</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Lack of personalization:</span> Generic
                  advice doesn't account for individual communication styles or target roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">No real-time feedback:</span> Delayed
                  feedback cycles slow skill development</span>
                </li>
              </ul>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                <span className="text-[#08874a] dark:text-[#39FF14] font-medium">Eelocutionist democratizes interview preparation</span> by
                providing unlimited, personalized, real-time AI-powered coaching accessible to anyone, leveling the playing
                field for underrepresented job seekers and those without access to expensive career services.
              </p>
            </div>
          </section>

          {/* Core Innovation & Technical Approach */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Core Innovation & Technical Approach
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">AI Interview Engine Architecture</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  Eelocutionist implements a sophisticated multi-format interview engine supporting three core interview types:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      B
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Behavioral Interviews</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        STAR framework-based questions assessing past experiences, competencies, and soft skills. The AI
                        evaluates response structure, storytelling clarity, and alignment with target role requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      T
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Technical Interviews</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Role-specific technical questions (e.g., coding problems, system design, domain knowledge). The AI
                        assesses technical accuracy, problem-solving approach, and communication of complex concepts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      C
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Case-Based Interviews</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Business scenarios and analytical challenges common in consulting and strategy roles. The AI evaluates
                        structured thinking, quantitative reasoning, and business acumen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">LLM-Based Evaluation Framework</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  The platform uses a multi-dimensional LLM evaluation system that scores responses across:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--card)] border border-white/5 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-[#08874a] dark:text-[#39FF14] mb-2">Content Quality</h5>
                    <p className="text-xs text-[var(--muted-foreground)]">Relevance, depth, and accuracy of responses</p>
                  </div>
                  <div className="bg-[var(--card)] border border-white/5 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-[#08874a] dark:text-[#39FF14] mb-2">Communication Clarity</h5>
                    <p className="text-xs text-[var(--muted-foreground)]">Articulation, coherence, and persuasiveness</p>
                  </div>
                  <div className="bg-[var(--card)] border border-white/5 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-[#08874a] dark:text-[#39FF14] mb-2">Behavioral Fit</h5>
                    <p className="text-xs text-[var(--muted-foreground)]">Alignment with target company culture and role</p>
                  </div>
                  <div className="bg-[var(--card)] border border-white/5 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-[#08874a] dark:text-[#39FF14] mb-2">Improvement Areas</h5>
                    <p className="text-xs text-[var(--muted-foreground)]">Specific, actionable feedback for skill development</p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Real-Time Interaction System</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  Built with <span className="text-[#08874a] dark:text-[#39FF14] font-medium">Express.js backend</span> and integrated speech
                  APIs, the platform delivers <span className="text-[#08874a] dark:text-[#39FF14] font-medium">conversational, real-time</span> interview
                  simulations. Users receive immediate verbal and written feedback, creating an immersive practice environment
                  that mirrors actual interview dynamics.
                </p>
              </div>
            </div>
          </section>

          {/* Interdisciplinary Component: Human-AI Interaction */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Human-AI Interaction Design
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Eelocutionist is fundamentally a <span className="text-[#08874a] dark:text-[#39FF14] font-medium">human-AI collaboration system</span>,
                where effective interaction design is critical to user learning and comfort:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Conversational Interface:</span>
                    <span className="text-[var(--muted-foreground)]"> Natural language interaction reduces cognitive load and interview anxiety,
                    making the platform feel more like talking to a supportive mentor than a rigid assessment tool</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Adaptive Questioning:</span>
                    <span className="text-[var(--muted-foreground)]"> The AI adjusts question difficulty and focus based on user performance,
                    providing personalized challenge levels that optimize skill development</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Constructive Feedback:</span>
                    <span className="text-[var(--muted-foreground)]"> Feedback is framed positively and includes specific improvement strategies,
                    following pedagogical best practices for adult learning</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Progress Visualization:</span>
                    <span className="text-[var(--muted-foreground)]"> Performance analytics dashboard tracks improvement over time, providing
                    motivation and insight into skill development trajectory</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Technical Development & Market Value */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Technical Development & Market Value
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-[var(--muted-foreground)]">Backend & APIs</h4>
                    <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                      <li>• Express.js (Node.js framework)</li>
                      <li>• LLM API integration (evaluation)</li>
                      <li>• Speech-to-text APIs</li>
                      <li>• Text-to-speech synthesis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-[var(--muted-foreground)]">Features & Infrastructure</h4>
                    <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                      <li>• Real-time WebSocket connections</li>
                      <li>• Performance analytics dashboard</li>
                      <li>• User progress tracking</li>
                      <li>• Production deployment (live)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Market Opportunity</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  The online career services market is rapidly expanding, driven by:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Global job market volatility increasing demand for career transition support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Remote work normalization expanding addressable market beyond geographic boundaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Gen Z and Millennial job seekers preferring digital-first solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Growing skills gap requiring continuous professional development</span>
                  </li>
                </ul>
                <p className="text-[var(--foreground)]/90 leading-relaxed mt-4">
                  Competitive landscape includes platforms like Interviewing.io ($20-30/session) and Pramp (free peer-to-peer),
                  but Eelocutionist's <span className="text-[#08874a] dark:text-[#39FF14] font-medium">AI-powered unlimited practice model</span> offers
                  superior scalability and accessibility.
                </p>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Production Deployment</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  As an <span className="text-[#08874a] dark:text-[#39FF14] font-medium">internship project deployed to production</span>,
                  Eelocutionist supports real users in live interview preparation scenarios. This real-world deployment
                  experience provided invaluable insights into scalability challenges, user experience optimization, and
                  production system monitoring.
                </p>
              </div>
            </div>
          </section>

          {/* Expected Outcomes & Scholarly Contribution */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Expected Outcomes & Scholarly Contribution
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Career Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Democratized Access:</span>
                      <span className="text-[var(--muted-foreground)]"> Reduce barriers to professional interview coaching, particularly
                      benefiting first-generation job seekers and underrepresented minorities</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Confidence Building:</span>
                      <span className="text-[var(--muted-foreground)]"> Repeated practice in a low-stakes environment reduces interview
                      anxiety and builds communication confidence</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Skill Development:</span>
                      <span className="text-[var(--muted-foreground)]"> Data-driven feedback accelerates professional communication skill
                      development</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Research Contributions</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  This project contributes to emerging research in:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">AI in Education & Training:</span>
                      <span className="text-[var(--muted-foreground)]"> Applying LLMs to professional skill development and personalized
                      learning</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Human-AI Collaboration:</span>
                      <span className="text-[var(--muted-foreground)]"> Designing conversational AI systems that enhance rather than replace
                      human capabilities</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Scalable Career Services:</span>
                      <span className="text-[var(--muted-foreground)]"> Building AI systems that deliver personalized career support at scale</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/30 dark:border-[#39FF14]/30 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Real-World Validation</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  Deployed as a <span className="text-[#08874a] dark:text-[#39FF14] font-medium">live production platform</span>, Eelocutionist
                  has demonstrated real-world viability and user value. The internship experience provided exposure to
                  product development lifecycle, stakeholder management, and the challenges of building scalable AI systems
                  for human-facing applications.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          <Link
            to="/projects/speakwise"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Project
          </Link>

          <Link
            to="/projects/zeitgeist"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300 group"
          >
            Next Project
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
