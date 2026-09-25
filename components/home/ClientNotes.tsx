'use client';

import { motion } from 'framer-motion';

import { testimonials } from '@/content/testimonials';

export default function ClientNotes() {
  return (
    <section className="bg-ink px-5 py-20 text-bone md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[.35fr_.65fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-white/60">
            Client notes
          </p>

          <h2 className="max-w-[900px] text-[44px] font-black uppercase leading-[.9] md:text-[66px] lg:text-[84px]">
            From businesses
            <br />
            <span className="font-serif font-normal italic text-orange">
              in motion.
            </span>
          </h2>
        </div>

        <div>
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-7 border-b border-white/15 py-10 md:py-12 lg:grid-cols-[80px_1fr_.35fr] lg:gap-12"
            >
              <span className="text-[10px] font-semibold text-white/30">
                0{index + 1}
              </span>

              <blockquote className="max-w-[850px] font-serif text-[27px] italic leading-[1.2] text-bone md:text-[34px] lg:text-[40px]">
                “{testimonial.quote}”
              </blockquote>

              <div className="lg:pt-2">
                <p className="text-[12px] font-bold uppercase tracking-[.12em]">
                  {testimonial.name}
                </p>

                <p className="mt-2 text-[12px] text-white/45">
                  {testimonial.company}
                </p>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.18em] text-orange">
                  {testimonial.service}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}