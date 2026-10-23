'use client';

import * as React from 'react';
import { Heading, Text } from '@kishanscaler/ssx-ui';
import './campus.css';

/* Ported from v3's campus life section and student clubs row (ssb-school-concept.vercel.app/v3). */

const hero = { src: '/v3/campus/cohort.webp', alt: 'An SSB cohort together on campus', position: '50% 62%' };

const tiles = [
  { area: 'a', src: '/v3/campus/arch.webp', alt: 'The Scaler School of Business arch on Commencement Day', position: '50% 50%' },
  { area: 'b', src: '/v3/campus/gym.webp', alt: 'The campus gym', position: '45% 60%' },
  { area: 'd', src: '/v3/campus/building.webp', alt: 'The SSB building in Bengaluru', position: '50% 55%' },
  { area: 'e', src: '/v3/campus/classroom.webp', alt: 'Students in an SSB lecture hall', position: '50% 40%' },
];

const socials = [
  { href: 'https://www.instagram.com/scalerschool_of_business/', handle: '@scalerschool_of_business', note: 'official' },
  { href: 'https://www.instagram.com/life_at_ssb/', handle: '@life_at_ssb', note: 'student-run' },
];

const clubs = [
  {
    tag: 'Marketing',
    title: 'Marketing Club',
    media: '/v3/campus/flags.webp',
    alt: 'SSB banners in the campus grounds',
    position: '50% 70%',
    body: 'Branding sessions and case competitions with founders like Meolaa’s Ishita Sawant: learn to build and pitch a brand.',
  },
  {
    tag: 'Consulting',
    title: 'Consulting Club',
    media: '/v3/campus/classroom.webp',
    alt: 'Students in an SSB lecture hall',
    position: '62% 50%',
    body: 'SSB’s own Case Book and sessions with Ex-McKinsey and BCG consultants: learn to structure and present a case.',
  },
];

const IG_PATH =
  'M7.03.084c-1.277.06-2.149.264-2.911.563-.789.308-1.458.72-2.123 1.388-.665.668-1.075 1.337-1.38 2.127-.295.764-.496 1.637-.552 2.914C.008 8.353-.005 8.764.002 12.023c.006 3.258.02 3.667.082 4.947.061 1.277.264 2.148.564 2.911.308.789.72 1.457 1.388 2.123.668.665 1.336 1.074 2.128 1.38.763.295 1.636.496 2.914.552 1.277.056 1.688.069 4.946.063 3.258-.006 3.668-.021 4.948-.081 1.28-.061 2.147-.266 2.91-.564.789-.308 1.458-.72 2.123-1.388.665-.668 1.074-1.338 1.38-2.128.295-.763.496-1.636.551-2.913.056-1.28.07-1.69.063-4.948-.006-3.258-.021-3.667-.082-4.946-.06-1.28-.264-2.149-.563-2.912-.308-.789-.72-1.457-1.388-2.123C21.298 1.33 20.628.921 19.838.617 19.074.321 18.202.12 16.924.065 15.647.009 15.236-.005 11.977.001 8.718.008 8.31.022 7.03.084m.14 21.693c-1.17-.051-1.805-.245-2.229-.408-.56-.216-.96-.477-1.382-.895-.422-.418-.681-.819-.9-1.378-.164-.423-.362-1.058-.417-2.228-.06-1.265-.072-1.644-.079-4.848-.007-3.204.005-3.583.061-4.848.05-1.169.245-1.805.408-2.228.216-.561.476-.96.895-1.382.419-.421.818-.681 1.378-.9.423-.165 1.058-.361 2.227-.417 1.266-.06 1.645-.072 4.848-.079 3.203-.007 3.584.005 4.85.061 1.169.051 1.805.244 2.227.408.561.216.96.475 1.382.895.422.419.682.818.9 1.379.166.421.362 1.056.417 2.226.06 1.266.074 1.645.08 4.848.006 3.203-.006 3.584-.061 4.848-.051 1.17-.245 1.806-.408 2.23-.216.56-.476.96-.895 1.381-.419.422-.818.681-1.378.9-.423.165-1.058.362-2.226.417-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.061M16.953 5.586a1.44 1.44 0 1 0 1.437-1.442 1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.162 6.162 0 1 0 12.323-.024 6.162 6.162 0 0 0-12.323.024M8 12.008a4 4 0 1 1 4.008 3.992A4 4 0 0 1 8 12.008';

