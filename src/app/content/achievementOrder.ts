import type { AchievementCategory } from '@shared/siteContentSchema';

// Order and grouping follow the Honors section of the Common App preview.
const commonAppOrder = [
  'IEEE BigData 2026 High School Symposium',
  'USACO (USA Computing Olympiad)',
  'National Merit Scholarship Program',
  'Scholastic Writing Awards',
];
const displayNames: Record<string, string> = {
  'USACO (USA Computing Olympiad)': 'USA Computing Olympiad (USACO)',
  'Scholastic Writing Awards': 'Scholastic Art and Writing Awards',
};
const regionalFair = 'Dallas Regional Science & Engineering Fair (DRSEF)';
const schoolFair = 'HPHS SciTech Fair';

export function orderAchievements(categories: AchievementCategory[]): AchievementCategory[] {
  return categories.map(category => {
    if (category.category !== 'Awards & Honors') return category;
    const primary = commonAppOrder.flatMap(title => {
      const award = category.awards.find(item => item.title === title);
      return award ? [{ ...award, title: displayNames[title] ?? award.title }] : [];
    });
    const regional = category.awards.find(award => award.title === regionalFair);
    const school = category.awards.find(award => award.title === schoolFair);
    if (regional && school) {
      primary.push({
        ...regional,
        title: 'SpeakWise — Science Fair Recognition',
        achievement: `DRSEF — ${regional.achievement}; HPHS SciTech Fair — ${school.achievement}`,
        description: 'SpeakWise recognition at the Dallas Regional Science & Engineering Fair and Highland Park High School SciTech Fair.',
      });
    } else {
      if (regional) primary.push(regional);
      if (school) primary.push(school);
    }
    // Preserve additional website honors without treating them as Common App entries.
    const additional = category.awards.filter(award =>
      !commonAppOrder.includes(award.title) && award.title !== regionalFair && award.title !== schoolFair,
    );
    return { ...category, awards: [...primary, ...additional] };
  });
}
