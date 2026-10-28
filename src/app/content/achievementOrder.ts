import type { AchievementCategory } from '@shared/siteContentSchema';

// Editorial display order, not a claim of an official prestige ranking.
const recognitionOrder = [
  'National Merit Scholarship Program',
  'USACO (USA Computing Olympiad)',
  'IEEE BigData 2026 High School Symposium',
  'Scholastic Writing Awards',
  "President's Volunteer Service Award",
  'National Latin Exam',
  'Dallas Regional Science & Engineering Fair (DRSEF)',
  'STEM Bridge Summer Research Camp',
  'HPHS SciTech Fair',
  'HPHS Sci Tech Fest',
  'National Service Honor',
];

export function orderAchievements(categories: AchievementCategory[]): AchievementCategory[] {
  return categories.map(category => {
    if (category.category !== 'Awards & Honors') return category;
    const rank = (title: string) => {
      const index = recognitionOrder.indexOf(title);
      return index === -1 ? recognitionOrder.length : index;
    };
    return {
      ...category,
      awards: category.awards.slice().sort((a, b) => rank(a.title) - rank(b.title)),
    };
  });
}
