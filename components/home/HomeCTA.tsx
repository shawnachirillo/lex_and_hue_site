'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import AnimatedEyebrow from '@/components/ui/AnimatedEyebrow';

type HomeCTAProps = {
  onStartProject: () => void;
};

const neueHaas = {
  fontFamily: '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

const instrumentSerif = {
  fontFamily: 'var(--font-instrument-serif), serif',
  fontStyle: 'italic',
  fontWeight: 400,
} as const;

export default function HomeCTA({
  onStartProject,
}: HomeCTAProps) {
  return (
    <section className="bg-orange px-5 py-20 text-black md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-t border-black/20 pt-8"
        >
          {/* TYPEWRITER EYEBROW */}

          <div className="text-bone">
            <AnimatedEyebrow
              phrases={[
                'START A PROJECT',
                'START A CONVERSATION',
                'MAKE THE SHIFT',
              ]}
              loop
              cursorClassName="bg-black"
            />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2
                className="max-w-[1100px] text-[52px] uppercase leading-[0.86] md:text-[82px] lg:text-[112px]"
                style={neueHaas}
              >
                Your business
                <br />
                changed.
                <br />

                <span
                  className="text-bone"
                  style={instrumentSerif}
                >
                  Let&apos;s make it
                  <br />
                  visible.
                </span>
              </h2>

              <p
  className="mt-9 max-w-[620px] text-[16px] leading-7 text-black/65 md:text-[18px]"
  style={{ fontFamily: '"Courier New", Courier, monospace' }}
>
                Tell us what is changing, what is no longer
                working, or what you are trying to build next.
                We&apos;ll start there.
              </p>
            </div>

            <button
              type="button"
              onClick={onStartProject}
              className="group flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-orange md:h-[180px] md:w-[180px]"
            >
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase">
                Start

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}