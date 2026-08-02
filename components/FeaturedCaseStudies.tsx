'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  services: string[];
  eyebrow: string;
  caption: string;
  image?: string;
  gradient: string;
};

const caseStudies: CaseStudy[] = [
  {
    slug: 'the-east-end-company',
    title: 'The East End Co.',
    category: 'Brand Reinvention',
    services: ['Strategy', 'Identity', 'Packaging', 'Web'],
    eyebrow: 'Fragrance / Heritage / Reinvention',
    caption:
      'A heritage-inspired fragrance house shaped around memory, atmosphere, and lineage.',
    image: '/images/case-studies/east-end.jpg',
    gradient:
      'linear-gradient(135deg, #241710 0%, #7a3c1e 45%, #d28c4d 100%)',
  },
  {
    slug: 'brianna-wohner',
    title: 'Brianna Wohner',
    category: 'Personal Brand',
    services: ['Positioning', 'Identity', 'Digital'],
    eyebrow: 'Personal Brand / Editorial / Direction',
    caption:
      'A sharper, more editorial identity designed to make the work feel established and unmistakable.',
    image: '/images/case-studies/brianna-wohner.jpg',
    gradient:
      'linear-gradient(135deg, #211f1d 0%, #5b4b45 48%, #c8b19f 100%)',
  },
  {
    slug: 'legacy-at-home',
    title: 'Legacy At Home',
    category: 'Brand Repositioning',
    services: ['Strategy', 'Identity', 'Web'],
    eyebrow: 'Care / Trust / Repositioning',
    caption:
      'A warmer, clearer system built to communicate dignity, familiarity, and dependable care.',
    image: '/images/case-studies/legacy-at-home.jpg',
    gradient:
      'linear-gradient(135deg, #223326 0%, #71884e 46%, #d6c778 100%)',
  },
  {
    slug: 'the-stillpoint',
    title: 'The Stillpoint',
    category: 'Brand Creation',
    services: ['Strategy', 'Identity', 'Experience'],
    eyebrow: 'Wellness / Ritual / Atmosphere',
    caption:
      'A grounded visual world shaped by stillness, ritual, and the textures of the Great Lakes.',
    image: '/images/case-studies/the-stillpoint.jpg',
    gradient:
      'linear-gradient(135deg, #0f1a17 0%, #2f4a35 48%, #8f5c36 100%)',
  },
];

const filters = [
  'All',
  'Brand Reinvention',
  'Brand Repositioning',
  'Brand Creation',
  'Personal Brand',
];

const ease = [0.22, 1, 0.36, 1] as const;

function TypewriterEyebrow({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-flex text-[10px] font-semibold uppercase tracking-[.24em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.028,
          },
        },
      }}
      aria-label={text}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          variants={{
            hidden: {
              opacity: 0,
              y: 5,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            duration: 0.22,
            ease,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function CaseStudyCard({
  project,
  index,
}: {
  project: CaseStudy;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease,
      }}
      className="group relative overflow-hidden border border-white/15 bg-[#151515]"
    >
      <Link
        href={`#`}
        className="block"
        aria-label={`View ${project.title} case study`}
      >
        <div
          className="relative min-h-[420px] overflow-hidden md:min-h-[520px]"
          style={{
            backgroundImage: `${project.gradient}, url(${project.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <motion.div
            className="absolute inset-0 bg-black/20"
            whileHover={{
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
            transition={{
              duration: 0.35,
            }}
          />

          <motion.div
            className="absolute inset-0"
            whileHover={{
              scale: 1.035,
            }}
            transition={{
              duration: 0.65,
              ease,
            }}
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
            <TypewriterEyebrow
              text={project.eyebrow}
              className="max-w-[70%] text-white/70"
            />

            <span className="text-[10px] uppercase tracking-[.18em] text-white/45">
              0{index + 1}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.75,
              }}
              transition={{
                duration: 0.55,
                delay: 0.12,
                ease,
              }}
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-white/60">
                {project.category}
              </p>

              <div className="flex items-end justify-between gap-5">
                <h3 className="max-w-[11ch] text-[42px] font-black uppercase leading-[.88] text-white md:text-[58px]">
                  {project.title}
                </h3>

                <motion.span
                  className="mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-white"
                  whileHover={{
                    backgroundColor: '#f15a24',
                    borderColor: '#f15a24',
                    color: '#111111',
                    rotate: 6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </div>

              <motion.p
                className="mt-5 max-w-xl text-[15px] leading-6 text-white/70"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.22,
                  ease,
                }}
              >
                {project.caption}
              </motion.p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/25 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-white/65 transition-colors duration-300 group-hover:border-orange group-hover:text-orange"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedCaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleStudies = useMemo(() => {
    if (activeFilter === 'All') return caseStudies;

    return caseStudies.filter(
      (study) => study.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section
      id="work"
      className="bg-ink px-5 py-20 text-bone md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1fr_.55fr] lg:items-end"
        >
          <div>
            <TypewriterEyebrow
              text="Selected transformations"
              className="text-orange"
            />

            <h2 className="mt-6 max-w-[12ch] text-[52px] font-black uppercase leading-[.86] md:text-[72px] lg:text-[92px]">
              Featured
              <span className="block font-serif font-normal italic normal-case text-orange">
                case studies.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
            A closer look at businesses that outgrew where they started
            and needed a brand capable of carrying what came next.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 py-8">
          {filters.map((filter) => {
            const active = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[.1em] transition-all duration-300 ${
                  active
                    ? 'border-orange bg-orange text-black'
                    : 'border-white/25 text-white/65 hover:border-orange hover:text-orange'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid gap-px bg-white/15 md:grid-cols-2"
          >
            {visibleStudies.map((project, index) => (
              <CaseStudyCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}