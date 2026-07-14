import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { projectCreateSchema, type Project, type ProjectInput } from '@shared/projectSchema';
import { getProject, createProject, updateProject, AdminApiError } from '../../lib/adminApi';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { LineListField } from './form/LineListField';
import { BadgesField } from './form/BadgesField';
import { StatsField } from './form/StatsField';
import { SectionsField } from './form/SectionsField';
import { FileUploadField } from './form/FileUploadField';
import { ProjectDetailView } from '../projects/ProjectDetailView';

const EMPTY_PROJECT: ProjectInput = {
  slug: '',
  title: '',
  subtitles: [],
  badges: [],
  period: '',
  cardHighlights: [],
  cardTeaser: null,
  techTags: [],
  githubUrl: '',
  posterUrl: null,
  paperUrl: null,
  orderIndex: 0,
  published: false,
  video: null,
  stats: [],
  sections: [],
};

/**
 * Recursively trims and drops blank entries from any string[] found in the
 * form data. LineListField represents lists as newline-separated text, so a
 * trailing blank line from pressing Enter is a normal editing artifact, not
 * a real empty item — this is applied right before validation, not on every
 * keystroke, so it never fights the controlled textarea while typing.
 */
function cleanStringArraysDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) {
      return (value as string[]).map((v) => v.trim()).filter((v) => v.length > 0);
    }
    return value.map(cleanStringArraysDeep);
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>)) {
      out[key] = cleanStringArraysDeep((value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return value;
}

export default function AdminProjectForm() {
  const { id } = useParams<{ id: string }>();
  const mode: 'create' | 'edit' = id ? 'edit' : 'create';
  const navigate = useNavigate();

  const form = useForm<ProjectInput>({ defaultValues: EMPTY_PROJECT });
  const { control, register, handleSubmit, watch } = form;

  const [loading, setLoading] = useState(mode === 'edit');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [originalPublished, setOriginalPublished] = useState(false);
  const [pendingSave, setPendingSave] = useState<ProjectInput | null>(null);

  useEffect(() => {
    if (mode !== 'edit' || !id) return;
    let cancelled = false;
    getProject(id)
      .then(({ project }) => {
        if (cancelled) return;
        setOriginalSlug(project.slug);
        setOriginalPublished(project.published);
        // Normalize nullable text fields to '' — these are plain uncontrolled
        // `register()`-bound inputs, which can't take `null` as a value.
        form.reset({ ...project, period: project.period ?? '', githubUrl: project.githubUrl ?? '' });
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof AdminApiError ? err.message : 'Failed to load project');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode]);

  const doSave = async (input: ProjectInput) => {
    setSaving(true);
    setSubmitError(null);
    try {
      if (mode === 'edit' && id) {
        await updateProject(id, input);
      } else {
        await createProject(input);
      }
      navigate('/admin');
    } catch (err) {
      setSubmitError(err instanceof AdminApiError ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = handleSubmit(async (raw) => {
    setSubmitError(null);
    const cleaned = cleanStringArraysDeep(raw);
    const parsed = projectCreateSchema.safeParse(cleaned);
    if (!parsed.success) {
      setSubmitError(
        parsed.error.issues.map((issue) => `${issue.path.join('.') || 'form'}: ${issue.message}`).join('; '),
      );
      return;
    }

    if (mode === 'edit' && originalPublished && parsed.data.slug !== originalSlug) {
      setPendingSave(parsed.data);
      return;
    }

    await doSave(parsed.data);
  });

  const cardTeaser = watch('cardTeaser');
  const video = watch('video');

  if (loading) {
    return <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>;
  }
  if (loadError) {
    return <p className="text-sm text-[var(--destructive)]">{loadError}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{mode === 'edit' ? 'Edit Project' : 'New Project'}</h1>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="my-project" {...register('slug')} required />
            <p className="text-xs text-[var(--muted-foreground)]">Used in the URL: /projects/&lt;slug&gt;</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Input id="period" placeholder="2024 - 2025" {...register('period')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input id="githubUrl" placeholder="https://github.com/..." {...register('githubUrl')} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FileUploadField control={control} name="posterUrl" label="Poster image" kind="poster" accept="image/*" />
          <FileUploadField control={control} name="paperUrl" label="Research paper (PDF)" kind="paper" accept="application/pdf" />
        </div>

        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={!!field.value} onCheckedChange={(v) => field.onChange(!!v)} />
              Published (visible on the public site)
            </label>
          )}
        />

        <LineListField control={control} name="subtitles" label="Subtitles" placeholder="One subtitle per line" />

        <BadgesField control={control} register={register} />

        <StatsField control={control} register={register} />

        {/* Video */}
        <div className="space-y-2">
          <Label>Demo video</Label>
          <Select
            value={video?.type ?? 'none'}
            onValueChange={(value) => {
              if (value === 'none') form.setValue('video', null);
              else if (value === 'embed') form.setValue('video', { type: 'embed', src: '', title: '' });
              else form.setValue('video', { type: 'placeholder', message: '', subMessage: '' });
            }}
          >
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No video</SelectItem>
              <SelectItem value="embed">YouTube embed</SelectItem>
              <SelectItem value="placeholder">"Coming soon" placeholder</SelectItem>
            </SelectContent>
          </Select>

          {video?.type === 'embed' && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Input placeholder="https://www.youtube.com/embed/VIDEO_ID" {...register('video.src' as const)} />
              <Input placeholder="Video title" {...register('video.title' as const)} />
            </div>
          )}
          {video?.type === 'placeholder' && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Input placeholder="Demo video coming soon" {...register('video.message' as const)} />
              <Input placeholder="Sub-message" {...register('video.subMessage' as const)} />
            </div>
          )}
        </div>

        <LineListField control={control} name="cardHighlights" label="Homepage card highlights" rows={4} />
        <LineListField control={control} name="techTags" label="Tech tags" placeholder="One tag per line" />

        {/* Card teaser */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={!!cardTeaser}
              onCheckedChange={(checked) =>
                form.setValue('cardTeaser', checked ? { label: 'In Progress', items: [''] } : null)
              }
            />
            Show a homepage "in progress" teaser box for this project
          </label>
          {cardTeaser && (
            <div className="pl-6 space-y-2">
              <Input placeholder="Label (e.g. V2 — In Progress)" {...register('cardTeaser.label' as const)} />
              <LineListField control={control} name="cardTeaser.items" label="Teaser items" rows={3} />
            </div>
          )}
        </div>

        <SectionsField control={control} register={register} />

        {submitError && <p className="text-sm text-[var(--destructive)]">{submitError}</p>}

        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Create project'}
          </Button>
          <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
            Preview
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin')}>
            Cancel
          </Button>
        </div>
      </form>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          {previewOpen && (
            <ProjectDetailView
              project={{ ...form.getValues(), id: 'preview', createdAt: '', updatedAt: '' } as unknown as Project}
              prev={null}
              next={null}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={pendingSave !== null} onOpenChange={(open) => !open && setPendingSave(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change this project's URL?</AlertDialogTitle>
            <AlertDialogDescription>
              This project is published and its slug changed from "{originalSlug}" to "{pendingSave?.slug}". Any
              existing links or bookmarks to /projects/{originalSlug} will stop working. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingSave(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (pendingSave) await doSave(pendingSave);
                setPendingSave(null);
              }}
            >
              Save anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
