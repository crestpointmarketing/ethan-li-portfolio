import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { BlockEditor } from './BlockEditor';

/** One section within the project: a heading + its list of content blocks. `name` e.g. `sections.0`. */
export function SectionEditor({
  control,
  register,
  name,
  onRemove,
}: {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  onRemove: () => void;
}) {
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.blocks` });

  return (
    <Card className="p-5 space-y-4 border-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Label className="text-xs">Section heading</Label>
          <Input placeholder="e.g. Core Innovation & Technical Approach" {...register(`${name}.heading` as const)} />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-5 text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
          onClick={onRemove}
        >
          Remove section
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, i) => (
          <BlockEditor key={field.id} control={control} register={register} name={`${name}.blocks.${i}`} onRemove={() => remove(i)} />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ type: 'prose', variant: 'flat', paragraphs: [''] })}
      >
        Add block
      </Button>
    </Card>
  );
}
