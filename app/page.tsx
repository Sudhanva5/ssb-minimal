import { Container } from '@kishanscaler/ssx-ui';
import { ApplicationForm } from '../components/ApplicationForm';
import { Hero, HeroBackdrop } from '../components/Hero';
import { Admission } from '../components/sections/Admission';
import { Campus, Faqs } from '../components/sections/Campus';
import { Placement } from '../components/sections/Placement';
import { Curriculum } from '../components/sections/Curriculum';
import { Leaders } from '../components/Leaders';
import { SiteFooter } from '../components/SiteFooter';
import { SiteNav } from '../components/SiteNav';
import { navLinks } from '../components/classicNav';

export default function Home() {
  return (
    <>
      {/* The backdrop fills the first screen, under the floating nav. */}
      <div className="relative">
        <HeroBackdrop />
        <SiteNav home="/" items={navLinks} />
        <main className="relative">
          {/*
            Desktop: two columns. The form's column spans both rows, so the card
            stays stuck beside every section until the footer. Phones: one column
            in source order — hero, form, then the sections.
          */}
          <Container className="relative grid max-w-(--site-content-max) grid-cols-1 md:grid-cols-[minmax(0,1fr)_var(--size-panel-md)] md:gap-x-12 lg:grid-cols-[minmax(0,1fr)_28.625rem] lg:gap-x-16">
            <div className="md:col-start-1 md:row-start-1">
              <Hero />
            </div>
            <aside
              id="apply"
              aria-label="Application"
              style={{ ['--d' as string]: 0.3 }}
              className="anim-fade z-raised md:sticky md:top-20 md:col-start-2 md:row-span-2 md:row-start-1 md:self-start md:pt-12 md:pb-12"
            >
              <ApplicationForm />
            </aside>
            <div className="md:col-start-1 md:row-start-2">
              <Placement />
              <Leaders />
              <Curriculum />
              <Admission />
              <Campus />
              <Faqs />
            </div>
          </Container>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
