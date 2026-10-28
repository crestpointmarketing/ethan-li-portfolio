import { Link } from 'react-router';

/**
 * Dedicated page for Ethan's U.S. provisional patent filings. Content is a
 * static, factual record of each filing — update the entries here if an
 * application's status changes (e.g. when a non-provisional / utility
 * application is filed). Only publicly shareable details belong here:
 * internal filing-portal references (Patent Center / confirmation numbers)
 * are never published.
 */
type PatentRecord = {
  title: string;
  fields: { label: string; value: string }[];
  status: string;
  coversHeading: string;
  covers: string;
  projectTo: string;
  projectLabel: string;
};

const PATENTS: PatentRecord[] = [
  {
    title:
      'Systems and Methods for Controllable, Evidence-Preserving Speech Repair with Identity-Preserving Synthesis',
    fields: [
      { label: 'Application Number', value: '64/139,376' },
      { label: 'Filing / Receipt Date', value: 'August 23, 2026' },
      { label: 'Inventor', value: 'Ethan Li' },
    ],
    status: 'U.S. Provisional Application Filed',
    coversHeading: 'What It Covers',
    covers:
      'The filing covers SpeakWise’s core speech-repair approach: controllable correction of disfluent speech — including the tunable correction coefficient that balances fluency against naturalness — combined with evidence-preserving processing that keeps the speaker’s original utterance intact alongside the repaired output, and identity-preserving synthesis that renders the corrected speech in the speaker’s own voice.',
    projectTo: '/projects/speakwise',
    projectLabel: 'View the SpeakWise project',
  },
  {
    title:
      'System and Method for Statistical Measurement, Scoring, and Predictive Optimization of Entity Visibility in Generative Artificial-Intelligence Search Engines',
    fields: [
      { label: 'Application Number', value: '64/119,527' },
      { label: 'Filing / Receipt Date', value: 'July 27, 2026' },
      { label: 'Sole Inventor', value: 'Ethan Li' },
    ],
    status: 'U.S. Provisional Application Filed',
    coversHeading: 'What It Covers',
    covers:
      'The filing covers PomeloLabs.ai’s multi-model GEO (Generative Engine Optimization) evaluation system — a methodology and model framework for statistically measuring, scoring, and predictively optimizing how a brand or entity appears in AI-generated search answers. It reduces prompt and model bias through repeated sampling, evidence-based scoring, confidence measurement, and auditable cross-platform analysis.',
    projectTo: '/projects/pomelo-labs',
    projectLabel: 'View the PomeloLabs.ai project',
  },
];

export default function Patent() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
          U.S. Provisional Patents
        </h1>
        <p className="text-[var(--muted-foreground)] mb-12">
          Two provisional patent applications filed with the USPTO in 2026.
        </p>

        {PATENTS.map((p) => (
          <article key={p.title} className="mb-16">
            {/* Status pill */}
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] border border-[#08874a]/25 dark:border-[#16A34A]/25">
              Patent Pending
            </span>
            <p className="text-[var(--muted-foreground)] mb-6 text-sm">{p.status}</p>

            {/* Invention title */}
            <div className="rounded-2xl border border-[#08874a]/25 dark:border-[#16A34A]/25 bg-gradient-to-br from-[#08874a]/10 dark:from-[#16A34A]/10 to-transparent p-8 mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#08874a] dark:text-[#16A34A] mb-3">
                Title of Invention
              </p>
              <p className="text-xl leading-relaxed text-[var(--foreground)]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                {p.title}
              </p>
            </div>

            {/* Filing details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)] mb-8">
              {p.fields.map((f) => (
                <div key={f.label} className="bg-[var(--card)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                    {f.label}
                  </p>
                  <p className="text-[var(--foreground)] font-medium break-words">{f.value}</p>
                </div>
              ))}
            </div>

            {/* What it covers */}
            <section className="mb-8">
              <h2 className="text-2xl mb-4 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span className="w-2 h-7 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
                {p.coversHeading}
              </h2>
              <p className="text-[var(--foreground)]/85 leading-relaxed">{p.covers}</p>
            </section>

            <Link
              to={p.projectTo}
              className="inline-block px-6 py-2.5 bg-[#08874a] dark:bg-[#16A34A] text-white text-sm font-semibold rounded-lg hover:bg-[#0a9d56] dark:hover:bg-[#15803D] transition-colors duration-200"
            >
              {p.projectLabel} &rarr;
            </Link>
          </article>
        ))}

        <div className="pt-8 border-t border-[var(--border)]">
          <Link
            to="/"
            className="text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#16A34A] text-sm"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
