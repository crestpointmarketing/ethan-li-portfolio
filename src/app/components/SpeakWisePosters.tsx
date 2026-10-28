const posters = [
  {
    phase: 'Phase 1',
    title: 'Speech-Repair Prototype',
    description: 'Original science fair poster for the early speech-repair prototype.',
  },
  {
    phase: 'Phase 2',
    title: 'Child Speech Recognition Research',
    description: 'New summary poster based on the Phase 2 research manuscript, including reported results and their scope.',
  },
];

export function SpeakWisePosters({ phase1Url }: { phase1Url: string }) {
  return (
    <section aria-label="SpeakWise Phase 1 and Phase 2 posters" className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {posters.map((poster, index) => {
        const url = index === 0 ? phase1Url : '/project-posters/speakwise-phase2-poster.png';
        return (
          <figure key={poster.phase} className="flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]">
            <figcaption className="px-5 py-4">
              <h2 className="text-xl font-semibold text-[#08874a] dark:text-[#16A34A]">{poster.phase}</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{poster.title}</p>
            </figcaption>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${poster.phase} poster at full size`}>
              <img src={url} alt={`SpeakWise ${poster.phase} — ${poster.title}`} width={2400} height={1800} className="w-full h-auto block bg-white" />
            </a>
            <div className="flex flex-col flex-1 items-start px-5 py-4 text-sm text-[var(--muted-foreground)]">
              <p className="mb-3">{poster.description}</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="mt-auto text-[#08874a] dark:text-[#16A34A] underline underline-offset-4">
                Open {poster.phase} poster
              </a>
            </div>
          </figure>
        );
      })}
    </section>
  );
}
