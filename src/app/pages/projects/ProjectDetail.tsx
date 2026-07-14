import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Project, ProjectRef } from '@shared/projectSchema';
import { ProjectDetailView } from './ProjectDetailView';
import NotFound from '../NotFound';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'not-found' }
  | { status: 'ready'; project: Project; prev: ProjectRef | null; next: ProjectRef | null };

/** Route wrapper: fetches a published project by slug, then hands it to the presentational view. */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    fetch(`/api/projects/${encodeURIComponent(slug ?? '')}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setState({ status: 'not-found' });
          return;
        }
        if (!res.ok) {
          setState({ status: 'error' });
          return;
        }
        const data = await res.json();
        setState({ status: 'ready', project: data.project, prev: data.prev, next: data.next });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-[var(--muted-foreground)]">Loading…</p>
      </div>
    );
  }

  if (state.status === 'not-found') {
    return <NotFound />;
  }

  if (state.status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-[var(--muted-foreground)]">Something went wrong loading this project.</p>
      </div>
    );
  }

  return <ProjectDetailView project={state.project} prev={state.prev} next={state.next} />;
}
