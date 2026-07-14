import { useFieldArray, useWatch, Controller, type Control, type UseFormRegister } from 'react-hook-form';
import type { BlockType } from '@shared/projectSchema';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Card } from '../../../components/ui/card';
import { LineListField } from './LineListField';

const BLOCK_TYPES: { value: BlockType; label: string }[] = [
  { value: 'prose', label: 'Prose (paragraphs)' },
  { value: 'bullets', label: 'Bullet list' },
  { value: 'labeled_bullets', label: 'Labeled bullet list' },
  { value: 'steps', label: 'Numbered/lettered steps' },
  { value: 'mini_cards', label: '2-column mini cards' },
  { value: 'tech_columns', label: 'Tech stack columns' },
  { value: 'next_steps', label: '"What\'s next" callout' },
];

function defaultsForType(type: BlockType) {
  switch (type) {
    case 'prose':
      return { type, variant: 'flat', paragraphs: [''] };
    case 'bullets':
      return { type, variant: 'flat', items: [''] };
    case 'labeled_bullets':
      return { type, variant: 'flat', density: 'compact', items: [{ label: '', body: '' }] };
    case 'steps':
      return { type, variant: 'flat', items: [{ marker: '1', title: '', body: '' }] };
    case 'mini_cards':
      return { type, variant: 'flat', items: [{ title: '', body: '' }] };
    case 'tech_columns':
      return { type, variant: 'flat', columns: [{ heading: '', items: [''] }] };
    case 'next_steps':
      return { type, variant: 'gradient', statusLabel: 'In Progress', items: [''] };
  }
}

/** One block within a section. `name` is the RHF path, e.g. `sections.0.blocks.1`. */
export function BlockEditor({
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
  const type: BlockType = useWatch({ control, name: `${name}.type` });

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Controller
          control={control}
          name={`${name}.type`}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(defaultsForType(value as BlockType))}
            >
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BLOCK_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          Remove block
        </Button>
      </div>

      {type !== 'next_steps' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Title (optional)</Label>
            <Input {...register(`${name}.title` as const)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Style</Label>
            <Controller
              control={control}
              name={`${name}.variant`}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat card</SelectItem>
                    <SelectItem value="gradient">Gradient highlight</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      )}

      {type !== 'prose' && (
        <div className="space-y-1">
          <Label className="text-xs">Intro paragraph (optional)</Label>
          <Textarea rows={2} {...register(`${name}.intro` as const)} />
        </div>
      )}

      {type === 'prose' && <LineListField control={control} name={`${name}.paragraphs`} label="Paragraphs" rows={5} />}
      {type === 'bullets' && <LineListField control={control} name={`${name}.items`} label="Bullet items" rows={4} />}
      {type === 'labeled_bullets' && <LabeledBulletsRows control={control} register={register} name={name} />}
      {type === 'steps' && <StepsRows control={control} register={register} name={name} />}
      {type === 'mini_cards' && <MiniCardsRows control={control} register={register} name={name} />}
      {type === 'tech_columns' && <TechColumnsRows control={control} register={register} name={name} />}
      {type === 'next_steps' && (
        <>
          <div className="space-y-1">
            <Label className="text-xs">Status label</Label>
            <Input placeholder="In Progress" {...register(`${name}.statusLabel` as const)} />
          </div>
          <LineListField control={control} name={`${name}.items`} label="Items" rows={4} />
        </>
      )}
    </Card>
  );
}

function LabeledBulletsRows({ control, register, name }: { control: Control<any>; register: UseFormRegister<any>; name: string }) {
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.items` });
  return (
    <div className="space-y-2">
      <Label className="text-xs">Items</Label>
      {fields.map((field, i) => (
        <div key={field.id} className="flex items-start gap-2">
          <Input className="w-40" placeholder="Label (optional)" {...register(`${name}.items.${i}.label` as const)} />
          <Textarea rows={2} className="flex-1" placeholder="Body" {...register(`${name}.items.${i}.body` as const)} />
          <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ label: '', body: '' })}>
        Add item
      </Button>
    </div>
  );
}

function StepsRows({ control, register, name }: { control: Control<any>; register: UseFormRegister<any>; name: string }) {
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.items` });
  return (
    <div className="space-y-2">
      <Label className="text-xs">Steps</Label>
      {fields.map((field, i) => (
        <div key={field.id} className="flex items-start gap-2">
          <Input className="w-16" placeholder="1" {...register(`${name}.items.${i}.marker` as const)} />
          <div className="flex-1 space-y-2">
            <Input placeholder="Step title" {...register(`${name}.items.${i}.title` as const)} />
            <Textarea rows={2} placeholder="Step description" {...register(`${name}.items.${i}.body` as const)} />
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ marker: String(fields.length + 1), title: '', body: '' })}
      >
        Add step
      </Button>
    </div>
  );
}

function MiniCardsRows({ control, register, name }: { control: Control<any>; register: UseFormRegister<any>; name: string }) {
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.items` });
  return (
    <div className="space-y-2">
      <Label className="text-xs">Cards</Label>
      {fields.map((field, i) => (
        <div key={field.id} className="flex items-start gap-2">
          <Input className="w-48" placeholder="Card title" {...register(`${name}.items.${i}.title` as const)} />
          <Textarea rows={2} className="flex-1" placeholder="Card body" {...register(`${name}.items.${i}.body` as const)} />
          <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ title: '', body: '' })}>
        Add card
      </Button>
    </div>
  );
}

function TechColumnsRows({ control, register, name }: { control: Control<any>; register: UseFormRegister<any>; name: string }) {
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.columns` });
  return (
    <div className="space-y-2">
      <Label className="text-xs">Columns</Label>
      {fields.map((field, i) => (
        <div key={field.id} className="border border-[var(--border)] rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input className="flex-1" placeholder="Column heading (e.g. AI/ML)" {...register(`${name}.columns.${i}.heading` as const)} />
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
              Remove column
            </Button>
          </div>
          <LineListField control={control} name={`${name}.columns.${i}.items`} label="Items" rows={3} />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ heading: '', items: [''] })}>
        Add column
      </Button>
    </div>
  );
}
