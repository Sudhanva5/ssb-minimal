import * as React from 'react';
import { cn } from '@kishanscaler/ssx-ui';

/** Splits text into masked words that rise in, staggered (`.reveal-words`). */
export function Words({ text, start = 0, className }: { text: string; start?: number; className?: string }) {
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

/** The section opener: a large two-tone headline that rises in word by word, and an optional lede. */
export function SectionHeading({
  id,
  title,
  accent,
  children,
  className,
}: {
  id: string;
  title: string;
  accent?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const n = title.split(' ').length;
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <h2
        id={id}
        className="reveal-words text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance"
      >
        <Words text={title} />
        {accent && <Words text={accent} start={n} className="text-action-primary" />}
      </h2>
      {children && <div className="reveal max-w-[34rem] text-[1.0625rem] leading-7 text-content-secondary">{children}</div>}
    </div>
  );
}

/** A band of the left column: vertical rhythm, and an anchor for the nav. */
export function Band({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={label} className="py-16 md:py-24">
      {children}
    </section>
  );
}

/** A sub-heading inside a band. */
export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="reveal text-[1.25rem] leading-7 font-semibold tracking-tight md:text-[1.375rem]">{children}</h3>;
}

/**
 * Bare logos on a continuous scroll, greyed until hovered. Two rows can run in
 * opposite directions (`reverse`). Rendered twice for a seamless loop.
 */
export function LogoMarquee({
  label,
  logos,
  dir,
  reverse = false,
}: {
  label: string;
  logos: readonly (readonly [string, string])[];
  dir: string;
  reverse?: boolean;
}) {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pe-12">
      {logos.map(([name, file]) => (
        <li key={name} className="flex h-10 shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${dir}/${file}`} alt={hidden ? '' : name} className="logo-mono h-[1.625rem] w-auto max-w-[8rem] object-contain" />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-gutter overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] md:mx-0"
    >
      <div className={cn('flex w-max', reverse ? 'anim-marquee-rev' : 'anim-marquee')}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
