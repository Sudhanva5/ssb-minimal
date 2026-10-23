'use client';

import * as React from 'react';
import Image from 'next/image';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { SplitText } from 'gsap/SplitText';
import { alumni } from '../v3data';
import { manifesto, outcomes } from './data';
import { gsap, lenisRef, ScrollTrigger, useGsap } from './Motion';

gsap.registerPlugin(SplitText);

/**
 * A band of giant words that drifts on its own and speeds up, reverses and
 * leans with the velocity of your scroll.
 */
export function VelocityMarquee({ words, tone = 'ink' }: { words: string[]; tone?: 'ink' | 'lime' }) {
  const track = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0;
    let dir = -1;
    let skew = 0;
    const tick = () => {
      const v = lenisRef.current?.velocity ?? 0;
      if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1;
      x += dir * (0.6 + Math.min(Math.abs(v) * 0.35, 14));
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      skew += (gsap.utils.clamp(-12, 12, v * 0.6) - skew) * 0.12;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);
  const row = (hidden?: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className={i % 2 ? 'it' : ''}>{w}</span>
          <span aria-hidden className="mx-[0.35em] inline-block size-[0.32em] rounded-full bg-[var(--pm-green)]" />
        </span>
      ))}
    </span>
  );
  return (
    <div
      className={`overflow-hidden py-6 ${tone === 'lime' ? 'bg-[var(--pm-lime)]' : ''}`}
      aria-label={words.join(', ')}
    >
      <div ref={track} className="flex w-max text-[clamp(3rem,10cqw,8.5rem)] leading-none font-bold tracking-[-0.05em] whitespace-nowrap will-change-transform">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

/**
 * The campus film. Starts as a small rounded window and clips open to fill the
 * stage as it scrolls in; the copy rises after. Cursor reads "Play".
 */
export function Film() {
  const root = React.useRef<HTMLElement>(null);
  const video = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);

  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      '[data-film]',
      { clipPath: 'inset(14% 22% 14% 22% round 32px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 10%', scrub: true } },
    );
    gsap.fromTo('[data-film] video', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 10%', scrub: true } });
    gsap.from('[data-film-copy] > *', { y: 60, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 15%' } });
  });

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play();
    setMuted(v.muted);
  };

  return (
    <section ref={root} id="film" aria-label="The campus film" className="relative scroll-mt-20">
      <div data-film data-cursor={muted ? 'Sound on' : 'Mute'} onClick={toggle} className="relative h-[100svh] overflow-hidden bg-[var(--pm-ink)]">
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          src="/v4/media/campus-film.mp4"
          poster="/p/campus/building.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_46_23/0.8),transparent_55%)]" />
        <div data-film-copy className="pad absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-12 text-[#fff]">
          <p className="kicker text-[var(--pm-lime)]">The campus film · 0:15</p>
          <h2 className="display max-w-[14ch] text-[clamp(3rem,9cqw,8rem)]">
            Every term ends <span className="it text-[var(--pm-lime)]">in a build.</span>
          </h2>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="flex items-center gap-3 self-start rounded-full bg-[rgb(255_255_255/0.14)] py-2 ps-2 pe-5 text-[0.875rem] font-semibold backdrop-blur-[12px]"
          >
            <span className="flex size-[2.25rem] items-center justify-center rounded-full bg-[var(--pm-lime)] text-[var(--pm-ink)]">
              {muted ? <SpeakerSlash className="size-icon-sm" /> : <SpeakerHigh className="size-icon-sm" />}
            </span>
            {muted ? 'Watch with sound' : 'Mute'}
          </button>
        </div>
      </div>
    </section>
  );
}

