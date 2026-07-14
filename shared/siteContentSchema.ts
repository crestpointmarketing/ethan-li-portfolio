import { z } from 'zod';

/**
 * Zod schemas for the non-project site content: About, Contact, Experience,
 * Achievements. Same rules as projectSchema.ts — no server- or
 * browser-only imports, shared verbatim between /api and the admin form.
 */

// ---- About ----

export const certificationSchema = z.object({
  title: z.string().min(1),
  org: z.string().min(1),
});

export const aboutContentSchema = z.object({
  schoolName: z.string().min(1),
  location: z.string().min(1),
  gradeText: z.string().min(1),
  yearRange: z.string().min(1),
  academicFocus: z.array(z.string().min(1)).default([]),
  certifications: z.array(certificationSchema).default([]),
  skills: z.array(z.string().min(1)).default([]),
});
export type AboutContent = z.infer<typeof aboutContentSchema>;

// ---- Contact ----

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().min(1),
});

export const contactContentSchema = z.object({
  headingLine1: z.string().min(1),
  headingAccent: z.string().min(1),
  blurb: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1).nullable().optional(),
  location: z.string().min(1),
  socialLinks: z.array(socialLinkSchema).default([]),
  footerText: z.string().min(1),
});
export type ContactContent = z.infer<typeof contactContentSchema>;

// ---- Experience ----

const titledItemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const statItemSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const techColumnSchema = z.object({
  heading: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const experienceBaseSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only'),
  company: z.string().min(1),
  companyTagline: z.string().min(1),
  role: z.string().min(1),
  badgeText: z.string().min(1),
  period: z.string().min(1),
  location: z.string().min(1),
  orderIndex: z.number().int().default(0),
  published: z.boolean().default(false),
  summaryHighlights: z.array(z.string().min(1)).default([]),
  heroStats: z.array(statItemSchema).default([]),
  overviewParagraphs: z.array(z.string().min(1)).default([]),
  responsibilities: z.array(titledItemSchema).default([]),
  techColumns: z.array(techColumnSchema).default([]),
  highlights: z.array(titledItemSchema).default([]),
  takeawayParagraphs: z.array(z.string().min(1)).default([]),
});
export type ExperienceInput = z.infer<typeof experienceBaseSchema>;

export const experienceSchema = experienceBaseSchema.extend({
  id: z.string().uuid(),
});
export type Experience = z.infer<typeof experienceSchema>;

export const experienceCardSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  company: z.string(),
  companyTagline: z.string(),
  role: z.string(),
  badgeText: z.string(),
  period: z.string(),
  location: z.string(),
  summaryHighlights: z.array(z.string()),
});
export type ExperienceCard = z.infer<typeof experienceCardSchema>;

// ---- Achievements ----

export const awardSchema = z.object({
  title: z.string().min(1),
  achievement: z.string().min(1),
  description: z.string().min(1),
});

export const achievementCategoryBaseSchema = z.object({
  category: z.string().min(1),
  orderIndex: z.number().int().default(0),
  awards: z.array(awardSchema).min(1),
});
export type AchievementCategoryInput = z.infer<typeof achievementCategoryBaseSchema>;

export const achievementCategorySchema = achievementCategoryBaseSchema.extend({
  id: z.string().uuid(),
});
export type AchievementCategory = z.infer<typeof achievementCategorySchema>;

export const achievementsMetaSchema = z.object({
  subtitle: z.string().min(1),
  stats: z.array(statItemSchema).default([]),
});
export type AchievementsMeta = z.infer<typeof achievementsMetaSchema>;
