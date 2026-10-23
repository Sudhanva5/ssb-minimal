'use client';

import * as React from 'react';
import './rail.css';

export type Org = {
  name: string;
  icon: string;
  /** The icon is a full-bleed app icon: it fills the tile instead of sitting inside it. */
  fill?: boolean;
  /** A one-colour mark (a white "-light" file): drawn in this colour on the white tile. */
  tint?: string;
  /** No usable square mark: this letter stands in for it. */
  mono?: string;
};

/** One company tile: the app icon, a tinted mark, or a letter. */
function OrgTile({ o }: { o: Org }) {
  if (o.mono)
    return (
      <span className="pc-card__tile" data-mono="">
        {o.mono}
      </span>
    );
  if (o.tint)
    return (
      <span className="pc-card__tile">
        <span className="pc-card__tint" style={{ background: o.tint, maskImage: `url("${o.icon}")`, WebkitMaskImage: `url("${o.icon}")` }} />
      </span>
    );
  return (
    <span className="pc-card__tile" data-fill={o.fill || undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={o.icon} alt="" loading="lazy" decoding="async" />
    </span>
  );
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * The dark people card: photo on the left fading into the card, then a title,
 * a "by" line, a rule, a detail line and the company tiles. Without a photo,
 * the initials sit on v3's plate.
 */
export function PersonCard({
  photo,
  name,
  title,
  by,
  detail,
  orgs,
  size,
  photoFit = 'side',
}: {
  photo?: string;
  /** For the initials when there is no photo. */
  name: string;
  title: string;
  by: string;
  detail?: string;
  orgs: Org[];
  /** `sm`: a smaller title, for longer ones. */
  size?: 'sm';
  /**
   * `side`: a portrait on the left, fading into the card. `full`: a 3:2 photo
   * shot to fill the whole card, the person on the left (v3's alumni).
   */
  photoFit?: 'side' | 'full';
}) {
  return (
    <article className="pc-card" data-size={size} data-photo={photoFit}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pc-card__photo" src={photo ?? '/v3/internship/plate.webp'} alt="" loading="lazy" decoding="async" />
      {!photo && (
        <span className="pc-card__initials" aria-hidden="true">
          {initials(name)}
        </span>
      )}
      <div className="pc-card__body">
        <h3 className="pc-card__title">{title}</h3>
        <p className="pc-card__by">{by}</p>
        <hr className="pc-card__rule" />
        {detail && <p className="pc-card__detail">{detail}</p>}
        <ul className="pc-card__orgs">
          {orgs.map((o) => (
            <li key={o.name} className="pc-card__org">
              <OrgTile o={o} />
              <span className="pc-card__org-name">{o.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * Two rows of cards that move together, in columns that snap. Nothing moves on
 * its own: swipe, scroll, or use the arrows and dots (a dot per page of whole
 * columns; the arrows stop at the ends).
 */
export function CardRail({ label, children }: { label: string; children: React.ReactNode }) {
  const list = React.useRef<HTMLUListElement>(null);
  const page = React.useRef(0);
  const [state, setState] = React.useState({ cur: 0, count: 1 });
  const items = React.Children.toArray(children);

  React.useEffect(() => {
    const el = list.current;
    if (!el) return;
    const update = () => {
      const li = el.children as HTMLCollectionOf<HTMLElement>;
      if (!el.clientWidth || li.length < 3) return;
      // Two rows fill column by column, so the third item starts the second column.
      const step = li[2].offsetLeft - li[0].offsetLeft;
      const gap = step - li[0].offsetWidth;
      const cols = Math.ceil(li.length / 2);
      const perPage = Math.max(1, Math.floor((el.clientWidth + gap) / step));
      page.current = perPage * step;
      const count = Math.max(1, Math.ceil((cols - perPage) / perPage) + 1);
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      const cur = atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / page.current));
      setState((s) => (s.cur === cur && s.count === count ? s : { cur, count }));
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

  const to = (i: number) => {
    const el = list.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(max, i * page.current), behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="rail">
      <ul ref={list} className="rail-list" aria-label={label}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {state.count > 1 && (
        <RailControls
          label={label}
          count={state.count}
          cur={state.cur}
          onPrev={() => to(state.cur - 1)}
          onNext={() => to(state.cur + 1)}
          onDot={to}
        />
      )}
    </div>
  );
}

/**
 * v3's carousel control: prev, a dot per page, next. It rises in the first
 * time it is on screen, the arrows sliding out from behind the dots.
 */
function RailControls({
  label,
  count,
  cur,
  onPrev,
  onNext,
  onDot,
}: {
  label: string;
  count: number;
  cur: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) {
  const root = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // How far the arrows travel out from behind the dots.
  React.useLayoutEffect(() => {
    const el = root.current;
    const dots = el?.querySelector<HTMLElement>('.cn-dots');
    const arrow = el?.querySelector<HTMLElement>('.cn-arrow');
    if (!el || !dots || !arrow) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.style.setProperty('--cn-shift', `${dots.offsetWidth / 2 + gap + arrow.offsetWidth / 2}px`);
  }, [count]);

  return (
    <div ref={root} className="cn" data-shown={shown || undefined} style={{ ['--cn-gap' as string]: '12px' }}>
      <button type="button" className="cn-arrow" data-side="prev" aria-label="Previous" disabled={cur === 0} onClick={onPrev}>
        <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" />
        </svg>
      </button>
      <div className="cn-dots" role="group" aria-label={`${label}: pages`}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className="cn-dot"
            aria-label={`Page ${i + 1} of ${count}`}
            aria-current={i === cur ? 'true' : undefined}
            onClick={() => onDot(i)}
          >
            {i === cur && <span className="cn-fill" />}
          </button>
        ))}
      </div>
      <button type="button" className="cn-arrow" data-side="next" aria-label="Next" disabled={cur === count - 1} onClick={onNext}>
        <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z" />
        </svg>
      </button>
    </div>
  );
}
