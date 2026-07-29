import type { Block } from '@shared/projectSchema';
import { BlockCard } from './BlockCard';
import { parseInlineAccent } from './richText';

/**
 * A multi-column comparison matrix (e.g. V1 vs V2 vs V3 across many
 * dimensions). The first column is treated as the row-label column; the
 * remaining columns are the things being compared. On narrow screens the
 * table scrolls horizontally inside its own container so the page body never
 * overflows.
 */
export function ComparisonTableBlock({ block }: { block: Extract<Block, { type: 'comparison_table' }> }) {
  return (
    <BlockCard title={block.title} intro={block.intro} variant={block.variant}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {block.columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={
                    i === 0
                      ? 'text-left align-bottom py-3 pr-4 font-semibold text-[var(--muted-foreground)] w-44'
                      : 'text-left align-bottom py-3 px-4 font-semibold text-[#08874a] dark:text-[#16A34A]'
                  }
                >
                  {parseInlineAccent(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-[var(--border)]/50 last:border-0 align-top">
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="text-left py-3 pr-4 font-medium text-[var(--foreground)] w-44"
                    >
                      {parseInlineAccent(cell)}
                    </th>
                  ) : (
                    <td key={ci} className="py-3 px-4 text-[var(--foreground)]/85 leading-relaxed">
                      {parseInlineAccent(cell)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BlockCard>
  );
}
