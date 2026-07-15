import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import type { AchievementCategory, AchievementsMeta } from '@shared/siteContentSchema';
import {
  listAchievementCategories,
  createAchievementCategory,
  updateAchievementCategory,
  deleteAchievementCategory,
  reorderAchievementCategories,
  getAchievementsMeta,
  updateAchievementsMeta,
  AdminApiError,
} from '../../lib/adminApi';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { KeyValueListField } from './form/KeyValueListField';

type FormCategory = { id?: string; category: string; orderIndex: number; awards: { title: string; achievement: string; description: string; date: string }[] };
type FormValues = AchievementsMeta & { categories: FormCategory[] };

const EMPTY: FormValues = { subtitle: '', stats: [], categories: [] };

function AwardsField({ control, register, name }: { control: Control<any>; register: UseFormRegister<any>; name: string }) {
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.awards` });
  return (
    <div className="space-y-3 pl-4 border-l-2 border-[var(--border)]">
      {fields.map((field, i) => (
        <div key={field.id} className="space-y-2 pb-2 border-b border-[var(--border)] last:border-0 last:pb-0">
          <div className="grid grid-cols-4 gap-2">
            <Input className="col-span-2" placeholder="Title" {...register(`${name}.awards.${i}.title` as const)} />
            <Input placeholder="Achievement (1st Place, Gold, ...)" {...register(`${name}.awards.${i}.achievement` as const)} />
            <Input placeholder="Date (e.g. Spring 2025)" {...register(`${name}.awards.${i}.date` as const)} />
          </div>
          <div className="flex gap-2">
            <Textarea rows={1} placeholder="Description" {...register(`${name}.awards.${i}.description` as const)} />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
              onClick={() => remove(i)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ title: '', achievement: '', description: '', date: '' })}
      >
        Add award
      </Button>
    </div>
  );
}

export default function AdminAchievementsPage() {
  const form = useForm<FormValues>({ defaultValues: EMPTY });
  const { control, register, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'categories' });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const originalIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([listAchievementCategories(), getAchievementsMeta()])
      .then(([{ categories }, { meta }]) => {
        originalIds.current = new Set(categories.map((c) => c.id));
        form.reset({
          subtitle: meta?.subtitle ?? '',
          stats: meta?.stats ?? [],
          categories: categories.map((c) => ({
            id: c.id,
            category: c.category,
            orderIndex: c.orderIndex,
            awards: c.awards.map((a) => ({ ...a, date: a.date ?? '' })),
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
      await updateAchievementsMeta({
        subtitle: raw.subtitle.trim(),
        stats: raw.stats.filter((s) => s.value.trim() && s.label.trim()),
      });

      const currentIds = new Set(raw.categories.filter((c) => c.id).map((c) => c.id!));
      const deletedIds = [...originalIds.current].filter((id) => !currentIds.has(id));
      await Promise.all(deletedIds.map((id) => deleteAchievementCategory(id)));

      const savedIds: string[] = [];
      for (const [index, cat] of raw.categories.entries()) {
        const input = {
          category: cat.category.trim(),
          orderIndex: index,
          awards: cat.awards
            .map((a) => ({
              title: a.title.trim(),
              achievement: a.achievement.trim(),
              description: a.description.trim(),
              date: a.date.trim() || null,
            }))
            .filter((a) => a.title && a.achievement && a.description),
        };
        if (cat.id) {
          await updateAchievementCategory(cat.id, input);
          savedIds.push(cat.id);
        } else {
          const { category } = await createAchievementCategory(input);
          savedIds.push(category.id);
        }
      }
      await reorderAchievementCategories(savedIds);

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
      <h1 className="text-2xl font-semibold mb-6">Achievements</h1>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Label htmlFor="subtitle">Section subtitle</Label>
          <Input id="subtitle" {...register('subtitle')} required />
        </div>

        <div className="max-w-2xl">
          <KeyValueListField
            control={control}
            register={register}
            name="stats"
            label="Stats row"
            field1={{ key: 'value', placeholder: 'Value', className: 'w-32' }}
            field2={{ key: 'label', placeholder: 'Label', className: 'flex-1' }}
            emptyRow={{ value: '', label: '' }}
          />
        </div>

        <div className="space-y-4">
          <Label>Categories</Label>
          {fields.map((field, i) => (
            <div key={field.id} className="border border-[var(--border)] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Input className="flex-1" placeholder="Category name" {...register(`categories.${i}.category` as const)} />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
                  onClick={() => remove(i)}
                >
                  Remove category
                </Button>
              </div>
              <AwardsField control={control} register={register} name={`categories.${i}`} />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ category: '', orderIndex: fields.length, awards: [] })}
          >
            Add category
          </Button>
        </div>

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
