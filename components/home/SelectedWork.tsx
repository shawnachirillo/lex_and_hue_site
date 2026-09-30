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
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import AnimatedEyebrow from '@/components/ui/AnimatedEyebrow';
import { work } from '@/content/work';

/* =========================================================
   PROJECT LOGOS
========================================================= */

const projectLogos: Record<string, string> = {
  'the-east-end-company':
    '/images/TEEC_main_logo.png',

  'modern-goddess-coaching':
    '/images/MGC_white_logo.png',

  'legacy-at-home':
    '/images/LAHC_white_logo.png',

  'the-stillpoint':
    '/images/TSP_logo_white.png',
};

/* =========================================================
   STYLES
========================================================= */

const ease = [0.22, 1, 0.36, 1] as const;

const neueHaas = {
  fontFamily:
    '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

const courier = {
  fontFamily:
    '"Courier New", Courier, monospace',
} as const;

/* =========================================================
   SELECTED WORK
========================================================= */

export default function SelectedWork() {
  const featuredWork = useMemo(
    () => work.filter((project) => project.featured),
    []
  );

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [direction, setDirection] =
    useState(1);

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [mobilePreviewOpen, setMobilePreviewOpen] =
    useState(false);

  const [touchStart, setTouchStart] =
    useState<number | null>(null);

  const sectionRef =
    useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const count = featuredWork.length;

  const activeProject =
    featuredWork[activeIndex];

  const previousIndex =
    count > 0
      ? (activeIndex - 1 + count) % count
      : 0;

  const nextIndex =
    count > 0
      ? (activeIndex + 1) % count
      : 0;

  const previousProject =
    featuredWork[previousIndex];

  const nextProject =
    featuredWork[nextIndex];

  /* =====================================================
     SCROLL MOTION
  ===================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const statementY = useTransform(
    scrollYProgress,
    [0, 0.32],
    reduceMotion
      ? [0, 0]
      : [28, 0]
  );

  const stageY = useTransform(
    scrollYProgress,
    [0.08, 0.42],
    reduceMotion
      ? [0, 0]
      : [48, 0]
  );

  /* =====================================================
     PROJECT NAVIGATION
  ===================================================== */

  const goPrevious = () => {
    if (!count) return;

    setPreviewOpen(false);
    setMobilePreviewOpen(false);
    setDirection(-1);

    setActiveIndex((current) =>
      current === 0
        ? count - 1
        : current - 1
    );
  };

  const goNext = () => {
    if (!count) return;

    setPreviewOpen(false);
    setMobilePreviewOpen(false);
    setDirection(1);

    setActiveIndex((current) =>
      current === count - 1
        ? 0
        : current + 1
    );
  };

  /* =====================================================
     SWIPE
  ===================================================== */

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    setTouchStart(
      event.touches[0]?.clientX ?? null
    );
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (touchStart === null) return;

    const endX =
      event.changedTouches[0]?.clientX;

    if (typeof endX !== 'number') {
      setTouchStart(null);
      return;
    }

    const difference =
      endX - touchStart;

    if (Math.abs(difference) > 45) {
      if (difference < 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    setTouchStart(null);
  };

  /* =====================================================
     KEYBOARD
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (!sectionRef.current) return;

      const bounds =
        sectionRef.current.getBoundingClientRect();

      const visible =
        bounds.top < window.innerHeight &&
        bounds.bottom > 0;

      if (!visible) return;

      if (event.key === 'ArrowLeft') {
        goPrevious();
      }

      if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [count]);

  if (
    !activeProject ||
    !previousProject ||
    !nextProject ||
    !count
  ) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-black text-bone"
    >
      {/* =================================================
          INTRO
      ================================================= */}

      <div className="mx-auto max-w-[1500px] px-5 pt-16 md:px-10 md:pt-20 lg:px-12 lg:pt-24">
        <div className="flex items-start justify-between">
          <AnimatedEyebrow
            phrases={[
              'SELECTED WORK',
              'SELECTED PROJECTS',
              'RECENT WORK',
              'CASE STUDIES',
            ]}
            loop
            inverted
          />

          <div
            className="hidden text-[10px] font-bold text-white/40 md:block"
            style={courier}
          >
            {String(
              activeIndex + 1
            ).padStart(2, '0')}
            {' / '}
            {String(count).padStart(
              2,
              '0'
            )}
          </div>
        </div>

        {/* CAPTION */}

        <motion.div
          style={{
            y: statementY,
          }}
          className="mt-14 md:mt-16 lg:mt-20"
        >
          <motion.h2
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
            className="text-[48px] uppercase leading-[0.88] text-bone md:text-[72px] lg:text-[86px]"
            style={neueHaas}
          >
            How we
          </motion.h2>

          <div className="flex flex-wrap items-baseline">
            <motion.span
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -30,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease,
              }}
              className="mr-[14px] font-editorial text-[48px] italic leading-[0.88] text-orange md:mr-[20px] md:text-[72px] lg:text-[86px]"
            >
              shaped
            </motion.span>

            <motion.span
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 35,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease,
              }}
              className="text-[48px] uppercase leading-[0.88] text-bone md:text-[72px] lg:text-[86px]"
              style={neueHaas}
            >
              the work.
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          DESKTOP PROJECT STAGE
      ================================================= */}

      <motion.div
        style={{
          y: stageY,
        }}
        className="mx-auto mt-16 hidden max-w-[1500px] px-10 md:block lg:mt-20 lg:px-12"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence
          initial={false}
          mode="wait"
          custom={direction}
        >
          <motion.div
            key={activeProject.slug}
            custom={direction}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x:
                      direction > 0
                        ? 55
                        : -55,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    x:
                      direction > 0
                        ? -40
                        : 40,
                  }
            }
            transition={{
              duration: 0.85,
              ease,
            }}
          >
            <DesktopProjectStage
              project={activeProject}
              logo={
                projectLogos[
                  activeProject.slug
                ]
              }
              previewOpen={previewOpen}
              setPreviewOpen={
                setPreviewOpen
              }
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </AnimatePresence>

        {/* DESKTOP NAVIGATION */}

        <div className="border-t border-white/15">
          <div className="flex items-center justify-between py-4">
            <button
              type="button"
              onClick={goPrevious}
              className="group cursor-pointer text-left"
            >
              <span
                className="block text-[10px] font-bold uppercase text-white/35 transition-colors duration-500 group-hover:text-orange"
                style={courier}
              >
                ← Previous project
              </span>
            </button>

            <button
              type="button"
              onClick={goNext}
              className="group cursor-pointer text-right"
            >
              <span
                className="block text-[10px] font-bold uppercase text-white/35 transition-colors duration-500 group-hover:text-orange"
                style={courier}
              >
                Next project →
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* =================================================
          MOBILE PROJECT
      ================================================= */}

      <div
        className="mt-12 md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="px-5">
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={activeProject.slug}
              custom={direction}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x:
                        direction > 0
                          ? 35
                          : -35,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x:
                  direction > 0
                    ? -25
                    : 25,
              }}
              transition={{
                duration: 0.6,
                ease,
              }}
            >
              <MobileProject
                project={activeProject}
                logo={
                  projectLogos[
                    activeProject.slug
                  ]
                }
                previewOpen={
                  mobilePreviewOpen
                }
                setPreviewOpen={
                  setMobilePreviewOpen
                }
                reduceMotion={reduceMotion}
              />
            </motion.div>
          </AnimatePresence>

          {/* MOBILE NAVIGATION */}

          <div className="border-t border-white/15">
            <div className="flex items-center justify-between py-4">
              <button
                type="button"
                onClick={goPrevious}
                className="text-left"
              >
                <span
                  className="block text-[9px] font-bold uppercase text-white/35"
                  style={courier}
                >
                  ← Previous
                </span>
              </button>

              <button
                type="button"
                onClick={goNext}
                className="text-right"
              >
                <span
                  className="block text-[9px] font-bold uppercase text-white/35"
                  style={courier}
                >
                  Next →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-5 md:h-8" />
    </section>
  );
}

