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
      'During my summer 2025 internship at DreamCollege.ai, I led a four-person team building an AI interview practice module. This was part of the company’s existing college and career-readiness platform.',
      'I worked mainly on backend development and collaborated with a senior developer on integration. The module was added to the live product used by clients. I led the team while contributing backend code and working through integration with the senior developer.',
    ],
    responsibilities: [
      { title: 'Interview Feedback', body: 'Built backend logic to send practice answers for AI evaluation and return structured feedback. The model’s response is practice advice, not an admissions judgment.' },
      { title: 'Practice Questions', body: 'Worked on the system for storing, categorizing, and retrieving interview questions.' },
      { title: 'Session Scheduling', body: 'Implemented features for booking and managing practice sessions.' },
      { title: 'Backend Integration', body: 'Built APIs for the module and worked with a senior developer to connect it to the larger platform.' },
      { title: 'Team Coordination', body: 'Coordinated the team’s development work and helped follow the module through implementation and integration.' },
    ],
    takeawayParagraphs: [
      'This gave me experience building within a product that already existed. My backend work needed to fit the platform and the work of the other developers, so integration was part of the task from the start. Organizing questions and structuring feedback also showed me how the way information is presented can shape a practice session.',
      'Leading the team meant keeping track of how the pieces connected, as well as finishing my own part. Working with a senior developer gave me practice taking a module beyond a standalone prototype.',
      'That was different from building Elocutionist independently. Both involved interview practice, but DreamCollege required a shared development process and a working connection to the company’s product.',
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
      'OneSource Cloud is a Texas-based private AI infrastructure company. My internship there was an early introduction to the systems behind AI applications. I worked alongside a senior developer to test model performance and API costs on the company’s LLM development platform.',
      'I also helped present its B2B compute services at GenAI Week in Santa Clara. My role was as an intern and assistant developer, learning from the team while contributing to testing and outreach.',
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
      'Testing performance and API costs helped me see that an information tool also depends on the system behind it. A feature has to be useful to someone and practical to run.',
      'It was an early learning experience under a senior developer’s guidance. I contributed to the testing while seeing parts of AI infrastructure I had not worked with before.',
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
      'I spent a week at UT Austin’s Semiconductor Power Electronics Center, learning from two graduate students in Professor Alex Huang’s group. It was a short research visit and a chance to try work outside my usual software projects.',
      'I helped assemble and test power-electronics components for next-generation battery cells, soldered circuit components, checked signals with an oscilloscope, and wrote code to test hardware. I also measured how solar-panel output changed under different loads.',
    ],
    responsibilities: [
      { title: 'Assembling Components', body: 'Helped assemble and test power-electronics components under the graduate students’ guidance.' },
      { title: 'Checking Signals', body: 'Used an oscilloscope to inspect signals while testing circuits.' },
      { title: 'Code and Hardware', body: 'Wrote code for hardware testing and worked through unfamiliar lab tasks with my mentors.' },
      { title: 'Solar-Panel Measurements', body: 'Measured voltage and current under different loads to study changes in power output.' },
    ],
    takeawayParagraphs: [
      'Most of my projects had been in software. This visit gave me experience with code, circuits, and physical measurements in the same task.',
      'I was a beginner in much of the lab work, and I learned from the graduate students while trying unfamiliar tools and procedures. Having two graduate mentors helped me connect the circuit I was building to the measurement I was trying to make.',
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
