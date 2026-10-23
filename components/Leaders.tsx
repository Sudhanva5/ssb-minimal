'use client';

import * as React from 'react';
import Image from 'next/image';
import { IconButton, Logo, cn } from '@kishanscaler/ssx-ui';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { faculty, mentors, type Person } from './leaderData';
import { SectionHeading } from './sections/shared';

/** A company's mark in a small rounded tile; the company's initials when there is no mark. */
function CompanyMark({ name, mark, bg }: { name: string; mark?: string; bg?: string }) {
  const tile = 'relative flex size-control-md shrink-0 items-center justify-center overflow-hidden rounded-md';
  if (!mark) {
    const initials = name
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return (
      <span aria-hidden className={cn(tile, 'bg-on-image-ink text-sm font-bold text-[var(--color-ssb-dark-2)]')}>
        {initials}
      </span>
    );
  }
  return (
    <span aria-hidden className={cn(tile, 'bg-on-image-ink')} style={bg ? { background: bg } : undefined}>
      {mark === 'ssb' ? (
        <Logo variant="monogram" surface="light" className="h-8" />
      ) : bg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/brands/${mark}`} alt="" className="size-[60%] object-contain" />
      ) : (
        <Image src={`/images/brands/${mark}`} alt="" fill sizes="40px" className="object-cover" />
      )}
    </span>
  );
}

/** Portrait card: photo, company mark and name, a rule, the person, their title and course. */
function PersonCard({ p, animate, delay }: { p: Person; animate: boolean; delay: number }) {
  return (
    <article
      className={cn(
        'group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-[var(--color-ssb-dark-2)] text-on-image-ink',
        animate && 'reveal-card',
      )}
      style={{ ['--d' as string]: delay }}
    >
      {/* The hover zoom lives on this wrapper, so it never fights the image's own settle-in. */}
      <div className="absolute inset-0 z-below transition-transform duration-[1200ms] ease-[var(--ease-out)] will-change-transform group-hover:scale-[1.05]">
        <Image src={p.photo} alt={`Portrait of ${p.name}`} draggable={false} fill sizes="(min-width: 1056px) 293px, 72vw" className="card-photo object-cover object-top" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 z-below bg-[linear-gradient(to_top,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.5)_30%,rgb(0_0_0/0.12)_50%,transparent_62%)]"
      />
      <div className="card-copy px-5 pb-5 md:px-6 md:pb-6">
        {p.company && (
          <>
            <p className="flex items-center gap-3">
              <CompanyMark name={p.company} mark={p.mark} bg={p.markBg} />
              <span className="text-[1.125rem] leading-6 font-semibold tracking-tight">{p.company}</span>
            </p>
            <div aria-hidden className="mt-3 h-px bg-on-image-ink opacity-faint" />
          </>
        )}
        <h3 className={p.company ? 'mt-3 text-[1.25rem] leading-7 font-semibold' : 'text-[1.375rem] leading-7 font-semibold'}>
          {p.name}
        </h3>
        {p.role && <p className="mt-0.5 text-[0.9375rem] text-on-image-ink-secondary">{p.role}</p>}
        {p.teaches && (
          <p className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[var(--ease-out)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 max-md:grid-rows-[1fr] max-md:opacity-100">
            <span className="overflow-hidden">
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-glass-on-image px-3 py-1 text-xs font-medium backdrop-blur-glass">
                Teaches {p.teaches}
              </span>
            </span>
          </p>
        )}
      </div>
    </article>
  );
}

const groups = {
  mentors: { label: 'Mentors', people: mentors },
  faculty: { label: 'Faculty', people: faculty },
} as const;
type Group = keyof typeof groups;

/**
 * Instructor + mentor: v3's mentors and faculty, one snap rail each behind a
 * two-way switch. Arrows page the rail on desktop; touch and trackpads scroll.
 */
export function Leaders() {
  const [group, setGroup] = React.useState<Group>('mentors');
  // The first rail waits to slide up until scrolled to; a rail shown by the switch slides up at once.
  const [switched, setSwitched] = React.useState(false);
  const rail = React.useRef<HTMLUListElement>(null);
  const [edge, setEdge] = React.useState({ start: true, end: false });
  const [progress, setProgress] = React.useState(0);
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = React.useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  React.useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [group, update]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <section id="faculty" aria-labelledby="faculty-title" className="py-16 md:py-24">
      <SectionHeading id="faculty-title" title="Learn from your future recruiters," accent="not just faculty.">
        Operators and leaders from BCG, McKinsey, Razorpay, Zomato, PayPal, Flipkart and more teach at SSB, and the
        builders of Zomato, Flipkart, Paytm and CRED mentor its students.
      </SectionHeading>

      <div className="reveal mt-8 flex items-center justify-between gap-4">
        <div role="tablist" aria-label="Instructors and mentors" className="relative grid grid-cols-2 rounded-full bg-surface-subtle p-1">
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-content transition-transform duration-500 ease-[var(--ease-out)]"
            style={{ transform: `translateX(${group === 'faculty' ? '100%' : '0'})` }}
          />
          {(Object.keys(groups) as Group[]).map((g) => (
            <button
              key={g}
              role="tab"
              type="button"
              aria-selected={group === g}
              aria-controls="people-rail"
              onClick={() => {
                setGroup(g);
                setSwitched(true);
              }}
              className={cn(
                'relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300',
                group === g ? 'text-content-inverse' : 'text-content-secondary hover:text-content',
              )}
            >
              {groups[g].label} <span className="opacity-muted tabular-nums">{groups[g].people.length}</span>
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <IconButton variant="secondary" size="md" className="border-border-inert" aria-label="Previous" disabled={edge.start} onClick={() => page(-1)}>
            <ArrowLeft />
          </IconButton>
          <IconButton variant="secondary" size="md" className="border-border-inert" aria-label="Next" disabled={edge.end} onClick={() => page(1)}>
            <ArrowRight />
          </IconButton>
        </div>
      </div>

      <ul
        id="people-rail"
        role="tabpanel"
        key={group}
        ref={rail}
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse' || !rail.current) return;
          drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false };
          rail.current.style.scrollSnapType = 'none';
        }}
        onPointerMove={(e) => {
          const st = drag.current;
          if (!st || !rail.current) return;
          const dx = e.clientX - st.x;
          if (Math.abs(dx) > 4) st.moved = true;
          rail.current.scrollLeft = st.left - dx;
        }}
        onPointerUp={() => {
          if (rail.current) rail.current.style.scrollSnapType = '';
          window.setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (rail.current) rail.current.style.scrollSnapType = '';
          drag.current = null;
        }}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
        className="-mx-gutter mt-6 flex cursor-grab snap-x snap-mandatory select-none active:cursor-grabbing scroll-px-gutter gap-4 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:gap-5 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {groups[group].people.map((p, i) => (
          <li
            key={p.name}
            className={cn('w-[72%] shrink-0 snap-start sm:w-panel-xs md:w-[18.3125rem]', switched && i < 4 && 'anim-slide-up')}
            style={switched && i < 4 ? { ['--d' as string]: i * 0.1 } : undefined}
          >
            <PersonCard p={p} animate={!switched && i < 3} delay={i * 0.12} />
          </li>
        ))}
      </ul>
      <div aria-hidden className="mt-5 h-0.5 overflow-hidden rounded-full bg-border-decorative">
        <div className="h-full origin-left rounded-full bg-content transition-transform duration-300 ease-[var(--ease-out)]" style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
      </div>
    </section>
  );
}
