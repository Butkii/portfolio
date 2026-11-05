// All site copy lives here. Edit this file to update the site.
// Anything still missing is listed in CONTENT-TODO.md.

export const profile = {
  name: 'Bhakti Ghaghda',
  roles: ['Product lead', 'Frontend engineer', 'Designer', 'Visual artist'],
  location: 'Sharjah, UAE',
  shortBio:
    "I build products from a blank screen to live tools people rely on, and I work across all of it: deciding what to build, designing how it should feel, and writing the frontend that ships it. Outside product work, I'm a painter with a pointillism-led practice, exhibiting in Dubai under the name Pellucidworks.",
  longBio: [
    'I started my career as a frontend engineer and moved into product leadership, so I come at product decisions knowing what the build will actually take. At TexAu I helped take an AI legal drafting platform from concept to production, used by legal teams across 100+ US immigration law firms. As Product Lead at RichAPI, I’ve owned platform strategy, competitive positioning, access control design and internal tooling for a B2B data enrichment API.',
    'I graduated valedictorian from Murdoch University Dubai with a double major in Computer Science and Business Information Systems, and I’m working toward an MS in Computer Science at CU Boulder.',
    'Alongside the tech work I paint (watercolor, gouache, acrylic, mixed media, and more and more pointillism). I’ve shown at Dubai International Art Centre several times, including one sold-out show.',
  ],
  links: {
    email: 'ghaghdabhakti@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bhakti-ghaghda/',
    github: 'https://github.com/Butkii',
    instagram: 'https://www.instagram.com/pellucidworks/',
  },
};

export const positioning =
  "I work on products as a PM, a frontend engineer and a designer, and I'm usually doing all three on the same project.";

export const TAGS = ['PM', 'Frontend', 'Design'];

