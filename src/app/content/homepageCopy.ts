import type { ProjectCard } from '@shared/projectSchema';

// Homepage wording only; CMS links, media, and publication state stay intact.
export const homepageProjectCopy: Record<string, Partial<ProjectCard>> = {
  speakwise: {
    title: 'SpeakWise — Child Speech Recognition Research',
    subtitles: ['What does AI miss when a child speaks?', 'Researcher & Developer · Independent Speech Research · Patent Pending'],
    period: 'Grades 10–12 · Year-round',
    cardHighlights: [
      'I started SpeakWise because a friend and my younger brother had faced speech difficulties since childhood. Their feedback taught me to ask what they wanted before deciding what to change.',
      'I adapted wav2vec 2.0 with CTC to children’s speech and checked both transcription errors and the details the model kept.',
      'I tested on speakers kept separate from training. I also filed a U.S. provisional patent application for SpeakWise on August 23, 2026.',
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
      'PomeloLabs.ai is a subscription-based AI marketing platform used by businesses. I worked with a parent who brought business requirements and agency feedback.',
      'I built the platform’s technical architecture, integrations, and evaluation tools, including workflows that connect results to tasks and drafts.',
      'I designed the GEO evaluation framework covered by a U.S. provisional patent application filed on July 27, 2026. Its goal is to make AI-search results clearer and more useful to businesses.',
    ],
  },
  'vla-robot-manipulation': {
    title: 'VLA Robotics — Learning Robot Manipulation with Vision-Language-Action Models',
    subtitles: ['Studying how robot manipulation policies generalize across environments', 'Research Team Leader · UT Dallas STEM Bridge Program · 3rd Place of 20+ Teams'],
    period: 'Summer 2026 · 6 weeks · Grade 12',
    cardHighlights: [
      'At UT Dallas STEM Bridge, I led a five-person team researching vision-language-action models for robotic arms with graduate mentors and faculty.',
      'We compared how policies behaved on a tabletop and in a lightbox, including when we trained them with data from both.',
      'We also prepared a poster, presented the research, and demonstrated the robot live. I gained practice coordinating research and explaining our work.',
    ],
  },
  expressive: {
    title: 'Expressive — Open-Source Audio Plugin',
    subtitles: ['Turning playing dynamics into stereo movement', 'Independent Developer · C++ / JUCE · Open Source'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'Expressive grew out of my own music production. I built a plugin that uses MIDI note velocity to move a sound across the stereo field.',
      'Using C++ and JUCE, I added controls for the mapping, width, and speed of the movement.',
      'I learned C++ and how to build for existing music software, then released the plugin as open source so other people could try it.',
    ],
  },
  activityhub: {
    title: 'ActivityHub — Volunteer Coordination',
    subtitles: ['Helping volunteers and organizers keep track', 'President of Computer Science Chapter · ACAESUSA · Independent Developer'],
    period: '2026 · ACAESUSA: Grades 9–11',
    cardHighlights: [
      'As president of ACAESUSA’s Computer Science Chapter, I built ActivityHub for the community I volunteer with and help teach.',
      'Organizers review hours before they are confirmed, and volunteers can see which records still need attention.',
      'I worked on preventing duplicate hours, keeping a history of changes, and limiting access to private documents.',
    ],
  },
  elocutionist: {
    title: 'Elocutionist — Speaking & Interview Practice',
    subtitles: ['A place to practice answers and get feedback', 'Human-AI Interaction · Communication'],
    cardHighlights: [
      'I independently built a tool for practicing spoken or typed interview answers with AI feedback.',
      'I built the application’s document processing, question generation, speech transcription, and feedback workflow.',
      'The work gave me practice connecting those components in an independent app. Its AI feedback is practice advice, not an admissions judgment.',
    ],
  },
  zeitgeist: {
    title: 'Zeitgeist — AI-Assisted Stock Market & Investment Research',
    subtitles: ['Exploring stock market data for investment research', 'Founder & Developer · Stock Market & Investment Research'],
    period: 'Grades 11–12 · Year-round',
    cardHighlights: [
      'I built a prototype that brings stock market data, calculated measures, and AI-written summaries into one place.',
      'I worked on data ingestion, the FastAPI backend, and model integration, connecting external data to a written summary.',
      'For research and educational use, not personalized investment advice.',
    ],
  },
};
