export type DigitalOffer = {
    title: string;
    price: string;
    description: string;
    items: readonly string[];
    bestFor: string;
  };
  
  export const digital: readonly DigitalOffer[] = [
    {
      title: 'Website Audit',
      price: '$350',
      description:
        'A strategic review for businesses that know their website is not working, but need clarity on why.',
      items: [
        'UX and navigation review',
        'Visual hierarchy',
        'Brand consistency',
        'Mobile experience',
        'Messaging and content observations',
        'CTA / conversion review',
        'Accessibility observations',
        'Basic SEO observations',
        'Prioritized recommendations',
      ],
      bestFor:
        "Businesses that know something isn't working but aren't sure what yet. Perfect before investing in a redesign or larger website project.",
    },
    {
      title: 'Audit + Strategy',
      price: '$550',
      description:
        'The full audit plus a 60-minute walkthrough and prioritized action plan.',
      items: [
        'Everything in Website Audit',
        '60-minute strategy session',
        'Priority roadmap',
        'Recommended next steps',
      ],
      bestFor:
        'Businesses ready to improve their website with a clear roadmap and prioritized action plan before committing to design or development.',
    },
    {
      title: 'Platform Website',
      price: 'from $2,500',
      description:
        'Custom-designed websites built in Squarespace, Showit or Wix.',
      items: [
        'Strategy and sitemap',
        'UX direction',
        'Custom visual design',
        'Responsive implementation',
        'Approximately 5–7 primary pages',
        'Basic SEO setup',
        'CMS configuration',
        'Analytics',
        'Launch',
      ],
      bestFor:
        'Businesses that need a polished, strategic website built on Squarespace, Showit or Wix without the complexity of custom development.',
    },
    {
      title: 'Custom Digital Experience',
      price: 'from $4,500',
      description:
        'Custom-designed and developed websites for brands that need more flexibility, movement and control.',
      items: [
        'Website strategy',
        'Custom UX / UI',
        'Next.js development',
        'Responsive development',
        'Motion and interaction',
        'CMS integration where needed',
        'Basic technical SEO',
        'Analytics',
        'Deployment',
      ],
      bestFor:
        "Brands that need a fully custom website, advanced functionality, unique interactions, or a digital experience that can't be achieved with a website builder.",
    },
  ] as const;