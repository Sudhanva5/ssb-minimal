'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@kishanscaler/ssx-ui';

const variants = [
  { href: '/', label: 'Classic' },
  { href: '/minimal', label: 'Minimal' },
  { href: '/premium', label: 'Premium' },
  { href: '/minimal-sudh', label: 'Sudh' },
];

/** Floating toggle between the three design variants. Fixed to the bottom on every page. */
export function VariantSwitcher() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Design variant"
      className="fixed bottom-4 left-1/2 z-overlay flex -translate-x-1/2 items-center gap-1 rounded-full border border-border-decorative bg-surface/90 p-1 backdrop-blur-glass"
    >
      <span className="hidden px-3 font-mono text-xs text-content-secondary sm:inline">VARIANT</span>
      {variants.map((v) => {
        const current = pathname === v.href;
        return (
          <NextLink
            key={v.href}
            href={v.href}
            aria-current={current ? 'page' : undefined}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium no-underline transition-colors',
              current ? 'bg-action-primary text-action-primary-fg' : 'text-content-secondary hover:bg-surface-hover hover:text-content',
            )}
          >
            {v.label}
          </NextLink>
        );
      })}
    </nav>
  );
}
