import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import type { Experience, ExperienceInput } from '@shared/siteContentSchema';
import { getExperience, createExperience, updateExperience, AdminApiError } from '../../lib/adminApi';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { LineListField } from './form/LineListField';
import { KeyValueListField } from './form/KeyValueListField';
import { TitledBodyListField } from './form/TitledBodyListField';
import { TechColumnsField } from './form/TechColumnsField';
import { ExperienceDetailView } from '../experience/ExperienceDetailView';

const EMPTY: ExperienceInput = {
  slug: '',
  company: '',
  companyTagline: '',
  role: '',
  badgeText: 'Internship',
  period: '',
  location: '',
  orderIndex: 0,
  published: false,
  summaryHighlights: [],
  heroStats: [],
  overviewParagraphs: [],
  responsibilities: [],
  techColumns: [],
  highlights: [],
  takeawayParagraphs: [],
};

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

export default function AdminExperienceForm() {
  const { id } = useParams<{ id: string }>();
  const mode: 'create' | 'edit' = id ? 'edit' : 'create';
  const navigate = useNavigate();

  const form = useForm<ExperienceInput>({ defaultValues: EMPTY });
  const { control, register, handleSubmit } = form;

  const [loading, setLoading] = useState(mode === 'edit');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (mode !== 'edit' || !id) return;
    let cancelled = false;
    getExperience(id)
      .then(({ experience }) => {
        if (cancelled) return;
        form.reset(experience);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof AdminApiError ? err.message : 'Failed to load experience');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode]);

  const onSubmit = handleSubmit(async (raw) => {
    setSubmitError(null);
    const cleaned = cleanStringArraysDeep(raw) as ExperienceInput;
    setSaving(true);
    try {
      if (mode === 'edit' && id) {
        await updateExperience(id, cleaned);
      } else {
        await createExperience(cleaned);
      }
      navigate('/admin/experience');
    } catch (err) {
      setSubmitError(err instanceof AdminApiError ? err.message : 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  });

  if (loading) return <p className="text-[var(--muted-foreground)]">Loading&hellip;</p>;
  if (loadError) return <p className="text-sm text-[var(--destructive)]">{loadError}</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{mode === 'edit' ? 'Edit Experience' : 'New Experience'}</h1>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" {...register('role')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="onesource-cloud" {...register('slug')} required />
            <p className="text-xs text-[var(--muted-foreground)]">Used in the URL: /experience/&lt;slug&gt;</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register('company')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyTagline">Company tagline</Label>
            <Input id="companyTagline" placeholder="AI Data Center & Private AI Service Provider" {...register('companyTagline')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="badgeText">Badge text</Label>
            <Input id="badgeText" placeholder="Internship" {...register('badgeText')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Input id="period" placeholder="Summer 2025 – Present" {...register('period')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Richardson, TX" {...register('location')} required />
          </div>
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

        <LineListField
          control={control}
          name="summaryHighlights"
          label="Homepage summary highlights"
          rows={4}
        />

        <KeyValueListField
          control={control}
          register={register}
          name="heroStats"
          label="Detail-page hero stats"
          field1={{ key: 'value', placeholder: 'Value', className: 'w-32' }}
          field2={{ key: 'label', placeholder: 'Label', className: 'flex-1' }}
          emptyRow={{ value: '', label: '' }}
        />

        <LineListField control={control} name="overviewParagraphs" label="Overview paragraphs" rows={4} />

        <TitledBodyListField control={control} register={register} name="responsibilities" label="Key responsibilities" />

        <TechColumnsField control={control} register={register} name="techColumns" label="Technical areas explored" />

        <TitledBodyListField
          control={control}
          register={register}
          name="highlights"
          label="Highlights (e.g. conferences — rendered as gradient cards)"
        />

        <LineListField control={control} name="takeawayParagraphs" label="Key takeaway paragraphs" rows={4} />

        {submitError && <p className="text-sm text-[var(--destructive)]">{submitError}</p>}

        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Create experience'}
          </Button>
          <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
            Preview
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/experience')}>
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
            <ExperienceDetailView experience={{ ...form.getValues(), id: 'preview' } as unknown as Experience} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
