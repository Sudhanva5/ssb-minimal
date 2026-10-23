'use client';

import * as React from 'react';
import { Heading } from '@kishanscaler/ssx-ui';
import './placement-peers.css';

/** A logo in a flip grid: `w` x `h` is its optical size, so marks of different shapes read alike. */
export type PeerLogo = { name: string; src: string; w: number; h: number };

const CELLS = 24;
const TICK = 1000;

/**
 * v3's logo wall: a hairline grid of 24 cells. Once a second one cell (never the
 * last one) flips over to a logo that is not on the wall yet. Stops off screen
 * and under reduced motion.
 */
export function PeersFlip({ title, label, logos }: { title: string; label: string; logos: PeerLogo[] }) {
  const ref = React.useRef<HTMLUListElement>(null);
  // Each cell: which logo it shows, and a turn count that remounts the card to replay the flip.
  const [cells, setCells] = React.useState(() => logos.slice(0, CELLS).map((_, i) => ({ logo: i, turn: 0 })));

  React.useEffect(() => {
    const el = ref.current;
    if (!el || logos.length <= CELLS) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id = 0;
    let last = -1;
    const tick = () =>
      setCells((prev) => {
        let i = Math.floor(Math.random() * prev.length);
        if (i === last) i = (i + 1 + Math.floor(Math.random() * (prev.length - 1))) % prev.length;
        last = i;
        const shown = new Set(prev.map((c) => c.logo));
        const spare = logos.map((_, n) => n).filter((n) => !shown.has(n));
        const next = prev.slice();
        next[i] = { logo: spare[Math.floor(Math.random() * spare.length)], turn: prev[i].turn + 1 };
        return next;
      });
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      if (e.isIntersecting) id = window.setInterval(tick, TICK);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [logos]);

  return (
    <div className="flex flex-col gap-5" data-enter="block">
      <div className="flex flex-col gap-1">
        <Heading as="h3" size="3" className="peers-title">
          {title}
        </Heading>
      </div>
      <ul className="sr-only" aria-label={label}>
        {logos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <ul ref={ref} className="peers-flip" aria-hidden="true">
        {cells.map((c, i) => {
          const l = logos[c.logo];
          return (
            <li key={i} className="peers-flip-cell">
              <div key={c.turn} className="peers-flip-card" data-turned={c.turn ? '' : undefined}>
                <div className="peers-flip-face">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.src}
                    alt=""
                    width={l.w}
                    height={l.h}
                    decoding="async"
                    className="peers-flip-logo"
                    style={{ ['--w' as string]: `${l.w}px` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
