/*
 * Content for /premium, from the SSB concept sites (v3 and v4). Images are v4's,
 * copied into /public/p. Placement figures are flagged on v3/v4 as still to be
 * confirmed before launch.
 */

export const nav = [
  { href: '#outcomes', label: 'Outcomes' },
  { href: '#programme', label: 'Programme' },
  { href: '#ventures', label: 'Ventures' },
  { href: '#faculty', label: 'Faculty' },
  { href: '#campus', label: 'Campus' },
  { href: '#admissions', label: 'Admissions' },
];

export const heroFacts = [
  { value: '18', unit: 'months', note: 'incl. internship' },
  { value: '150', unit: 'seats', note: 'residential, Bengaluru' },
  { value: '100+', unit: 'leaders', note: 'teach & mentor' },
];

export const manifesto = {
  quote: 'If you’re 25 and going to an MBA college today, you must be some kind of idiot, if you ask me.',
  by: 'Nikhil Kamath',
  role: 'Co-founder, Zerodha',
  stats: [
    { value: '60%', label: 'of MBA students say their own coursework isn’t built for an AI-first workforce.', logo: '/p/breakers/forbes.svg', source: 'Forbes, 2026' },
    { value: '62%', label: 'more pay for workers with AI skills than for peers in the same role without them.', logo: '/p/breakers/pwc.svg', source: 'PwC, 2026' },
  ],
};

export const outcomes = [
  { value: '₹25.7L', label: 'Top-quartile average CTC', note: 'Cohort 1' },
  { value: '3.2x', label: 'Average salary hike', note: 'vs. before SSB' },
  { value: '100%', label: 'Internship placement', note: 'Cohorts 1 & 2' },
  { value: '₹23–24L', label: 'Average CTC', note: 'Cohort 2' },
];

export const terms = [
  { n: '01', dates: 'Jan – Mar 2027', title: 'Foundations & First Build', body: 'Economics, accounting and marketing, used straight away: sell on the street and launch your first D2C brand.', build: 'Year 1 cohort generated ₹15L+ revenue in one month', img: '/v4/pg/t1.webp' },
  { n: '02', dates: 'Apr – Jun 2027', title: 'Strategy, Product & AI Fluency', body: 'Strategy, consumer behaviour and product basics. Pitch real expansion plans to founders and ship your first AI product with zero code.', build: 'Pitch a ₹200cr expansion plan to the Mokobara founders', img: '/v4/pg/t2.jpg' },
  { n: '03', dates: 'Jul – Sep 2027', title: 'Build & Get Career Ready', body: 'Learn to sell, raise capital and research markets while building your startup’s MVP and a placement-ready resume.', build: 'A ₹50cr GTM plan for a prebiotic soda founder', img: '/v4/pg/t3.webp' },
  { n: '04', dates: 'Oct – Dec 2027', title: 'Advanced Domain Specialisation', body: 'Electives across Strategy, Finance, Marketing, Product and Operations. Take your startup to market and build business AI agents.', build: 'D2C Startup Challenge: a ₹50 lakh dropshipping business', img: '/v4/pg/t4.webp' },
  { n: '05', dates: 'Jan – Mar 2028', title: 'Pitch to VCs. Get Placed', body: 'Deal-making and investing. Pitch your startup to VCs on Demo Day and walk into placements with founder-level proof of work.', build: 'Demo Day', img: '/v4/pg/t5.webp' },
];

export const pillars = [
  { n: '01', title: 'AI fluency', line: 'Ship an AI product every term. No coding background needed.', stats: [['150 hrs', 'hands-on AI'], ['25+', 'AI tools'], ['5', 'AI products shipped']], img: '/p/pillars/term1-lab.webp' },
  { n: '02', title: 'Build businesses', line: 'Seed money, a revenue target and a funding pathway, from the first term.', stats: [['₹25K', 'D2C seed money'], ['₹5L+', '6-week revenue target'], ['₹25L', 'funding pathway']], img: '/p/pillars/d2c.webp' },
  { n: '03', title: 'Live projects', line: 'Real briefs from Mokobara, AJIO, Practo, Meolaa, Quenzy and StockGro.', stats: [['6', 'company briefs'], ['₹200Cr', 'APAC plan'], ['1', 'live market sim']], img: '/p/pillars/mokobara.webp' },
  { n: '04', title: 'Immersions', line: 'From quick-commerce operations to a creator track at Jio Creative Labs.', stats: [['3', 'industry immersions'], ['6 mo', 'creator track']], img: '/p/pillars/creator-preneur-track.webp' },
  { n: '05', title: 'Mentor sessions', line: 'Rajan Anandan, Jacob Singh, Rahul Chari and Yash Kumar, in the room.', stats: [['4', 'super mentor sessions'], ['1', 'Commencement address']], img: '/p/pillars/rajan-anandan.webp' },
];

