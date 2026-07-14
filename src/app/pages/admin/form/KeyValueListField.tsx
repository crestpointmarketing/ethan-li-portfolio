import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';

/** Repeatable {field1, field2} rows — used for stats, certifications, social links, etc. */
export function KeyValueListField({
  control,
  register,
  name,
  label,
  field1,
  field2,
  emptyRow,
}: {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
  field1: { key: string; placeholder: string; className?: string };
  field2: { key: string; placeholder: string; className?: string };
  emptyRow: Record<string, string>;
}) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              className={field1.className ?? 'w-40'}
              placeholder={field1.placeholder}
              {...register(`${name}.${index}.${field1.key}` as const)}
            />
            <Input
              className={field2.className ?? 'flex-1'}
              placeholder={field2.placeholder}
              {...register(`${name}.${index}.${field2.key}` as const)}
            />
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append(emptyRow)}>
        Add
      </Button>
    </div>
  );
}
