'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  services: string[];
  eyebrow: string;
  caption: string;
  image?: string;
  gradient: string;
  overview: string;
  challenge: string;
  direction: string;
  outcome: string;
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
    overview:
      'The East End Co. is a fragrance house rooted in family memory, place, and the emotional atmosphere of home.',
    challenge:
      'The brand needed to feel storied and established without becoming nostalgic, overly ornate, or disconnected from a modern customer.',
    direction:
      'We built a flexible heritage system around distinctive fragrance houses, editorial typography, layered color, and a strong sense of place.',
    outcome:
      'The result is a brand world that feels collected rather than manufactured—capable of expanding across fragrance, bath, home, and ritual products.',
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
    overview:
      'Brianna Wohner needed a personal brand that could hold expertise, personality, and a more elevated professional presence.',
    challenge:
      'The existing presentation felt fragmented and did not communicate the confidence or sophistication of the work behind it.',
    direction:
      'We clarified the positioning and created an editorial identity with deliberate typography, restrained color, and a stronger visual hierarchy.',
    outcome:
      'The finished system gives Brianna a cohesive platform that feels personal without becoming casual and polished without becoming generic.',
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
    overview:
      'Legacy At Home provides person-centered residential care built around dignity, familiarity, and individual needs.',
    challenge:
      'The brand needed to communicate trust and professionalism without feeling clinical, institutional, or emotionally distant.',
    direction:
      'We created a warm, accessible identity using grounded color, approachable typography, and language centered on the person rather than the service.',
    outcome:
      'The new brand presents care as thoughtful, human, and dependable while giving the business a clearer foundation for growth.',
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
    overview:
      'The Stillpoint is a Reiki and breathwork practice designed around restoration, integration, and quiet personal ritual.',
    challenge:
      'The identity needed to feel spiritual without becoming vague, trendy, or visually detached from the grounded nature of the experience.',
    direction:
      'We drew from Great Lakes landscapes, Northwoods texture, natural materials, and a restrained visual system that leaves room for stillness.',
    outcome:
      'The resulting atmosphere feels calm, rooted, and intentional—supporting both the physical space and the broader client experience.',
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
  onOpen,
}: {
  project: CaseStudy;
  index: number;
  onOpen: () => void;
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
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${project.title} case study`}
      >
        <div
          className="relative aspect-[3/2] overflow-hidden"
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

          

          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
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
                <h3 className="max-w-[12ch] text-[28px] font-black uppercase leading-[.9] text-white md:text-[36px]">
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
                className="mt-3 max-w-xl text-[13px] leading-5 text-white/70 md:text-[14px]"
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

              <div className="mt-4 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/25 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[.1em] text-white/65 transition-colors duration-300 group-hover:border-orange group-hover:text-orange"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function CaseStudyModal({
  project,
  projectIndex,
  totalProjects,
  onClose,
  onPrevious,
  onNext,
}: {
  project: CaseStudy;
  projectIndex: number;
  totalProjects: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.985,
        }}
        transition={{
          duration: 0.35,
          ease,
        }}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-ink text-bone shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-white/15 px-5 py-4 md:px-7">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[.18em] text-white/40">
              {String(projectIndex + 1).padStart(2, '0')} /{' '}
              {String(totalProjects).padStart(2, '0')}
            </span>

            <span className="hidden text-[10px] uppercase tracking-[.16em] text-orange sm:block">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-orange hover:bg-orange hover:text-black"
            aria-label="Close case study"
          >
            <X size={17} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <section
            className="relative min-h-[46vh] overflow-hidden px-5 py-10 md:min-h-[58vh] md:px-10 md:py-14"
            style={{
              backgroundImage: `${project.gradient}, url(${project.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-black/25" />

            <div className="relative z-10 flex min-h-[38vh] flex-col justify-between md:min-h-[46vh]">
              <TypewriterEyebrow
                text={project.eyebrow}
                className="text-white/75"
              />

              <div>
                <motion.h2
                  id="case-study-title"
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease }}
                  className="max-w-[10ch] text-[48px] font-black uppercase leading-[.84] text-white md:text-[78px] lg:text-[96px]"
                >
                  {project.title}
                </motion.h2>

                <motion.p
                  key={`${project.slug}-caption`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12,
                    ease,
                  }}
                  className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg"
                >
                  {project.caption}
                </motion.p>
              </div>
            </div>
          </section>

          <section className="grid border-b border-white/15 md:grid-cols-[.34fr_.66fr]">
            <div className="border-b border-white/15 px-5 py-8 md:border-b-0 md:border-r md:px-8 md:py-12">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/35">
                Scope
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/25 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-white/65"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 py-8 md:px-10 md:py-12">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-orange">
                The business
              </p>

              <p className="mt-5 max-w-3xl font-serif text-[28px] leading-[1.08] text-white md:text-[38px]">
                {project.overview}
              </p>
            </div>
          </section>

          <CaseSection
            number="01"
            eyebrow="Discover"
            title="What needed to change"
            copy={project.challenge}
          />

          <CaseSection
            number="02"
            eyebrow="Define"
            title="The direction"
            copy={project.direction}
            alternate
          />

          <CaseSection
            number="03"
            eyebrow="Design + Introduce"
            title="What the new system made possible"
            copy={project.outcome}
          />

          <section className="bg-orange px-5 py-12 text-black md:px-10 md:py-16">
            <TypewriterEyebrow
              text="Your next chapter"
              className="text-black/65"
            />

            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h3 className="max-w-[12ch] text-[44px] font-black uppercase leading-[.86] md:text-[64px]">
                Ready to make the shift visible?
              </h3>

              <Link
                href="/start-a-project"
                onClick={onClose}
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-black px-7 py-4 text-[11px] font-bold uppercase text-white transition hover:bg-bone hover:text-black"
              >
                Start a project

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>
        </div>

        <footer className="flex shrink-0 items-center justify-between border-t border-white/15 bg-ink px-5 py-4 md:px-7">
          <button
            type="button"
            onClick={onPrevious}
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-white/55 transition hover:text-orange"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Previous
          </button>

          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-white/55 transition hover:text-orange"
          >
            Next
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}

