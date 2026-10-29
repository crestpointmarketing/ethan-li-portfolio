import type { Experience, ExperienceCard } from '@shared/siteContentSchema';
import { commonAppCommitments } from './commonAppFacts';

// Public copy grounded in the Common App snapshot, parent background letter,
// and existing project records. Keep layout, media, and technical fields intact.
const experienceCopy: Record<string, Partial<Experience>> = {
  'dreamcollege-ai': {
    company: 'DreamCollege.ai',
    role: 'Lead Developer & Team Leader',
    period: 'Summer 2025 · 6 weeks · Grade 11',
    companyTagline: 'An AI interview practice module integrated into a live client product',
    heroStats: [
      { value: '4', label: 'Team members' },
      { value: '6', label: 'Weeks of internship' },
      { value: '25', label: 'Hours per week' },
      { value: 'Live', label: 'Module used by clients' },
    ],
    summaryHighlights: [
      'Led a four-person team building DreamCollege.ai’s AI interview practice module during my internship.',
      'Built backend features for organizing practice questions, scheduling sessions, and returning structured feedback.',
      'Worked with a senior developer to integrate the module into the live product used by clients.',
    ],
    overviewParagraphs: [
      'During my six-week summer 2025 internship, I led a four-person team building an AI interview practice module for DreamCollege.ai’s college and career-readiness platform.',
      'I built backend features for questions, sessions, and feedback, and worked with a senior developer to integrate the module into the live product used by clients.',
    ],
    responsibilities: [
      { title: 'Interview Feedback', body: 'Built backend logic to send practice answers for AI evaluation and return structured feedback. The model’s response is practice advice, not an admissions judgment.' },
      { title: 'Practice Questions', body: 'Worked on the system for storing, categorizing, and retrieving interview questions.' },
      { title: 'Session Scheduling', body: 'Implemented features for booking and managing practice sessions.' },
      { title: 'Backend Integration', body: 'Built APIs for the module and worked with a senior developer to connect it to the larger platform.' },
      { title: 'Team Coordination', body: 'Coordinated the team’s development work and helped follow the module through implementation and integration.' },
    ],
    takeawayParagraphs: [
      'Organizing questions and structuring feedback showed me how information shapes a practice session. My backend work also had to fit the existing platform and the other developers’ work.',
      'Leading the team meant following the connections between features as well as finishing my own code.',
      'Unlike my independent work on Elocutionist, this module needed a shared development process and integration into a client-facing product.',
    ],
  },
  'onesource-cloud': {
    company: 'OneSource Cloud',
    role: 'Intern & Assistant Developer',
    period: 'Summer 2025 · 4 weeks · Grade 11',
    companyTagline: 'Learning AI infrastructure through model and API-cost testing',
    highlights: [
      { title: 'GenAI Week · Santa Clara · 2025', body: 'I helped market OneSource Cloud’s B2B compute services at the event, alongside my supervised model-testing work.' },
      { title: 'Comparing Models and Costs', body: 'I tested model performance and API costs with a senior developer, learning that an AI feature has to be practical to run as well as useful.' },
    ],
    techColumns: [
      { heading: 'Model Testing', items: ['LLM platform testing with a senior developer', 'Model performance comparisons', 'API-cost comparisons'] },
      { heading: 'Infrastructure & Communication', items: ['AI application deployment', 'B2B compute services', 'Explaining technical services at an industry event'] },
    ],
    summaryHighlights: [
      'Tested model performance and API costs on an LLM development platform alongside a senior developer.',
      'Helped present the company’s B2B compute services at GenAI Week in Santa Clara in 2025.',
      'Got an early look at the infrastructure and costs behind running AI applications.',
    ],
    heroStats: [
      { value: '32', label: 'Hours per week' },
      { value: 'API', label: 'Cost comparisons' },
      { value: '2025', label: 'GenAI Week, Santa Clara' },
      { value: '4', label: 'Weeks of internship' },
    ],
    overviewParagraphs: [
      'At OneSource Cloud, a Texas-based private AI infrastructure company, I tested model performance and API costs on its LLM development platform with a senior developer.',
      'During the four-week summer 2025 internship, I also helped market B2B compute services at GenAI Week in Santa Clara.',
    ],
    responsibilities: [
      { title: 'Model Testing', body: 'Helped test the LLM development platform with a senior developer.' },
      { title: 'API Costs', body: 'Compared API costs alongside model performance, learning to consider both when looking at an AI service.' },
      { title: 'Infrastructure Exposure', body: 'Learned about the computing infrastructure that supports AI applications through the company’s work.' },
      { title: 'Working With a Developer', body: 'Worked through testing tasks with a senior developer and learned how the team checked results.' },
      { title: 'Learning the Constraints', body: 'Got practical exposure to questions about performance, running costs, and deployment.' },
      { title: 'GenAI Week', body: 'Helped market B2B compute services at the 2025 event in Santa Clara.' },
      { title: 'Working Across Roles', body: 'Took part in both technical testing and explaining the company’s services.' },
    ],
    takeawayParagraphs: [
      'Comparing performance with API costs helped me see the trade-offs behind an AI feature: it needs to be useful and practical to run.',
      'Working with a senior developer introduced me to model testing and infrastructure decisions beyond my own applications.',
    ],
  },
  'ut-austin-power-electronics': {
    company: 'UT Austin Semiconductor Power Electronics Center (SPEC)',
    role: 'Student Research Assistant',
    period: 'July 2026 · 1 week · Grade 12',
    companyTagline: 'Learning hardware assembly, measurement, and testing',
    highlights: [
      { title: 'Checking a Waveform', body: 'I used an oscilloscope to see how a circuit’s output compared with the signal we expected. It helped me connect the physical build to what I was measuring.' },
      { title: 'Following a Schematic', body: 'Working on an Ethernet-to-fiber converter meant checking the board against its schematic and a working reference, with my mentors’ guidance.' },
      { title: 'Measuring Solar Output', body: 'Changing the load on a solar panel let me measure voltage and current and see where its power output peaked.' },
    ],
    summaryHighlights: [
      'Spent a week at UT Austin SPEC learning from two graduate students in Professor Alex Huang’s group.',
      'Helped assemble and test power-electronics components for next-generation battery cells, soldered circuits, and checked signals with an oscilloscope.',
      'Wrote code for hardware testing and measured solar-panel voltage and current under different loads.',
    ],
    heroStats: [
      { value: '1', label: 'Week in the lab' },
      { value: '2', label: 'Graduate mentors' },
      { value: '32', label: 'Hours per week' },
      { value: 'Solar', label: 'Voltage and current measurements' },
    ],
    overviewParagraphs: [
      'I spent one week as a student research assistant at UT Austin SPEC with two graduate mentors in Professor Alex Huang’s group.',
      'I helped assemble and test power-electronics components for next-generation battery cells, soldered circuits, checked signals with an oscilloscope, and wrote hardware-test code. I also measured UT Austin solar-panel output under different loads.',
    ],
    responsibilities: [
      { title: 'Assembling Components', body: 'Helped assemble and test power-electronics components under the graduate students’ guidance.' },
      { title: 'Checking Signals', body: 'Used an oscilloscope to inspect signals while testing circuits.' },
      { title: 'Code and Hardware', body: 'Wrote code for hardware testing and worked through unfamiliar lab tasks with my mentors.' },
      { title: 'Solar-Panel Measurements', body: 'Measured voltage and current under different loads to study changes in power output.' },
    ],
    takeawayParagraphs: [
      'Most of my projects had been in software. This visit gave me experience with code, circuits, and physical measurements in the same task.',
      'My mentors helped me connect the circuit I was building to the measurement I was trying to make. I learned to check a physical result against what the code and schematic led me to expect.',
    ],
  },
};

export function refineExperienceCard(experience: ExperienceCard): ExperienceCard {
  const copy = experienceCopy[experience.slug];
  if (!copy) return experience;
  return {
    ...experience,
    company: copy.company ?? experience.company,
    role: copy.role ?? experience.role,
    companyTagline: copy.companyTagline ?? experience.companyTagline,
    period: copy.period ?? experience.period,
    summaryHighlights: [...(copy.summaryHighlights ?? experience.summaryHighlights), commonAppCommitments[experience.slug]].filter(Boolean),
  };
}

export function refineExperienceCopy(experience: Experience): Experience {
  const refined = { ...experience, ...experienceCopy[experience.slug] };
  const commitment = commonAppCommitments[experience.slug];
  return { ...refined, overviewParagraphs: [...refined.overviewParagraphs, ...(commitment ? [commitment] : [])] };
}