export const experience = [
  {
    company: 'RichAPI',
    note: 'part of TexAu',
    title: 'Product Lead',
    dates: 'Mar 2024 – Nov 2026',
    place: 'Remote, UAE',
    summary:
      'RichAPI is a B2B data enrichment API that routes each request through a waterfall of data providers and returns one result.',
    groups: [
      {
        tag: 'PM',
        label: 'Product',
        items: [
          'Owned competitive positioning. I framed RichAPI’s edge as breadth across data categories in one platform, not provider count within one category, and as reliable multi-provider fallback for when a single provider misses.',
          'Defined pricing and trust principles for the product: customers pay only for successful calls, and every result shows which provider in the waterfall served it.',
          'Redesigned rate-limit tiers across all customer orgs to match upstream provider capacity. Built the risk model (low-usage orgs first, high-usage orgs warned early), the tier mapping and a phased rollout with a two-week notice window for active customers.',
          'Designed the access control architecture: org/team separation, per-team credit limits, endpoint blocking on an explicit-deny model, and SSO auto-join with default credit caps.',
          'Ran the website redesign: evaluated designers, chose the homepage direction and set the content strategy around a storytelling pipeline.',
          'Handled B2B integration incidents with customers, including one where an upstream provider misrepresented its rate limits.',
          'Interviewed and assessed engineering hires (automation engineers, scraping engineers, a sales/technical hybrid role).',
        ],
      },
      {
        tag: 'Frontend',
        label: 'Engineering',
        items: [
          'Built enterprise SSO (SAML 2.0 via Okta) on Supabase Auth, tested end to end through MockSAML and Okta Developer. Resolved the production-readiness issues myself: custom domain activation, CLI schema errors and existing-user collisions.',
          'Building the internal admin dashboard (Next.js + Supabase Postgres) with Tenant, Provider Health, Route Editor and Economics screens.',
          'Wrote and reviewed Postgres migration scripts, including foreign-key dependency analysis, and managed Vercel deployments.',
        ],
      },
      {
        tag: 'Design',
        label: 'Design',
        items: [
          'Set up Figma variables for dark and light themes on the redesigned site.',
          'Briefed and directed outside designers on social media assets and email templates.',
        ],
      },
    ],
  },
  {
    company: 'TexAu',
    note: 'Visalaw.ai',
    title: 'Software Engineer → Product',
    dates: 'Mar 2024 – 2025',
    place: 'Remote, UAE',
    summary:
      'Visalaw.ai is an AI-powered legal drafting platform for US immigration attorneys. It’s now a recognized name in immigration law tech.',
    groups: [
      {
        tag: 'PM',
        label: 'Product',
        items: [
          'Helped take the platform from concept to production. It automates evidence review, petition generation and packet assembly for legal teams across 100+ law firms.',
          'Worked directly with attorneys to find workflow bottlenecks and turn them into product requirements and features across evidence management, drafting and case preparation.',
        ],
      },
      {
        tag: 'Frontend',
        label: 'Engineering',
        items: [
          'Built the user-facing workflows (onboarding, collaboration and document management) in Next.js and React.',
          'Implemented subscription management, trial flows and credit-based billing with Stripe, which enabled self-serve onboarding and enterprise monetization.',
          'Built document-processing pipelines (AWS Textract, S3, OpenAI) that cut draft preparation from several hours to minutes.',
          'Cut document generation time from 30–40 minutes to under 3 minutes through query restructuring, indexing, caching and parallel processing.',
          'Implemented cross-application authentication between products.',
        ],
      },
    ],
    stats: [
      { value: '100+', label: 'law firms' },
      { value: '<3 min', label: 'doc generation, down from 30–40' },
    ],
  },
  {
    company: 'Coders Launchpad UAE',
    title: 'Volunteer Designer',
    dates: 'Dec 2023 – Jun 2024',
    place: 'Dubai',
    groups: [
      {
        tag: 'Design',
        label: 'Design',
        items: [
          'Designed social media posts, event posters and information booklets in Figma.',
          'Designed and built Webflow websites with a focus on usability.',
          'Helped run events and workshops at CodersHQ.',
        ],
      },
    ],
  },
  {
    company: 'Beno Technologies',
    title: 'Software Engineer (Intern)',
    dates: 'Jun 2023 – Aug 2023',
    place: 'Dubai',
    earlier: true,
    groups: [
      {
        tag: 'Frontend',
        label: 'Engineering',
        items: [
          'Built a GPT-powered test automation tool that generated test cases from JSON/YAML specs, reducing manual QA work.',
          'Built an AWS Lambda automation for FreshSales that improved lead response times and raised customer engagement by 25%.',
        ],
      },
    ],
  },
  {
    company: 'Solution BI',
    title: 'Junior BI Developer',
    dates: 'Aug 2022 – Dec 2022',
    place: 'Dubai',
    earlier: true,
    groups: [
      {
        tag: null,
        label: 'Data',
        items: [
          'Built real-time banking dashboards in MicroStrategy and PostgreSQL.',
          'Migrated reporting to Power BI, cutting report generation time.',
        ],
      },
    ],
  },
];

export const projects = [
  {
    name: 'Visalaw.ai',
    tags: ['PM', 'Frontend'],
    role: 'PM · Frontend',
    blurb: 'AI legal drafting platform, taken from concept to production. Used across 100+ firms.',
  },
  {
    name: 'RichAPI Enterprise SSO',
    tags: ['Frontend'],
    role: 'Frontend / Full-stack',
    blurb: 'SAML 2.0 via Okta on Supabase Auth, tested end to end and taken to production.',
  },
  {
    name: 'RichAPI Access Control',
    tags: ['PM'],
    role: 'PM · System design',
    blurb: 'Org/team permissions, credit caps and explicit-deny endpoint blocking.',
  },
  {
    name: 'RichAPI Admin Dashboard',
    tags: ['PM', 'Frontend', 'Design'],
    role: 'PM · Frontend · Design',
    blurb: 'Internal ops console: tenants, provider health, routing and economics.',
  },
  {
    name: 'RichAPI Website Redesign',
    tags: ['PM', 'Design'],
    role: 'PM · Design direction',
    blurb: 'Designer selection, homepage direction and a themed Figma system.',
  },
  {
    name: 'Job tracker',
    tags: ['Frontend'],
    role: 'Engineering · personal tool',
    blurb: 'YAML-configured tracker that monitors company ATS endpoints across role categories.',
  },
];

