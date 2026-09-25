export type Partner = {
  name: string;
  category: string;
};

export const partners: readonly Partner[] = [
  {
    name: 'Status: Available',
    category: 'Websites & Digital Products',
  },
  {
    name: 'Kairo',
    category: 'Technology Partner',
  },
] as const;