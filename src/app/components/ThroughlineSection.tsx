import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

/**
 * "Throughline" — the narrative spine (Information → Intelligence → Physical
 * Action), staged as an animated dark "energy pipeline": a glowing gradient-
 * bordered panel, three pulsing nodes connected by a flowing energy line with a
 * running comet, glassy cards, and scroll-reveal. Echoes the hero's aesthetic.
 * Copy is authored — keep it in sync with the portfolio narrative.
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
    blurb: 'Exploring how perception and AI reasoning become reliable physical action — and the hardware systems that make it possible.',
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
      { threshold: 0.12 },
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

function Node({ stage, i }: { stage: Stage; i: number }) {
  return (
    <div className="tl-col tl-reveal" style={{ transitionDelay: `${140 + i * 160}ms` }}>
      <div className="tl-orb">
        <span>{stage.index}</span>
      </div>
      <div className="tl-card">
        <h3 className="tl-card-title">{stage.title}</h3>
        <p className="tl-card-blurb">{stage.blurb}</p>
        <div className="tl-chips">
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 60%, rgba(22,163,74,0.14) 0%, rgba(22,163,74,0.04) 45%, transparent 72%)',
        }}
      />

      <div ref={ref} className={`max-w-[1440px] mx-auto px-6 lg:px-16 relative ${inView ? 'tl-in' : ''}`}>
        {/* Header */}
        <div className="mb-10">
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
        </div>

        {/* Energy-pipeline panel */}
        <div className="tl-panel tl-reveal" style={{ transitionDelay: '180ms' }}>
          <div className="tl-panel-inner">
            <div className="tl-pipe">
              {/* Flowing energy line (desktop) */}
              <div className="tl-track" aria-hidden>
                <span className="tl-comet2" />
              </div>
              <div className="tl-nodes">
                {STAGES.map((s, i) => (
                  <Node key={s.index} stage={s} i={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recurring questions */}
        <p className="tl-reveal mt-10 text-[var(--foreground)]/85 max-w-3xl leading-relaxed" style={{ transitionDelay: '260ms' }}>
          Across each stage, I return to the same questions: Does this output genuinely help someone? Does the metric
          represent what it claims to measure? Can an intelligent decision be translated into dependable action?
        </p>
      </div>

      <style>{`
        @property --tl-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }

        .tl-reveal { opacity: 0; transform: translateY(22px); transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1); }
        .tl-in .tl-reveal { opacity: 1; transform: none; }

        .tl-kicker {
          background: linear-gradient(90deg, #0a7d4f, #34d17f, #0a7d4f);
          background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: tlShimmer 4.5s linear infinite;
        }
        @keyframes tlShimmer { to { background-position: 200% center; } }

        /* Dark showcase panel with rotating gradient-glow border */
        .tl-panel {
          position: relative; border-radius: 28px; padding: 1.5px; overflow: hidden;
          background:
            conic-gradient(from var(--tl-angle),
              rgba(22,163,74,0) 0deg, rgba(22,163,74,0.75) 55deg, rgba(52,211,153,0.15) 110deg,
              rgba(22,163,74,0) 180deg, rgba(22,163,74,0.6) 260deg, rgba(22,163,74,0) 360deg);
          animation: tlAngle 9s linear infinite;
          box-shadow: 0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(22,163,74,0.15);
        }
        @keyframes tlAngle { to { --tl-angle: 360deg; } }
        .tl-panel-inner {
          position: relative; border-radius: 27px; padding: 42px 28px 46px;
          background: radial-gradient(120% 120% at 50% 0%, #0d1a14 0%, #0a0e12 55%, #08090c 100%);
          overflow: hidden;
        }
        .tl-panel-inner::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(60% 80% at 50% 40%, rgba(22,163,74,0.16), transparent 70%);
        }

        .tl-pipe { position: relative; }
        .tl-nodes { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 40px; }
        @media (min-width: 768px) { .tl-nodes { flex-direction: row; gap: 20px; } }
        .tl-col { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }

        /* Flowing energy line — connects the three orbs on desktop */
        .tl-track {
          display: none; position: absolute; z-index: 1; top: 30px; left: 16.6%; right: 16.6%; height: 3px; border-radius: 3px;
          background: linear-gradient(90deg, rgba(22,163,74,0.15), rgba(22,163,74,0.6), rgba(22,163,74,0.15));
          box-shadow: 0 0 14px rgba(22,163,74,0.5);
        }
        @media (min-width: 768px) { .tl-track { display: block; } }
        .tl-track::before {
          content: ''; position: absolute; inset: 0; border-radius: 3px;
          background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0 5px, transparent 5px 16px);
          background-size: 32px 100%; opacity: .45; animation: tlMarch 1.1s linear infinite;
        }
        @keyframes tlMarch { to { background-position: 32px 0; } }
        .tl-comet2 {
          position: absolute; top: 50%; left: 0; width: 12px; height: 12px; margin-top: -6px; border-radius: 50%;
          background: #eafff3; box-shadow: 0 0 18px 5px rgba(22,163,74,0.95); animation: tlRun 3.2s ease-in-out infinite;
        }
        @keyframes tlRun { 0% { left: 0; opacity: 0; } 8% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }

        /* Glowing numbered node */
        .tl-orb {
          position: relative; z-index: 2; width: 60px; height: 60px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 17px; color: #fff;
          background: linear-gradient(150deg, #22c55e, #0a5c34);
          box-shadow: 0 0 0 6px rgba(22,163,74,0.10), 0 8px 26px rgba(22,163,74,0.55);
        }
        .tl-orb::after {
          content: ''; position: absolute; inset: -7px; border-radius: 22px; border: 1px solid rgba(52,211,153,0.5);
          animation: tlHalo 2.6s ease-in-out infinite;
        }
        @keyframes tlHalo { 0%,100% { opacity: .25; transform: scale(1); } 50% { opacity: .85; transform: scale(1.14); } }

        /* Glassy stage card */
        .tl-card {
          margin-top: 20px; width: 100%; max-width: 340px; padding: 18px 18px 20px; border-radius: 18px;
          background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 12px 34px rgba(0,0,0,0.4);
          transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease;
        }
        .tl-card:hover { transform: translateY(-6px); border-color: rgba(22,163,74,0.55); box-shadow: 0 20px 48px rgba(22,163,74,0.28); }
        .tl-card-title { color: #fff; font-weight: 600; font-size: 17px; line-height: 1.25; margin-bottom: 8px; }
        .tl-card-blurb { color: rgba(255,255,255,0.62); font-size: 13.5px; line-height: 1.55; margin-bottom: 14px; }
        .tl-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tl-chip {
          padding: 5px 12px; font-size: 12px; border-radius: 9999px; color: #7cf0ad;
          background: rgba(22,163,74,0.14); border: 1px solid rgba(22,163,74,0.3);
          transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .tl-chip:hover { transform: translateY(-2px); background: rgba(22,163,74,0.26); box-shadow: 0 0 16px rgba(22,163,74,0.5); }

        @media (prefers-reduced-motion: reduce) {
          .tl-reveal { opacity: 1; transform: none; transition: none; }
          .tl-panel, .tl-kicker, .tl-comet2, .tl-track::before, .tl-orb::after { animation: none; }
        }
      `}</style>
    </section>
  );
}
