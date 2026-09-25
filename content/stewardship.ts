export type StewardshipPlan = {
    title: string;
    price: string;
    description: string;
    detail?: string;
    items: readonly string[];
    bestFor: string;
  };
  
  export const stewardship: readonly StewardshipPlan[] = [
    {
      title: 'Essential',
      price: 'starting at $150 / mo',
      description:
        'For occasional updates and small refinements.',
      items: [
        'Content and copy updates',
        'Image swaps and light page edits',
        'Minor layout refinements',
        'CMS support',
        'Monthly priority list',
      ],
      bestFor:
        'Established sites that need reliable maintenance without ongoing campaign work.',
    },
    {
      title: 'Growth',
      price: 'starting at $300 / mo',
      description:
        'For brands that need regular changes, new content and ongoing refinement.',
      items: [
        'Everything in Essential',
        'New sections and landing pages',
        'Campaign and seasonal updates',
        'Ongoing design refinements',
        'Light UX improvements',
        'Monthly planning check-in',
      ],
      bestFor:
        'Growing brands that regularly publish, promote, adjust offers or evolve their customer experience.',
    },
    {
      title: 'Partner',
      price: 'starting at $500 / mo',
      description:
        'For businesses that want an ongoing digital design and web partner.',
      detail: '',
      items: [
        'Everything in Growth',
        'Priority design and development support',
        'New page design',
        'Campaign creative support',
        'Conversion and experience refinements',
        'Ongoing visual direction',
        'Monthly strategy session',
      ],
      bestFor:
        'Brands that need a consistent creative and digital partner embedded in the business.',
    },
  ] as const;