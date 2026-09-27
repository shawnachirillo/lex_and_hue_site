'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { work } from '@/content/work';

const projectLogos: Record<string, string> = {
  'the-east-end-company': '/images/TEEC_main_logo.png',
  'modern-goddess-coaching': '/images/MGC_white_logo.png',
  'legacy-at-home': '/images/LAHC_white_logo.png',
  'the-stillpoint': '/images/TSP_logo_white.png',
};

function DoubleChevron({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  return (
    <svg
      viewBox="0 0 54 54"
      aria-hidden="true"
      className={`h-6 w-6 md:h-7 md:w-7 ${
        direction === 'left' ? 'rotate-180' : ''
      }`}
    >
      <path
        d="M8 11 L25 27 L8 43"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      <path
        d="M27 11 L44 27 L27 43"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function SelectedWork() {
  const featuredWork = useMemo(
    () => work.filter((project) => project.featured),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoveredSlug, setHoveredSlug] =
    useState<string | null>(null);
  const [touchStart, setTouchStart] =
    useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothCursorX = useSpring(cursorX, {
    stiffness: 500,
    damping: 38,
    mass: 0.3,
  });

  const smoothCursorY = useSpring(cursorY, {
    stiffness: 500,
    damping: 38,
    mass: 0.3,
  });

  const count = featuredWork.length;

  const previousIndex =
    count > 0
      ? (activeIndex - 1 + count) % count
      : 0;

  const nextIndex =
    count > 0
      ? (activeIndex + 1) % count
      : 0;

  const activeProject =
    featuredWork[activeIndex];

  const visibleProjects =
    count > 0
      ? [
          {
            project: featuredWork[previousIndex],
            position: 'previous' as const,
          },
          {
            project: featuredWork[activeIndex],
            position: 'active' as const,
          },
          {
            project: featuredWork[nextIndex],
            position: 'next' as const,
          },
        ]
      : [];

  const goPrevious = () => {
    if (!count) return;

    setDirection(-1);

    setActiveIndex((current) =>
      current === 0
        ? count - 1
        : current - 1
    );
  };

  const goNext = () => {
    if (!count) return;

    setDirection(1);

    setActiveIndex((current) =>
      current === count - 1
        ? 0
        : current + 1
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLAnchorElement>
  ) => {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    cursorX.set(
      event.clientX - bounds.left
    );

    cursorY.set(
      event.clientY - bounds.top
    );
  };

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

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (!sectionRef.current) return;

      const bounds =
        sectionRef.current.getBoundingClientRect();

      const isVisible =
        bounds.top < window.innerHeight &&
        bounds.bottom > 0;

      if (!isVisible) return;

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

  if (!activeProject || !count) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-black text-bone"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[11px] font-bold uppercase text-white/80"
            style={{
              fontFamily:
                '"Courier New", Courier, monospace',
            }}
          >
            Selected work
          </motion.p>

          <div
            className="hidden text-[10px] font-bold text-white/35 md:block"
            style={{
              fontFamily:
                '"Courier New", Courier, monospace',
            }}
          >
            {String(activeIndex + 1).padStart(
              2,
              '0'
            )}
            {' / '}
            {String(count).padStart(2, '0')}
          </div>
        </div>

        {/* EDITORIAL STATEMENT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 md:mt-16 lg:mt-20"
        >
          <h2
            className="text-[38px] uppercase leading-[0.92] text-bone md:text-[66px] lg:text-[82px]"
            style={{
              fontFamily:
                '"neue-haas-grotesk-display", sans-serif',
              fontWeight: 700,
            }}
          >
            How we
            <br />

            <span
              className="font-editorial normal-case text-orange"
              style={{
                fontWeight: 400,
                fontStyle: 'italic',
              }}
            >
              shaped
            </span>{' '}
            the work.
          </h2>
        </motion.div>

        {/* =====================================================
            DESKTOP / TABLET CAROUSEL
        ===================================================== */}
        <div
          className="relative mt-10 hidden min-h-[500px] items-center md:flex lg:mt-12 lg:min-h-[560px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* PREVIOUS */}
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous project"
            className="absolute left-0 z-30 flex h-14 w-10 items-center justify-center text-white/40 transition-colors duration-300 hover:text-orange"
          >
            <DoubleChevron direction="left" />
          </button>

          {/* PROJECTS */}
          <div className="mx-auto flex w-[calc(100%-110px)] max-w-[1240px] items-center justify-center gap-5 lg:gap-7">
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              {visibleProjects.map(
                ({ project, position }) => {
                  const isActive =
                    position === 'active';

                  const isHovered =
                    hoveredSlug === project.slug;

                  const logo =
                    projectLogos[project.slug];

                  return (
                    <motion.article
                      layout
                      key={`${project.slug}-${position}`}
                      custom={direction}
                      initial={{
                        opacity: 0,
                        x:
                          direction > 0
                            ? 35
                            : -35,
                      }}
                      animate={{
                        opacity: isActive
                          ? 1
                          : 0.62,
                        x: 0,
                        scale: isActive
                          ? 1.3
                          : 1,
                      }}
                      exit={{
                        opacity: 0,
                        x:
                          direction > 0
                            ? -35
                            : 35,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className={`relative shrink-0 ${
                        isActive
                          ? 'z-20'
                          : 'z-10'
                      }`}
                      style={{
                        width: '29%',
                      }}
                    >
                      <ProjectCard
                        project={project}
                        logo={logo}
                        isActive={isActive}
                        isHovered={isHovered}
                        onPointerMove={
                          handlePointerMove
                        }
                        onMouseEnter={() =>
                          setHoveredSlug(
                            project.slug
                          )
                        }
                        onMouseLeave={() =>
                          setHoveredSlug(null)
                        }
                        cursorX={smoothCursorX}
                        cursorY={smoothCursorY}
                      />
                    </motion.article>
                  );
                }
              )}
            </AnimatePresence>
          </div>

          {/* NEXT */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="absolute right-0 z-30 flex h-14 w-10 items-center justify-center text-white/40 transition-colors duration-300 hover:text-orange"
          >
            <DoubleChevron direction="right" />
          </button>
        </div>

        {/* ACTIVE PROJECT INFO — BOTTOM */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.slug}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              transition={{
                duration: 0.3,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="mx-auto mt-1 text-center"
            >
              <p
                className="mb-2 text-[10px] font-bold uppercase text-orange"
                style={{
                  fontFamily:
                    '"Courier New", Courier, monospace',
                }}
              >
                {activeProject.type}
              </p>

              <Link
                href={`/work/${activeProject.slug}`}
                className="group inline-flex items-baseline gap-3"
              >
                <h3
                  className="text-[28px] uppercase leading-none text-bone transition-colors duration-300 group-hover:text-orange lg:text-[34px]"
                  style={{
                    fontFamily:
                      '"neue-haas-grotesk-display", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {activeProject.title}
                </h3>

                <span className="text-[20px] text-orange transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =====================================================
            MOBILE
        ===================================================== */}
        <div
          className="mt-10 md:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={activeProject.slug}
              custom={direction}
              initial={{
                opacity: 0,
                x:
                  direction > 0
                    ? 35
                    : -35,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x:
                  direction > 0
                    ? -35
                    : 35,
              }}
              transition={{
                duration: 0.4,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              {/* PROJECT IMAGE */}
              <Link
                href={`/work/${activeProject.slug}`}
                className="relative block aspect-square overflow-hidden border border-white/55 bg-black"
              >
                <Image
                  src={activeProject.image}
                  alt=""
                  fill
                  sizes="calc(100vw - 40px)"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                {projectLogos[
                  activeProject.slug
                ] && (
                  <div className="absolute inset-0 flex items-center justify-center p-[16%]">
                    <div className="relative h-[42%] w-[78%]">
                      <Image
                        src={
                          projectLogos[
                            activeProject.slug
                          ]
                        }
                        alt={
                          activeProject.title
                        }
                        fill
                        sizes="70vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </Link>

              {/* PROJECT INFO */}
              <div className="mt-6 text-center">
                <p
                  className="mb-2 text-[10px] font-bold uppercase text-orange"
                  style={{
                    fontFamily:
                      '"Courier New", Courier, monospace',
                  }}
                >
                  {activeProject.type}
                </p>

                <Link
                  href={`/work/${activeProject.slug}`}
                  className="inline-flex items-baseline gap-2"
                >
                  <h3
                    className="text-[28px] uppercase leading-none"
                    style={{
                      fontFamily:
                        '"neue-haas-grotesk-display", sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    {activeProject.title}
                  </h3>

                  <span className="text-orange">
                    ↗
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* MOBILE NAV */}
          <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-5">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous project"
              className="text-white/50 transition-colors hover:text-orange"
            >
              <DoubleChevron direction="left" />
            </button>

            <span
              className="text-[10px] font-bold text-white/40"
              style={{
                fontFamily:
                  '"Courier New", Courier, monospace',
              }}
            >
              {String(
                activeIndex + 1
              ).padStart(2, '0')}
              {' / '}
              {String(count).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="text-white/50 transition-colors hover:text-orange"
            >
              <DoubleChevron direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

type ProjectCardProps = {
  project: (typeof work)[number];
  logo?: string;
  isActive: boolean;
  isHovered: boolean;
  onPointerMove: (
    event: React.PointerEvent<HTMLAnchorElement>
  ) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  cursorX: ReturnType<typeof useSpring>;
  cursorY: ReturnType<typeof useSpring>;
};

function ProjectCard({
  project,
  logo,
  isActive,
  isHovered,
  onPointerMove,
  onMouseEnter,
  onMouseLeave,
  cursorX,
  cursorY,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title}`}
      onPointerMove={onPointerMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative block aspect-square overflow-hidden border border-white/55 bg-black"
    >
      {/* IMAGE */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered
            ? 1.025
            : 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="30vw"
          className="object-cover"
        />
      </motion.div>

      {/* OVERLAY */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          opacity: isHovered
            ? 0.25
            : isActive
              ? 0.42
              : 0.62,
        }}
        transition={{
          duration: 0.35,
        }}
      />

      {/* LOGO */}
      {logo && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-[14%]"
          animate={{
            opacity: isActive
              ? 1
              : 0.72,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <div className="relative h-[42%] w-[78%]">
            <Image
              src={logo}
              alt={project.title}
              fill
              sizes="25vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      )}

      {/* BORDER */}
      <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-white/30" />

      {/* VIEW PROJECT CURSOR */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
            }}
            transition={{
              duration: 0.18,
            }}
            className="pointer-events-none absolute left-0 top-0 z-30 hidden lg:block"
            style={{
              x: cursorX,
              y: cursorY,
            }}
          >
            <div
              className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-orange px-5 py-4 text-center text-[10px] font-bold uppercase leading-[1.15] text-black"
              style={{
                fontFamily:
                  '"Courier New", Courier, monospace',
              }}
            >
              View
              <br />
              project ↗
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}