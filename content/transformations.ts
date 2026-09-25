export type TransformationId =
  | 'rebrand'
  | 'reinvent'
  | 'relaunch';

export type Transformation = {
  id: TransformationId;
  number: string;
  name: string;
  description: string;
  statement: string;
  startingPrice: string;
  href: string;
};

export const transformations: readonly Transformation[] = [
  {
    id: 'rebrand',
    number: '01',
    name: 'Rebrand',
    description:
      'For an established business that has evolved, but its existing identity no longer reflects its quality.',
    statement:
      'Your business finally looks and feels like the business you have grown into.',
    startingPrice: '$3,500',
    href: '/pricing#transformation',
  },
  {
    id: 'reinvent',
    number: '02',
    name: 'Reinvent',
    description:
      'For businesses changing not only how they look, but how they are positioned and experienced.',
    statement:
      'We reinvent not only how the brand looks, but how people experience it.',
    startingPrice: '$6,500',
    href: '/pricing#transformation',
  },
  {
    id: 'relaunch',
    number: '03',
    name: 'Relaunch',
    description:
      'For a business entering a meaningful new chapter and needing to introduce that change intentionally.',
    statement:
      'You do not simply reveal a new identity. You introduce who the business has become.',
    startingPrice: '$10,000',
    href: '/pricing#transformation',
  },
] as const;