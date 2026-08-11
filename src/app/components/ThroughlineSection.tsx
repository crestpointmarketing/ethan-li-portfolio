import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

/**
 * "The Throughline" — a dual-track growth map showing two connected paths through
 * Ethan's work: a Technical Evolution track and a Human Impact & Intellectual
 * Growth track, both moving Information → Intelligence → Physical Action, with the
 * projects for each stage as clickable cards. Immersive dark, editorial, animated
 * only to convey relationships (scroll-reveal + hover). Copy is authored — keep in
 * sync with the portfolio narrative. Links point to real project/experience pages.
 */

type Project = { name: string; purpose: string; tag: string; to: string };
type StageData = {
  n: string;
  key: string;
  tech: string;
  human: string;
  projects: Project[];
};

const STAGES: StageData[] = [
  {
    n: '01',
    key: 'Information',
    tech: 'Web Platforms · NLP · Speech Analysis',
    human: 'Helping people express ideas and understand information.',
    projects: [
      { name: 'SpeakWise', purpose: 'AI-powered communication coaching that helps people speak with clarity and confidence.', tag: 'Speech · NLP', to: '/projects/speakwise' },
      { name: 'Elocutionist', purpose: 'Making speech practice more accessible, structured, and actionable.', tag: 'LLM · Speech APIs', to: '/projects/elocutionist' },
    ],
  },
  {
    n: '02',
    key: 'Intelligence',
    tech: 'LLMs · Data Analysis · Measurement · GEO',
    human: 'Questioning how AI selects, measures, presents, and omits information.',
    projects: [
      { name: 'Zeitgeist', purpose: 'Using AI to discover patterns and meaning across complex information.', tag: 'LLM · Data', to: '/projects/zeitgeist' },
      { name: 'Pomelo GEO', purpose: 'Measuring how generative AI systems select, represent, recommend, or omit brands and entities.', tag: 'Multi-LLM · GEO', to: '/projects/pomelo-labs' },
    ],
  },
  {
    n: '03',
    key: 'Physical Action',
    tech: 'Computer Vision · VLA · Power & Control Systems',
    human: 'Exploring how intelligent decisions can act reliably in the real world.',
    projects: [
      { name: 'Vision-Language-Action Robotics', purpose: 'Connecting perception and language reasoning to robotic action.', tag: 'Computer Vision · VLA', to: '/projects/vla-robot-manipulation' },
      { name: 'Power Electronics Lab', purpose: 'Exploring the power, sensing, communication, and control systems beneath reliable physical action.', tag: 'Hardware · Control', to: '/experience/ut-austin-power-electronics' },
    ],
  },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    const t = setTimeout(() => setInView(true), 2500);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);
  return { ref, inView };
}

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  return (
    <Link to={p.to} className="tl-proj tl-reveal" style={{ transitionDelay: `${delay}ms` }} aria-label={`${p.name} — View project`}>
      <span className="tl-proj-connector" aria-hidden />
      <div className="tl-proj-head">
        <span className="tl-proj-name">{p.name}</span>
        <svg className="tl-proj-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
      <p className="tl-proj-purpose">{p.purpose}</p>
      <div className="tl-proj-foot">
        <span className="tl-proj-tag">{p.tag}</span>
        <span className="tl-proj-view">View Project</span>
      </div>
    </Link>
  );
}

