'use client';

import * as React from 'react';

/**
 * Calls `onFrame` once per animation frame while the page scrolls or resizes,
 * and once on mount. Callers write styles straight to their refs, so a scroll
 * never re-renders React.
 */
export function useScrollFrame(onFrame: () => void) {
  const cb = React.useRef(onFrame);
  cb.current = onFrame;

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      cb.current();
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
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** v4's ease-out (cubic-bezier(0.16, 1, 0.3, 1)), approximated. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
