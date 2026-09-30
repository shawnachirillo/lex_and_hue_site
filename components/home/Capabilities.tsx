'use client';

import AnimatedEyebrow from '@/components/ui/AnimatedEyebrow';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import {
  useRef,
  useState,
} from 'react';

import {
  capabilities,
  type Capability,
  type CapabilityId,
} from '@/content/capabilities';

const condensedBlack = {
  fontFamily:
    '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 900,
} as const;

const courier = {
  fontFamily:
    '"Courier New", Courier, monospace',
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

function displayName(
  capability: Capability
) {
  return capability.id === 'systems'
    ? 'SYSTEM'
    : capability.name.toUpperCase();
}

export default function Capabilities() {
  const [activeId, setActiveId] =
    useState<CapabilityId | null>(null);

  const sectionRef =
    useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 1],
    reduceMotion
      ? [0, 0, 0, 0]
      : [34, 0, 0, -18]
  );

  const workHandoffY = useTransform(
    scrollYProgress,
    [0.62, 1],
    reduceMotion
      ? ['100%', '100%']
      : ['100%', '0%']
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden bg-bone py-12 text-ink md:py-14 lg:py-16"
    >
      {/* TOP ORANGE HANDOFF LINE */}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left bg-orange"
        initial={
          reduceMotion
            ? false
            : {
                scaleX: 0,
              }
        }
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        transition={{
          duration: 1.15,
          ease,
        }}
      />

      {/* EYEBROW */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-10 xl:px-12">
        <AnimatedEyebrow
          phrases={[
            'WHAT WE DO',
            'WHAT WE DESIGN',
            'WHAT WE BUILD',
            'WHAT WE CHANGE',
          ]}
          loop
        />
      </div>

      {/* MAIN CONTENT */}

      <motion.div
        className="relative z-10 mt-10"
        style={{
          y: contentY,
        }}
      >
       {/* =====================================================
    DESKTOP
===================================================== */}

<div
  className="relative hidden lg:block"
  onMouseLeave={() => setActiveId(null)}
>
  {capabilities.map((capability, index) => {
    const isActive =
      activeId === capability.id;

    return (
      <motion.div
        key={capability.id}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                x: -55,
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          duration: 0.9,
          delay: 0.12 + index * 0.13,
          ease,
        }}
        className="relative w-full"
      >
        {/* BLACK ACTIVE FIELD
            Absolute so activating a row does NOT
            alter the surrounding layout.
        */}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scaleY: isActive ? 1 : 0.82,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          style={{
            transformOrigin: 'center',
          }}
        />

        <div className="relative z-10 mx-auto flex h-[86px] w-full max-w-[1500px] items-center px-10 xl:px-12">
          {/* CAPABILITY TITLE */}

          <div className="flex w-[49%] shrink-0 justify-end">
            <button
              type="button"
              onMouseEnter={() =>
                setActiveId(capability.id)
              }
              onFocus={() =>
                setActiveId(capability.id)
              }
              className="group flex h-[86px] w-[88%] cursor-pointer flex-col justify-center text-right"
            >
              <span
                className={`block whitespace-nowrap text-[68px] uppercase leading-[0.82] transition-colors duration-500 xl:text-[86px] 2xl:text-[78px] ${
                  isActive
                    ? 'text-bone'
                    : 'text-ink'
                }`}
                style={condensedBlack}
              >
                {displayName(capability)}
              </span>

              {/* INTERACTION RULE */}

              <motion.span
                aria-hidden="true"
                className={`ml-auto mt-[7px] block h-px ${
                  isActive
                    ? 'bg-orange'
                    : 'bg-black/20'
                }`}
                initial={false}
                animate={{
                  width: isActive
                    ? '100%'
                    : '72%',
                }}
                transition={{
                  duration: 0.55,
                  ease,
                }}
              />
            </button>
          </div>

          {/* ACTIVE INFORMATION */}

          <div
            className="flex h-full min-w-0 flex-1 items-center pl-7 xl:pl-9"
            onMouseEnter={() => {
              if (isActive) {
                setActiveId(
                  capability.id
                );
              }
            }}
          >
            <AnimatePresence
              initial={false}
              mode="wait"
            >
              {isActive && (
                <motion.div
                  key={capability.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 8,
                  }}
                  transition={{
                    duration: 0.45,
                    ease,
                  }}
                  className="flex w-full items-center"
                >
                  <CapabilityInfo
                    capability={
                      capability
                    }
                    desktopActive
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  })}
</div>
        {/* =====================================================
            TABLET / MOBILE
        ===================================================== */}

        <div className="px-5 md:px-10 lg:hidden">
          <div className="w-full">
            {capabilities.map(
              (capability, index) => {
                const isActive =
                  activeId ===
                  capability.id;

                return (
                  <motion.div
                    key={capability.id}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.7,
                      delay:
                        0.08 +
                        index * 0.1,
                      ease,
                    }}
                    className="border-t border-black/20"
                  >
                    {/* CAPABILITY ROW */}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveId(
                          isActive
                            ? null
                            : capability.id
                        )
                      }
                      aria-expanded={
                        isActive
                      }
                      className="flex w-full items-center justify-between gap-6 py-4 text-ink"
                    >
                      <span
                        className="whitespace-nowrap text-left text-[42px] uppercase leading-[0.95] sm:text-[62px] md:text-[62px]"
                        style={
                          condensedBlack
                        }
                      >
                        {displayName(
                          capability
                        )}
                      </span>

                      <motion.span
                        aria-hidden="true"
                        animate={{
                          rotate:
                            isActive
                              ? 45
                              : 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease,
                        }}
                        className="shrink-0 text-[30px] font-normal leading-none text-ink"
                        style={courier}
                      >
                        +
                      </motion.span>
                    </button>

                    {/* BLACK MOBILE PANEL */}

                    <AnimatePresence
                      initial={false}
                    >
                      {isActive && (
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  height: 0,
                                  opacity: 0,
                                }
                          }
                          animate={{
                            height: 'auto',
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            height: {
                              duration: 0.55,
                              ease,
                            },
                            opacity: {
                              duration: 0.3,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="bg-black px-5 py-6 text-bone sm:px-7 sm:py-7">
                            <CapabilityInfo
                              capability={
                                capability
                              }
                              mobile
                              inverted
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }
            )}

            <div className="border-t border-black/20" />
          </div>
        </div>
      </motion.div>

      {/* CAPABILITIES → WORK HANDOFF */}

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[70px] bg-black"
          style={{
            y: workHandoffY,
          }}
        />
      )}
    </section>
  );
}