export const skills = [
  {
    group: 'Product',
    items: [
      'Product discovery',
      'Positioning & competitive analysis',
      'Pricing & packaging',
      'Roadmap & rollout planning',
      'Access control & permissions design',
      'System design',
      'Stakeholder & customer work',
      'Hiring & interviewing',
    ],
  },
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Webflow', 'Vercel'] },
  {
    group: 'Backend / data',
    items: [
      'Node.js',
      'NestJS',
      'Supabase (Auth, Postgres)',
      'PostgreSQL',
      'MongoDB',
      'AWS (Textract, S3, Lambda)',
      'Stripe',
      'SAML 2.0 / Okta',
      'Python for data analysis',
      'JS / Puppeteer',
    ],
  },
  { group: 'AI', items: ['OpenAI APIs', 'LLM document pipelines'] },
  { group: 'Design', items: ['Figma (variables & theming)', 'Visual & brand design', 'Social & print collateral'] },
];

export const education = [
  {
    school: 'University of Colorado Boulder',
    degree: 'MS in Computer Science',
    detail: 'Performance-based admission pathway · in progress',
    points: [
      'Completed Dynamic Programming and Greedy Algorithms for credit, with full marks on all graded work',
      'Currently taking Approximation Algorithms & Linear Programming and Advanced Data Structures, RSA & Quantum Algorithms',
    ],
  },
  {
    school: 'Murdoch University Dubai',
    degree: 'BSc, Computer Science & Business Information Systems',
    detail: 'Double major · 2020–2023',
    points: [
      'Valedictorian, Class of 2023 · GPA 3.8/4.0',
      'Vice-Chancellor’s Commendation for Academic Excellence (2021, 2022)',
      'Academic Merit Scholarship (2021)',
      'Teaching assistant for ICT159 Foundations of Programming across several semesters',
    ],
  },
];

// ---------- ART ----------

export const art = {
  name: 'Pellucidworks',
  intro:
    'Pellucidworks is my painting practice. I work in watercolor, gouache, acrylic and mixed media, and pointillism, built up dot by dot, is now the centre of the work. Recurring subjects are birds, lanterns and quiet scenes from the places I live and travel.',
  handle: '@pellucidworks',
};

// `image`: put a file in /public/art/ and set e.g. image: '/art/quiet-arrangement.jpg'.
// Until then a generated dot study (using `palette`) stands in for it.
export const artworks = [
  {
    title: 'A Quiet Arrangement',
    medium: 'Acrylic on canvas, pointillism',
    size: '60 × 60 cm',
    description: 'A lantern with a crow on the Sharjah Corniche.',
    note: 'Exhibited in “From Square One,” Dubai International Art Centre (Jumeirah).',
    image: null,
    seed: 7,
    motif: 'lantern',
    palette: ['#1d2b4a', '#2f4f7a', '#e8a33d', '#f3d27a', '#121212', '#c9653b'],
  },
  {
    title: 'Unmade, Remade',
    medium: 'Pointillism',
    description: 'A phoenix.',
    note: 'Available at The Market Island, DFC.',
    status: 'Available',
    image: null,
    seed: 21,
    motif: 'flame',
    palette: ['#b7281e', '#e0533d', '#f08a2c', '#f6c344', '#5a1410', '#fbe7b0'],
  },
  {
    title: 'Tbilisi Street Scene',
    description: 'Painted as a memento of a trip to Tbilisi.',
    image: null,
    seed: 42,
    motif: 'street',
    palette: ['#b8653f', '#d99a6c', '#3f7f78', '#e9d8bf', '#6c4a3a', '#9cc1b4'],
  },
];

export const series = {
  title: 'Birds & Lanterns',
  detail: 'Six-canvas series · in progress, 2026',
  description: 'Six canvases, four birds and two lanterns, started October 2026.',
  pieces: [
    { kind: 'bird', done: false },
    { kind: 'bird', done: false },
    { kind: 'lantern', done: false },
    { kind: 'bird', done: false },
    { kind: 'bird', done: false },
    { kind: 'lantern', done: false },
  ],
};

export const exhibitions = [
  { year: 'Nov 2026', title: 'Upcoming show', venue: 'Details soon', upcoming: true },
  { year: 'Ongoing', title: 'The Market Island', venue: 'DFC', note: 'Unmade, Remade available' },
  { year: '', title: 'From Square One', venue: 'Dubai International Art Centre, Jumeirah', note: 'Showed A Quiet Arrangement' },
  { year: '', title: 'Exhibition', venue: 'Dubai International Art Centre', note: 'Sold out', highlight: true },
  { year: '', title: 'Exhibition', venue: 'Dubai International Art Centre' },
];
