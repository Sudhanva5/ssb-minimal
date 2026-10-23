import * as React from 'react';
import Image from 'next/image';
import { ArrowRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { CountUp } from '../motion/CountUp';
import { alumni, placementStats, recruiters } from '../v3data';
import { Band, LogoMarquee, SectionHeading } from './shared';

const d = (v: number) => ({ ['--d' as string]: v }) as React.CSSProperties;
const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

type Alum = (typeof alumni)[number];

/** One alumnus: who they were, a line, who they are now. */
function Transformation({ a }: { a: Alum }) {
  return (
    <article data-spotlight className="card-surface group flex w-[19rem] shrink-0 flex-col gap-5 rounded-xl bg-surface p-5 transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1">
      <div className="flex items-center gap-3">
        {'photo' in a && a.photo ? (
          <Image src={`/v3/alumni/${a.photo}.webp`} alt="" width={44} height={44} className="size-[2.75rem] rounded-full object-cover" />
        ) : (
          <span aria-hidden className="flex size-[2.75rem] items-center justify-center rounded-full bg-surface-brand-subtle text-sm font-semibold text-content-brand">
            {initials(a.name)}
          </span>
        )}
        <h4 className="font-semibold tracking-tight">{a.name}</h4>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="min-w-0 flex-1 truncate text-content-secondary line-through decoration-border-strong/60">{a.before}</span>
        <ArrowRight className="size-icon-sm shrink-0 text-action-primary transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1" aria-hidden />
        <span className="flex min-w-0 flex-1 items-center gap-1.5 font-medium">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.mark} alt="" className="size-5 shrink-0 rounded-sm object-contain" />
          <span className="truncate">{a.at}</span>
        </span>
      </div>
      <p className="-mt-2 text-xs text-content-secondary">Now {a.now}</p>
    </article>
  );
}

export function Placement() {
  const half = Math.ceil(recruiters.length / 2);
  return (
    <Band id="placement" label="placement-title">
      <SectionHeading id="placement-title" title="The founding cohort’s" accent="returns.">
        Reported outcomes for SSB’s founding PGP cohort.
      </SectionHeading>

      <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-16">
        {placementStats.map((s, i) => (
          <div key={s.label}>
            <div aria-hidden className="reveal-line h-px bg-content" style={d(i * 0.12)} />
            <dd className="mt-5 text-[clamp(2.5rem,5.5vw,4.25rem)] leading-none font-semibold tracking-[-0.045em]">
              <CountUp value={s.value} />
            </dd>
            <dt className="reveal mt-3 text-sm text-content-secondary" style={d(0.2 + i * 0.1)}>
              {s.label}
            </dt>
          </div>
        ))}
      </dl>

      <a
        href="#placement-report"
        className="reveal group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-content no-underline"
      >
        <span className="flex size-control-md items-center justify-center rounded-full bg-surface-brand-subtle text-content-brand transition-colors duration-300 group-hover:bg-action-primary group-hover:text-action-primary-fg">
          <DownloadSimple className="size-icon-sm" aria-hidden />
        </span>
        <span className="border-b border-transparent transition-colors group-hover:border-current">Download the placement report</span>
      </a>

      <div className="mt-20">
        <p className="reveal text-sm font-medium text-content-secondary">Companies that have visited Scaler School of Business</p>
        <div className="mt-5 flex flex-col gap-4">
          <LogoMarquee label="Recruiters" logos={recruiters.slice(0, half)} dir="/v3/logos" />
          <LogoMarquee label="More recruiters" logos={recruiters.slice(half)} dir="/v3/logos" reverse />
        </div>
      </div>

      <div className="mt-20">
        <h3 className="reveal-words text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold tracking-[-0.03em]">
          {'Our earlier cohorts are already in roles like these.'.split(' ').map((w, i) => (
            <React.Fragment key={i}>
              <span className="w">
                <span style={{ ['--i' as string]: i }}>{w}</span>
              </span>{' '}
            </React.Fragment>
          ))}
        </h3>
        <div className="reveal -mx-gutter mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] md:mx-0">
          <div className="anim-marquee flex w-max gap-3 [animation-duration:70s]">
            {[...alumni, ...alumni].map((a, i) => (
              <div key={i} aria-hidden={i >= alumni.length || undefined}>
                <Transformation a={a} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
