'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Play } from '@phosphor-icons/react';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGsap } from './Motion';
import { useCountdown } from './Shell';

gsap.registerPlugin(SplitText);

const FACTS = [
  { value: '18 months', note: 'incl. internships & immersions' },
  { value: '150 seats', note: 'Residential · Bengaluru' },
  { value: '100+ leaders', note: 'teach & mentor, from' },
];

const LOGOS = [
  { src: '/p/logos/mckinsey.svg', alt: 'McKinsey & Company', h: 'h-[1.375rem]' },
  { src: '/p/logos/bcg.svg', alt: 'BCG', h: 'h-[1.75rem]' },
  { src: '/p/logos/bain.svg', alt: 'Bain & Company', h: 'h-[0.875rem]' },
  { src: '/p/logos/kearney-wordmark.svg', alt: 'Kearney', h: 'h-[1rem]' },
  { src: '/p/logos/google.svg', alt: 'Google', h: 'h-[1.5rem]' },
  { src: '/p/logos/openai.svg', alt: 'OpenAI', h: 'h-[1.5rem]' },
  { src: '/p/logos/meta.svg', alt: 'Meta', h: 'h-[1.25rem]' },
  { src: '/p/logos/airtel.svg', alt: 'Airtel', h: 'h-[1.5rem]' },
  { src: '/p/logos/colgate.svg', alt: 'Colgate-Palmolive', h: 'h-[1.25rem]' },
  { src: '/p/logos/iima.svg', alt: 'IIM Ahmedabad', h: 'h-[1.75rem]' },
  { src: '/p/logos/isb.png', alt: 'ISB', h: 'h-[1.75rem]' },
];

const STATS = [
  { img: '/p/campus/cohort.webp', to: 25.7, dec: 1, pre: '₹', post: 'L', sup: '1', label: 'Top-quartile average CTC, Cohort 1' },
  { img: '/p/campus/classroom.webp', to: 3.2, dec: 1, pre: '', post: 'x', sup: '1', label: 'Average salary hike vs. before SSB' },
  { img: '/p/campus/lab-build.webp', to: 100, dec: 0, pre: '', post: '%', sup: '2', label: 'Internship placement, Cohorts 1 & 2' },
];

/**
 * v4's hero content, staged:
 *   - the headline rises word by word out of masks, "Management & Technology"
 *     carries a slow SSB-green sheen;
 *   - a soft green spotlight follows the cursor over drifting light streaks;
 *   - the stat cards wipe up one after another and their numbers count in;
 *     on desktop the hovered card widens, its photo eases in;
 *   - the alumni-employer logos run on a masked marquee;
 *   - scrolling away lifts the headline and settles the cards.
 */
