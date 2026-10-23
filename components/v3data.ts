/*
 * Section content for the classic page, from the SSB concept site
 * (ssb-school-concept.vercel.app/v3). Images it references live in
 * /public/v3, copied from the same site.
 *
 * v3 notes its placement figures are still to be confirmed before launch.
 */

/* ---- Placement ------------------------------------------------------------- */

export const placementStats = [
  { value: '₹25.7L', label: 'Top-quartile average CTC' },
  { value: '3.2x', label: 'Average hike vs. pre-SSB' },
  { value: '₹19L', label: 'Cohort 1 average CTC' },
  { value: '₹23–24L', label: 'Cohort 2 average CTC' },
];

/** "Companies that have visited Scaler School of Business": logo file in /v3/logos. */
export const recruiters = [
  ['Amazon', 'amazon.svg'],
  ['Goldman Sachs', 'goldman-sachs.svg'],
  ['EY', 'ey.svg'],
  ['Nomura', 'nomura.svg'],
  ['Samsung', 'samsung.svg'],
  ['Uber', 'uber.svg'],
  ['Razorpay', 'razorpay.svg'],
  ['Swiggy', 'swiggy.svg'],
  ['Zomato', 'zomato.svg'],
  ['Flipkart', 'flipkart.svg'],
  ['Blinkit', 'blinkit.svg'],
  ['PhonePe', 'phonepe.svg'],
  ['Myntra', 'myntra.svg'],
  ['Urban Company', 'urban-company.svg'],
  ['Groww', 'groww.png'],
  ['BharatPe', 'bharatpe.png'],
  ['Lenskart', 'lenskart.svg'],
  ['Zepto', 'zepto.svg'],
  ['ArcelorMittal', 'arcelormittal.svg'],
  ['Pine Labs', 'pine-labs.svg'],
  ['BigBasket', 'bigbasket.svg'],
  ['OYO', 'oyo.png'],
  ['Zendesk', 'zendesk.svg'],
  ['Vedantu', 'vedantu.png'],
  ['Aviva', 'aviva.svg'],
  ['CK Birla Group', 'ck-birla-group.svg'],
  ['FNP', 'fnp.svg'],
  ['ONDC', 'ondc.svg'],
] as const;

/** "Our earlier cohorts are already in roles like these." */
export const alumni = [
  { name: 'Uttara Nambiar', now: 'Asst. Program Manager', at: 'Blinkit', before: 'Software Developer', photo: 'uttara-nambiar', mark: '/v3/logos/marks/blinkit.png' },
  { name: 'Kritika Bhatia', now: 'Growth Marketing', at: 'Emergent', before: 'Financial Analyst', photo: 'kritika-bhatia', mark: '/v3/logos/marks/emergent.png' },
  { name: 'Aashish US', now: 'Brand Marketing', at: 'The Whole Truth', before: 'Founder', photo: 'aashish-us', mark: '/v3/logos/marks/wholetruth.svg' },
  { name: 'Moh Agarwal', now: 'Growth Marketing', at: 'BharatPe', before: 'Fresher', photo: 'moh-agarwal', mark: '/v3/logos/marks/bharatpe.svg' },
  { name: 'Bharath Ramesh', now: 'Growth Manager', at: 'Ninjacart', before: 'Executive', photo: 'bharath-ramesh', mark: '/v3/logos/marks/ninjacart.png' },
  { name: 'Akarsh Sharma', now: 'Founder’s Office', at: 'Pync', before: 'Data Analyst, Uber', mark: '/v3/internship/marks/pync.png' },
  { name: 'Ayush Poojary', now: 'Investment Banking', at: 'LoEstro', before: 'Trainee, Mutha & Co.', mark: '/v3/internship/marks/loestro.png' },
  { name: 'Impana Reddy', now: 'Product Management', at: 'Onsurity', before: 'Founder, Papermint', mark: '/v3/internship/marks/onsurity.png' },
  { name: 'Sanyam Maheshwari', now: 'Product Strategy', at: 'ToolJet', before: 'Analyst, Deloitte', mark: '/v3/internship/marks/tooljet.png' },
  { name: 'Sarosha Pais', now: 'Partnerships', at: 'Razorpay', before: 'HR, Aquarelle', mark: '/v3/logos/marks/razorpay.png' },
  { name: 'Rohan Kumar', now: 'Operations', at: 'LimeChat', before: 'Finance Associate, KPMG', mark: '/v3/internship/marks/limechat.png' },
];

/* ---- Curriculum ------------------------------------------------------------ */


