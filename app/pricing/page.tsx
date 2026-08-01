'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';
import {
  ReactNode,
  useState,
} from 'react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const ease = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const transformations = [
  {
    number: '01',
    name: 'Rebrand',
    price: 'from $3,500',
    description:
      'For an established business that has evolved, but its existing identity no longer reflects its quality.',
    outcome:
      'Your business finally looks and feels like the business you have grown into.',
    groups: [
      {
        title: 'Discovery',
        items: [
          'Pre-project brand questionnaire',
          'Current brand audit',
          '60–90 minute discovery session',
          'Customer experience review',
          'Competitive / market review',
        ],
      },
      {
        title: 'Strategy',
        items: [
          'Current vs. desired perception',
          'Audience clarification',
          'Brand positioning',
          'Differentiators',
          'Core brand message',
          'Brand personality',
        ],
      },
      {
        title: 'Atmosphere',
        items: [
          'Emotional direction',
          'Visual world / atmosphere board',
          'Creative direction',
          'Typography direction',
          'Color direction',
          'Imagery / art direction',
          'Texture, motion and style references',
        ],
      },
      {
        title: 'Identity',
        items: [
          'Primary logo',
          'Secondary logo / marks',
          'Color system',
          'Typography system',
          'Graphic elements',
          'Image direction',
          'Basic motion direction where appropriate',
        ],
      },
      {
        title: 'Brand System',
        items: [
          'Brand guidelines',
          'Final logo files',
          'Font and color specifications',
          'Usage examples',
          'Core templates relevant to the business',
        ],
      },
    ],
  },

  {
    number: '02',
    name: 'Reinvent',
    price: 'from $6,500',
    description:
      'For businesses changing not only how they look, but how they are positioned and experienced.',
    outcome:
      'We reinvent not only how the brand looks, but how people experience it.',
    groups: [
      {
        title: 'Everything in Rebrand',
        items: [
          'Discovery and audit',
          'Brand strategy',
          'Atmosphere',
          'Identity system',
          'Brand guidelines',
        ],
      },
      {
        title: 'Positioning + Messaging',
        items: [
          'Deeper positioning strategy',
          'Messaging hierarchy',
          'Brand story',
          'Value proposition',
          'Key messages',
          'Voice and tone direction',
          'Headline / tagline exploration where appropriate',
        ],
      },
      {
        title: 'Experience Strategy',
        items: [
          'Customer touchpoint mapping',
          'Experience gap analysis',
          'Priority interaction strategy',
          'Recommendations for the moments that matter most',
        ],
      },
      {
        title: 'Digital Experience',
        items: [
          'Website strategy',
          'Sitemap',
          'UX direction',
          'Custom website design',
          'Development',
          'Responsive / mobile design',
          'Interaction and motion design',
          'Basic SEO structure',
          'CMS setup',
          'Analytics setup',
        ],
      },
      {
        title: 'Key Touchpoints',
        items: [
          '2–4 selected priority touchpoints',
          'Packaging',
          'Menus',
          'Signage',
          'Social system',
          'Email',
          'Proposals',
          'Presentation decks',
          'Print or digital collateral',
        ],
      },
    ],
  },

  {
    number: '03',
    name: 'Relaunch',
    price: 'from $10,000',
    description:
      'For a business entering a meaningful new chapter and needing to introduce that change intentionally.',
    outcome:
      'You do not simply reveal a new identity. You introduce who the business has become.',
    groups: [
      {
        title: 'Transformation',
        items: [
          'Relevant Rebrand deliverables',
          'Relevant Reinvent deliverables',
          'Brand and experience transformation based on scope',
        ],
      },
      {
        title: 'Relaunch Strategy',
        items: [
          'Launch goals',
          'Audience priorities',
          'Rollout plan',
          'Internal / external considerations',
          'Messaging sequence',
          'Channel strategy',
          'Launch timeline',
        ],
      },
      {
        title: 'Launch Creative',
        items: [
          'Relaunch campaign concept',
          'Campaign art direction',
          'Photography direction',
          'Social launch campaign',
          'Email announcement',
          'Website launch experience',
          'Advertising creative',
          'Motion / video direction',
        ],
      },
      {
        title: 'The Reveal',
        items: [
          'Where we started',
          'How we have grown',
          'Who we have become',
          'Where we are going',
          'Narrative direction for introducing the change',
        ],
      },
      {
        title: 'Stewardship',
        items: [
          '30 days of post-launch support',
          'Implementation guidance',
          'Brand consistency review',
          'Launch refinements',
        ],
      },
    ],
  },
];

