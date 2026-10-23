'use client';

import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Shared Lenis instance, so sections can read scroll velocity. */
export const lenisRef: { current: Lenis | null } = { current: null };

/**
 * The page's motion runtime:
 *   - Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync;
 *   - a custom cursor (dot + ring) that swells over links and shows the label in
 *     any `[data-cursor="Play"]` ancestor;
 *   - magnetic pull on `[data-magnetic]`;
 *   - a scroll progress bar.
 * Everything stands down under reduced motion and on touch.
 */
export function Motion() {
  const ring = React.useRef<HTMLDivElement>(null);
  const dot = React.useRef<HTMLDivElement>(null);
  const bar = React.useRef<HTMLDivElement>(null);
  const [label, setLabel] = React.useState('');

  // Smooth scroll.
  React.useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // In-page anchors glide too.
    const click = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.hasAttribute('data-apply')) return;
      const el = document.querySelector(a.getAttribute('href')!);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      }
    };
    document.addEventListener('click', click);
    return () => {
      gsap.ticker.remove(raf);
      document.removeEventListener('click', click);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Re-measure every trigger once layout settles (sections switch layouts on
  // mount, images and fonts load late).
  React.useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1500);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    const main = document.querySelector('.pm main');
    let last = 0;
    if (main)
      new ResizeObserver((es) => {
        const h = es[0].contentRect.height;
        if (Math.abs(h - last) > 40) {
          last = h;
          refresh();
        }
      }).observe(main);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('load', refresh);
    };
  }, []);

  // Progress bar.
  React.useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
    });
    return () => st.kill();
  }, []);

  // Cursor + magnetic.
  React.useEffect(() => {
    if (reduced() || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelector('.pm')?.classList.add('has-cursor');
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 });
    let mag: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      const t = e.target as Element | null;
      const labelled = t?.closest<HTMLElement>('[data-cursor]');
      const hot = t?.closest('a, button, [role="tab"], summary, input, [data-hot]');
      if (ring.current) ring.current.dataset.state = labelled ? 'label' : hot ? 'hover' : '';
      setLabel(labelled?.dataset.cursor ?? '');

      const m = t?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (mag && mag !== m) gsap.to(mag, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
      mag = m;
      if (m) {
        const r = m.getBoundingClientRect();
        gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: 'power3.out' });
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-[var(--pm-green)]" ref={bar} style={{ transform: 'scaleX(0)' }} />
      <div aria-hidden className="grain" />
      <div aria-hidden ref={ring} className="pm-cursor">
        {label}
      </div>
      <div aria-hidden ref={dot} className="pm-cursor-dot" />
    </>
  );
}

/** Runs a GSAP setup scoped to a ref, reverted on unmount; skipped under reduced motion. */
export function useGsap(scope: React.RefObject<HTMLElement | null>, setup: (self: { reduced: boolean }) => void, deps: React.DependencyList = []) {
  React.useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => setup({ reduced: reduced() }), scope.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
