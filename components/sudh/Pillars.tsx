'use client';

import * as React from 'react';
import './pillars.css';
import { pillars, type Pillar } from './pillarsData';

const pad = (n: number) => String(n).padStart(2, '0');

/** The numbers box under each claim; off for now. */
const SHOW_STATS = false;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * One list of the pillar as a photo strip: its name, then every row as a tall
 * photo tile (a kicker, a title, one line of what it is), about two and a half
 * in view. It scrolls sideways (swipe, trackpad, keyboard); the arrows beside
 * the name step one tile at a time, and hide when everything fits.
 */
function PillarRail({ group, titleIsK }: { group: Pillar['detail']['groups'][number]; titleIsK: boolean }) {
  const list = React.useRef<HTMLUListElement>(null);
  const [ends, setEnds] = React.useState({ start: true, end: false });

  React.useEffect(() => {
    const el = list.current;
    if (!el) return;
    const update = () => {
      const start = el.scrollLeft < 2;
      const end = el.scrollLeft > el.scrollWidth - el.clientWidth - 2;
      setEnds((s) => (s.start === start && s.end === end ? s : { start, end }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener('scroll', update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = list.current;
    const tile = el?.firstElementChild as HTMLElement | null;
    if (!el || !tile) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (tile.offsetWidth + gap), behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="lw-rail-wrap">
      <div className="lw-rail-head">
        <h4 className="lw-rail-k">{group.name}</h4>
        {!(ends.start && ends.end) && (
          <div className="lw-arrows">
            <button type="button" className="lw-arrow" aria-label="Previous" disabled={ends.start} onClick={() => step(-1)}>
              <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" />
              </svg>
            </button>
            <button type="button" className="lw-arrow" aria-label="Next" disabled={ends.end} onClick={() => step(1)}>
              <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {/* A scrollable region: focusable, so it scrolls from the keyboard too. */}
      <ul ref={list} className="lw-rail" aria-label={group.name} tabIndex={0}>
        {group.rows.map((row) => (
          <li key={row.t} className="lw-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={row.img} alt="" loading="lazy" decoding="async" />
            <div className="lw-tile-body">
              {/* Frost and shade sized to the words, however many lines they run to. */}
              <span className="lw-tile-frost" aria-hidden="true" />
              <p className="lw-tile-k">{titleIsK ? row.t : row.k}</p>
              <h5 className="lw-tile-t">{titleIsK ? row.k : row.t}</h5>
              <hr className="lw-tile-rule" />
              <p className="lw-tile-b">{row.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The pillar's tools, icon and name, drifting by in a loop (paused on hover; still under reduced motion). */
function LogoMarquee({ logos, label }: { logos: Pillar['logos']; label: string }) {
  return (
    <div className="lw-marquee">
      <div className="lw-marquee-track" style={{ ['--n' as string]: logos.length }}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="lw-marquee-set" aria-label={copy ? undefined : label} aria-hidden={copy ? true : undefined}>
            {logos.map((l) => (
              <li key={l.alt} className="lw-chip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt="" loading="lazy" decoding="async" />
                <span>{l.alt}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** One way of learning: its number and name, its claim, the numbers in a box (SHOW_STATS), a photo strip per list, and (AI) its tools. */
function PillarCard({ p, i }: { p: Pillar; i: number }) {
  return (
    <article className="lw-card reveal" id={`pillar-${p.key}`} aria-labelledby={`lw-${p.key}`}>
      <header className="lw-head">
        <h3 className="lw-name" id={`lw-${p.key}`}>
          <span className="lw-idx">{pad(i + 1)}</span> {p.name}
        </h3>
        <p className="lw-claim">{p.claim}</p>
      </header>

      {SHOW_STATS && (
        <dl className="lw-nums">
          {p.nums.map(([v, l]) => (
            <div key={l} className="lw-stat">
              <dt>{v}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.detail.groups.map((g) => (
        <PillarRail key={g.name} group={g} titleIsK={p.tileTitle === 'k'} />
      ))}
      {p.marquee && <LogoMarquee logos={p.logos} label={`${p.name}: tools`} />}
    </article>
  );
}

/**
 * How you learn, from the v4 concept site, in this page's light theme: the
 * five ways SSB teaches business as cards, one below the other
 * (deep link: #pillar-<key>).
 */
export function Pillars() {
  return (
    <section id="learn" aria-labelledby="lw-title" className="lw @container min-w-0">
      <div className="py-12 @min-[42rem]:py-24">
        <div className="mb-8 flex max-w-(--size-measure-max) flex-col gap-3 @min-[42rem]:mb-12">
          <p className="m-0 font-sans type-eyebrow text-content-brand">How you learn</p>
          <h2 id="lw-title" className="m-0 font-sans type-display">
            Five ways SSB teaches business. All of them by doing it.
          </h2>
          <p className="font-sans text-content-secondary type-body-lg">Every term ends in a build. Some became companies.</p>
        </div>
        <div className="lw-list">
          {pillars.map((p, i) => (
            <PillarCard key={p.key} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
