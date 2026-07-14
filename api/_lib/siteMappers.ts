import type { Experience, ExperienceCard, ExperienceInput, AchievementCategory, AchievementCategoryInput } from '../../shared/siteContentSchema.js';

export type ExperienceRow = {
  id: string;
  slug: string;
  company: string;
  company_tagline: string;
  role: string;
  badge_text: string;
  period: string;
  location: string;
  order_index: number;
  published: boolean;
  summary_highlights: string[];
  hero_stats: unknown;
  overview_paragraphs: string[];
  responsibilities: unknown;
  tech_columns: unknown;
  highlights: unknown;
  takeaway_paragraphs: string[];
};

export function experienceRowToExperience(row: ExperienceRow): Experience {
  return {
    id: row.id,
    slug: row.slug,
    company: row.company,
    companyTagline: row.company_tagline,
    role: row.role,
    badgeText: row.badge_text,
    period: row.period,
    location: row.location,
    orderIndex: row.order_index,
    published: row.published,
    summaryHighlights: row.summary_highlights ?? [],
    heroStats: (row.hero_stats as Experience['heroStats']) ?? [],
    overviewParagraphs: row.overview_paragraphs ?? [],
    responsibilities: (row.responsibilities as Experience['responsibilities']) ?? [],
    techColumns: (row.tech_columns as Experience['techColumns']) ?? [],
    highlights: (row.highlights as Experience['highlights']) ?? [],
    takeawayParagraphs: row.takeaway_paragraphs ?? [],
  };
}

export function experienceRowToCard(row: ExperienceRow): ExperienceCard {
  return {
    id: row.id,
    slug: row.slug,
    company: row.company,
    companyTagline: row.company_tagline,
    role: row.role,
    badgeText: row.badge_text,
    period: row.period,
    location: row.location,
    summaryHighlights: row.summary_highlights ?? [],
  };
}

export function experienceInputToRow(input: ExperienceInput) {
  return {
    slug: input.slug,
    company: input.company,
    company_tagline: input.companyTagline,
    role: input.role,
    badge_text: input.badgeText,
    period: input.period,
    location: input.location,
    order_index: input.orderIndex,
    published: input.published,
    summary_highlights: input.summaryHighlights,
    hero_stats: input.heroStats,
    overview_paragraphs: input.overviewParagraphs,
    responsibilities: input.responsibilities,
    tech_columns: input.techColumns,
    highlights: input.highlights,
    takeaway_paragraphs: input.takeawayParagraphs,
  };
}

export type AchievementCategoryRow = {
  id: string;
  category: string;
  order_index: number;
  awards: unknown;
};

export function achievementCategoryRowToCategory(row: AchievementCategoryRow): AchievementCategory {
  return {
    id: row.id,
    category: row.category,
    orderIndex: row.order_index,
    awards: (row.awards as AchievementCategory['awards']) ?? [],
  };
}

export function achievementCategoryInputToRow(input: AchievementCategoryInput) {
  return {
    category: input.category,
    order_index: input.orderIndex,
    awards: input.awards,
  };
}
