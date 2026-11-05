// Page metadata, shared by the client (title updates) and the build-time prerender.
export const SITE = 'https://www.bhaktighaghda.com';

export const PAGES = {
  '': {
    title: 'Bhakti Ghaghda · Product lead, frontend engineer & artist',
    description:
      'Bhakti Ghaghda is a product lead, frontend engineer and designer in Sharjah, UAE, and the painter behind PellucidWorks.',
  },
  tech: {
    title: 'Tech · Bhakti Ghaghda',
    description:
      'Product leadership and frontend engineering at RichAPI, TexAu and Visalaw.ai, an AI legal drafting platform used by 100+ US law firms.',
  },
  about: {
    title: 'About · Bhakti Ghaghda',
    description:
      'Engineer first, product lead now, painter throughout. Background, skills and education: valedictorian at Murdoch University Dubai, MS in Computer Science at CU Boulder.',
  },
  art: {
    title: 'PellucidWorks · Art by Bhakti Ghaghda',
    description:
      'PellucidWorks is the painting practice of Bhakti Ghaghda: pointillism, watercolor, gouache and acrylic, exhibited at Dubai International Art Centre.',
  },
  contact: {
    title: 'Contact · Bhakti Ghaghda',
    description:
      'Get in touch with Bhakti Ghaghda about product roles, frontend work, original paintings or exhibitions.',
  },
};

export const urlFor = (id) => `${SITE}/${id || ''}`;
