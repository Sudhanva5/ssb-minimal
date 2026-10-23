import Image from 'next/image';
import { Button, Link, Logo } from '@kishanscaler/ssx-ui';
import { ArrowRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr';

const groups = [
  {
    title: 'Explore',
    links: [
      { href: '#placement', label: 'Outcomes' },
      { href: '#faculty', label: 'Faculty' },
      { href: '#curriculum', label: 'Curriculum' },
    ],
  },
  {
    title: 'Next steps',
    links: [
      { href: '#admission', label: 'Admission Process' },
      { href: '#campus', label: 'Campus' },
      { href: '#faqs', label: 'FAQs' },
    ],
  },
];

/**
 * White footer: the campus building in a rounded frame (parallax), a giant
 * "For people who build." that fills with ink as it scrolls into view, the
 * CTAs, two link groups and the fine print.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border-decorative bg-surface">
      <div className="mx-auto max-w-(--site-content-max) px-gutter pt-16 pb-24 md:pt-24">
        <div className="relative h-[clamp(14rem,32vw,24rem)] overflow-hidden rounded-2xl">
          <div data-parallax="0.08" className="absolute -inset-y-[15%] inset-x-0">
            <Image src="/v3/footer/building.webp" alt="The Scaler School of Business building in Bengaluru" fill sizes="100vw" className="object-cover" />
          </div>
        </div>

        <p data-fill className="fill-text mt-12 text-[clamp(3rem,10.5vw,9.5rem)] leading-[0.92] font-semibold tracking-[-0.055em]">
          For people who build.
        </p>

        <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-6">
            <Logo size="lg" />
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#apply">
                  Apply now
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="border-border-inert">
                <a href="#brochure">
                  <DownloadSimple />
                  Download Brochure
                </a>
              </Button>
            </div>
          </div>
          <nav aria-label="Footer" className="flex gap-16">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-sm font-medium text-content-secondary">{g.title}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} variant="quiet" className="text-content">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-border-decorative pt-6 text-xs text-content-secondary sm:flex-row">
          <p>Scaler School of Business · Bengaluru</p>
          <p>© 2026 InterviewBit Technologies Pvt. Ltd. The PGP awards a certificate, not a degree.</p>
        </div>
      </div>
    </footer>
  );
}
