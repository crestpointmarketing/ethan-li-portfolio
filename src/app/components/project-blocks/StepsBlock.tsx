import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';

export function StepsBlock({ block }: { block: Extract<Block, { type: 'steps' }> }) {
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <div className="space-y-4">
        {block.items.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#08874a]/20 dark:bg-[#16A34A]/20 flex items-center justify-center flex-shrink-0 text-[#08874a] dark:text-[#16A34A] font-bold text-sm">
              {step.marker}
            </div>
            <div>
              <h4 className="font-medium mb-1">{step.title}</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </BlockCard>
  );
}
