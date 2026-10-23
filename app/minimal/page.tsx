import type { Metadata } from 'next';
import { Container, Logo } from '@kishanscaler/ssx-ui';
import { ApplicationForm } from '../../components/ApplicationForm';
import { Admissions, Faq, Learning, Programme, Ventures } from '../../components/minimal/Body';
import { SiteNav } from '../../components/SiteNav';
import { nav } from '../../components/minimal/data';
import { Hero, HeroBackdrop, OutcomeTiles } from '../../components/minimal/Top';
import { FilmFlight } from '../../components/motion/FilmFlight';

export const metadata: Metadata = {
  title: 'Scaler School of Business — PGP in Management & Technology',
  description: 'Learn business hands-on, from 100+ industry leaders & faculty. 18 months, 150 seats, residential in Bengaluru.',
};

export default function MinimalPage() {
  return (
    <>
      {/* The backdrop fills the first screen, under the nav. */}
      <div className="relative">
        <HeroBackdrop />
        <SiteNav home="/minimal" items={nav} />
      <main className="relative">
        {/*
          The classic layout: two columns on desktop, the application form stuck
          beside every section. Phones: hero, form, then the sections.
        */}
        <Container className="relative grid max-w-(--site-content-max) grid-cols-1 md:grid-cols-[minmax(0,1fr)_var(--size-panel-md)] md:gap-x-12 lg:grid-cols-[minmax(0,1fr)_28.625rem] lg:gap-x-16">
          <div className="md:col-start-1 md:row-start-1">
            <Hero />
            <OutcomeTiles />
          </div>
          <aside
            id="apply"
            aria-label="Application"
            className="anim-fade z-raised py-8 md:sticky md:top-20 md:col-start-2 md:row-span-2 md:row-start-1 md:self-start md:pt-12 md:pb-12"
            style={{ ['--d' as string]: 0.3 }}
          >
            <ApplicationForm />
          </aside>
          <div className="md:col-start-1 md:row-start-2">
            <FilmFlight />
            <Programme />
            <Ventures />
            <Learning />
            <Admissions />
            <Faq />
          </div>
        </Container>
      </main>
      </div>
      <footer className="border-t border-border-decorative">
        <div className="mx-auto flex max-w-(--site-content-max) flex-col gap-6 px-gutter py-10 pb-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <Logo size="md" />
            <p className="text-[1.25rem] font-semibold tracking-[-0.02em]">For people who build.</p>
          </div>
          <p className="max-w-[28rem] text-xs leading-5 text-content-secondary md:text-end">
            The PGP awards a certificate, not a degree. Placement figures are from cohorts 1 &amp; 2; sources and
            methodology to be confirmed before launch. © 2026 InterviewBit Technologies Pvt. Ltd.
          </p>
        </div>
      </footer>
    </>
  );
}
