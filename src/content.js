// All site copy lives here. Edit this file to update the site.
// Anything still missing is listed in CONTENT-TODO.md.

export const profile = {
  name: 'Bhakti Ghaghda',
  roles: ['Product lead', 'Frontend engineer', 'Designer', 'Visual artist'],
  location: 'Sharjah, UAE',
  shortBio:
    "I build products from a blank screen to live tools people rely on, and I work across all of it: deciding what to build, designing how it should feel, and writing the frontend that ships it. Outside product work, I'm a painter with a pointillism-led practice, exhibiting in Dubai under the name PellucidWorks.",
  longBio: [
    'I started my career as a frontend engineer and moved into product leadership, so I come at product decisions knowing what the build will actually take. At TexAu I helped take an AI legal drafting platform from concept to production, used by legal teams across 100+ US immigration law firms. As Product Lead at RichAPI, I’ve owned platform strategy, competitive positioning, access control design and internal tooling for a B2B data enrichment API.',
    'I graduated valedictorian from Murdoch University Dubai with a double major in Computer Science and Business Information Systems, and I’m working toward an MS in Computer Science at CU Boulder.',
    'I’m also an artist. I paint in watercolor, gouache, acrylic and mixed media, and more and more in pointillism, and I’ve exhibited at Dubai International Art Centre.',
  ],
  links: {
    email: 'ghaghdabhakti@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bhakti-ghaghda/',
    github: 'https://github.com/Butkii',
    instagram: 'https://www.instagram.com/pellucidworks/',
    // Booking page (Cal.com, Calendly, Google appointment schedule…). Leave '' to hide the button.
    calendar: 'https://calendar.app.google/4xpThcHTEPTQmhAv6',
  },
};

export const positioning =
  "I work on products as a PM, a frontend engineer and a designer, and I'm usually doing all three on the same project.";

export const TAGS = ['PM', 'Frontend', 'Design'];

// One row per place. `link` is the live product; leave it out if there isn't one.
export const experience = [
  {
    company: 'RichAPI',
    note: 'part of TexAu',
    link: 'https://richapi.ai',
    title: 'Product Lead',
    current: true,
    tags: ['PM', 'Frontend', 'Design'],
    line: 'Leading product for a B2B data API, from strategy and pricing to enterprise features, and building parts of it myself.',
  },
  {
    company: 'TexAu',
    link: 'https://texau.com',
    title: 'Software Engineer → Product',
    tags: ['PM', 'Frontend'],
    line: 'Worked on TexAu v3, the latest version of the company\u2019s core platform, across engineering and product.',
  },
  {
    company: 'Visalaw.ai',
    note: 'at TexAu',
    link: 'https://www.visalaw.ai',
    title: 'Software Engineer → Product',
    tags: ['PM', 'Frontend'],
    line: 'Helped take an AI legal drafting platform from concept to production. It\u2019s now used by 100+ US immigration law firms.',
  },
];

// What I do: one card per discipline. `tag` matches the Work section dots.
export const skills = [
  {
    tag: 'PM',
    title: 'Product',
    line: 'Deciding what to build and why, then getting it shipped.',
    items: ['Discovery & customer research', 'Positioning & pricing', 'Roadmaps & phased rollouts', 'Systems & permissions design', 'Hiring & interviewing'],
  },
  {
    tag: 'Frontend',
    title: 'Engineering',
    line: 'Building products end to end, with the most care on the front.',
    items: ['React, Next.js & TypeScript', 'Node.js & PostgreSQL', 'Supabase, AWS & Stripe', 'AI & LLM document pipelines', 'Auth & enterprise SSO'],
  },
  {
    tag: 'Design',
    title: 'Design',
    line: 'Making things look and feel right, from the system to the screen.',
    items: ['Figma & design systems', 'Visual & brand design', 'Websites in Webflow', 'Social & print collateral', 'Art direction'],
  },
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
  name: 'PellucidWorks',
  intro:
    'PellucidWorks is my painting practice. I work in watercolor, gouache, acrylic and mixed media, and pointillism, built up dot by dot, is now the centre of the work. Recurring subjects are birds, lanterns and quiet scenes from the places I live and travel.',
  handle: '@pellucidworks',
};
