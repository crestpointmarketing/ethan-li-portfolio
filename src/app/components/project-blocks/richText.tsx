import { Fragment, type ReactNode } from 'react';

/**
 * Parses a deliberately constrained subset of markup: `**accent text**`
 * renders as the brand-accent, medium-weight span used throughout the site;
 * everything else renders as plain text. This is not a markdown/HTML parser
 * and never routes through dangerouslySetInnerHTML, so admin-authored
 * content (gated only by a single shared password) can't become a stored-XSS
 * vector even if the admin account is ever compromised.
 */
export function parseInlineAccent(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*(.+)\*\*$/);
    if (match) {
      return (
        <span key={i} className="text-[#08874a] dark:text-[#16A34A] font-medium">
          {match[1]}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
