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
    'I’m also an artist. I paint in watercolor, gouache, acrylic and mixed media, and more and more in pointillism, and I’ve exhibited at Dubai International Art Centre.',
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

// One row per place. `link` is the live product; leave it out if there isn't one.
export const experience = [
  {
    company: 'RichAPI',
    note: 'part of TexAu',
    link: 'https://richapi.ai',
    title: 'Product Lead',
    dates: '2024 – 2026',
    tags: ['PM', 'Frontend', 'Design'],
    line: 'Led product for a B2B data API, from strategy and pricing to enterprise features, and built parts of it myself.',
  },
  {
    company: 'TexAu',
    link: 'https://texau.com',
    title: 'Software Engineer → Product',
    dates: '2024 – 2026',
    tags: ['PM', 'Frontend'],
    line: 'Worked on TexAu v3, the latest version of the company\u2019s core platform, across engineering and product.',
  },
  {
    company: 'Visalaw.ai',
    note: 'at TexAu',
    link: 'https://www.visalaw.ai',
    title: 'Software Engineer → Product',
    dates: '2024 – 2025',
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
