/*
 * Content for "How you learn", from the SSB concept site (ssb-school-concept.vercel.app/v4),
 * taken from its tools/pillars_data.py. Media lives in /public/v4/media. The card
 * numbers' labels (`nums`) are reworded for /minimal-sudh, so each reads as a
 * phrase ("5 AI products you'll build"), and every pillar's `name` leads with a
 * verb ("Learn AI fluency"); the figures are v4's.
 *
 * Pillar figures come from the v3 lab and need sign-off before launch. Reels are
 * placeholders: real posters, but every reel plays the same campus film.
 */

const M = '/v4/media';
const brand = (slug: string, ext = 'jpg') => `${M}/brands/${slug}/icon-dark.${ext}`;

export const REEL_SRC = `${M}/campus-film.mp4`;

export type RailItem = {
  /** A reel opens the reel viewer; a tile opens the detail sheet at that row. */
  kind: 'reel' | 'tile';
  src: string;
  pos: string;
  title: string;
  sub: string;
};

export type DetailRow = { img: string; k: string; t: string; body: string; out?: string; tools?: string };

export type Pillar = {
  key: string;
  name: string;
  /** The detail sheet's header photo and its focal point. */
  bg: string;
  fx: string;
  claim: string;
  nums: [string, string][];
  /** Which line headlines a tile: the row's `t` (default) or its `k` (a company name, e.g. AJIO). */
  tileTitle?: 'k' | 't';
  /** Run `logos` as a marquee under the tiles (AI fluency's tools). */
  marquee?: boolean;
  railK: string;
  rail: RailItem[];
  /** Logos that ride the ring (deduped brand icons, in order). */
  logos: { src: string; alt: string }[];
  detail: { lead: string; stats: [string, string][]; groups: { name: string; rows: DetailRow[] }[] };
};