export const ventures = [
  { name: 'Hummusapiens', tag: 'Healthy snacking', founder: 'Dr. Charles Chacko Porathoor', metric: '₹50L', metricNote: 'offered by Anupam Mittal', img: '/p/built/hummus.webp', body: 'Hummus-based healthy snacks, built while studying at SSB and pitched to Shark Tank India judge Anupam Mittal on campus.' },
  { name: 'Gredo', tag: 'Food-tech', founder: 'Mayank & Sanskriti', metric: '₹1Cr+', metricNote: 'ARR', img: '/p/built/gredo.webp', body: 'A protein-food brand live on Zomato and Swiggy, with fresh-food vending machines across Bangalore, the first one at SSB.' },
  { name: 'Dream Kit', tag: 'STEAM toys', founder: 'Aashish US', metric: '12,000+', metricNote: 'students across schools', img: '/p/built/dreamkit.webp', body: 'A homegrown STEAM toy brand that teaches science through play.' },
  { name: 'GradeSense', tag: 'AI · EdTech', founder: 'Ayush Poojary', metric: '50,000+', metricNote: 'answer sheets graded', img: '/p/built/gradesense.webp', body: 'AI that evaluates descriptive and handwritten answer sheets at scale.' },
  { name: 'Creator business', tag: 'Creator economy', founder: 'Paritosh Sinha', metric: '200K', metricNote: 'followers, up from 8K', img: '/p/built/creator.webp', body: 'He skipped placements to build his creator business full-time.' },
  { name: 'Tally Konnect', tag: 'B2B SaaS', founder: 'Moh Agarwal', metric: '₹5Cr', metricNote: 'valuation', img: '/p/built/tally.webp', body: 'Took the family business digital with an ERP automation platform for its clients.' },
  { name: 'ParkEase', tag: 'Mobility', founder: 'Yash Ramchandani', metric: '10,000+', metricNote: 'cars handed over', img: '/p/built/parkease.webp', body: 'A smart valet platform for malls, hotels and other high-footfall venues.' },
  { name: 'Zari & Co.', tag: 'Fashion', founder: 'Impanna Reddy', metric: '₹50L', metricNote: 'raised', img: '/p/built/zari.webp', body: 'A premium Kanjivaram bridal line pairing AI colour analysis with certified gold-zari craftsmanship.' },
];

