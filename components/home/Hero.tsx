'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { capabilities } from '@/content/capabilities';

type HeroProps = {
  onStartProject: () => void;
};

const neueHaasDisplay = {
  fontFamily:
    '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({
  onStartProject,
}: HeroProps) {
  const [rotation, setRotation] = useState(0);

  const sectionRef =
    useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  /*
   * Scroll progress is scoped only to the hero.
   *
   * 0 = hero at its starting position
   * 1 = hero has left the viewport
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /*
   * The image and content leave at slightly
   * different speeds.
   *
   * This gives the hero depth without turning
   * it into a dramatic parallax effect.
   */
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 90]
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.04, reduceMotion ? 1.04 : 1.1]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -55]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 1, reduceMotion ? 1 : 0.25]
  );

  const bottomLineScale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [0, 1]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(
        (currentIndex) =>
          (currentIndex + 1) %
          capabilities.length
      );
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const current = useMemo(
    () => capabilities[rotation],
    [rotation]
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-ink px-5 pb-20 pt-32 text-bone md:px-10 md:pb-24 md:pt-40 lg:pb-28 lg:pt-44"
    >
      {/* ============================================
          BACKGROUND
      ============================================ */}

      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 1.08,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease,
        }}
        style={{
          y: backgroundY,
        }}
      >
        <motion.div
          className="absolute -inset-[5%]"
          style={{
            scale: backgroundScale,
          }}
        >
          <Image
            src="/images/LH_hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.52]"
            style={{
              objectPosition: 'center center',
            }}
          />
        </motion.div>

        {/* IMAGE CONTROL */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      </motion.div>

      {/* ============================================
          OPENING MASK

          Black layer pulls away horizontally when
          the page first loads, revealing the image.
      ============================================ */}

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] origin-right bg-ink"
          initial={{
            scaleX: 1,
          }}
          animate={{
            scaleX: 0,
          }}
          transition={{
            duration: 1.05,
            delay: 0.08,
            ease,
          }}
        />
      )}

      {/* ============================================
          CONTENT
      ============================================ */}

      <motion.div
        className="relative z-10 mx-auto max-w-[1500px]"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="max-w-[900px]">
          {/* ========================================
              HEADLINE
          ======================================== */}

          <h1
            className="leading-[0.86]"
            style={neueHaasDisplay}
          >
            {/* WE DESIGN */}
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block text-[52px] uppercase md:text-[72px] lg:text-[88px]"
                initial={
                  reduceMotion
                    ? false
                    : {
                        y: '105%',
                      }
                }
                animate={{
                  y: '0%',
                }}
                transition={{
                  duration: 1.0,
                  delay: 0.32,
                  ease,
                }}
              >
                We design
              </motion.span>
            </span>

            {/* HOW YOUR */}
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block text-[52px] uppercase md:text-[72px] lg:text-[88px]"
                initial={
                  reduceMotion
                    ? false
                    : {
                        y: '105%',
                      }
                }
                animate={{
                  y: '0%',
                }}
                transition={{
                  duration: 1.0,
                  delay: 0.43,
                  ease,
                }}
              >
                how your
              </motion.span>
            </span>

            {/* BUSINESS */}
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="font-editorial block text-[68px] font-normal italic leading-[0.88] text-bone md:text-[94px] lg:text-[116px]"
                initial={
                  reduceMotion
                    ? false
                    : {
                        y: '110%',
                        opacity: 0,
                      }
                }
                animate={{
                  y: '0%',
                  opacity: 1,
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.55,
                  ease,
                }}
              >
                business
              </motion.span>
            </span>
          </h1>

          {/* ========================================
              ROTATING CAPABILITY WORD
          ======================================== */}

          <motion.div
            className="mt-4 md:mt-5"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -24,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.82,
              ease,
            }}
          >
            <div
              className="relative h-[1.05em] overflow-hidden text-[48px] uppercase leading-none text-orange md:text-[64px] lg:text-[80px]"
              style={neueHaasDisplay}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.id}
                  initial={
                    reduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          y: '90%',
                          opacity: 0,
                        }
                  }
                  animate={{
                    y: '0%',
                    opacity: 1,
                  }}
                  exit={
                    reduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          y: '-90%',
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 0.58,
                    ease,
                  }}
                  className="absolute left-0 top-0"
                >
                  {current.heroWord}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ========================================
              ACTIONS
          ======================================== */}

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
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
            transition={{
              duration: 0.7,
              delay: 1.02,
              ease,
            }}
          >
            <button
              type="button"
              onClick={onStartProject}
              className="group inline-flex items-center gap-4 rounded-full border border-orange bg-orange px-7 py-4 text-[12px] font-bold uppercase text-black transition-all duration-300 hover:bg-transparent hover:text-orange"
              style={{
                fontFamily:
                  '"Courier New", Courier, monospace',
              }}
            >
              Start a project

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>

            <Link
              href="/#work"
              className="group inline-flex items-center gap-4 rounded-full border border-white/30 px-7 py-4 text-[12px] font-bold uppercase text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              style={{
                fontFamily:
                  '"Courier New", Courier, monospace',
              }}
            >
              View our work

              <ArrowDownRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ============================================
          EXIT / HANDOFF LINE

          Begins growing as the visitor scrolls.
          This becomes the first visual signal that
          the hero is handing control to the page.
      ============================================ */}

      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 h-px w-full origin-left bg-orange"
        style={{
          scaleX: bottomLineScale,
        }}
      />
    </section>
  );
}