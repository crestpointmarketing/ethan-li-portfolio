# Public site consistency and responsive QA — 2026-10-27

Scope: homepage, seven project detail pages, three experience detail pages, and the patent page. Preserve the existing colors, typefaces, components, media, desktop composition, and approved Common App activity/honor order.

Corrections:
- Use the approved homepage project titles on detail pages and previous/next project links. Make Elocutionist's independent developer role explicit in both places.
- Keep existing CMS date badges synchronized with the corrected public participation periods. Expressive, ActivityHub, and VLA previously retained older date labels on their detail pages.
- Wrap project action buttons and narrow-screen award dates; fit long headings and statistic text to small screens. Stack technical columns only below 360px.
- Reuse the existing compact navigation below 1280px, avoiding logo/link/control overlap at tablet widths.
- Return project/experience detail links to the corresponding homepage section with space for the fixed navigation. Keep anchors aligned while asynchronous content loads, and stop alignment on user scrolling or after four seconds.

Validation:
- Browser checks across 320, 375, 390, 768, 1024, 1280, and 1440px widths, covering all 12 public pages (84 page/viewport combinations).
- Compare project titles, roles and participation periods between homepage/detail views; preserve the five Common App honors and both activity orders. Check provisional application identifiers/dates and business subscription wording.
- Check visible text and buttons for viewport overflow and clipping, broken images, first-party failed responses, and browser exceptions. Inspect representative screenshots in both themes.
- Exercise the compact menu, project/experience return links, and theme switch. Simulate delayed homepage content to verify anchor position remains below the fixed header.
- Production build and git whitespace checks; repeat public browser checks after deployment.

These are automated Chromium viewport checks and visual inspection, not physical-device testing. No contact form submissions or changes to CMS/private application records are part of this audit.
