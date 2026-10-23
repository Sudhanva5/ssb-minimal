'use client';

import * as React from 'react';

/**
 * v3's section entrance, for /minimal-sudh's placement and alumni sections.
 * Every `[data-enter="header"]` and `[data-enter="block"]` inside `scope` gets
 * `data-shown` once it is a quarter of the way up the screen; the CSS in
 * placement.css plays the rise from there. Nothing is hidden under reduced
 * motion or before JavaScript runs (the hidden state needs `html.js`).
 */
export function useEnter(scope: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('[data-enter="header"], [data-enter="block"]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.setAttribute('data-shown', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-shown', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -25% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scope]);
}

/** The headline's mask and the line that rises into it. */
export function EnterLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="enter-mask">
      <span>{children}</span>
    </span>
  );
}
