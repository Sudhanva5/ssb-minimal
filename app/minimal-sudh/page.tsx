import type { Metadata } from 'next';
import { Container } from '@kishanscaler/ssx-ui';
import { ApplicationForm } from '../../components/ApplicationForm';
import { SiteNav } from '../../components/SiteNav';
import { Admissions } from '../../components/sudh/Admissions';
import { Alumni } from '../../components/sudh/Alumni';
import { Campus } from '../../components/sudh/Campus';
import { Faculty, Mentors } from '../../components/sudh/Faculty';
import { Footer } from '../../components/sudh/Footer';
import { CountdownBar, Hero } from '../../components/sudh/Hero';
import { Pillars } from '../../components/sudh/Pillars';
import { Placement } from '../../components/sudh/Placement';
import { nav } from '../../components/sudh/nav';
import './page.css';

export const metadata: Metadata = {
  title: 'Scaler School of Business — PGP in Management & Technology',
  description: 'Learn business hands-on, from 100+ industry leaders & faculty. 18 months, 150 seats, residential in Bengaluru.',
};

/**
 * Minimal's sticky form beside the stakeholder-approved section order: the
 * hero photo card, placement (v3), faculty and mentors (v3), how you learn
 * (v4), admissions (v3), campus (v3), footer (v3). Every ported rule is
 * scoped under `.sx`.
 */
export default function MinimalSudhPage() {
  return (
    <div className="sx">
      {/* `.sf-lift`: the page lifts off the footer (footer.css). */}
      <div className="sf-lift relative">
        <CountdownBar />
        <SiteNav home="/minimal-sudh" items={nav} />
        <main className="relative">
          {/*
            Two columns on desktop, the application form stuck beside every
            section. Phones: hero, form, then the sections.
          */}
          <Container className="relative grid max-w-(--site-content-max) grid-cols-1 md:grid-cols-[minmax(0,1fr)_var(--size-panel-md)] md:gap-x-12 lg:grid-cols-[minmax(0,1fr)_28.625rem] lg:gap-x-16">
            <div className="md:col-start-1 md:row-start-1">
              <Hero />
            </div>
            <aside
              id="apply"
              aria-label="Application"
              className="anim-fade z-raised py-8 md:sticky md:top-20 md:col-start-2 md:row-span-2 md:row-start-1 md:self-start md:pt-12 md:pb-12"
              style={{ ['--d' as string]: 0.3 }}
            >
              <ApplicationForm compact />
            </aside>
            <div className="min-w-0 md:col-start-1 md:row-start-2">
              <Placement />
              <Alumni />
              <Faculty />
              <Mentors />
              <Pillars />
              <Admissions />
              <Campus />
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}
