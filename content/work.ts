/* =========================================================
   LEX & HUE — WORK CONTENT

   CASE STUDY ARCHITECTURE

   Case studies are VISUAL compositions first.

   The page renderer handles layout.
   This file controls:
   - project information
   - project-specific colors
   - sequence of compositions
   - images
   - supporting copy

   Missing images can use placeholder blocks so the
   composition can be designed before final assets exist.
========================================================= */

export type ProjectTheme = {
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  accent: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type ProjectCopy = {
  label?: string;
  heading?: string;
  body?: string;
};

export type VisualAsset =
  | {
      kind: 'image';
      image: ProjectImage;
      label?: string;
    }
  | {
      kind: 'placeholder';
      label: string;
      note?: string;
    };

/* =========================================================
   COMPOSITION TYPES
========================================================= */

export type WorkSection =
  /* -------------------------------------------------------
     LARGE SINGLE IMAGE
  ------------------------------------------------------- */

  | {
      type: 'hero-image';
      image: VisualAsset;
      caption?: string;
      height?: 'medium' | 'large' | 'screen';
      inset?: boolean;
    }

  /* -------------------------------------------------------
     TWO VISUALS SIDE BY SIDE
  ------------------------------------------------------- */

  | {
      type: 'split';
      left: VisualAsset;
      right: VisualAsset;
      copy?: ProjectCopy;
      ratio?: 'equal' | 'left-heavy' | 'right-heavy';
    }

  /* -------------------------------------------------------
     LARGE VISUAL + SMALLER STACK
  ------------------------------------------------------- */

  | {
      type: 'editorial-grid';
      hero: VisualAsset;
      secondary: VisualAsset;
      tertiary?: VisualAsset;
      copy?: ProjectCopy;
      heroSide?: 'left' | 'right';
    }

  /* -------------------------------------------------------
     LOGO PRESENTATION
  ------------------------------------------------------- */

  | {
      type: 'logo-field';
      logo: VisualAsset;
      label?: string;
      background?: string;
      foreground?: string;
      height?: 'medium' | 'large';
    }

  /* -------------------------------------------------------
     BRAND MARKS / IDENTITY PIECES
  ------------------------------------------------------- */

  | {
      type: 'identity-grid';
      assets: VisualAsset[];
      copy?: ProjectCopy;
    }

  /* -------------------------------------------------------
     PRODUCT / PACKAGING
  ------------------------------------------------------- */

  | {
      type: 'product-showcase';
      hero: VisualAsset;
      details?: VisualAsset[];
      copy?: ProjectCopy;
      heroSide?: 'left' | 'right';
    }

  /* -------------------------------------------------------
     DIGITAL
  ------------------------------------------------------- */

  | {
      type: 'digital-showcase';
      desktop: VisualAsset;
      mobile?: VisualAsset;
      secondary?: VisualAsset;
      copy?: ProjectCopy;
    }

  /* -------------------------------------------------------
     ONE QUIET TEXT MOMENT
  ------------------------------------------------------- */

  | {
      type: 'note';
      label?: string;
      heading?: string;
      body: string;
    }

  /* -------------------------------------------------------
     RARE LARGE STATEMENT
  ------------------------------------------------------- */

  | {
      type: 'statement';
      text: string;
      accent?: string;
      theme?: 'light' | 'dark' | 'project';
    }

  /* -------------------------------------------------------
     FINAL OUTCOME
  ------------------------------------------------------- */

  | {
      type: 'outcome';
      body: string;
    };

/* =========================================================
   PROJECT
========================================================= */

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

  theme?: ProjectTheme;

  sections?: readonly WorkSection[];
};

/* =========================================================
   PROJECTS
========================================================= */

