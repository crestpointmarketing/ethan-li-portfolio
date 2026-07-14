import { z } from 'zod';

/**
 * Shared zod schemas for the "projects" CMS.
 *
 * This file has no server-only imports (no Supabase client, no Node crypto)
 * and no browser-only imports (no React) so it can be safely imported both
 * from Vercel serverless functions under /api and from the admin React form
 * under src/app. Keep it that way.
 */

export const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only (e.g. "my-project")');

export const badgeSchema = z.object({
  text: z.string().min(1),
  variant: z.enum(['accent', 'neutral']),
});
export type Badge = z.infer<typeof badgeSchema>;

export const statSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  noWrap: z.boolean().optional(),
});
export type Stat = z.infer<typeof statSchema>;

export const videoSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('embed'),
    src: z.string().min(1),
    title: z.string().min(1),
  }),
  z.object({
    type: z.literal('placeholder'),
    message: z.string().min(1),
    subMessage: z.string().min(1),
  }),
]);
export type Video = z.infer<typeof videoSchema>;

export const cardTeaserSchema = z.object({
  label: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});
export type CardTeaser = z.infer<typeof cardTeaserSchema>;

// ---- Content blocks ----

// Every existing block pattern renders inside the same titled-card shell
// (an optional h3 title, an optional intro paragraph, a flat-or-gradient
// container) with type-specific content below — so title/intro/variant are
// common to every block type rather than duplicated per type.
const blockBaseSchema = z.object({
  title: z.string().optional(),
  intro: z.string().optional(),
  variant: z.enum(['flat', 'gradient']).default('flat'),
});

export const proseBlockSchema = blockBaseSchema.extend({
  type: z.literal('prose'),
  paragraphs: z.array(z.string().min(1)).min(1),
});

export const bulletsBlockSchema = blockBaseSchema.extend({
  type: z.literal('bullets'),
  items: z.array(z.string().min(1)).min(1),
});

export const labeledBulletsBlockSchema = blockBaseSchema.extend({
  type: z.literal('labeled_bullets'),
  density: z.enum(['compact', 'loose']).default('compact'),
  items: z
    .array(
      z.object({
        label: z.string().optional(),
        body: z.string().min(1),
      }),
    )
    .min(1),
});

export const stepsBlockSchema = blockBaseSchema.extend({
  type: z.literal('steps'),
  items: z
    .array(
      z.object({
        marker: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
});

export const miniCardsBlockSchema = blockBaseSchema.extend({
  type: z.literal('mini_cards'),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
});

export const techColumnsBlockSchema = blockBaseSchema.extend({
  type: z.literal('tech_columns'),
  columns: z
    .array(
      z.object({
        heading: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
});

export const nextStepsBlockSchema = blockBaseSchema.extend({
  type: z.literal('next_steps'),
  variant: z.enum(['flat', 'gradient']).default('gradient'),
  statusLabel: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const blockSchema = z.discriminatedUnion('type', [
  proseBlockSchema,
  bulletsBlockSchema,
  labeledBulletsBlockSchema,
  stepsBlockSchema,
  miniCardsBlockSchema,
  techColumnsBlockSchema,
  nextStepsBlockSchema,
]);
export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block['type'];

export const sectionSchema = z.object({
  id: z.string().uuid().optional(),
  heading: z.string().min(1),
  orderIndex: z.number().int().default(0),
  blocksVersion: z.number().int().default(1),
  blocks: z.array(blockSchema).default([]),
});
export type Section = z.infer<typeof sectionSchema>;

// ---- Project ----

export const projectBaseSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, 'Title is required'),
  subtitles: z.array(z.string().min(1)).default([]),
  badges: z.array(badgeSchema).default([]),
  period: z.string().nullable().optional(),
  cardHighlights: z.array(z.string().min(1)).default([]),
  cardTeaser: cardTeaserSchema.nullable().optional(),
  techTags: z.array(z.string().min(1)).default([]),
  githubUrl: z.string().url().nullable().optional().or(z.literal('').transform(() => null)),
  posterUrl: z.string().url().nullable().optional().or(z.literal('').transform(() => null)),
  paperUrl: z.string().url().nullable().optional().or(z.literal('').transform(() => null)),
  orderIndex: z.number().int().default(0),
  published: z.boolean().default(false),
  video: videoSchema.nullable().optional(),
  stats: z.array(statSchema).default([]),
  sections: z.array(sectionSchema).default([]),
});

export const projectCreateSchema = projectBaseSchema;
export type ProjectInput = z.infer<typeof projectCreateSchema>;

export const projectSchema = projectBaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Project = z.infer<typeof projectSchema>;

// Lightweight shape returned by GET /api/projects for homepage cards
export const projectCardSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  subtitles: z.array(z.string()),
  period: z.string().nullable().optional(),
  cardHighlights: z.array(z.string()),
  cardTeaser: cardTeaserSchema.nullable().optional(),
  techTags: z.array(z.string()),
  githubUrl: z.string().nullable().optional(),
  posterUrl: z.string().nullable().optional(),
  paperUrl: z.string().nullable().optional(),
});
export type ProjectCard = z.infer<typeof projectCardSchema>;

export const projectRefSchema = z.object({
  slug: z.string(),
  title: z.string(),
});
export type ProjectRef = z.infer<typeof projectRefSchema>;
