import { useFieldArray, Controller, type Control, type UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';

/** Repeatable {heading, items: string[]} columns — items edited as one-per-line text. */
export function TechColumnsField({
  control,
  register,
  name,
  label,
}: {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
}) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="border border-[var(--border)] rounded-lg p-3 space-y-2">
            <Input placeholder="Column heading" {...register(`${name}.${index}.heading` as const)} />
            <Controller
              control={control}
              name={`${name}.${index}.items`}
              render={({ field: itemsField }) => (
                <Textarea
                  rows={3}
                  placeholder="One item per line"
                  value={Array.isArray(itemsField.value) ? itemsField.value.join('\n') : ''}
                  onChange={(e) => itemsField.onChange(e.target.value.split('\n'))}
                  onBlur={itemsField.onBlur}
                />
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
              onClick={() => remove(index)}
            >
              Remove column
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append({ heading: '', items: [] })}>
        Add column
      </Button>
    </div>
  );
}
