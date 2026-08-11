import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

/**
 * "Throughline" — the narrative spine of the work: Information → Intelligence →
 * Physical Action. Presented as an animated three-stage pipeline (scroll-reveal,
 * a flowing "comet" between stages, progress bars, pulsing badges, hover glow).
 * Theme-aware; copy is authored — keep it in sync with the portfolio narrative.
 */

type Stage = {
  index: string;
  title: string;
  blurb: string;
  items: { label: string; to: string }[];
};

const STAGES: Stage[] = [
  {
    index: '01',
    title: 'Human Expression & Information',
    blurb: 'Helping people communicate, express ideas, and understand information.',
    items: [
      { label: 'SpeakWise', to: '/projects/speakwise' },
      { label: 'Elocutionist', to: '/projects/elocutionist' },
    ],
  },
  {
    index: '02',
    title: 'AI Reasoning & Representation',
    blurb: 'Investigating how AI interprets, selects, measures, presents, and sometimes omits information.',
    items: [
      { label: 'Zeitgeist', to: '/projects/zeitgeist' },
      { label: 'Pomelo GEO', to: '/projects/pomelo-labs' },
    ],
  },
  {
    index: '03',
    title: 'Intelligence in the Physical World',
    blurb: 'Exploring how perception and AI reasoning become reliable physical action — and the hardware systems that make that action possible.',
    items: [
      { label: 'Vision-Language-Action Robotics', to: '/projects/vla-robot-manipulation' },
      { label: 'Power Electronics Lab', to: '/experience/ut-austin-power-electronics' },
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
    // Already on screen at mount (e.g. deep-link to #throughline) → reveal now.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    // Failsafe: never leave the section stuck hidden if the observer misfires.
    const t = setTimeout(() => setInView(true), 2500);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);
  return { ref, inView };
}

function Flow() {
  return (
    <div className="tl-flow hidden md:flex" aria-hidden>
      <span className="tl-comet" />
    </div>
  );
}

function StageCard({ stage, i }: { stage: Stage; i: number }) {
  return (
    <div className="tl-reveal flex-1" style={{ transitionDelay: `${120 + i * 140}ms` }}>
      <div className="tl-card relative h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 overflow-hidden">
        <span className="tl-accent" style={{ transitionDelay: `${300 + i * 140}ms` }} />
        <div className="tl-badge">{stage.index}</div>
        <h3 className="text-lg lg:text-xl font-semibold mb-2">{stage.title}</h3>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">{stage.blurb}</p>
        <div className="flex flex-wrap gap-2">
          {stage.items.map((it) => (
            <Link key={it.to} to={it.to} className="tl-chip">
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ThroughlineSection() {
  const { ref, inView } = useInView();
  return (
    <section id="throughline" className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      {/* Ambient green glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 62% 55% at 50% 62%, rgba(22,163,74,0.12) 0%, rgba(22,163,74,0.04) 42%, transparent 70%)',
        }}
      />

      <div ref={ref} className={`max-w-[1440px] mx-auto px-6 lg:px-16 relative ${inView ? 'tl-in' : ''}`}>
        {/* Header */}
        <div className="mb-12">
          <p className="tl-reveal tl-kicker text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            Information → Intelligence → Physical Action
          </p>
          <h2
            className="tl-reveal mb-4"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: '48px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', transitionDelay: '60ms' }}
          >
            Throughline
          </h2>
          <p className="tl-reveal text-[var(--muted-foreground)] text-lg max-w-3xl leading-relaxed" style={{ transitionDelay: '120ms' }}>
            My work follows a continuous path: from helping people express and understand information, to examining how
            AI selects and represents it, to exploring how intelligent decisions can be executed reliably in the physical
            world — connected throughout by a commitment to integrity and reliability.
          </p>
          <div className="tl-reveal w-20 h-1 bg-[#08874a] dark:bg-[#16A34A] mt-6" style={{ transitionDelay: '180ms' }} />
        </div>

        {/* Animated pipeline */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
          <StageCard stage={STAGES[0]} i={0} />
          <Flow />
          <StageCard stage={STAGES[1]} i={1} />
          <Flow />
          <StageCard stage={STAGES[2]} i={2} />
        </div>

        {/* Recurring questions */}
        <p className="tl-reveal mt-10 text-[var(--foreground)]/85 max-w-3xl leading-relaxed" style={{ transitionDelay: '520ms' }}>
          Across each stage, I return to the same questions: Does this output genuinely help someone? Does the metric
          represent what it claims to measure? Can an intelligent decision be translated into dependable action?
        </p>
      </div>

      <style>{`
        .tl-reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); }
        .tl-in .tl-reveal { opacity: 1; transform: none; }

        .tl-kicker {
          background: linear-gradient(90deg, #0a7d4f, #34d17f, #0a7d4f);
          background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: tlShimmer 4.5s linear infinite;
        }
        @keyframes tlShimmer { to { background-position: 200% center; } }

        .tl-card { transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease; }
        .tl-card:hover { transform: translateY(-6px); border-color: rgba(22,163,74,0.45); box-shadow: 0 18px 44px rgba(22,163,74,0.20); }

        .tl-accent {
          position: absolute; top: 0; left: 0; height: 3px; width: 0;
          background: linear-gradient(90deg, #08874a, #34d17f);
          transition: width .9s cubic-bezier(.2,.7,.2,1);
        }
        .tl-in .tl-accent { width: 100%; }

        .tl-badge {
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          width: 34px; height: 34px; border-radius: 10px; margin-bottom: 12px;
          color: #08874a; background: rgba(22,163,74,0.12); border: 1px solid rgba(22,163,74,0.28);
          animation: tlBadge 2.8s ease-in-out infinite;
        }
        :root[data-theme="dark"] .tl-badge { color: #16A34A; }
        @keyframes tlBadge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.0); }
          50% { box-shadow: 0 0 16px 1px rgba(22,163,74,0.45); }
        }

        .tl-chip {
          padding: 4px 12px; font-size: 12px; border-radius: 9999px;
          color: #08874a; background: rgba(22,163,74,0.10); border: 1px solid rgba(22,163,74,0.22);
          transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
        }
        :root[data-theme="dark"] .tl-chip { color: #16A34A; }
        .tl-chip:hover { transform: translateY(-2px); background: rgba(22,163,74,0.20); box-shadow: 0 0 14px rgba(22,163,74,0.35); }

        .tl-flow { position: relative; align-self: center; width: 46px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, rgba(22,163,74,0.12), rgba(22,163,74,0.5), rgba(22,163,74,0.12)); }
        .tl-comet { position: absolute; top: 50%; left: 0; width: 9px; height: 9px; margin-top: -4.5px; border-radius: 50%;
          background: #16A34A; box-shadow: 0 0 12px 2px rgba(22,163,74,0.85); animation: tlComet 2.4s ease-in-out infinite; }
        @keyframes tlComet { 0% { left: 0; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { left: 100%; opacity: 0; } }

        @media (prefers-reduced-motion: reduce) {
          .tl-reveal { opacity: 1; transform: none; transition: none; }
          .tl-accent { width: 100%; transition: none; }
          .tl-kicker, .tl-badge, .tl-comet { animation: none; }
        }
      `}</style>
    </section>
  );
}
