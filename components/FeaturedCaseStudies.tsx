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
                <h3 className="max-w-[12ch] text-[28px] font-white uppercase leading-[.9] text-white md:text-[36px]">
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
      className="fixed inset-0 z-[100] bg-black/85 p-0 backdrop-blur-sm md:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease }}
        className="relative mx-auto h-full w-full max-w-[1500px] overflow-hidden bg-bone text-ink shadow-2xl"
      >
        {/* MODAL BACKGROUND IMAGE */}
        <motion.div
  aria-hidden="true"
  initial={{ opacity: 0, scale: 1.04 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.1, ease }}
  className="pointer-events-none absolute inset-0"
>
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[]"
    style={{
      backgroundImage: "url('/images/doorknob.jpg')",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/55" />
</motion.div>

        {/* MODAL CONTENT */}
        <div className="relative z-10 flex h-full flex-col">
          <header className="flex shrink-0 items-center justify-between border-b border-bone/15 bg-bone/80 px-5 py-4 backdrop-blur-[2px] md:px-8">
          <Link
            href="/"
            onClick={onClose}
            className="text-[14px] font-black uppercase"
          >
            Lex & Hue
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] uppercase tracking-[.18em] text-bonek/45 sm:block">
              {String(projectIndex + 1).padStart(2, '0')} /{' '}
              {String(totalProjects).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/25 transition hover:border-orange hover:bg-orange"
              aria-label="Close case study"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* INTRO */}
          <section className="px-5 pb-14 pt-12 md:px-10 md:pb-20 md:pt-16 lg:px-14">
            <div className="mx-auto max-w-[1280px]">
             

            <div className="grid gap-10 lg:grid-cols-[.72fr_.28fr] lg:items-end">
                <div>
                 
                  <motion.h2
                    id="case-study-title"
                    key={project.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="mt-5 max-w-[12ch] text-[52px] font-black uppercase leading-[.85] text-white md:text-[76px] lg:text-[96px]"
                  >
                    {project.title}
                  </motion.h2>

                  <motion.p
                    key={`${project.slug}-caption`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12, ease }}
                    className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl"
                  >
                    {project.caption}
                  </motion.p>
                </div>

                <Link
                  href="/start-a-project"
                  onClick={onClose}
                  className="group inline-flex w-fit items-center gap-4 rounded-full bg-orange px-7 py-4 text-[11px] font-bold uppercase text-black transition hover:bg-black hover:text-white"
                >
                  Start a project
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-12 grid gap-px bg-black/45 backdrop-blur-sm md:grid-cols-4">
                <MetaBlock label="Client" value={project.title} />
                <MetaBlock label="Services" value={project.services.join(' / ')} />
                <MetaBlock label="Location" value="Milwaukee, USA" />
                <MetaBlock label="Timeline" value="Project based" />
              </div>
            </div>
          </section>

          {/* HERO VISUAL */}
          <section className="px-5 md:px-10 lg:px-14">
            <div
              className="mx-auto aspect-[16/8] max-w-[1280px] overflow-hidden border border-black/10"
              style={{
                backgroundImage: `${project.gradient}, url(${project.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </section>

          {/* STORY */}
          <LongCaseSection
            eyebrow="The business we met"
            title="A strong business whose identity no longer reflected its reality."
            copy={project.overview}
            mediaLabel="Before / existing brand"
          />

          <LongCaseSection
            eyebrow="The challenge"
            title="The gap was larger than a visual refresh."
            copy={project.challenge}
            mediaLabel="Audit / discovery / strategic findings"
            dark
          />

          <LongCaseSection
            eyebrow="The scope that changed"
            title="The work expanded as the real problem became clear."
            copy={project.direction}
            mediaLabel="Strategy / positioning / creative direction"
          />

          <LongCaseSection
            eyebrow="The system"
            title="Every touchpoint needed to tell the same story."
            copy={`The identity was shaped as a complete system across ${project.services.join(
              ', '
            )}. Each part was designed to feel connected rather than treated as an isolated deliverable.`}
            mediaLabel="Identity system / applications / digital experience"
            dark
          />

          <LongCaseSection
            eyebrow="What the client received"
            title="A brand capable of carrying what came next."
            copy={project.outcome}
            mediaLabel="Final brand / website / rollout"
          />

          {/* REVIEW */}
          <section className="bg-orange px-5 py-14 text-black md:px-10 md:py-20 lg:px-14">
            <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.28fr_.72fr]">
              <p className="text-[10px] font-bold uppercase tracking-[.2em]">
                Client review
              </p>

              <div>
                <blockquote className="max-w-4xl font-serif text-[34px] italic leading-[1.08] md:text-[52px]">
                  “The brand finally feels like the business we have already become.”
                </blockquote>

                <p className="mt-7 text-[11px] font-bold uppercase tracking-[.14em]">
                  Client name / Founder
                </p>
              </div>
            </div>
          </section>

          {/* MORE PROJECTS */}
          <section className="bg-ink px-5 py-14 text-bone md:px-10 md:py-20 lg:px-14">
            <div className="mx-auto max-w-[1280px]">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-orange">
                    Featured projects
                  </p>
                  <h3 className="mt-4 text-[38px] font-black uppercase leading-[.9] md:text-[56px]">
                    Keep exploring.
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onNext}
                  className="group inline-flex items-center gap-3 border-b border-white/30 pb-2 text-[11px] font-bold uppercase transition hover:border-orange hover:text-orange"
                >
                  Next case study
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-bone px-5 py-14 md:px-10 md:py-20 lg:px-14">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-8 border-t border-black/15 pt-10 md:flex-row md:items-end md:justify-between">
              <h3 className="max-w-[10ch] text-[48px] font-black uppercase leading-[.85] md:text-[70px]">
                Ready to start the project?
              </h3>

              <Link
                href="/start-a-project"
                onClick={onClose}
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-black px-7 py-4 text-[11px] font-bold uppercase text-white transition hover:bg-orange hover:text-black"
              >
                Start project
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>
        </div>

          <footer className="flex shrink-0 items-center justify-between border-t border-black/15 bg-bone/80 px-5 py-4 backdrop-blur-[2px] md:px-8">
          <button
            type="button"
            onClick={onPrevious}
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-black/50 transition hover:text-orange"
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
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-black/50 transition hover:text-orange"
          >
            Next
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          </footer>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MetaBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-transparent px-5 py-5">
      <p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/60">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase leading-5 text-white">
        {value}
      </p>
    </div>
  );
}

function LongCaseSection({
  eyebrow,
  title,
  copy,
  mediaLabel,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  mediaLabel: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`px-5 py-14 md:px-10 md:py-20 lg:px-14 ${
        dark ? 'bg-ink text-bone' : 'bg-bone text-ink'
      }`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[.28fr_.72fr]">
          <p
            className={`text-[10px] font-bold uppercase tracking-[.2em] ${
              dark ? 'text-orange' : 'text-orange'
            }`}
          >
            {eyebrow}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease }}
          >
            <h3 className="max-w-[16ch] text-[36px] font-black uppercase leading-[.9] md:text-[52px]">
              {title}
            </h3>

            <p
              className={`mt-7 max-w-3xl text-base leading-8 md:text-lg ${
                dark ? 'text-white/60' : 'text-black/60'
              }`}
            >
              {copy}
            </p>
          </motion.div>
        </div>

        <div
          className={`mt-12 flex aspect-[16/8] items-center justify-center border text-[10px] font-bold uppercase tracking-[.18em] ${
            dark
              ? 'border-white/15 bg-white/[0.035] text-white/30'
              : 'border-black/10 bg-black/[0.025] text-black/30'
          }`}
        >
          {mediaLabel}
        </div>
      </div>
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
              <h2 className="max-w-[12ch] text-[44px] font-black uppercase leading-[.88] md:text-[58px] lg:text-[68px]">
                Featured
                <span className="block font-serif font-normal italic normal-case text-orange">
                  case studies.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
              A closer look at businesses that outgrew where they
              started and needed a brand capable of carrying what came
              next.
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