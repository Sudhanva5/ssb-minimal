/*
 * Instructors and mentors, as the SSB concept site (v3) lists them.
 * Photos: /assest/mentors where we have one (in /images/mentors), else v3's own
 * (in /v3/people and /v3/faculty).
 *
 * `company` sits beside the mark; `role` is v3's title line; `teaches` is the
 * course (faculty only). `mark` is a file in /images/brands, or a white symbol
 * on `markBg`; with no mark the tile shows the company's initials.
 */
export type Person = {
  name: string;
  photo: string;
  company?: string;
  mark?: string;
  markBg?: string;
  role?: string;
  teaches?: string;
};

const asset = (slug: string) => `/images/mentors/${slug}.png`;

export const mentors: Person[] = [
  { name: 'Deepinder Goyal', photo: asset('deepinder-goyal'), company: 'Zomato', mark: 'zomato.png', role: 'Co-founder, Zomato' },
  { name: 'Binny Bansal', photo: asset('binny-bansal'), company: 'Flipkart', mark: 'flipkart.jpg', role: 'Co-founder, Flipkart' },
  { name: 'Vijay Shekhar Sharma', photo: '/v3/people/vijay-shekhar-sharma.webp', company: 'Paytm', role: 'MD, Paytm' },
  { name: 'Kunal Shah', photo: asset('kunal-shah'), company: 'CRED', mark: 'cred.jpg', role: 'Founder, CRED' },
  { name: 'Rajan Anandan', photo: asset('rajan-anandan'), company: 'Peak XV', mark: 'peakxv.jpg', role: 'MD, Peak XV' },
];

export const faculty: Person[] = [
  { name: 'Akash Sinha', photo: asset('akash-sinha'), company: 'Cashfree', mark: 'cashfree.svg', markBg: '#6933D3', role: 'CEO & Co-Founder, Cashfree', teaches: 'Growth Marketing' },
  { name: 'Dhron Kanish', photo: asset('dhron-kanish'), company: 'McKinsey', mark: 'mckinsey.jpg', role: 'Associate Partner, McKinsey', teaches: 'Product Management' },
  { name: 'Jacob Singh', photo: '/v3/faculty/jacob-singh.webp', company: 'Blinkit', mark: 'blinkit.jpg', role: 'Ex-CTO, Blinkit', teaches: 'Business Analytics' },
  { name: 'Kanishk Mehta', photo: '/v3/faculty/kanishk-mehta.webp', company: 'Razorpay', mark: 'razorpay.svg', role: 'Sr. Product Director, Razorpay', teaches: 'Operation Management' },
  { name: 'Saurabh Jain', photo: asset('saurabh-jain'), company: 'Stable Money', mark: 'stablemoney.svg', role: 'Co-Founder, Stable Money', teaches: 'Brand Strategy' },
  { name: 'Puneet', photo: '/v3/faculty/puneet.webp', company: 'BCG', mark: 'bcg.jpg', role: 'Partner, BCG', teaches: 'Corporate Finance' },
  { name: 'Sidhant Goyal', photo: asset('sidhant-goyal'), company: 'Toddle', mark: 'toddle.jpg', role: 'Toddle; Ex-Sequoia Capital', teaches: 'Sales Leadership' },
  { name: 'Siddharth Menon', photo: '/v3/faculty/siddharth-menon.webp', company: 'Colgate', mark: 'colgate.jpg', role: 'Ex-CMO, Epigamia/Colgate', teaches: 'Operation Management' },
  { name: 'Gaurav Dadhich', photo: '/v3/faculty/gaurav-dadhich.webp', company: 'Flipkart', mark: 'flipkart.jpg', role: 'Founder, Ex-Flipkart/Razorpay/Amazon', teaches: 'Growth Marketing' },
  { name: 'Sandeep Das', photo: '/v3/faculty/sandeep-das.webp', company: 'Mars', mark: 'mars.svg', role: 'Ex-Global Lead, Mars/PwC/Accenture', teaches: 'Product Management' },
  { name: 'Vatsal Sanghvi', photo: '/v3/faculty/vatsal-sanghvi.webp', company: 'Flipkart', mark: 'flipkart.jpg', role: 'Founder, Ex-Flipkart', teaches: 'Business Analytics' },
  { name: 'Malthi SS', photo: '/v3/faculty/malthi-ss.webp', company: 'PayPal', mark: 'paypal.svg', role: 'Ex-Product Director, PayPal', teaches: 'Strategy & Consulting' },
  { name: 'Saurabh Sengupta', photo: '/v3/faculty/saurabh-sengupta.webp', company: 'Zomato', mark: 'zomato.png', role: 'Ex-SVP Sales, Zomato', teaches: 'Brand Strategy' },
  { name: 'Amit Puniyani', photo: '/v3/faculty/amit-puniyani.webp', company: 'Deutsche Bank', role: 'Ex-VP, Deutsche Bank/J.P. Morgan', teaches: 'Corporate Finance' },
  { name: 'Narahari Hansoge', photo: '/v3/faculty/narahari-hansoge.webp', company: 'IIM Bangalore', role: 'IIM Faculty, PhD IIM-B', teaches: 'Sales Leadership' },
  /* Photos in /assest/mentors, but not on v3, v4 or findable online: fill in before launch. */
  { name: 'Divya Venkatavaraghavan', photo: asset('divya-venkatavaraghavan') },
  { name: 'Vedant Trivedi', photo: asset('vedant-trivedi') },
  { name: 'Roel Janssen', photo: asset('roel-janssen') },
  { name: 'Navin Parwal', photo: asset('navin-parwal') },
];
