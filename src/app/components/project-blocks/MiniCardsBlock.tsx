import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';

export function MiniCardsBlock({ block }: { block: Extract<Block, { type: 'mini_cards' }> }) {
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {block.items.map((card, i) => (
          <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
            <h5 className="text-sm font-medium text-[#08874a] dark:text-[#16A34A] mb-2">{card.title}</h5>
            <p className="text-xs text-[var(--muted-foreground)]">{card.body}</p>
          </div>
        ))}
      </div>
    </BlockCard>
  );
}
