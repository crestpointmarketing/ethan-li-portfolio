import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';

export function TechColumnsBlock({ block }: { block: Extract<Block, { type: 'tech_columns' }> }) {
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <div className="grid grid-cols-2 gap-6">
        {block.columns.map((column, i) => (
          <div key={i}>
            <h4 className="font-medium mb-2 text-sm text-[var(--muted-foreground)]">{column.heading}</h4>
            <ul className="space-y-2 text-sm text-[var(--foreground)]/90">
              {column.items.map((item, j) => (
                <li key={j}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </BlockCard>
  );
}
