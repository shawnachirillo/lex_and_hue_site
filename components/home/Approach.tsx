'use client';

import { motion } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Find the real problem.',
    copy:
      'A request for a new website might actually be a positioning problem. A brand problem might be an experience problem. We look beneath the requested deliverable first.',
  },
  {
    number: '02',
    title: 'Design the right response.',
    copy:
      'Once the problem is clear, we determine what actually needs to change across brand, experience, or systems.',
  },
  {
    number: '03',
    title: 'Make it work together.',
    copy:
      'The strongest businesses do not treat identity, customer experience, and operations as disconnected pieces. We design with the whole business in view.',
  },
] as const;

export default function Approach() {
  return (
    <section
      id="approach"
      className="bg-bone px-5 py-20 text-ink md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1500px]">

        <div className="grid gap-10 lg:grid-cols-[.35fr_.65fr]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold uppercase tracking-[.28em]"
          >
            Our approach
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="max-w-[1000px] text-[46px] font-black uppercase leading-[.9] md:text-[70px] lg:text-[92px]">
              We start with
              <br />
              the business,
              <br />
              <span className="font-serif font-normal italic text-orange">
                not the deliverable.
              </span>
            </h2>

            <p className="mt-9 max-w-[650px] text-[17px] leading-7 text-black/60 md:text-[19px] md:leading-8">
              Because the thing you came asking for is not
              always the thing that needs fixing.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 border-t border-black/15 md:mt-28">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.65,
                delay: index * 0.05,
              }}
              className="grid gap-5 border-b border-black/15 py-9 md:py-11 lg:grid-cols-[80px_.65fr_1fr] lg:gap-10"
            >
              <span className="text-[10px] font-semibold text-black/35">
                {principle.number}
              </span>

              <h3 className="max-w-[420px] text-[28px] font-black uppercase leading-[.95] md:text-[34px]">
                {principle.title}
              </h3>

              <p className="max-w-[620px] text-[14px] leading-7 text-black/60 md:text-[15px]">
                {principle.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}