'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
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

import {
  capabilities,
  type CapabilityId,
} from '@/content/capabilities';

type HeroProps = {
  onStartProject: () => void;
};

type HeroPresentation = {
  image: string;
  imageAlt: string;
  glow: string;
};

const heroPresentation: Record<CapabilityId, HeroPresentation> = {
  brand: {
    image: '/images/rebrand.png',
    imageAlt: 'Lex & Hue brand capability',
    glow: 'rgba(253, 81, 0, 0.34)',
  },
  experience: {
    image: '/images/reinvent.png',
    imageAlt: 'Lex & Hue experience capability',
    glow: 'rgba(241, 139, 91, 0.28)',
  },
  systems: {
    image: '/images/relaunch.png',
    imageAlt: 'Lex & Hue systems capability',
    glow: 'rgba(215, 197, 180, 0.32)',
  },
};

const neueHaasDisplay = {
  fontFamily: '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

export default function Hero({
  onStartProject,
}: HeroProps) {
  const [rotation, setRotation] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 90]
  );

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.96]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(
        (currentIndex) =>
          (currentIndex + 1) % capabilities.length
      );
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const current = useMemo(
    () => capabilities[rotation],
    [rotation]
  );

  const presentation = heroPresentation[current.id];

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-ink px-5 pb-20 pt-20 text-bone md:px-10 md:pb-24"
    >
      {/* BACKGROUND IMAGE */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/liana-s-bHerJo8l_Dw-unsplash.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.52]"
          sizes="100vw"
        />

        {/* Darkens the image without completely killing it */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Keeps the typography side especially readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-80px)] max-w-[1500px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">

        {/* LEFT */}
        <div className="relative z-10">
          <motion.h1
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[820px] leading-[0.86]"
            style={neueHaasDisplay}
          >
            <span className="block text-[52px] uppercase md:text-[72px] lg:text-[88px]">
              We design
            </span>

            <span className="block text-[52px] uppercase md:text-[72px] lg:text-[88px]">
              how your
            </span>

            <span className="font-editorial block text-[68px] font-normal italic leading-[0.88] text-bone md:text-[94px] lg:text-[116px]">
              business
            </span>
          </motion.h1>

          ROTATING CAPABILITY
          <div className="mt-4 md:mt-5">
            <div
              className="relative h-[1.05em] overflow-hidden text-[48px] uppercase leading-none text-orange md:text-[64px] lg:text-[80px]"
              style={neueHaasDisplay}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.id}
                  initial={{
                    y: '85%',
                    opacity: 0,
                  }}
                  animate={{
                    y: '0%',
                    opacity: 1,
                  }}
                  exit={{
                    y: '-85%',
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-0 top-0"
                >
                  {current.heroWord}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="group inline-flex items-center gap-4 rounded-full border border-orange bg-orange px-7 py-4 font-mono text-[12px] font-bold uppercase text-black transition-all duration-300 hover:bg-transparent hover:text-orange"
            >
              Start a project

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>

            <Link
              href="/#work"
              className="group inline-flex items-center gap-4 rounded-full border border-white/30 px-7 py-4 font-mono text-[12px] font-bold uppercase text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              View our work

              <ArrowDownRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </Link>
          </div>
        </div>

        RIGHT VISUAL
        <motion.div
          style={{
            y: heroY,
            scale: heroScale,
          }}
          className="relative mx-auto h-[48vh] min-h-[420px] w-full max-w-[580px] lg:h-[70vh]"
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
            style={{
              perspective: '1200px',
            }}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={current.id}
                initial={{
                  opacity: 0,
                  rotateY: -90,
                  scale: 0.88,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateY: 90,
                  scale: 0.88,
                }}
                transition={{
                  duration: 0.68,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex h-[78%] w-[78%] max-h-[450px] max-w-[450px] items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute h-[68%] w-[68%] rounded-full blur-[58px]"
                  animate={{
                    opacity: [0.34, 0.56, 0.34],
                    scale: [0.95, 1.06, 0.95],
                  }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: presentation.glow,
                  }}
                />

                <Image
                  src={presentation.image}
                  alt={presentation.imageAlt}
                  width={900}
                  height={900}
                  priority
                  className="relative z-10 h-auto w-full object-contain opacity-[0.82] brightness-[0.94] contrast-[0.88] drop-shadow-[0_18px_38px_rgba(0,0,0,0.42)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}