/* =========================================================
   SHARED CAPABILITY INFORMATION
========================================================= */

function CapabilityInfo({
  capability,
  mobile = false,
  inverted = false,
  desktopActive = false,
}: {
  capability: Capability;
  mobile?: boolean;
  inverted?: boolean;
  desktopActive?: boolean;
}) {
  /*
   * MOBILE BLACK PANEL
   */
  if (mobile) {
    return (
      <div>
        <p
          className={`font-editorial text-[20px] font-normal italic leading-[1.05] sm:text-[22px] ${
            inverted
              ? 'text-orange'
              : 'text-ink'
          }`}
        >
          {capability.statement}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-5 sm:grid-cols-3">
          {capability.examples.map(
            (example, index) => (
              <ServiceItem
                key={example}
                example={example}
                index={index}
                inverted={inverted}
              />
            )
          )}
        </div>
      </div>
    );
  }

  /*
   * DESKTOP ACTIVE BLACK ROW
   */
  if (desktopActive) {
    return (
      <div className="flex w-full min-w-0 items-start">
        <div className="flex w-[210px] shrink-0 items-center xl:w-[235px]">
  <p className="translate-y-[6px] font-editorial text-[17px] font-normal italic leading-[1.05] text-orange xl:text-[19px]">
    {capability.statement}
  </p>
</div>

        <div className="ml-5 grid min-w-0 flex-1 grid-cols-3 gap-x-4 xl:ml-7 xl:gap-x-5">
          {capability.examples.map(
            (example, index) => (
              <ServiceItem
                key={example}
                example={example}
                index={index}
                inverted
              />
            )
          )}
        </div>
      </div>
    );
  }

  return null;
}

/* =========================================================
   SERVICE ITEM
========================================================= */

function ServiceItem({
  example,
  index,
  inverted = false,
}: {
  example: string;
  index: number;
  inverted?: boolean;
}) {
  return (
    <div
      className={`min-w-0 border-t py-2 ${
        inverted
          ? 'border-bone/25'
          : 'border-black/15'
      }`}
    >
      <div className="flex min-w-0 items-start gap-2">
        <span
          className="shrink-0 text-[8px] font-bold leading-[1.2] text-orange"
          style={courier}
        >
          0{index + 1}
        </span>

        <span
          className={`min-w-0 text-[8px] font-bold uppercase leading-[1.2] xl:text-[9px] ${
            inverted
              ? 'text-bone'
              : 'text-ink'
          }`}
          style={courier}
        >
          {example}
        </span>
      </div>
    </div>
  );
}