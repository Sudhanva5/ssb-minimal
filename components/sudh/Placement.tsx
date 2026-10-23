'use client';

import * as React from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { Button, Card, CardBody, Divider, Heading, Text } from '@kishanscaler/ssx-ui';
import { EnterLine, useEnter } from './placementMotion';
import { PeersFlip, type PeerLogo } from './placementPeers';
import './placement.css';

/* Content from v3 (ssb-school-concept.vercel.app/v3), which flags the figures as still to be confirmed. */

const stats = [
  { value: '₹25.7L', label: 'Top-quartile', tail: 'average CTC' },
  { value: '3.2x', label: 'Average hike', tail: 'vs. pre-SSB' },
  { value: '₹19L', label: 'Cohort 1', tail: 'average CTC' },
  { value: '₹23–24L', label: 'Cohort 2', tail: 'average CTC' },
];

/** Companies that have visited SSB, at each logo's optical size. */
const recruiters: PeerLogo[] = [
  ['Amazon', 'amazon.svg', 98, 31],
  ['Goldman Sachs', 'goldman-sachs.svg', 89, 38],
  ['EY', 'ey.svg', 62, 62],
  ['Nomura', 'nomura.svg', 113, 20],
  ['Samsung', 'samsung.svg', 115, 18],
  ['Uber', 'uber.svg', 92, 32],
  ['Razorpay', 'razorpay.svg', 133, 30],
  ['Swiggy', 'swiggy.svg', 99, 30],
  ['Zomato', 'zomato.svg', 99, 22],
  ['Flipkart', 'flipkart.svg', 104, 37],
  ['Blinkit', 'blinkit.svg', 83, 23],
  ['PhonePe', 'phonepe.svg', 109, 30],
  ['Myntra', 'myntra.svg', 104, 32],
  ['Urban Company', 'urban-company.svg', 105, 30],
  ['Groww', 'groww.png', 120, 32],
  ['BharatPe', 'bharatpe.png', 127, 22],
  ['Lenskart', 'lenskart.svg', 144, 21],
  ['Zepto', 'zepto.svg', 103, 34],
  ['ArcelorMittal', 'arcelormittal.svg', 127, 53],
  ['Pine Labs', 'pine-labs.svg', 114, 30],
  ['BigBasket', 'bigbasket.svg', 105, 39],
  ['OYO', 'oyo.png', 69, 24],
  ['Zendesk', 'zendesk.svg', 75, 54],
  ['Vedantu', 'vedantu.png', 108, 40],
  ['Aviva', 'aviva.svg', 71, 49],
  ['CK Birla Group', 'ck-birla-group.svg', 168, 24],
  ['FNP', 'fnp.svg', 130, 42],
  ['ONDC', 'ondc.svg', 100, 40],
  ['HealthifyMe', 'healthify.png', 143, 33],
  ['Landmark Group', 'landmark-group.png', 175, 41],
  ['The Times Group', 'the-times-group.png', 67, 45],
].map(([name, file, w, h]) => ({ name: name as string, src: `/v3/logos/${file}`, w: w as number, h: h as number }));

/** The press clip under the photo; off until there is a real article to show. */
const SHOW_PRESS = false;

const cohort = {
  src: '/v3/media/cohort-group.webp',
  srcSet: '/v3/media/cohort-group-800.webp 800w, /v3/media/cohort-group.webp 1600w',
};

/** v3's "Placement Highlights.": the founding cohort's photo with the stats and a press clip, then the recruiter wall. */
export function Placement() {
  const ref = React.useRef<HTMLElement>(null);
  useEnter(ref);

  return (
    <section
      ref={ref}
      id="placement"
      aria-labelledby="placements-showcase-title"
      className="@container min-w-0 overflow-x-clip max-md:-mx-gutter"
    >
      {/* A short top: right under the hero, the heading just peeks into the first screen. */}
      <div className="pt-12 pb-12 @min-[42rem]:pb-24 max-md:px-gutter">
        <div data-enter="header" className="pl-header-grid mb-10 gap-3 @min-[42rem]:mb-12">
          <Heading as="p" size="eyebrow" className="text-content-brand" data-enter="eyebrow">
            Outcomes
          </Heading>
          <Heading as="h2" size="display" id="placements-showcase-title" className="max-w-(--size-measure-max)" data-enter="headline">
            <EnterLine>Placement Highlights.</EnterLine>
          </Heading>
          <Text tone="secondary" size="lg" className="max-w-(--size-measure-max)" data-enter="sub">
            Reported outcomes for SSB’s founding PGP cohort.
          </Text>
        </div>

        <div className="pl-v3">
          <article className="pl-merge" aria-label="Placement highlights">
            <div className="pl-merge-bg" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cohort.src}
                srcSet={cohort.srcSet}
                sizes="(min-width: 1056px) 42rem, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: '50% 38%' }}
              />
            </div>

            <dl className="pl-merge-stats">
              {stats.map((s) => (
                <div key={s.value} className="pl-merge-stat">
                  <dd>{s.value}</dd>
                  <dt>
                    {s.label} <span className="pl-merge-tail">{s.tail}</span>
                  </dt>
                </div>
              ))}
            </dl>
          </article>

          {/* The press clip: v3's white card, photo beside the story in the column. Hidden for now (SHOW_PRESS). */}
          {SHOW_PRESS && (
            <Card className="pl-clip">
              <div className="pl-clip-main">
                <div className="pl-clip-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/v3/media/campus-students.webp" alt="" loading="lazy" decoding="async" />
                </div>
                <CardBody className="pl-clip-body">
                  <div className="pl-clip-dateline">
                    <Heading as="p" size="eyebrow" className="text-content-secondary">
                      Education
                    </Heading>
                    <time dateTime="2026-10-12T00:00:00+05:30" className="font-sans text-sm text-content-secondary tabular-nums">
                      12 Oct 2026
                    </time>
                  </div>
                  <Heading as="h3" size="2" className="pl-clip-headline">
                    <a href="#press">The article’s headline goes here</a>
                  </Heading>
                  <Text tone="secondary" size="xs">
                    By Staff Reporter · 4 min read
                  </Text>
                  <Divider className="pl-clip-rule" />
                  <Text tone="secondary" size="sm">
                    The article’s opening lines go here, on the founding cohort’s placements.
                  </Text>
                  <Button asChild size="md" className="pl-clip-cta">
                    <a href="#apply">
                      Download placement report
                      <DownloadSimple weight="bold" />
                    </a>
                  </Button>
                </CardBody>
              </div>
            </Card>
          )}

          <div className="pl-v3-peers">
            <PeersFlip
              title="Companies that have visited Scaler School of Business"
              label="Companies that have visited SSB"
              logos={recruiters}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