export type Teacher = { name: string; role: string; teaches?: string; photo: string; group: 'Mentor' | 'Faculty' };
export const people: Teacher[] = [
  { name: 'Rajan Anandan', role: 'MD, Peak XV', photo: '/p/faculty/m-rajan-anandan.webp', group: 'Mentor' },
  { name: 'Deepinder Goyal', role: 'Co-founder, Zomato', photo: '/p/faculty/m-deepinder-goyal.webp', group: 'Mentor' },
  { name: 'Binny Bansal', role: 'Co-founder, Flipkart', photo: '/p/faculty/m-binny-bansal.webp', group: 'Mentor' },
  { name: 'Vijay Shekhar Sharma', role: 'Founder, Paytm', photo: '/p/faculty/m-vijay-shekhar-sharma.webp', group: 'Mentor' },
  { name: 'Kunal Shah', role: 'Founder, CRED', photo: '/p/faculty/m-kunal-shah.webp', group: 'Mentor' },
  { name: 'Akash Sinha', role: 'CEO & Co-Founder, Cashfree', teaches: 'Growth Marketing', photo: '/p/faculty/akash-sinha.webp', group: 'Faculty' },
  { name: 'Dhron Kanish', role: 'Associate Partner, McKinsey', teaches: 'Product Management', photo: '/p/faculty/dhron-kanish.webp', group: 'Faculty' },
  { name: 'Jacob Singh', role: 'Ex-CTO, Blinkit', teaches: 'Business Analytics', photo: '/p/faculty/jacob-singh.webp', group: 'Faculty' },
  { name: 'Puneet', role: 'Partner, BCG', teaches: 'Corporate Finance', photo: '/p/faculty/puneet.webp', group: 'Faculty' },
  { name: 'Kanishk Mehta', role: 'Sr. Product Director, Razorpay', teaches: 'Operation Management', photo: '/p/faculty/kanishk-mehta.webp', group: 'Faculty' },
  { name: 'Saurabh Jain', role: 'Co-Founder, Stable Money', teaches: 'Brand Strategy', photo: '/p/faculty/saurabh-jain.webp', group: 'Faculty' },
  { name: 'Sidhant Goyal', role: 'Toddle; Ex-Sequoia Capital', teaches: 'Sales Leadership', photo: '/p/faculty/sidhant-goyal.webp', group: 'Faculty' },
  { name: 'Malthi SS', role: 'Ex-Product Director, PayPal', teaches: 'Strategy & Consulting', photo: '/p/faculty/malthi-ss.webp', group: 'Faculty' },
  { name: 'Siddharth Menon', role: 'Ex-CMO, Epigamia/Colgate', teaches: 'Operation Management', photo: '/p/faculty/siddharth-menon.webp', group: 'Faculty' },
  { name: 'Gaurav Dadhich', role: 'Founder, Ex-Flipkart/Razorpay/Amazon', teaches: 'Growth Marketing', photo: '/p/faculty/gaurav-dadhich.webp', group: 'Faculty' },
  { name: 'Saurabh Sengupta', role: 'Ex-SVP Sales, Zomato', teaches: 'Brand Strategy', photo: '/p/faculty/saurabh-sengupta.webp', group: 'Faculty' },
  { name: 'Sandeep Das', role: 'Ex-Global Lead, Mars/PwC/Accenture', teaches: 'Product Management', photo: '/p/faculty/sandeep-das.webp', group: 'Faculty' },
  { name: 'Vatsal Sanghvi', role: 'Founder, Ex-Flipkart', teaches: 'Business Analytics', photo: '/p/faculty/vatsal-sanghvi.webp', group: 'Faculty' },
  { name: 'Amit Puniyani', role: 'Ex-VP, Deutsche Bank/J.P. Morgan', teaches: 'Corporate Finance', photo: '/p/faculty/amit-puniyani.webp', group: 'Faculty' },
  { name: 'Narahari Hansoge', role: 'IIM Faculty, PhD IIM-B', teaches: 'Sales Leadership', photo: '/p/faculty/narahari-hansoge.webp', group: 'Faculty' },
];

export const campusPhotos = [
  { src: '/p/campus/cohort.webp', caption: 'The cohort, together on campus' },
  { src: '/p/campus/arch.webp', caption: 'The arch on Commencement Day' },
  { src: '/p/campus/classroom.webp', caption: 'A lecture hall in session' },
  { src: '/p/pillars/term4-lab-robotics.webp', caption: 'The Innovation Lab, shared with SST' },
  { src: '/p/campus/gym.webp', caption: 'The campus gym' },
  { src: '/p/pillars/term3-students.webp', caption: 'Building, between classes' },
];
export const clubs = ['Marketing', 'Consulting', 'Finance & Investing', 'Product', 'Entrepreneurship Cell', 'Debate & Speaking', 'Content & Creators', 'Sports', 'Music & Arts', 'Social Impact'];