const comparisonRows = [
  {
    label: 'Discovery + audit',
    rebrand: 'yes',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Brand strategy',
    rebrand: 'yes',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Atmosphere direction',
    rebrand: 'yes',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Identity system',
    rebrand: 'yes',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Brand guidelines',
    rebrand: 'yes',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Positioning + messaging',
    rebrand: 'no',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Experience strategy',
    rebrand: 'no',
    reinvent: 'yes',
    relaunch: 'yes',
  },
  {
    label: 'Website strategy + design',
    rebrand: 'Add-on',
    reinvent: 'Included',
    relaunch: 'Included',
  },
  {
    label: 'Website development',
    rebrand: 'Add-on',
    reinvent: 'Included',
    relaunch: 'Included',
  },
  {
    label: 'Brand touchpoints',
    rebrand: 'Core assets',
    reinvent: '2–4',
    relaunch: 'Launch-driven',
  },
  {
    label: 'Relaunch strategy',
    rebrand: 'no',
    reinvent: 'no',
    relaunch: 'yes',
  },
  {
    label: 'Launch campaign creative',
    rebrand: 'no',
    reinvent: 'no',
    relaunch: 'yes',
  },
  {
    label: 'Reveal narrative',
    rebrand: 'no',
    reinvent: 'no',
    relaunch: 'yes',
  },
  {
    label: 'Post-launch stewardship',
    rebrand: 'no',
    reinvent: 'no',
    relaunch: '30 days',
  },
];

const digital = [
  {
    number: '01',
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
  },
  {
    number: '02',
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
  },
  {
    number: '03',
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
  },
  {
    number: '04',
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
  },
];

