'use client';

import { motion, useReducedMotion } from 'framer-motion';

import AnimatedEyebrow from '@/components/ui/AnimatedEyebrow';

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  'Find the real problem.',
  'Design the right response.',
  'Make it work together.',
] as const;

const neueHaas = {
  fontFamily: '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

export default function Approach() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-bone text-ink"
    >
     <div className="mx-auto max-w-[1500px] px-5 pb-12 pt-6 md:px-10 md:pb-14 md:pt-7 lg:px-12 lg:pb-16 lg:pt-8">

        {/* ANIMATED EYEBROW */}

        <div className="text-black">
          <AnimatedEyebrow
            phrases={[
              'OUR APPROACH',
              'HOW WE THINK',
              'HOW WE WORK',
            ]}
            loop
          />
        </div>

        {/* STRIP */}

        <div className="mt-16 md:mt-20 lg:mt-24">
          <div className="grid items-center gap-y-12 lg:grid-cols-[230px_1fr] lg:gap-x-10">

            {/* WE */}

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.6,
              }}
              transition={{
                duration: 1,
                ease,
              }}
              className="text-[86px] uppercase leading-[0.85] md:text-[106px] lg:text-[125px]"
              style={neueHaas}
            >
              WE
            </motion.p>

{/* LOOPING CAPTIONS */}

<div className="grid gap-y-8 md:grid-cols-3 md:gap-x-6 lg:gap-x-10">
  {principles.map((principle, index) => {
    const opacityFrames =
      index === 0
        ? [0, 1, 1, 1, 1, 0]
        : index === 1
          ? [0, 0, 1, 1, 1, 0]
          : [0, 0, 0, 1, 1, 0];

    return (
      <motion.p
        key={principle}
        initial={{ opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: opacityFrames }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 8,
                times: [0, 0.25, 0.5, 0.75, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0,
                ease: 'linear',
              }
        }
        className="max-w-[250px] text-[20px] uppercase leading-[0.95] md:text-[22px] lg:text-[24px]"
        style={neueHaas}
      >
        {principle}
      </motion.p>
    );
  })}
</div>

          </div>
        </div>

      </div>
    </section>
  );
}