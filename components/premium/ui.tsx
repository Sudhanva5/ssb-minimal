import * as React from 'react';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@kishanscaler/ssx-ui';

/** A pill link whose arrow slides out and a fresh one slides in on hover. */
export function Pill({
  href,
  children,
  tone = 'dark',
  external = false,
  apply = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  external?: boolean;
  /** Opens the application drawer instead of following the link. */
  apply?: boolean;
  className?: string;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a href={href} data-apply={apply || undefined} className={cn('pill', tone === 'dark' ? 'pill-dark' : 'pill-light', className)}>
      {children}
      <span className="knob" aria-hidden>
        <Icon className="size-icon-sm" />
        <Icon className="size-icon-sm" />
      </span>
    </a>
  );
}

/** A small uppercase label with a green dot. */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('kicker flex items-center gap-2 text-[var(--pm-green)]', className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-[var(--pm-green)]" />
      {children}
    </p>
  );
}

/** Masked words that rise in, staggered (uses the global `.reveal-words`). */
export function Rise({ text, className, start = 0 }: { text: string; className?: string; start?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <React.Fragment key={i}>
          <span className={cn('w', className)}>
            <span style={{ ['--i' as string]: start + i }}>{w}</span>
          </span>{' '}
        </React.Fragment>
      ))}
    </>
  );
}

/** Section frame: the 1200px measure plus the page gutter. */
export function Wrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-(--site-content-max) px-gutter', className)}>{children}</div>;
}
