'use client';

import * as React from 'react';
import { Heading, Text } from '@kishanscaler/ssx-ui';
import { CardRail, PersonCard } from './CardRail';
import { EnterLine, useEnter } from './placementMotion';
import { PeersFlip, type PeerLogo } from './placementPeers';
import './alumni.css';

/* Content from v3 (ssb-school-concept.vercel.app/v3). */

type Alum = {
  name: string;
  role: string;
  company: string;
  /** The company's square mark; `fill` when the mark is a full-bleed app icon. */
  mark: string;
  fill?: boolean;
  pre: string;
  /** A portrait; without one the card shows the initials on the plate. */
  photo?: string;
};

/** v3's two alumni rows: the top row, then the bottom. */
const rows: Alum[][] = [
  [
      { name: 'Uttara Nambiar', role: 'Asst. Program Manager', company: 'Blinkit', mark: '/v3/logos/marks/blinkit.png', fill: true, pre: 'Software Developer', photo: '/v3/alumni/uttara-nambiar.webp' },
      { name: 'Aashish US', role: 'Brand Marketing', company: 'The Whole Truth', mark: '/v3/logos/marks/wholetruth.svg', pre: 'Founder', photo: '/v3/alumni/aashish-us.webp' },
      { name: 'Bharath Ramesh', role: 'Growth Manager', company: 'Ninjacart', mark: '/v3/logos/marks/ninjacart.png', pre: 'Executive', photo: '/v3/alumni/bharath-ramesh.webp' },
      { name: 'Akarsh Sharma', role: 'Founder’s Office', company: 'Pync', mark: '/v3/internship/marks/pync.png', pre: 'Data Analyst, Uber' },
      { name: 'Ayush Poojary', role: 'Investment Banking', company: 'LoEstro', mark: '/v3/internship/marks/loestro.png', pre: 'Trainee, Mutha & Co.' },
      { name: 'Impana Reddy', role: 'Product Management', company: 'Onsurity', mark: '/v3/internship/marks/onsurity.png', fill: true, pre: 'Founder, Papermint' },
  ],
  [
      { name: 'Kritika Bhatia', role: 'Growth Marketing', company: 'Emergent', mark: '/v3/logos/marks/emergent.png', fill: true, pre: 'Financial Analyst', photo: '/v3/alumni/kritika-bhatia.webp' },
      { name: 'Moh Agarwal', role: 'Growth Marketing', company: 'BharatPe', mark: '/v3/logos/marks/bharatpe.svg', pre: 'Fresher', photo: '/v3/alumni/moh-agarwal.webp' },
      { name: 'Sanyam Maheshwari', role: 'Product Strategy', company: 'ToolJet', mark: '/v3/internship/marks/tooljet.png', fill: true, pre: 'Analyst, Deloitte' },
      { name: 'Sarosha Pais', role: 'Partnerships', company: 'Razorpay', mark: '/v3/logos/marks/razorpay.png', pre: 'HR, Aquarelle' },
      { name: 'Rohan Kumar', role: 'Operations', company: 'LimeChat', mark: '/v3/internship/marks/limechat.png', pre: 'Finance Associate, KPMG' },
  ],
];

/** The rail fills column by column, so the rows interleave: top, bottom, top, bottom… */
const alumni = rows[0].flatMap((a, i) => (rows[1][i] ? [a, rows[1][i]] : [a]));

/** Where the peers came from, at each logo's optical size. */
const peers: PeerLogo[] = [
  ['Amazon', 'amazon.svg', 100, 32],
  ['McKinsey & Company', 'mckinsey.svg', 196, 28],
  ['Uber', 'uber.svg', 90, 31],
  ['Deloitte', 'deloitte.svg', 105, 20],
  ['KPMG', 'kpmg.svg', 88, 35],
  ['PwC', 'pwc.svg', 92, 45],
  ['Accenture', 'accenture.svg', 125, 35],
  ['EY', 'ey.svg', 62, 62],
  ['Jio', 'jio.svg', 41, 41],
  ['Apollo Hospitals', 'apollo.svg', 63, 69],
  ['Deutsche Bank', 'deutschebank.svg', 168, 36],
  ['Axis Bank', 'axisbank.svg', 146, 37],
  ['IIFL Finance', 'iifl.svg', 134, 25],
  ['S&P Global', 'spglobal.svg', 111, 24],
  ['DMart', 'dmart.svg', 117, 27],
  ['Tata Consultancy Services', 'tcs.svg', 171, 53],
  ['Lufthansa', 'lufthansa.svg', 155, 27],
  ['ZS Associates', 'zs.svg', 83, 65],
  ['Freshworks', 'freshworks.svg', 150, 30],
  ['BigBasket', 'bigbasket.svg', 105, 39],
  ['Zendesk', 'zendesk.svg', 75, 54],
  ['Aviva', 'aviva.svg', 71, 49],
  ['Swiggy', 'swiggy.svg', 99, 30],
  ['Flipkart', 'flipkart.svg', 104, 37],
  ['PhonePe', 'phonepe.svg', 109, 30],
  ['Samsung', 'samsung.svg', 115, 18],
  ['Goldman Sachs', 'goldman-sachs.svg', 89, 38],
  ['Zomato', 'zomato.svg', 99, 22],
  ['Razorpay', 'razorpay.svg', 133, 30],
  ['Nomura', 'nomura.svg', 113, 20],
].map(([name, file, w, h]) => ({ name: name as string, src: `/v3/logos/${file}`, w: w as number, h: h as number }));

/**
 * v3's alumni section: two rows of before-and-after cards in the people rail
 * (they move only when you move them), then the logo wall of where the cohort
 * came from.
 */
export function Alumni() {
  const ref = React.useRef<HTMLElement>(null);
  useEnter(ref);

  return (
    <section ref={ref} id="alumni" aria-labelledby="alumni-title" className="@container min-w-0 overflow-x-clip max-md:-mx-gutter">
      <div className="py-12 @min-[42rem]:py-24">
        <div className="max-md:px-gutter">
          <div
            data-enter="header"
            className="mb-10 flex flex-col gap-6 @min-[42rem]:mb-12 @min-[42rem]:flex-row @min-[42rem]:items-end @min-[42rem]:justify-between"
          >
            <div className="flex max-w-(--size-measure-max) flex-col gap-3">
              <Heading as="p" size="eyebrow" className="text-content-brand" data-enter="eyebrow">
                Alumni
              </Heading>
              <Heading as="h2" size="display" id="alumni-title" data-enter="headline">
                <EnterLine>Our earlier cohorts are already in roles like these.</EnterLine>
              </Heading>
              <Text tone="secondary" size="lg" data-enter="sub">
                Now in growth, strategy and brand roles at Blinkit, Emergent and more.
              </Text>
            </div>
          </div>
        </div>

        <CardRail label="Alumni">
          {alumni.map((a) => (
            <PersonCard
              key={a.name}
              photo={a.photo}
              name={a.name}
              title={a.role}
              by={a.name}
              detail={`Before SSB: ${a.pre}`}
              orgs={[{ name: a.company, icon: a.mark, fill: a.fill }]}
              size="sm"
              photoFit="full"
            />
          ))}
        </CardRail>

        <div className="mt-16 @min-[42rem]:mt-20 max-md:px-gutter">
          <PeersFlip title="Your peers come from companies like these" label="Companies our students come from" logos={peers} />
        </div>
      </div>
    </section>
  );
}
