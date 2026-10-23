/*
 * Faculty and mentors for /minimal-sudh, from the SSB concept site
 * (ssb-school-concept.vercel.app/v3). Photos live in /public/v3; the square
 * company icons are v4's, in /public/v4/media/brands.
 */

import type { Org } from './CardRail';

const B = '/v4/media/brands';

/** Square company icons, shared by faculty and mentors. */
const org = {
  epigamia: { name: 'Epigamia', icon: `${B}/epigamia/logo-light.png`, mono: 'e' },
  cashfree: { name: 'Cashfree', icon: `${B}/cashfree/symbol-light.svg`, tint: '#00AD5B' },
  mckinsey: { name: 'McKinsey & Company', icon: `${B}/mckinsey/icon-dark.jpg`, fill: true },
  blinkit: { name: 'Blinkit', icon: `${B}/blinkit/icon-dark.jpg`, fill: true },
  razorpay: { name: 'Razorpay', icon: `${B}/razorpay/mark.svg` },
  flipkart: { name: 'Flipkart', icon: `${B}/flipkart/icon-dark.jpg`, fill: true },
  mars: { name: 'Mars', icon: `${B}/mars/symbol-dark.svg` },
  stablemoney: { name: 'Stable Money', icon: `${B}/stablemoney/mark.svg`, fill: true },
  bcg: { name: 'BCG', icon: `${B}/bcg/icon-dark.jpg`, fill: true },
  toddle: { name: 'Toddle', icon: `${B}/toddle/icon-dark.jpg`, fill: true },
  paypal: { name: 'PayPal', icon: `${B}/paypal/symbol-dark.svg` },
  zomato: { name: 'Zomato', icon: `${B}/zomato/icon-dark.png`, fill: true },
  deutschebank: { name: 'Deutsche Bank', icon: `${B}/deutschebank/logo-dark.svg` },
  iimb: { name: 'IIM Bangalore', icon: `${B}/iimb/logo-dark.svg` },
  phonepe: { name: 'PhonePe', icon: `${B}/phonepe/icon-dark.jpg`, fill: true },
  paytm: { name: 'Paytm', icon: `${B}/paytm/logo-light.svg`, tint: '#00BAF2' },
  one97: { name: 'One97', icon: '/v3/logos/one97.png' },
  cred: { name: 'CRED', icon: `${B}/cred/icon-dark.jpg`, fill: true },
  freecharge: { name: 'Freecharge', icon: '/v3/logos/freecharge.png' },
  peakxv: { name: 'Peak XV', icon: `${B}/peakxv/icon-dark.jpg`, fill: true },
  google: { name: 'Google', icon: `${B}/google/icon-dark.jpg`, fill: true },
} satisfies Record<string, Org>;

export type FacultyMember = {
  photo: string;
  course: string;
  name: string;
  credentials: string;
  org: Org;
};

/** v3's two faculty rows: the top row, then the bottom. */
const top: FacultyMember[] = [
  { photo: '/v3/faculty/siddharth-menon.webp', course: 'Operation Management', name: 'Siddharth Menon', credentials: 'Ex-CMO, Epigamia/Colgate', org: org.epigamia },
  { photo: '/v3/faculty/akash-sinha.webp', course: 'Growth Marketing', name: 'Akash Sinha', credentials: 'CEO & Co-Founder, Cashfree', org: org.cashfree },
  { photo: '/v3/faculty/dhron-kanish.webp', course: 'Product Management', name: 'Dhron Kanish', credentials: 'Associate Partner, McKinsey', org: org.mckinsey },
  { photo: '/v3/faculty/jacob-singh.webp', course: 'Business Analytics', name: 'Jacob Singh', credentials: 'Ex-CTO, Blinkit', org: org.blinkit },
  { photo: '/v3/faculty/kanishk-mehta.webp', course: 'Operation Management', name: 'Kanishk Mehta', credentials: 'Sr. Product Director, Razorpay', org: org.razorpay },
  { photo: '/v3/faculty/gaurav-dadhich.webp', course: 'Growth Marketing', name: 'Gaurav Dadhich', credentials: 'Founder, Ex-Flipkart/Razorpay/Amazon', org: org.flipkart },
  { photo: '/v3/faculty/sandeep-das.webp', course: 'Product Management', name: 'Sandeep Das', credentials: 'Ex-Global Lead, Mars/PwC/Accenture', org: org.mars },
  { photo: '/v3/faculty/vatsal-sanghvi.webp', course: 'Business Analytics', name: 'Vatsal Sanghvi', credentials: 'Founder, Ex-Flipkart', org: org.flipkart },
];
const bottom: FacultyMember[] = [
  { photo: '/v3/faculty/saurabh-jain.webp', course: 'Brand Strategy', name: 'Saurabh Jain', credentials: 'Co-Founder, Stable Money', org: org.stablemoney },
  { photo: '/v3/faculty/puneet.webp', course: 'Corporate Finance', name: 'Puneet', credentials: 'Partner, BCG', org: org.bcg },
  { photo: '/v3/faculty/sidhant-goyal.webp', course: 'Sales Leadership', name: 'Sidhant Goyal', credentials: 'Toddle; Ex-Sequoia Capital', org: org.toddle },
  { photo: '/v3/faculty/malthi-ss.webp', course: 'Strategy & Consulting', name: 'Malthi SS', credentials: 'Ex-Product Director, PayPal', org: org.paypal },
  { photo: '/v3/faculty/saurabh-sengupta.webp', course: 'Brand Strategy', name: 'Saurabh Sengupta', credentials: 'Ex-SVP Sales, Zomato', org: org.zomato },
  { photo: '/v3/faculty/amit-puniyani.webp', course: 'Corporate Finance', name: 'Amit Puniyani', credentials: 'Ex-VP, Deutsche Bank/J.P. Morgan', org: org.deutschebank },
  { photo: '/v3/faculty/narahari-hansoge.webp', course: 'Sales Leadership', name: 'Narahari Hansoge', credentials: 'IIM Faculty, PhD IIM-B', org: org.iimb },
];

/** The rail fills column by column, so the rows interleave: top, bottom, top, bottom… */
export const faculty: FacultyMember[] = top.flatMap((t, i) => (bottom[i] ? [t, bottom[i]] : [t]));

export type Mentor = {
  photo: string;
  name: string;
  role: string;
  orgs: Org[];
};

export const mentors: Mentor[] = [
  { photo: '/v3/people/deepinder-goyal.webp', name: 'Deepinder Goyal', role: 'Co-founder, Zomato', orgs: [org.zomato, org.blinkit] },
  { photo: '/v3/people/binny-bansal.webp', name: 'Binny Bansal', role: 'Co-founder, Flipkart', orgs: [org.flipkart, org.phonepe] },
  { photo: '/v3/people/vijay-shekhar-sharma.webp', name: 'Vijay Shekhar Sharma', role: 'MD, Paytm', orgs: [org.paytm, org.one97] },
  { photo: '/v3/people/kunal-shah.webp', name: 'Kunal Shah', role: 'Founder, CRED', orgs: [org.cred, org.freecharge] },
  { photo: '/v3/people/rajan-anandan.webp', name: 'Rajan Anandan', role: 'MD, Peak XV', orgs: [org.peakxv, org.google] },
];
