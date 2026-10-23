import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@kishanscaler/ssx-ui';
import { SplitHeadline } from '../motion/SplitHeadline';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { PixelSeam } from './Top';
import { faqs, intakes, pillars, steps, terms, ventures } from './data';

const d = (s: number) => ({ ['--d' as string]: s }) as React.CSSProperties;

/** v4's section opener: a two-tone headline and an optional lede. */
function Opener({ id, kicker, title, accent, children }: {
  id: string;
  kicker: string;
  title: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="reveal max-w-[40rem]">
      <h2 id={id} className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
        {title}
        {accent && (
          <>
            <br />
            <span className="text-action-primary">{accent}</span>
          </>
        )}
      </h2>
      {children && <div className="mt-5 text-[1.0625rem] leading-7 text-content-secondary">{children}</div>}
    </div>
  );
}

const band = 'py-16 md:py-24';
const kpiLabels = ['courses', 'live projects', 'masterclasses'];

/* ---- Programme ----------------------------------------------------------- */

export function Programme() {
  return (
    <section id="programme" aria-labelledby="programme-title" className={band}>
      <Opener id="programme-title" kicker="Programme" title="18 months. Five terms." accent="Every term ends in a build.">
        January 2027 to March 2028. Classes with industry leaders, live projects with real founders.
      </Opener>

      <Tabs defaultValue="01" className="reveal mt-10 md:mt-12">
        <TabsList aria-label="Terms">
          {terms.map((t) => (
            <TabsTrigger key={t.n} value={t.n}>
              <span className="max-sm:hidden">Term&nbsp;</span>
              {t.n}
            </TabsTrigger>
          ))}
        </TabsList>
        {terms.map((t) => (
          <TabsContent key={t.n} value={t.n} className="anim-fade mt-6">
            <article className="overflow-hidden rounded-[22px] bg-surface p-2 card-surface">
              <div className="relative">
                <ImagePlaceholder label={`Term ${t.n} in class`} className="h-[14rem] rounded-[16px] md:h-[16rem]" />
                <span className="absolute top-3 left-3 rounded-md bg-surface px-2.5 py-1 text-sm">{t.dates}</span>
              </div>
              <div className="flex flex-col p-5 md:p-6">
                <p className="font-mono text-xs tracking-[0.2em] text-content-brand">TERM {t.n}</p>
                <h3 className="mt-2 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">{t.title}</h3>
                {t.body && <p className="mt-3 text-content-secondary">{t.body}</p>}
                <div className="mt-5 border-s-thick border-action-primary ps-4">
                  <p className="font-mono text-xs tracking-[0.15em] text-content-secondary">FLAGSHIP PROJECT</p>
                  <p className="mt-1 font-medium">{t.flagship}</p>
                </div>
                <dl className="mt-6 flex gap-8">
                  {t.kpis.map((k, i) => (
                    <div key={kpiLabels[i]}>
                      <dt className="sr-only">{kpiLabels[i]}</dt>
                      <dd>
                        <span className="block text-[2rem] leading-none font-semibold text-content-brand">{k}</span>
                        <span className="text-sm text-content-secondary">{kpiLabels[i]}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

/* ---- Ventures (the dark band) -------------------------------------------- */

export function Ventures() {
  return (
    <section id="ventures" aria-labelledby="ventures-title">
      <PixelSeam />
      <div data-brand="ssb" data-theme="dark" className="relative isolate text-content">
        <div aria-hidden className="bleed-abs z-below bg-[var(--color-ssb-dark-1)]" />
        <div className="py-20 md:py-32">
          <SplitHeadline id="ventures-title" />
          <p className="reveal mx-auto mt-8 max-w-[20rem] text-center text-content-secondary">
            Every term ends in a build. Some became companies.
          </p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16">
            {ventures.map((v, i) => (
              <li
                key={v.name}
                className="reveal flex flex-col justify-between gap-10 rounded-[22px] border border-[var(--color-ssb-dark-6)] bg-[var(--color-ssb-dark-2)] p-6"
                style={d((i % 2) * 0.1)}
              >
                <p className="text-[1.5rem] font-semibold tracking-[-0.02em]">{v.name}</p>
                <div>
                  <p className="text-[var(--color-ssb-dark-11)]">{v.metric}</p>
                  <p className="mt-1 text-sm text-content-secondary">{v.founder}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PixelSeam flip />
    </section>
  );
}

/* ---- How you learn ------------------------------------------------------- */

export function Learning() {
  return (
    <section id="learning" aria-labelledby="learning-title" className={band}>
      <Opener id="learning-title" kicker="How you learn" title="Five ways in." accent="None of them a lecture hall." />
      <ol className="mt-10 md:mt-12">
        {pillars.map((p) => (
          <li key={p.n} className="reveal grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-border-decorative py-6 md:py-8">
            <span className="pt-1.5 font-mono text-sm text-content-brand">{p.n}</span>
            <div>
              <h3 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">{p.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.stats.map((s) => (
                  <li key={s}>
                    <Badge tone="brand">{s}</Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-content-secondary">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---- Admissions & fees --------------------------------------------------- */

export function Admissions() {
  return (
    <section id="admissions" aria-labelledby="admissions-title" className={band}>
      <Opener id="admissions-title" kicker="Admissions & fees" title="Five steps." accent="No mandatory entrance exam.">
        Open to anyone with a bachelor’s degree. A 90+ percentile in CAT, XAT, NMAT or SNAP, or GMAT 640+, puts you on the
        fast track.
      </Opener>

      <ol className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`reveal flex items-baseline gap-4 rounded-[22px] bg-surface p-5 card-surface ${i === steps.length - 1 ? 'sm:col-span-2' : ''}`}
            style={d((i % 2) * 0.08)}
          >
            <span className="font-mono text-xs text-content-brand">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-medium">{s}</span>
          </li>
        ))}
      </ol>

      <div className="reveal card-surface mt-6 overflow-hidden rounded-[22px] bg-surface">
        <table className="w-full text-start">
          <caption className="sr-only">Intakes and course fees</caption>
          <thead className="bg-surface-sunken font-mono text-xs text-content-secondary">
            <tr>
              <th scope="col" className="px-5 py-3 text-start font-normal">INTAKE</th>
              <th scope="col" className="px-5 py-3 text-start font-normal">APPLY BY</th>
              <th scope="col" className="px-5 py-3 text-end font-normal">COURSE FEE</th>
            </tr>
          </thead>
          <tbody>
            {intakes.map((row) => (
              <tr key={row.intake} className={row.status === 'Closed' ? 'border-t border-border-decorative text-content-disabled' : 'border-t border-border-decorative'}>
                <th scope="row" className="px-5 py-4 text-start font-medium">
                  <span className="flex flex-wrap items-center gap-2">
                    {row.intake}
                    {row.status === 'Open' && <Badge tone="success" size="sm">Open</Badge>}
                    {row.status === 'Closed' && <Badge size="sm">Closed</Badge>}
                  </span>
                </th>
                <td className="px-5 py-4">{row.applyBy}</td>
                <td className="px-5 py-4 text-end tabular-nums">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border-decorative px-5 py-4 text-sm text-content-secondary">
          Application fee ₹1,000 per intake, non-refundable. Merit scholarships of up to 100%, decided after interview by
          the Scaler Impact Foundation. Financing through our banking partners.
        </p>
      </div>
    </section>
  );
}

/* ---- FAQ ----------------------------------------------------------------- */

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={band}>
      <Opener id="faq-title" kicker="FAQ" title="Questions," accent="answered." />
      <Accordion type="single" className="reveal mt-10 md:mt-12">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
