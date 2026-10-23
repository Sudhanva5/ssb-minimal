'use client';

import * as React from 'react';
import './hero.css';

/** Intake 2's deadline, from the admissions fee table. */
const DEADLINE = new Date('2026-12-27T23:59:59+05:30').getTime();

const leaders = [
  { name: 'BCG', src: '/v3/logos/bcg.svg' },
  { name: 'Colgate-Palmolive', src: '/v3/logos/colgate.svg' },
  { name: 'Airtel', src: '/v3/logos/airtel.svg' },
  { name: 'OpenAI', src: '/v3/logos/openai.svg' },
  { name: 'Meta', src: '/v3/logos/meta.svg' },
];

const facts = [
  { value: '18 months', label: 'incl. internship' },
  { value: 'Bangalore', label: 'On-campus' },
  { value: '150', label: 'Seats' },
];

const pad = (n: number) => String(n).padStart(2, '0');

/*
 * The frosted veil behind the words: stacked blurs, masked so each starts a
 * little lower than the last, so the film turns from sharp to frosted just
 * above the text (v3's hero).
 */
const VEIL_STEPS = [
  { blur: 2, solid: 82, clear: 100 },
  { blur: 4, solid: 70, clear: 94 },
  { blur: 8, solid: 56, clear: 86 },
];

/** The green strip above the nav: time left to apply, ticking every second. */
export function CountdownBar() {
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // The server has no clock to agree with, so the numbers arrive after hydration.
  const ms = now === null ? null : Math.max(0, DEADLINE - now);
  const parts = [
    { n: ms === null ? null : Math.floor(ms / 86_400_000), unit: 'Day' },
    { n: ms === null ? null : Math.floor(ms / 3_600_000) % 24, unit: 'Hrs' },
    { n: ms === null ? null : Math.floor(ms / 60_000) % 60, unit: 'Mins' },
    { n: ms === null ? null : Math.floor(ms / 1000) % 60, unit: 'Sec' },
  ];

  return (
    <div className="hx-bar" role="timer" aria-label="Time left to apply for Intake 2">
      <span className="hx-bar-label">Intake 2 - Application Deadline</span>
      <span className="hx-bar-time" aria-hidden="true">
        {parts.map((p, i) => (
          <React.Fragment key={p.unit}>
            {i > 0 && <span className="hx-bar-dot">·</span>}
            <span>
              <b>{p.n === null ? '--' : pad(p.n)}</b> {p.unit === 'Day' && p.n !== null && p.n !== 1 ? 'Days' : p.unit}
            </span>
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}

/**
 * The first screen, after v3's hero: the campus film runs the full width of
 * the screen (a rounded stage, inset from the edges) across its top and stays
 * sharp. Behind the words it frosts into a solid ground: across the foot on a
 * phone; on desktop in a curve from the top-left down to mid-foot, so the film
 * stays clear behind the form.
 * (The "Build startups…" line lives in the form's header on this page.) At the foot of this column: the
 * programme name, headline, sub-line, three facts and the firms our faculty
 * come from. The form floats over the film's right side (the page's sticky aside).
 */
export function Hero() {
  const video = React.useRef<HTMLVideoElement>(null);

  // The form beside the hero centres on it (page.css), so the page needs its height.
  React.useEffect(() => {
    const form = document.querySelector<HTMLElement>('#apply > *');
    const root = form?.closest<HTMLElement>('.sx');
    if (!form || !root) return;
    const ro = new ResizeObserver(() => root.style.setProperty('--form-h', `${form.offsetHeight}px`));
    ro.observe(form);
    return () => ro.disconnect();
  }, []);

  // A muted loop, like a GIF: autoplay, and a nudge for browsers that hold it back.
  React.useEffect(() => {
    video.current?.play().catch(() => {});
  }, []);

  return (
    <section aria-labelledby="hero-title" className="hx @container">
      <div className="hx-card">
        <div className="hx-stage" aria-hidden="true">
          <video
            ref={video}
            className="hx-media"
            src="/sudh/hero-film.mp4"
            poster="/sudh/hero-film-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className="hx-body">
          {/* From just above the words to the foot of the film: frosted, the film still showing through. */}
          <div className="hx-veil" aria-hidden="true">
            {VEIL_STEPS.map((b) => (
              <div
                key={b.blur}
                className="hx-blur"
                style={{ ['--blur' as string]: `${b.blur}px`, ['--solid' as string]: `${b.solid}%`, ['--clear' as string]: `${b.clear}%` }}
              />
            ))}
            <div className="hx-tint" />
          </div>
          <div className="hx-copy">
            <p className="hx-kicker">Full-Time PGP in Management &amp; Tech</p>
            <h1 id="hero-title" className="hx-title">
              Learn Business hands-on from 100+ Industry Leaders &amp; Faculty
            </h1>
            <dl className="hx-facts">
              {facts.map((f) => (
                <div key={f.value} className="hx-fact">
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hx-proof">
            <div className="hx-leaders">
              <p className="hx-leaders-label">Faculty &amp; leaders from</p>
              <ul className="hx-tiles">
                {leaders.map((l) => (
                  <li key={l.name} className="hx-tile">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={l.name} decoding="async" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
