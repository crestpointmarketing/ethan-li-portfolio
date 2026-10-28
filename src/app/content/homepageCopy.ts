import type { ProjectCard } from '@shared/projectSchema';
import { commonAppCommitments } from './commonAppFacts';

// Homepage wording only; CMS links, media, and publication state stay intact.
export const homepageProjectCopy: Record<string, Partial<ProjectCard>> = {
  speakwise: {
    title: 'SpeakWise — Child Speech Recognition Research',
    subtitles: ['What does AI miss when a child speaks?', 'Researcher & Developer · Independent Speech Research · Patent Pending'],
    period: 'Grades 10–12 · Year-round',
    cardHighlights: [
      'I started SpeakWise because a friend and my younger brother had faced speech difficulties since childhood. Their feedback taught me to ask what they wanted before deciding what to change.',
      'I adapted wav2vec 2.0 with CTC using 116.0 hours of audio from 1,738 children. On held-out children, the study reported 21.74% word error rate and 69.1% recall for marked repetitions and fillers.',
      'I built adjustable speech correction and voice cloning for the first prototype, then focused Phase 2 on keeping what children actually say. I am first-named inventor on the U.S. provisional application filed August 23, 2026.',
    ],
    cardTeaser: {
      label: 'Research Focus',
      items: [
        'A cleaner transcript is not always a more faithful one. I want to understand how to improve accuracy while keeping what the child actually said.',
        'Sole-author paper accepted for presentation at the IEEE BigData 2026 High School Symposium, scheduled for December 2026. SpeakWise is a research project, not a clinically tested therapy.',
      ],
    },
  },
  'pomelo-labs': {
    title: 'PomeloLabs.ai — AI Search Analytics & Optimization Platform',
    subtitles: ['A subscription-based AI marketing platform used by businesses', 'Founder & Lead Developer · GEO Analytics · Patent Pending'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'I independently developed PomeloLabs.ai, a live subscription-based AI marketing platform with active business users. My mother’s company, CrestPoint Marketing, handles marketing and deployed it at OneSource Cloud.',
      'For one B2B client, AI discovery rate increased from 21% to 63%, as reported in my October 2026 Common App. I built the tools for measuring brand visibility across AI search engines and turning findings into marketing tasks.',
      'I designed the GEO evaluation framework covered by a U.S. provisional patent application filed on July 27, 2026. I focused on how answers describe a business, not just whether they mention it.',
    ],
  },
  'vla-robot-manipulation': {
    title: 'VLA Robotics — Learning Robot Manipulation with Vision-Language-Action Models',
    subtitles: ['Studying how robot manipulation policies generalize across environments', 'Research Team Leader · UT Dallas STEM Bridge Program · 3rd Place of 20+ Teams'],
    period: 'Summer 2026 · 6 weeks · Grade 12',
    cardHighlights: [
      'At UT Dallas STEM Bridge, I led a five-person team researching vision-language-action models for robotic arms with graduate mentors and faculty.',
      'We compared how policies behaved on a tabletop and in a lightbox, including when we trained them with data from both.',
      'We prepared a poster, presented the research, and demonstrated the robot live. I learned to explain what our tests showed and where the results might not apply.',
    ],
  },
  expressive: {
    title: 'Expressive — Open-Source Audio Plugin',
    subtitles: ['Turning playing dynamics into stereo movement', 'Independent Developer · C++ / JUCE · Open Source'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'Expressive grew out of my own music production. I built a plugin that uses MIDI note velocity to move a sound across the stereo field.',
      'Using C++ and JUCE, I added controls for the mapping, width, and speed of the movement.',
      'Released as open-source VST3 effects and panning software: 3,400+ downloads from producers and 40+ GitHub stars, reported in October 2026. Building its controls made me think about the musician using them.',
    ],
  },
  activityhub: {
    title: 'ActivityHub — Volunteer Coordination',
    subtitles: ['Helping volunteers and organizers keep track', 'President of Computer Science Chapter · ACAESUSA · Independent Developer'],
    period: '2026 · ACAESUSA: Grades 9–11',
    cardHighlights: [
      'At ACAESUSA, I served as president of the Computer Science Chapter, taught members CS skills, and volunteered at fundraisers and events. I built ActivityHub for this community in 2026.',
      'Organizers review hours before they are confirmed, and volunteers can see which records still need attention.',
      'I worked on preventing duplicate hours, keeping a history of changes, and limiting access to private documents, with a focus on records people can check and correct.',
    ],
  },
  elocutionist: {
    title: 'Elocutionist — Speaking & Interview Practice',
    subtitles: ['A place to practice answers and get feedback', 'Independent Developer · Communication · Human-AI Interaction'],
    cardHighlights: [
      'I independently built a tool for practicing spoken or typed interview answers with AI feedback.',
      'I built the application’s document processing, question generation, speech transcription, and feedback workflow.',
      'The project connects what someone says to a transcript and then to suggestions they can review. Its AI feedback is practice advice, not an admissions judgment.',
    ],
  },
  zeitgeist: {
    title: 'Zeitgeist — AI-Assisted Stock Market & Investment Research',
    subtitles: ['Exploring stock market data for investment research', 'Founder & Developer · Stock Market & Investment Research'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'I built a financial research platform with deep-research stock analysis and interactive CFO insight agents for follow-up questions.',
      'I built the data collection, FastAPI backend, and AI integration. I wanted readers to be able to tell a reported number from the model’s explanation of it.',
      'The site reached 1,000+ clicks in Google Search Console by October 2026. These are search clicks, not user counts. For research and education, not personalized investment advice.',
    ],
  },
};

for (const [slug, copy] of Object.entries(homepageProjectCopy)) {
  if (commonAppCommitments[slug]) copy.cardHighlights?.push(commonAppCommitments[slug]);
}
