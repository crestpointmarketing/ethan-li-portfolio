import type { ReactNode } from 'react';
import { parseInlineAccent } from './richText';

/**
 * Every content-block pattern on the old hand-coded detail pages rendered
 * inside the same shell: an optional h3 title, an optional intro paragraph,
 * and either a flat card or a gradient "highlight" card. This is that shell.
 */
export function BlockCard({
  title,
  intro,
  variant = 'flat',
  children,
}: {
  title?: string;
  intro?: string;
  variant?: 'flat' | 'gradient';
  children: ReactNode;
}) {
  const containerClass =
    variant === 'gradient'
      ? 'bg-gradient-to-br from-[#08874a]/10 dark:from-[#16A34A]/10 to-transparent border border-[#08874a]/30 dark:border-[#16A34A]/30 rounded-xl p-8'
      : 'bg-[var(--card)] border border-[var(--border)] rounded-xl p-8';

  return (
    <div className={containerClass}>
      {title && <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#16A34A] mb-4">{title}</h3>}
      {intro && <p className="text-[var(--foreground)]/90 leading-relaxed mb-4">{parseInlineAccent(intro)}</p>}
      {children}
    </div>
  );
}
