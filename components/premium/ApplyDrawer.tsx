'use client';

import * as React from 'react';
import { ArrowUpRight, X } from '@phosphor-icons/react';
import { ApplicationForm } from '../ApplicationForm';
import { gsap, lenisRef, reduced } from './Motion';
import { useCountdown } from './Shell';

/**
 * The application form lives in a pop-up card, not in the page.
 *   - Every "Apply" ([data-apply]) opens it; the card springs up from where the
 *     click happened, over a blurred backdrop, and the page stops scrolling.
 *   - A small floating card (countdown + Apply) docks bottom-right once the
 *     hero has scrolled away, on every screen size.
 *   - Escape, the close button or a click on the backdrop dismiss it.
 */
export function ApplyDrawer() {
  const [open, setOpen] = React.useState(false);
  const [dock, setDock] = React.useState(false);
  const origin = React.useRef({ x: 0.5, y: 0.5 });
  const card = React.useRef<HTMLDivElement>(null);
  const back = React.useRef<HTMLDivElement>(null);
  const opener = React.useRef<HTMLElement | null>(null);
  const first = React.useRef(true);
  const left = useCountdown('27 Dec 2026');

  React.useEffect(() => {
    const click = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest<HTMLElement>('[data-apply]');
      if (!t) return;
      e.preventDefault();
      opener.current = t;
      origin.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
      setOpen(true);
    };
    document.addEventListener('click', click);
    const hero = document.getElementById('top');
    const io = hero ? new IntersectionObserver(([e]) => setDock(!e.isIntersecting)) : null;
    if (hero && io) io.observe(hero);
    return () => {
      document.removeEventListener('click', click);
      io?.disconnect();
    };
  }, []);

  // Enter / leave.
  React.useEffect(() => {
    const c = card.current;
    const b = back.current;
    if (!c || !b) return;
    if (open) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = 'hidden';
      const { x, y } = origin.current;
      if (reduced()) gsap.set([b, c], { autoAlpha: 1 });
      else {
        gsap.fromTo(b, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        gsap.fromTo(
          c,
          { autoAlpha: 0, scale: 0.6, x: (x - 0.5) * window.innerWidth * 0.5, y: (y - 0.5) * window.innerHeight * 0.5 + 60, rotate: (x - 0.5) * 10 },
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotate: 0, duration: 0.9, ease: 'expo.out' },
        );
      }
      const id = window.setTimeout(() => c.querySelector<HTMLElement>('input')?.focus({ preventScroll: true }), 450);
      const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      document.addEventListener('keydown', key);
      return () => {
        window.clearTimeout(id);
        document.removeEventListener('keydown', key);
      };
    }
    if (first.current) {
      first.current = false;
      return;
    }
    lenisRef.current?.start();
    document.documentElement.style.overflow = '';
    gsap.to(b, { autoAlpha: 0, duration: 0.35, ease: 'power2.in' });
    gsap.to(c, { autoAlpha: 0, scale: 0.92, y: 40, duration: 0.35, ease: 'power2.in' });
    opener.current?.focus({ preventScroll: true });
  }, [open]);

  const shown = dock && !open;
  return (
    <>
      {/* Docked card */}
      <button
        type="button"
        data-apply
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className="group fixed right-4 bottom-4 z-overlay flex items-center gap-4 rounded-[1.25rem] bg-[var(--pm-green)] py-2.5 ps-5 pe-2.5 text-[#fff] transition-[opacity,transform] duration-700 ease-[var(--ease-out)] md:right-6 md:bottom-6"
        style={{ opacity: shown ? 1 : 0, transform: `translateY(${shown ? 0 : 140}%)`, pointerEvents: shown ? 'auto' : 'none' }}
      >
        <span className="flex flex-col items-start leading-tight">
          <span className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-[var(--pm-lime)] uppercase">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--pm-lime)]" />
              <span className="relative size-2 rounded-full bg-[var(--pm-lime)]" />
            </span>
            Admissions open
          </span>
          <span className="mt-1 text-[0.9375rem] font-semibold tabular-nums">
            Intake 2 · {left ? `${left[0]}d ${String(left[1]).padStart(2, '0')}h ${String(left[2]).padStart(2, '0')}m` : 'closes 27 Dec'}
          </span>
        </span>
        <span className="flex h-[2.75rem] items-center gap-2 rounded-[0.875rem] bg-[#fff] ps-4 pe-3 text-[0.875rem] font-bold text-[var(--pm-ink)]">
          Apply
          <ArrowUpRight weight="bold" className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </button>

      {/* Pop-up card */}
      <div aria-hidden={!open} className="fixed inset-0 z-[120] flex items-end justify-center p-2 md:items-center md:p-6" style={{ pointerEvents: open ? 'auto' : 'none' }}>
        <div ref={back} onClick={() => setOpen(false)} className="invisible absolute inset-0 bg-[rgb(0_46_23/0.42)] backdrop-blur-[10px]" />
        <div
          ref={card}
          role="dialog"
          aria-modal="true"
          aria-label="Apply to Scaler School of Business"
          data-lenis-prevent
          className="invisible relative flex max-h-[calc(100svh-1rem)] w-full max-w-[28rem] flex-col overflow-hidden rounded-[1.5rem] bg-[#fff] md:max-h-[calc(100svh-3rem)]"
        >
          <div className="flex items-center justify-between gap-4 bg-[var(--pm-ink)] px-5 py-3 text-[#fff]">
            <span className="flex flex-wrap items-center gap-x-3 text-[0.8125rem]">
              <span className="font-semibold text-[var(--pm-lime)]">Intake 2 closes in</span>
              <span className="flex gap-2 font-bold tabular-nums" role="timer" aria-label="Time left to apply">
                {(left ?? [0, 0, 0, 0]).map((v, i) => (
                  <span key={i}>
                    {String(v).padStart(2, '0')}
                    <span className="font-medium opacity-[0.55]">{['d', 'h', 'm', 's'][i]}</span>
                  </span>
                ))}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex size-[2rem] shrink-0 items-center justify-center rounded-full bg-[rgb(255_255_255/0.12)] transition-transform duration-500 hover:rotate-90"
            >
              <X weight="bold" className="size-4" />
            </button>
          </div>
          <div className="overflow-y-auto overscroll-contain"><ApplicationForm /></div>
        </div>
      </div>
    </>
  );
}
