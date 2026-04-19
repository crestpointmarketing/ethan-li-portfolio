import { Link } from 'react-router';

export default function SpeakWiseDetail() {
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
              1st Place Award
            </span>
            <span className="px-4 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-sm rounded-full border border-[var(--border)]">
              2024 - 2025
            </span>
          </div>

          <h1
            className="text-5xl lg:text-6xl mb-6 leading-tight text-[var(--foreground)]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700
            }}
          >
            SpeakWise: AI-Powered Speech Therapy Platform
          </h1>

          <div className="space-y-2">
            <p className="text-xl text-[#08874a] dark:text-[#39FF14]">HPHS Sci Tech Fair — 1st Place & Jay Ingram Award</p>
            <p className="text-lg text-[#08874a]/80 dark:text-[#39FF14]/80">Dallas Regional Science & Engineering Fair (DRSEF) — Honorable Mention (Top 4)</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">46%</div>
              <div className="text-sm text-[var(--muted-foreground)]">Fluency Improvement</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">95%+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Stutter Reduction</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">Real-time</div>
              <div className="text-sm text-[var(--muted-foreground)]">Streaming Pipeline</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2 whitespace-nowrap">Multi-stage</div>
              <div className="text-sm text-[var(--muted-foreground)]">Neural Architecture</div>
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
              title="SpeakWise Project Demo"
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
                Approximately 70 million people worldwide—roughly 1% of the global population—experience speech
                disfluency disorders such as stuttering, cluttering, or neurogenic speech impairments. In the United
                States alone, over 3 million individuals stutter, with many facing significant social, emotional, and
                professional barriers.
              </p>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Traditional speech therapy requires intensive one-on-one sessions with licensed therapists, which are
                expensive, geographically limited, and often inaccessible to underserved communities. The average cost
                of speech therapy ranges from $100-250 per hour, and consistent improvement often requires 20-40+ hours
                of intervention—placing treatment out of reach for millions.
              </p>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                <span className="text-[#08874a] dark:text-[#39FF14] font-medium">SpeakWise addresses this gap</span> by creating a scalable,
                AI-powered speech therapy platform that delivers personalized, real-time corrective feedback accessible
                to anyone with an internet connection. Our system specifically targets pediatric speech therapy
                applications, where early intervention is critical for long-term outcomes.
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
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Multi-Stage Neural Pipeline</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  SpeakWise implements a novel three-stage neural pipeline architecture:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Speech Recognition (Whisper ASR)</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        OpenAI's Whisper model transcribes user speech with high accuracy, even with disfluent patterns
                        like repetitions and prolongations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">LLM-Based Correction</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        A fine-tuned large language model analyzes the transcription and generates fluent, grammatically
                        correct target speech while preserving semantic meaning
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Speech Synthesis (XTTS)</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Text-to-speech synthesis with real-time streaming generates natural-sounding corrected speech,
                        providing immediate auditory feedback to the user
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Novel Correction Coefficient (λ)</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  A key innovation is the introduction of a <span className="text-[#08874a] dark:text-[#39FF14] font-medium">tunable correction
                  coefficient (λ)</span> that balances fluency improvement against naturalness preservation. This parameter
                  allows therapists to customize intervention intensity based on individual patient needs—aggressive
                  correction for severe cases, or subtle guidance for mild disfluencies.
                </p>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Latency-Aware Architecture</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  The system implements advanced streaming protocols and latency mitigation techniques to deliver
                  corrections within 200-300ms—fast enough to provide meaningful real-time feedback without disrupting
                  the user's speech flow. Error propagation across pipeline stages is minimized through careful
                  architectural design.
                </p>
              </div>
            </div>
          </section>

          {/* Interdisciplinary Linguistics Component */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Interdisciplinary Linguistics Component
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                SpeakWise is grounded in <span className="text-[#08874a] dark:text-[#39FF14] font-medium">phonological and pragmatic linguistic
                theory</span>, specifically:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Phoneme-Level Analysis:</span>
                    <span className="text-[var(--muted-foreground)]"> The system identifies repetitions, prolongations, and blocks at the
                    phonemic level, leveraging acoustic phonetics research on disfluency patterns</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Prosodic Preservation:</span>
                    <span className="text-[var(--muted-foreground)]"> Corrections maintain natural prosody (intonation, rhythm, stress)
                    to avoid robotic-sounding output, respecting the user's communicative intent</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Pragmatic Context Awareness:</span>
                    <span className="text-[var(--muted-foreground)]"> The LLM correction stage considers conversational context and
                    pragmatic meaning, ensuring corrections are contextually appropriate</span>
                  </div>
                </li>
              </ul>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                This linguistic foundation ensures that SpeakWise doesn't just "fix" speech mechanically—it respects
                the complexity of human communication and supports natural language development.
              </p>
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
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Tech Stack & Infrastructure</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-[var(--muted-foreground)]">AI/ML</h4>
                    <ul className="space-y-1 text-sm text-[var(--foreground)]/90">
                      <li>• OpenAI Whisper (ASR)</li>
                      <li>• Custom LLM fine-tuning</li>
                      <li>• XTTS (TTS synthesis)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-[var(--muted-foreground)]">Backend & Deployment</h4>
                    <ul className="space-y-1 text-sm text-[var(--foreground)]/90">
                      <li>• Python (FastAPI/Flask)</li>
                      <li>• WebSocket streaming</li>
                      <li>• Docker containerization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Market Opportunity</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  The global speech therapy market is projected to reach <span className="text-[#08874a] dark:text-[#39FF14] font-medium">$8.2
                  billion by 2028</span>, growing at 7.4% CAGR. Key market drivers include:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Rising prevalence of speech disorders in children (estimated 5-10% of school-age population)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Growing telehealth adoption accelerated by COVID-19</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Shortage of licensed speech-language pathologists (estimated 19% shortage in U.S. by 2028)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Deployment Considerations</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  Real-world deployment for pediatric speech therapy requires addressing ASR instability with child voices,
                  ensuring HIPAA compliance for patient data, optimizing for low-bandwidth connections in underserved
                  areas, and building clinician dashboards for progress tracking and intervention customization.
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
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Clinical Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Accessibility:</span>
                      <span className="text-[var(--muted-foreground)]"> Reduce cost barriers to speech therapy, making intervention
                      accessible to low-income and rural populations</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Scalability:</span>
                      <span className="text-[var(--muted-foreground)]"> Enable thousands of users to receive concurrent therapy sessions
                      without requiring proportional increases in therapist availability</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Early Intervention:</span>
                      <span className="text-[var(--muted-foreground)]"> Facilitate earlier detection and treatment of speech disorders
                      in children, improving long-term outcomes</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Academic Contributions</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  This project contributes to multiple research domains:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Human-Computer Interaction:</span>
                      <span className="text-[var(--muted-foreground)]"> Novel approaches to real-time corrective feedback in assistive
                      technologies</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Speech Processing:</span>
                      <span className="text-[var(--muted-foreground)]"> Handling disfluent speech patterns in ASR systems and developing
                      latency-aware streaming architectures</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Applied Linguistics:</span>
                      <span className="text-[var(--muted-foreground)]"> Integration of phonological and pragmatic theory into AI system
                      design</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Healthcare AI:</span>
                      <span className="text-[var(--muted-foreground)]"> Ethical deployment of AI in pediatric healthcare contexts</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/30 dark:border-[#39FF14]/30 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Recognition & Validation</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  SpeakWise received <span className="text-[#08874a] dark:text-[#39FF14] font-medium">1st place and the Jay Ingram Award</span> at
                  the Highland Park High School SciTech Fair, and achieved <span className="text-[#08874a] dark:text-[#39FF14] font-medium">Honorable
                  Mention (Top 4)</span> at the Dallas Regional Science & Engineering Fair (DRSEF), validating both its
                  technical rigor and societal impact potential.
                </p>
              </div>
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

          <Link
            to="/projects/eelocutionist"
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
