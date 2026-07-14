import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AboutContent } from '@shared/siteContentSchema';
import { getAbout, updateAbout, AdminApiError } from '../../lib/adminApi';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { LineListField } from './form/LineListField';
import { KeyValueListField } from './form/KeyValueListField';

const EMPTY: AboutContent = {
  schoolName: '',
  location: '',
  gradeText: '',
  yearRange: '',
  academicFocus: [],
  certifications: [],
  skills: [],
};

export default function AdminAboutForm() {
  const form = useForm<AboutContent>({ defaultValues: EMPTY });
  const { control, register, handleSubmit } = form;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAbout()
      .then(({ about }) => {
        if (about) form.reset(about);
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
      const cleaned: AboutContent = {
        ...raw,
        academicFocus: raw.academicFocus.map((s) => s.trim()).filter(Boolean),
        skills: raw.skills.map((s) => s.trim()).filter(Boolean),
        certifications: raw.certifications.filter((c) => c.title.trim() && c.org.trim()),
      };
      await updateAbout(cleaned);
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
      <h1 className="text-2xl font-semibold mb-6">About / Education</h1>

      <form onSubmit={onSubmit} className="space-y-8 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schoolName">School name</Label>
            <Input id="schoolName" {...register('schoolName')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Dallas, TX" {...register('location')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearRange">Year range</Label>
            <Input id="yearRange" placeholder="2023 - 2027" {...register('yearRange')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gradeText">Grade text</Label>
            <Input id="gradeText" placeholder="12th Grade (Fall 2026)" {...register('gradeText')} required />
          </div>
        </div>

        <LineListField control={control} name="academicFocus" label="Academic focus" placeholder="One item per line" />

        <KeyValueListField
          control={control}
          register={register}
          name="certifications"
          label="Certifications & learning"
          field1={{ key: 'title', placeholder: 'Certificate title', className: 'flex-1' }}
          field2={{ key: 'org', placeholder: 'Institution', className: 'flex-1' }}
          emptyRow={{ title: '', org: '' }}
        />

        <LineListField control={control} name="skills" label="Technical skills" placeholder="One skill per line" />

        {submitError && <p className="text-sm text-[var(--destructive)]">{submitError}</p>}
        {saved && <p className="text-sm text-[#08874a] dark:text-[#16A34A]">Saved.</p>}

        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
