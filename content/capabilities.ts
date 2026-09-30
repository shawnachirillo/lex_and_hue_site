export type CapabilityId =
  | 'brand'
  | 'web'
  | 'product'
  | 'systems';

export type Capability = {
  id: CapabilityId;
  name: string;
  statement: string;
  examples: readonly string[];
};

export const capabilities: readonly Capability[] = [
  {
    id: 'brand',
    name: 'Brand',
    statement: 'How you’re understood.',
    examples: [
      'Brand Identity',
      'Visual Systems',
      'Art Direction',
      'Digital Brand Expression',
    ],
  },

  {
    id: 'web',
    name: 'Web',
    statement: 'How you show up online.',
    examples: [
      'Brand Websites',
      'Website Redesign',
      'UX / UI',
      'Custom Development',
      'CMS',
    ],
  },

  {
    id: 'product',
    name: 'Product',
    statement: 'What people use.',
    examples: [
      'Web Applications',
      'Client Portals',
      'Dashboards',
      'Platforms + MVPs',
    ],
  },

  {
    id: 'systems',
    name: 'Systems',
    statement: 'How the business works.',
    examples: [
      'Internal Tools',
      'Workflow Software',
      'Integrations',
      'Automation',
      'Data + AI',
    ],
  },
] as const;