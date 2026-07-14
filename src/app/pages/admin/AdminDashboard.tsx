import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Project } from '@shared/projectSchema';
import { listProjects, deleteProject, reorderProjects, patchProject, AdminApiError } from '../../lib/adminApi';
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

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const { projects } = await listProjects();
      setProjects(projects);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Failed to load projects');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const move = async (index: number, direction: -1 | 1) => {
    if (!projects) return;
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const reordered = [...projects];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setProjects(reordered);
    try {
      await reorderProjects(reordered.map((p) => p.id));
    } catch {
      load(); // revert to server truth on failure
    }
  };

  const togglePublished = async (project: Project) => {
    const optimistic = projects!.map((p) => (p.id === project.id ? { ...p, published: !p.published } : p));
    setProjects(optimistic);
    try {
      // Uses the dedicated PATCH endpoint, not PUT — PUT expects (and
      // replaces) the full sections array, and this dashboard row doesn't
      // hold a project's sections at all.
      await patchProject(project.id, { published: !project.published });
    } catch {
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link to="/admin/projects/new" className={buttonVariants()}>
          New Project
        </Link>
      </div>

      {error && <p className="text-sm text-[var(--destructive)] mb-4">{error}</p>}

      {!projects ? (
        <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>
      ) : projects.length === 0 ? (
        <p className="text-[var(--muted-foreground)]">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
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
                    disabled={index === projects.length - 1}
                    className="disabled:opacity-30 text-[var(--muted-foreground)] hover:text-[var(--foreground)] py-0.5"
                    aria-label="Move down"
                  >
                    &#9660;
                  </button>
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{project.title}</p>
                  <p className="text-sm text-[var(--muted-foreground)] truncate">/projects/{project.slug}</p>
                </div>
                <Badge variant={project.published ? 'default' : 'secondary'}>
                  {project.published ? 'Published' : 'Draft'}
                </Badge>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => togglePublished(project)}>
                  {project.published ? 'Unpublish' : 'Publish'}
                </Button>
                <Link
                  to={`/admin/projects/${project.id}/edit`}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Edit
                </Link>
                <DeleteProjectButton project={project} onDeleted={load} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteProjectButton({ project, onDeleted }: { project: Project; onDeleted: () => void }) {
  const [confirmText, setConfirmText] = useState('');
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const canDelete = confirmText.trim() === project.title;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* This project's Button isn't wrapped in forwardRef, so asChild+Slot
          can't attach a ref to it (breaks Radix's focus-return behavior).
          Style the Trigger directly instead — it's a real Radix primitive
          that forwards refs on its own. */}
      <AlertDialogTrigger className={buttonVariants({ variant: 'destructive', size: 'sm' })}>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &ldquo;{project.title}&rdquo;?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes the project and all of its sections. This can&apos;t be undone. Type the
            project title to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder={project.title} />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!canDelete || deleting}
            onClick={async () => {
              setDeleting(true);
              try {
                await deleteProject(project.id);
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
