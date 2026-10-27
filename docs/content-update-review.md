# Content-only update

The earlier redesign has been reverted following the user's clarification.

- Original colors, fonts, default theme, CSS, navigation, routes, section order, hero graphic, card templates, and page layouts are restored.
- Updated hero positioning, introduction, buttons, IEEE acceptance wording, exploration questions, project summaries, and contact copy.
- Project text overrides are in src/app/content/homepageCopy.ts. Links, assets, technical tags, and full detail content continue to come from the existing CMS. No production CMS data was written.
- Phone is suppressed as private content in the contact view and public contact API; contact layout and form are otherwise unchanged.
- No new pages or dependencies. No production deployment.
- Exact authorship, metrics, patent details, and volatile counts were not added to the homepage. Acceptance is described as acceptance for a future December 2026 presentation, following the supplied copy.
