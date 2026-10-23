import { Button } from '@kishanscaler/ssx-ui';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { IimaLogo, McKinseyLogo } from '../PartnerLogos';
import { facts, firms, outcomes } from './data';

const d = (s: number) => ({ ['--d' as string]: s }) as React.CSSProperties;

/** "Apply now  [→]" — v4's button with the arrow in its own square. */
function ArrowButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <Button asChild size="lg" variant={variant} className="gap-4 pe-2">
      <a href={href}>
        {children}
        <span
          className={
            variant === 'primary'
              ? 'flex size-control-sm items-center justify-center rounded-md bg-on-image-wash-bg-hover'
              : 'flex size-control-sm items-center justify-center rounded-md bg-surface-active'
          }
        >
          <ArrowRight className="size-icon-sm" />
        </span>
      </a>
    </Button>
  );
}

/** The firms our faculty come from, scrolling — v4's logo track. */
function LogoMarquee() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pe-12">
      {firms.map((f) => (
        <li key={f} className="text-[1.125rem] font-semibold tracking-tight whitespace-nowrap text-content-secondary">
          {f}
        </li>
      ))}
      <li>
        <McKinseyLogo className="h-6 w-auto text-content-secondary" />
      </li>
      <li>
        <IimaLogo className="h-10 w-auto text-content-secondary" />
      </li>
    </ul>
  );
  return (
    <div
      aria-label="Where our faculty work"
      role="group"
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="anim-marquee flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

/* v4's hero light: thin green streaks fanning in from the top-right corner. */
const STREAKS = Array.from({ length: 22 }, (_, i) => {
  // Angles from 100° to 172° (screen coordinates: y grows down), so every
  // line leaves the corner heading left and down.
  const a = ((100 + (i / 21) * 72 + (i % 3) * 0.8) * Math.PI) / 180;
  const r0 = 120 + (i % 5) * 90; // start a little way out, so the corner stays clean
  return {
    x1: 1600 + Math.cos(a) * r0,
    y1: Math.sin(a) * r0,
    x2: 1600 + Math.cos(a) * 2400,
    y2: Math.sin(a) * 2400,
  };
});

/** Desktop and phone: the first screen's backdrop, under the nav. */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[max(100svh,40rem)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,color-mix(in_oklab,var(--color-action-primary)_14%,transparent),transparent_60%)]" />
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMin slice" className="anim-fade absolute inset-0 size-full" style={d(0.2)}>
        {STREAKS.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="var(--color-action-primary)"
            strokeOpacity={0.08 + (i % 4) * 0.05}
            strokeWidth={i % 5 === 0 ? 1.6 : 1}
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-surface to-transparent" />
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="pt-10 md:flex md:min-h-[calc(max(100svh,40rem)-4rem)] md:flex-col md:justify-center md:py-16"
    >
      <h1 id="hero-title" className="text-[clamp(2.5rem,5.4vw,4rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
        <span className="anim-line" style={d(0.05)}>
          <span>PGP in</span>
        </span>
        <span className="anim-line text-action-primary" style={d(0.15)}>
          <span>Management &amp; Technology</span>
        </span>
      </h1>
      <p className="anim-fade mt-4 text-[clamp(1.125rem,2vw,1.5rem)] leading-snug text-content-secondary" style={d(0.3)}>
        Learn business hands-on, from 100+ industry leaders &amp; faculty
      </p>
      <p className="anim-fade mt-6 text-content-secondary" style={d(0.38)}>
        Build startups &amp; AI products. No tech background required.
      </p>
      <div className="anim-fade mt-6 flex flex-wrap gap-3" style={d(0.46)}>
        <ArrowButton href="#apply">Apply now</ArrowButton>
        <ArrowButton href="#programme" variant="secondary">
          Brochure
        </ArrowButton>
      </div>

      <div className="anim-fade mt-12 border-t border-border-decorative pt-5" style={d(0.58)}>
        <dl className="flex">
          {facts.map((f, i) => (
            <div key={f.value} className={i ? 'border-s border-border-decorative ps-4 md:ps-6' : 'pe-4 md:pe-6'}>
              <dt className="text-sm font-semibold text-content-brand md:text-base">{f.value}</dt>
              <dd className="text-xs text-content-secondary md:text-sm">{f.label}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}

/** Three outcome tiles that wipe in from the right, v4-style. */
export function OutcomeTiles() {
  return (
    <ul className="mt-8 grid grid-cols-3 gap-3">
      {outcomes.map((o, i) => (
        <li
          key={o.value}
          className="anim-tile relative isolate flex h-[13rem] flex-col justify-end overflow-hidden rounded-[22px] bg-[var(--color-ssb-dark-3)] p-4 text-on-image-ink md:h-[15rem] md:p-5"
          style={d(0.7 + i * 0.1)}
        >
          <div aria-hidden className="anim-settle img-placeholder absolute inset-0 z-below opacity-faint" />
          <div aria-hidden className="absolute inset-0 z-below bg-linear-to-t from-[var(--color-ssb-dark-2)] to-transparent" />
          <p className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.03em]">{o.value}</p>
          <p className="mt-2 text-xs text-on-image-ink-secondary md:text-sm">{o.label}</p>
        </li>
      ))}
    </ul>
  );
}

/* v4's light-to-dark seam: a ragged edge of squares, a few lit green. Full bleed. */
const COLS = 72;
function rand(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
export function PixelSeam({ flip = false }: { flip?: boolean }) {
  const cells: { x: number; y: number; lit: boolean }[] = [];
  for (let c = 0; c < COLS; c++) {
    const h = Math.floor(rand(c + 1) * 3) + 1;
    for (let r = 0; r < h; r++) cells.push({ x: c, y: 3 - r, lit: false });
    if (rand(c + 99) > 0.82) cells.push({ x: c, y: 3 - h, lit: true });
    if (rand(c + 7) > 0.88) cells.push({ x: c, y: 3 - h - 1, lit: false });
  }
  return (
    <div aria-hidden className="relative h-10 md:h-16">
      <svg
        viewBox={`0 0 ${COLS} 5`}
        preserveAspectRatio="none"
        className={`bleed-abs block h-full ${flip ? 'rotate-180' : ''}`}
        shapeRendering="crispEdges"
      >
        <rect x="0" y="4" width={COLS} height="1" fill="var(--color-ssb-dark-1)" />
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="1"
            height="1"
            fill={c.lit ? (i % 2 ? 'var(--color-ssb-dark-11)' : 'var(--color-ssb-dark-9)') : 'var(--color-ssb-dark-1)'}
          />
        ))}
      </svg>
    </div>
  );
}
