import { Button, Card, CardBody, Heading, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@kishanscaler/ssx-ui';
import { Words } from '../sections/shared';
import './admissions.css';

/* Ported from v3's admissions section (ssb-school-concept.vercel.app/v3#admissions). */

const steps = ['Apply', 'Pay application fee', 'Submit application', 'Interview', 'Receive verdict'];

const intakes = [
  { name: 'Early bird', deadline: 'Oct 4, 2026', fee: '₹15,50,000' },
  { name: 'Intake 2', deadline: 'Dec 27, 2026', fee: '₹16,00,000' },
  { name: 'Intake 3', deadline: 'Feb 27, 2027', fee: '₹16,00,000' },
  { name: 'Intake 4', deadline: 'May 2, 2027', fee: '₹16,00,000' },
  { name: 'Final deadline: last intake', deadline: 'Jul 31, 2027', fee: '₹16,00,000' },
];

const APPLICATION_FEE = '₹1,000';

const d = (s: number) => ({ ['--d' as string]: s });

/**
 * Eligibility and the two CTAs, then three cards: the illustrated admissions
 * process, the fee table (a list on narrow widths) and scholarships. Lays out
 * by its own width (container queries), since it sits beside the form.
 */
export function Admissions() {
  return (
    <section
      id="admissions"
      aria-labelledby="admissions-title"
      data-density="roomy"
      className="sx-adm @container min-w-0 py-12 @min-[42rem]:py-24"
    >
      <div className="grid gap-10 @min-[66rem]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] @min-[66rem]:gap-16">
        <div className="flex flex-col gap-3 self-start @min-[66rem]:sticky @min-[66rem]:top-24">
          <Heading as="p" size="eyebrow" className="reveal text-content-brand">
            Admissions
          </Heading>
          <Heading as="h2" size="display" id="admissions-title" className="reveal-words">
            <Words text="Admission Process, Fees and Eligibility" />
          </Heading>
          <Text size="lg" tone="secondary" className="reveal" style={d(0.15)}>
            Who can apply, how selection works, what the programme costs, and the scholarships on offer.
          </Text>
          <Card className="reveal mt-5" style={d(0.25)}>
            <CardBody className="gap-3 @min-[42rem]:p-6">
              <Heading as="h3" size="3">
                Eligibility
              </Heading>
              <Text tone="secondary">
                Class 12th, then graduation: a bachelor&apos;s degree from an accredited institution. Ideal for
                professionals with work experience, and for freshers who bring a strong track record of initiative:
                internships, projects, clubs or similar engagements.
              </Text>
            </CardBody>
          </Card>
          <div className="reveal mt-2 flex flex-col gap-3 @min-[42rem]:flex-row" style={d(0.35)}>
            <Button asChild variant="primary">
              <a href="#apply">Start application</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#apply">Talk to advisor</a>
            </Button>
          </div>
        </div>

        <ol className="flex min-w-0 list-none flex-col gap-4 p-0">
          <li className="adm-card adm-frame reveal">
            <div className="adm-ground adm-process">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v3/admissions/scholarships.webp" alt="" width={1671} height={941} loading="lazy" decoding="async" />
              <div className="adm-process__panel">
                <Heading as="h3" size="3">
                  Admissions process
                </Heading>
                <ol className="adm-process__steps">
                  {steps.map((s, i) => (
                    <li key={s}>
                      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="adm-process__fast">
                  <span className="adm-glass__label">Fast-track</span>
                  <Text size="sm" tone="primary">
                    If 90 percentile &amp; above in CAT/XAT/NMAT/SNAP, or a 640+ score in GMAT.
                  </Text>
                </div>
              </div>
            </div>
          </li>

          <Card as="li" className="adm-card reveal" style={d(0.1)}>
            <CardBody className="gap-4">
              <div className="flex items-baseline gap-3">
                <Heading as="h3" size="3">
                  Programme fee
                </Heading>
              </div>
              <div>
                <div className="adm-table">
                  <Table striped framed>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Intake</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Application fee</TableHead>
                        <TableHead>Course fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {intakes.map((r) => (
                        <TableRow key={r.name}>
                          <TableCell>{r.name}</TableCell>
                          <TableCell>{r.deadline}</TableCell>
                          <TableCell>{APPLICATION_FEE}</TableCell>
                          <TableCell>{r.fee}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <ul className="adm-intakes">
                  {intakes.map((r) => (
                    <li key={r.name}>
                      <div>
                        <Text as="span" className="block">
                          {r.name}
                        </Text>
                        <Text as="span" size="sm" tone="secondary" className="block">
                          Deadline {r.deadline}
                        </Text>
                      </div>
                      <Text as="span">{r.fee}</Text>
                    </li>
                  ))}
                </ul>
                <Text size="sm" tone="secondary" className="adm-intakes-note">
                  Application fee: {APPLICATION_FEE} for every intake.
                </Text>
              </div>
            </CardBody>
          </Card>

          <li className="adm-card adm-frame reveal" style={d(0.2)}>
            <div className="adm-ground adm-scholar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v3/admissions/scholarships.webp" alt="" width={1671} height={941} loading="lazy" decoding="async" />
              <div className="adm-scholar__bar adm-glass">
                <p className="adm-scholar__figure">
                  <span>Up to</span>
                  100%
                </p>
                <div className="adm-scholar__copy">
                  <Heading as="h3" size="3">
                    Scholarships
                  </Heading>
                  <Text size="sm" tone="primary">
                    Up to 100% merit-based scholarships for high-achieving profiles, evaluated after your interview.
                  </Text>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
