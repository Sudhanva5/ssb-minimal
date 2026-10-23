import Image from 'next/image';
import { Heading, Text } from '@kishanscaler/ssx-ui';
import mwebHero from '../public/images/campus-hero-mweb.png';
import webHero from '../public/images/campus-hero.jpg';
import { ColgateLogo, IimaLogo, McKinseyLogo, UberLogo } from './PartnerLogos';

/*
 * Tile proportions are the design's (Uber 125 × 68 at desktop size). Colour
 * comes from the text utility, so the marks follow the theme: Uber and
 * McKinsey take the text colour, IIMA's navy turns light in dark mode, and
 * Colgate keeps its red, which reads on both.
 */
const partners = [
  { name: 'Uber', Logo: UberLogo, ratio: 376 / 207, logo: 'w-[62%] text-content' },
  { name: 'Colgate', Logo: ColgateLogo, ratio: 376 / 207, logo: 'size-full text-[#f5010b]' },
  { name: 'McKinsey', Logo: McKinseyLogo, ratio: 453 / 207, logo: 'w-[80%] text-content' },
  { name: 'IIMA', Logo: IimaLogo, ratio: 261 / 207, logo: 'size-full text-[#00225b] dark:text-content' },
];

const d = (v: number) => ({ ['--d' as string]: v }) as React.CSSProperties;

const facts = [
  { value: '18 months', label: 'incl. internship' },
  { value: 'Bangalore', label: 'On-campus' },
  { value: '150', label: 'Seats' },
];

/*
 * The progressive blur: stacked backdrop-blur layers, each masked to a band
 * that reaches further right as the blur gets weaker, so the photograph goes
 * from heavily blurred at the left edge to sharp at about 60%.
 */
const blurSteps = [
  { blur: 1, solid: 50, clear: 60 },
  { blur: 2, solid: 46, clear: 57 },
  { blur: 4, solid: 41, clear: 54 },
  { blur: 8, solid: 35, clear: 50 },
  { blur: 16, solid: 27, clear: 45 },
  { blur: 32, solid: 16, clear: 38 },
  { blur: 64, solid: 0, clear: 30 },
];

/** Desktop only: the campus photograph filling the first screen, under the nav. */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[max(100svh,40rem)] overflow-hidden md:block">
      <Image src={webHero} alt="" fill priority sizes="100vw" className="anim-zoom object-cover object-[62%_center]" style={d(0)} />
      {blurSteps.map(({ blur, solid, clear }) => {
        const mask = `linear-gradient(to right, #000 ${solid}%, transparent ${clear}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      {/* The linear fade on top: white, solid to 10%, gone by ~60%. */}
      {/* A soft floor so the photo hands over to the page below. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-surface to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-surface)_0%,var(--color-surface)_10%,color-mix(in_oklab,var(--color-surface)_92%,transparent)_24%,color-mix(in_oklab,var(--color-surface)_74%,transparent)_36%,color-mix(in_oklab,var(--color-surface)_40%,transparent)_48%,transparent_60%)]" />
    </div>
  );
}

export function Hero() {
  return (
    <div className="pb-8 md:flex md:min-h-[calc(max(100svh,40rem)-4rem)] md:flex-col md:justify-center md:py-16">
      {/* Phones: the photograph sits above the copy, which starts over its faded bottom. */}
      <div className="relative -mx-gutter -mb-20 md:hidden">
        <Image src={mwebHero} alt="" priority sizes="100vw" className="h-auto w-full" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-surface from-10% to-transparent to-40%" />
      </div>

      <Heading
        as="h1"
        size="display"
        className="relative font-semibold md:text-[3.5rem] md:leading-[1.18] md:font-semibold md:tracking-[-0.03em]"
      >
        <span className="anim-line" style={d(0.1)}>
          <span>Full-Time PGP in</span>
        </span>
        <span className="anim-line text-action-primary" style={d(0.2)}>
          <span>Management &amp; Tech</span>
        </span>
      </Heading>
      <Text
        className="anim-fade relative mt-4 text-[1.125rem] leading-7 text-content-secondary md:mt-5 md:max-w-[30rem] md:text-[1.375rem] md:leading-8"
        style={d(0.35)}
      >
        Learn Business hands-on from 100+ Industry Leaders &amp; Faculty from
      </Text>

      <ul className="relative mt-6 flex gap-2 md:mt-8 md:gap-[0.875rem]">
        {partners.map(({ name, Logo, ratio, logo }, i) => (
          <li
            key={name}
            style={{ aspectRatio: ratio, ...d(0.45 + i * 0.07) }}
            className="anim-fade flex h-[2.75rem] items-center justify-center rounded-md bg-surface md:h-[4.25rem]"
          >
            <Logo className={`h-auto ${logo}`} />
          </li>
        ))}
      </ul>

      <dl className="anim-fade mt-6 flex md:mt-8" style={d(0.75)}>
        {facts.map((fact, i) => (
          <div
            key={fact.value}
            className={i === 0 ? 'pe-5 md:pe-8' : 'border-s border-border-strong/40 px-5 md:ps-8 md:pe-12'}
          >
            <dt className="type-body-sm font-semibold text-action-primary md:text-[1.25rem] md:leading-7 md:font-semibold">
              {fact.value}
            </dt>
            <dd className="type-caption text-content-secondary md:text-[1.125rem] md:leading-7">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
