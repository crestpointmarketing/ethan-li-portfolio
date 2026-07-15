import { useState } from 'react';
import { Controller, type Control } from 'react-hook-form';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { uploadFile, AdminApiError } from '../../../lib/adminApi';

/** Image or research-paper-PDF uploader, bound to a `string | null` form field holding the public URL. */
export function FileUploadField({
  control,
  name,
  label,
  kind,
  accept,
}: {
  control: Control<any>;
  name: string;
  label: string;
  kind: 'poster' | 'paper' | 'moment';
  accept: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <Label>{label}</Label>

          {field.value && kind !== 'paper' && (
            <img
              src={field.value}
              alt=""
              className="h-32 w-auto rounded-lg border border-[var(--border)] object-cover"
            />
          )}
          {field.value && kind === 'paper' && (
            <a
              href={field.value}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#08874a] dark:text-[#16A34A] underline break-all"
            >
              {field.value}
            </a>
          )}

          <div className="flex items-center gap-3">
            <input
              type="file"
              accept={accept}
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file) return;
                setError(null);
                setUploading(true);
                try {
                  const publicUrl = await uploadFile(kind, file);
                  field.onChange(publicUrl);
                } catch (err) {
                  setError(err instanceof AdminApiError ? err.message : 'Upload failed');
                } finally {
                  setUploading(false);
                }
              }}
              className="text-sm text-[var(--muted-foreground)]"
            />
            {field.value && (
              <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange(null)}>
                Remove
              </Button>
            )}
            {uploading && <span className="text-xs text-[var(--muted-foreground)]">Uploading&hellip;</span>}
          </div>

          {error && <p className="text-xs text-[var(--destructive)]">{error}</p>}
        </div>
      )}
    />
  );
}
