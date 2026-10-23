'use client';

import * as React from 'react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, cn } from '@kishanscaler/ssx-ui';
import { Lightning } from '@phosphor-icons/react';
import { CountUp } from '../motion/CountUp';
import { admissions, faqs } from './data';
import { Label, Pill, Rise } from './ui';

const d = (v: number) => ({ ['--d' as string]: v }) as React.CSSProperties;

function useCountdown(deadline: string) {
  const end = React.useMemo(() => new Date(`${deadline} 23:59:59 GMT+0530`).getTime(), [deadline]);
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, end - now);
  return [
    [Math.floor(ms / 86_400_000), 'days'],
    [Math.floor(ms / 3_600_000) % 24, 'hours'],
    [Math.floor(ms / 60_000) % 60, 'min'],
    [Math.floor(ms / 1000) % 60, 'sec'],
  ] as const;
}

export function Admissions() {
  const open = Math.max(0, admissions.intakes.findIndex((r) => r.open));
  const [sel, setSel] = React.useState(open);
  const r = admissions.intakes[sel];
  const left = useCountdown(r.by);

  return (
    <section id="admissions" aria-labelledby="admissions-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="pad">
        <Label className="reveal">Admissions</Label>
        <h2 id="admissions-title" className="h2 reveal-words mt-6 max-w-[16ch] max-w-[44rem]">
          <Rise text="Five steps" />
          <Rise text="to your seat." start={2} className="it text-[var(--pm-green)]" />
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            <p className="reveal text-[1.0625rem] leading-[1.6] text-[var(--pm-ink-2)]">{admissions.eligibility}</p>
            <ol className="mt-10">
              {admissions.steps.map((s, i) => (
                <li key={s} className="reveal group flex items-baseline gap-6 border-t border-[var(--pm-line)] py-5" style={d(i * 0.08)}>
                  <span className="text-[2rem] leading-none font-medium tracking-[-0.05em] text-[var(--pm-line)] transition-colors duration-500 group-hover:text-[var(--pm-green)]">
                    0{i + 1}
                  </span>
                  <span className="text-[1.125rem] font-medium tracking-tight">{s}</span>
                </li>
              ))}
            </ol>
            <p className="reveal mt-2 flex gap-3 rounded-xl bg-[var(--pm-mint)] p-4 text-[0.9375rem]">
              <Lightning weight="fill" className="mt-0.5 size-icon-sm shrink-0 text-[var(--pm-green)]" aria-hidden />
              <span>
                <strong className="font-semibold">Fast track.</strong> {admissions.fastTrack}
              </span>
            </p>
          </div>

          <div className="reveal md:sticky md:top-24 md:self-start">
            <div className="overflow-hidden rounded-2xl bg-[#fff] shadow-[inset_0_0_0_1px_var(--pm-line)]">
              <div className="p-6 md:p-8">
                <p className="kicker text-[var(--pm-ink-2)]">{r.closed ? 'This intake has closed' : `${r.name} closes in`}</p>
                <div className="mt-4 flex gap-2" role="timer" aria-label={`Time left to apply for ${r.name}`}>
                  {(left ?? [
                    [0, 'days'],
                    [0, 'hours'],
                    [0, 'min'],
                    [0, 'sec'],
                  ]).map(([v, l]) => (
                    <span key={l} className={cn('flex flex-1 flex-col items-center rounded-xl py-3', r.closed ? 'bg-[var(--pm-paper)] text-[var(--pm-ink-3)]' : 'bg-[var(--pm-ink)] text-[var(--pm-ivory)]')}>
                      <span className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">{String(v).padStart(2, '0')}</span>
                      <span className="mt-1 text-[0.6875rem] opacity-[0.6]">{l}</span>
                    </span>
                  ))}
                </div>
              </div>
              <table className="w-full text-start text-[0.9375rem]">
                <caption className="sr-only">Intakes, deadlines and course fees. Choose a row to see its countdown.</caption>
                <thead className="kicker text-[var(--pm-ink-3)]">
                  <tr className="border-t border-[var(--pm-line)]">
                    <th scope="col" className="px-6 py-3 text-start font-normal md:px-8">Intake</th>
                    <th scope="col" className="px-2 py-3 text-start font-normal">Apply by</th>
                    <th scope="col" className="px-6 py-3 text-end font-normal md:px-8">Course fee</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.intakes.map((it, i) => (
                    <tr
                      key={it.name}
                      onClick={() => setSel(i)}
                      className={cn(
                        'cursor-pointer border-t border-[var(--pm-line)] transition-colors duration-300',
                        sel === i ? 'bg-[var(--pm-mint)]' : 'hover:bg-[var(--pm-ivory)]',
                        it.closed && 'text-[var(--pm-ink-3)]',
                      )}
                    >
                      <th scope="row" className="px-6 py-4 text-start font-medium md:px-8">
                        <button type="button" onClick={() => setSel(i)} aria-pressed={sel === i} className="flex items-center gap-2 text-start">
                          <span aria-hidden className={cn('size-2 rounded-full', sel === i ? 'bg-[var(--pm-green)]' : 'bg-[var(--pm-line)]')} />
                          {it.name}
                          {it.open && <span className="rounded-full bg-[var(--pm-green)] px-2 py-0.5 text-[0.6875rem] text-[#fff]">Open</span>}
                          {it.closed && <span className="text-[0.75rem]">Closed</span>}
                        </button>
                      </th>
                      <td className="px-2 py-4">{it.by}</td>
                      <td className={cn('px-6 py-4 text-end tabular-nums md:px-8', it.closed && 'line-through')}>{it.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-[var(--pm-line)] px-6 py-4 text-[0.8125rem] leading-[1.5] text-[var(--pm-ink-2)] md:px-8">{admissions.feeNote}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Pill href="#apply" apply>
                Start your application
              </Pill>
              <Pill href="#apply" tone="light" apply>
                Talk to an advisor
              </Pill>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        <div className="reveal mt-24 grid gap-10 overflow-hidden rounded-[1.5rem] bg-[var(--pm-mint)] p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-12">
          <div>
            <p className="kicker text-[var(--pm-green)]">Scholarships up to</p>
            <p className="mt-3 text-[clamp(5rem,12vw,10rem)] leading-[0.85] font-medium tracking-[-0.07em] text-[var(--pm-ink)]">
              <CountUp value="100%" duration={2000} />
            </p>
            <p className="mt-6 max-w-[24rem] text-[1rem] leading-[1.55] text-[var(--pm-ink-2)]">
              Merit-based and decided after your interview. Every scholarship is awarded by the Scaler Impact Foundation.
              Applying early improves your chances.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <ul className="grid grid-cols-2 gap-2">
              {admissions.scholarships.map((s) => (
                <li key={s} className="rounded-xl bg-[rgb(255_255_255/0.7)] p-4 text-[0.9375rem] font-medium leading-snug transition-colors duration-300 hover:bg-[#fff]">
                  {s}
                </li>
              ))}
            </ul>
            <div>
              <p className="text-[0.8125rem] text-[var(--pm-ink-2)]">The Scaler Impact Foundation is backed by</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-4">
                {admissions.backers.map((b) => (
                  <li key={b.name} className="flex items-center gap-3">
                    <Image src={b.photo} alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-[#fff]" />
                    <span className="leading-tight">
                      <span className="block text-[0.875rem] font-medium">{b.name}</span>
                      <span className="block text-[0.75rem] text-[var(--pm-ink-2)]">{b.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="pad grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <Label className="reveal">FAQ</Label>
          <h2 id="faq-title" className="h2 reveal-words mt-6 max-w-[16ch]">
            <Rise text="Questions," />
            <Rise text="answered." start={1} className="it text-[var(--pm-green)]" />
          </h2>
          <p className="reveal mt-6 max-w-[22rem] text-[1rem] leading-[1.55] text-[var(--pm-ink-2)]">
            Anything else? An admissions advisor will call you back.
          </p>
          <div className="reveal mt-8">
            <Pill href="#apply" tone="light" apply>
              Talk to an advisor
            </Pill>
          </div>
        </div>
        <Accordion type="single" className="reveal [&_[data-slot=accordion-item]]:rounded-none [&_[data-slot=accordion-item]]:border-x-0 [&_[data-slot=accordion-item]]:border-[var(--pm-line)] [&_[data-slot=accordion-item]]:bg-transparent">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="py-6 text-[clamp(1.0625rem,1.6vw,1.25rem)] font-medium tracking-[-0.02em]">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[1rem] leading-[1.65] text-[var(--pm-ink-2)]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
