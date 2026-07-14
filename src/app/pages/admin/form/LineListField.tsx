import { Controller, type Control } from 'react-hook-form';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';

/**
 * Editor for a plain string[] field (subtitles, tech tags, bullet items,
 * paragraphs, ...): one line of the textarea per array item. Avoids needing
 * a full add/remove-row useFieldArray for the common case of "just a list
 * of short strings".
 */
export function LineListField({
  control,
  name,
  label,
  placeholder,
  rows = 3,
}: {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            rows={rows}
            placeholder={placeholder ?? 'One per line'}
            value={Array.isArray(field.value) ? field.value.join('\n') : ''}
            onChange={(e) => field.onChange(e.target.value.split('\n'))}
            onBlur={field.onBlur}
          />
        )}
      />
      <p className="text-xs text-[var(--muted-foreground)]">One item per line.</p>
    </div>
  );
}
