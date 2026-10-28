import { commonAppCommitments } from './commonAppFacts';
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
const commonAppGrades: Record<string, string> = {
  'IEEE BigData 2026 High School Symposium': 'Grade 12',
  'USACO (USA Computing Olympiad)': 'Grade 11',
  'National Merit Scholarship Program': 'Grade 12',
  'Scholastic Writing Awards': 'Grade 9',
};
const regionalFair = 'Dallas Regional Science & Engineering Fair (DRSEF)';
const schoolFair = 'HPHS SciTech Fair';

export function orderAchievements(categories: AchievementCategory[]): AchievementCategory[] {
  return categories.map(category => {
    if (category.category === 'Academic & Leadership') {
      return {
        ...category,
        awards: category.awards.map(award => {
          if (award.title === 'Youth Board of Governors') {
            return {
              ...award,
              title: 'Asian Culture and Education Society USA (ACAESUSA)',
              achievement: 'President of Computer Science Chapter',
              date: 'Grades 9–11',
              description: 'Volunteered at fundraisers and events, taught computer-science skills, and built ActivityHub for event management and volunteer registration/tracking. ' + commonAppCommitments.activityhub,
            };
          }
          if (award.title === 'Highland Park Youth Toastmasters (HPYT)') {
            return { ...award, achievement: 'Member & Peer Evaluator', date: 'Grades 10–12 · School year', description: 'Practiced public speaking weekly and evaluated peers’ speeches, giving constructive feedback on clarity and articulation. ' + commonAppCommitments.hpyt };
          }
          if (award.title === 'AI Club & Coding Interest Group') return { ...award, description: 'Took part in student groups focused on AI and programming.' };
          return award;
        }),
      };
    }
    if (category.category === 'Technical Development') {
      return { ...category, awards: category.awards.map(award => award.title === 'Hackathon — Prompt Design & Agentic AI Systems'
        ? { ...award, description: 'Participated in prompt-design and AI-agent activities.' } : award) };
    }
    if (category.category !== 'Awards & Honors') return category;
    const primary: AchievementCategory['awards'] = commonAppOrder.flatMap(title => {
      const award = category.awards.find(item => item.title === title);
      const descriptions: Record<string, string> = {
        'IEEE BigData 2026 High School Symposium': 'International recognition. Sole-authored paper, “SpeakWise: Repair-Ready Child Speech Recognition via Verbatim Evidence Preservation,” accepted for presentation on December 17, 2026, in Phoenix, AZ.',
        'USACO (USA Computing Olympiad)': 'National recognition: Gold Division in the USA Computing Olympiad.',
        'National Merit Scholarship Program': 'National recognition: National Merit Semifinalist based on PSAT/NMSQT performance.',
        'Scholastic Writing Awards': 'State/Regional recognition: Regional Silver Key for critical essay writing.',
      };
      return award ? [{ ...award, title: displayNames[title] ?? award.title, date: commonAppGrades[title], description: descriptions[title] }] : [];
    });
    const regional = category.awards.find(award => award.title === regionalFair);
    const school = category.awards.find(award => award.title === schoolFair);
    if (regional && school) {
      primary.push({
        ...regional,
        title: 'SpeakWise — Science Fair Recognition',
        date: 'Grade 11',
        achievement: `DRSEF — ${regional.achievement}; HPHS SciTech Fair — ${school.achievement}`,
        description: 'School and State/Regional recognition: Honorable Mention at DRSEF and first place at HPHS SciTech Fair, including a $3,000 award.',
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
