import { Link } from 'react-router';

/**
 * "Throughline" — the narrative spine of the work: Information → Intelligence →
 * Physical Action, connected by a commitment to integrity and reliability.
 * Statement + a three-stage visual arc mapping each project/experience to its
 * movement in the arc. Copy is authored, not derived — keep it in sync with the
 * portfolio narrative rather than editing casually.
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

function Arrow() {
  return (
    <div className="flex items-center justify-center text-[#08874a] dark:text-[#16A34A] rotate-90 md:rotate-0 py-1 md:py-0">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h15" />
      </svg>
    </div>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  return (
    <div className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[#08874a]/30 dark:hover:border-[#16A34A]/30 transition-colors duration-500">
      <div className="text-xs font-semibold tracking-widest text-[#08874a]/70 dark:text-[#16A34A]/70 mb-2">
        {stage.index}
      </div>
      <h3 className="text-lg lg:text-xl font-semibold mb-2">{stage.title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">{stage.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {stage.items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="px-3 py-1 text-xs rounded-full bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] border border-[#08874a]/20 dark:border-[#16A34A]/20 hover:bg-[#08874a]/20 dark:hover:bg-[#16A34A]/20 transition-colors"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ThroughlineSection() {
  return (
    <section id="throughline" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#08874a] dark:text-[#16A34A] mb-3">
            Information → Intelligence → Physical Action
          </p>
          <h2
            className="mb-4"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: '48px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Throughline
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-3xl leading-relaxed">
            My work follows a continuous path: from helping people express and understand information, to examining how
            AI selects and represents it, to exploring how intelligent decisions can be executed reliably in the physical
            world — connected throughout by a commitment to integrity and reliability.
          </p>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#16A34A] mt-6" />
        </div>

        {/* Visual arc */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-4">
          <StageCard stage={STAGES[0]} />
          <Arrow />
          <StageCard stage={STAGES[1]} />
          <Arrow />
          <StageCard stage={STAGES[2]} />
        </div>

        {/* The recurring questions */}
        <p className="mt-10 text-[var(--foreground)]/85 max-w-3xl leading-relaxed">
          Across each stage, I return to the same questions: Does this output genuinely help someone? Does the metric
          represent what it claims to measure? Can an intelligent decision be translated into dependable action?
        </p>
      </div>
    </section>
  );
}
