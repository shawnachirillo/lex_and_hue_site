export type WorkItem = {
    slug: string;
    index: string;
    title: string;
    type: string;
    copy: string;
    services: readonly string[];
    eyebrow: string;
    image: string;
    logo: string;
    gradient: string;
    overview: string;
    challenge: string;
    direction: string;
    outcome: string;
    featured: boolean;
  };
  
  export const work: readonly WorkItem[] = [
    {
      slug: 'the-east-end-company',
      index: '01',
      title: 'The East End Co.',
      type: 'Brand Reinvention',
      copy:
        'A heritage-inspired fragrance house shaped around memory, atmosphere, and lineage.',
      services: ['Strategy', 'Identity', 'Packaging', 'Web'],
      eyebrow: 'Fragrance / Heritage / Reinvention',
      image: '/images/doorknob.jpg',
      logo: '/images/TEEC_main_logo.png',
      gradient:
        'linear-gradient(135deg, #241710 0%, #7a3c1e 45%, #d28c4d 100%)',
      overview:
        'The East End Co. is a fragrance house rooted in family memory, place, and the emotional atmosphere of home.',
      challenge:
        'The brand needed to feel storied and established without becoming nostalgic, overly ornate, or disconnected from a modern customer.',
      direction:
        'We built a flexible heritage system around distinctive fragrance houses, editorial typography, layered color, and a strong sense of place.',
      outcome:
        'The result is a brand world that feels collected rather than manufactured—capable of expanding across fragrance, bath, home, and ritual products.',
      featured: true,
    },
    {
    
            slug: 'modern-goddess-coaching',
            index: '02',
            title: 'Modern Goddess Coaching',
            type: 'Personal Brand',
            copy:
              'A sharper, more energetic identity designed to make the work feel established and memorable.',
            services: ['Positioning', 'Identity', 'Digital'],
            eyebrow: 'Personal Brand / Editorial / Direction',
            image: '/images/fruit.jpeg',
            logo: '/images/MGC_white_logo.png',
            gradient:
              'linear-gradient(135deg, #211f1d 0%, #5b4b45 48%, #c8b19f 100%)',
            overview:
              'Modern Goddess Coaching needed a personal brand that could hold expertise, personality, and a more elevated professional presence.',
            challenge:
              'The existing presentation felt fragmented and did not communicate the confidence or sophistication of the work behind it.',
            direction:
              'We clarified the positioning and created an editorial identity with deliberate typography, restrained color, and a stronger visual hierarchy.',
            outcome:
              'The finished system gives Modern Goddess Coaching a cohesive platform that feels personal without becoming casual and polished without becoming generic.',
            featured: true,
          },
    {
      slug: 'legacy-at-home',
      index: '03',
      title: 'Legacy At Home',
      type: 'Brand Repositioning',
      copy:
        'A warmer, clearer system built to communicate dignity, familiarity, and dependable care.',
      services: ['Strategy', 'Identity', 'Web'],
      eyebrow: 'Care / Trust / Repositioning',
      image: '/images/hero.jpg',
      logo: '/images/LAHC_white_logo.png',
      gradient:
        'linear-gradient(135deg, #223326 0%, #71884e 46%, #d6c778 100%)',
      overview:
        'Legacy At Home provides person-centered residential care built around dignity, familiarity, and individual needs.',
      challenge:
        'The brand needed to communicate trust and professionalism without feeling clinical, institutional, or emotionally distant.',
      direction:
        'We created a warm, accessible identity using grounded color, approachable typography, and language centered on the person rather than the service.',
      outcome:
        'The new brand presents care as thoughtful, human, and dependable while giving the business a clearer foundation for growth.',
      featured: true,
    },
    {
      slug: 'the-stillpoint',
      index: '04',
      title: 'The Stillpoint',
      type: 'Brand Creation',
      copy:
        'A grounded visual world shaped by stillness, ritual, and the textures of the Great Lakes.',
      services: ['Strategy', 'Identity', 'Experience'],
      eyebrow: 'Wellness / Ritual / Atmosphere',
      image: '/images/pier.jpg',
      logo: '/images/TSP_logo_white.png',
      gradient:
        'linear-gradient(135deg, #0f1a17 0%, #2f4a35 48%, #8f5c36 100%)',
      overview:
        'The Stillpoint is a Reiki and breathwork practice designed around restoration, integration, and quiet personal ritual.',
      challenge:
        'The identity needed to feel spiritual without becoming vague, trendy, or visually detached from the grounded nature of the experience.',
      direction:
        'We drew from Great Lakes landscapes, Northwoods texture, natural materials, and a restrained visual system that leaves room for stillness.',
      outcome:
        'The resulting atmosphere feels calm, rooted, and intentional—supporting both the physical space and the broader client experience.',
      featured: true,
    },
  ] as const;