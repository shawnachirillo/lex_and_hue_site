export type Testimonial = {
    id: string;
    quote: string;
    name: string;
    company: string;
    service: string;
  };
  
  export const testimonials: readonly Testimonial[] = [
    {
      id: 'client-note-01',
      quote:
        'Lex & Hue understood what we were trying to become before we had the language for it. The final direction felt like us, just much more intentional.',
      name: 'Client Name',
      company: 'Company Name',
      service: 'Brand Reinvention',
    },
    {
      id: 'client-note-02',
      quote:
        'What started as a website conversation became a much bigger look at how people experience our business. That changed the way we approached the entire project.',
      name: 'Client Name',
      company: 'Company Name',
      service: 'Experience Design',
    },
    {
      id: 'client-note-03',
      quote:
        'The biggest difference was that we were not handed a generic solution. The work actually reflected how our business operates and where we want to go next.',
      name: 'Client Name',
      company: 'Company Name',
      service: 'Digital Systems',
    },
  ] as const;