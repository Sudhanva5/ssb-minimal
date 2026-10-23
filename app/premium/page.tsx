import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Admissions, Faq } from '../../components/premium/Admissions';
import { ApplyDrawer } from '../../components/premium/ApplyDrawer';
import { Hero } from '../../components/premium/Hero';
import { Motion } from '../../components/premium/Motion';
import { Campus, Faculty, Press } from '../../components/premium/People';
import { Pillars, Programme, Ventures } from '../../components/premium/Programme';
import { Footer, MittalBand, Nav } from '../../components/premium/Shell';
import { Film, Manifesto, Outcomes, VelocityMarquee } from '../../components/premium/Story';

/* One typeface, roman and italic, every weight the page uses. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Scaler School of Business — Learn business by doing business',
  description:
    'An 18-month, full-time PGP in Management & Technology in Bengaluru, taught hands-on by 100+ industry leaders. Every term ends in a build.',
};

/**
 * One full-bleed stage. The application form is a pop-up card (ApplyDrawer),
 * opened by any Apply on the page or the card docked bottom-right.
 */
export default function PremiumPage() {
  return (
    <div className={`pm ${jakarta.variable} min-h-screen overflow-x-clip`}>
      <Motion />
      <Nav />
      <main className="stage min-w-0">
        <Hero />
        <VelocityMarquee words={['Learn business', 'by doing business', 'Build startups', 'Ship AI products']} />
        <Film />
        <Manifesto />
        <Outcomes />
        <Programme />
        <VelocityMarquee tone="lime" words={['Hummusapiens', 'Gredo', 'Dream Kit', 'GradeSense', 'ParkEase', 'Zari & Co.']} />
        <Ventures />
        <MittalBand />
        <Pillars />
        <Faculty />
        <Campus />
        <Press />
        <Admissions />
        <Faq />
        <Footer />
      </main>
      <ApplyDrawer />
    </div>
  );
}
