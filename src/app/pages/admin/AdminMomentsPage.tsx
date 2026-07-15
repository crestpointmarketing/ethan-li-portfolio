import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  listMoments,
  createMoment,
  updateMoment,
  deleteMoment,
  reorderMoments,
  AdminApiError,
} from '../../lib/adminApi';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { FileUploadField } from './form/FileUploadField';

type FormMoment = {
  id?: string;
  imageUrl: string;
  caption: string;
  tag: string;
  momentDate: string;
  published: boolean;
};
type FormValues = { moments: FormMoment[] };

const EMPTY: FormValues = { moments: [] };

export default function AdminMomentsPage() {
  const form = useForm<FormValues>({ defaultValues: EMPTY });
  const { control, register, handleSubmit } = form;
  const { fields, append, remove, move } = useFieldArray({ control, name: 'moments' });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const originalIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    listMoments()
      .then(({ moments }) => {
        originalIds.current = new Set(moments.map((m) => m.id));
        form.reset({
          moments: moments.map((m) => ({
            id: m.id,
            imageUrl: m.imageUrl,
            caption: m.caption,
            tag: m.tag ?? '',
            momentDate: m.momentDate ?? '',
            published: m.published,
          })),
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(err instanceof AdminApiError ? err.message : 'Failed to load');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (raw) => {
    setSubmitError(null);
    setSaved(false);
    setSaving(true);
    try {
      const currentIds = new Set(raw.moments.filter((m) => m.id).map((m) => m.id!));
      const deletedIds = [...originalIds.current].filter((id) => !currentIds.has(id));
      await Promise.all(deletedIds.map((id) => deleteMoment(id)));

      const savedIds: string[] = [];
      for (const [index, m] of raw.moments.entries()) {
        const input = {
          imageUrl: m.imageUrl.trim(),
          caption: m.caption.trim(),
          tag: m.tag.trim() || null,
          momentDate: m.momentDate.trim() || null,
          orderIndex: index,
          published: m.published,
        };
        if (!input.imageUrl || !input.caption) continue;
        if (m.id) {
          await updateMoment(m.id, input);
          savedIds.push(m.id);
        } else {
          const { moment } = await createMoment(input);
          savedIds.push(moment.id);
        }
      }
      await reorderMoments(savedIds);

      originalIds.current = new Set(savedIds);
      setSaved(true);
    } catch (err) {
      setSubmitError(err instanceof AdminApiError ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  });

  if (loading) return <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>;
  if (loadError) return <p className="text-sm text-[var(--destructive)]">{loadError}</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Moments</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">
        Photos and short notes from outside the résumé &mdash; volunteering, F1 weekends, everyday life. Only
        published moments show up on the site.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        {fields.map((field, i) => (
          <div key={field.id} className="border border-[var(--border)] rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-xs leading-none">
                <button
                  type="button"
                  onClick={() => i > 0 && move(i, i - 1)}
                  disabled={i === 0}
                  className="disabled:opacity-30 text-[var(--muted-foreground)] hover:text-[var(--foreground)] py-0.5"
                  aria-label="Move up"
                >
                  &#9650;
                </button>
                <button
                  type="button"
                  onClick={() => i < fields.length - 1 && move(i, i + 1)}
                  disabled={i === fields.length - 1}
                  className="disabled:opacity-30 text-[var(--muted-foreground)] hover:text-[var(--foreground)] py-0.5"
                  aria-label="Move down"
                >
                  &#9660;
                </button>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
                onClick={() => remove(i)}
              >
                Remove moment
              </Button>
            </div>

            <FileUploadField
              control={control}
              name={`moments.${i}.imageUrl` as const}
              label="Photo"
              kind="moment"
              accept="image/*"
            />

            <div className="space-y-2">
              <Label htmlFor={`caption-${i}`}>Caption</Label>
              <Textarea
                id={`caption-${i}`}
                rows={2}
                placeholder="A quick line about this moment"
                {...register(`moments.${i}.caption` as const)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`tag-${i}`}>Tag (optional)</Label>
                <Input
                  id={`tag-${i}`}
                  placeholder="Volunteering, F1, Life..."
                  {...register(`moments.${i}.tag` as const)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`date-${i}`}>Date (optional)</Label>
                <Input
                  id={`date-${i}`}
                  placeholder="June 2026"
                  {...register(`moments.${i}.momentDate` as const)}
                />
              </div>
            </div>

            <Controller
              control={control}
              name={`moments.${i}.published` as const}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Checkbox checked={!!field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                  Published
                </label>
              )}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({ imageUrl: '', caption: '', tag: '', momentDate: '', published: false })
          }
        >
          Add moment
        </Button>

        {submitError && <p className="text-sm text-[var(--destructive)]">{submitError}</p>}
        {saved && <p className="text-sm text-[#08874a] dark:text-[#16A34A]">Saved.</p>}

        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save all'}
          </Button>
        </div>
      </form>
    </div>
  );
}
