'use client';

import * as React from 'react';
import Image from 'next/image';
import { Logo } from '@kishanscaler/ssx-ui';
import { nav } from './data';
import { gsap, useGsap } from './Motion';
import { Pill } from './ui';

/** Top bar over the stage: logo, section links that underline in, and the stage's own progress. */
export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-sticky transition-[background-color,box-shadow] duration-500 ${
        scrolled ? 'bg-[rgb(251_253_251/0.82)] shadow-[0_1px_0_var(--pm-line)] backdrop-blur-[16px]' : ''
      }`}
    >
      <div className="relative flex h-[4.5rem] items-center gap-8 px-[clamp(1rem,3vw,2.5rem)]">
        <a href="/premium" aria-label="Scaler School of Business" className="shrink-0" data-magnetic>
          <Logo size="md" className="h-[2.25rem]" />
        </a>
        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex gap-6">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="ulink text-[0.875rem] font-semibold text-[var(--pm-ink)]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <a href="#brochure" className="hidden h-[2.5rem] items-center rounded-[0.75rem] bg-[var(--pm-mint)] px-4 text-[0.875rem] font-semibold text-[var(--pm-ink)] transition-colors duration-300 hover:bg-[var(--pm-lime)] sm:flex">
            Brochure
          </a>
          <span data-magnetic className="inline-block">
            <a href="#apply" data-apply className="flex h-[2.5rem] items-center rounded-[0.75rem] bg-[var(--pm-green)] px-4 text-[0.875rem] font-semibold text-[#fff] transition-colors duration-300 hover:bg-[var(--pm-ink)]">
              Apply
            </a>
          </span>
        </div>
      </div>
    </header>
  );
}

export function useCountdown(deadline: string) {
  const end = React.useMemo(() => new Date(`${deadline} 23:59:59 GMT+0530`).getTime(), [deadline]);
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, end - now);
  return [Math.floor(ms / 86_400_000), Math.floor(ms / 3_600_000) % 24, Math.floor(ms / 60_000) % 60, Math.floor(ms / 1000) % 60];
}

/** Full-width video band: the moment Anupam Mittal offered ₹50 lakh. */
export function MittalBand() {
  const root = React.useRef<HTMLElement>(null);
  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo('[data-band]', { clipPath: 'inset(0 8% 0 8% round 28px)' }, { clipPath: 'inset(0 0% 0 0% round 0px)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 20%', scrub: true } });
  });
  return (
    <section ref={root} aria-label="Anupam Mittal on campus">
      <div data-band className="relative isolate flex h-[100svh] items-end overflow-hidden text-[#fff]">
        <video className="absolute inset-0 -z-[1] size-full object-cover" src="/p/mittal-band.mp4" poster="/p/built/hummus.webp" autoPlay muted loop playsInline preload="none" aria-hidden />
        <div aria-hidden className="absolute inset-0 -z-[1] bg-[linear-gradient(to_top,rgb(0_46_23/0.88),rgb(0_46_23/0.2)_60%)]" />
        <div className="pad pb-16">
          <p className="kicker text-[var(--pm-lime)]">Founders and investors have noticed</p>
          <p className="mt-6 max-w-[22ch] text-[clamp(2.25rem,6cqw,5rem)] leading-[1] font-bold tracking-[-0.05em]">
            Anupam Mittal heard four of our startups, and offered <span className="it text-[var(--pm-lime)]">₹50 lakh.</span>
          </p>
          <p className="mt-6 text-[0.9375rem] opacity-[0.75]">July 2026 · Anupam Mittal, Founder of Shaadi.com</p>
        </div>
      </div>
    </section>
  );
}

const WORD = 'For people who build.';

/** Footer: a giant wordmark whose letters rise toward the cursor, then the links. */
export function Footer() {
  const word = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => {
    const el = word.current;
    if (!el || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    const letters = [...el.querySelectorAll<HTMLElement>('[data-l]')];
    const move = (e: PointerEvent) => {
      letters.forEach((l) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 260);
        gsap.to(l, { y: -k * 40, color: k > 0.55 ? '#006e3a' : '#002e17', duration: 0.5, ease: 'power3.out' });
      });
    };
    const leave = () => gsap.to(letters, { y: 0, color: '#002e17', duration: 0.8, ease: 'elastic.out(1,0.4)', stagger: 0.01 });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[var(--pm-paper)]">
      <div className="pad pt-24 md:pt-32">
        <p className="kicker text-[var(--pm-green)]">Intake 2 closes 27 Dec 2026 · Scholarships up to 100%</p>
        <p ref={word} aria-label={WORD} className="display mt-8 text-[clamp(3.5rem,12.5cqw,11rem)]">
          {[...WORD].map((c, i) => (
            <span key={i} data-l aria-hidden className={`inline-block ${c === ' ' ? 'w-[0.25em]' : ''}`}>
              {c}
            </span>
          ))}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <span data-magnetic className="inline-block">
            <Pill href="#apply" apply>
              Apply now
            </Pill>
          </span>
          <span data-magnetic className="inline-block">
            <Pill href="#brochure" tone="light">
              Download brochure
            </Pill>
          </span>
        </div>
      </div>
      <div className="relative mt-16 h-[clamp(14rem,34cqw,26rem)]">
        <Image src="/p/footer/building.webp" alt="The Scaler School of Business building, Bengaluru" fill sizes="70vw" className="object-cover object-bottom" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--pm-paper),transparent_50%)]" />
      </div>
      <div className="pad flex flex-col justify-between gap-6 py-8 pb-24 text-[0.8125rem] md:flex-row md:items-center">
        <Logo size="sm" />
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="ulink font-semibold text-[var(--pm-ink)]">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[var(--pm-ink-2)]">© 2026 InterviewBit Technologies Pvt. Ltd. A certificate, not a degree.</p>
      </div>
    </footer>
  );
}
