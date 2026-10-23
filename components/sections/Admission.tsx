'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button, cn } from '@kishanscaler/ssx-ui';
import { ArrowRight, Lightning } from '@phosphor-icons/react';
import { CountUp } from '../motion/CountUp';
import { admission } from '../v3data';
import { Band, SectionHeading } from './shared';

const d = (v: number) => ({ ['--d' as string]: v }) as React.CSSProperties;

/** Days, hours and minutes until a deadline (end of that day, IST), ticking every 30s. */
function Countdown({ deadline }: { deadline: string }) {
  const end = React.useMemo(() => new Date(`${deadline} 23:59:59 GMT+0530`).getTime(), [deadline]);
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, end - now);
  const parts = [
    { v: Math.floor(ms / 86_400_000), l: 'days' },
    { v: Math.floor(ms / 3_600_000) % 24, l: 'hrs' },
    { v: Math.floor(ms / 60_000) % 60, l: 'min' },
  ];
  return (
    <div role="timer" aria-label="Time left to apply" className="flex gap-2">
      {parts.map((p) => (
        <span key={p.l} className="flex min-w-[3.5rem] flex-col items-center rounded-lg bg-surface px-2 py-2">
          <span className="text-[1.5rem] leading-none font-semibold tabular-nums">{String(p.v).padStart(2, '0')}</span>
          <span className="mt-1 text-[0.6875rem] text-content-secondary">{p.l}</span>
        </span>
      ))}
    </div>
  );
}

type Intake = { intake: string; deadline: string; appFee: string; fee: string; open?: boolean; closed?: boolean };

export function Admission() {
  const intakes = admission.intakes as readonly Intake[];
  const firstOpen = Math.max(0, intakes.findIndex((r) => r.open));
  const [sel, setSel] = React.useState(firstOpen);
  const r = intakes[sel];

  return (
    <Band id="admission" label="admission-title">
      <SectionHeading id="admission-title" title="Five steps to" accent="your seat.">
        {admission.eligibility}
      </SectionHeading>

      {/* The process: a rail that draws itself, the steps landing on it in turn. */}
      <div className="relative mt-16">
        <div aria-hidden className="absolute top-[1.125rem] right-[10%] left-[10%] h-px bg-border-decorative max-sm:hidden" />
        <div aria-hidden className="reveal-line absolute top-[1.125rem] right-[10%] left-[10%] h-px bg-action-primary max-sm:hidden" />
        <ol className="relative grid gap-6 sm:grid-cols-5 sm:gap-2">
          {admission.steps.map((s, i) => (
            <li key={s} className="reveal flex items-center gap-4 sm:flex-col sm:text-center" style={d(0.15 + i * 0.18)}>
              <span className="flex size-[2.25rem] shrink-0 items-center justify-center rounded-full bg-action-primary text-sm font-semibold text-action-primary-fg ring-4 ring-surface">
                {i + 1}
              </span>
              <span className="text-sm font-medium sm:max-w-[7rem]">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="reveal mt-10 flex items-start gap-3 text-sm">
        <span className="flex size-control-sm shrink-0 items-center justify-center rounded-full bg-surface-brand-subtle text-content-brand">
          <Lightning weight="fill" className="size-icon-sm" aria-hidden />
        </span>
        <span className="pt-1.5">
          <strong className="font-semibold">Fast-track.</strong> <span className="text-content-secondary">{admission.fastTrack}</span>
        </span>
      </p>

      {/* Intake picker */}
      <div className="reveal card-surface mt-12 rounded-2xl bg-surface p-5 md:p-6">
        <p className="text-sm font-medium text-content-secondary">Choose your intake</p>
        <div role="radiogroup" aria-label="Intake" className="mt-3 flex flex-wrap gap-2">
          {intakes.map((it, i) => (
            <button
              key={it.intake}
              type="button"
              role="radio"
              aria-checked={sel === i}
              onClick={() => setSel(i)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                sel === i ? 'bg-content text-content-inverse' : 'bg-surface text-content hover:bg-surface-active',
                it.closed && sel !== i && 'text-content-disabled line-through',
              )}
            >
              {it.intake}
            </button>
          ))}
        </div>

        <div key={sel} className="anim-fade mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-xs text-content-secondary">Course fee</dt>
              <dd className="mt-1 text-[clamp(1.75rem,3.5vw,2.25rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">{r.fee}</dd>
            </div>
            <div>
              <dt className="text-xs text-content-secondary">Apply by</dt>
              <dd className="mt-1 text-[1.125rem] leading-none font-semibold">{r.deadline}</dd>
            </div>
            <div className="col-span-2">
              <dt className="sr-only">Application fee</dt>
              <dd className="text-xs text-content-secondary">Application fee {r.appFee}, non-refundable</dd>
            </div>
          </dl>
          {r.closed ? (
            <span className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-content-secondary">This intake has closed</span>
          ) : (
            <Countdown deadline={r.deadline} />
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-border-decorative pt-5">
          <Button asChild size="md">
            <a href="#apply">
              Start application
              <ArrowRight />
            </a>
          </Button>
          <Button asChild size="md" variant="tertiary">
            <a href="#apply">Talk to an advisor</a>
          </Button>
        </div>
      </div>

      {/* Scholarship */}
      <div className="reveal mt-6">
      <div
        data-tilt
        data-spotlight
        className="grid items-center overflow-hidden rounded-2xl bg-[var(--color-ssb-light-11)] text-on-image-ink sm:grid-cols-[1fr_auto]"
      >
        <div className="relative z-raised p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-on-image-ink-secondary uppercase">Scholarships of up to</p>
          <p className="mt-2 text-[clamp(3.5rem,8vw,5.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            <CountUp value="100%" duration={1800} />
          </p>
          <p className="mt-4 max-w-[22rem] text-sm text-on-image-ink-secondary">{admission.scholarship}</p>
        </div>
        <div className="relative h-[12rem] sm:h-full sm:w-[13rem]">
          <Image src="/v3/admissions/scholarships.webp" alt="" fill sizes="208px" className="object-cover" />
        </div>
      </div>
      </div>
    </Band>
  );
}
