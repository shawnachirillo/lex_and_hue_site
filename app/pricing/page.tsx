'use client';

import { useState } from 'react';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  ArrowUpRight,
  Check,
} from 'lucide-react';

import { digital } from '@/content/digital';
import { stewardship } from '@/content/stewardship';
import { transformations } from '@/content/transformations';

const ease = [0.22, 1, 0.36, 1] as const;

const OPEN_PROJECT_INQUIRY_EVENT =
  'open-project-inquiry';

function openProjectInquiry() {
  window.dispatchEvent(
    new CustomEvent(
      OPEN_PROJECT_INQUIRY_EVENT
    )
  );
}

const display = {
  fontFamily:
    '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

const courier = {
  fontFamily:
    '"Courier New", Courier, monospace',
} as const;

type FocusedService = {
  title: string;
  price?: string;
  description: string;
  items: readonly string[];
  bestFor: string;
};

type CapabilityId =
  | 'brand'
  | 'web'
  | 'product'
  | 'systems';

  const brandServices: readonly FocusedService[] = [
    {
      title: 'Brand Identity',
      price: 'from $2,000',
      description:
        'A focused identity engagement for businesses that need a stronger visual foundation without a larger transformation.',
      items: [
        'Visual direction',
        'Primary logo',
        'Secondary logo / marks',
        'Color system',
        'Typography system',
        'Core graphic elements',
        'Basic usage guidance',
      ],
      bestFor:
        'Businesses that need a distinct, cohesive identity without repositioning the entire company.',
    },
    {
      title: 'Brand Direction',
      price: 'from $1,000',
      description:
        'Focused creative direction for an existing brand that needs greater consistency, clarity or visual range.',
      items: [
        'Existing identity review',
        'Art direction',
        'Typography direction',
        'Color refinement',
        'Image direction',
        'Digital brand expression',
      ],
      bestFor:
        'Established brands with usable foundations that need a clearer visual system.',
    },
  ];
  const productServices: readonly FocusedService[] = [
    {
      title: 'Digital Product',
      price: 'Custom quote',
      description:
        'Custom user-facing software designed around a specific product, service or customer experience.',
      items: [
        'Product discovery',
        'UX architecture',
        'Interface design',
        'Responsive experience',
        'Full-stack development',
        'Database integration',
        'Authentication where required',
      ],
      bestFor:
        'Businesses building a portal, dashboard, membership experience, booking product or web application.',
    },
    {
      title: 'MVP',
      price: 'Custom quote',
      description:
        'A focused first version of a digital product built to validate the idea and establish a foundation for growth.',
      items: [
        'Feature prioritization',
        'User flows',
        'UX / UI',
        'Core application development',
        'Database architecture',
        'Deployment',
        'Launch support',
      ],
      bestFor:
        'Founders and businesses that need to get a real product into use without building every future feature at once.',
    },
  ];
  const systemsServices: readonly FocusedService[] = [
    {
      title: 'Custom System',
      price: 'Custom quote',
      description:
        'Purpose-built software for an operational problem that off-the-shelf tools do not solve well.',
      items: [
        'Workflow discovery',
        'System architecture',
        'Internal tool design',
        'Custom development',
        'Database design',
        'Integrations',
        'Role-based access where required',
      ],
      bestFor:
        'Businesses relying on disconnected tools, manual processes or workflows that have outgrown their current setup.',
    },
    {
      title: 'Automation + Integration',
      price: 'Custom quote',
      description:
        'Focused systems work that connects tools, removes repetitive work and improves how information moves through the business.',
      items: [
        'Workflow audit',
        'Process mapping',
        'API integrations',
        'Automation',
        'Data flows',
        'AI-enabled functionality where useful',
      ],
      bestFor:
        'Businesses that do not need an entirely new platform but do need their existing technology to work together.',
    },
  ];

const capabilities = [
  {
    id: 'brand',
    label: 'Brand',
  },
  {
    id: 'web',
    label: 'Web',
  },
  {
    id: 'product',
    label: 'Product',
  },
  {
    id: 'systems',
    label: 'Systems',
  },
] as const;

export default function PricingPage() {
  const [selectedOffer, setSelectedOffer] =
    useState<
      (typeof transformations)[number] | null
    >(null);

  const [
    selectedStewardship,
    setSelectedStewardship,
  ] = useState<
    (typeof stewardship)[number] | null
  >(null);

  const [
    selectedFocused,
    setSelectedFocused,
  ] = useState<FocusedService | null>(null);

  const [
    activeCapability,
    setActiveCapability,
  ] = useState<CapabilityId>('web');

  const focusedServices =
    activeCapability === 'brand'
      ? brandServices
      : activeCapability === 'web'
        ? digital
        : activeCapability === 'product'
          ? productServices
          : systemsServices;

  return (
    <main className="overflow-hidden bg-bone text-ink">
      {/* =========================================
          TRANSFORMATIONS
      ========================================= */}

      <section
        id="transformation"
        className="bg-[#252422] text-bone"
      >
        <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-12 md:px-10 md:pb-12 md:pt-16 lg:px-12">
          <p
            className="text-[12px] font-bold uppercase text-orange"
            style={courier}
          >
            TRANSFORMATION
          </p>

          <h1
  className="mt-5 max-w-[850px] text-[44px] uppercase leading-[0.9] sm:text-[54px] md:text-[64px] lg:text-[72px]"
  style={display}
>
  Brand
  <span className="font-editorial ml-[0.15em] font-normal italic normal-case text-orange">
    Transformation.
  </span>
</h1>

<p
  className="mt-6 max-w-[580px] text-[14px] leading-6 text-bone/65 md:text-[15px]"
  style={courier}
>
  Rebrand, reinvent or relaunch an established
  business as it enters its next chapter.
</p>
        </div>

        <div className="mx-auto max-w-[1500px] border-t border-bone/15">
          <div className="grid md:grid-cols-3">
            {transformations.map(
              (offer, index) => (
                <TransformationCard
                  key={offer.name}
                  offer={offer}
                  index={index}
                  onOpen={() =>
                    setSelectedOffer(offer)
                  }
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          FOCUSED SERVICES
      ========================================= */}

      <section
        id="focused-services"
        className="bg-bone"
      >
        <div className="mx-auto max-w-[1500px] px-5 pb-8 pt-12 md:px-10 md:pt-16 lg:px-12">
          <p
            className="text-[12px] font-bold uppercase text-orange"
            style={courier}
          >
            FOCUSED SERVICES
          </p>

          <h2
            className="mt-5 max-w-[780px] text-[42px] uppercase leading-[0.9] sm:text-[52px] md:text-[62px] lg:text-[68px]"
            style={display}
          >
            When one part
            <span className="font-editorial block font-normal italic normal-case text-orange">
              needs the work.
            </span>
          </h2>

          <p
            className="mt-6 max-w-[580px] text-[14px] leading-6 text-black/55 md:text-[15px]"
            style={courier}
          >
            Focused engagements for businesses
            that do not need a full
            transformation.
          </p>
        </div>

        {/* CAPABILITY SELECTOR */}

        <div className="mx-auto max-w-[1500px] px-5 pt-5 md:px-10 lg:px-12">
          <div className="no-scrollbar flex overflow-x-auto border-y border-black/15">
            {capabilities.map(
              (capability) => {
                const active =
                  activeCapability ===
                  capability.id;

                return (
                  <button
                    key={capability.id}
                    type="button"
                    onClick={() =>
                      setActiveCapability(
                        capability.id
                      )
                    }
                    className={`relative shrink-0 px-5 py-5 text-left transition-colors duration-300 sm:flex-1 md:px-6 ${
                      active
                        ? 'text-orange'
                        : 'text-black/45 hover:text-black'
                    }`}
                  >
                    <span
                      className="text-[22px] uppercase md:text-[26px] lg:text-[30px]"
                      style={display}
                    >
                      {capability.label}
                    </span>

                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-orange"
                      initial={false}
                      animate={{
                        scaleX: active
                          ? 1
                          : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease,
                      }}
                    />
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ACTIVE CAPABILITY */}

        <div className="mx-auto max-w-[1500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCapability}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
                ease,
              }}
              className="grid md:grid-cols-2"
            >
              {focusedServices.map(
                (service, index) => (
                  <FocusedServiceCard
                    key={service.title}
                    service={service}
                    index={index}
                    capability={
                      activeCapability
                    }
                    onOpen={() =>
                      setSelectedFocused(
                        service
                      )
                    }
                  />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================
          STEWARDSHIP
      ========================================= */}

      <section
        id="stewardship"
        className="bg-black text-bone"
      >
        <div className="mx-auto max-w-[1500px] px-5 pb-9 pt-12 md:px-10 md:pt-16 lg:px-12">
          <p
            className="text-[12px] font-bold uppercase text-orange"
            style={courier}
          >
            ONGOING SUPPORT
          </p>

          <h2
            className="mt-5 max-w-[760px] text-[42px] uppercase leading-[0.9] sm:text-[52px] md:text-[62px] lg:text-[68px]"
            style={display}
          >
            Site
            <span className="font-editorial ml-[0.15em] font-normal italic normal-case text-orange">
              Stewardship.
            </span>
          </h2>

          <p
            className="mt-6 max-w-[580px] text-[14px] leading-6 text-white/55 md:text-[15px]"
            style={courier}
          >
            Ongoing updates, refinements and
            redesign support after launch.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1500px] border-t border-white/15 md:grid-cols-3">
          {stewardship.map(
            (plan, index) => (
              <StewardshipCard
                key={plan.title}
                plan={plan}
                index={index}
                onOpen={() =>
                  setSelectedStewardship(
                    plan
                  )
                }
              />
            )
          )}
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}

      <section className="bg-orange text-black">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-14 md:px-10 md:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12">
          <h2
            className="max-w-[850px] text-[44px] uppercase leading-[0.88] sm:text-[54px] md:text-[64px] lg:text-[72px]"
            style={display}
          >
            Not sure where
            <span className="font-editorial block font-normal italic normal-case text-bone">
              you fit?
            </span>
          </h2>

          <button
            type="button"
            onClick={openProjectInquiry}
            className="group inline-flex w-fit items-center gap-4 rounded-full bg-black px-7 py-4 text-bone transition-colors duration-300 hover:bg-bone hover:text-black"
            style={courier}
          >
            <span className="text-[11px] font-bold uppercase">
              Tell us what you need
            </span>

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>

      {/* =========================================
          MODALS
      ========================================= */}

      <AnimatePresence>
        {selectedOffer && (
          <TransformationModal
            offer={selectedOffer}
            onClose={() =>
              setSelectedOffer(null)
            }
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFocused && (
          <FocusedServiceModal
            service={selectedFocused}
            capability={
              activeCapability
            }
            onClose={() =>
              setSelectedFocused(null)
            }
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedStewardship && (
          <StewardshipModal
            plan={selectedStewardship}
            onClose={() =>
              setSelectedStewardship(null)
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* =========================================
   TRANSFORMATION CARD
========================================= */

function TransformationCard({
  offer,
  index,
  onOpen,
}: {
  offer: (typeof transformations)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease,
      }}
      className={`border-b border-bone/15 md:border-b-0 ${
        index !==
        transformations.length - 1
          ? 'md:border-r md:border-bone/15'
          : ''
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group flex min-h-[250px] w-full flex-col px-5 py-7 text-left transition-colors duration-300 hover:bg-black/10 md:px-7 md:py-8"
      >
      
        <h3
          className="mt-7 text-[34px] uppercase leading-none text-bone md:text-[40px] lg:text-[44px]"
          style={display}
        >
          {offer.name}
        </h3>

        <p className="font-editorial mt-2 text-[23px] italic text-orange">
          {offer.price}
        </p>

        <p
          className="mt-5 max-w-sm text-[12px] leading-5 text-bone/60 md:text-[13px]"
          style={courier}
        >
          {offer.description}
        </p>

        <span
          className="mt-auto pt-6 text-[10px] font-bold uppercase text-bone"
          style={courier}
        >
          View full scope →
        </span>
      </button>
    </motion.article>
  );
}

/* =========================================
   FOCUSED SERVICE CARD
========================================= */

function FocusedServiceCard({
  service,
  index,
  capability,
  onOpen,
}: {
  service: FocusedService;
  index: number;
  capability: CapabilityId;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease,
      }}
      className={`border-b border-black/15 ${
        index % 2 === 0
          ? 'md:border-r'
          : ''
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group flex min-h-[235px] w-full flex-col px-5 py-7 text-left transition-colors duration-300 hover:bg-black/[0.035] md:px-8 md:py-8"
      >
        <div className="flex items-start justify-between gap-5">
          <p
            className="text-[10px] font-bold uppercase text-black/40"
            style={courier}
          >
            {capability}
          </p>

          <ArrowUpRight
            size={17}
            className="text-orange transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>

        <div className="mt-7 flex items-start justify-between gap-6">
          <h3
            className="max-w-[500px] text-[30px] uppercase leading-[0.95] md:text-[36px]"
            style={display}
          >
            {service.title}
          </h3>

          {service.price && (
            <p className="font-editorial shrink-0 text-[21px] italic text-orange">
              {service.price}
            </p>
          )}
        </div>

        <p
          className="mt-5 max-w-xl text-[12px] leading-5 text-black/55 md:text-[13px]"
          style={courier}
        >
          {service.description}
        </p>

        <span
          className="mt-auto pt-6 text-[10px] font-bold uppercase"
          style={courier}
        >
          View scope →
        </span>
      </button>
    </motion.article>
  );
}

/* =========================================
   BASE MODAL
========================================= */

function ModalShell({
  children,
  onClose,
  dark = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/65 p-3 backdrop-blur-sm md:p-5"
      onMouseDown={(event) => {
        if (
          event.currentTarget ===
          event.target
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: 35,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: 35,
        }}
        transition={{
          duration: 0.35,
          ease,
        }}
        className={`ml-auto flex h-full w-full max-w-[820px] flex-col overflow-hidden shadow-2xl ${
          dark
            ? 'bg-black text-bone'
            : 'bg-bone text-ink'
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function CloseButton({
  onClose,
  dark = false,
}: {
  onClose: () => void;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[22px] transition-colors duration-300 ${
        dark
          ? 'border-white/20 hover:border-orange hover:text-orange'
          : 'border-black/20 hover:border-orange hover:text-orange'
      }`}
    >
      ×
    </button>
  );
}

/* =========================================
   TRANSFORMATION MODAL
========================================= */

function TransformationModal({
  offer,
  onClose,
}: {
  offer: (typeof transformations)[number];
  onClose: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="flex items-start justify-between border-b border-black/15 px-6 py-6 md:px-9">
        <div>
          <p
            className="text-[10px] font-bold uppercase text-orange"
            style={courier}
          >
            TRANSFORMATION
          </p>

          <h2
            className="mt-3 text-[38px] uppercase leading-none md:text-[48px]"
            style={display}
          >
            {offer.name}
          </h2>

          <p className="font-editorial mt-2 text-[25px] italic text-orange">
            {offer.price}
          </p>
        </div>

        <CloseButton
          onClose={onClose}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-7 md:px-9">
        <p
          className="max-w-2xl text-[14px] leading-6 text-black/60"
          style={courier}
        >
          {offer.description}
        </p>

        <div className="mt-7 grid gap-x-9 md:grid-cols-2">
          {offer.groups.map((group) => (
            <section
              key={group.title}
              className="border-t border-black/15 py-5"
            >
              <h3
                className="text-[18px] uppercase"
                style={display}
              >
                {group.title}
              </h3>

              <div className="mt-4 grid gap-2">
                {group.items.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex gap-3 text-[12px] leading-5 text-black/55"
                      style={courier}
                    >
                      <Check
                        size={13}
                        className="mt-[3px] shrink-0 text-orange"
                      />
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-black/15 pt-6">
          <p
            className="text-[10px] font-bold uppercase text-orange"
            style={courier}
          >
            THE OUTCOME
          </p>

          <p className="font-editorial mt-3 max-w-2xl text-[25px] italic leading-8">
            {offer.outcome}
          </p>
        </div>
      </div>

      <ModalCTA />
    </ModalShell>
  );
}

/* =========================================
   FOCUSED SERVICE MODAL
========================================= */

function FocusedServiceModal({
  service,
  capability,
  onClose,
}: {
  service: FocusedService;
  capability: CapabilityId;
  onClose: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="flex items-start justify-between border-b border-black/15 px-6 py-6 md:px-9">
        <div>
          <p
            className="text-[10px] font-bold uppercase text-orange"
            style={courier}
          >
            {capability}
          </p>

          <h2
            className="mt-3 max-w-[620px] text-[36px] uppercase leading-[0.95] md:text-[46px]"
            style={display}
          >
            {service.title}
          </h2>

          {service.price && (
            <p className="font-editorial mt-2 text-[24px] italic text-orange">
              {service.price}
            </p>
          )}
        </div>

        <CloseButton
          onClose={onClose}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-7 md:px-9">
        <p
          className="max-w-2xl text-[14px] leading-6 text-black/60"
          style={courier}
        >
          {service.description}
        </p>

        <section className="mt-7 border-t border-black/15 py-6">
          <h3
            className="text-[18px] uppercase"
            style={display}
          >
            What&apos;s included
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.items.map(
              (item) => (
                <div
                  key={item}
                  className="flex gap-3 text-[12px] leading-5 text-black/55"
                  style={courier}
                >
                  <Check
                    size={13}
                    className="mt-[3px] shrink-0 text-orange"
                  />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </section>

        <div className="border-t border-black/15 pt-6">
          <p
            className="text-[10px] font-bold uppercase text-orange"
            style={courier}
          >
            BEST FOR
          </p>

          <p className="font-editorial mt-3 max-w-2xl text-[24px] italic leading-8 text-black/80">
            {service.bestFor}
          </p>
        </div>
      </div>

      <ModalCTA />
    </ModalShell>
  );
}

/* =========================================
   STEWARDSHIP
========================================= */

function StewardshipCard({
  plan,
  index,
  onOpen,
}: {
  plan: (typeof stewardship)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 16,
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
        duration: 0.5,
        delay: index * 0.05,
        ease,
      }}
      className={`border-b border-white/15 md:border-b-0 ${
        index !==
        stewardship.length - 1
          ? 'md:border-r md:border-white/15'
          : ''
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group flex min-h-[245px] w-full flex-col px-5 py-7 text-left transition-colors duration-300 hover:bg-white/[0.04] md:px-7 md:py-8"
      >
        

        <h3
          className="mt-7 text-[32px] uppercase leading-none md:text-[38px]"
          style={display}
        >
          {plan.title}
        </h3>

        <p className="font-editorial mt-2 text-[23px] italic text-orange">
          {plan.price}
        </p>

        <p
          className="mt-5 max-w-sm text-[12px] leading-5 text-white/55 md:text-[13px]"
          style={courier}
        >
          {plan.description}
        </p>

        <span
          className="mt-auto pt-6 text-[10px] font-bold uppercase"
          style={courier}
        >
          View scope →
        </span>
      </button>
    </motion.article>
  );
}

function StewardshipModal({
  plan,
  onClose,
}: {
  plan: (typeof stewardship)[number];
  onClose: () => void;
}) {
  return (
    <ModalShell
      onClose={onClose}
      dark
    >
      <div className="flex items-start justify-between border-b border-white/15 px-6 py-6 md:px-9">
        <div>
          <p
            className="text-[10px] font-bold uppercase text-orange"
            style={courier}
          >
            STEWARDSHIP
          </p>

          <h2
            className="mt-3 text-[38px] uppercase leading-none md:text-[48px]"
            style={display}
          >
            {plan.title}
          </h2>

          <p className="font-editorial mt-2 text-[25px] italic text-orange">
            {plan.price}
          </p>
        </div>

        <CloseButton
          onClose={onClose}
          dark
        />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-7 md:px-9">
        <p
          className="max-w-2xl text-[14px] leading-6 text-white/60"
          style={courier}
        >
          {plan.description}
        </p>

        {plan.detail ? (
          <p className="font-editorial mt-4 text-[22px] italic text-white/70">
            {plan.detail}
          </p>
        ) : null}

        <section className="mt-7 border-t border-white/15 py-6">
          <h3
            className="text-[18px] uppercase"
            style={display}
          >
            What&apos;s included
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {plan.items.map((item) => (
              <div
                key={item}
                className="flex gap-3 text-[12px] leading-5 text-white/55"
                style={courier}
              >
                <Check
                  size={13}
                  className="mt-[3px] shrink-0 text-orange"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15 pt-6">
          <p
            className="text-[10px] font-bold uppercase text-orange"
            style={courier}
          >
            BEST FOR
          </p>

          <p className="font-editorial mt-3 max-w-2xl text-[24px] italic leading-8 text-white/75">
            {plan.bestFor}
          </p>
        </div>
      </div>

      <ModalCTA dark />
    </ModalShell>
  );
}

function ModalCTA({
  dark = false,
}: {
  dark?: boolean;
}) {
  return (
    <div
      className={`flex justify-end border-t px-6 py-5 md:px-9 ${
        dark
          ? 'border-white/15'
          : 'border-black/15'
      }`}
    >
      <button
        type="button"
        onClick={openProjectInquiry}
        className={`group inline-flex items-center gap-4 rounded-full px-6 py-3.5 transition-colors duration-300 ${
          dark
            ? 'bg-orange text-black hover:bg-bone'
            : 'bg-black text-bone hover:bg-orange hover:text-black'
        }`}
        style={courier}
      >
        <span className="text-[10px] font-bold uppercase">
          Start a project
        </span>

        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}