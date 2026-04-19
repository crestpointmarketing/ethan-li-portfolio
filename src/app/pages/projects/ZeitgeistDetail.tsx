import { Link } from 'react-router';

export default function ZeitgeistDetail() {
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
              Independent Project
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
            Zeitgeist — AI System for Financial Reasoning
          </h1>

          <p className="text-xl text-[#08874a] dark:text-[#39FF14]">Real-Time AI System for Financial Market Analysis</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">Real-time</div>
              <div className="text-sm text-[var(--muted-foreground)]">Market Analysis</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2 whitespace-nowrap">LLM-based</div>
              <div className="text-sm text-[var(--muted-foreground)]">Reasoning Engine</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">FastAPI</div>
              <div className="text-sm text-[var(--muted-foreground)]">Scalable Backend</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-4xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2">Docker</div>
              <div className="text-sm text-[var(--muted-foreground)]">Containerized Deploy</div>
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
              title="Zeitgeist Project Demo"
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
                Financial markets generate massive volumes of real-time data—price movements, volatility indices, options
                Greeks, market signals—that require rapid interpretation under uncertainty. Traditional algorithmic trading
                systems excel at pattern recognition but struggle with <span className="text-[#08874a] dark:text-[#39FF14] font-medium">contextual
                reasoning, qualitative analysis, and adaptive decision-making</span> in novel or volatile market conditions.
              </p>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Retail investors and small trading firms face particular challenges:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Information asymmetry:</span> Institutional
                  players have sophisticated analytics tools unavailable to individual traders</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Cognitive overload:</span> Human traders
                  cannot simultaneously monitor and interpret dozens of real-time data streams</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Emotional bias:</span> Fear and greed
                  compromise rational decision-making during market volatility</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted-foreground)]"><span className="font-medium">Lack of domain expertise:</span> Understanding
                  options pricing, volatility dynamics, and risk metrics requires specialized knowledge</span>
                </li>
              </ul>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                <span className="text-[#08874a] dark:text-[#39FF14] font-medium">Zeitgeist explores whether LLMs can perform structured financial
                reasoning</span>—interpreting market data, assessing risk under uncertainty, and generating actionable insights—in
                real-time. The system aims to democratize sophisticated market analysis tools for individual investors.
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
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">LLM-Driven Financial Analysis Pipeline</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  Zeitgeist implements a novel architecture that integrates real-time market data with LLM reasoning:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Data Ingestion (Polygon.io APIs)</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Continuous streaming of options data, equity prices, volatility indices, and market signals through
                        Polygon.io financial APIs, providing institutional-grade market data access
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Structured Data Processing</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Raw market data is processed into structured formats interpretable by LLMs—calculating implied
                        volatility, Greeks (delta, gamma, theta, vega), and technical indicators
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">LLM Reasoning Engine</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        A fine-tuned LLM analyzes processed data, applying financial domain knowledge to assess market
                        conditions, identify risks, and generate trading insights with probabilistic confidence estimates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#39FF14] font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Inference & Output</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        System generates actionable outputs—market sentiment analysis, risk assessments, potential trade
                        scenarios—delivered through a low-latency API for downstream consumption
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Uncertainty Quantification</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  A critical innovation is the system's ability to <span className="text-[#08874a] dark:text-[#39FF14] font-medium">reason under
                  uncertainty</span>. Rather than providing deterministic predictions, Zeitgeist generates probabilistic
                  assessments with confidence intervals, acknowledging the inherent unpredictability of financial markets
                  and avoiding false precision.
                </p>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Scalable Architecture: FastAPI + Docker</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  The backend is built with <span className="text-[#08874a] dark:text-[#39FF14] font-medium">FastAPI</span> (Python async framework)
                  for high-throughput, low-latency API performance. Docker containerization ensures:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Reproducible deployment across development and production environments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Easy horizontal scaling to handle increased inference load</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Isolated dependency management for complex ML/data science stacks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Dynamic Market Adaptation</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  The system implements a <span className="text-[#08874a] dark:text-[#39FF14] font-medium">continuous inference pipeline</span> that
                  adapts to changing market conditions in real-time. Unlike static models trained on historical data, Zeitgeist's
                  LLM reasoning can incorporate sudden market shifts, news events, and volatility spikes into its analysis.
                </p>
              </div>
            </div>
          </section>

          {/* Interdisciplinary Component: Financial Domain Knowledge */}
          <section>
            <h2
              className="text-3xl mb-6 flex items-center gap-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600
              }}
            >
              <span className="w-2 h-8 bg-[#08874a] dark:bg-[#39FF14] rounded-full" />
              Financial Domain Knowledge Integration
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-4">
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                Effective financial AI requires deep <span className="text-[#08874a] dark:text-[#39FF14] font-medium">quantitative finance and
                options theory</span> integration:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Options Pricing Models:</span>
                    <span className="text-[var(--muted-foreground)]"> Understanding Black-Scholes framework, implied volatility surfaces,
                    and volatility smile/skew patterns to interpret options market signals</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Greeks Interpretation:</span>
                    <span className="text-[var(--muted-foreground)]"> Analyzing delta (directional exposure), gamma (convexity), theta
                    (time decay), and vega (volatility sensitivity) to assess risk profiles</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Market Microstructure:</span>
                    <span className="text-[var(--muted-foreground)]"> Understanding bid-ask spreads, order flow dynamics, and liquidity
                    constraints in derivative markets</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Risk Management Theory:</span>
                    <span className="text-[var(--muted-foreground)]"> Applying portfolio theory, Value-at-Risk (VaR), and stress testing
                    concepts to evaluate position risk</span>
                  </div>
                </li>
              </ul>
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                This interdisciplinary foundation ensures that Zeitgeist's LLM reasoning is grounded in established financial
                theory rather than pattern-matching on superficial correlations.
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
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-[var(--muted-foreground)]">Data & APIs</h4>
                    <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                      <li>• Polygon.io financial APIs</li>
                      <li>• Real-time options data streams</li>
                      <li>• Equity pricing & market signals</li>
                      <li>• Volatility indices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-[var(--muted-foreground)]">Backend & Infrastructure</h4>
                    <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
                      <li>• Python + FastAPI framework</li>
                      <li>• LLM integration & fine-tuning</li>
                      <li>• Docker containerization</li>
                      <li>• Async data ingestion pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Market Opportunity</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  The algorithmic trading and financial analytics market is rapidly growing:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Algorithmic trading now accounts for 60-75% of total trading volume in U.S. equity markets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Retail trading surged during 2020-2021, with platforms like Robinhood democratizing access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Growing demand for AI-powered financial tools among institutional and retail investors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]">Options trading volume at all-time highs, driven by sophisticated retail participation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Deployment Considerations</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  Real-world deployment of financial AI systems requires addressing:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]"><span className="font-medium">Regulatory compliance:</span> Ensuring
                    system outputs comply with financial regulations and disclosure requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]"><span className="font-medium">Latency optimization:</span> Achieving
                    sub-second inference times for time-sensitive trading decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]"><span className="font-medium">Model validation:</span> Backtesting
                    and stress-testing LLM reasoning against historical market scenarios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <span className="text-[var(--muted-foreground)]"><span className="font-medium">Risk controls:</span> Implementing
                    safeguards to prevent erroneous trades from LLM hallucinations or reasoning errors</span>
                  </li>
                </ul>
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
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Financial Market Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Democratized Analytics:</span>
                      <span className="text-[var(--muted-foreground)]"> Provide retail investors with institutional-grade financial
                      analysis tools, reducing information asymmetry</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Risk Transparency:</span>
                      <span className="text-[var(--muted-foreground)]"> Enable better-informed investment decisions through clear risk
                      assessment and uncertainty quantification</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Market Efficiency:</span>
                      <span className="text-[var(--muted-foreground)]"> Contribute to price discovery and market efficiency through
                      improved information interpretation</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Research Contributions</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">
                  Zeitgeist explores frontier research questions in:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">LLMs for Structured Reasoning:</span>
                      <span className="text-[var(--muted-foreground)]"> Can LLMs perform reliable quantitative reasoning in structured
                      domains like finance, where precision and domain knowledge are critical?</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">AI Under Uncertainty:</span>
                      <span className="text-[var(--muted-foreground)]"> Developing frameworks for LLMs to reason probabilistically and
                      communicate confidence intervals</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Real-Time Financial AI:</span>
                      <span className="text-[var(--muted-foreground)]"> Building low-latency inference pipelines that integrate live data
                      streams with LLM reasoning</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Ethical Financial AI:</span>
                      <span className="text-[var(--muted-foreground)]"> Addressing transparency, explainability, and accountability in
                      AI-driven financial decision-making</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/30 dark:border-[#39FF14]/30 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-4">Independent Exploration</h3>
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  As an <span className="text-[#08874a] dark:text-[#39FF14] font-medium">independent research project</span>, Zeitgeist demonstrates
                  initiative in exploring cutting-edge AI applications beyond classroom assignments. The project combines
                  technical implementation (building a production-ready system) with conceptual exploration (investigating
                  LLM capabilities in structured reasoning domains).
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          <Link
            to="/projects/eelocutionist"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Project
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300 group"
          >
            Back to Home
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
