import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';
import { parseInlineAccent } from './richText';

export function LabeledBulletsBlock({ block }: { block: Extract<Block, { type: 'labeled_bullets' }> }) {
  const loose = block.density === 'loose';
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <ul className={loose ? 'space-y-3' : 'space-y-2'}>
        {block.items.map((item, i) => {
          const body = (
            <>
              {item.label && <span className="font-medium">{item.label}:</span>}{' '}
              <span className="text-[var(--muted-foreground)]">{parseInlineAccent(item.body)}</span>
            </>
          );
          return (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#16A34A] mt-2 flex-shrink-0" />
              {loose ? <div>{body}</div> : <span>{body}</span>}
            </li>
          );
        })}
      </ul>
    </BlockCard>
  );
}