function CaseSection({
  number,
  eyebrow,
  title,
  copy,
  alternate = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  alternate?: boolean;
}) {
  return (
    <section
      className={`grid border-b border-white/15 px-5 py-12 md:grid-cols-[.28fr_.72fr] md:px-10 md:py-16 ${
        alternate ? 'bg-white/[0.035]' : 'bg-ink'
      }`}
    >
      <div>
        <span className="text-[10px] text-white/30">
          {number}
        </span>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.18em] text-orange">
          {eyebrow}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease }}
      >
        <h3 className="max-w-[15ch] text-[34px] font-black uppercase leading-[.9] md:text-[48px]">
          {title}
        </h3>

        <p className="mt-6 max-w-3xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
          {copy}
        </p>

        <div
          aria-hidden="true"
          className="mt-10 aspect-[16/7] w-full border border-white/10 bg-white/[0.035]"
        />
      </motion.div>
    </section>
  );
}

export default function FeaturedCaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] =
    useState<CaseStudy | null>(null);

  const visibleStudies = useMemo(() => {
    if (activeFilter === 'All') return caseStudies;

    return caseStudies.filter(
      (study) => study.category === activeFilter
    );
  }, [activeFilter]);

  const selectedIndex = selectedProject
    ? caseStudies.findIndex(
        (study) => study.slug === selectedProject.slug
      )
    : -1;

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }

      if (event.key === 'ArrowLeft') {
        setSelectedProject((current) => {
          if (!current) return null;

          const currentIndex = caseStudies.findIndex(
            (study) => study.slug === current.slug
          );

          return caseStudies[
            (currentIndex - 1 + caseStudies.length) %
              caseStudies.length
          ];
        });
      }

      if (event.key === 'ArrowRight') {
        setSelectedProject((current) => {
          if (!current) return null;

          const currentIndex = caseStudies.findIndex(
            (study) => study.slug === current.slug
          );

          return caseStudies[
            (currentIndex + 1) % caseStudies.length
          ];
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const showPrevious = () => {
    if (selectedIndex < 0) return;

    setSelectedProject(
      caseStudies[
        (selectedIndex - 1 + caseStudies.length) %
          caseStudies.length
      ]
    );
  };

  const showNext = () => {
    if (selectedIndex < 0) return;

    setSelectedProject(
      caseStudies[(selectedIndex + 1) % caseStudies.length]
    );
  };

  return (
    <>
      <section
        id="work"
        className="bg-ink px-5 py-16 text-bone md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1080px]">
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
             

              <h2 className="mt-5 max-w-[12ch] text-[44px] font-black uppercase leading-[.88] md:text-[58px] lg:text-[68px]">
                Featured
                <span className="block font-serif font-normal italic normal-case text-orange">
                  case studies.
                </span>
              </h2>
            </div>

          
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
              className="grid gap-4 md:grid-cols-2"
            >
              {visibleStudies.map((project, index) => (
                <CaseStudyCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.slug}
            project={selectedProject}
            projectIndex={selectedIndex}
            totalProjects={caseStudies.length}
            onClose={() => setSelectedProject(null)}
            onPrevious={showPrevious}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}