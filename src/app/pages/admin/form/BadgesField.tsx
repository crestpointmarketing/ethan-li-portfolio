import { useFieldArray, Controller, type Control, type UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

export function BadgesField({ control, register }: { control: Control<any>; register: UseFormRegister<any> }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'badges' });

  return (
    <div className="space-y-2">
      <Label>Badges</Label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Badge text (e.g. Internship)"
              {...register(`badges.${index}.text` as const)}
            />
            <Controller
              control={control}
              name={`badges.${index}.variant`}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accent">Accent</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append({ text: '', variant: 'neutral' })}>
        Add badge
      </Button>
    </div>
  );
}
