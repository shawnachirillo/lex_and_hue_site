'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import {
  capabilities,
  type Capability,
  type CapabilityId,
} from '@/content/capabilities';

const condensedBlack = {
  fontFamily: '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 900,
} as const;

function displayName(capability: Capability) {
  return capability.id === 'systems'
    ? 'SYSTEM'
    : capability.name.toUpperCase();
}

export default function Capabilities() {
  const [activeId, setActiveId] =
    useState<CapabilityId | null>(null);

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-bone px-5 py-12 text-ink md:px-10 md:py-14 lg:px-10 lg:py-16 xl:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* SECTION LABEL */}
        <motion.p
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="text-[11px] font-bold uppercase text-black/85"
  style={{ fontFamily: '"Courier New", Courier, monospace' }}
>
  WHAT WE DO
</motion.p>

        {/* =====================================================
            DESKTOP
        ===================================================== */}
        <div
          className="relative mt-10 hidden min-h-[210px] lg:block"
          onMouseLeave={() => setActiveId(null)}
        >
          
          <div className="absolute left-[6%] top-0 flex w-[96%] max-w-[1280px] items-start">
           
            <div className="w-[43%] shrink-0">
              <div className="flex flex-col items-end">
                {capabilities.map((capability) => {
                  const isActive =
                    activeId === capability.id;

                  return (
                    <button
                      key={capability.id}
                      type="button"
                      onMouseEnter={() =>
                        setActiveId(capability.id)
                      }
                      onFocus={() =>
                        setActiveId(capability.id)
                      }
                      className={`block w-full text-right transition-colors duration-200 ${
                        isActive
                          ? 'text-orange'
                          : 'text-ink hover:text-orange'
                      }`}
                    >
                      <span
                        className="block whitespace-nowrap text-[68px] uppercase leading-[0.94] xl:text-[86px] 2xl:text-[78px]"
                        style={condensedBlack}
                      >
                        {displayName(capability)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ===============================================
                FIXED INFO REGION
            =============================================== */}
            <div className="relative ml-7 min-h-[230px] min-w-0 flex-1 xl:ml-9">
              <AnimatePresence mode="wait">
                {activeId && (
                  <ActiveCapabilityInfo
                    key={activeId}
                    activeId={activeId}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* =====================================================
            TABLET / MOBILE
        ===================================================== */}
        <div className="mt-8 lg:hidden">
          <div className="w-full max-w-[720px]">
            {capabilities.map((capability) => {
              const isActive =
                activeId === capability.id;

              return (
                <div
                  key={capability.id}
                  className="w-full"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveId(
                        isActive
                          ? null
                          : capability.id
                      )
                    }
                    aria-expanded={isActive}
                    className={`block w-full transition-colors duration-200 ${
                      isActive
                        ? 'text-orange'
                        : 'text-ink'
                    }`}
                  >
                    <span
                      className="block whitespace-nowrap text-left text-[42px] uppercase leading-[0.95] sm:text-[62px] md:text-[62px]"
                      style={condensedBlack}
                    >
                      {displayName(capability)}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
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
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pt-3">
                          <CapabilityInfo
                            capability={capability}
                            mobile
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP ACTIVE INFO

   Each capability gets the EXACT SAME information structure.
   Only its vertical row changes.
========================================================= */

function ActiveCapabilityInfo({
  activeId,
}: {
  activeId: CapabilityId;
}) {
  const capability = capabilities.find(
    (item) => item.id === activeId
  );

  if (!capability) {
    return null;
  }

  /*
    Matches the three permanent title rows.

    BRAND
    EXPERIENCE
    SYSTEM

    The information starts at the same X position for every row.
  */
  const rowTop: Record<CapabilityId, number> = {
    brand: 0,
    experience: 66,
    systems: 132,
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -8,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 5,
      }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-0 w-full"
      style={{
        top: rowTop[activeId],
      }}
    >
      <CapabilityInfo capability={capability} />
    </motion.div>
  );
}

/* =========================================================
   SHARED INFORMATION STRUCTURE

   IMPORTANT:
   BRAND / EXPERIENCE / SYSTEM all use this exact component.

   Desktop:
   statement | 3 services
             | 2 services

   So all three active states have identical geometry.
========================================================= */

function CapabilityInfo({
  capability,
  mobile = false,
}: {
  capability: Capability;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <div>
        <p className="font-editorial text-[20px] font-normal italic leading-[1.05] sm:text-[22px]">
          {capability.statement}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-x-5 sm:grid-cols-3">
          {capability.examples.map(
            (example, index) => (
              <ServiceItem
                key={example}
                example={example}
                index={index}
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 items-start">
      {/* STATEMENT — SAME WIDTH FOR EVERY CAPABILITY */}
      <div className="w-[180px] shrink-0 xl:w-[205px]">
        <p className="font-editorial text-[17px] font-normal italic leading-[1.05] xl:text-[19px]">
          {capability.statement}
        </p>
      </div>

      {/* SERVICES — SAME GRID FOR EVERY CAPABILITY */}
      <div className="ml-5 grid min-w-0 flex-1 grid-cols-3 gap-x-4 xl:ml-7 xl:gap-x-5">
        {capability.examples.map(
          (example, index) => (
            <ServiceItem
              key={example}
              example={example}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE ITEM

   Same Illustrator treatment everywhere:
   thin top line
   orange number
   tiny black service name
========================================================= */

function ServiceItem({
  example,
  index,
}: {
  example: string;
  index: number;
}) {
  return (
    <div className="min-w-0 border-t border-black/15 py-2">
      <div className="flex min-w-0 items-start gap-2">
        <span className="shrink-0 font-mono text-[8px] font-bold leading-[1.2] text-orange">
          0{index + 1}
        </span>

        <span className="min-w-0 font-mono text-[8px] font-bold uppercase leading-[1.2] xl:text-[9px]">
          {example}
        </span>
      </div>
    </div>
  );
}