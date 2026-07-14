import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Experience } from '@shared/siteContentSchema';
import { ExperienceDetailView } from './ExperienceDetailView';
import NotFound from '../NotFound';

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'not-found' } | { status: 'ready'; experience: Experience };

/** Route wrapper: fetches a published experience by slug, then hands it to the presentational view. */
export default function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    fetch(`/api/experiences/${encodeURIComponent(slug ?? '')}`)
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
        setState({ status: 'ready', experience: data.experience });
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
        <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>
      </div>
    );
  }
  if (state.status === 'not-found') return <NotFound />;
  if (state.status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-[var(--muted-foreground)]">Something went wrong loading this experience.</p>
      </div>
    );
  }

  return <ExperienceDetailView experience={state.experience} />;
}
