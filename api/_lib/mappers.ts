import type { Project, ProjectCard, ProjectInput, Section } from '../../shared/projectSchema.js';

// Postgres/Supabase rows are snake_case; our API + zod schemas are camelCase.
// These helpers are the single place that translation happens.

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  subtitles: string[];
  badges: unknown;
  period: string | null;
  card_highlights: string[];
  card_teaser: unknown;
  tech_tags: string[];
  github_url: string | null;
  poster_url: string | null;
  paper_url: string | null;
  order_index: number;
  published: boolean;
  video: unknown;
  stats: unknown;
  created_at: string;
  updated_at: string;
};

export type SectionRow = {
  id: string;
  project_id: string;
  heading: string;
  order_index: number;
  blocks_version: number;
  blocks: unknown;
};

export function sectionRowToSection(row: SectionRow): Section {
  return {
    id: row.id,
    heading: row.heading,
    orderIndex: row.order_index,
    blocksVersion: row.blocks_version,
    blocks: (row.blocks as Section['blocks']) ?? [],
  };
}

export function projectRowToProject(row: ProjectRow, sectionRows: SectionRow[]): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitles: row.subtitles ?? [],
    badges: (row.badges as Project['badges']) ?? [],
    period: row.period,
    cardHighlights: row.card_highlights ?? [],
    cardTeaser: (row.card_teaser as Project['cardTeaser']) ?? null,
    techTags: row.tech_tags ?? [],
    githubUrl: row.github_url,
    posterUrl: row.poster_url,
    paperUrl: row.paper_url,
    orderIndex: row.order_index,
    published: row.published,
    video: (row.video as Project['video']) ?? null,
    stats: (row.stats as Project['stats']) ?? [],
    sections: sectionRows
      .slice()
      .sort((a, b) => a.order_index - b.order_index)
      .map(sectionRowToSection),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function projectRowToCard(row: ProjectRow): ProjectCard {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitles: row.subtitles ?? [],
    period: row.period,
    cardHighlights: row.card_highlights ?? [],
    cardTeaser: (row.card_teaser as ProjectCard['cardTeaser']) ?? null,
    techTags: row.tech_tags ?? [],
    githubUrl: row.github_url,
    posterUrl: row.poster_url,
    paperUrl: row.paper_url,
  };
}

/** Fields on the `projects` table only — sections are written separately. */
export function projectInputToRow(input: ProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    subtitles: input.subtitles,
    badges: input.badges,
    period: input.period ?? null,
    card_highlights: input.cardHighlights,
    card_teaser: input.cardTeaser ?? null,
    tech_tags: input.techTags,
    github_url: input.githubUrl ?? null,
    poster_url: input.posterUrl ?? null,
    paper_url: input.paperUrl ?? null,
    order_index: input.orderIndex,
    published: input.published,
    video: input.video ?? null,
    stats: input.stats,
  };
}

export function sectionInputToRow(section: Section, projectId: string) {
  return {
    project_id: projectId,
    heading: section.heading,
    order_index: section.orderIndex,
    blocks_version: section.blocksVersion,
    blocks: section.blocks,
  };
}
