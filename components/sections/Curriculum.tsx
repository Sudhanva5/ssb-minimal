'use client';

import * as React from 'react';
import Image from 'next/image';
import { terms } from '../v3data';
import { Band, SectionHeading } from './shared';

/* v4's photography for each term. */
const photos = ['/v4/pg/t1.webp', '/v4/pg/t2.jpg', '/v4/pg/t3.webp', '/v4/pg/t4.webp', '/v4/pg/t5.webp'];
const kpiLabels = ['courses', 'live projects', 'masterclasses'];
const STICK = 96; // px below the top of the screen where the first card pins (clear of the nav)
const STEP = 16; // each later card pins this much lower, so the deck's edges show

/**
 * The five terms as a deck: each card pins under the nav and the next slides
 * up over it, while the ones beneath ease back (scale and dim). Scroll-driven,
 * written straight to CSS variables. Phones and reduced motion: a plain stack.
 */
export function Curriculum() {
  const list = React.useRef<HTMLOListElement>(null);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const cards = list.current ? [...list.current.querySelectorAll<HTMLElement>('[data-card]')] : [];
      cards.forEach((card, i) => {
        // How far the cards after this one have climbed over it.
        let covered = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const top = cards[j].getBoundingClientRect().top;
          const pin = STICK + j * STEP;
          const h = card.offsetHeight;
          covered += Math.min(1, Math.max(0, 1 - (top - pin) / h));
        }
        card.style.setProperty('--s', String(1 - Math.min(covered, 4) * 0.045));
        card.style.setProperty('--dim', String(Math.min(covered, 3) * 0.12));
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <Band id="curriculum" label="curriculum-title">
      <SectionHeading id="curriculum-title" title="Eighteen months. Five terms." accent="Every term ends in a build.">
        Build industry-preferred skills through practical learning, January 2027 to March 2028.
      </SectionHeading>

      <ol ref={list} className="mt-12 flex flex-col gap-6 md:mt-16">
        {terms.map((t, i) => (
          <li key={t.n} className="md:sticky" style={{ top: STICK + i * STEP }}>
            <article
              data-card
              className="relative isolate flex min-h-[26rem] origin-top flex-col justify-end overflow-hidden rounded-2xl bg-[var(--color-ssb-dark-2)] text-on-image-ink [transform:scale(var(--s,1))]"
            >
              <Image src={photos[i]} alt="" fill sizes="(min-width: 1056px) 680px, 100vw" className="z-below object-cover" />
              <div
                aria-hidden
                className="absolute inset-0 z-below bg-[linear-gradient(to_top,rgb(0_0_0/0.88)_0%,rgb(0_0_0/0.55)_38%,rgb(0_0_0/0.1)_70%,transparent_100%)]"
              />
              {/* Dims as the next card covers this one. */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[rgb(0_0_0)] opacity-[var(--dim,0)]" />

              <div className="absolute top-5 right-5 left-5 flex items-start justify-between md:top-6 md:right-6 md:left-6">
                <span className="rounded-full bg-glass-on-image px-3 py-1 text-xs font-medium backdrop-blur-glass">{t.dates}</span>
                <span className="text-[clamp(3.5rem,8vw,5.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.55)]">
                  {t.n}
                </span>
              </div>

              <div className="relative p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-ssb-dark-11)] uppercase">Term {t.n}</p>
                <h3 className="mt-2 max-w-[28rem] text-[clamp(1.5rem,3vw,2.125rem)] leading-[1.1] font-semibold tracking-[-0.03em]">{t.title}</h3>
                <p className="mt-3 max-w-[32rem] text-[0.9375rem] leading-6 text-on-image-ink-secondary">{t.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {t.kpis.map((k, j) => (
                    <li key={j} className="rounded-full border border-[rgb(255_255_255/0.22)] px-3 py-1 text-xs">
                      <span className="font-semibold">{k}</span> {k === 1 ? kpiLabels[j].replace(/s$/, '') : kpiLabels[j]}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Band>
  );
}
