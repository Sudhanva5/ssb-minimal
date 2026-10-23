'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

/**
 * The page's motion runtime. One component, mounted once in the layout:
 *
 *   .reveal / .reveal-tile / .reveal-card / .reveal-words / .reveal-line
 *       get `.in` once, as they scroll into view.
 *   [data-parallax="0.12"]   translateY by that fraction of the element's
 *                            distance from the viewport centre.
 *   [data-tilt]              tilts toward the pointer (sets --rx / --ry).
 *   [data-spotlight]         a soft light follows the pointer (sets --mx / --my).
 *   [data-fill]              --fill goes 0 → 1 as the element crosses the screen.
 *
 * Everything is CSS-variable driven, so a scroll never re-renders React, and
 * all of it stands down under prefers-reduced-motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  // Scroll-in reveals.
  React.useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      '.reveal:not(.in), .reveal-tile:not(.in), .reveal-card:not(.in), .reveal-words:not(.in), .reveal-line:not(.in)',
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    els.forEach((el) => io.observe(el));
    // Elements that mount later (a tab switch) are picked up too.
    const mo = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.in), .reveal-card:not(.in), .reveal-words:not(.in), .reveal-line:not(.in)')
        .forEach((el) => io.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  // Scroll-linked effects: parallax and fill.
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const H = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > H + 200) return;
        const k = parseFloat(el.dataset.parallax || '0.1');
        el.style.setProperty('--py', `${((r.top + r.height / 2 - H / 2) * -k).toFixed(1)}px`);
      });
      document.querySelectorAll<HTMLElement>('[data-fill]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (H - r.top) / (H * 0.7)));
        el.style.setProperty('--fill', p.toFixed(3));
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
  }, [pathname]);

  // Pointer effects: tilt and spotlight.
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const move = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const spot = t?.closest<HTMLElement>('[data-spotlight]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const tilt = t?.closest<HTMLElement>('[data-tilt]');
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
        tilt.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
      }
    };
    const leave = (e: PointerEvent) => {
      const tilt = (e.target as Element | null)?.closest?.<HTMLElement>('[data-tilt]');
      if (tilt && !tilt.contains(e.relatedTarget as Node)) {
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      }
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
    };
  }, []);

  return null;
}
