# Project content refinement

Scope: wording and content data in seven existing project pages, their homepage summaries, and the DreamCollege experience/module case study. Presentation components, CSS, media URLs, public routes, technical block layouts, section ordering, and external links are unchanged by this refinement.

| Project | Editorial focus |
| --- | --- |
| SpeakWise | Verbatim transcription, child-adapted ASR, disfluency preservation, and the difference between recognition and editing. Prototype and research remain distinct. |
| PomeloLabs | Meaning around entity mentions, information quality, sampling, provenance, and human review. Personal contributions distinguished from the broader platform. |
| VLA Robotics | Multimodal representation, instruction-grounded action, data diversity, and bounded generalization experiments. Team attribution retained. |
| Expressive | Mapping performance information to spatial sound, inspectable code, and creative interface trade-offs. No linguistic-research claim. |
| ActivityHub | Provenance, reviewed records, bilingual access, authorization, and information stewardship. Eligibility support distinguished from award conferral. |
| Zeitgeist | Source observations versus calculations versus generated explanations. No calibrated-forecast or validated-investment claim. |
| Elocutionist | Context, expression, actionable feedback, and speaker agency. Text-content feedback distinguished from vocal delivery. |
| DreamCollege | Question organization, retrieval, structured feedback, and team-delivered backend work. Kept distinct from independent Elocutionist work. |

## Sources and verification limits

Reviewed the deployed public project records and DreamCollege experience record, plus the user-supplied briefs. These are existing project descriptions, not independent validation. No new numerical research results, usage figures, university affiliations, or measured user benefits were invented.

- Manuscript/logs are still needed to substantiate SpeakWise numerical results, annotation definitions, cohorts, and splits. Quantitative headline tiles now describe methods and scope rather than therapeutic outcomes.
- Filing identifiers in existing records were retained, with provisional status explained; original filing documents were not independently inspected.
- IEEE acceptance is described as acceptance for a scheduled December 2026 presentation, following the provided record. Primary acceptance/authorship evidence remains a separate confirmation.
- The robotics poster remains the existing source link; numerical generalization claims are not presented as universal benchmark results. Specific trial counts and protocol should accompany any future quantitative summary.
- PomeloLabs client outcome figures and sole-founder wording are not used as proof of the personal contribution. Customer permission, consistent methods, and attribution remain necessary for a case study with measured outcomes.
- Expressive download/star counts and Zeitgeist traffic counts were omitted from outcome tiles rather than repurposed as research evidence.

## Implementation

Authored project text is in `src/app/content/projectEditorial.json`, applied to public detail data by `projectEditorial.ts`. Existing block types, variants, technical-stack blocks, and CMS identities remain intact. Homepage summaries are in `homepageCopy.ts`. DreamCollege text is in `experienceEditorial.ts`. Admin drafts and live database records were not rewritten; these are reviewable local public-copy changes.

## Validation

- Content anchors checked against all seven deployed source records.
- Every revised project passes the existing project schema before rendering.
- Chromium visited all seven detail routes, DreamCollege, and the homepage: no invalid-block placeholders or page exceptions.
- Mobile text checked within the existing statistic tiles; wording shortened rather than changing styles.
- Production build and diff whitespace check passed; existing bundle-size advisory remains.
- No production deployment, live CMS mutation, or external message was performed.

## 2026-10-27 academic focus update

The owner clarified that Ethan's main intended fields are Linguistics, Informatics, and Information Science. Public copy now states these as interests, with language, meaning, information organization, evidence, and user choice as the connecting questions. Latin I–V and SpeakWise ground the language emphasis; the commercial PomeloLabs.ai product, ActivityHub, Zeitgeist, and interview-practice work ground the information and interaction emphasis. Music, robotics, and hardware retain their documented scopes.

This is an editorial change to the homepage, project summaries/reflections, selected experience wording, and sharing metadata. It adds no new courses, user studies, research findings, origins, roles, dates, awards, or patent claims. Common App ordering and existing facts remain intact; all styles and layouts are unchanged. Production build and the 84 page/viewport browser checks pass locally.
