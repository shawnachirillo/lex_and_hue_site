'use client';

import { motion } from 'framer-motion';

import { capabilities } from '@/content/capabilities';

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="bg-bone px-5 py-20 text-ink md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* INTRO */}
        <div className="grid gap-8 border-b border-black/15 pb-12 lg:grid-cols-[.35fr_.65fr] lg:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[11px] font-semibold uppercase tracking-[.28em]"
          >
            What we do
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="max-w-[900px] text-[42px] font-black uppercase leading-[.92] md:text-[60px] lg:text-[76px]">
              Brand.
              <br />
              Experience.
              <br />
              <span className="text-orange">
                Systems.
              </span>
            </h2>

            <p className="mt-8 max-w-[680px] text-[17px] leading-7 text-black/60 md:text-[19px] md:leading-8">
              Design and technology working together to shape how your
              business is understood, experienced, and operated.
            </p>
          </motion.div>
        </div>

        {/* CAPABILITIES */}
        <div>
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.id}
              id={`capability-${capability.id}`}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid gap-7 border-b border-black/15 py-10 md:py-12 lg:grid-cols-[80px_.7fr_1fr] lg:items-start lg:gap-10"
            >
              <span className="text-[10px] font-semibold text-black/35">
                0{index + 1}
              </span>

              <div>
                <h3 className="text-[38px] font-black uppercase leading-none transition-colors duration-300 group-hover:text-orange md:text-[48px] lg:text-[58px]">
                  {capability.name}
                </h3>

                <p className="mt-3 font-serif text-[24px] italic leading-tight text-orange md:text-[28px]">
                  {capability.statement}
                </p>
              </div>

              <ul className="grid gap-0 border-t border-black/15">
                {capability.examples.map((example) => (
                  <li
                    key={example}
                    className="border-b border-black/10 py-3 text-[12px] font-semibold uppercase tracking-[.08em] text-black/60 transition-colors duration-300 group-hover:text-black"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}