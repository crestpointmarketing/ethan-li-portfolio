import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Experience } from '@shared/siteContentSchema';
import {
  listExperiences,
  deleteExperience,
  reorderExperiences,
  patchExperience,
  AdminApiError,
} from '../../lib/adminApi';
import { Button, buttonVariants } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';

export default function AdminExperienceList() {
  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const { experiences } = await listExperiences();
      setExperiences(experiences);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Failed to load experiences');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const move = async (index: number, direction: -1 | 1) => {
    if (!experiences) return;
    const target = index + direction;
    if (target < 0 || target >= experiences.length) return;
    const reordered = [...experiences];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setExperiences(reordered);
    try {
      await reorderExperiences(reordered.map((e) => e.id));
    } catch {
      load();
    }
  };

  const togglePublished = async (experience: Experience) => {
    const optimistic = experiences!.map((e) => (e.id === experience.id ? { ...e, published: !e.published } : e));
    setExperiences(optimistic);
    try {
      await patchExperience(experience.id, { published: !experience.published });
    } catch {
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <Link to="/admin/experience/new" className={buttonVariants()}>
          New Experience
        </Link>
      </div>

      {error && <p className="text-sm text-[var(--destructive)] mb-4">{error}</p>}

      {!experiences ? (
        <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>
      ) : experiences.length === 0 ? (
        <p className="text-[var(--muted-foreground)]">No experience entries yet.</p>
      ) : (
        <div className="space-y-3">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="flex flex-wrap items-center justify-between gap-4 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex flex-col text-xs leading-none">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="disabled:opacity-30 text-[var(--muted-foreground)] hover:text-[var(--foreground)] py-0.5"
                    aria-label="Move up"
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === experiences.length - 1}
                    className="disabled:opacity-30 text-[var(--muted-foreground)] hover:text-[var(--foreground)] py-0.5"
                    aria-label="Move down"
                  >
                    &#9660;
                  </button>
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {experience.role} &mdash; {experience.company}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] truncate">/experience/{experience.slug}</p>
                </div>
                <Badge variant={experience.published ? 'default' : 'secondary'}>
                  {experience.published ? 'Published' : 'Draft'}
                </Badge>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => togglePublished(experience)}>
                  {experience.published ? 'Unpublish' : 'Publish'}
                </Button>
                <Link
                  to={`/admin/experience/${experience.id}/edit`}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Edit
                </Link>
                <DeleteExperienceButton experience={experience} onDeleted={load} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteExperienceButton({ experience, onDeleted }: { experience: Experience; onDeleted: () => void }) {
  const [confirmText, setConfirmText] = useState('');
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const canDelete = confirmText.trim() === experience.role;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: 'destructive', size: 'sm' })}>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &ldquo;{experience.role}&rdquo;?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes this experience entry. This can&apos;t be undone. Type the role title to
            confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder={experience.role} />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!canDelete || deleting}
            onClick={async () => {
              setDeleting(true);
              try {
                await deleteExperience(experience.id);
                setConfirmText('');
                setOpen(false);
                onDeleted();
              } finally {
                setDeleting(false);
              }
            }}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
