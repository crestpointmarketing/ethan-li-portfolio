import { useFieldArray, Controller, type Control, type UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';

export function StatsField({ control, register }: { control: Control<any>; register: UseFormRegister<any> }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'stats' });

  return (
    <div className="space-y-2">
      <Label>Hero stats</Label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input className="w-32" placeholder="Value (46%)" {...register(`stats.${index}.value` as const)} />
            <Input className="flex-1" placeholder="Label" {...register(`stats.${index}.label` as const)} />
            <Controller
              control={control}
              name={`stats.${index}.noWrap`}
              render={({ field }) => (
                <label className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                  <Checkbox checked={!!field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                  No wrap
                </label>
              )}
            />
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
      <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '', label: '' })}>
        Add stat
      </Button>
    </div>
  );
}
