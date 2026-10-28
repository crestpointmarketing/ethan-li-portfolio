// Research-summary artwork from the supplied Phase 2 manuscript, pp. 2–4.
// Rebuild the editable SVG with: node scripts/create-speakwise-phase2-poster.mjs
import fs from 'node:fs';
import path from 'node:path';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const parts = [];
function text(x, y, value, size = 30, weight = 400, color = '#27364C') {
  parts.push(`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}">${escape(value)}</text>`);
}
function paragraph(x, y, value, maxChars = 43, size = 30, lineHeight = 42, color = '#27364C') {
  const words = value.split(/\s+/); let line = '';
  for (const word of words) {
    if (line && `${line} ${word}`.length > maxChars) { text(x, y, line, size, 400, color); y += lineHeight; line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) text(x, y, line, size, 400, color);
  return y + lineHeight;
}
function box(x, y, w, h, title, fill = '#FFFFFF') {
  parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="#C9D5E7" stroke-width="2"/>`);
  parts.push(`<path d="M${x + 14} ${y}H${x + w - 14}Q${x + w} ${y} ${x + w} ${y + 14}V${y + 68}H${x}V${y + 14}Q${x} ${y} ${x + 14} ${y}Z" fill="#5D7FB5"/>`);
  text(x + 24, y + 45, title, 31, 700, '#FFFFFF');
}
function step(y, n, title, body) {
  parts.push(`<rect x="850" y="${y}" width="700" height="140" rx="16" fill="#EFF4FB" stroke="#BDCEE6" stroke-width="2"/>`);
  parts.push(`<circle cx="895" cy="${y + 43}" r="24" fill="#12376D"/>`);
  text(887, y + 53, n, 28, 700, '#FFFFFF'); text(935, y + 53, title, 32, 700, '#12376D');
  paragraph(883, y + 95, body, 48, 27, 34);
}

parts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1800" width="2400" height="1800" role="img" aria-labelledby="title description">');
parts.push('<title id="title">SpeakWise Phase 2 — Child Speech Recognition Research</title><desc id="description">A newly prepared research summary of child-adapted wav2vec 2.0 CTC recognition, preservation of fillers and repetitions, and a small preschool adaptation study. Reported results come from the supplied research manuscript.</desc>');
parts.push('<style>text{font-family:Arial,Helvetica,sans-serif}</style><rect width="2400" height="1800" fill="#F5F7FB"/>');
parts.push('<rect x="30" y="26" width="2340" height="190" rx="12" fill="#06245B"/>');
text(70, 102, 'SpeakWise: Keeping the Details of Children’s Speech', 59, 700, '#FFFFFF');
text(72, 158, 'PHASE 2  |  Child-Adapted, Disfluency-Preserving Speech Recognition', 36, 700, '#D8E7FF');
text(72, 194, 'Ethan Li · Highland Park High School, Dallas, Texas', 27, 400, '#D8E7FF');

// Left column: question, example, and study design.
box(30, 244, 750, 305, 'The Question');
text(57, 365, 'What gets lost in a fluent transcript?', 34, 700, '#12376D');
paragraph(57, 410, 'A recognizer may leave out a child’s fillers or repeated words. Once those details disappear, a later editing tool cannot give the speaker a choice about keeping them.', 46, 29, 38);
box(30, 575, 750, 367, 'An Illustrative Example');
text(57, 696, 'Original wording', 29, 700, '#12376D');
text(57, 745, '“I, um, I want the red one.”', 36, 700);
text(57, 804, 'A possible smoothed transcript', 29, 700, '#12376D');
text(57, 851, '“I want the red one.”', 36, 700);
paragraph(57, 894, 'Constructed example: a smoother transcript can lose a filler and a repeated word.', 51, 24, 31);
box(30, 968, 750, 515, 'How I Set Up the Study');
let y = paragraph(57, 1092, 'I fine-tuned wav2vec 2.0 with a character-level CTC decoder and no external language model.', 48, 27, 36);
y = paragraph(57, y + 20, 'Training: DrivenData word track — 116 hours, 1,738 children.', 48, 27, 36);
y = paragraph(57, y + 20, 'Validation: 17,306 utterances from 434 children kept separate from training.', 48, 27, 36);
paragraph(57, y + 20, 'I checked word errors and how many marked fillers and repeated words were kept.', 48, 27, 36);

// Middle column: recognition is separate from later repair and synthesis.
box(810, 244, 780, 813, 'From Audio to Inspectable Text');
step(341, '1', 'Child speech', 'Use audio and reference transcripts from the research corpora.');
step(511, '2', 'Child-adapted recognizer', 'Fine-tune wav2vec 2.0 with character-level CTC.');
step(681, '3', 'Keep the speech evidence', 'Retain words, fillers, and repeated words in the transcript.');
parts.push('<path d="M1200 481v24m-8-8 8 8 8-8M1200 651v24m-8-8 8 8 8-8" stroke="#5D7FB5" stroke-width="4" fill="none"/>');
text(851, 891, 'Then evaluate two different things:', 32, 700, '#12376D');
paragraph(851, 944, 'How many words were wrong? How much of the marked disfluency evidence remained?', 46);
box(810, 1083, 780, 400, 'Reported Validation Results');
parts.push('<rect x="847" y="1190" width="335" height="171" rx="12" fill="#E8F0FB"/><rect x="1213" y="1190" width="335" height="171" rx="12" fill="#E8F0FB"/>');
text(880, 1276, '21.74%', 66, 700, '#12376D'); text(1244, 1276, '69.1%', 66, 700, '#12376D');
text(880, 1322, 'Word error rate', 28, 700); text(1244, 1322, 'Marker recall', 28, 700);
paragraph(849, 1396, 'Validation set: 434 unseen children. Recall covers marked fillers and immediate whole-word repetitions.', 53, 26, 34);

// Right column: one paired comparison, explicitly scoped to nine children.
box(1620, 244, 750, 697, 'A Small Preschool Adaptation Study');
paragraph(1647, 365, 'I continued training on 3.88 hours of SPROUT preschool speech, then compared the same nine unseen four-year-olds before and after adaptation.', 44, 29, 40);
text(1647, 551, 'Word error rate — lower is better', 29, 700, '#12376D');
for (const [yy, label, value, color] of [[624, 'Before', 79.31, '#8EA5C9'], [748, 'After', 68.95, '#275B9D']]) {
  text(1647, yy - 19, label, 27, 700);
  parts.push(`<rect x="1647" y="${yy}" width="650" height="40" rx="6" fill="#E5EAF2"/><rect x="1647" y="${yy}" width="${650 * value / 100}" height="40" rx="6" fill="${color}"/>`);
  text(1647 + 650 * value / 100 + 14, yy + 31, `${value}%`, 27, 700, '#12376D');
}
text(1647, 824, 'Bar scale: 0–100% word error rate', 23, 400, '#52627A');
paragraph(1647, 860, 'Paired evaluation: 1,293 utterances, nine children. The preschool error rate remains high.', 48, 26, 34);
box(1620, 968, 750, 515, 'What These Results Do and Do Not Show');
y = paragraph(1647, 1089, 'The study measures English transcription and surface markers, not a child’s diagnosis or a therapy outcome.', 44, 29, 40);
y = paragraph(1647, y + 23, 'The small preschool group needs broader testing. Block timing and partial-word repetitions are outside this marker measure.', 44, 29, 40);
paragraph(1647, y + 23, 'Controlled editing, voice synthesis, and the full application still need separate evaluation.', 44, 29, 40);

parts.push('<rect x="30" y="1513" width="2340" height="163" rx="14" fill="#E5EEF9"/>');
text(65, 1565, 'What I Learned', 34, 700, '#12376D');
paragraph(65, 1617, 'I want the recognizer to keep what a child actually said. Preserving the original wording leaves room for the speaker to decide what should change later.', 130, 31, 42);
text(35, 1722, 'Source: supplied Phase 2 research manuscript, methods and results, pp. 2–4. Figures are reported research results.', 25, 400, '#52627A');
text(35, 1760, 'New project-summary poster · October 2026 · Recognition is the focus here; speech repair and synthesis are separate steps.', 25, 400, '#52627A');
parts.push('</svg>');
const dir = path.resolve('public/project-posters'); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'speakwise-phase2-poster.svg'), parts.join('\n'));
console.log('Created public/project-posters/speakwise-phase2-poster.svg');
