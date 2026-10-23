'use client';

import * as React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Button, Heading, Link, Logo, Text } from '@kishanscaler/ssx-ui';
import './footer.css';

/* Ported from v3's footer (ssb-school-concept.vercel.app/v3): the green "building" variant. */

/* v3's columns, pointed at this page's sections. v3 has no FAQ or "Why SSB" anchor here:
   Why SSB goes to How you learn, FAQs to Admissions (eligibility and fees). */
const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Why SSB', href: '#learn' },
      { label: 'Outcomes', href: '#placement' },
      { label: 'Curriculum', href: '#learn' },
    ],
  },
  {
    title: 'Next steps',
    links: [
      { label: 'Program Details', href: '#learn' },
      { label: 'Admission Process', href: '#admissions' },
      { label: 'FAQs', href: '#admissions' },
    ],
  },
];

/**
 * The footer sits under the page (sticky to the bottom, one layer down), so the
 * page lifts off it as you reach the end. `--lift` (0 to 1, how much of the
 * footer is showing) is set on the page root and drives the wordmark and the
 * building rising into place. The page's content wrapper carries `.sf-lift`.
 */
export function Footer() {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const foot = ref.current;
    const root = foot?.parentElement;
    const lift = foot?.previousElementSibling as HTMLElement | null;
    if (!foot || !root || !lift) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const v = Math.max(0, Math.min(1, (window.innerHeight - lift.getBoundingClientRect().bottom) / Math.max(1, foot.offsetHeight)));
      root.style.setProperty('--lift', v.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      root.style.removeProperty('--lift');
    };
  }, []);

  return (
    <footer ref={ref} className="sf-foot" data-variant="building" data-green="true">
      <div className="sfb-card">
        <div className="sfb-top" data-brand="ssb" data-theme="dark">
          <div className="sfb-lead">
            <Logo size="lg" surface="dark" className="h-10" />
            <Text size="lg" className="sfb-tagline">
              For people who build.
            </Text>
            <div className="sfb-actions" data-surface-ink="on-image">
              <Button asChild variant="primary">
                <a href="#apply">
                  Apply now
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href="#apply">
                  Download Brochure
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
          <nav className="sfb-links" aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title} className="sfb-col">
                <Heading as="h3" size="eyebrow" className="text-content-brand">
                  {c.title}
                </Heading>
                <ul className="sf-links">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link variant="quiet" standalone href={l.href}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="sfb-stage">
          <p className="sfb-wordmark" aria-hidden="true">
            <span className="sfb-wm" data-layer="fill">
              <span>Scaler School</span> <span>of Business</span>
            </span>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="sfb-building"
            src="/v3/footer/building.webp"
            srcSet="/v3/footer/building-800.webp 800w, /v3/footer/building.webp 1536w"
            sizes="100vw"
            alt="The Scaler School of Business building in Bengaluru"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <Text size="sm" tone="secondary" className="sfb-legal">
        © 2026 InterviewBit Technologies Pvt. Ltd. The PGP awards a certificate, not a degree.
      </Text>
    </footer>
  );
}
