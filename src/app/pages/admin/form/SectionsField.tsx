import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { SectionEditor } from './SectionEditor';

export function SectionsField({ control, register }: { control: Control<any>; register: UseFormRegister<any> }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'sections' });

  return (
    <div className="space-y-3">
      <Label>Content sections</Label>
      <div className="space-y-4">
        {fields.map((field, i) => (
          <SectionEditor
            key={field.id}
            control={control}
            register={register}
            name={`sections.${i}`}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            heading: '',
            orderIndex: fields.length,
            blocksVersion: 1,
            blocks: [],
          })
        }
      >
        Add section
      </Button>
    </div>
  );
}
