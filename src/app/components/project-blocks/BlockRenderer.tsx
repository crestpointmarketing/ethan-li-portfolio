import { blockSchema } from '@shared/projectSchema';
import { ProseBlock } from './ProseBlock';
import { BulletsBlock } from './BulletsBlock';
import { LabeledBulletsBlock } from './LabeledBulletsBlock';
import { StepsBlock } from './StepsBlock';
import { MiniCardsBlock } from './MiniCardsBlock';
import { TechColumnsBlock } from './TechColumnsBlock';
import { NextStepsBlock } from './NextStepsBlock';

/**
 * Renders one content block. Blocks are validated again here (not just at
 * write time) because jsonb read back from Postgres bypasses TypeScript
 * entirely — a row hand-edited in the Supabase SQL editor could otherwise
 * crash the whole public detail page. A block that fails validation
 * degrades to a small placeholder instead.
 */
export function BlockRenderer({ block }: { block: unknown }) {
  const parsed = blockSchema.safeParse(block);
  if (!parsed.success) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-sm text-[var(--muted-foreground)]">
        This content block couldn&apos;t be displayed.
      </div>
    );
  }

  switch (parsed.data.type) {
    case 'prose':
      return <ProseBlock block={parsed.data} />;
    case 'bullets':
      return <BulletsBlock block={parsed.data} />;
    case 'labeled_bullets':
      return <LabeledBulletsBlock block={parsed.data} />;
    case 'steps':
      return <StepsBlock block={parsed.data} />;
    case 'mini_cards':
      return <MiniCardsBlock block={parsed.data} />;
    case 'tech_columns':
      return <TechColumnsBlock block={parsed.data} />;
    case 'next_steps':
      return <NextStepsBlock block={parsed.data} />;
    default:
      return null;
  }
}
