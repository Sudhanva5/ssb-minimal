'use client';

import * as React from 'react';
import Image from 'next/image';
import { Play } from '@phosphor-icons/react';
import campus from '../../public/images/campus-hero.jpg';
import { clamp01, easeOut, lerp, prefersReducedMotion, useScrollFrame } from './useScrollFrame';

/* Radiating lines behind the film, from the centre out (v4's "launch" field). */
const RAYS = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2 + (i % 3) * 0.04;
  const r0 = 260 + (i % 4) * 60;
  return { x1: 800 + Math.cos(a) * r0, y1: 450 + Math.sin(a) * r0, x2: 800 + Math.cos(a) * 1400, y2: 450 + Math.sin(a) * 1400 };
});

function Copy() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-ssb-dark-11)]">THE CAMPUS FILM</p>
        <p className="mt-3 text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
          Learn business by
          <br />
          doing business.
        </p>
      </div>
      <span className="flex shrink-0 items-center gap-3 rounded-lg bg-on-image-ink py-1.5 ps-1.5 pe-4 text-sm font-medium text-[var(--color-ssb-dark-2)] max-sm:hidden">
        <span className="flex size-8 items-center justify-center rounded-md bg-[var(--color-ssb-dark-2)] text-on-image-ink">
          <Play className="size-3" weight="fill" aria-hidden />
        </span>
        Watch with sound · 0:15
      </span>
    </div>
  );
}

/**
 * Desktop: the film card sits in the column, then as you scroll it flies out
 * to fill the screen while the page behind it goes dark — v4's flyer. Phones
 * and reduced motion: a plain card.
 */
export function FilmFlight() {
  const section = React.useRef<HTMLDivElement>(null);
  const card = React.useRef<HTMLDivElement>(null);
  const floor = React.useRef<HTMLDivElement>(null);
  const copy = React.useRef<HTMLDivElement>(null);
  const [flying, setFlying] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1056px)');
    const update = () => setFlying(mq.matches && !prefersReducedMotion());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useScrollFrame(() => {
    const s = section.current;
    const c = card.current;
    if (!flying || !s || !c || !floor.current || !copy.current) return;
    const rect = s.getBoundingClientRect();
    const W = window.innerWidth;
    const H = window.innerHeight;
    // 0 when the section's top reaches the top of the screen, 1 a screen later.
    const p = easeOut(clamp01(-rect.top / (H * 0.9)));
    const colW = rect.width;
    const startH = (colW * 9) / 16;
    const startTop = 96; // where the card rests in the sticky frame before it flies
    const endLeft = -rect.left + 72;
    const endW = W - 144;
    const endH = H - 170;
    c.style.left = `${lerp(0, endLeft, p)}px`;
    c.style.top = `${lerp(startTop, 85, p)}px`;
    c.style.width = `${lerp(colW, endW, p)}px`;
    c.style.height = `${lerp(startH, endH, p)}px`;
    floor.current.style.opacity = String(p);
    copy.current.style.opacity = String(clamp01((p - 0.55) / 0.45));
    copy.current.style.transform = `translateY(${(1 - clamp01((p - 0.55) / 0.45)) * 24}px)`;
  });

  if (!flying) {
    return (
      <div className="reveal-tile relative isolate mt-8 aspect-video overflow-hidden rounded-[22px] text-on-image-ink">
        <Image src={campus} alt="" fill sizes="(min-width: 1056px) 50vw, 100vw" className="anim-settle z-below object-cover" />
        <div aria-hidden className="absolute inset-0 z-below bg-linear-to-t from-surface-image-scrim from-10% to-transparent to-60%" />
        <div className="absolute inset-x-5 bottom-5">
          <Copy />
        </div>
      </div>
    );
  }

  return (
    <div ref={section} className="relative mt-8 h-[200vh]">
      <div className="sticky top-0 h-screen">
        <div ref={floor} aria-hidden className="bleed-abs bg-[var(--color-ssb-dark-1)] opacity-0">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="size-full">
            {RAYS.map((r, i) => (
              <line key={i} {...r} stroke="var(--color-ssb-dark-10)" strokeOpacity={0.18 + (i % 4) * 0.08} strokeWidth="1.2" />
            ))}
          </svg>
        </div>
        <div
          ref={card}
          className="absolute overflow-hidden rounded-[22px] text-on-image-ink"
          style={{ left: 0, top: 96, width: '100%', aspectRatio: '16 / 9' }}
        >
          <Image src={campus} alt="The Scaler School of Business campus" fill sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-surface-image-scrim from-5% to-transparent to-55%" />
          <div ref={copy} className="absolute inset-x-8 bottom-8 opacity-0 lg:inset-x-[3.5rem] lg:bottom-12">
            <Copy />
          </div>
        </div>
      </div>
    </div>
  );
}
