import type { ProjectCard } from '@shared/projectSchema';
import { commonAppCommitments } from './commonAppFacts';

// Homepage wording only; CMS links, media, and publication state stay intact.
export const homepageProjectCopy: Record<string, Partial<ProjectCard>> = {
  speakwise: {
    title: 'SpeakWise — Child Speech Recognition Research',
    subtitles: ['What does AI miss when a child speaks?', 'Researcher & Developer · Independent Speech Research · Patent Pending'],
    period: 'Grades 10–12 · Year-round',
    cardHighlights: [
      'I built adjustable speech correction and voice cloning after seeing a friend and my younger brother face speech difficulties. Their feedback shifted my focus toward preserving what a child says.',
      'I adapted wav2vec 2.0 with CTC using 116.0 hours of audio from 1,738 children. Held-out evaluation: 21.74% word error rate and 69.1% recall for marked repetitions and fillers.',
      'First-named inventor on the U.S. provisional application filed August 23, 2026; sole-author paper accepted for the IEEE BigData 2026 High School Symposium.',
    ],
    cardTeaser: {
      label: 'Research Focus',
      items: [
        'Phase 1 explored speech repair; Phase 2 asks whether a recognizer can keep the words, repetitions, and fillers a child actually used.',
        'IEEE presentation scheduled for December 17, 2026, in Phoenix. Research results do not establish clinical effectiveness.',
      ],
    },
  },
  'pomelo-labs': {
    title: 'PomeloLabs.ai — AI Search Analytics & Optimization Platform',
    subtitles: ['A subscription-based AI marketing platform used by businesses', 'Founder & Lead Developer · GEO Analytics · Patent Pending'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'I independently built a live AI marketing platform with active business users on subscriptions and 200+ articles published. For one B2B client, AI visibility increased from 21% to 63% (reported October 2026).',
      'I built AI-search analytics, content workflows, and integrations. My mother’s company, CrestPoint Marketing, handles marketing and deployed it at OneSource Cloud.',
      'I designed the GEO evaluation framework covered by the U.S. provisional application filed July 27, 2026, measuring how AI answers describe a business.',
    ],
  },
  'vla-robot-manipulation': {
    title: 'VLA Robotics — Learning Robot Manipulation with Vision-Language-Action Models',
    subtitles: ['Studying how robot manipulation policies generalize across environments', 'Research Team Leader · UT Dallas STEM Bridge Program · 3rd Place of 20+ Teams'],
    period: 'Summer 2026 · 6 weeks · Grade 12',
    cardHighlights: [
      'I led a five-person team at UT Dallas STEM Bridge studying robotic arms that act on camera images and instructions. We placed 3rd of 20+ teams.',
      'I helped coordinate data collection, model training, and testing with teammates and mentors. We compared tabletop, lightbox, and mixed training data.',
      'I worked with the team on the poster, presentation, and live robot demonstration, keeping our conclusions tied to the conditions we tested.',
    ],
  },
  expressive: {
    title: 'Expressive — Open-Source Audio Plugin',
    subtitles: ['Turning playing dynamics into stereo movement', 'Independent Developer · C++ / JUCE · Open Source'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'I independently built an open-source VST3 effects and panning plugin in C++ with JUCE, inspired by my own music production.',
      '3,400+ downloads from producers and 40+ GitHub stars (reported October 2026).',
      'I mapped MIDI note velocity to stereo movement and built controls for its width, speed, and curve so musicians could shape the effect.',
    ],
  },
  activityhub: {
    title: 'ActivityHub — Volunteer Coordination',
    subtitles: ['Helping volunteers and organizers keep track', 'President of Computer Science Chapter · ACAESUSA · Independent Developer'],
    period: '2026 · ACAESUSA: Grades 9–11',
    cardHighlights: [
      'I independently built ActivityHub in 2026 for ACAESUSA’s events, volunteer registration, attendance, and service-hour tracking.',
      'As Computer Science Chapter president, I taught members CS skills and volunteered at fundraisers and events.',
      'I built administrator review, duplicate-hour checks, change history, and private-document access so volunteers and organizers could check and correct records.',
    ],
  },
  elocutionist: {
    title: 'Elocutionist — Speaking & Interview Practice',
    subtitles: ['A place to practice answers and get feedback', 'Independent Developer · Communication · Human-AI Interaction'],
    cardHighlights: [
      'I independently built an interview-practice app with spoken or typed answers and AI feedback.',
      'My work connects background documents, question generation, Whisper transcription, and feedback about answer content and structure.',
      'Users can revisit recordings and decide which suggestions fit. AI feedback supports practice; it is not an admissions judgment.',
    ],
  },
  zeitgeist: {
    title: 'Zeitgeist — AI-Assisted Stock Market & Investment Research',
    subtitles: ['Exploring stock market data for investment research', 'Founder & Developer · Stock Market & Investment Research'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'I built Zeitgeist’s data collection, FastAPI backend, and AI integration for stock-market research.',
      '1,000+ clicks in Google Search Console by October 2026. Features include deep-research stock analysis and interactive CFO insight agents.',
      'I keep source data, calculations, and AI explanations distinct. The platform supports research and education, not personalized investment advice.',
    ],
  },
};

for (const [slug, copy] of Object.entries(homepageProjectCopy)) {
  if (commonAppCommitments[slug]) copy.cardHighlights?.push(commonAppCommitments[slug]);
}