export default function ThroughlineSection() {
  const { ref, inView } = useInView();
  return (
    <section id="throughline" className="relative border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div ref={ref} className={`tl-shell ${inView ? 'tl-in' : ''}`}>
          {/* Header */}
          <p className="tl-reveal tl-eyebrow">The Throughline</p>
          <h2 className="tl-reveal tl-title" style={{ transitionDelay: '60ms' }}>
            From Information to Intelligence to Action
          </h2>
          <p className="tl-reveal tl-sub" style={{ transitionDelay: '120ms' }}>
            My work follows two connected paths: building increasingly capable systems, and asking increasingly
            difficult questions about how those systems affect people.
          </p>

          {/* ===== Desktop / tablet: dual-track map ===== */}
          <div className="tl-map">
            {/* Stage headers */}
            <div className="tl-grid tl-headers" aria-hidden>
              {STAGES.map((s) => (
                <div key={s.n} className="tl-head tl-reveal">
                  <span className="tl-head-num">{s.n}</span>
                  <span className="tl-head-key">{s.key}</span>
                </div>
              ))}
            </div>

            {/* Technical track */}
            <div className="tl-track">
              <div className="tl-track-label tl-tech">Technical Evolution</div>
              <div className="tl-grid tl-lane">
                <span className="tl-line tl-line-tech" aria-hidden />
                {STAGES.map((s, i) => (
                  <div key={s.n} className="tl-cell tl-reveal" style={{ transitionDelay: `${180 + i * 90}ms` }}>
                    <span className="tl-node tl-node-tech" aria-hidden />
                    <span className="tl-cell-text">{s.tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Human track */}
            <div className="tl-track">
              <div className="tl-track-label tl-human">Human Impact &amp; Intellectual Growth</div>
              <div className="tl-grid tl-lane">
                <span className="tl-line tl-line-human" aria-hidden />
                {STAGES.map((s, i) => (
                  <div key={s.n} className="tl-cell tl-reveal" style={{ transitionDelay: `${260 + i * 90}ms` }}>
                    <span className="tl-node tl-node-human" aria-hidden />
                    <span className="tl-cell-text">{s.human}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project cards */}
            <div className="tl-grid tl-cardsgrid">
              {STAGES.map((s, si) => (
                <div key={s.n} className="tl-stackcol">
                  <span className="tl-bignum" aria-hidden>{s.n}</span>
                  {s.projects.map((p, pi) => (
                    <ProjectCard key={p.to} p={p} delay={360 + si * 80 + pi * 80} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ===== Mobile: vertical growth timeline ===== */}
          <div className="tl-mobile">
            {STAGES.map((s) => (
              <div key={s.n} className="tl-mstage tl-reveal">
                <div className="tl-mhead">
                  <span className="tl-mnum">{s.n}</span>
                  <span className="tl-mkey">{s.key}</span>
                </div>
                <div className="tl-mrow">
                  <span className="tl-mdot tl-node-tech" aria-hidden />
                  <div>
                    <span className="tl-mlabel tl-tech">Technical</span>
                    <p className="tl-mtext">{s.tech}</p>
                  </div>
                </div>
                <div className="tl-mrow">
                  <span className="tl-mdot tl-node-human" aria-hidden />
                  <div>
                    <span className="tl-mlabel tl-human">Human Impact</span>
                    <p className="tl-mtext">{s.human}</p>
                  </div>
                </div>
                <div className="tl-mcards">
                  {s.projects.map((p) => (
                    <ProjectCard key={p.to} p={p} delay={0} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        #throughline {
          --tech-a: #16A34A; --tech-b: #22d3ee;
          --human-a: #8B5CF6; --human-b: #e0b155;
          background:
            radial-gradient(60% 55% at 18% 8%, rgba(22,163,74,0.14), transparent 60%),
            radial-gradient(55% 55% at 85% 6%, rgba(139,92,246,0.14), transparent 62%),
            linear-gradient(180deg, #07090c 0%, #06070a 100%);
          color: #e9edf1;
        }

        .tl-reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); }
        .tl-in .tl-reveal { opacity: 1; transform: none; }

        .tl-eyebrow {
          font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #7cf0ad; margin-bottom: 14px;
        }
        .tl-title { font-family: 'Sora', sans-serif; font-weight: 600; letter-spacing: -0.02em;
          font-size: clamp(30px, 5vw, 52px); line-height: 1.05; color: #fff; margin: 0 0 16px; max-width: 900px; }
        .tl-sub { color: rgba(233,237,241,0.6); font-size: clamp(15px, 1.6vw, 18px); line-height: 1.6; max-width: 620px; margin: 0 0 56px; }

        /* Shared 3-column grid so headers, tracks and cards align */
        .tl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        .tl-map { display: none; }
        @media (min-width: 768px) { .tl-map { display: block; } .tl-mobile { display: none; } }

        /* Stage headers */
        .tl-headers { margin-bottom: 10px; }
        .tl-head { display: flex; align-items: baseline; gap: 12px; }
        .tl-head-num { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 15px;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.35); }
        .tl-head-key { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.82); }

        /* Tracks */
        .tl-track { margin-bottom: 30px; }
        .tl-track-label { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 16px; }
        .tl-tech { color: var(--tech-a); }
        .tl-human { color: var(--human-a); }

        .tl-lane { position: relative; align-items: start; }
        .tl-line { position: absolute; top: 7px; left: calc(16.66% ); right: calc(16.66%); height: 2px; border-radius: 2px;
          transform: scaleX(0); transform-origin: left center; transition: transform 1s cubic-bezier(.2,.7,.2,1) .2s; }
        .tl-in .tl-line { transform: scaleX(1); }
        .tl-line-tech { background: linear-gradient(90deg, var(--tech-a), var(--tech-b)); box-shadow: 0 0 12px rgba(34,211,238,0.5); }
        .tl-line-human { background: linear-gradient(90deg, var(--human-a), var(--human-b)); box-shadow: 0 0 12px rgba(139,92,246,0.5); }

        .tl-cell { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 0; }
        .tl-node { width: 16px; height: 16px; border-radius: 50%; margin-bottom: 14px; position: relative; z-index: 1; }
        .tl-node-tech { background: radial-gradient(circle at 35% 35%, #d6fff0, var(--tech-a)); box-shadow: 0 0 0 5px rgba(22,163,74,0.14), 0 0 16px rgba(34,211,238,0.7); }
        .tl-node-human { background: radial-gradient(circle at 35% 35%, #efe6ff, var(--human-a)); box-shadow: 0 0 0 5px rgba(139,92,246,0.14), 0 0 16px rgba(139,92,246,0.7); }
        .tl-cell-text { font-size: 13.5px; line-height: 1.55; color: rgba(233,237,241,0.72); max-width: 260px; }

        /* Project card columns */
        .tl-cardsgrid { margin-top: 26px; align-items: start; }
        .tl-stackcol { position: relative; display: flex; flex-direction: column; gap: 16px; padding-top: 8px; }
        .tl-bignum { position: absolute; top: -46px; right: 4px; font-family: 'Sora', sans-serif; font-weight: 800;
          font-size: 92px; line-height: 1; color: rgba(255,255,255,0.04); pointer-events: none; z-index: 0; }

        /* Project card */
        .tl-proj {
          position: relative; display: block; text-decoration: none; border-radius: 16px; padding: 18px 18px 16px;
          background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 10px 30px rgba(0,0,0,0.35); z-index: 1;
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease, background .25s ease;
        }
        .tl-proj-connector { position: absolute; top: -10px; left: 26px; width: 2px; height: 10px; border-radius: 2px;
          background: linear-gradient(180deg, rgba(255,255,255,0.28), transparent); opacity: .5; transition: opacity .25s ease, box-shadow .25s ease; }
        .tl-proj:hover, .tl-proj:focus-visible {
          transform: translateY(-6px); background: rgba(255,255,255,0.06);
          border-color: rgba(22,163,74,0.5); box-shadow: 0 18px 46px rgba(22,163,74,0.22);
          outline: none;
        }
        .tl-proj:focus-visible { border-color: #34d17f; box-shadow: 0 0 0 3px rgba(52,209,127,0.5), 0 18px 46px rgba(22,163,74,0.22); }
        .tl-proj:hover .tl-proj-connector, .tl-proj:focus-visible .tl-proj-connector { opacity: 1; box-shadow: 0 0 10px rgba(52,209,127,0.8); background: linear-gradient(180deg, #34d17f, transparent); }
        .tl-proj-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
        .tl-proj-name { color: #fff; font-weight: 600; font-size: 15.5px; line-height: 1.25; }
        .tl-proj-arrow { color: #7cf0ad; flex-shrink: 0; transition: transform .25s ease; }
        .tl-proj:hover .tl-proj-arrow, .tl-proj:focus-visible .tl-proj-arrow { transform: translateX(4px); }
        .tl-proj-purpose { color: rgba(233,237,241,0.6); font-size: 13px; line-height: 1.55; margin: 0 0 14px; }
        .tl-proj-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .tl-proj-tag { font-size: 11px; letter-spacing: .5px; color: rgba(233,237,241,0.5); }
        .tl-proj-view { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #7cf0ad; }

        /* ===== Mobile vertical timeline ===== */
        .tl-mobile { display: block; position: relative; padding-left: 22px; }
        @media (min-width: 768px) { .tl-mobile { display: none; } }
        .tl-mobile::before { content: ''; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 2px; border-radius: 2px;
          background: linear-gradient(180deg, var(--tech-a), var(--human-a), var(--human-b)); opacity: .5; }
        .tl-mstage { position: relative; margin-bottom: 40px; }
        .tl-mhead { display: flex; align-items: baseline; gap: 10px; margin: 0 0 14px -22px; padding-left: 22px; }
        .tl-mhead::before { content: ''; position: absolute; left: 0; width: 12px; height: 12px; border-radius: 50%; margin-top: 4px;
          background: #fff; box-shadow: 0 0 12px rgba(22,163,74,0.7); }
        .tl-mnum { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 15px; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
        .tl-mkey { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #fff; }
        .tl-mrow { display: flex; gap: 10px; margin-bottom: 12px; align-items: flex-start; }
        .tl-mdot { flex-shrink: 0; width: 12px; height: 12px; border-radius: 50%; margin-top: 4px; }
        .tl-mlabel { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 2px; }
        .tl-mtext { color: rgba(233,237,241,0.68); font-size: 13.5px; line-height: 1.5; margin: 0; }
        .tl-mcards { display: flex; flex-direction: column; gap: 14px; margin-top: 16px; }
        .tl-mcards .tl-proj { min-height: 44px; }

        @media (prefers-reduced-motion: reduce) {
          .tl-reveal { opacity: 1; transform: none; transition: none; }
          .tl-line { transform: scaleX(1); transition: none; }
          .tl-proj, .tl-proj-arrow { transition: none; }
        }
      `}</style>
    </section>
  );
}
