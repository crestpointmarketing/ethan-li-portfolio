import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ContactContent } from '@shared/siteContentSchema';
import { getContact, updateContact, AdminApiError } from '../../lib/adminApi';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { KeyValueListField } from './form/KeyValueListField';

const EMPTY: ContactContent = {
  headingLine1: '',
  headingAccent: '',
  blurb: '',
  email: '',
  phone: '',
  location: '',
  socialLinks: [],
  footerText: '',
};

export default function AdminContactForm() {
  const form = useForm<ContactContent>({ defaultValues: EMPTY });
  const { control, register, handleSubmit } = form;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getContact()
      .then(({ contact }) => {
        if (contact) form.reset({ ...contact, phone: contact.phone ?? '' });
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
      const cleaned: ContactContent = {
        ...raw,
        phone: raw.phone?.trim() || null,
        socialLinks: raw.socialLinks.filter((l) => l.platform.trim() && l.url.trim()),
      };
      await updateContact(cleaned);
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
      <h1 className="text-2xl font-semibold mb-6">Contact</h1>

      <form onSubmit={onSubmit} className="space-y-8 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="headingLine1">Heading (line 1)</Label>
            <Input id="headingLine1" placeholder="Let's Build" {...register('headingLine1')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headingAccent">Heading (accent line)</Label>
            <Input id="headingAccent" placeholder="Something Great" {...register('headingAccent')} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="blurb">Blurb</Label>
          <Textarea id="blurb" rows={3} {...register('blurb')} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" {...register('phone')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Dallas, TX" {...register('location')} required />
          </div>
        </div>

        <KeyValueListField
          control={control}
          register={register}
          name="socialLinks"
          label="Social links"
          field1={{ key: 'platform', placeholder: 'LinkedIn', className: 'w-40' }}
          field2={{ key: 'url', placeholder: 'https://...', className: 'flex-1' }}
          emptyRow={{ platform: '', url: '' }}
        />

        <div className="space-y-2">
          <Label htmlFor="footerText">Footer text</Label>
          <Input id="footerText" {...register('footerText')} required />
        </div>

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
