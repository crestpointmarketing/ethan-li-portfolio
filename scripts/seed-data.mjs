// Plain JS transcription of the 3 existing hand-coded project detail pages
// (SpeakWiseDetail.tsx, EelocutionistDetail.tsx, ZeitgeistDetail.tsx) into
// the CMS schema shape (see shared/projectSchema.ts). Content is copied
// directly from those files' JSX rather than re-typed into SQL, to avoid
// transcription/escaping errors.
//
// `**text**` marks the brand-accent inline span (see richText.tsx).

export const projects = [
  {
    slug: 'speakwise',
    title: 'SpeakWise: AI-Powered Speech Therapy Platform',
    subtitles: [
      'HPHS Sci Tech Fair — 1st Place & Jay Ingram Award',
      'Dallas Regional Science & Engineering Fair (DRSEF) — Honorable Mention (Top 4)',
    ],
    badges: [
      { text: '1st Place Award', variant: 'accent' },
      { text: '2024 - 2025', variant: 'neutral' },
    ],
    period: '2024 - 2025',
    cardHighlights: [
      'Built a multi-stage neural speech repair system achieving 46% fluency improvement and 95%+ stutter reduction',
      'Designed pipeline: Whisper (ASR) → LLM correction → XTTS synthesis with real-time streaming',
      'Introduced a correction coefficient (λ) to control fluency vs. speech naturalness trade-off',
      'Implemented latency-aware architecture and mitigated error propagation across stages',
      'Targeted real-world pediatric speech use, addressing ASR instability and deployment constraints',
    ],
    cardTeaser: {
      label: 'V2 — In Progress',
      items: [
        'Streaming speech processing for lower latency',
        'Lightweight model optimization for efficient inference',
        'Improved conversational memory for multi-turn sessions',
        'More efficient deployment workflows for real-world use',
      ],
    },
    techTags: ['Python', 'Whisper ASR', 'LLM', 'XTTS', 'Real-Time Streaming'],
    githubUrl: 'https://github.com/3than777',
    orderIndex: 0,
    published: true,
    video: { type: 'embed', src: 'https://www.youtube.com/embed/pudYGJvYWqk', title: 'SpeakWise Project Demo' },
    stats: [
      { value: '46%', label: 'Fluency Improvement' },
      { value: '95%+', label: 'Stutter Reduction' },
      { value: 'Real-time', label: 'Streaming Pipeline' },
      { value: 'Multi-stage', label: 'Neural Architecture', noWrap: true },
    ],
    sections: [
      {
        heading: 'Motivation & Societal Need',
        orderIndex: 0,
        blocks: [
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              'Approximately 70 million people worldwide—roughly 1% of the global population—experience speech disfluency disorders such as stuttering, cluttering, or neurogenic speech impairments. In the United States alone, over 3 million individuals stutter, with many facing significant social, emotional, and professional barriers.',
              'Traditional speech therapy requires intensive one-on-one sessions with licensed therapists, which are expensive, geographically limited, and often inaccessible to underserved communities. The average cost of speech therapy ranges from $100-250 per hour, and consistent improvement often requires 20-40+ hours of intervention—placing treatment out of reach for millions.',
              '**SpeakWise addresses this gap** by creating a scalable, AI-powered speech therapy platform that delivers personalized, real-time corrective feedback accessible to anyone with an internet connection. Our system specifically targets pediatric speech therapy applications, where early intervention is critical for long-term outcomes.',
            ],
          },
        ],
      },
      {
        heading: 'Core Innovation & Technical Approach',
        orderIndex: 1,
        blocks: [
          {
            type: 'steps',
            variant: 'flat',
            title: 'Multi-Stage Neural Pipeline',
            intro: 'SpeakWise implements a novel three-stage neural pipeline architecture:',
            items: [
              {
                marker: '1',
                title: 'Speech Recognition (Whisper ASR)',
                body: "OpenAI's Whisper model transcribes user speech with high accuracy, even with disfluent patterns like repetitions and prolongations",
              },
              {
                marker: '2',
                title: 'LLM-Based Correction',
                body: 'A fine-tuned large language model analyzes the transcription and generates fluent, grammatically correct target speech while preserving semantic meaning',
              },
              {
                marker: '3',
                title: 'Speech Synthesis (XTTS)',
                body: 'Text-to-speech synthesis with real-time streaming generates natural-sounding corrected speech, providing immediate auditory feedback to the user',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Novel Correction Coefficient (λ)',
            paragraphs: [
              'A key innovation is the introduction of a **tunable correction coefficient (λ)** that balances fluency improvement against naturalness preservation. This parameter allows therapists to customize intervention intensity based on individual patient needs—aggressive correction for severe cases, or subtle guidance for mild disfluencies.',
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Latency-Aware Architecture',
            paragraphs: [
              "The system implements advanced streaming protocols and latency mitigation techniques to deliver corrections within 200-300ms—fast enough to provide meaningful real-time feedback without disrupting the user's speech flow. Error propagation across pipeline stages is minimized through careful architectural design.",
            ],
          },
        ],
      },
      {
        heading: 'Interdisciplinary Linguistics Component',
        orderIndex: 2,
        blocks: [
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            intro: 'SpeakWise is grounded in **phonological and pragmatic linguistic theory**, specifically:',
            items: [
              {
                label: 'Phoneme-Level Analysis',
                body: 'The system identifies repetitions, prolongations, and blocks at the phonemic level, leveraging acoustic phonetics research on disfluency patterns',
              },
              {
                label: 'Prosodic Preservation',
                body: 'Corrections maintain natural prosody (intonation, rhythm, stress) to avoid robotic-sounding output, respecting the user’s communicative intent',
              },
              {
                label: 'Pragmatic Context Awareness',
                body: 'The LLM correction stage considers conversational context and pragmatic meaning, ensuring corrections are contextually appropriate',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              'This linguistic foundation ensures that SpeakWise doesn’t just "fix" speech mechanically—it respects the complexity of human communication and supports natural language development.',
            ],
          },
        ],
      },
      {
        heading: 'Technical Development & Market Value',
        orderIndex: 3,
        blocks: [
          {
            type: 'tech_columns',
            variant: 'flat',
            title: 'Tech Stack & Infrastructure',
            columns: [
              { heading: 'AI/ML', items: ['OpenAI Whisper (ASR)', 'Custom LLM fine-tuning', 'XTTS (TTS synthesis)'] },
              {
                heading: 'Backend & Deployment',
                items: ['Python (FastAPI/Flask)', 'WebSocket streaming', 'Docker containerization'],
              },
            ],
          },
          {
            type: 'bullets',
            variant: 'flat',
            title: 'Market Opportunity',
            intro:
              'The global speech therapy market is projected to reach **$8.2 billion by 2028**, growing at 7.4% CAGR. Key market drivers include:',
            items: [
              'Rising prevalence of speech disorders in children (estimated 5-10% of school-age population)',
              'Growing telehealth adoption accelerated by COVID-19',
              'Shortage of licensed speech-language pathologists (estimated 19% shortage in U.S. by 2028)',
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Deployment Considerations',
            paragraphs: [
              'Real-world deployment for pediatric speech therapy requires addressing ASR instability with child voices, ensuring HIPAA compliance for patient data, optimizing for low-bandwidth connections in underserved areas, and building clinician dashboards for progress tracking and intervention customization.',
            ],
          },
        ],
      },
      {
        heading: 'Expected Outcomes & Scholarly Contribution',
        orderIndex: 4,
        blocks: [
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            title: 'Clinical Impact',
            items: [
              {
                label: 'Accessibility',
                body: 'Reduce cost barriers to speech therapy, making intervention accessible to low-income and rural populations',
              },
              {
                label: 'Scalability',
                body: 'Enable thousands of users to receive concurrent therapy sessions without requiring proportional increases in therapist availability',
              },
              {
                label: 'Early Intervention',
                body: 'Facilitate earlier detection and treatment of speech disorders in children, improving long-term outcomes',
              },
            ],
          },
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            title: 'Academic Contributions',
            intro: 'This project contributes to multiple research domains:',
            items: [
              {
                label: 'Human-Computer Interaction',
                body: 'Novel approaches to real-time corrective feedback in assistive technologies',
              },
              {
                label: 'Speech Processing',
                body: 'Handling disfluent speech patterns in ASR systems and developing latency-aware streaming architectures',
              },
              { label: 'Applied Linguistics', body: 'Integration of phonological and pragmatic theory into AI system design' },
              { label: 'Healthcare AI', body: 'Ethical deployment of AI in pediatric healthcare contexts' },
            ],
          },
          {
            type: 'prose',
            variant: 'gradient',
            title: 'Recognition & Validation',
            paragraphs: [
              'SpeakWise received **1st place and the Jay Ingram Award** at the Highland Park High School SciTech Fair, and achieved **Honorable Mention (Top 4)** at the Dallas Regional Science & Engineering Fair (DRSEF), validating both its technical rigor and societal impact potential.',
            ],
          },
        ],
      },
      {
        heading: "What's Next — SpeakWise V2",
        orderIndex: 5,
        blocks: [
          {
            type: 'next_steps',
            variant: 'gradient',
            statusLabel: 'In Progress',
            intro:
              'Currently working on **SpeakWise V2**, focused on improving real-time responsiveness, deployment efficiency, and scalability for AI-powered speech interaction.',
            items: [
              'Streaming speech processing for lower perceived latency',
              'Lightweight model development and optimization for efficient inference',
              'Improved conversational memory for more coherent multi-turn sessions',
              'More efficient inference workflows for practical real-world deployment',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'eelocutionist',
    title: 'Eelocutionist — AI Interview Coaching Platform',
    subtitles: ['Internship Project | Real-Time Human-AI Interaction System'],
    badges: [
      { text: 'Production Deployed', variant: 'accent' },
      { text: '2024 - 2025', variant: 'neutral' },
    ],
    period: '2024 - 2025',
    cardHighlights: [
      'Built a production-level AI interview system deployed on a live platform, supporting real-time user interactions',
      'Developed backend using Express.js + LLM evaluation, integrating speech APIs',
      'Designed multi-format interview engine (behavioral, technical, case-based)',
      'Implemented performance analytics dashboard with scoring and feedback tracking',
      'Contributed to a scalable AI system focused on human-AI interaction',
    ],
    cardTeaser: null,
    techTags: ['Express.js', 'LLM', 'Speech APIs', 'Real-Time', 'Production'],
    githubUrl: 'https://github.com/3than777',
    orderIndex: 1,
    published: true,
    video: { type: 'embed', src: 'https://www.youtube.com/embed/BwW6pBthVPc', title: 'Eelocutionist Project Demo' },
    stats: [
      { value: 'Live', label: 'Production Platform' },
      { value: 'Real-time', label: 'User Interactions' },
      { value: 'Multi-format', label: 'Interview Engines', noWrap: true },
      { value: 'LLM-powered', label: 'Evaluation System', noWrap: true },
    ],
    sections: [
      {
        heading: 'Motivation & Societal Need',
        orderIndex: 0,
        blocks: [
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              'Job interviews remain one of the most high-stakes, anxiety-inducing experiences in professional life. Studies show that **up to 93% of job seekers** experience interview anxiety, with many reporting it as a significant barrier to career advancement.',
              'Traditional interview preparation resources—coaching services, mock interviews, and self-study materials—have critical limitations:',
            ],
          },
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'compact',
            items: [
              { label: 'Expensive', body: 'Professional coaching costs $100-500+ per hour' },
              { label: 'Limited availability', body: 'Coaches have finite time and geographic constraints' },
              {
                label: 'Lack of personalization',
                body: "Generic advice doesn't account for individual communication styles or target roles",
              },
              { label: 'No real-time feedback', body: 'Delayed feedback cycles slow skill development' },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              '**Eelocutionist democratizes interview preparation** by providing unlimited, personalized, real-time AI-powered coaching accessible to anyone, leveling the playing field for underrepresented job seekers and those without access to expensive career services.',
            ],
          },
        ],
      },
      {
        heading: 'Core Innovation & Technical Approach',
        orderIndex: 1,
        blocks: [
          {
            type: 'steps',
            variant: 'flat',
            title: 'AI Interview Engine Architecture',
            intro: 'Eelocutionist implements a sophisticated multi-format interview engine supporting three core interview types:',
            items: [
              {
                marker: 'B',
                title: 'Behavioral Interviews',
                body: 'STAR framework-based questions assessing past experiences, competencies, and soft skills. The AI evaluates response structure, storytelling clarity, and alignment with target role requirements.',
              },
              {
                marker: 'T',
                title: 'Technical Interviews',
                body: 'Role-specific technical questions (e.g., coding problems, system design, domain knowledge). The AI assesses technical accuracy, problem-solving approach, and communication of complex concepts.',
              },
              {
                marker: 'C',
                title: 'Case-Based Interviews',
                body: 'Business scenarios and analytical challenges common in consulting and strategy roles. The AI evaluates structured thinking, quantitative reasoning, and business acumen.',
              },
            ],
          },
          {
            type: 'mini_cards',
            variant: 'flat',
            title: 'LLM-Based Evaluation Framework',
            intro: 'The platform uses a multi-dimensional LLM evaluation system that scores responses across:',
            items: [
              { title: 'Content Quality', body: 'Relevance, depth, and accuracy of responses' },
              { title: 'Communication Clarity', body: 'Articulation, coherence, and persuasiveness' },
              { title: 'Behavioral Fit', body: 'Alignment with target company culture and role' },
              { title: 'Improvement Areas', body: 'Specific, actionable feedback for skill development' },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Real-Time Interaction System',
            paragraphs: [
              'Built with **Express.js backend** and integrated speech APIs, the platform delivers **conversational, real-time** interview simulations. Users receive immediate verbal and written feedback, creating an immersive practice environment that mirrors actual interview dynamics.',
            ],
          },
        ],
      },
      {
        heading: 'Human-AI Interaction Design',
        orderIndex: 2,
        blocks: [
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            intro:
              'Eelocutionist is fundamentally a **human-AI collaboration system**, where effective interaction design is critical to user learning and comfort:',
            items: [
              {
                label: 'Conversational Interface',
                body: 'Natural language interaction reduces cognitive load and interview anxiety, making the platform feel more like talking to a supportive mentor than a rigid assessment tool',
              },
              {
                label: 'Adaptive Questioning',
                body: 'The AI adjusts question difficulty and focus based on user performance, providing personalized challenge levels that optimize skill development',
              },
              {
                label: 'Constructive Feedback',
                body: 'Feedback is framed positively and includes specific improvement strategies, following pedagogical best practices for adult learning',
              },
              {
                label: 'Progress Visualization',
                body: 'Performance analytics dashboard tracks improvement over time, providing motivation and insight into skill development trajectory',
              },
            ],
          },
        ],
      },
      {
        heading: 'Technical Development & Market Value',
        orderIndex: 3,
        blocks: [
          {
            type: 'tech_columns',
            variant: 'flat',
            title: 'Tech Stack',
            columns: [
              {
                heading: 'Backend & APIs',
                items: [
                  'Express.js (Node.js framework)',
                  'LLM API integration (evaluation)',
                  'Speech-to-text APIs',
                  'Text-to-speech synthesis',
                ],
              },
              {
                heading: 'Features & Infrastructure',
                items: [
                  'Real-time WebSocket connections',
                  'Performance analytics dashboard',
                  'User progress tracking',
                  'Production deployment (live)',
                ],
              },
            ],
          },
          {
            type: 'bullets',
            variant: 'flat',
            title: 'Market Opportunity',
            intro: 'The online career services market is rapidly expanding, driven by:',
            items: [
              'Global job market volatility increasing demand for career transition support',
              'Remote work normalization expanding addressable market beyond geographic boundaries',
              'Gen Z and Millennial job seekers preferring digital-first solutions',
              'Growing skills gap requiring continuous professional development',
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              "Competitive landscape includes platforms like Interviewing.io ($20-30/session) and Pramp (free peer-to-peer), but Eelocutionist's **AI-powered unlimited practice model** offers superior scalability and accessibility.",
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Production Deployment',
            paragraphs: [
              'As an **internship project deployed to production**, Eelocutionist supports real users in live interview preparation scenarios. This real-world deployment experience provided invaluable insights into scalability challenges, user experience optimization, and production system monitoring.',
            ],
          },
        ],
      },
      {
        heading: 'Expected Outcomes & Scholarly Contribution',
        orderIndex: 4,
        blocks: [
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            title: 'Career Impact',
            items: [
              {
                label: 'Democratized Access',
                body: 'Reduce barriers to professional interview coaching, particularly benefiting first-generation job seekers and underrepresented minorities',
              },
              {
                label: 'Confidence Building',
                body: 'Repeated practice in a low-stakes environment reduces interview anxiety and builds communication confidence',
              },
              {
                label: 'Skill Development',
                body: 'Data-driven feedback accelerates professional communication skill development',
              },
            ],
          },
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            title: 'Research Contributions',
            intro: 'This project contributes to emerging research in:',
            items: [
              {
                label: 'AI in Education & Training',
                body: 'Applying LLMs to professional skill development and personalized learning',
              },
              {
                label: 'Human-AI Collaboration',
                body: 'Designing conversational AI systems that enhance rather than replace human capabilities',
              },
              {
                label: 'Scalable Career Services',
                body: 'Building AI systems that deliver personalized career support at scale',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'gradient',
            title: 'Real-World Validation',
            paragraphs: [
              'Deployed as a **live production platform**, Eelocutionist has demonstrated real-world viability and user value. The internship experience provided exposure to product development lifecycle, stakeholder management, and the challenges of building scalable AI systems for human-facing applications.',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'zeitgeist',
    title: 'Zeitgeist — AI System for Financial Reasoning',
    subtitles: ['Real-Time AI System for Financial Market Analysis'],
    badges: [
      { text: 'Independent Project', variant: 'accent' },
      { text: '2024 - 2025', variant: 'neutral' },
    ],
    period: '2024 - 2025',
    cardHighlights: [
      'Built a real-time AI system for financial reasoning under uncertainty, analyzing options data and market signals',
      'Designed pipeline integrating Polygon.io APIs with LLM-based interpretation of volatility and Greeks',
      'Developed backend using FastAPI + Docker for scalable, low-latency deployment',
      'Implemented continuous data ingestion and inference pipeline for dynamic market conditions',
      'Explored LLM-based reasoning in structured financial domains',
    ],
    cardTeaser: null,
    techTags: ['FastAPI', 'Docker', 'Polygon.io', 'LLM', 'Financial AI'],
    githubUrl: 'https://github.com/3than777',
    orderIndex: 2,
    published: true,
    video: {
      type: 'placeholder',
      message: 'Demo video coming soon',
      subMessage: 'Zeitgeist walkthrough is being recorded.',
    },
    stats: [
      { value: 'Real-time', label: 'Market Analysis' },
      { value: 'LLM-based', label: 'Reasoning Engine', noWrap: true },
      { value: 'FastAPI', label: 'Scalable Backend' },
      { value: 'Docker', label: 'Containerized Deploy' },
    ],
    sections: [
      {
        heading: 'Motivation & Societal Need',
        orderIndex: 0,
        blocks: [
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              'Financial markets generate massive volumes of real-time data—price movements, volatility indices, options Greeks, market signals—that require rapid interpretation under uncertainty. Traditional algorithmic trading systems excel at pattern recognition but struggle with **contextual reasoning, qualitative analysis, and adaptive decision-making** in novel or volatile market conditions.',
              'Retail investors and small trading firms face particular challenges:',
            ],
          },
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'compact',
            items: [
              {
                label: 'Information asymmetry',
                body: 'Institutional players have sophisticated analytics tools unavailable to individual traders',
              },
              {
                label: 'Cognitive overload',
                body: 'Human traders cannot simultaneously monitor and interpret dozens of real-time data streams',
              },
              {
                label: 'Emotional bias',
                body: 'Fear and greed compromise rational decision-making during market volatility',
              },
              {
                label: 'Lack of domain expertise',
                body: 'Understanding options pricing, volatility dynamics, and risk metrics requires specialized knowledge',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              '**Zeitgeist explores whether LLMs can perform structured financial reasoning**—interpreting market data, assessing risk under uncertainty, and generating actionable insights—in real-time. The system aims to democratize sophisticated market analysis tools for individual investors.',
            ],
          },
        ],
      },
      {
        heading: 'Core Innovation & Technical Approach',
        orderIndex: 1,
        blocks: [
          {
            type: 'steps',
            variant: 'flat',
            title: 'LLM-Driven Financial Analysis Pipeline',
            intro: 'Zeitgeist implements a novel architecture that integrates real-time market data with LLM reasoning:',
            items: [
              {
                marker: '1',
                title: 'Data Ingestion (Polygon.io APIs)',
                body: 'Continuous streaming of options data, equity prices, volatility indices, and market signals through Polygon.io financial APIs, providing institutional-grade market data access',
              },
              {
                marker: '2',
                title: 'Structured Data Processing',
                body: 'Raw market data is processed into structured formats interpretable by LLMs—calculating implied volatility, Greeks (delta, gamma, theta, vega), and technical indicators',
              },
              {
                marker: '3',
                title: 'LLM Reasoning Engine',
                body: 'A fine-tuned LLM analyzes processed data, applying financial domain knowledge to assess market conditions, identify risks, and generate trading insights with probabilistic confidence estimates',
              },
              {
                marker: '4',
                title: 'Inference & Output',
                body: 'System generates actionable outputs—market sentiment analysis, risk assessments, potential trade scenarios—delivered through a low-latency API for downstream consumption',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Uncertainty Quantification',
            paragraphs: [
              "A critical innovation is the system's ability to **reason under uncertainty**. Rather than providing deterministic predictions, Zeitgeist generates probabilistic assessments with confidence intervals, acknowledging the inherent unpredictability of financial markets and avoiding false precision.",
            ],
          },
          {
            type: 'bullets',
            variant: 'flat',
            title: 'Scalable Architecture: FastAPI + Docker',
            intro:
              'The backend is built with **FastAPI** (Python async framework) for high-throughput, low-latency API performance. Docker containerization ensures:',
            items: [
              'Reproducible deployment across development and production environments',
              'Easy horizontal scaling to handle increased inference load',
              'Isolated dependency management for complex ML/data science stacks',
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            title: 'Dynamic Market Adaptation',
            paragraphs: [
              "The system implements a **continuous inference pipeline** that adapts to changing market conditions in real-time. Unlike static models trained on historical data, Zeitgeist's LLM reasoning can incorporate sudden market shifts, news events, and volatility spikes into its analysis.",
            ],
          },
        ],
      },
      {
        heading: 'Financial Domain Knowledge Integration',
        orderIndex: 2,
        blocks: [
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            intro: 'Effective financial AI requires deep **quantitative finance and options theory** integration:',
            items: [
              {
                label: 'Options Pricing Models',
                body: 'Understanding Black-Scholes framework, implied volatility surfaces, and volatility smile/skew patterns to interpret options market signals',
              },
              {
                label: 'Greeks Interpretation',
                body: 'Analyzing delta (directional exposure), gamma (convexity), theta (time decay), and vega (volatility sensitivity) to assess risk profiles',
              },
              {
                label: 'Market Microstructure',
                body: 'Understanding bid-ask spreads, order flow dynamics, and liquidity constraints in derivative markets',
              },
              {
                label: 'Risk Management Theory',
                body: 'Applying portfolio theory, Value-at-Risk (VaR), and stress testing concepts to evaluate position risk',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'flat',
            paragraphs: [
              "This interdisciplinary foundation ensures that Zeitgeist's LLM reasoning is grounded in established financial theory rather than pattern-matching on superficial correlations.",
            ],
          },
        ],
      },
      {
        heading: 'Technical Development & Market Value',
        orderIndex: 3,
        blocks: [
          {
            type: 'tech_columns',
            variant: 'flat',
            title: 'Tech Stack',
            columns: [
              {
                heading: 'Data & APIs',
                items: [
                  'Polygon.io financial APIs',
                  'Real-time options data streams',
                  'Equity pricing & market signals',
                  'Volatility indices',
                ],
              },
              {
                heading: 'Backend & Infrastructure',
                items: [
                  'Python + FastAPI framework',
                  'LLM integration & fine-tuning',
                  'Docker containerization',
                  'Async data ingestion pipeline',
                ],
              },
            ],
          },
          {
            type: 'bullets',
            variant: 'flat',
            title: 'Market Opportunity',
            intro: 'The algorithmic trading and financial analytics market is rapidly growing:',
            items: [
              'Algorithmic trading now accounts for 60-75% of total trading volume in U.S. equity markets',
              'Retail trading surged during 2020-2021, with platforms like Robinhood democratizing access',
              'Growing demand for AI-powered financial tools among institutional and retail investors',
              'Options trading volume at all-time highs, driven by sophisticated retail participation',
            ],
          },
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'compact',
            title: 'Deployment Considerations',
            intro: 'Real-world deployment of financial AI systems requires addressing:',
            items: [
              {
                label: 'Regulatory compliance',
                body: 'Ensuring system outputs comply with financial regulations and disclosure requirements',
              },
              {
                label: 'Latency optimization',
                body: 'Achieving sub-second inference times for time-sensitive trading decisions',
              },
              {
                label: 'Model validation',
                body: 'Backtesting and stress-testing LLM reasoning against historical market scenarios',
              },
              {
                label: 'Risk controls',
                body: 'Implementing safeguards to prevent erroneous trades from LLM hallucinations or reasoning errors',
              },
            ],
          },
        ],
      },
      {
        heading: 'Expected Outcomes & Scholarly Contribution',
        orderIndex: 4,
        blocks: [
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            title: 'Financial Market Impact',
            items: [
              {
                label: 'Democratized Analytics',
                body: 'Provide retail investors with institutional-grade financial analysis tools, reducing information asymmetry',
              },
              {
                label: 'Risk Transparency',
                body: 'Enable better-informed investment decisions through clear risk assessment and uncertainty quantification',
              },
              {
                label: 'Market Efficiency',
                body: 'Contribute to price discovery and market efficiency through improved information interpretation',
              },
            ],
          },
          {
            type: 'labeled_bullets',
            variant: 'flat',
            density: 'loose',
            title: 'Research Contributions',
            intro: 'Zeitgeist explores frontier research questions in:',
            items: [
              {
                label: 'LLMs for Structured Reasoning',
                body: 'Can LLMs perform reliable quantitative reasoning in structured domains like finance, where precision and domain knowledge are critical?',
              },
              {
                label: 'AI Under Uncertainty',
                body: 'Developing frameworks for LLMs to reason probabilistically and communicate confidence intervals',
              },
              {
                label: 'Real-Time Financial AI',
                body: 'Building low-latency inference pipelines that integrate live data streams with LLM reasoning',
              },
              {
                label: 'Ethical Financial AI',
                body: 'Addressing transparency, explainability, and accountability in AI-driven financial decision-making',
              },
            ],
          },
          {
            type: 'prose',
            variant: 'gradient',
            title: 'Independent Exploration',
            paragraphs: [
              'As an **independent research project**, Zeitgeist demonstrates initiative in exploring cutting-edge AI applications beyond classroom assignments. The project combines technical implementation (building a production-ready system) with conceptual exploration (investigating LLM capabilities in structured reasoning domains).',
            ],
          },
        ],
      },
    ],
  },
];
