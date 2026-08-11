import { Link } from 'react-router';

/**
 * Dedicated page for the U.S. provisional patent covering the Pomelo GEO
 * evaluation system. Content is a static, factual record of the filing —
 * update the fields here if the application status changes (e.g. when a
 * non-provisional / utility application is filed).
 */
const PATENT = {
  title:
    'System and Method for Statistical Measurement, Scoring, and Predictive Optimization of Entity Visibility in Generative Artificial-Intelligence Search Engines',
  applicationNumber: '64/119,527',
  patentCenterNumber: '79336791',
  filingDate: 'July 26, 2026',
  inventor: 'Ethan Li',
  status: 'U.S. Provisional Application Filed',
};

const FIELDS: { label: string; value: string }[] = [
  { label: 'Application Number', value: PATENT.applicationNumber },
  { label: 'Patent Center Number', value: PATENT.patentCenterNumber },
  { label: 'Filing / Receipt Date', value: PATENT.filingDate },
  { label: 'Sole Inventor', value: PATENT.inventor },
];

export default function Patent() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Status pill */}
        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#08874a]/10 dark:bg-[#16A34A]/10 text-[#08874a] dark:text-[#16A34A] border border-[#08874a]/25 dark:border-[#16A34A]/25">
          Patent Pending
        </span>

        <h1 className="text-4xl mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
          U.S. Provisional Patent
        </h1>
        <p className="text-[var(--muted-foreground)] mb-10">{PATENT.status}</p>

        {/* Invention title */}
        <div className="rounded-2xl border border-[#08874a]/25 dark:border-[#16A34A]/25 bg-gradient-to-br from-[#08874a]/10 dark:from-[#16A34A]/10 to-transparent p-8 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#08874a] dark:text-[#16A34A] mb-3">
            Title of Invention
          </p>
          <p className="text-xl leading-relaxed text-[var(--foreground)]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            {PATENT.title}
          </p>
        </div>

        {/* Filing details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)] mb-10">
          {FIELDS.map((f) => (
            <div key={f.label} className="bg-[var(--card)] p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                {f.label}
              </p>
              <p className="text-[var(--foreground)] font-medium break-words">{f.value}</p>
            </div>
          ))}
        </div>

        {/* What it covers */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <span className="w-2 h-7 bg-[#08874a] dark:bg-[#16A34A] rounded-full" />
            What It Covers
          </h2>
          <p className="text-[var(--foreground)]/85 leading-relaxed">
            The filing covers Pomelo Labs&rsquo; multi-model GEO (Generative Engine Optimization) evaluation system — a
            methodology and model framework for statistically measuring, scoring, and predictively optimizing how a
            brand or entity appears in AI-generated search answers. It reduces prompt and model bias through repeated
            sampling, evidence-based scoring, confidence measurement, and auditable cross-platform analysis.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-[var(--border)]">
          <Link
            to="/projects/pomelo-labs"
            className="px-6 py-2.5 bg-[#08874a] dark:bg-[#16A34A] text-white text-sm font-semibold rounded-lg hover:bg-[#0a9d56] dark:hover:bg-[#15803D] transition-colors duration-200"
          >
            View the Pomelo Labs project &rarr;
          </Link>
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
