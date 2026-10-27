import type { Experience, ExperienceCard } from '@shared/siteContentSchema';

// Public copy grounded in the Common App snapshot, parent background letter,
// and existing project records. Keep layout, media, and technical fields intact.
const experienceCopy: Record<string, Partial<Experience>> = {
  'dreamcollege-ai': {
    companyTagline: 'A team-built interview practice module',
    summaryHighlights: [
      'Led a four-person team building DreamCollege.ai’s AI interview practice module during my internship.',
      'Focused on backend development, including the question bank, scheduling, and feedback integration.',
      'Worked with a senior developer to connect the module to the company’s live product.',
    ],
    overviewParagraphs: [
      'During my summer 2025 internship at DreamCollege.ai, I led a four-person team building an AI interview practice module. This was part of the company’s existing college and career-readiness platform.',
      'I worked mainly on backend development and collaborated with a senior developer on integration. The module was added to the live product used by clients. My contribution was one part of a shared delivery.',
    ],
    responsibilities: [
      { title: 'Interview Feedback', body: 'Built backend logic to send practice answers for AI evaluation and return structured feedback. The model’s response is practice advice, not an admissions judgment.' },
      { title: 'Practice Questions', body: 'Worked on the system for storing, categorizing, and retrieving interview questions.' },
      { title: 'Session Scheduling', body: 'Implemented features for booking and managing practice sessions.' },
      { title: 'Backend Integration', body: 'Built APIs for the module and worked with a senior developer to connect it to the larger platform.' },
      { title: 'Team Coordination', body: 'Coordinated the team’s development work and helped follow the module through implementation and integration.' },
    ],
    takeawayParagraphs: [
      'This gave me experience building within a product that already existed. My backend work needed to fit the platform and the work of the other developers, so integration was part of the task from the start.',
      'Leading the team meant keeping track of how the pieces connected, as well as finishing my own part. Working with a senior developer gave me practice taking a module beyond a standalone prototype.',
      'That was different from building Elocutionist independently. Both involved interview practice, but DreamCollege required a shared development process and a working connection to the company’s product.',
    ],
  },
  'onesource-cloud': {
    period: 'Summer 2025 — four-week internship',
    companyTagline: 'An introduction to AI infrastructure and model testing',
    summaryHighlights: [
      'Tested model performance and API costs on an LLM development platform alongside a senior developer.',
      'Helped present the company’s B2B compute services at GenAI Week in Santa Clara in 2025.',
      'Got an early look at the infrastructure and costs behind running AI applications.',
    ],
    heroStats: [
      { value: 'LLM', label: 'Model testing' },
      { value: 'API', label: 'Cost comparisons' },
      { value: '2025', label: 'GenAI Week, Santa Clara' },
      { value: '4', label: 'Weeks of internship' },
    ],
    overviewParagraphs: [
      'My internship at OneSource Cloud was an early introduction to AI and the infrastructure behind it. I worked alongside a senior developer to test model performance and API costs on the company’s LLM development platform.',
      'I also helped present its B2B compute services at GenAI Week in Santa Clara. My role was as an intern and assistant developer, learning from the team while contributing to testing and outreach.',
    ],
    responsibilities: [
      { title: 'Model Testing', body: 'Helped test the LLM development platform with a senior developer.' },
      { title: 'API Costs', body: 'Compared API costs alongside model performance, learning to consider both when looking at an AI service.' },
      { title: 'Infrastructure Exposure', body: 'Learned about the computing infrastructure that supports AI applications through the company’s work.' },
      { title: 'Working With a Developer', body: 'Contributed to testing with guidance from a senior developer rather than independently owning the platform.' },
      { title: 'Learning the Constraints', body: 'Got practical exposure to questions about performance, running costs, and deployment.' },
      { title: 'GenAI Week', body: 'Helped market B2B compute services at the 2025 event in Santa Clara.' },
      { title: 'Working Across Roles', body: 'Took part in both technical testing and explaining the company’s services.' },
    ],
    takeawayParagraphs: [
      'The internship widened my view of AI beyond using a model in an application. Testing performance and API costs gave me a practical reason to look at how a service runs and what it takes to use it.',
      'It was an early learning experience under a senior developer’s guidance. I contributed to the testing while seeing parts of AI infrastructure I had not worked with before.',
    ],
  },
  'ut-austin-power-electronics': {
    period: 'July 2026 — one-week research visit',
    companyTagline: 'Learning hardware assembly, measurement, and testing',
    summaryHighlights: [
      'Spent a week at UT Austin SPEC learning from two graduate students in Professor Alex Huang’s group.',
      'Helped assemble and test battery-related power-electronics components, soldered circuits, and checked signals with an oscilloscope.',
      'Wrote code for hardware testing and measured solar-panel voltage and current under different loads.',
    ],
    heroStats: [
      { value: '1', label: 'Week in the lab' },
      { value: '2', label: 'Graduate mentors' },
      { value: 'Code', label: 'Hardware testing' },
      { value: 'Solar', label: 'Voltage and current measurements' },
    ],
    overviewParagraphs: [
      'I spent a week at UT Austin’s Semiconductor Power Electronics Center, learning from two graduate students in Professor Alex Huang’s group. It was a short research visit and a chance to try work outside my usual software projects.',
      'I helped assemble and test components for battery-related power electronics, soldered circuit components, checked signals with an oscilloscope, and wrote code to test hardware. I also measured how solar-panel output changed under different loads.',
    ],
    responsibilities: [
      { title: 'Assembling Components', body: 'Helped assemble and test power-electronics components under the graduate students’ guidance.' },
      { title: 'Checking Signals', body: 'Used an oscilloscope to inspect signals while testing circuits.' },
      { title: 'Code and Hardware', body: 'Wrote code for hardware testing and worked through unfamiliar lab tasks with my mentors.' },
      { title: 'Solar-Panel Measurements', body: 'Measured voltage and current under different loads to study changes in power output.' },
    ],
    takeawayParagraphs: [
      'Most of my projects had been in software. This visit gave me experience with code, circuits, and physical measurements in the same task.',
      'I was a beginner in much of the lab work, and I learned from the graduate students while trying unfamiliar tools and procedures. The week was an introduction to hardware research, rather than a project I independently led.',
    ],
  },
};

export function refineExperienceCard(experience: ExperienceCard): ExperienceCard {
  const copy = experienceCopy[experience.slug];
  if (!copy) return experience;
  return {
    ...experience,
    companyTagline: copy.companyTagline ?? experience.companyTagline,
    period: copy.period ?? experience.period,
    summaryHighlights: copy.summaryHighlights ?? experience.summaryHighlights,
  };
}

export function refineExperienceCopy(experience: Experience): Experience {
  return { ...experience, ...experienceCopy[experience.slug] };
}