/* =========================================================
   DESKTOP PROJECT STAGE
========================================================= */

function DesktopProjectStage({
  project,
  logo,
  previewOpen,
  setPreviewOpen,
  reduceMotion,
}: {
  project: (typeof work)[number];
  logo?: string;
  previewOpen: boolean;
  setPreviewOpen: (value: boolean) => void;
  reduceMotion: boolean | null;
}) {
  const [openSection, setOpenSection] =
    useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  return (
    <motion.div
      className="relative h-[560px] overflow-hidden lg:h-[650px]"
      onHoverStart={() =>
        setPreviewOpen(true)
      }
      onHoverEnd={() =>
        setPreviewOpen(false)
      }
    >
      {/* IMAGE PANEL */}

      <motion.div
        initial={false}
        animate={
          previewOpen
            ? {
                left: '0%',
                width: '61%',
                top: '7%',
                bottom: '7%',
              }
            : {
                left: '0%',
                width: '100%',
                top: '0%',
                bottom: '0%',
              }
        }
        transition={
          reduceMotion
            ? {
                duration: 0,
              }
            : {
                duration: 0.95,
                ease,
              }
        }
        className="absolute overflow-hidden bg-[#111]"
      >
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="absolute inset-0 block cursor-pointer"
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              scale:
                previewOpen &&
                !reduceMotion
                  ? 1.025
                  : 1,
            }}
            transition={{
              duration: 1.15,
              ease,
            }}
          >
            <Image
              src={project.image}
              alt=""
              fill
              priority={false}
              sizes="(min-width: 1024px) 1400px, 90vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-black"
            initial={false}
            animate={{
              opacity: previewOpen
                ? 0.4
                : 0.3,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          />

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{
                scaleX: 1,
              }}
              whileInView={{
                scaleX: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 1.15,
                delay: 0.15,
                ease,
              }}
              className="pointer-events-none absolute inset-0 z-30 origin-right bg-black"
            />
          )}

          {logo && (
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.96,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
                delay: 0.55,
                ease,
              }}
              className="absolute inset-0 z-10 flex items-center justify-center px-[15%]"
            >
              <motion.div
                initial={false}
                animate={{
                  scale:
                    previewOpen &&
                    !reduceMotion
                      ? 0.9
                      : 1,
                }}
                transition={{
                  duration: 0.95,
                  ease,
                }}
                className="relative h-[38%] w-[74%]"
              >
                <Image
                  src={logo}
                  alt={project.title}
                  fill
                  sizes="60vw"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}

          <motion.div
            initial={false}
            animate={{
              opacity: previewOpen
                ? 0
                : 0.55,
            }}
            transition={{
              duration: 0.35,
            }}
            className="absolute left-6 top-6 z-20"
          >
            <span
              className="text-[9px] font-bold uppercase text-white"
              style={courier}
            >
              Project
            </span>
          </motion.div>
        </Link>
      </motion.div>

      {/* DESKTOP PREVIEW PANEL */}

      <motion.div
        initial={false}
        animate={{
          opacity: previewOpen
            ? 1
            : 0,
          x:
            previewOpen ||
            reduceMotion
              ? 0
              : 45,
        }}
        transition={{
          opacity: {
            duration: 0.55,
            delay: previewOpen
              ? 0.22
              : 0,
            ease,
          },

          x: {
            duration: 0.85,
            delay: previewOpen
              ? 0.12
              : 0,
            ease,
          },
        }}
        className={`absolute bottom-[7%] right-0 top-[7%] w-[34%] ${
          previewOpen
            ? 'pointer-events-auto'
            : 'pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col pl-8 lg:pl-12">
          <motion.div
            initial={false}
            animate={{
              y:
                previewOpen ||
                reduceMotion
                  ? 0
                  : 10,
              opacity: previewOpen
                ? 1
                : 0,
            }}
            transition={{
              duration: 0.55,
              delay: previewOpen
                ? 0.3
                : 0,
              ease,
            }}
          >
            <p
              className="text-[11px] font-bold uppercase text-orange"
              style={courier}
            >
              {project.type}
            </p>

            <h3
              className="mt-3 text-[28px] uppercase leading-[0.95] text-bone lg:text-[34px]"
              style={neueHaas}
            >
              {project.title}
            </h3>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: previewOpen
                ? 1
                : 0,
            }}
            transition={{
              duration: 0.65,
              delay: previewOpen
                ? 0.38
                : 0,
              ease,
            }}
            className="mt-8 flex-1"
          >
            <PreviewRow
              number="01"
              label="Overview"
              content={project.overview}
              expanded={
                openSection === 'overview'
              }
              onToggle={() =>
                toggleSection('overview')
              }
              delay={0.4}
              open={previewOpen}
              reduceMotion={reduceMotion}
            />

            <PreviewRow
              number="02"
              label="The Challenge"
              content={project.challenge}
              expanded={
                openSection === 'challenge'
              }
              onToggle={() =>
                toggleSection('challenge')
              }
              delay={0.46}
              open={previewOpen}
              reduceMotion={reduceMotion}
            />

            <PreviewRow
              number="03"
              label="Direction"
              content={project.direction}
              expanded={
                openSection === 'direction'
              }
              onToggle={() =>
                toggleSection('direction')
              }
              delay={0.52}
              open={previewOpen}
              reduceMotion={reduceMotion}
            />

            <PreviewRow
              number="04"
              label="Outcome"
              content={project.outcome}
              expanded={
                openSection === 'outcome'
              }
              onToggle={() =>
                toggleSection('outcome')
              }
              delay={0.58}
              open={previewOpen}
              reduceMotion={reduceMotion}
            />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: previewOpen
                ? 1
                : 0,
              y:
                previewOpen ||
                reduceMotion
                  ? 0
                  : 12,
            }}
            transition={{
              duration: 0.6,
              delay: previewOpen
                ? 0.58
                : 0,
              ease,
            }}
          >
            <Link
              href={`/work/${project.slug}`}
              className="group flex items-center justify-between border-t border-white/25 py-5"
            >
              <span
                className="text-[11px] font-bold uppercase text-bone transition-colors duration-500 group-hover:text-orange"
                style={courier}
              >
                View case study
              </span>

              <span className="text-[19px] text-orange transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   DESKTOP PREVIEW ROW
========================================================= */

function PreviewRow({
  number,
  label,
  content,
  expanded,
  onToggle,
  delay,
  open,
  reduceMotion,
}: {
  number: string;
  label: string;
  content: string;
  expanded: boolean;
  onToggle: () => void;
  delay: number;
  open: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        y:
          open || reduceMotion
            ? 0
            : 14,
      }}
      transition={{
        duration: 0.6,
        delay: open
          ? delay
          : 0,
        ease,
      }}
      className="border-b border-white/25"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="group flex w-full cursor-pointer items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[9px] font-bold text-orange"
            style={courier}
          >
            {number}
          </span>

          <span
            className={`text-[12px] font-bold uppercase transition-colors duration-500 lg:text-[13px] ${
              expanded
                ? 'text-orange'
                : 'text-bone group-hover:text-orange'
            }`}
            style={courier}
          >
            {label}
          </span>
        </div>

        <motion.span
          aria-hidden="true"
          animate={{
            rotate: expanded ? 45 : 0,
          }}
          transition={{
            duration: reduceMotion
              ? 0
              : 0.4,
            ease,
          }}
          className={`text-[17px] leading-none transition-colors duration-500 ${
            expanded
              ? 'text-orange'
              : 'text-white/40 group-hover:text-orange'
          }`}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
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
            exit={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    height: 0,
                    opacity: 0,
                  }
            }
            transition={{
              height: {
                duration: reduceMotion
                  ? 0
                  : 0.55,
                ease,
              },
              opacity: {
                duration: reduceMotion
                  ? 0
                  : 0.4,
                delay:
                  expanded &&
                  !reduceMotion
                    ? 0.08
                    : 0,
              },
            }}
            className="overflow-hidden"
          >
            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      y: 8,
                    }
              }
              animate={{
                y: 0,
              }}
              exit={{
                y: 4,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.45,
                ease,
              }}
              className="max-w-[390px] pb-5 pr-6 text-[14px] leading-[1.55] text-white/70"
              style={courier}
            >
              {content}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================================================
   MOBILE PROJECT
========================================================= */

function MobileProject({
  project,
  logo,
  previewOpen,
  setPreviewOpen,
  reduceMotion,
}: {
  project: (typeof work)[number];
  logo?: string;
  previewOpen: boolean;
  setPreviewOpen: (value: boolean) => void;
  reduceMotion: boolean | null;
}) {
  const [openSection, setOpenSection] =
    useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  return (
    <div className="overflow-hidden bg-black">
      {/* IMAGE / TAP TARGET */}

      <motion.button
        type="button"
        onClick={() =>
          setPreviewOpen(!previewOpen)
        }
        aria-expanded={previewOpen}
        aria-label={
          previewOpen
            ? `Close ${project.title} preview`
            : `Preview ${project.title}`
        }
        className="relative block w-full overflow-hidden bg-[#111] text-left"
        initial={false}
        animate={{
          height: previewOpen
            ? 330
            : 440,
        }}
        transition={
          reduceMotion
            ? {
                duration: 0,
              }
            : {
                duration: 0.8,
                ease,
              }
        }
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale:
              previewOpen &&
              !reduceMotion
                ? 1.025
                : 1,
          }}
          transition={{
            duration: 0.95,
            ease,
          }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-black"
          initial={false}
          animate={{
            opacity: previewOpen
              ? 0.42
              : 0.32,
          }}
          transition={{
            duration: 0.65,
            ease,
          }}
        />

        {logo && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-[15%]"
            initial={false}
            animate={{
              scale:
                previewOpen &&
                !reduceMotion
                  ? 0.9
                  : 1,
              y:
                previewOpen &&
                !reduceMotion
                  ? -4
                  : 0,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            <div className="relative h-[38%] w-[78%]">
              <Image
                src={logo}
                alt={project.title}
                fill
                sizes="80vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}

        <div className="absolute bottom-4 right-4 z-20">
          <motion.span
            initial={false}
            animate={{
              rotate: previewOpen
                ? 45
                : 0,
            }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="flex h-8 w-8 items-center justify-center border border-white/40 text-[20px] leading-none text-bone"
            aria-hidden="true"
          >
            +
          </motion.span>
        </div>
      </motion.button>

      {/* MOBILE PREVIEW */}

      <AnimatePresence initial={false}>
        {previewOpen && (
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
                duration: 0.75,
                ease,
              },
              opacity: {
                duration: 0.5,
                delay: 0.12,
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-1 pb-6 pt-6">
              {/* PROJECT HEADER */}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease,
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase text-orange"
                  style={courier}
                >
                  {project.type}
                </p>

                <h3
                  className="mt-2 text-[28px] uppercase leading-[0.95] text-bone"
                  style={neueHaas}
                >
                  {project.title}
                </h3>
              </motion.div>

              {/* MOBILE ACCORDION */}

              <div className="mt-6">
                <MobilePreviewRow
                  number="01"
                  label="Overview"
                  content={project.overview}
                  expanded={
                    openSection ===
                    'overview'
                  }
                  onToggle={() =>
                    toggleSection(
                      'overview'
                    )
                  }
                  delay={0.28}
                  reduceMotion={
                    reduceMotion
                  }
                />

                <MobilePreviewRow
                  number="02"
                  label="The Challenge"
                  content={project.challenge}
                  expanded={
                    openSection ===
                    'challenge'
                  }
                  onToggle={() =>
                    toggleSection(
                      'challenge'
                    )
                  }
                  delay={0.34}
                  reduceMotion={
                    reduceMotion
                  }
                />

                <MobilePreviewRow
                  number="03"
                  label="Direction"
                  content={project.direction}
                  expanded={
                    openSection ===
                    'direction'
                  }
                  onToggle={() =>
                    toggleSection(
                      'direction'
                    )
                  }
                  delay={0.4}
                  reduceMotion={
                    reduceMotion
                  }
                />

                <MobilePreviewRow
                  number="04"
                  label="Outcome"
                  content={project.outcome}
                  expanded={
                    openSection ===
                    'outcome'
                  }
                  onToggle={() =>
                    toggleSection(
                      'outcome'
                    )
                  }
                  delay={0.46}
                  reduceMotion={
                    reduceMotion
                  }
                />
              </div>

              {/* FULL CASE STUDY */}

              <motion.div
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
                  delay: 0.5,
                  ease,
                }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-6 flex items-center justify-between border-t border-white/25 py-5"
                >
                  <span
                    className="text-[11px] font-bold uppercase text-bone"
                    style={courier}
                  >
                    View case study
                  </span>

                  <span className="text-[19px] text-orange">
                    ↗
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   MOBILE PREVIEW ROW
========================================================= */

function MobilePreviewRow({
  number,
  label,
  content,
  expanded,
  onToggle,
  delay,
  reduceMotion,
}: {
  number: string;
  label: string;
  content: string;
  expanded: boolean;
  onToggle: () => void;
  delay: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 10,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease,
      }}
      className="border-t border-white/20"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[9px] font-bold text-orange"
            style={courier}
          >
            {number}
          </span>

          <span
            className={`text-[11px] font-bold uppercase transition-colors duration-300 ${
              expanded
                ? 'text-orange'
                : 'text-bone'
            }`}
            style={courier}
          >
            {label}
          </span>
        </div>

        <motion.span
          aria-hidden="true"
          animate={{
            rotate: expanded ? 45 : 0,
          }}
          transition={{
            duration: reduceMotion
              ? 0
              : 0.35,
            ease,
          }}
          className={`text-[17px] leading-none ${
            expanded
              ? 'text-orange'
              : 'text-white/40'
          }`}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
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
                duration: reduceMotion
                  ? 0
                  : 0.5,
                ease,
              },
              opacity: {
                duration: reduceMotion
                  ? 0
                  : 0.35,
              },
            }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 pr-4 text-[13px] leading-[1.6] text-white/70"
              style={courier}
            >
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}