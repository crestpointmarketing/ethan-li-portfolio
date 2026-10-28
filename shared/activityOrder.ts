// Relative order from the October 14 Common App activity preview. Public
// projects and experiences keep their existing, separate page sections.
const commonAppActivities = [
  'speakwise',
  'pomelo-labs',
  'expressive',
  'activityhub',
  'dreamcollege-ai',
  'onesource-cloud',
  'vla-robot-manipulation',
  'ut-austin-power-electronics',
  'zeitgeist',
];

export function orderByCommonApp<T extends { slug: string }>(items: readonly T[]): T[] {
  const rank = (slug: string) => {
    const index = commonAppActivities.indexOf(slug);
    return index < 0 ? commonAppActivities.length : index;
  };
  // Sort a copy; additional work stays after the application entries in its
  // original relative order, and unpublished records are never introduced.
  return items.slice().sort((a, b) => rank(a.slug) - rank(b.slug));
}
