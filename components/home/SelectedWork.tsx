'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { work } from '@/content/work';

export default function SelectedWork() {
  const featuredWork = work.filter((project) => project.featured);

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-ink px-5 py-20 text-bone md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[.35fr_.65fr] md:pb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-[11px] font-semibold uppercase tracking-[.28em] text-white/55"
          >
            Selected work
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="max-w-[850px] text-[42px] font-black uppercase leading-[.92] md:text-[64px] lg:text-[78px]">
              Different problems.
              <br />
              <span className="text-orange">Different shifts.</span>
            </h2>
          </motion.div>
        </div>

        {/* PROJECTS */}
        <div>
          {featuredWork.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-b border-white/15"
            >
              <Link
                href={`/work/${project.slug}`}
                className="grid gap-8 py-10 md:py-14 lg:grid-cols-[80px_.8fr_1fr] lg:gap-10"
              >
                {/* NUMBER */}
                <div className="text-[10px] font-semibold text-white/35">
                  {project.index}
                </div>

                {/* PROJECT */}
                <div>
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white/45">
                    {project.type}
                  </p>

                  <h3 className="text-[44px] font-black uppercase leading-[.85] transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-[64px] lg:text-[78px]">
                    {project.title}
                  </h3>

                  <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-white/55">
                    {project.copy}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.16em] text-orange">
                    View project

                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </div>

                {/* PROJECT IMAGE */}
                <div className="relative min-h-[360px] overflow-hidden md:min-h-[480px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{
                      scale: 1.035,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    whileHover={{
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                    <span className="max-w-[70%] text-[10px] font-semibold uppercase tracking-[.18em] text-white/70">
                      {project.eyebrow}
                    </span>

                    <span className="text-[10px] uppercase tracking-[.18em] text-white/45">
                      {project.index}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}