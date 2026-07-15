import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';

/** Repeatable {title, body} rows — used for responsibilities, highlights, etc. */
export function TitledBodyListField({
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
            <Input placeholder="Title" {...register(`${name}.${index}.title` as const)} />
            <Textarea rows={2} placeholder="Body" {...register(`${name}.${index}.body` as const)} />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append({ title: '', body: '' })}>
        Add
      </Button>
    </div>
  );
}
