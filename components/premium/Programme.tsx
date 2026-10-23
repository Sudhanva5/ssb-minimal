'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@kishanscaler/ssx-ui';
import { pillars, terms, ventures } from './data';
import { gsap, lenisRef, useGsap } from './Motion';

/**
 * The five terms as a deck. Each card pins under the nav; as the next one
 * arrives it tips back in 3D, shrinks and dims, so the deck reads as depth.
 */
export function Programme() {
  const root = React.useRef<HTMLElement>(null);
  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-term]');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card.firstElementChild, {
        scale: 0.88,
        rotateX: 12,
        filter: 'brightness(0.55)',
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 15%', scrub: true },
      });
    });
    gsap.utils.toArray<HTMLElement>('[data-term-img]').forEach((img) =>
      gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }),
    );
  });

  return (
    <section ref={root} id="programme" aria-labelledby="programme-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="pad">
        <p className="kicker text-[var(--pm-green)]">Programme · Jan 2027 – Mar 2028</p>
        <h2 id="programme-title" className="h2 mt-6 max-w-[18ch]">
          Eighteen months. Five terms. <span className="it text-[var(--pm-green)]">Five builds.</span>
        </h2>
      </div>
      <ol className="pad mt-16 [perspective:1400px]">
        {terms.map((t, i) => (
          <li key={t.n} data-term className="sticky mb-6" style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}>
            <article className="grid origin-top overflow-hidden rounded-[1.75rem] bg-[var(--pm-ink)] text-[#fff] will-change-transform md:min-h-[70vh] md:grid-cols-2">
              <div className="relative min-h-[18rem] overflow-hidden">
                <div data-term-img className="absolute -inset-y-[12%] inset-x-0">
                  <Image src={t.img} alt="" fill sizes="(min-width: 1056px) 40vw, 100vw" className="object-cover" />
                </div>
                <span className="absolute top-5 left-5 rounded-full bg-[var(--pm-lime)] px-3 py-1 text-[0.75rem] font-bold text-[var(--pm-ink)]">{t.dates}</span>
              </div>
              <div className="flex flex-col p-8 md:p-10">
                <p className="text-[clamp(5rem,12cqw,9rem)] leading-[0.8] font-bold tracking-[-0.07em] text-[rgb(255_255_255/0.12)]">{t.n}</p>
                <h3 className="mt-8 text-[clamp(1.75rem,3.6cqw,2.75rem)] leading-[1.02] font-bold tracking-[-0.045em]">{t.title}</h3>
                <p className="mt-5 max-w-[30rem] text-[1rem] leading-[1.6] text-[rgb(255_255_255/0.72)]">{t.body}</p>
                <div className="mt-auto pt-10">
                  <p className="kicker text-[var(--pm-lime)]">Ends in a build</p>
                  <p className="mt-2 text-[1.125rem] leading-snug font-semibold">{t.build}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Five ways SSB teaches. Big numbered rows; the active one (centre of the
 * screen) expands, and its photo slides in on a sticky frame beside it.
 */
export function Pillars() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLLIElement | null)[]>([]);
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section aria-labelledby="pillars-title" className="bg-[var(--pm-paper)] py-24 md:py-32">
      <div className="pad">
        <p className="kicker text-[var(--pm-green)]">How you learn</p>
        <h2 id="pillars-title" className="h2 mt-6 max-w-[18ch]">
          Five ways in. <span className="it text-[var(--pm-green)]">None of them a lecture hall.</span>
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ol>
            {pillars.map((p, i) => (
              <li
                key={p.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                data-hot
                onMouseEnter={() => setActive(i)}
                className="border-t border-[var(--pm-ink)] py-6"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-[0.875rem] font-bold text-[var(--pm-green)] tabular-nums">{p.n}</span>
                  <h3
                    className={cn(
                      'text-[clamp(2rem,5.4cqw,4.25rem)] leading-none font-bold tracking-[-0.055em] transition-colors duration-500',
                      active === i ? 'text-[var(--pm-ink)]' : 'text-[rgb(0_46_23/0.18)]',
                    )}
                  >
                    {p.title}
                  </h3>
                </div>
                <div className={cn('grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out)]', active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                  <div className="overflow-hidden ps-[2.25rem]">
                    <p className="mt-4 max-w-[28rem] text-[1rem] leading-[1.55] text-[var(--pm-ink-2)]">{p.line}</p>
                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                      {p.stats.map(([v, l]) => (
                        <div key={l}>
                          <dt className="sr-only">{l}</dt>
                          <dd>
                            <span className="block text-[1.5rem] leading-none font-bold tracking-[-0.04em]">{v}</span>
                            <span className="text-[0.8125rem] text-[var(--pm-ink-2)]">{l}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl md:hidden">
                      <Image src={p.img} alt="" fill sizes="100vw" className="object-cover" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative hidden md:block">
            <div className="sticky top-[18vh] aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[var(--pm-ink)]">
              {pillars.map((p, i) => (
                <div
                  key={p.n}
                  className="absolute inset-0 transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
                  style={{ clipPath: active === i ? 'inset(0 0 0 0)' : active > i ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)' }}
                >
                  <Image src={p.img} alt="" fill sizes="(min-width: 1056px) 400px, 0px" className="object-cover" />
                </div>
              ))}
              <span className="absolute right-5 bottom-5 rounded-full bg-[var(--pm-lime)] px-3 py-1 text-[0.8125rem] font-bold">
                {pillars[active].n} / 05
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Ventures on a horizontal rail: the section pins (CSS sticky) while vertical
 * scroll drives the rail sideways; cards lean with scroll velocity.
 */
export function Ventures() {
  const root = React.useRef<HTMLElement>(null);
  const track = React.useRef<HTMLDivElement>(null);
  const [wide, setWide] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1056px) and (prefers-reduced-motion: no-preference)');
    const up = () => setWide(mq.matches);
    up();
    mq.addEventListener('change', up);
    return () => mq.removeEventListener('change', up);
  }, []);

  useGsap(
    root,
    () => {
      if (!wide || !track.current) return;
      const t = track.current;
      gsap.to(t, {
        x: () => -(t.scrollWidth - t.parentElement!.clientWidth),
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true },
      });
      const lean = gsap.quickTo('[data-venture]', 'skewX', { duration: 0.5, ease: 'power3.out' });
      const tick = () => {
        lean(gsap.utils.clamp(-6, 6, -(lenisRef.current?.velocity ?? 0) * 0.35));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    [wide],
  );

  const cards = ventures.map((v, i) => (
    <article
      key={v.name}
      data-venture
      data-cursor="View"
      className={cn(
        'group relative isolate flex shrink-0 flex-col justify-end overflow-hidden rounded-[1.5rem] p-6 text-[#fff]',
        wide ? 'h-[min(68vh,34rem)]' : 'h-[26rem] w-[80vw] snap-start',
        wide && (i % 2 ? 'w-[24rem]' : 'w-[30rem]'),
      )}
    >
      <Image src={v.img} alt="" fill sizes="480px" className="-z-[1] object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.08]" />
      <div aria-hidden className="absolute inset-0 -z-[1] bg-[linear-gradient(to_top,rgb(0_46_23/0.92),rgb(0_46_23/0.2)_55%,transparent)]" />
      <span className="absolute top-5 left-5 rounded-full bg-[rgb(255_255_255/0.16)] px-3 py-1 text-[0.75rem] font-semibold backdrop-blur-[10px]">{v.tag}</span>
      <p className="text-[clamp(3rem,6cqw,5rem)] leading-none font-bold tracking-[-0.06em] text-[var(--pm-lime)]">{v.metric}</p>
      <p className="mt-1 text-[0.875rem] text-[rgb(255_255_255/0.75)]">{v.metricNote}</p>
      <div className="mt-5 border-t border-[rgb(255_255_255/0.2)] pt-4">
        <h3 className="text-[1.375rem] font-bold tracking-[-0.03em]">{v.name}</h3>
        <p className="text-[0.875rem] text-[rgb(255_255_255/0.7)]">{v.founder}</p>
        <p className="grid grid-rows-[0fr] text-[0.875rem] leading-[1.5] text-[rgb(255_255_255/0.85)] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 max-md:grid-rows-[1fr] max-md:opacity-100">
          <span className="overflow-hidden">
            <span className="block pt-3">{v.body}</span>
          </span>
        </p>
      </div>
    </article>
  ));

  const head = (
    <div className="pad">
      <p className="kicker text-[var(--pm-green)]">Built at SSB</p>
      <h2 id="ventures-title" className="h2 mt-6 max-w-[18ch]">
        They didn’t just build careers. <span className="it text-[var(--pm-green)]">They built companies.</span>
      </h2>
    </div>
  );

  if (!wide) {
    return (
      <section id="ventures" aria-labelledby="ventures-title" className="scroll-mt-20 py-24">
        {head}
        <div className="pad mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">{cards}</div>
      </section>
    );
  }
  return (
    <section ref={root} id="ventures" aria-labelledby="ventures-title" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {head}
        <div className="pad mt-12 overflow-visible">
          <div ref={track} className="flex w-max gap-5 will-change-transform">
            {cards}
          </div>
        </div>
      </div>
    </section>
  );
}
