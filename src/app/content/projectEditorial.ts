import { projectSchema, type Project, type ProjectRef } from '@shared/projectSchema';
import rawEditorial from './projectEditorial.json';

type SectionCopy = {
  heading: string;
  blocks: Record<string, Record<string, unknown>>;
};
type ProjectCopy = Omit<Partial<Project>, 'sections'> & {
  sections: Record<string, SectionCopy>;
};
const editorial = rawEditorial as Record<string, ProjectCopy>;

// An authored copy layer for public previews. Preserve CMS identities, links,
// media, block types, variants, ordering, and technical implementation blocks.
// Match sections by their existing heading; unknown/new sections remain intact.
export function refineProjectCopy(project: Project): Project {
  const copy = editorial[project.slug];
  if (!copy) return project;
  const { sections: sectionCopy, ...headerCopy } = copy;
  return projectSchema.parse({
    ...project,
    ...headerCopy,
    sections: project.sections.map(section => {
      const revision = sectionCopy[section.heading];
      if (!revision) return section;
      return {
        ...section,
        heading: revision.heading,
        blocks: section.blocks.map((block, index) => ({
          ...block,
          ...revision.blocks[String(index)],
        })),
      };
    }),
  });
}

export function refineProjectReference(ref: ProjectRef | null): ProjectRef | null {
  if (!ref) return null;
  return { ...ref, title: editorial[ref.slug]?.title ?? ref.title };
}
