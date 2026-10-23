'use client';

import * as React from 'react';
import Image from 'next/image';
import campus from '../../public/images/campus-hero-mweb.png';
import { clamp01, easeOut, prefersReducedMotion, useScrollFrame } from './useScrollFrame';

/**
 * "Learn business [photo] by building it." The photo opens up between the
 * words as the line scrolls to the middle of the screen, pushing them apart.
 */
export function SplitHeadline({ id }: { id: string }) {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const slot = React.useRef<HTMLSpanElement>(null);

  useScrollFrame(() => {
    if (!ref.current || !slot.current) return;
    if (prefersReducedMotion()) {
      slot.current.style.width = '';
      return;
    }
    const r = ref.current.getBoundingClientRect();
    const H = window.innerHeight;
    // 0 as the line enters at the bottom, 1 once it reaches the middle.
    const p = easeOut(clamp01((H - r.top) / (H * 0.55)));
    slot.current.style.width = `${p * 1.9}em`;
    slot.current.style.opacity = String(p);
  });

  return (
    <h2
      ref={ref}
      id={id}
      className="text-center text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05] font-semibold tracking-[-0.045em]"
    >
      Learn business
      <span
        ref={slot}
        aria-hidden
        className="relative mx-[0.12em] inline-block h-[1.1em] w-[1.9em] translate-y-[0.18em] overflow-hidden rounded-[0.18em] align-baseline"
      >
        <Image src={campus} alt="" fill sizes="10rem" className="object-cover" />
      </span>
      by building it.
    </h2>
  );
}
