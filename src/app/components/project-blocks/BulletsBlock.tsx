import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';
import { parseInlineAccent } from './richText';

export function BulletsBlock({ block }: { block: Extract<Block, { type: 'bullets' }> }) {
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#16A34A] mt-2 flex-shrink-0" />
            <span className="text-[var(--muted-foreground)]">{parseInlineAccent(item)}</span>
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}
