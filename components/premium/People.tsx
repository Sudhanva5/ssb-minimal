'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@kishanscaler/ssx-ui';
import { ArrowUpRight } from '@phosphor-icons/react';
import { campusPhotos, clubs, people, press, type Teacher } from './data';
import { gsap, useGsap } from './Motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>';

/** Re-types its text through random glyphs (a "decode"), left to right. */
function Scramble({ text, run }: { text: string; run: number }) {
  const [out, setOut] = React.useState(text);
  React.useEffect(() => {
    if (!run || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const total = text.length * 2 + 6;
    const id = window.setInterval(() => {
      frame++;
      setOut(
        [...text]
          .map((c, i) => (c === ' ' || i < (frame - 6) / 2 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      );
      if (frame >= total) {
        window.clearInterval(id);
        setOut(text);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [run, text]);
  return <>{out}</>;
}

const filters = ['All', 'Mentors', 'Faculty'] as const;

/**
 * The faculty as a typographic index. Hovering a row decodes the name and a
 * portrait trails the cursor, tilting with its speed.
 */
export function Faculty() {
  const [filter, setFilter] = React.useState<(typeof filters)[number]>('All');
  const [hover, setHover] = React.useState<{ p: Teacher; n: number } | null>(null);
  const card = React.useRef<HTMLDivElement>(null);
  const shown = people.filter((p) => filter === 'All' || (filter === 'Mentors' ? p.group === 'Mentor' : p.group === 'Faculty'));

  React.useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const r = gsap.quickTo(el, 'rotate', { duration: 0.8, ease: 'power3.out' });
    let lx = 0;
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      r(gsap.utils.clamp(-14, 14, (e.clientX - lx) * 0.6));
      lx = e.clientX;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <section id="faculty" aria-labelledby="faculty-title" className="pad scroll-mt-20 py-24 md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="kicker text-[var(--pm-green)]">Faculty &amp; mentors</p>
          <h2 id="faculty-title" className="h2 mt-6 max-w-[16ch]">
            Taught by the people who run <span className="it text-[var(--pm-green)]">the companies you want to join.</span>
          </h2>
        </div>
        <div role="tablist" aria-label="Filter" className="flex gap-1 self-start rounded-full bg-[#fff] p-1 shadow-[inset_0_0_0_1px_var(--pm-line)]">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn('rounded-full px-4 py-1.5 text-[0.875rem] font-semibold transition-colors', filter === f ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)]' : 'text-[var(--pm-ink-2)]')}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 border-b border-[var(--pm-ink)]" onPointerLeave={() => setHover(null)}>
        {shown.map((p, i) => (
          <li
            key={p.name}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHover((h) => ({ p, n: (h?.n ?? 0) + 1 }))}
            className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-4 overflow-hidden border-t border-[var(--pm-ink)] py-4 md:grid-cols-[2.5rem_minmax(0,1.4fr)_minmax(0,1fr)] md:py-5"
          >
            <span aria-hidden className="absolute inset-0 -z-[1] origin-bottom scale-y-0 bg-[var(--pm-lime)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-100" />
            <span className="text-[0.75rem] font-bold text-[var(--pm-ink-3)] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex items-center gap-4">
              <Image src={p.photo} alt="" width={44} height={44} className="size-[2.75rem] shrink-0 rounded-full object-cover md:hidden" />
              <span className="text-[clamp(1.5rem,3.6cqw,2.75rem)] leading-none font-bold tracking-[-0.045em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2">
                <Scramble text={p.name} run={hover?.p.name === p.name ? hover.n : 0} />
              </span>
            </span>
            <span className="col-start-2 flex items-center justify-between gap-4 md:col-start-auto">
              <span className="text-[0.9375rem] text-[var(--pm-ink-2)]">{p.role}</span>
              <span className={cn('hidden shrink-0 rounded-full px-3 py-1 text-[0.75rem] font-bold lg:inline-block', p.group === 'Mentor' ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)]' : 'bg-[#fff]')}>
                {p.teaches ?? 'Mentor'}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div ref={card} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block">
        <div
          className="relative -mt-[19rem] -ml-[7.5rem] h-[18rem] w-[15rem] overflow-hidden rounded-2xl transition-[opacity,scale] duration-500 ease-[var(--ease-out)]"
          style={{ opacity: hover ? 1 : 0, scale: hover ? '1' : '0.7' }}
        >
          {people.map((p) => (
            <Image key={p.name} src={p.photo} alt="" fill sizes="240px" className="object-cover transition-opacity duration-300" style={{ opacity: hover?.p.name === p.name ? 1 : 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Campus "zoom-through": a grid of photos around a centre frame; as you scroll
 * the centre photo grows to fill the screen while the others fly outward. Then
 * the clubs.
 */
export function Campus() {
  const root = React.useRef<HTMLElement>(null);
  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true } });
    tl.to('[data-center]', { width: '100%', height: '100%', borderRadius: 0, ease: 'none' }, 0);
    gsap.utils.toArray<HTMLElement>('[data-orbit]').forEach((el) => {
      tl.to(el, { x: Number(el.dataset.dx) * 1.6, y: Number(el.dataset.dy) * 1.6, scale: 1.4, autoAlpha: 0, ease: 'none' }, 0);
    });
    tl.fromTo('[data-campus-copy]', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'none' }, 0.55);
  });

  const [center, ...rest] = campusPhotos;
  const spots = [
    { cls: 'top-[6%] left-[4%] w-[22%] aspect-[4/5]', dx: -320, dy: -260 },
    { cls: 'top-[10%] right-[5%] w-[20%] aspect-square', dx: 320, dy: -260 },
    { cls: 'bottom-[8%] left-[8%] w-[20%] aspect-[4/3]', dx: -320, dy: 260 },
    { cls: 'bottom-[6%] right-[8%] w-[24%] aspect-[4/3]', dx: 320, dy: 260 },
    { cls: 'top-[42%] left-[-2%] w-[14%] aspect-[3/4]', dx: -360, dy: 0 },
  ];

  return (
    <section id="campus" aria-labelledby="campus-title" className="scroll-mt-20">
      <div className="pad pt-24 md:pt-32">
        <p className="kicker text-[var(--pm-green)]">Campus life · Bengaluru</p>
        <h2 id="campus-title" className="h2 mt-6 max-w-[16ch]">
          Life beyond <span className="it text-[var(--pm-green)]">the classroom.</span>
        </h2>
      </div>
      <section ref={root} aria-label="Campus photographs" className="relative mt-12 h-[260vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
        {rest.slice(0, 5).map((p, i) => (
          <div key={p.src} data-orbit data-dx={spots[i].dx} data-dy={spots[i].dy} className={`absolute overflow-hidden rounded-2xl ${spots[i].cls}`}>
            <Image src={p.src} alt={p.caption} fill sizes="300px" className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div data-center className="relative h-[46%] w-[40%] overflow-hidden rounded-[1.75rem]">
            <Image src={center.src} alt={center.caption} fill sizes="100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_46_23/0.75),transparent_60%)]" />
            <div data-campus-copy className="pad absolute inset-x-0 bottom-0 pb-10 text-[#fff]">
              <p className="max-w-[34rem] text-[clamp(1.5rem,3.6cqw,2.75rem)] leading-[1.08] font-bold tracking-[-0.04em]">
                A fully residential campus, an Innovation Lab shared with SST, and{' '}
                <span className="it text-[var(--pm-lime)]">ten student-run clubs.</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>
      <div className="pad py-16">
        <ul className="flex flex-wrap gap-2">
          {clubs.map((c) => (
            <li key={c} data-hot className="rounded-full border border-[var(--pm-ink)] px-5 py-3 text-[1rem] font-semibold transition-colors duration-300 hover:bg-[var(--pm-ink)] hover:text-[var(--pm-lime)]">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The press, as large tiles with a lime wash that rises on hover. */
export function Press() {
  return (
    <section aria-labelledby="press-title" className="pad py-24 md:py-32">
      <p className="kicker text-[var(--pm-green)]">In the press</p>
      <h2 id="press-title" className="h2 mt-6 max-w-[16ch]">
        What the press <span className="it text-[var(--pm-green)]">has written.</span>
      </h2>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-[var(--pm-ink)] md:grid-cols-2">
        {press.map((p) => (
          <li key={p.outlet}>
            <a href="#press" data-cursor="Read" className="group relative isolate flex h-full flex-col justify-between gap-10 overflow-hidden bg-[var(--pm-ivory)] p-8 text-[var(--pm-ink)] no-underline md:p-10">
              <span aria-hidden className="absolute inset-0 -z-[1] translate-y-full bg-[var(--pm-lime)] transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-y-0" />
              <div className="flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.outlet} className="h-6 w-auto max-w-[9rem] object-contain object-left" />
                <span className="text-[0.75rem] font-semibold text-[var(--pm-ink-2)]">{p.date}</span>
              </div>
              <div>
                <h3 className="text-[clamp(1.375rem,2.4cqw,1.875rem)] leading-[1.12] font-bold tracking-[-0.035em]">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[var(--pm-ink-2)]">{p.dek}</p>
                <p className="mt-6 flex items-center gap-2 text-[0.875rem] font-bold">
                  Read on {p.outlet}
                  <ArrowUpRight className="size-icon-sm transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