const stewardship = [
  {
    number: '01',
    title: 'Essential',
    price: '$300 / mo',
    description:
      'For occasional updates and small refinements.',
    detail: 'Up to 2 hours per month',
  },
  {
    number: '02',
    title: 'Growth',
    price: '$600 / mo',
    description:
      'For brands that need regular changes, new content and ongoing refinement.',
    detail: 'Up to 5 hours per month',
  },
  {
    number: '03',
    title: 'Partner',
    price: '$1,000 / mo',
    description:
      'For businesses that want an ongoing digital design and web partner.',
    detail: 'Up to 8–10 hours per month',
  },
];

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function PricingPage() {
  return (
    <main className="overflow-hidden bg-[#f2eee7] text-[#111111]">

      {/* NAV */}

      <header className="relative z-40 border-b border-black/15">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10">
          <Link
            href="/"
            className="text-[18px] font-black tracking-[-0.06em]"
          >
            LEX & HUE
          </Link>

          <nav className="hidden items-center gap-9 text-[10px] font-semibold uppercase tracking-[.16em] md:flex">
            <Link href="/">Home</Link>

            <a href="#transformation">
              Services
            </a>

            <a href="#digital">
              Digital
            </a>

            <a href="#stewardship">
              Stewardship
            </a>

            <Link
              href="/start-a-project"
              className="rounded-full bg-black px-6 py-3 text-white transition-colors duration-300 hover:bg-orange hover:text-black"
            >
              Start a project
            </Link>
          </nav>
        </div>
      </header>

     

      {/* BRAND TRANSFORMATION INTRO */}

      <section
        id="transformation"
        className="border-b border-black/15"
      >
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:px-12 lg:grid-cols-[1fr_.34fr] lg:items-end lg:px-16 lg:py-24">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[.13em] text-black/45">
              PRICING
            </p>

            <h2 className="mt-7 max-w-[950px] text-[clamp(3.3rem,6vw,6.3rem)] font sans uppercase leading-[.86] tracking-[-.065em]">
              Choose the level of

              <span
                className={`${cormorant.className} block font-medium italic normal-case leading-[.76] tracking-[-.03em] text-orange`}
              >
                transformation.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-black/50">
            These are not logo packages.
            They are progressively deeper engagements
            built around how much of the business
            needs to evolve.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}

      <section className="border-b border-black/15">
        <div className="mx-auto max-w-[1600px] overflow-x-auto">

          <div className="min-w-[880px]">

            {/* TABLE HEADER */}

            <div className="grid grid-cols-[1.25fr_repeat(3,1fr)] border-b border-black/15">

              <div className="px-8 py-10 md:px-10">
                <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-black/35">
                  What&apos;s included
                </p>
              </div>

              {transformations.map((offer) => (
                <div
                  key={offer.name}
                  className="border-l border-black/15 px-7 py-10"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-black/35">
                    {offer.number}
                  </p>

                  <h3
                    className={`${cormorant.className} mt-4 text-[clamp(2.5rem,3.5vw,4rem)] font-medium leading-none tracking-[-.035em]`}
                  >
                    {offer.name}
                  </h3>

                  <p className="mt-4 text-lg font-black tracking-[-.03em] text-orange">
                    {offer.price}
                  </p>
                </div>
              ))}
            </div>

            {/* TABLE ROWS */}

            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.25fr_repeat(3,1fr)] border-b border-black/10 last:border-b-0"
              >
                <div className="flex items-center px-8 py-5 md:px-10">
                  <span className="text-sm font-medium text-black/65">
                    {row.label}
                  </span>
                </div>

                <ComparisonCell value={row.rebrand} />
                <ComparisonCell value={row.reinvent} />
                <ComparisonCell value={row.relaunch} />
              </div>
            ))}

            {/* CTA ROW */}

            <div className="grid grid-cols-[1.25fr_repeat(3,1fr)] border-t border-black/15">
              <div />

              {transformations.map((offer) => (
                <div
                  key={offer.name}
                  className="border-l border-black/15 px-7 py-8"
                >
                  <Link
                    href="/start-a-project"
                    className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.13em]"
                  >
                    Start a project

                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FULL SCOPE ACCORDIONS */}

      <section className="border-b border-black/15">
        <div className="mx-auto max-w-[1600px]">

          <div className="px-6 py-12 md:px-10">
            <p className="text-[10px] font-medium uppercase tracking-[.13em] text-black/40">
              Need more detail?
            </p>

            <h3
              className={`${cormorant.className} mt-4 text-[clamp(2.4rem,4vw,4.2rem)] font-medium leading-none tracking-[-.03em]`}
            >
              View the full scope.
            </h3>
          </div>

          <div className="grid lg:grid-cols-3">
            {transformations.map((offer, index) => (
              <TransformationScope
                key={offer.name}
                offer={offer}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>

      {/* DIGITAL INTRO */}

      <section
        id="digital"
        className="border-b border-black/15"
      >
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:px-12 lg:grid-cols-[1fr_.34fr] lg:items-end lg:px-16 lg:py-24">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[.13em] text-black/45">
              Digital
            </p>

            <h2 className="mt-7 max-w-[950px] text-[clamp(3.3rem,6vw,6.3rem)] font-black uppercase leading-[.86] tracking-[-.065em]">
              When the website

              <span
                className={`${cormorant.className} block font-medium italic normal-case leading-[.76] tracking-[-.03em] text-orange`}
              >
                needs the work.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-black/50">
            Standalone digital work for businesses
            whose brand still works, but whose website
            no longer does.
          </p>
        </div>
      </section>

      {/* DIGITAL CARDS */}

      <section className="border-b border-black/15">
        <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">

          {digital.map((service, index) => (
            <DigitalCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}

        </div>
      </section>

      {/* DIGITAL NOTE */}

      <section className="border-b border-black/15 px-6 py-7 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="max-w-4xl text-[11px] leading-6 text-black/40">
            Platform website pricing generally assumes
            approximately 5–7 primary pages. Ecommerce,
            advanced integrations, large content libraries,
            custom functionality and expanded page counts
            are scoped separately.
          </p>
        </div>
      </section>

      {/* STEWARDSHIP */}

      <section
        id="stewardship"
        className="bg-[#111111] text-[#f2eee7]"
      >
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:px-12 lg:grid-cols-[1fr_.34fr] lg:items-end lg:px-16 lg:py-24">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[.13em] text-white/40">
              Ongoing Support
            </p>

            <h2 className="mt-7 text-[clamp(3.3rem,6vw,6rem)] font-black uppercase leading-[.84] tracking-[-.065em]">
              Site

              <span
                className={`${cormorant.className} block font-medium italic normal-case leading-[.76] tracking-[-.03em] text-orange`}
              >
                Stewardship.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-white/50">
            For brands that need ongoing updates,
            refinement and redesign work after the
            initial launch.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1600px] border-t border-white/15 md:grid-cols-3">

          {stewardship.map((plan, index) => (
            <motion.article
              key={plan.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease,
              }}
              className={`flex min-h-[390px] flex-col border-b border-white/15 px-6 py-11 md:px-10 ${
                index !== stewardship.length - 1
                  ? 'md:border-r'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <span className="text-[9px] uppercase tracking-[.12em] text-white/30">
                  Stewardship / {plan.number}
                </span>

                <span className="text-lg font-bold text-orange">
                  {plan.price}
                </span>
              </div>

              <h3
                className={`${cormorant.className} mt-10 text-[clamp(3.1rem,4.5vw,5rem)] font-medium leading-[.9] tracking-[-.035em]`}
              >
                {plan.title}
              </h3>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
                {plan.description}
              </p>

              <div className="mt-auto border-t border-white/15 pt-5">
                <p
                  className={`${cormorant.className} text-xl italic text-white/65`}
                >
                  {plan.detail}
                </p>
              </div>
            </motion.article>
          ))}

        </div>

        <div className="mx-auto max-w-[1600px] px-6 py-9 md:px-10">
          <p className="max-w-4xl text-[11px] leading-6 text-white/35">
            Stewardship may include content updates,
            layout refinements, landing pages, campaign
            changes, CMS management and ongoing visual
            improvements. Larger redesign and development
            projects are scoped separately.
          </p>
        </div>
      </section>

      {/* PRICING NOTES */}

      <section className="border-b border-black/15">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[.38fr_.62fr]">

          <div className="border-b border-black/15 px-6 py-20 md:px-12 lg:border-b-0 lg:border-r lg:px-14">
            <p className="text-[10px] font-medium uppercase tracking-[.13em] text-black/40">
              Before we begin
            </p>

            <h2 className="mt-7 max-w-[500px] text-[clamp(3rem,5vw,5rem)] font-black uppercase leading-[.88] tracking-[-.06em]">
              A note on

              <span
                className={`${cormorant.className} block font-medium italic normal-case leading-[.8] text-orange`}
              >
                pricing.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2">

            <Note
              number="01"
              title="Starting means starting."
            >
              Complexity, page count, integrations,
              touchpoints and launch needs determine
              the final investment.
            </Note>

            <Note
              number="02"
              title="Scope comes first."
            >
              Every project begins with a clearly
              defined proposal outlining deliverables,
              timeline and investment.
            </Note>

            <Note
              number="03"
              title="No unlimited anything."
            >
              Deliverables are intentionally defined
              so both sides know what is being created
              and why.
            </Note>

            <Note
              number="04"
              title="Payment plans are available."
            >
              Larger engagements may be divided into
              scheduled installments aligned with the
              project timeline.
            </Note>

          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-orange text-black">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 md:px-12 lg:grid-cols-[1fr_.4fr] lg:items-end lg:px-16 lg:py-28">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[.13em]">
              Not sure where you fit?
            </p>

            <h2 className="mt-7 max-w-[1000px] text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-[.8] tracking-[-.07em]">
              Tell us

              <span
                className={`${cormorant.className} ml-[.15em] inline-block font-medium italic normal-case tracking-[-.025em]`}
              >
                what changed.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-md text-base leading-7">
              You do not need to know which package
              you need before reaching out. Tell us
              where the business is and where it is
              going. We will help determine the scope.
            </p>

            <Link
              href="/start-a-project"
              className="group mt-10 inline-flex items-center gap-5 rounded-full bg-black px-8 py-5 text-[10px] font-bold uppercase tracking-[.15em] text-white transition-all duration-300 hover:bg-[#f2eee7] hover:text-black"
            >
              Start a project

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#111111] text-[#f2eee7]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10">

          <div className="text-4xl font-black tracking-[-.06em]">
            LEX & HUE
          </div>

          <p className="text-[9px] uppercase tracking-[.15em] text-white/40">
            Rebrand / Reinvent / Relaunch
          </p>

        </div>
      </footer>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                         COMPARISON CELL                                    */
/* -------------------------------------------------------------------------- */

function ComparisonCell({
  value,
}: {
  value: string;
}) {
  const yes = value === 'yes';
  const no = value === 'no';

  return (
    <div className="flex items-center justify-center border-l border-black/15 px-5 py-5 text-center">

      {yes && (
        <Check
          size={18}
          strokeWidth={1.7}
          className="text-orange"
        />
      )}

      {no && (
        <Minus
          size={17}
          strokeWidth={1.4}
          className="text-black/20"
        />
      )}

      {!yes && !no && (
        <span className="text-[12px] font-medium text-black/55">
          {value}
        </span>
      )}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       TRANSFORMATION SCOPE                                 */
/* -------------------------------------------------------------------------- */

function TransformationScope({
  offer,
  index,
}: {
  offer: (typeof transformations)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-t border-black/15 ${
        index !== transformations.length - 1
          ? 'lg:border-r'
          : ''
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-5 px-6 py-7 text-left md:px-10"
      >
        <div>
          <p className="text-[9px] uppercase tracking-[.12em] text-black/35">
            {offer.number}
          </p>

          <p
            className={`${cormorant.className} mt-2 text-3xl font-medium tracking-[-.03em]`}
          >
            {offer.name}
          </p>
        </div>

        <motion.span
          animate={{
            rotate: open ? 45 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="text-orange"
        >
          <Plus size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease,
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/10 px-6 pb-8 md:px-10">

              <p className="py-6 text-sm leading-6 text-black/55">
                {offer.description}
              </p>

              {offer.groups.map((group) => (
                <div
                  key={group.title}
                  className="border-t border-black/10 py-5"
                >
                  <h4
                    className={`${cormorant.className} text-2xl font-medium tracking-[-.025em]`}
                  >
                    {group.title}
                  </h4>

                  <div className="mt-4 grid gap-2">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 text-[13px] leading-5 text-black/50"
                      >
                        <Check
                          size={13}
                          className="mt-[3px] shrink-0 text-orange"
                        />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-black/10 pt-5">
                <p className="text-[9px] font-semibold uppercase tracking-[.13em] text-orange">
                  The outcome
                </p>

                <p
                  className={`${cormorant.className} mt-3 text-xl leading-7 text-black/70`}
                >
                  {offer.outcome}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            DIGITAL CARD                                    */
/* -------------------------------------------------------------------------- */

function DigitalCard({
  service,
  index,
}: {
  service: (typeof digital)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.06,
        ease,
      }}
      className={`flex min-h-[390px] flex-col border-b border-black/15 px-6 py-12 md:px-10 md:py-14 ${
        index % 2 === 0
          ? 'md:border-r'
          : ''
      }`}
    >

      <div className="flex items-start justify-between gap-6">
        <p className="text-[9px] font-medium uppercase tracking-[.12em] text-black/35">
          Digital / {service.number}
        </p>

        <p className="shrink-0 text-lg font-black tracking-[-.03em] text-orange md:text-xl">
          {service.price}
        </p>
      </div>

      <h3
        className={`${cormorant.className} mt-10 max-w-[650px] text-[clamp(3rem,4.5vw,5rem)] font-medium leading-[.9] tracking-[-.04em]`}
      >
        {service.title}
      </h3>

      <p className="mt-7 max-w-xl text-sm leading-7 text-black/55 md:text-[15px]">
        {service.description}
      </p>

      <div className="mt-auto pt-10">

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="group inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[.13em]"
        >
          What&apos;s included

          <motion.span
            animate={{
              rotate: open ? 45 : 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="text-orange"
          >
            <Plus size={17} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease,
              }}
              className="overflow-hidden"
            >
              <div className="mt-7 grid gap-3 border-t border-black/10 pt-6 sm:grid-cols-2">

                {service.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-[13px] leading-5 text-black/50"
                  >
                    <Check
                      size={13}
                      className="mt-[3px] shrink-0 text-orange"
                    />

                    <span>{item}</span>
                  </div>
                ))}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  NOTE                                      */
/* -------------------------------------------------------------------------- */

function Note({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="border-b border-black/15 px-6 py-9 md:px-9 md:[&:nth-child(odd)]:border-r">

      <span className="text-[9px] font-semibold text-orange">
        {number}
      </span>

      <h3
        className={`${cormorant.className} mt-5 text-[2rem] font-medium leading-none tracking-[-.025em]`}
      >
        {title}
      </h3>

      <p className="mt-5 max-w-sm text-sm leading-6 text-black/50">
        {children}
      </p>

    </article>
  );
}