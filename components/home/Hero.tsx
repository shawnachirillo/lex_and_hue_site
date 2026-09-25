'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { capabilities } from '@/content/capabilities';

type HeroProps = {
  onStartProject: () => void;
};

const neueHaasDisplay = {
  fontFamily: '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

export default function Hero({
  onStartProject,
}: HeroProps) {
  const [rotation, setRotation] = useState(0);

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

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink px-5 pb-20 pt-32 text-bone md:px-10 md:pb-24 md:pt-40 lg:pb-28 lg:pt-44"
    >
      {/* BACKGROUND IMAGE */}
      <div className="pointer-events-none absolute inset-0">
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

        {/* Overall darkening */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Protect typography while allowing image through on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1500px]">
        <motion.div
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
          className="max-w-[900px]"
        >
          {/* HEADLINE */}
          <h1
            className="leading-[0.86]"
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
          </h1>

          {/* ROTATING WORD */}
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
        </motion.div>
      </div>
    </section>
  );
}