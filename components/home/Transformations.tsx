'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { transformations } from '@/content/transformations';

export default function Transformations() {
  return (
    <section className="bg-orange px-5 py-20 text-black md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">

        <div className="grid gap-8 border-b border-black/20 pb-12 lg:grid-cols-[.35fr_.65fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em]">
            Transformations
          </p>

          <div>
            <h2 className="max-w-[950px] text-[44px] font-black uppercase leading-[.9] md:text-[66px] lg:text-[84px]">
              Not every business
              <br />
              needs the same shift.
            </h2>

            <p className="mt-8 max-w-[650px] text-[16px] leading-7 text-black/65 md:text-[18px]">
              We shape the engagement around what has changed,
              what is no longer working, and what the business
              needs to become next.
            </p>
          </div>
        </div>

        <div>
          {transformations.map((transformation, index) => (
            <motion.article
              key={transformation.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-b border-black/20"
            >
              <Link
                href={`/pricing#${transformation.id}`}
                className="grid gap-6 py-10 md:py-12 lg:grid-cols-[80px_.65fr_1fr_auto] lg:items-start lg:gap-10"
              >
                <span className="text-[10px] font-semibold text-black/40">
                  {transformation.number}
                </span>

                <h3 className="text-[42px] font-black uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 md:text-[54px] lg:text-[64px]">
                  {transformation.name}
                </h3>

                <div>
                  <p className="font-serif text-[24px] italic leading-tight md:text-[28px]">
                    {transformation.statement}
                  </p>

                  <p className="mt-5 max-w-[560px] text-[14px] leading-6 text-black/60">
                    {transformation.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={22}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-end pt-8">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.14em]"
          >
            Explore services + pricing

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}