/** The case against the MBA: the quote scrubs from grey to ink word by word, key words get a lime highlighter. */
export function Manifesto() {
  const root = React.useRef<HTMLElement>(null);
  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    const split = new SplitText('[data-quote]', { type: 'words' });
    gsap.fromTo(split.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '[data-quote]', start: 'top 80%', end: 'bottom 45%', scrub: true } });
    gsap.utils.toArray<HTMLElement>('[data-mark]').forEach((m) =>
      gsap.fromTo(m, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: { trigger: m, start: 'top 70%', end: 'top 45%', scrub: true } }),
    );
    gsap.from('[data-stat]', { y: 80, autoAlpha: 0, stagger: 0.15, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '[data-stats]', start: 'top 80%' } });
  });
  const mark = 'bg-[linear-gradient(var(--pm-lime),var(--pm-lime))] bg-no-repeat [background-size:100%_100%] px-[0.08em]';
  return (
    <section ref={root} aria-labelledby="why-title" className="pad py-32 md:py-40">
      <p className="kicker text-[var(--pm-green)]">Why SSB · The case</p>
      <h2 id="why-title" className="sr-only">
        Why the traditional MBA doesn’t work
      </h2>
      <blockquote data-quote className="mt-10 text-[clamp(2.25rem,6.2cqw,5.25rem)] leading-[1.02] font-bold tracking-[-0.05em]">
        “If you’re 25 and going to an <span data-mark className={mark}>MBA college</span> today, you must be{' '}
        <span data-mark className={mark}>some kind of idiot</span>, if you ask me.”
      </blockquote>
      <p className="mt-8 text-[1rem]">
        <span className="font-bold">{manifesto.by}</span> <span className="text-[var(--pm-ink-3)]">— {manifesto.role}</span>
      </p>
      <div data-stats className="mt-24 grid gap-12 md:grid-cols-2">
        {manifesto.stats.map((s) => (
          <div key={s.value} data-stat className="border-t border-[var(--pm-ink)] pt-6">
            <p className="text-[clamp(5rem,14cqw,11rem)] leading-[0.85] font-bold tracking-[-0.07em]">{s.value}</p>
            <p className="mt-6 max-w-[22rem] text-[1.0625rem] leading-[1.5]">{s.label}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.logo} alt={s.source} className="mt-6 h-5 w-auto opacity-[0.6]" />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Digits that roll into place like an odometer when scrolled into view. */
function Odometer({ value }: { value: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cols = el.querySelectorAll<HTMLElement>('[data-col]');
    gsap.set(cols, { y: '0em' });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        cols.forEach((c, i) => gsap.to(c, { y: `${-(10 + Number(c.dataset.col))}em`, duration: 1.8 + i * 0.15, ease: 'expo.out' })),
    });
    return () => st.kill();
  }, []);
  return (
    <span ref={ref} className="odo" aria-label={value}>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden className="odo-col-wrap inline-block h-[1em] overflow-hidden">
            <span data-col={ch} className="odo-col" style={{ transform: `translateY(${-(10 + Number(ch))}em)` }}>
              {[...'0123456789', ...'0123456789'].map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/** Outcomes: four odometer figures on a ruled sheet, the cohort photo, and a ribbon of alumni. */
export function Outcomes() {
  const root = React.useRef<HTMLElement>(null);
  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo('[data-cohort]', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '[data-cohort]', start: 'top 80%' } });
    gsap.fromTo('[data-cohort] img', { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-cohort]', start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  return (
    <section ref={root} id="outcomes" aria-labelledby="outcomes-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="pad">
        <p className="kicker text-[var(--pm-green)]">Outcomes · Founding cohorts</p>
        <h2 id="outcomes-title" className="h2 mt-6 max-w-[16ch]">
          The founding cohort’s <span className="it text-[var(--pm-green)]">returns.</span>
        </h2>
        <dl className="mt-16 grid grid-cols-2 border-t border-[var(--pm-ink)]">
          {outcomes.map((o, i) => (
            <div key={o.label} className={`border-b border-[var(--pm-line)] py-8 ${i % 2 ? 'ps-6 md:ps-10' : 'border-e pe-6 md:pe-10'}`}>
              <dt className="sr-only">{o.label}</dt>
              <dd>
                <span className="block text-[clamp(2.75rem,8cqw,7rem)] leading-none font-bold tracking-[-0.06em]">
                  <Odometer value={o.value} />
                </span>
                <span className="mt-4 block text-[0.9375rem] font-semibold">{o.label}</span>
                <span className="block text-[0.8125rem] text-[var(--pm-ink-3)]">{o.note}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[0.75rem] text-[var(--pm-ink-3)]">Reported figures; sources and methodology to be confirmed before launch.</p>
      </div>

      <div data-cohort className="relative mt-16 aspect-[16/8] overflow-hidden">
        <Image src="/p/campus/cohort.webp" alt="SSB’s founding cohort on campus" fill sizes="(min-width: 1056px) 70vw, 100vw" className="object-cover" />
      </div>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="anim-marquee flex w-max gap-3 [animation-duration:70s]">
          {[...alumni, ...alumni].map((a, i) => (
            <div key={i} aria-hidden={i >= alumni.length || undefined} className="flex w-[18rem] shrink-0 items-center gap-3 rounded-full bg-[#fff] py-2 ps-2 pe-5 shadow-[inset_0_0_0_1px_var(--pm-line)]">
              {'photo' in a && a.photo ? (
                <Image src={`/v3/alumni/${a.photo}.webp`} alt="" width={44} height={44} className="size-[2.75rem] shrink-0 rounded-full object-cover" />
              ) : (
                <span className="flex size-[2.75rem] shrink-0 items-center justify-center rounded-full bg-[var(--pm-lime)] text-[0.8125rem] font-bold">
                  {a.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              )}
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[0.9375rem] font-bold">{a.name}</span>
                <span className="block truncate text-[0.8125rem] text-[var(--pm-ink-2)]">
                  {a.before} → <span className="font-semibold text-[var(--pm-green)]">{a.at}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
