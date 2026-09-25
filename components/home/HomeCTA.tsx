'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type HomeCTAProps = {
  onStartProject: () => void;
};

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
          <p className="text-[11px] font-semibold uppercase tracking-[.28em]">
            Start a project
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-[1100px] text-[52px] font-black uppercase leading-[.86] md:text-[82px] lg:text-[112px]">
                Your business
                <br />
                changed.
                <br />
                <span className="font-serif font-normal italic">
                  Let&apos;s make it
                  <br />
                  visible.
                </span>
              </h2>

              <p className="mt-9 max-w-[620px] text-[16px] leading-7 text-black/65 md:text-[18px]">
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
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em]">
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