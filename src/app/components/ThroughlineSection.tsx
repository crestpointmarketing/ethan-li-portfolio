import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

/**
 * "The Throughline" — a calm, editorial map of Ethan's work along one line:
 * Information → Intelligence → Physical Action. A single horizontal progression
 * with three stages; under each, the projects as minimal, clickable cards
 * (name + one-line purpose; arrow appears on hover). Theme-aware, generous
 * whitespace. Copy is authored — keep in sync with the portfolio narrative.
 */

type Project = { name: string; purpose: string; to: string };
type StageData = { n: string; key: string; projects: Project[] };

const STAGES: StageData[] = [
  {
    n: '01',
    key: 'Information',
    projects: [
      { name: 'SpeakWise', purpose: 'AI communication coaching for clearer, more confident speech.', to: '/projects/speakwise' },
      { name: 'Elocutionist', purpose: 'Structured, accessible speech and interview practice.', to: '/projects/elocutionist' },
    ],
  },
  {
    n: '02',
    key: 'Intelligence',
    projects: [
      { name: 'PomeloLabs Marketing Platform', purpose: 'An AI-powered marketing platform that audits SEO and GEO visibility, identifies growth opportunities, creates and automatically publishes optimized content, and automates the entire marketing workflow through AI agent chat.', to: '/projects/pomelo-labs' },
      { name: 'Zeitgeist', purpose: 'Finding patterns and meaning across complex information.', to: '/projects/zeitgeist' },
    ],
  },
  {
    n: '03',
    key: 'Physical Action',
    projects: [
      { name: 'Vision-Language-Action Robotics', purpose: 'Turning perception and language reasoning into robotic action.', to: '/projects/vla-robot-manipulation' },
      { name: 'Power Electronics Lab', purpose: 'The power, sensing, and control systems beneath reliable action.', to: '/experience/ut-austin-power-electronics' },
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
    <Link to={p.to} className="tl-proj tl-reveal" style={{ transitionDelay: `${delay}ms` }} aria-label={`${p.name} — ${p.purpose}`}>
      <span className="tl-proj-name">
        {p.name}
        <svg className="tl-proj-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <span className="tl-proj-purpose">{p.purpose}</span>
    </Link>
  );
}

export default function ThroughlineSection() {
  const { ref, inView } = useInView();
  return (
    <section id="throughline" className="relative border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div ref={ref} className={`tl-shell ${inView ? 'tl-in' : ''}`}>
          <p className="tl-reveal tl-eyebrow">The Throughline</p>
          <h2 className="tl-reveal tl-title" style={{ transitionDelay: '50ms' }}>
            From Information to Intelligence to Action
          </h2>
          <p className="tl-reveal tl-sub" style={{ transitionDelay: '100ms' }}>
            I build systems that move from understanding human expression, to reasoning over information, to acting
            reliably in the physical world.
          </p>

          <div className="tl-map">
            <span className="tl-hair" aria-hidden />
            <div className="tl-grid">
              {STAGES.map((s, si) => (
                <div key={s.n} className="tl-col">
                  <div className="tl-stagehead tl-reveal" style={{ transitionDelay: `${140 + si * 80}ms` }}>
                    <span className="tl-dot" aria-hidden />
                    <span className="tl-labels">
                      <span className="tl-num">{s.n}</span>
                      <span className="tl-name">{s.key}</span>
                    </span>
                  </div>
                  {s.projects.map((p, pi) => (
                    <ProjectCard key={p.to} p={p} delay={220 + si * 80 + pi * 70} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #throughline {
          --accent: #0a7d4f;
          --tl-title: #0d1217; --tl-fg: #14181c; --tl-muted: rgba(20,24,28,0.58);
          --tl-eyebrow: #0a7d4f; --tl-num: #0a7d4f;
          --tl-line: rgba(0,0,0,0.14);
          --tl-card-hover: rgba(10,125,79,0.05);
          --tl-card-border: color-mix(in srgb, #0a7d4f 38%, transparent);
          background:
            radial-gradient(70% 55% at 50% 0%, rgba(22,163,74,0.06), transparent 62%),
            linear-gradient(180deg, #f7f9fa 0%, #f1f4f5 100%);
          color: var(--tl-fg);
        }
        .dark #throughline {
          --accent: #34d17f;
          --tl-title: #ffffff; --tl-fg: #e9edf1; --tl-muted: rgba(233,237,241,0.58);
          --tl-eyebrow: #7cf0ad; --tl-num: #7cf0ad;
          --tl-line: rgba(255,255,255,0.16);
          --tl-card-hover: rgba(52,209,127,0.08);
          --tl-card-border: color-mix(in srgb, #34d17f 45%, transparent);
          background:
            radial-gradient(70% 55% at 50% 0%, rgba(22,163,74,0.10), transparent 62%),
            linear-gradient(180deg, #0a0d11 0%, #07090c 100%);
        }

        .tl-reveal { opacity: 0; transform: translateY(14px); transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); }
        .tl-in .tl-reveal { opacity: 1; transform: none; }

        .tl-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--tl-eyebrow); margin: 0 0 16px; }
        .tl-title { font-family: 'Sora', sans-serif; font-weight: 600; letter-spacing: -0.02em;
          font-size: clamp(30px, 4.6vw, 50px); line-height: 1.06; color: var(--tl-title); margin: 0 0 18px; max-width: 780px; }
        .tl-sub { color: var(--tl-muted); font-size: clamp(15px, 1.5vw, 18px); line-height: 1.6; max-width: 640px; margin: 0 0 72px; }

        .tl-map { position: relative; }
        .tl-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 768px) { .tl-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; } }

        /* Single horizontal progression line (desktop) */
        .tl-hair { display: none; }
        @media (min-width: 768px) {
          .tl-hair { display: block; position: absolute; top: 6px; left: 6px; right: 6px; height: 1px; background: var(--tl-line);
            transform: scaleX(0); transform-origin: left center; transition: transform .9s cubic-bezier(.2,.7,.2,1) .15s; }
          .tl-in .tl-hair { transform: scaleX(1); }
          .tl-hair::after { content: ''; position: absolute; right: -1px; top: -3px;
            border-left: 6px solid var(--tl-line); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; }
        }

        .tl-col { display: flex; flex-direction: column; }
        .tl-stagehead { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 26px; }
        .tl-dot { width: 13px; height: 13px; border-radius: 50%; background: var(--accent); position: relative; z-index: 1; }
        .tl-labels { display: flex; align-items: baseline; gap: 10px; margin-top: 16px; }
        .tl-num { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 13px; color: var(--tl-num); }
        .tl-name { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--tl-title); }

        /* Minimal, mostly-borderless project cards */
        .tl-proj { display: block; text-decoration: none; padding: 16px 16px 18px; border-radius: 12px;
          border: 1px solid transparent; margin: 0 -16px 4px;
          transition: transform .22s ease, border-color .22s ease, background .22s ease; }
        .tl-proj + .tl-proj { margin-top: 14px; }
        .tl-proj:hover, .tl-proj:focus-visible { transform: translateY(-3px); background: var(--tl-card-hover); border-color: var(--tl-card-border); outline: none; }
        .tl-proj:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 45%, transparent); }
        .tl-proj-name { display: inline-flex; align-items: center; gap: 8px; color: var(--tl-title); font-weight: 600; font-size: 16.5px; line-height: 1.3; }
        .tl-proj-arrow { color: var(--accent); opacity: 0; transform: translateX(-5px); transition: opacity .22s ease, transform .22s ease; }
        .tl-proj:hover .tl-proj-arrow, .tl-proj:focus-visible .tl-proj-arrow { opacity: 1; transform: none; }
        .tl-proj-purpose { display: block; color: var(--tl-muted); font-size: 13.5px; line-height: 1.55; margin-top: 6px; }

        @media (prefers-reduced-motion: reduce) {
          .tl-reveal { opacity: 1; transform: none; transition: none; }
          .tl-hair { transform: scaleX(1); transition: none; }
          .tl-proj, .tl-proj-arrow { transition: none; }
        }
      `}</style>
    </section>
  );
}
