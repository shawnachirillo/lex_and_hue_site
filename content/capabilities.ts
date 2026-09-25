export type CapabilityId = 'brand' | 'experience' | 'systems';

export type Capability = {
  id: CapabilityId;
  name: string;
  heroWord: string;
  statement: string;
  examples: readonly string[];
};

export const capabilities: readonly Capability[] = [
  {
    id: 'brand',
    name: 'Brand',
    heroWord: 'LOOKS.',
    statement: "How you're understood.",
    examples: [
      'Brand strategy',
      'Visual identity',
      'Positioning',
      'Brand evolution',
      'Launch + rollout',
    ],
  },
  {
    id: 'experience',
    name: 'Experience',
    heroWord: 'FEELS.',
    statement: 'How people experience you.',
    examples: [
      'Websites',
      'Digital experiences',
      'Customer journeys',
      'UX + interaction design',
      'Digital touchpoints',
    ],
  },
  {
    id: 'systems',
    name: 'Systems',
    heroWord: 'OPERATES.',
    statement: 'How your business operates.',
    examples: [
      'Custom tools',
      'Client portals',
      'Workflow systems',
      'Automation',
      'AI-powered systems',
    ],
  },
] as const;