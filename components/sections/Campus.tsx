'use client';

import * as React from 'react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@kishanscaler/ssx-ui';
import { ArrowUpRight, InstagramLogo, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { campus, faqs } from '../v3data';
import { Band, SectionHeading } from './shared';

const d = (v: number) => ({ ['--d' as string]: v }) as React.CSSProperties;

/** The campus film, muted on a loop, in a frame that eases out of a zoom; one tap for sound. */
function Film() {
  const video = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);
  const toggle = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play();
    setMuted(v.muted);
  };
  return (
    <figure className="reveal-tile relative isolate mt-12 aspect-video overflow-hidden rounded-2xl bg-[var(--color-ssb-dark-2)] [--tile-r:1rem] md:mt-16">
      <video
        ref={video}
        className="anim-settle absolute inset-0 size-full object-cover"
        src="/v4/media/campus-film.mp4"
        poster="/v3/campus/building.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="The SSB campus film"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.6),transparent_45%)]" />
      <figcaption className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-on-image-ink md:right-6 md:bottom-6 md:left-6">
        <span className="text-[clamp(1.25rem,2.6vw,1.75rem)] leading-tight font-semibold tracking-[-0.02em]">
          Learn business by
          <br />
          doing business.
        </span>
        <button
          type="button"
          onClick={toggle}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#fff] py-2 ps-2 pe-4 text-sm font-medium text-[var(--color-ssb-dark-2)] transition-transform duration-300 hover:scale-105"
        >
          <span className="flex size-control-sm items-center justify-center rounded-full bg-[var(--color-ssb-dark-2)] text-on-image-ink">
            {muted ? <SpeakerSlash className="size-icon-sm" aria-hidden /> : <SpeakerHigh className="size-icon-sm" aria-hidden />}
          </span>
          {muted ? 'Watch with sound' : 'Mute'}
        </button>
      </figcaption>
    </figure>
  );
}

/** A photo that drifts against the scroll (parallax) and zooms on hover, with its caption rising in. */
function Photo({ src, alt, className, sizes }: { src: string; alt: string; className?: string; sizes: string }) {
  return (
    <figure className={`group relative overflow-hidden rounded-xl ${className ?? ''}`}>
      <div data-parallax="0.06" className="absolute -inset-y-[12%] inset-x-0 [--ps:1.04]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.06]" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(to_top,rgb(0_0_0/0.55),transparent)] p-4 pt-10 text-sm text-on-image-ink opacity-0 transition-all duration-500 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100">
        {alt}
      </figcaption>
    </figure>
  );
}

export function Campus() {
  const [a, b, c, e, f] = campus.photos;
  return (
    <Band id="campus" label="campus-title">
      <SectionHeading id="campus-title" title="Life beyond" accent="the classroom.">
        {campus.lede}
      </SectionHeading>

      <Film />

      <div className="reveal mt-3 grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-[13rem_13rem]">
        <Photo {...a} sizes="(min-width: 1056px) 340px, 50vw" className="aspect-[4/3] md:col-span-3 md:row-span-2 md:aspect-auto" />
        <Photo {...b} sizes="(min-width: 1056px) 340px, 50vw" className="aspect-[4/3] md:col-span-3 md:aspect-auto" />
        <Photo {...c} sizes="(min-width: 1056px) 170px, 50vw" className="aspect-[4/3] md:col-span-1 md:aspect-auto" />
        <Photo {...e} sizes="(min-width: 1056px) 170px, 50vw" className="aspect-[4/3] md:col-span-2 md:aspect-auto" />
        <Photo {...f} sizes="(min-width: 1056px) 340px, 100vw" className="col-span-2 aspect-video md:hidden" />
      </div>

      <h3 className="reveal mt-20 text-[1.375rem] font-semibold tracking-tight">Student clubs, by SSB students.</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {campus.clubs.map((club, i) => (
          <li
            key={club.name}
            data-spotlight
            className="reveal card-surface group overflow-hidden rounded-2xl bg-surface p-6 transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1"
            style={d(i * 0.1)}
          >
            <p className="text-sm font-medium text-content-brand">{club.tag}</p>
            <h4 className="mt-1 text-[1.375rem] font-semibold tracking-tight">{club.name}</h4>
            <p className="mt-3 text-sm leading-6 text-content-secondary">{club.body}</p>
          </li>
        ))}
      </ul>

      <div className="reveal mt-8 flex flex-wrap gap-3">
        {campus.socials.map((s) => (
          <a
            key={s.handle}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full bg-surface-subtle py-2 ps-3 pe-4 text-sm font-medium text-content no-underline transition-colors hover:bg-surface-brand-subtle"
          >
            <InstagramLogo className="size-icon-md" aria-hidden />
            {s.handle}
            <span className="text-content-secondary">· {s.note}</span>
            <ArrowUpRight className="size-icon-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        ))}
      </div>
    </Band>
  );
}

export function Faqs() {
  return (
    <Band id="faqs" label="faqs-title">
      <SectionHeading id="faqs-title" title="Questions," accent="answered.">
        What applicants ask most about the degree, eligibility, the programme and the internship.
      </SectionHeading>
      <Accordion type="single" className="reveal mt-12 [&_[data-slot=accordion-item]]:border-x-0 [&_[data-slot=accordion-item]]:rounded-none">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger className="py-5 text-[1.0625rem] font-semibold">
              <span className="flex items-baseline gap-4 text-start">
                <span className="font-mono text-xs text-content-secondary">{String(i + 1).padStart(2, '0')}</span>
                {f.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="ps-8 text-[0.9375rem] leading-7 text-content-secondary">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Band>
  );
}
