import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';
import { parseInlineAccent } from './richText';

export function NextStepsBlock({ block }: { block: Extract<Block, { type: 'next_steps' }> }) {
  return (
    <BlockCard variant={block.variant}>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 text-xs font-medium bg-[#08874a]/20 dark:bg-[#16A34A]/20 text-[#08874a] dark:text-[#16A34A] border border-[#08874a]/30 dark:border-[#16A34A]/30 rounded-full">
          {block.statusLabel}
        </span>
      </div>
      {block.intro && (
        <p className="text-[var(--foreground)]/90 leading-relaxed mb-6">{parseInlineAccent(block.intro)}</p>
      )}
      <ul className="space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#08874a] dark:text-[#16A34A] mt-1 flex-shrink-0">&#9657;</span>
            <span className="text-[var(--foreground)]/90 leading-relaxed">{parseInlineAccent(item)}</span>
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}
