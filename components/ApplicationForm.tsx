'use client';

import * as React from 'react';
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Link,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  phoneCountries,
} from '@kishanscaler/ssx-ui';

/** Regional-indicator flag for an ISO code ("IN" → 🇮🇳). */
const flag = (iso: string) => String.fromCodePoint(...[...iso].map((c) => 0x1f1a5 + c.charCodeAt(0)));

/* The design's field: 52px tall, square-ish corners, 16px text. */
const FIELD = 'h-[3.25rem] rounded-sm border-border-inert px-4 text-md';

/**
 * The alumni lockups in the card header: Oxford's official horizontal mark, and
 * the HBS shield (reversed onto the band's green) with the school's name set
 * beside it. Static SVGs, since the band is the same dark green in both themes.
 */
function AlumniMarks() {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="text-[0.5625rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase opacity-muted md:type-caption md:font-semibold md:tracking-[0.12em]">
        Built by alumni from
      </span>
      <div className="flex items-center gap-2 md:gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/alumni/oxford-white.svg" alt="University of Oxford" className="h-5 w-auto md:h-[1.625rem]" />
        <span aria-hidden className="h-5 w-px bg-current opacity-muted md:h-6" />
        <span className="flex items-center gap-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/alumni/hbs-shield-reversed.svg" alt="" className="h-5 w-auto md:h-[1.625rem]" />
          <span className="text-[0.5rem] leading-[1.1] font-semibold md:text-[0.5625rem]">
            Harvard
            <br />
            Business
            <br />
            School
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * `compact` (/minimal-sudh): the band carries "PGP-MT Admission Open for 2027"
 * on one line and the programme's promise under it, without the alumni marks;
 * a bold title; and a one-line consent ("By creating an account, I agree to
 * Scaler's terms & policy").
 */
export function ApplicationForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [country, setCountry] = React.useState('IN');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // No backend yet: fake the round trip.
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="card-surface overflow-hidden rounded-lg bg-surface">
      {/* Fixed dark green in both themes: the band always carries white text. */}
      {compact ? (
        <div className="bg-[var(--color-ssb-light-11)] px-5 py-4 text-[var(--color-ssb-light-1)] sm:px-6">
          <p className="text-base leading-6 font-medium md:text-[1.125rem] md:leading-[1.5625rem]">PGP-MT Admission Open for 2027</p>
          <p className="mt-1 text-[0.8125rem] leading-5 opacity-[0.88]">
            Build startups &amp; AI products · No tech background required
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 bg-[var(--color-ssb-light-11)] px-5 py-5 text-[var(--color-ssb-light-1)] sm:px-6 md:h-[5.8125rem] md:py-0">
          <p className="text-[0.8125rem] leading-5 font-medium whitespace-nowrap md:text-[1.125rem] md:leading-[1.5625rem]">
            PGP-MT Admission
            <br />
            Open for 2027
          </p>
          <AlumniMarks />
        </div>
      )}

      {submitted ? (
        <div className="flex flex-col gap-3 px-6 py-8">
          <Heading as="h2" size="2" className="text-content-brand">
            You’re in!
          </Heading>
          <Text tone="secondary">We’ve sent a link to continue your application. Check your inbox and WhatsApp.</Text>
          <Button variant="secondary" className="mt-2 self-start" onClick={() => setSubmitted(false)}>
            Use different details
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col px-5 pt-6 pb-6 sm:px-6">
          <Heading
            as="h2"
            className={`text-[1.25rem] leading-7 text-content-brand md:text-[1.5rem] md:leading-8 ${compact ? 'font-bold' : 'font-medium'}`}
          >
            Create your account
          </Heading>
          <Text tone="secondary" className="mt-1">
            Enter your details to proceed
          </Text>

          <div className="mt-6 flex flex-col gap-4">
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Enter Email Address"
              aria-label="Email address"
              className={FIELD}
            />
            <div className="flex gap-2">
              <Select value={country} onValueChange={setCountry} name="country">
                <SelectTrigger aria-label="Country dial code" className={`${FIELD} w-[7.25rem] shrink-0 gap-2 px-3`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phoneCountries.map((c) => (
                    <SelectItem key={c.iso} value={c.iso} textValue={`${c.name} ${c.dial}`}>
                      <span aria-hidden>{flag(c.iso)}</span> {c.dial}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                name="phone"
                required
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Enter Mobile Number"
                aria-label="Mobile number"
                className={`${FIELD} min-w-0 flex-1`}
              />
            </div>
          </div>

          <Text className="mt-12 text-center text-[0.875rem] leading-5 text-content-secondary md:text-[0.9375rem]">
            Early Bird Intake Application Deadline -{' '}
            <span className="font-semibold text-action-primary">1st Nov 2026</span>
          </Text>

          <Button
            type="submit"
            size="lg"
            className="mt-3 h-[3.25rem] w-full rounded-sm text-[1.125rem] font-semibold"
            loading={loading}
            loadingText="Creating account"
          >
            Start your Application
          </Button>

          <label className="mt-6 flex cursor-pointer items-center gap-3">
            <Checkbox name="whatsapp" defaultChecked />
            <Text as="span" className="text-[0.875rem] leading-5">
              Receive updates and confirmation from us on WhatsApp
            </Text>
          </label>

          <div className="mt-6 border-t border-border-decorative pt-5">
            <Text tone="secondary" className="text-[0.8125rem] leading-[1.375rem]">
              {compact ? (
                <>
                  By creating an account, I agree to Scaler’s{' '}
                  <Link href="#terms" className="font-medium">
                    terms
                  </Link>{' '}
                  &amp;{' '}
                  <Link href="#privacy" className="font-medium">
                    policy
                  </Link>
                </>
              ) : (
                <>
                  By creating an account I have read and agree to Scaler’s{' '}
                  <Link href="#terms" className="font-medium">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="#privacy" className="font-medium">
                    Privacy Policy
                  </Link>
                </>
              )}
            </Text>
          </div>
        </form>
      )}
    </div>
  );
}
