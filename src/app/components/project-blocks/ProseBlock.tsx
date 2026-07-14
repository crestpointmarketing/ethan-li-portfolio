import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';
import { parseInlineAccent } from './richText';

export function ProseBlock({ block }: { block: Extract<Block, { type: 'prose' }> }) {
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <div className="space-y-4">
        {block.paragraphs.map((p, i) => (
          <p key={i} className="text-[var(--foreground)]/90 leading-relaxed">
            {parseInlineAccent(p)}
          </p>
        ))}
      </div>
    </BlockCard>
  );
}