export const terms = [
  { n: '01', dates: 'Jan – Mar ’27', title: 'Foundations & First Build', body: 'Learn core business principles like economics, accounting and marketing, and use them straight away by selling on the street and launching your first D2C brand.', kpis: [6, 3, 3], img: '/v3/ssb-terms/term1-blocks.webp' },
  { n: '02', dates: 'Apr – Jun ’27', title: 'Strategy, Product & AI Fluency', body: 'Master strategy, consumer behaviour and product basics, pitch real expansion plans to founders and ship your first AI product with zero code.', kpis: [6, 2, 2], img: '/v3/ssb-terms/term2-path-v2.webp' },
  { n: '03', dates: 'Jul – Sep ’27', title: 'Build & Get Career Ready', body: 'Learn to sell, raise capital and research markets while building your startup’s MVP and a placement-ready resume.', kpis: [7, 2, 2], img: '/v3/ssb-terms/term3-briefcase.webp' },
  { n: '04', dates: 'Oct – Dec ’27', title: 'Advanced Domain Specialisation', body: 'Choose your electives across Strategy, Finance, Marketing, Product and Operations, take your startup to market and build business AI agents.', kpis: [9, 1, 2], img: '/v3/ssb-terms/term4-search.webp' },
  { n: '05', dates: 'Jan – Mar ’28', title: 'Pitch to VCs. Get Placed', body: 'Learn deal-making and investing, pitch your startup to VCs on Demo Day and walk into placements with founder-level proof of work.', kpis: [9, 2, 2], img: '/v3/ssb-terms/term5-growth.webp' },
];






/* ---- Admission ------------------------------------------------------------- */

export const admission = {
  eligibility:
    'Class 12th, then graduation: a bachelor’s degree from an accredited institution. Ideal for professionals with work experience, and for freshers who bring a strong track record of initiative: internships, projects, clubs or similar engagements.',
  steps: ['Apply', 'Pay application fee', 'Submit application', 'Interview', 'Receive verdict'],
  fastTrack: 'If 90 percentile & above in CAT/XAT/NMAT/SNAP, or a 640+ score in GMAT.',
  intakes: [
    { intake: 'Early bird', deadline: 'Oct 4, 2026', appFee: '₹1,000', fee: '₹15,50,000', closed: true },
    { intake: 'Intake 2', deadline: 'Dec 27, 2026', appFee: '₹1,000', fee: '₹16,00,000', open: true },
    { intake: 'Intake 3', deadline: 'Feb 27, 2027', appFee: '₹1,000', fee: '₹16,00,000' },
    { intake: 'Intake 4', deadline: 'May 2, 2027', appFee: '₹1,000', fee: '₹16,00,000' },
    { intake: 'Final deadline', deadline: 'Jul 31, 2027', appFee: '₹1,000', fee: '₹16,00,000' },
  ],
  scholarship: 'Up to 100% merit-based scholarships for high-achieving profiles, evaluated after your interview.',
};

/* ---- Campus ---------------------------------------------------------------- */

export const campus = {
  lede: 'Fully residential campus in Bengaluru · Shared Innovation Lab and campus with SST · Backed by Peak XV, Lightrock, Tiger Global.',
  photos: [
    { src: '/v3/campus/cohort.webp', alt: 'An SSB cohort together on campus' },
    { src: '/v3/campus/arch.webp', alt: 'The Scaler School of Business arch on Commencement Day' },
    { src: '/v3/campus/building.webp', alt: 'The SSB building in Bengaluru' },
    { src: '/v3/campus/gym.webp', alt: 'The campus gym' },
    { src: '/v3/campus/classroom.webp', alt: 'Students in an SSB lecture hall' },
  ],
  clubs: [
    { tag: 'Marketing', name: 'Marketing Club', body: 'Branding sessions and case competitions with founders like Meolaa’s Ishita Sawant: learn to build and pitch a brand.' },
    { tag: 'Consulting', name: 'Consulting Club', body: 'SSB’s own Case Book and sessions with Ex-McKinsey and BCG consultants: learn to structure and present a case.' },
  ],
  socials: [
    { handle: '@scalerschool_of_business', note: 'official', href: 'https://www.instagram.com/scalerschool_of_business/' },
    { handle: '@life_at_ssb', note: 'student-run', href: 'https://www.instagram.com/life_at_ssb/' },
  ],
};

/* ---- FAQ ------------------------------------------------------------------- */

/* v3's questions. Its first answer is verbatim; the others are taken from v3's
   own admissions and internship sections (and v4's FAQ), since v3 loads them on click. */
export const faqs = [
  {
    q: 'Does the lack of a degree hold back my career later?',
    a: 'Short answer: no. The industry cares about your skills, experience, and body of work, not the accreditation on your certificate. SSB’s PGP in Management & Technology is a certificate program by design: a degree is fixed the day it’s accredited; our curriculum isn’t. We rebuild it every term against what industry is actually hiring for right now.',
  },
  {
    q: 'What is the eligibility criteria?',
    a: 'Class 12th, then graduation: a bachelor’s degree from an accredited institution. Ideal for professionals with work experience, and for freshers who bring a strong track record of initiative: internships, projects, clubs or similar engagements.',
  },
  {
    q: 'Do I need a management entrance score to apply?',
    a: 'No entrance exam is mandatory. If you have 90 percentile & above in CAT/XAT/NMAT/SNAP, or a 640+ score in GMAT, you are fast-tracked.',
  },
  {
    q: 'What is the program structure and duration?',
    a: '18 months across five terms, January 2027 to March 2028, on a fully residential campus in Bengaluru. It includes a three-to-six-month internship.',
  },
  {
    q: 'What happens during the internship?',
    a: 'Every learner interns, for three to six months, in roles across Product, Founder’s Office, Marketing, Finance, Operations and Strategy. Internship placement was 100% across cohorts 1 and 2.',
  },
];