export const pillars: Pillar[] = [
  {
    key: 'ai',
    name: 'Learn AI fluency',
    bg: `${M}/pillars/term4-lab-robotics.webp`,
    fx: '50% 40%',
    claim: 'Ship an AI product every term. No coding background needed.',
    nums: [
      ['150 hrs', 'of hands-on AI'],
      ['25+', 'AI tools you’ll use'],
      ['5', 'AI products you’ll build'],
    ],
    marquee: true,
    railK: 'Term by term',
    rail: [
      { kind: 'reel', src: `${M}/pillars/term1-lab.webp`, pos: '50% 50%', title: 'Vibe-coding hackathon', sub: 'Term 1' },
      { kind: 'reel', src: `${M}/pillars/term2-lab-voice.webp`, pos: '42% 50%', title: 'AI voice agent', sub: 'Term 2' },
      { kind: 'reel', src: `${M}/pillars/term3-students.webp`, pos: '50% 50%', title: 'Automate a business process', sub: 'Term 3' },
      { kind: 'reel', src: `${M}/pillars/term4-lab-robotics.webp`, pos: '45% 50%', title: '48-hour AI hackathon', sub: 'Term 4' },
      { kind: 'reel', src: `${M}/pillars/term5-students.webp`, pos: '50% 50%', title: 'Capstone with real users', sub: 'Term 5' },
    ],
    logos: [
      { src: brand('openai'), alt: 'OpenAI' },
      { src: brand('anthropic'), alt: 'Claude' },
      { src: brand('gemini', 'png'), alt: 'Gemini' },
      { src: brand('lovable'), alt: 'Lovable' },
      { src: brand('elevenlabs'), alt: 'ElevenLabs' },
      { src: brand('n8n'), alt: 'n8n' },
      { src: brand('zapier'), alt: 'Zapier' },
      { src: brand('cursor'), alt: 'Cursor' },
      { src: brand('crewai'), alt: 'CrewAI' },
      { src: brand('perplexity'), alt: 'Perplexity' },
      { src: brand('heygen'), alt: 'HeyGen' },
      { src: brand('notion'), alt: 'Notion' },
    ],
    detail: {
      lead: 'AI runs through every term, from using it to work faster to building agents that do the work. No coding background is needed.',
      stats: [
        ['150 hrs', 'of hands-on AI'],
        ['25+', 'AI tools'],
        ['5', 'AI products shipped'],
        ['3', 'hackathons'],
      ],
      groups: [
        {
          name: 'Term by term',
          rows: [
            { img: `${M}/pillars/term1-lab.webp`, k: 'Term 1', t: 'Work smarter with AI', body: 'Use AI to research, write, analyse and present faster, then build your first app just by describing it.', out: 'Vibe Coding Hackathon, e.g. a Splitwise-style expense splitter', tools: 'ChatGPT, Claude, Gemini, Perplexity, NotebookLM, Lovable' },
            { img: `${M}/pillars/term2-lab-voice.webp`, k: 'Term 2', t: 'Create with AI', body: 'Build AI that can speak, see, listen and generate images and video, from a support voice bot to product demos.', out: 'AI Agent Hackathon, e.g. a language-learning voice assistant', tools: 'ElevenLabs, Vapi, Midjourney, HeyGen' },
            { img: `${M}/pillars/term3-students.webp`, k: 'Term 3', t: 'Automate with AI', body: 'Connect everyday tools so that repetitive work in sales, marketing and operations runs on its own.', out: 'An automation that runs a real business process, e.g. a case-interview practice tool', tools: 'Zapier, n8n, Make, Airtable, Notion' },
            { img: `${M}/pillars/term4-lab-robotics.webp`, k: 'Term 4', t: 'Build AI agents', body: 'Build agents that research, decide and complete tasks on their own, like a digital teammate.', out: '48-Hour AI Hackathon, e.g. a negotiation-training AI coach', tools: 'Relevance AI, CrewAI, Hugging Face, Ollama' },
            { img: `${M}/pillars/term5-students.webp`, k: 'Term 5', t: 'Scale AI products', body: 'Learn where AI creates real value in a business, how to price it and build its ROI case, and take it to market.', out: 'A capstone launched to real users with a go-to-market plan', tools: 'Julius AI, Microsoft Copilot, Cursor' },
          ],
        },
      ],
    },
  },
  {
    key: 'build',
    name: 'Build real businesses',
    bg: `${M}/pillars/lab-build-1890.webp`,
    fx: '55% 45%',
    claim: 'Build two real businesses with real money, then pitch one to VCs.',
    nums: [
      ['₹25K', 'seed money for your D2C brand'],
      ['₹5L+', 'revenue target in 6 weeks'],
      ['₹25L', 'funding pathway for your startup'],
    ],
    railK: 'From the cohort',
    rail: [
      { kind: 'reel', src: `${M}/pillars/d2c.webp`, pos: '62% 50%', title: 'D2C Startup Challenge', sub: '6 weeks' },
      { kind: 'reel', src: `${M}/pillars/hustle.webp`, pos: '70% 50%', title: 'The Hustle Program', sub: '6 months' },
      { kind: 'reel', src: `${M}/built/hummus.webp`, pos: '50% 50%', title: 'Hummusapiens: ₹50L offer', sub: 'Cohort 1' },
      { kind: 'reel', src: `${M}/built/gredo.webp`, pos: '50% 50%', title: 'Gredo: ₹1Cr+ ARR', sub: 'Cohort 1' },
      { kind: 'reel', src: `${M}/built/dreamkit.webp`, pos: '50% 50%', title: 'Dream Kit: 12,000+ students', sub: 'Cohort 1' },
    ],
    logos: [
      { src: brand('peakxv'), alt: 'Peak XV' },
      { src: brand('lightrock'), alt: 'Lightrock' },
      { src: brand('zomato', 'png'), alt: 'Zomato' },
      { src: brand('swiggy'), alt: 'Swiggy' },
      { src: brand('thewholetruth'), alt: 'The Whole Truth' },
    ],
    detail: {
      lead: 'Two businesses, both with real money and real customers. The second one is pitched to investors on Demo Day.',
      stats: [
        ['₹25K', 'D2C seed money'],
        ['₹5L+', 'D2C revenue target'],
        ['₹50K', 'Hustle seed money'],
        ['₹25L', 'funding pathway'],
      ],
      groups: [
        {
          name: 'The two builds',
          rows: [
            { img: `${M}/pillars/d2c.webp`, k: '6 weeks', t: 'D2C Startup Challenge', body: 'Take a brand from zero to its first customers: sourcing, branding, packaging, pricing and selling. Teams get ₹25,000 in startup funding and target ₹5L+ in revenue.', out: 'Working capital grows as teams hit revenue milestones' },
            { img: `${M}/pillars/hustle.webp`, k: '6 months', t: 'The Hustle Program', body: 'Build a business from MVP to revenue to a founder-ready pitch, with ₹50,000 to start and a pathway to funding of up to ₹25L.', out: 'Backed by Lightrock, Peak XV and Sidhant Goyal' },
          ],
        },
        {
          name: 'What Cohort 1 built',
          rows: [
            { img: `${M}/built/hummus.webp`, k: 'Healthy snacking', t: 'Hummusapiens', body: 'Pitched to Shark Tank India judge Anupam Mittal on campus.', out: '₹50L offered by Anupam Mittal' },
            { img: `${M}/built/gredo.webp`, k: 'Food-tech', t: 'Gredo', body: 'A protein-food brand live on Zomato and Swiggy, with vending machines across Bangalore.', out: '₹1Cr+ ARR' },
            { img: `${M}/built/dreamkit.webp`, k: 'STEAM toys', t: 'Dream Kit', body: 'A homegrown STEAM toy brand that teaches science through play.', out: '12,000+ students across schools' },
          ],
        },
      ],
    },
  },
  {
    key: 'projects',
    name: 'Work on live projects',
    bg: `${M}/pillars/term3-students.webp`,
    fx: '50% 50%',
    claim: 'Work real briefs from real companies, then defend your plan to their founders.',
    nums: [
      ['6', 'live company briefs'],
      ['₹200Cr', 'business you’ll plan to expand'],
      ['1', 'live stock-market simulation'],
    ],
    tileTitle: 'k',
    railK: 'The briefs',
    rail: [
      { kind: 'tile', src: `${M}/pillars/mokobara.webp`, pos: '50% 60%', title: 'Mokobara', sub: 'International expansion' },
      { kind: 'tile', src: `${M}/pillars/ajio.webp`, pos: '50% 50%', title: 'AJIO', sub: 'Product teardown' },
      { kind: 'tile', src: `${M}/pillars/practo.webp`, pos: '40% 50%', title: 'Practo', sub: 'Healthcare growth' },
      { kind: 'tile', src: `${M}/pillars/meolaa.webp`, pos: '50% 50%', title: 'Meolaa', sub: 'Launch strategy' },
      { kind: 'tile', src: `${M}/pillars/quenzy.webp`, pos: '50% 50%', title: 'Quenzy', sub: 'Product-market fit' },
      { kind: 'tile', src: `${M}/pillars/stockgro.webp`, pos: '50% 50%', title: 'StockGro', sub: 'Stockathon' },
    ],
    logos: [
      { src: brand('ajio'), alt: 'AJIO' },
      { src: brand('practo'), alt: 'Practo' },
      { src: brand('meolaa'), alt: 'Meolaa' },
      { src: brand('stockgro'), alt: 'StockGro' },
    ],
    detail: {
      lead: 'Each brief comes from a real company. Teams work it with founders and operators, then present and defend their recommendation.',
      stats: [
        ['6', 'company briefs'],
        ['₹200Cr', 'Mokobara, APAC plan'],
        ['1', 'live market simulation'],
      ],
      groups: [
        {
          name: 'The briefs',
          rows: [
            { img: `${M}/pillars/mokobara.webp`, k: 'Mokobara', t: 'International expansion', body: 'Design the APAC strategy for a ₹200Cr business and pitch it to the founders.' },
            { img: `${M}/pillars/ajio.webp`, k: 'AJIO', t: 'Product teardown', body: 'Map conversion friction from discovery and search to the product page and checkout.' },
            { img: `${M}/pillars/practo.webp`, k: 'Practo', t: 'Healthcare growth', body: 'Grow healthcare GMV across primary, secondary and tertiary care.' },
            { img: `${M}/pillars/meolaa.webp`, k: 'Meolaa', t: 'Launch strategy', body: 'Build onboarding flows, brand campaigns and an app-launch roadmap.' },
            { img: `${M}/pillars/quenzy.webp`, k: 'Quenzy', t: 'Product-market fit', body: 'Build a PMF and go-to-market strategy across culture, distribution and positioning.' },
            { img: `${M}/pillars/stockgro.webp`, k: 'StockGro', t: 'Stockathon', body: 'Trade in a live mock-market simulation under real market conditions.' },
          ],
        },
      ],
    },
  },
  {
    key: 'immersions',
    name: 'Go on industry immersions',
    bg: `${M}/pillars/domestic-immersions.webp`,
    fx: '50% 45%',
    claim: 'Learn where the work happens: factory floors, quick-commerce ops and a creative agency.',
    nums: [
      ['3', 'industry immersions'],
      ['6 mo', 'creator track at Jio Creative Labs'],
    ],
    railK: 'On the ground',
    rail: [
      { kind: 'reel', src: `${M}/pillars/domestic-immersions.webp`, pos: '45% 50%', title: 'Quick-commerce backend', sub: 'Immersion' },
      { kind: 'reel', src: `${M}/pillars/creator-preneur-track.webp`, pos: '30% 50%', title: 'Jio Creative Labs', sub: 'Creator track' },
      { kind: 'reel', src: `${M}/pillars/tanisha-singhal.webp`, pos: '50% 30%', title: 'Tanisha Singhal', sub: 'Tech events' },
      { kind: 'reel', src: `${M}/pillars/pallavi-op.webp`, pos: '50% 30%', title: 'Pallavi O P', sub: 'PCOS and weight loss' },
      { kind: 'reel', src: `${M}/pillars/shubham-singh.webp`, pos: '50% 30%', title: 'Shubham Singh', sub: 'Bollywood x business' },
    ],
    logos: [
      { src: brand('jio', 'png'), alt: 'Jio' },
      { src: brand('reliance'), alt: 'Reliance' },
    ],
    detail: {
      lead: 'Three domestic immersions put you inside working businesses. The creator-preneur track puts you inside Reliance’s creative agency for six months.',
      stats: [
        ['3', 'domestic immersions'],
        ['6 mo', 'at Jio Creative Labs'],
      ],
      groups: [
        {
          name: 'The immersions',
          rows: [
            { img: `${M}/pillars/domestic-immersions.webp`, k: 'Immersion', t: '3 domestic immersions', body: 'Across industries: manufacturing floors, quick-commerce backend ops and a fashion brand headquarters.' },
            { img: `${M}/pillars/creator-preneur-track.webp`, k: 'Creator track', t: 'Creator-preneur track', body: '6 months inside Reliance’s Jio Creative Labs, on campaigns like Jio Dhan Dhana Dhan.' },
          ],
        },
      ],
    },
  },
  {
    key: 'mentors',
    name: 'Learn from super mentors',
    bg: `${M}/pillars/lab-mentor-1400.webp`,
    fx: '60% 40%',
    claim: 'The people who built India’s best-known companies come to campus to teach how.',
    nums: [
      ['4', 'super mentor sessions'],
      ['1', 'Commencement Day address'],
    ],
    railK: 'The sessions',
    rail: [
      { kind: 'reel', src: `${M}/pillars/rajan-anandan.webp`, pos: '78% 50%', title: 'Rajan Anandan', sub: 'Ex-MD SEA, Google' },
      { kind: 'reel', src: `${M}/pillars/jacob-singh.webp`, pos: '18% 50%', title: 'Jacob Singh', sub: 'Ex-CTO, Blinkit' },
      { kind: 'reel', src: `${M}/pillars/rahul-chari.webp`, pos: '42% 50%', title: 'Rahul Chari', sub: 'Co-founder, PhonePe' },
      { kind: 'reel', src: `${M}/pillars/yash-kumar.webp`, pos: '30% 50%', title: 'Yash Kumar', sub: 'OpenAI' },
    ],
    logos: [
      { src: brand('google'), alt: 'Google' },
      { src: brand('blinkit'), alt: 'Blinkit' },
      { src: brand('phonepe'), alt: 'PhonePe' },
      { src: brand('openai'), alt: 'OpenAI' },
      { src: brand('peakxv'), alt: 'Peak XV' },
    ],
    detail: {
      lead: 'Super mentor sessions bring founders and operators to campus to share how they built what they built.',
      stats: [
        ['4', 'super mentor sessions'],
        ['1', 'Commencement Day address'],
      ],
      groups: [
        {
          name: 'The sessions',
          rows: [
            { img: `${M}/pillars/rajan-anandan.webp`, k: 'Ex-MD SEA, Google', t: 'Rajan Anandan', body: 'On striving for excellence, learning from failure and staying hungry.' },
            { img: `${M}/pillars/jacob-singh.webp`, k: 'Ex-CTO, Blinkit', t: 'Jacob Singh', body: 'On tech leadership and product thinking at India’s largest quick-commerce company.' },
            { img: `${M}/pillars/rahul-chari.webp`, k: 'Co-founder, PhonePe', t: 'Rahul Chari', body: 'Rejected by Google, he went on to build India’s largest UPI app.' },
            { img: `${M}/pillars/yash-kumar.webp`, k: 'Lead Engineer, OpenAI', t: 'Yash Kumar', body: 'The creator of OpenAI’s first agent addressed students on Commencement Day.' },
          ],
        },
      ],
    },
  },
];
