'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import AnimatedEyebrow from '@/components/ui/AnimatedEyebrow';
import { transformations } from '@/content/transformations';

const ease = [0.22, 1, 0.36, 1] as const;

const neueHaas = {
  fontFamily: '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

const instrumentSerif = {
  fontFamily: 'var(--font-instrument-serif), serif',
  fontStyle: 'italic',
  fontWeight: 400,
} as const;

const courier = {
  fontFamily: '"Courier New", Courier, monospace',
  fontWeight: 700,
} as const;

/* =========================================================
   TRANSFORMATIONS
========================================================= */

export default function Transformations() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const active = transformations[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#413d36] text-black">
     <div className="mx-auto max-w-[1500px] px-5 pb-5 pt-20 md:px-10 md:pb-8 md:pt-28 lg:px-12 lg:pb-14 lg:pt-32">

        {/* =================================================
            ANIMATED EYEBROW
        ================================================= */}

        <div className="text-bone">
          <AnimatedEyebrow
            phrases={[
              'WHAT CAN CHANGE',
              'WHAT CAN SHIFT',
              'WHAT COMES NEXT',
            ]}
            loop
          />
        </div>

        {/* =================================================
            INTRO
        ================================================= */}

        <motion.h2
          className="mt-9 max-w-[1250px] text-[48px] uppercase leading-[0.88] md:mt-12 md:text-[72px] lg:mt-14 lg:text-[94px]"
          style={neueHaas}
        >
          <motion.span
            className="block"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -45,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.85,
              ease,
            }}
          >
            Not every business
          </motion.span>

          <motion.span
            className="block"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 45,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease,
            }}
          >
            needs the same{' '}
            <motion.span
              className="inline-block normal-case text-bone"
              style={instrumentSerif}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.75,
                delay: 0.3,
                ease,
              }}
            >
              shift.
            </motion.span>
          </motion.span>
        </motion.h2>

        {/* =================================================
            SELECTORS
        ================================================= */}

        <div className="mt-16 grid border-t border-black/20 md:mt-20 md:grid-cols-3">
          {transformations.map((transformation, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={transformation.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={[
                  'group relative px-4 py-5 text-left',
                  'border-b border-black/20',
                  'md:border-r md:px-5 md:py-6',
                  'last:md:border-r-0',
                ].join(' ')}
              >
                <span
                  className={[
                    'text-[14px] uppercase transition-colors duration-500 md:text-[16px]',
                    isActive
                      ? 'text-bone'
                      : 'text-black group-hover:text-bone',
                  ].join(' ')}
                  style={neueHaas}
                >
                  {transformation.name}
                </span>

                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] bg-bone"
                  animate={{
                    width: isActive ? '100%' : '0%',
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    ease,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* =================================================
            ACTIVE CONTENT
        ================================================= */}

<div className="relative min-h-[250px] md:min-h-[280px]">          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      y: -12,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease,
              }}
              className="grid md:grid-cols-3"
            >
              {/* =================================================
                  LEFT / MIDDLE / RIGHT COLUMN POSITION
              ================================================= */}

              <div
                className={[
                  'px-4 pb-12 pt-8 md:px-5 md:pb-14 md:pt-9',
                  activeIndex === 0
                    ? 'md:col-start-1'
                    : activeIndex === 1
                      ? 'md:col-start-2'
                      : 'md:col-start-3',
                ].join(' ')}
              >

                {/* BIG COURIER COPY */}

                <motion.p
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 16,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: reduceMotion ? 0 : 0.08,
                    ease,
                  }}
                  className="text-[18px] leading-[1.04] text-bone md:text-[28px] lg:text-[25px]"
                  style={neueHaas}
                >
                  {active.statement}
                </motion.p>

                {/* INSTRUMENT SERIF SUPPORTING COPY */}

                <motion.p
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: reduceMotion ? 0 : 0.16,
                    ease,
                  }}
                  className="mt-6 text-[19px] leading-[1.2] text-bone/75 md:text-[20px] lg:text-[22px]"
                  style={instrumentSerif}
                >
                  {active.description}
                </motion.p>

                {/* INDIVIDUAL EXPLORE */}

                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : 0.24,
                    ease,
                  }}
                  className="mt-7"
                >
                  <Link
                    href={`/pricing#${active.id}`}
                    className="group inline-flex items-center gap-3 text-orange"
                  >
                    <span className="text-[11px] font-bold uppercase">
                       {active.name}
                    </span>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =================================================
            PRICING LINK
        ================================================= */}

        <div className="flex justify-end border-t border-black/20 pt-7">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-3 text-orange"
          >
            <span className="text-[11px] font-bold uppercase">
              services + pricing
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}