export function Hero() {
  const root = React.useRef<HTMLElement>(null);
  const glow = React.useRef<HTMLDivElement>(null);
  const left = useCountdown('27 Dec 2026');

  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    const h1 = new SplitText('[data-h1]', { type: 'words', mask: 'words' });
    h1.words.forEach((w) => (w as HTMLElement).closest('[data-sheen]') && w.classList.add('sheen'));
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
    tl.from(h1.words, { yPercent: 110, duration: 1.2, stagger: 0.06 })
      .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.35)
      .from('[data-fact]', { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.06 }, 0.6)
      .fromTo('[data-card]', { clipPath: 'inset(100% 0% 0% 0% round 1.25rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 1.25rem)', duration: 1.3, ease: 'expo.inOut', stagger: 0.09 }, 0.45)
      .from('[data-card-img]', { scale: 1.35, duration: 1.8, stagger: 0.09 }, 0.55)
      .from('[data-card-copy]', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, 1.1);

    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el, i) => {
      const to = Number(el.dataset.count);
      const dec = Number(el.dataset.dec);
      const o = { v: 0 };
      tl.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } }, 1.1 + i * 0.09);
    });

    gsap.to('[data-hero-lift]', { yPercent: -18, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '60% top', scrub: true } });
  });

  // Cursor spotlight.
  React.useEffect(() => {
    const host = root.current;
    const g = glow.current;
    if (!host || !g || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    const x = gsap.quickTo(g, 'x', { duration: 1.2, ease: 'power3.out' });
    const y = gsap.quickTo(g, 'y', { duration: 1.2, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
    };
    host.addEventListener('pointermove', move);
    return () => host.removeEventListener('pointermove', move);
  }, []);

  return (
    <section ref={root} id="top" className="relative isolate overflow-hidden pt-[7.5rem] pb-10">
      {/* Ground: mint wash, light streaks, cursor spotlight. */}
      <div aria-hidden className="absolute inset-0 -z-[1] bg-[radial-gradient(70%_60%_at_85%_0%,#d9eee0,transparent_70%),linear-gradient(to_bottom,#f1f8f3,var(--pm-ivory)_75%)]" />
      <svg aria-hidden className="hero-streaks absolute inset-0 -z-[1] size-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={700 + i * 70} y1={-40} x2={-200 + i * 110} y2={940} style={{ animationDelay: `${-i * 1.7}s` }} />
        ))}
      </svg>
      <div ref={glow} aria-hidden className="pointer-events-none absolute top-0 left-0 -z-[1] size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(29_146_91/0.16),transparent)]" />

      <div className="pad">
        <div data-hero-lift>
          <h1 data-h1 className="text-[clamp(2.5rem,5.6cqw,5.5rem)] leading-[1.04] font-semibold tracking-[-0.05em]">
            PGP in <span data-sheen className="text-[var(--pm-green)]">Management &amp; Technology</span>
          </h1>
          <p data-hero-fade className="mt-4 max-w-[40ch] text-[clamp(1.25rem,2.3cqw,2.125rem)] leading-[1.2] font-medium tracking-[-0.03em] text-[var(--pm-ink-2)]">
            Learn business hands-on, from 100+ industry leaders &amp; faculty
          </p>

          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div data-hero-fade>
              <p className="text-[1rem] text-[var(--pm-ink-2)]">Build startups &amp; AI products. No tech background required.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span data-magnetic className="inline-block">
                  <a href="#apply" data-apply className="group flex h-[3.5rem] items-center gap-4 rounded-[0.875rem] bg-[var(--pm-green)] ps-6 pe-2 text-[1rem] font-semibold text-[#fff] transition-colors duration-300 hover:bg-[var(--pm-ink)]">
                    Apply now
                    <span className="relative flex size-[2.5rem] items-center justify-center overflow-hidden rounded-[0.625rem] bg-[rgb(255_255_255/0.16)]">
                      <ArrowRight weight="bold" className="size-4 transition-transform duration-500 group-hover:translate-x-[250%]" />
                      <ArrowRight weight="bold" className="absolute size-4 -translate-x-[250%] transition-transform duration-500 group-hover:translate-x-0" />
                    </span>
                  </a>
                </span>
                <span data-magnetic className="inline-block">
                  <a href="#brochure" className="group flex h-[3.5rem] items-center gap-4 rounded-[0.875rem] border border-[var(--pm-line)] bg-[#fff] ps-6 pe-2 text-[1rem] font-semibold transition-colors duration-300 hover:border-[var(--pm-green)]">
                    Brochure
                    <span className="flex size-[2.5rem] items-center justify-center rounded-[0.625rem] bg-[var(--pm-mint)] transition-colors duration-300 group-hover:bg-[var(--pm-lime)]">
                      <ArrowUpRight weight="bold" className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </a>
                </span>
              </div>
            </div>
            <div data-hero-fade className="md:text-end">
              <p className="text-[0.8125rem] text-[var(--pm-ink-2)]">Built by alumni from</p>
              <div className="mt-3 flex items-center gap-5 md:justify-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/p/logos/oxford-wide.svg" alt="University of Oxford" className="h-[2.25rem] w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/p/logos/hbs-lockup.svg" alt="Harvard Business School" className="h-[2.5rem] w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Facts + employer marquee */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[var(--pm-line)] pt-5 lg:flex-row lg:items-center">
          <dl className="flex shrink-0 divide-x divide-[var(--pm-line)]">
            {FACTS.map((f) => (
              <div key={f.value} data-fact className="px-4 first:ps-0 md:px-6">
                <dt className="text-[0.9375rem] font-semibold text-[var(--pm-green)]">{f.value}</dt>
                <dd className="mt-0.5 text-[0.75rem] text-[var(--pm-ink-2)] md:text-[0.8125rem]">{f.note}</dd>
              </div>
            ))}
          </dl>
          <div data-fact className="logo-run relative min-w-0 flex-1 overflow-hidden" aria-label="Where our leaders work">
            <ul className="flex w-max animate-[pm-run_38s_linear_infinite] items-center gap-12 hover:[animation-play-state:paused]">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <li key={i} aria-hidden={i >= LOGOS.length} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={i < LOGOS.length ? l.alt : ''} className={`${l.h} w-auto opacity-[0.55] grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cards */}
        <ul className="hero-cards mt-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] max-lg:-mx-[var(--pad)] max-lg:px-[var(--pad)]">
          <li data-card data-cursor="Play" onMouseEnter={(e) => void e.currentTarget.querySelector("video")?.play().catch(() => {})} onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()} className="hero-card group relative isolate flex flex-col justify-between overflow-hidden rounded-[1.25rem] p-5 text-[#fff]">
            <div data-card-img className="absolute inset-0 -z-[1]">
              <Image src="/p/campus/arch.webp" alt="" fill sizes="(min-width: 1056px) 26vw, 70vw" className="object-cover" />
              <video className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" src="/v4/media/campus-film.mp4" muted loop playsInline preload="none" aria-hidden />
            </div>
            <div aria-hidden className="absolute inset-0 -z-[1] bg-[linear-gradient(to_top,rgb(0_46_23/0.85),transparent_55%)]" />
            <a href="#film" className="flex w-fit items-center gap-2 rounded-full bg-[rgb(0_46_23/0.5)] py-1 ps-1 pe-4 text-[0.8125rem] font-medium backdrop-blur-[12px]">
              <span className="flex size-[1.75rem] items-center justify-center rounded-full bg-[#fff] text-[var(--pm-ink)]">
                <Play weight="fill" className="size-3" />
              </span>
              Watch the film
            </a>
            <p data-card-copy className="max-w-[14ch] text-[clamp(1.375rem,2cqw,1.75rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
              Learn business by doing business.
            </p>
          </li>
          {STATS.map((s) => (
            <li key={s.label} data-card className="hero-card group relative isolate flex flex-col justify-end overflow-hidden rounded-[1.25rem] p-5 text-[#fff]">
              <div data-card-img className="absolute inset-0 -z-[1]">
                <Image src={s.img} alt="" fill sizes="(min-width: 1056px) 22vw, 70vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.08]" />
              </div>
              <div aria-hidden className="absolute inset-0 -z-[1] bg-[linear-gradient(to_top,rgb(0_46_23/0.9),rgb(0_46_23/0.1)_60%)]" />
              <div data-card-copy>
                <p className="text-[clamp(2.75rem,4.4cqw,3.75rem)] leading-none font-bold tracking-[-0.06em] tabular-nums">
                  {s.pre}
                  <span data-count={s.to} data-dec={s.dec}>
                    {s.to.toFixed(s.dec)}
                  </span>
                  {s.post}
                  <sup className="ms-1 align-super text-[0.875rem] font-semibold tracking-normal opacity-[0.7]">{s.sup}</sup>
                </p>
                <p className="mt-3 max-w-[17ch] text-[0.875rem] leading-[1.35] text-[rgb(255_255_255/0.82)]">{s.label}</p>
              </div>
            </li>
          ))}
          <li data-card className="hero-card relative isolate flex flex-col justify-between overflow-hidden rounded-[1.25rem] bg-[var(--pm-green)] p-5 text-[#fff]">
            <div aria-hidden className="absolute -top-1/3 -right-1/3 -z-[1] size-[150%] animate-[spin_24s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,rgb(191_232_206/0.22),transparent_35%)]" />
            <p className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--pm-lime)]" />
                <span className="relative size-2 rounded-full bg-[var(--pm-lime)]" />
              </span>
              Admissions open
            </p>
            <div data-card-copy>
              <p className="text-[clamp(1.5rem,2.2cqw,1.875rem)] leading-[1.08] font-semibold tracking-[-0.035em]">Intake 2 closes 27&nbsp;Dec&nbsp;2026</p>
              <p className="mt-2 text-[0.875rem] text-[rgb(255_255_255/0.78)]">Scholarships up to 100%</p>
              <p className="mt-4 flex gap-3 text-[0.75rem] tabular-nums" role="timer" aria-label="Time left to apply">
                {(left ?? [0, 0, 0, 0]).map((v, i) => (
                  <span key={i} className="flex flex-col">
                    <span className="text-[1.125rem] leading-none font-bold">{String(v).padStart(2, '0')}</span>
                    <span className="mt-1 opacity-[0.6]">{['days', 'hrs', 'min', 'sec'][i]}</span>
                  </span>
                ))}
              </p>
              <a href="#apply" data-apply className="group mt-5 flex h-[2.75rem] w-fit items-center gap-3 rounded-[0.75rem] bg-[#fff] ps-4 pe-1.5 text-[0.9375rem] font-semibold text-[var(--pm-ink)]">
                Apply
                <span className="flex size-[2rem] items-center justify-center rounded-[0.5rem] bg-[var(--pm-ink)] text-[#fff]">
                  <ArrowRight weight="bold" className="size-[0.875rem] transition-transform duration-500 group-hover:-rotate-45" />
                </span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