/** The viewports where v3 pins the stage and pulls the photo back (ours: the two-column layout). */
const LIVE = '(min-width: 1056px) and (min-height: 640px)';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** CSS cubic-bezier as a function of x (Newton, with a bisection fallback). */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-5) return sy(t);
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 30; i++) {
      if (sx(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}

/* The ssx motion curves v3's timeline uses. */
const expressiveInOut = bezier(0.4, 0.14, 0.3, 1);
const expressiveEntrance = bezier(0, 0, 0.3, 1);

/**
 * v3's campus motion, without GSAP.
 *   Desktop (LIVE): the stage pins; the cohort photo starts covering it and its
 *   clip closes onto its mosaic slot while the photo scales about the slot's
 *   centre, the tiles converge from 1.28x, and the heading and social chips fade
 *   in from 41% of the way. Scroll is smoothed like a 0.35s scrub.
 *   Elsewhere: the heading fades up and the photos wipe in from the bottom.
 *   Reduced motion: nothing moves.
 */
function useLabMotion(ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = <T extends Element>(s: string) => root.querySelector<T>(s);
    const track = q<HTMLElement>('[data-lab-track]');
    const stage = q<HTMLElement>('[data-lab-stage]');
    const head = q<HTMLElement>('[data-lab-head]');
    const slot = q<HTMLElement>('[data-lab-slot]');
    const heroEl = q<HTMLElement>('[data-lab-hero]');
    const img = heroEl?.querySelector('img') ?? null;
    const tileEls = [...root.querySelectorAll<HTMLElement>('[data-lab-tile]')];
    const overlays = [...root.querySelectorAll<HTMLElement>('[data-lab-overlay]')];
    if (!track || !stage || !head || !slot || !heroEl || !img) return;

    const live = window.matchMedia(LIVE);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    function startLive() {
      root!.setAttribute('data-lab-live', '');
      const m = { top: 0, right: 0, bottom: 0, left: 0, cx: 0, cy: 0, scale: 1, radius: 0, rise: 0 };
      let offs: { x: number; y: number }[] = [];
      const measure = () => {
        tileEls.forEach((t) => (t.style.transform = ''));
        const s = stage!.getBoundingClientRect();
        const n = slot!.getBoundingClientRect();
        m.top = n.top - s.top;
        m.left = n.left - s.left;
        m.right = s.right - n.right;
        m.bottom = s.bottom - n.bottom;
        m.cx = m.left + n.width / 2;
        m.cy = m.top + n.height / 2;
        const hw = n.width / 2;
        const hh = n.height / 2;
        m.scale = Math.min(1, 1.02 * Math.max(hw / m.cx, hw / (s.width - m.cx), hh / m.cy, hh / (s.height - m.cy)));
        m.radius = parseFloat(getComputedStyle(tileEls[0] ?? slot!).borderTopLeftRadius) || 0;
        m.rise = 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        offs = tileEls.map((t) => {
          const r = t.getBoundingClientRect();
          return { x: r.left - s.left + r.width / 2 - m.cx, y: r.top - s.top + r.height / 2 - m.cy };
        });
      };
      const render = (p: number) => {
        const c = expressiveInOut(clamp01(p / 0.82));
        const h = expressiveEntrance(clamp01((p - 0.41) / 0.328));
        heroEl!.style.clipPath = `inset(${m.top * c}px ${m.right * c}px ${m.bottom * c}px ${m.left * c}px round ${m.radius * c}px)`;
        img!.style.transformOrigin = `${m.cx}px ${m.cy}px`;
        img!.style.transform = `scale(${1 + (m.scale - 1) * c})`;
        const k = 1 - c;
        tileEls.forEach((t, i) => {
          t.style.transform = `translate(${0.28 * offs[i].x * k}px, ${0.28 * offs[i].y * k}px) scale(${1 + 0.28 * k})`;
        });
        head!.style.opacity = String(h);
        head!.style.transform = `translateY(${(1 - h) * m.rise}px)`;
        overlays.forEach((o) => (o.style.opacity = String(h)));
      };

      let target = 0;
      let cur = 0;
      let raf = 0;
      let last = 0;
      const read = () => {
        const tr = track!.getBoundingClientRect();
        const top = parseFloat(getComputedStyle(stage!).top) || 0;
        const span = tr.height - (window.innerHeight - top);
        target = span > 0 ? clamp01((top - tr.top) / span) : 0;
      };
      const tick = (now: number) => {
        raf = 0;
        const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
        last = now;
        cur += (target - cur) * (1 - Math.exp(-dt / 0.1));
        if (Math.abs(target - cur) < 0.0004) cur = target;
        render(cur);
        if (cur !== target) raf = requestAnimationFrame(tick);
        else last = 0;
      };
      const onScroll = () => {
        read();
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const remeasure = () => {
        measure();
        read();
        render(cur);
      };

      measure();
      read();
      cur = target;
      render(cur);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      const ro = new ResizeObserver(remeasure);
      ro.observe(stage!);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        ro.disconnect();
        root!.removeAttribute('data-lab-live');
        heroEl!.style.clipPath = '';
        img!.style.transform = '';
        img!.style.transformOrigin = '';
        head!.style.opacity = '';
        head!.style.transform = '';
        tileEls.forEach((t) => (t.style.transform = ''));
        overlays.forEach((o) => (o.style.opacity = ''));
      };
    }

    function startStatic() {
      root!.setAttribute('data-lab-static', '');
      const items = [head!, heroEl!, ...tileEls];
      const io = new IntersectionObserver(
        (entries) => {
          const entering = entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target as HTMLElement)
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
          let i = 0;
          for (const el of entering) {
            if (el !== head) el.style.setProperty('--i', String(i++));
            el.setAttribute('data-in', '');
            io.unobserve(el);
          }
        },
        { rootMargin: '0px 0px -15% 0px' },
      );
      items.forEach((el) => io.observe(el));
      return () => {
        io.disconnect();
        root!.removeAttribute('data-lab-static');
        items.forEach((el) => {
          el.removeAttribute('data-in');
          el.style.removeProperty('--i');
        });
      };
    }

    let stop = () => {};
    const setup = () => {
      stop();
      stop = reduce.matches ? () => {} : live.matches ? startLive() : startStatic();
    };
    setup();
    live.addEventListener('change', setup);
    reduce.addEventListener('change', setup);
    return () => {
      stop();
      live.removeEventListener('change', setup);
      reduce.removeEventListener('change', setup);
    };
  }, [ref]);
}