export const press = [
  { outlet: 'BusinessLine', logo: '/p/press/businessline.svg', date: '22 Apr 2026', title: 'Scaler School of Business adopts practice-led MBA model', dek: 'Student teams generated over ₹15 lakh in six weeks through D2C businesses.' },
  { outlet: 'The Tribune', logo: '/p/press/tribune.png', date: '29 Jul 2026', title: 'Anupam Mittal asks “50 lakh mein kitna equity dega?” after meeting SSB student startups', dek: 'He reviewed Hummusapiens, Gredo, GradeSense and Dream Kit on campus.' },
  { outlet: 'Inshorts', logo: '/p/press/inshorts.png', date: '11 May 2026', title: 'Scaler School of Business founding cohort achieves ₹18 LPA average CTC', dek: 'A 3.2x average hike, with hiring partners including Blinkit, Urban Company and Scapia.' },
  { outlet: 'Outlook Business', logo: '/p/press/outlookbusiness.png', date: '1 May 2024', title: 'Scaler diversifies its educational offering, launches Scaler School of Business', dek: 'The launch of the full-time PGP in Management and Technology in Bengaluru.' },
];

export const admissions = {
  eligibility: 'Class 12, then a bachelor’s degree from an accredited institution. Ideal for professionals with work experience, and for freshers with a strong record of internships, projects, clubs or similar.',
  steps: ['Apply', 'Pay the application fee', 'Submit your application, with a short video essay', 'Interview with industry leaders', 'Receive your decision'],
  fastTrack: '90 percentile or above in CAT, XAT, NMAT or SNAP, or 640+ in the GMAT.',
  intakes: [
    { name: 'Early bird', by: '4 Oct 2026', fee: '₹15,50,000', closed: true },
    { name: 'Intake 2', by: '27 Dec 2026', fee: '₹16,00,000', open: true },
    { name: 'Intake 3', by: '27 Feb 2027', fee: '₹16,00,000' },
    { name: 'Intake 4', by: '2 May 2027', fee: '₹16,00,000' },
    { name: 'Final intake', by: '31 Jul 2027', fee: '₹16,00,000' },
  ] as { name: string; by: string; fee: string; closed?: boolean; open?: boolean }[],
  feeNote: 'Application fee ₹1,000 for every intake, non-refundable. Fees may be revised. Financing is available through our banking partners.',
  scholarships: ['Future Business Innovators', 'Extraordinary Achievements', 'Industry Leaders', 'Women in Leadership'],
  backers: [
    { name: 'Vijay Shekhar Sharma', role: 'Founder, Paytm', photo: '/p/admissions/vijay-shekhar-sharma.webp' },
    { name: 'Prasanna Sankar', role: 'Co-founder, Rippling', photo: '/p/admissions/prasanna-sankar.webp' },
    { name: 'Bhavin Turakhia', role: 'Founder, Zeta and Titan', photo: '/p/admissions/bhavin-turakhia.webp' },
    { name: 'Ankur Warikoo', role: 'Founder, WebVeda', photo: '/p/admissions/ankur-warikoo.webp' },
    { name: 'Mohak Mangal', role: 'Founder, Soch by Mohak', photo: '/p/admissions/mohak-mangal.webp' },
  ],
};

export const faqs = [
  { q: 'Will a certificate, not a degree, hold me back?', a: 'Short answer: no. The industry cares about your skills, experience and body of work, not the accreditation on your certificate. The PGP is a certificate programme by design: a degree is fixed the day it’s accredited; our curriculum isn’t. We rebuild it every term against what industry is hiring for right now.' },
  { q: 'Who can apply?', a: 'Anyone with a bachelor’s degree from an accredited institution, after Class 12. Ideal for professionals with work experience, and for freshers with a strong record of internships, projects, clubs or similar.' },
  { q: 'Do I need a management entrance score?', a: 'No exam is mandatory. 90 percentile or above in CAT, XAT, NMAT or SNAP, or 640+ in the GMAT, puts you on the fast track.' },
  { q: 'How long is the programme, and how is it structured?', a: '18 months across five terms, January 2027 to March 2028, including a 3–6 month internship. It is fully residential at our Bengaluru campus.' },
  { q: 'What happens during the internship?', a: 'Every learner interns, for three to six months, across Product, Founder’s Office, Marketing, Finance, Operations and Strategy. Stipends go up to ₹60K, and several internships have converted into full-time offers.' },
  { q: 'What does it cost, and are there scholarships?', a: 'The course fee is ₹16,00,000 from Intake 2. Merit-based scholarships of up to 100% are decided after your interview and awarded by the Scaler Impact Foundation. Financing is available through our banking partners.' },
];