export const work: readonly WorkItem[] = [
  /* =======================================================
     THE EAST END CO.
  ======================================================= */

  {
    slug: 'the-east-end-company',

    index: '01',

    title: 'The East End Co.',

    type: 'Brand Reinvention',

    copy:
      'A heritage-inspired fragrance house shaped around memory, atmosphere, and lineage.',

    services: [
      'Strategy',
      'Identity',
      'Packaging',
      'Web',
    ],

    eyebrow:
      'Fragrance / Heritage / Reinvention',

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

    theme: {
      background: '#252422',
      surface: '#f3eadc',
      foreground: '#f8f4eb',
      muted: '#b99a72',
      accent: '#a9783d',
    },

    sections: [
      {
        type: 'split',

        ratio: 'left-heavy',

        left: {
          kind: 'image',

          image: {
            src: '/images/doorknob.jpg',
            alt: 'Antique brass door knocker',
          },

          label: 'Atmosphere',
        },

        right: {
          kind: 'placeholder',

          label: 'Product / Packaging Hero',

          note:
            'Create a large East End fragrance or packaging image.',
        },

        copy: {
          label: '01 / Context',

          heading:
            'A fragrance house rooted in memory.',

          body:
            'The brand needed to feel storied and established without becoming nostalgic, overly ornate, or disconnected from a modern customer.',
        },
      },

      {
        type: 'logo-field',

        logo: {
          kind: 'image',

          image: {
            src: '/images/TEEC_main_logo.png',
            alt: 'The East End Co. primary logo',
          },

          label: 'Primary Identity',
        },

        label: '02 / Primary Identity',

        background: '#efe6d7',

        foreground: '#252422',

        height: 'large',
      },

      {
        type: 'identity-grid',

        copy: {
          label: 'Identity System',

          heading:
            'Heritage without imitation.',

          body:
            'The visual system draws from lineage, place, and the character of objects collected over time.',
        },

        assets: [
          {
            kind: 'image',

            image: {
              src: '/images/TEEC_tree.png',
              alt: 'The East End Co. tree mark',
            },

            label: 'Brand Mark',
          },

          {
            kind: 'placeholder',

            label: 'Secondary Logo',

            note:
              'Add alternate lockup or secondary identity.',
          },

          {
            kind: 'placeholder',

            label: 'Typography',

            note:
              'Create a type specimen showing the East End typography system.',
          },

          {
            kind: 'placeholder',

            label: 'Color System',

            note:
              'Create a palette or material/color composition.',
          },
        ],
      },

      {
        type: 'product-showcase',

        hero: {
          kind: 'placeholder',

          label: 'Packaging Hero',

          note:
            'Large fragrance bottle, packaging, or product family image.',
        },

        details: [
          {
            kind: 'placeholder',

            label: 'Packaging Detail',

            note:
              'Close crop of label, bottle, paper, seal, or typography.',
          },

          {
            kind: 'placeholder',

            label: 'Product Detail',

            note:
              'Secondary product or tactile detail.',
          },
        ],

        copy: {
          label: '03 / Application',

          heading:
            'Designed to become a world.',

          body:
            'The identity was conceived as a system capable of expanding across fragrance, bath, home, and ritual products.',
        },
      },

      {
        type: 'hero-image',

        image: {
          kind: 'placeholder',

          label: 'Atmosphere / Full Bleed',

          note:
            'Create one dramatic environmental or product-world image.',
        },

        height: 'screen',
      },

      {
        type: 'editorial-grid',

        heroSide: 'right',

        hero: {
          kind: 'placeholder',

          label: 'Campaign / Product Image',

          note:
            'Primary editorial campaign image.',
        },

        secondary: {
          kind: 'placeholder',

          label: 'Detail',

          note:
            'Close crop or secondary application.',
        },

        tertiary: {
          kind: 'placeholder',

          label: 'Collateral',

          note:
            'Card, box, tissue, tag, label, or other brand application.',
        },

        copy: {
          label: '04 / Brand World',

          heading:
            'Collected, not manufactured.',

          body:
            'The visual language allows the brand to feel established and atmospheric while remaining flexible enough to grow.',
        },
      },

      {
        type: 'digital-showcase',

        desktop: {
          kind: 'placeholder',

          label: 'Website / Desktop',

          note:
            'Add a large East End website mockup or browser composition.',
        },

        mobile: {
          kind: 'placeholder',

          label: 'Website / Mobile',

          note:
            'Add a mobile website screen or phone mockup.',
        },

        copy: {
          label: '05 / Digital',

          heading:
            'The world continues online.',

          body:
            'The digital expression carries the same editorial atmosphere into the customer experience.',
        },
      },

      {
        type: 'outcome',

        body:
          'The result is a brand world that feels collected rather than manufactured—capable of expanding across fragrance, bath, home, and ritual products.',
      },
    ],
  },

  /* =======================================================
     MODERN GODDESS COACHING
  ======================================================= */

  {
    slug: 'modern-goddess-coaching',

    index: '02',

    title: 'Modern Goddess Coaching',

    type: 'Personal Brand',

    copy:
      'A sharper, more energetic identity designed to make the work feel established and memorable.',

    services: [
      'Positioning',
      'Identity',
      'Digital',
    ],

    eyebrow:
      'Personal Brand / Editorial / Direction',

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

    theme: {
      background: '#252422',
      surface: '#eee6df',
      foreground: '#f8f4eb',
      muted: '#c8b19f',
      accent: '#fd5100',
    },

    sections: [
      {
        type: 'hero-image',

        image: {
          kind: 'image',

          image: {
            src: '/images/fruit.jpeg',
            alt: 'Modern Goddess Coaching brand imagery',
          },

          label: 'Brand Direction',
        },

        height: 'large',

        inset: true,
      },

      {
        type: 'split',

        ratio: 'equal',

        left: {
          kind: 'placeholder',

          label: 'Portrait / Brand Image',

          note:
            'Add portrait, editorial photography, or campaign image.',
        },

        right: {
          kind: 'placeholder',

          label: 'Editorial Application',

          note:
            'Add branded social, print, or campaign application.',
        },

        copy: {
          label: '01 / Identity',

          heading:
            'A stronger presence.',

          body:
            'The existing presentation felt fragmented and did not communicate the confidence or sophistication of the work behind it.',
        },
      },

      {
        type: 'logo-field',

        logo: {
          kind: 'image',

          image: {
            src: '/images/MGC_white_logo.png',
            alt: 'Modern Goddess Coaching logo',
          },

          label: 'Primary Identity',
        },

        label: '02 / Identity',

        background: '#252422',

        foreground: '#f8f4eb',

        height: 'large',
      },

      {
        type: 'editorial-grid',

        heroSide: 'left',

        hero: {
          kind: 'placeholder',

          label: 'Brand Hero',

          note:
            'Large campaign or editorial brand image.',
        },

        secondary: {
          kind: 'image',

          image: {
            src: '/images/fruit.jpeg',
            alt: 'Modern Goddess visual direction',
          },

          label: 'Visual Direction',
        },

        tertiary: {
          kind: 'placeholder',

          label: 'Graphic Detail',

          note:
            'Typography, quote graphic, social tile, or printed piece.',
        },

        copy: {
          label: '03 / Direction',

          heading:
            'Editorial. Personal. Clear.',

          body:
            'We clarified the positioning and created an editorial identity with deliberate typography, restrained color, and a stronger visual hierarchy.',
        },
      },

      {
        type: 'hero-image',

        image: {
          kind: 'placeholder',

          label: 'Full Brand Moment',

          note:
            'Create one oversized image that captures the complete Modern Goddess visual world.',
        },

        height: 'screen',
      },

      {
        type: 'digital-showcase',

        desktop: {
          kind: 'placeholder',

          label: 'Website / Desktop',

          note:
            'Add desktop website or digital experience.',
        },

        mobile: {
          kind: 'placeholder',

          label: 'Website / Mobile',

          note:
            'Add mobile website screens.',
        },

        copy: {
          label: '04 / Digital',

          heading:
            'A cohesive digital presence.',

          body:
            'The digital system extends the identity into a polished and consistent customer experience.',
        },
      },

      {
        type: 'outcome',

        body:
          'The finished system gives Modern Goddess Coaching a cohesive platform that feels personal without becoming casual and polished without becoming generic.',
      },
    ],
  },

  /* =======================================================
     LEGACY AT HOME
  ======================================================= */

  {
    slug: 'legacy-at-home',

    index: '03',

    title: 'Legacy At Home',

    type: 'Brand Repositioning',

    copy:
      'A warmer, clearer system built to communicate dignity, familiarity, and dependable care.',

    services: [
      'Strategy',
      'Identity',
      'Web',
    ],

    eyebrow:
      'Care / Trust / Repositioning',

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

    theme: {
      background: '#223326',
      surface: '#f8f4eb',
      foreground: '#f8f4eb',
      muted: '#d6c778',
      accent: '#71884e',
    },

    sections: [
      {
        type: 'hero-image',

        image: {
          kind: 'image',

          image: {
            src: '/images/hero.jpg',
            alt: 'Legacy At Home brand image',
          },

          label: 'Brand World',
        },

        height: 'screen',
      },

      {
        type: 'logo-field',

        logo: {
          kind: 'image',

          image: {
            src: '/images/LAHC_white_logo.png',
            alt: 'Legacy At Home logo',
          },

          label: 'Primary Identity',
        },

        label: '01 / Identity',

        background: '#223326',

        foreground: '#f8f4eb',

        height: 'large',
      },

      {
        type: 'split',

        left: {
          kind: 'placeholder',

          label: 'Care / Lifestyle',

          note:
            'Add human-centered brand photography.',
        },

        right: {
          kind: 'placeholder',

          label: 'Brand Application',

          note:
            'Add collateral, brochure, signage, or stationery.',
        },

        copy: {
          label: '02 / Direction',

          heading:
            'Professional without becoming clinical.',

          body:
            'The identity needed to communicate trust and professionalism while still feeling warm, familiar, and human.',
        },
      },

      {
        type: 'digital-showcase',

        desktop: {
          kind: 'placeholder',

          label: 'Website / Desktop',
        },

        mobile: {
          kind: 'placeholder',

          label: 'Website / Mobile',
        },

        copy: {
          label: '03 / Digital',

          heading:
            'Clear, accessible, human.',

          body:
            'The digital experience centers the person rather than the service.',
        },
      },

      {
        type: 'outcome',

        body:
          'The new brand presents care as thoughtful, human, and dependable while giving the business a clearer foundation for growth.',
      },
    ],
  },

  /* =======================================================
     THE STILLPOINT
  ======================================================= */

  {
    slug: 'the-stillpoint',

    index: '04',

    title: 'The Stillpoint',

    type: 'Brand Creation',

    copy:
      'A grounded visual world shaped by stillness, ritual, and the textures of the Great Lakes.',

    services: [
      'Strategy',
      'Identity',
      'Experience',
    ],

    eyebrow:
      'Wellness / Ritual / Atmosphere',

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

    theme: {
      background: '#0f1a17',
      surface: '#e7dfd3',
      foreground: '#f8f4eb',
      muted: '#8f5c36',
      accent: '#8f5c36',
    },

    sections: [
      {
        type: 'hero-image',

        image: {
          kind: 'image',

          image: {
            src: '/images/pier.jpg',
            alt: 'Great Lakes pier landscape',
          },

          label: 'Atmosphere',
        },

        height: 'screen',
      },

      {
        type: 'split',

        ratio: 'right-heavy',

        left: {
          kind: 'placeholder',

          label: 'Material / Ritual',

          note:
            'Add tactile ritual or material image.',
        },

        right: {
          kind: 'placeholder',

          label: 'Space / Atmosphere',

          note:
            'Add a large atmospheric wellness image.',
        },

        copy: {
          label: '01 / Atmosphere',

          heading:
            'Grounded in place.',

          body:
            'The identity draws from Great Lakes landscapes, Northwoods texture, natural materials, and quiet ritual.',
        },
      },

      {
        type: 'logo-field',

        logo: {
          kind: 'image',

          image: {
            src: '/images/TSP_logo_white.png',
            alt: 'The Stillpoint logo',
          },

          label: 'Primary Identity',
        },

        label: '02 / Identity',

        background: '#0f1a17',

        foreground: '#f8f4eb',

        height: 'large',
      },

      {
        type: 'editorial-grid',

        heroSide: 'right',

        hero: {
          kind: 'placeholder',

          label: 'Experience',

          note:
            'Add large space, ritual, or environmental image.',
        },

        secondary: {
          kind: 'placeholder',

          label: 'Detail',

          note:
            'Add close-up material or ritual detail.',
        },

        tertiary: {
          kind: 'placeholder',

          label: 'Application',

          note:
            'Add printed, digital, or physical brand application.',
        },

        copy: {
          label: '03 / Experience',

          heading:
            'Stillness made tangible.',

          body:
            'The system leaves room for quiet while maintaining a distinctive sense of place.',
        },
      },

      {
        type: 'outcome',

        body:
          'The resulting atmosphere feels calm, rooted, and intentional—supporting both the physical space and the broader client experience.',
      },
    ],
  },
] as const;