/** "Campus life": the cohort photo pulls back into the mosaic, then the student clubs row. */
export function Campus() {
  return (
    <>
      <CampusLife />
      <Clubs />
    </>
  );
}

function CampusLife() {
  const ref = React.useRef<HTMLElement>(null);
  useLabMotion(ref);
  return (
    <section
      ref={ref}
      id="campus"
      aria-labelledby="campus-title"
      data-density="roomy"
      className="lab cm @container min-w-0 pt-12 @min-[42rem]:pt-24"
    >
      <div data-lab-track className="lab-track">
        <div data-lab-stage className="lab-stage">
          <div className="lab-frame">
            <div data-lab-head className="lab-head">
              <div className="lab-copy flex flex-col gap-3">
                <Heading as="p" size="eyebrow" className="text-content-brand">
                  Campus life
                </Heading>
                <Heading as="h2" size="display" id="campus-title">
                  Life Beyond the Classroom.
                </Heading>
                <Text size="lg" tone="secondary">
                  Fully residential campus in Bengaluru · Shared Innovation Lab and campus with SST · Backed by Peak XV,
                  Lightrock, Tiger Global.
                </Text>
              </div>
            </div>
            <div data-lab-mosaic className="lab-mosaic">
              <div data-lab-slot className="lab-slot cm-slot">
                <figure data-lab-hero className="lab-tile lab-hero">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hero.src}
                    alt={hero.alt}
                    width={1600}
                    height={1067}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: hero.position }}
                  />
                </figure>
                <div data-lab-overlay className="cm-social" role="group" aria-labelledby="campus-follow">
                  <p id="campus-follow" className="cm-social__label">
                    Follow us on
                  </p>
                  {socials.map((s) => (
                    <a key={s.href} className="cm-glass" href={s.href} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="cm-ig">
                        <path fill="currentColor" d={IG_PATH} />
                      </svg>
                      <span>{s.handle}</span>
                      <span className="cm-glass__note">{s.note}</span>
                    </a>
                  ))}
                </div>
              </div>
              {tiles.map((t) => (
                <figure key={t.area} data-lab-tile data-area={t.area} className="lab-tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.src}
                    alt={t.alt}
                    width={1600}
                    height={1067}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: t.position }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clubs() {
  const row = React.useRef<HTMLUListElement>(null);
  return (
    <section
      aria-labelledby="clubs-title"
      data-density="roomy"
      className="cm-clubs @container min-w-0 overflow-x-clip pt-12 pb-12 @min-[42rem]:pt-16 @min-[42rem]:pb-24"
    >
      <div className="cm-clubs__head flex flex-col gap-6 @min-[42rem]:flex-row @min-[42rem]:items-end @min-[42rem]:justify-between">
        <Heading as="h3" size="1" id="clubs-title" className="lab-sub max-w-(--size-measure-max) [text-wrap:balance]">
          <span style={{ color: 'var(--color-ssb-light-9)' }}>Student clubs</span>, by SSB students.
        </Heading>
      </div>
      <ul ref={row} className="rs-row" aria-label="Student clubs, by SSB students." style={{ ['--rs-card' as string]: '38rem' }}>
        {clubs.map((c) => (
          <li key={c.title}>
            <article className="vc">
              <div className="vc-media">
                <div className="vc-layers">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="vc-photo" src={c.media} alt={c.alt} loading="lazy" decoding="async" style={{ objectPosition: c.position }} />
                </div>
                <span className="vc-tag type-label">{c.tag}</span>
              </div>
              <div className="vc-body">
                <div className="vc-head">
                  <div className="vc-title">
                    <Heading as="h3" size="2">
                      {c.title}
                    </Heading>
                  </div>
                </div>
                <Text size="sm" tone="secondary" className="vc-text">
                  {c.body}
                </Text>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <ScrollDots scroller={row} count={clubs.length} itemName="club" />
    </section>
  );
}

const ChevronLeft = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z" />
  </svg>
);

const INTERVAL = 6000;

/**
 * v3's ScrollDots + CarouselNav, for a scroll-snap row: one dot per page of
 * cards, arrows either side, hidden when everything fits. While on screen it
 * advances every 6s (the active dot fills over that time) until the visitor
 * scrolls the row themselves or reaches the end. It rises in once 90% visible.
 */
function ScrollDots({ scroller, count, itemName }: { scroller: React.RefObject<HTMLUListElement | null>; count: number; itemName: string }) {
  const [perView, setPerView] = React.useState(count);
  const [active, setActive] = React.useState(0);
  const [atEnd, setAtEnd] = React.useState(false);
  const [auto, setAuto] = React.useState(true);
  const [inView, setInView] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const frame = React.useRef<HTMLDivElement>(null);
  const nav = React.useRef<HTMLDivElement>(null);
  const lock = React.useRef<{ index: number; until: number } | null>(null);
  const per = React.useRef(count);
  const pages = Math.max(1, Math.ceil(count / perView));

  const step = (row: HTMLElement) => {
    const first = row.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + parseFloat(getComputedStyle(row).columnGap || '0') : 0;
  };

  React.useEffect(() => {
    const row = scroller.current;
    if (!row) return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    let raf = 0;
    const update = () => {
      raf = 0;
      const s = step(row);
      if (!s) return;
      const cs = getComputedStyle(row);
      const fit = Math.min(
        count,
        Math.max(1, Math.floor((Math.min(row.clientWidth, window.innerWidth) - parseFloat(cs.paddingLeft || '0') + parseFloat(cs.columnGap || '0')) / s + 0.02)),
      );
      if (fit !== per.current) {
        per.current = fit;
        setPerView(fit);
      }
      const n = Math.max(1, Math.ceil(count / fit));
      const end = row.scrollLeft >= row.scrollWidth - row.clientWidth - 1;
      const at = Math.min(n - 1, Math.round(row.scrollLeft / (s * fit)));
      const l = lock.current;
      if (l && performance.now() < l.until && at !== l.index && !end) return;
      lock.current = null;
      setActive(end ? n - 1 : at);
      setAtEnd(end);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    row.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(row);

    // A sideways gesture by the visitor stops the autoplay.
    let start: { x: number; y: number } | null = null;
    const stopAuto = () => setAuto(false);
    const ts = (e: TouchEvent) => {
      const t = e.touches[0];
      start = t ? { x: t.clientX, y: t.clientY } : null;
    };
    const tm = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!start || !t) return;
      const dx = Math.abs(t.clientX - start.x);
      const dy = Math.abs(t.clientY - start.y);
      if (Math.hypot(dx, dy) < 8) return;
      if (dx > dy) stopAuto();
      start = null;
    };
    const wh = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) stopAuto();
    };
    const pd = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') stopAuto();
    };
    row.addEventListener('touchstart', ts, { passive: true });
    row.addEventListener('touchmove', tm, { passive: true });
    row.addEventListener('wheel', wh, { passive: true });
    row.addEventListener('pointerdown', pd);
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      io.disconnect();
      row.removeEventListener('touchstart', ts);
      row.removeEventListener('touchmove', tm);
      row.removeEventListener('wheel', wh);
      row.removeEventListener('pointerdown', pd);
    };
  }, [scroller, count]);

  const go = React.useCallback(
    (i: number) => {
      const row = scroller.current;
      if (!row) return;
      lock.current = { index: i, until: performance.now() + 1100 };
      setActive(i);
      row.scrollTo({ left: i * step(row) * per.current, behavior: reduced ? 'auto' : 'smooth' });
    },
    [scroller, reduced],
  );

  const running = auto && inView && !reduced && pages > 1;
  React.useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (atEnd || active >= pages - 1) setAuto(false);
      else go(active + 1);
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, active, atEnd, pages, go]);

  // Rise in once 90% visible.
  React.useEffect(() => {
    const el = frame.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.9) return;
        io.disconnect();
        raf = requestAnimationFrame(() => setShown(true));
      },
      { threshold: 0.9, rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pages]);

  // How far the arrows travel when the control opens out of the dots.
  React.useLayoutEffect(() => {
    const el = nav.current;
    const dots = el?.querySelector<HTMLElement>('.cn-dots');
    const arrow = el?.querySelector<HTMLElement>('.cn-arrow');
    if (!el || !dots || !arrow) return;
    const set = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap || '0');
      el.style.setProperty('--cn-shift', `${dots.offsetWidth / 2 + gap + arrow.offsetWidth / 2}px`);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(dots);
    return () => ro.disconnect();
  }, [pages]);

  if (pages < 2) return null;
  const choose = (i: number) => {
    setAuto(true);
    go(i);
  };
  const timed = auto && !reduced;
  return (
    <div ref={frame} className="cn-frame">
      <div ref={nav} className="cn" data-tone="light" data-shown={shown || undefined} style={{ ['--cn-gap' as string]: '12px' }}>
        <button
          type="button"
          className="cn-arrow"
          data-side="prev"
          aria-label={`Previous ${itemName}`}
          disabled={active === 0}
          onClick={() => choose(Math.max(0, active - 1))}
        >
          <ChevronLeft />
        </button>
        <div className="cn-dots" role="group" aria-label={`Choose a ${itemName}`}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className="cn-dot"
              aria-label={`${itemName} ${i + 1} of ${pages}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => choose(i)}
            >
              {i === active ? (
                timed ? (
                  <span
                    key={active}
                    className="cn-fill"
                    data-timed=""
                    data-paused={!running || undefined}
                    style={{ ['--cn-interval' as string]: `${INTERVAL}ms` }}
                  />
                ) : (
                  <span className="cn-fill" style={{ ['--cn-p' as string]: 1 }} />
                )
              ) : null}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="cn-arrow"
          data-side="next"
          aria-label={`Next ${itemName}`}
          disabled={atEnd || active >= pages - 1}
          onClick={() => choose(Math.min(pages - 1, active + 1))}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
