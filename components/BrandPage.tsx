'use client';
import Link from 'next/link';

function TypewriterEyebrow({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`text-[11px] font-semibold uppercase tracking-[.28em] ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
          },
        },
      }}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [0, 1, 1, 0],
            },
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.08, 0.78, 1],
            repeat: Infinity,
            repeatDelay: 0.7,
            delay: index * 0.045,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  X,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const rotations = [
  {
    word: 'REBRAND',
    a: '#F15A24',
    b: '#251813',
  },
  {
    word: 'REINVENT',
    a: '#6D775F',
    b: '#F0A04B',
  },
  {
    word: 'RELAUNCH',
    a: '#C7B9A5',
    b: '#1A2831',
  },
];

const work = [
  {
    index: '01',
    title: 'Bero',
    type: 'Hospitality / Repositioning',
    copy:
      'A sharper, more editorial identity built to feel established before it ever says a word.',
    tone: 'bg-[#1a1715]',
    accent: 'bg-[#e5652d]',
  },
  {
    index: '02',
    title: 'Morrow House',
    type: 'Interiors / Brand Reinvention',
    copy:
      'Warm authority, tactile restraint, and a system designed to grow with a more discerning clientele.',
    tone: 'bg-[#c9b9a4]',
    accent: 'bg-[#20201d]',
  },
  {
    index: '03',
    title: 'Commonwell',
    type: 'Wellness / Relaunch',
    copy:
      'A quiet, dimensional identity that makes the experience feel considered rather than generic.',
    tone: 'bg-[#6f7663]',
    accent: 'bg-[#f1c778]',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    summary: 'Understand the business beneath the brand.',
    detail:
      'We begin with conversation, research and a close look at what already exists. We uncover what changed, what still works and what the current brand can no longer support.',
  },
  {
    number: '02',
    title: 'Define',
    summary: 'Decide what the next version needs to communicate.',
    detail:
      'We clarify positioning, audience, messaging and creative direction before designing. This gives the work a reason and keeps every decision connected.',
  },
  {
    number: '03',
    title: 'Design',
    summary: 'Build the identity and experience as one system.',
    detail:
      'We shape the visual identity, typography, color, imagery and digital experience around the strategy, not as disconnected pieces.',
  },
  {
    number: '04',
    title: 'Introduce',
    summary: 'Bring the next chapter into the world intentionally.',
    detail:
      'We prepare the rollout, refine the essential touchpoints and help the business introduce its evolution with clarity and confidence.',
  },
];
// TEMPORARY LAUNCH FLAG
// Change this to true when the full questionnaire is ready.
const QUESTIONNAIRE_READY = false;
const CONTACT_EMAIL = 'hello@lexandhue.com';



export default function BrandPage() {
  const [rotation, setRotation] = useState(0);
  const [inquiryPreviewOpen, setInquiryPreviewOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 90]
  );

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.96]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(
        (i) => (i + 1) % rotations.length
      );
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const current = useMemo(
    () => rotations[rotation],
    [rotation]
  );
 
  useEffect(() => {
    if (!inquiryPreviewOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInquiryPreviewOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inquiryPreviewOpen]);

  return (
    <main className="overflow-hidden bg-bone text-ink">

      {/* HERO */}
      <section
  id="top"
  ref={heroRef}
  className="relative min-h-[100svh] bg-ink px-5 pb-24 pt-24 text-bone md:px-10 md:pb-28 md:pt-28"
>
        <div className="mx-auto grid min-h-[82svh] max-w-[1500px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">

          {/* LEFT */}
          <div className="relative z-10">
            <motion.p
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-10 max-w-sm text-[11px] uppercase tracking-[.18em] text-white/50"
            >
              Businesses ready for a rebrand, reinvention and relaunch 
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="max-w-[820px] text-[52px] font-black uppercase leading-[.91] md:text-[72px] lg:text-[88px]"
            >
              <span className="block">
                Your business
              </span>

              <span className="block">
                has evolved.
              </span>

              <span className="mt-2 block">
                Your brand
              </span>

              <span className="block">
                should too.
              </span>
            </motion.h1>

            {/* ROTATION */}
            <div className="mt-12 md:mt-14">
              <div className="flex flex-col">
                <span className="mb-3 text-[12px] font-medium uppercase tracking-[.22em] text-white/50">
                  It is time to
                </span>

                <div className="relative h-[1.05em] overflow-hidden text-[48px] font-black uppercase leading-none text-orange md:text-[64px] lg:text-[80px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.word}
                      initial={{
                        y: '85%',
                        opacity: 0,
                      }}
                      animate={{
                        y: '0%',
                        opacity: 1,
                      }}
                      exit={{
                        y: '-85%',
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="absolute left-0 top-0"
                    >
                      {current.word}.
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-10">
  
  <div className="mt-7 flex flex-wrap gap-3">
  <div className="flex flex-wrap items-center gap-4">
  {QUESTIONNAIRE_READY ? (
    <Link
      href="/start-a-project"
      className="group inline-flex items-center gap-4 rounded-full border border-orange bg-orange px-7 py-4 text-[12px] font-bold uppercase text-black transition-all duration-300 hover:bg-transparent hover:text-orange"
    >
      Start a project

      <ArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => setInquiryPreviewOpen(true)}
      className="group inline-flex items-center gap-4 rounded-full border border-orange bg-orange px-7 py-4 text-[12px] font-bold uppercase text-black transition-all duration-300 hover:bg-transparent hover:text-orange"
    >
      Start a project

      <ArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </button>
  )}

  <Link
  href="/case-studies"
  className="group inline-flex items-center gap-4 rounded-full border border-white/30 px-7 py-4 text-[12px] font-bold uppercase text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
>
  View case studies

  <ArrowDownRight
    size={17}
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
  />
</Link>
</div>
  </div>
</div>
            </div>
          </div>


          {/* RIGHT VISUAL */}
          <motion.div
            style={{
              y: heroY,
              scale: heroScale,
            }}
            className="relative mx-auto h-[48vh] min-h-[420px] w-full max-w-[580px] overflow-hidden rounded-[1.5rem] lg:h-[70vh]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={rotation}
                initial={{
                  opacity: 0,
                  scale: 1.035,
                  x: 24,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                  x: -18,
                }}
                transition={{
                  duration: 0.75,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(145deg, ${current.a}, ${current.b})`,
                  }}
                />

                {/* QUIETER SHAPES */}
                <motion.div
                  animate={{
                    rotate: [
                      0,
                      8,
                      -5,
                      0,
                    ],
                    x: [
                      0,
                      12,
                      -5,
                      0,
                    ],
                    y: [
                      0,
                      -10,
                      8,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute left-[13%] top-[14%] h-36 w-36 rounded-full border border-white/35 backdrop-blur-sm md:h-44 md:w-44"
                />

                <motion.div
                  animate={{
                    rotate: [
                      10,
                      -6,
                      8,
                      10,
                    ],
                    x: [
                      0,
                      -16,
                      7,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute bottom-[10%] right-[8%] h-[46%] w-[52%] rounded-[50%_50%_42%_58%/55%_41%_59%_45%] bg-white/15 backdrop-blur-md"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-b hairline px-5 py-6 md:px-10">
        <div className="flex min-w-max animate-[marquee_22s_linear_infinite] gap-12 text-[14px] uppercase [@media(prefers-reduced-motion:reduce)]:animate-none">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex gap-12"
            >
              <span>Strategy</span>
              <span>Atmosphere</span>
              <span>Identity</span>
              <span>Web</span>
              <span>Relaunch</span>
              <span>Stewardship</span>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

    {/* REALITY / INTERACTIVE SECTION */}
<section
  id="approach"
  className="relative overflow-hidden bg-bone text-ink"
>
  <div className="grid sm:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">

    {/* LEFT */}
    <div className="relative min-w-0 px-5 py-16 sm:flex sm:min-h-[560px] sm:items-center sm:px-7 sm:py-10 md:min-h-[620px] md:px-9 lg:min-h-[680px] lg:px-12 xl:px-14">
      <div className="w-full min-w-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8"
        >
          <TypewriterEyebrow text="The Pattern" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[680px] text-[42px] font-black uppercase leading-[0.92] sm:text-[38px] md:text-[46px] lg:text-[58px] xl:text-[68px]"
        >
          No longer feel connected to your business identity?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            delay: 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 max-w-[500px] font-serif text-[36px] font-normal italic leading-[0.92] text-orange sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[48px]"
        >
          Here&apos;s what happened.
        </motion.p>
      </div>
    </div>

    {/* RIGHT */}
    <div className="min-w-0 border-t border-black/10 px-5 py-14 sm:min-h-[560px] sm:border-l sm:border-t-0 sm:px-6 sm:py-10 md:min-h-[620px] md:px-8 lg:min-h-[680px] lg:px-10 xl:px-12">
      <div className="flex h-full min-w-0 flex-col justify-center">
        <RealityAccordion />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 flex justify-end"
        >
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center gap-4 border-b border-black pb-2 text-[14px] font-semibold uppercase transition-colors hover:border-orange hover:text-orange"
                >
                  View case studies

                  <ArrowDownRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                </Link>
        </motion.div>
      </div>
    </div>
  </div>
</section>


     
      {/* <section className="bg-ink px-5 py-24 text-bone md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[.35fr_.65fr]">
          <p className="kicker text-white/60">
            What changes
          </p>

          <div>
            <p className="text-[clamp(3.6rem,8vw,9rem)] font-black uppercase leading-[.84] tracking-[-.075em]">
              Less “look at us.”
              <br />

              <span className="font-serif font-normal italic text-orange">
                More presence.
              </span>
            </p>

            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-white/75">
              The goal isn't visual noise.
              It's movement, tension, pacing,
              contrast and reveal — so the site
              feels authored, not assembled.
            </p>
          </div>
        </div>
      </section> */}
      {/* PROCESS */}
      <section
        id="services"
        className="bg-ink text-bone"
      >
        <div className="grid min-h-[75vh] lg:grid-cols-2">
          {/* LEFT HALF: PROCESS ACCORDION */}
          <div className="flex min-h-[75vh] flex-col  px-5 py-10 md:px-10 md:py-12 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-20"
            >
              <TypewriterEyebrow text="How We Work" />

              <h2 className="mt-8 text-[38px] font-black uppercase leading-[.88] md:text-[48px] lg:text-[52px] xl:text-[58px]">
                Our process
                <span className="mt-1 block font-serif text-[24px] font-normal italic normal-case text-orange md:text-[30px] lg:text-[34px]">
                  behind every shift.
                </span>
              </h2>
            </motion.div>

            <div className="flex-1 border-t border-white/15">
              {processSteps.map((step, index) => (
                <ProcessRow
                  key={step.number}
                  step={step}
                  defaultOpen={index === 0}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 flex justify-end translate-x-20"
            >
              {QUESTIONNAIRE_READY ? (
                <Link
                  href="/start-a-project"
                  className="group inline-flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-[11px] font-bold uppercase text-black transition-all duration-300 hover:bg-bone"
                >
                  Start a project

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setInquiryPreviewOpen(true)}
                  className="group inline-flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-[11px] font-bold uppercase text-black transition-all duration-300 hover:bg-bone"
                >
                  Start a project

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>
              )}
            </motion.div>
          </div>

          {/* RIGHT HALF: INTENTIONALLY EMPTY FOR FUTURE IMAGE */}
          <div
            aria-hidden="true"
            className="hidden min-h-[75vh] bg-ink lg:block"
          />
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="relative overflow-hidden bg-orange px-5 py-24 md:px-10 md:py-36"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-black/20"
        />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[.75fr_.25fr] lg:items-end">
          <div>
            <TypewriterEyebrow
              text="The next chapter"
              className="text-black"
            />

            <h2 className="mt-5 text-[64px] font-black uppercase leading-[.8] md:text-[96px] lg:text-[128px]">
              Outgrown
              <br />
              your brand?
            </h2>
          </div>

          <div>
            <p className="max-w-sm text-lg leading-relaxed">
              Good! That means the business
              moved. Now the identity needs to
              catch up, deliberately.
            </p>
            <div className="flex flex-wrap items-center gap-4">
  {QUESTIONNAIRE_READY ? (
    <Link
      href="/start-a-project"
      className="group mt-10 inline-flex items-center gap-4 rounded-full border border-black bg-black px-7 py-4 text-[11px] font-bold uppercase text-white transition-all duration-300 hover:bg-transparent hover:text-white"
    >
      Start a project

      <ArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => setInquiryPreviewOpen(true)}
      className="group mt-10 inline-flex items-center gap-4 rounded-full border border-black bg-black px-7 py-4 text-[11px] font-bold uppercase text-white transition-all duration-300 hover:bg-transparent hover:text-white"
    >
      Start a project

      <ArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </button>
  )}

 
</div>


          </div>
        </div>
      </section>

      <AnimatePresence>
        {inquiryPreviewOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setInquiryPreviewOpen(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-inquiry-title"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.985 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-[680px] overflow-hidden border border-white/15 bg-ink px-6 py-8 text-bone shadow-2xl md:px-10 md:py-10"
            >
              <button
                type="button"
                onClick={() => setInquiryPreviewOpen(false)}
                className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-orange hover:bg-orange hover:text-black"
                aria-label="Close project inquiry"
              >
                <X size={17} />
              </button>

              <p className="pr-14 text-[10px] font-bold uppercase tracking-[.16em] text-orange">
                Start a project
              </p>

              <h2
                id="project-inquiry-title"
                className="mt-5 max-w-[12ch] text-[42px] font-black uppercase leading-[.88] md:text-[62px]"
              >
                The guided inquiry is nearly ready.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
                The full discovery questionnaire is currently being finalized.
                In the meantime, you can reach out directly and tell me a little
                about your business, what has changed, and what you need next.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/15 pt-7">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Lex%20%26%20Hue%20Project%20Inquiry`}
                  className="group inline-flex items-center gap-4 rounded-full bg-orange px-7 py-4 text-[11px] font-bold uppercase text-black transition hover:bg-bone"
                >
                  Email Lex & Hue
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

                <span className="text-sm text-white/45">
                  {CONTACT_EMAIL}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ProcessRow({
  step,
  defaultOpen = false,
}: {
  step: {
    number: string;
    title: string;
    summary: string;
    detail: string;
  };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group/row border-b border-white/15 transition-colors duration-300 hover:border-orange">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group w-full py-3.5 text-left md:py-4"
      >
        <div className="grid items-start gap-3 sm:grid-cols-[34px_1fr_auto] sm:items-center">
          <span className="text-[9px] text-white/30 transition-colors duration-300 group-hover:text-orange">
            {step.number}
          </span>

          <div>
            <h3
              className={`text-[27px] font-black uppercase leading-[.9] transition-colors duration-300 md:text-[32px] lg:text-[34px] xl:text-[38px] ${
                open
                  ? 'text-orange'
                  : 'text-bone group-hover:text-orange'
              }`}
            >
              {step.title}
            </h3>

            <p className="mt-1.5 max-w-lg font-sans text-[12px] leading-5 text-white/40 transition-colors duration-300 group-hover:text-white/65 md:text-[13px]">
              {step.summary}
            </p>
          </div>

          <motion.span
            animate={{
              rotate: open ? 45 : 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="text-xl font-light leading-none text-orange transition-transform duration-300 group-hover:scale-110"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pb-4 sm:ml-[46px]">
              <p className="max-w-lg font-sans text-[13px] leading-6 text-white/58 md:text-[14px]">
                {step.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RealityAccordion() {
  const [active, setActive] = useState<number | null>(0);

  const items = [
    {
      label: 'The problem',
      title: 'You outgrew it.',
      copy:
        "The business evolved, but the brand simply hasn't caught up.",
      word: 'FRICTION',
    },
    {
      label: 'The gap',
      title: 'People feel the difference.',
      copy:
        "Even when they can't explain it, they notice when the experience and identity don't align.",
      word: 'GAPS',
    },
    {
      label: 'The drift',
      title: 'It happened gradually.',
      copy:
        'One change became another until the brand no longer told the whole story.',
      word: 'DRIFT',
    },
    {
      label: 'The shift',
      title: 'Now make it visible.',
      copy:
        'Not by starting over, but by bringing everything back into alignment.',
      word: 'EVOLVE',
    },
  ];

  return (
    <div className="w-full min-w-0 border-t border-black/15">
      {items.map((item, index) => {
        const isOpen = active === index;

        return (
          <div
            key={item.label}
            className="w-full min-w-0 border-b border-black/15"
          >
            <button
              type="button"
              onClick={() =>
                setActive(isOpen ? null : index)
              }
              aria-expanded={isOpen}
              className="group flex w-full min-w-0 items-center justify-between gap-4 py-6 text-left sm:py-5 md:py-6 lg:py-7"
            >
              <span
                className={`text-[11px] font-semibold uppercase tracking-[.28em] transition-colors ${
                  isOpen
                    ? 'text-orange'
                    : 'text-black/70 group-hover:text-orange'
                }`}
              >
                {item.label}
              </span>

              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="shrink-0 text-[28px] font-light leading-none text-orange"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full min-w-0 overflow-hidden"
                >
                  <div className="relative mb-7 w-full min-w-0 overflow-hidden border border-black/10 bg-white/40 px-5 py-8 text-black sm:px-5 sm:py-8 md:px-7 md:py-10 lg:px-9 lg:py-11">

                    <div className="pointer-events-none absolute left-3 top-3 whitespace-nowrap text-[64px] font-black leading-none text-black/[0.04] sm:text-[58px] md:text-[72px] lg:text-[92px]">
                      {item.word}
                    </div>

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 min-w-0 pt-10 sm:pt-9 md:pt-12 lg:pt-14"
                    >
                      <h3 className="max-w-[640px] text-[32px] font-black leading-[1.02] text-black sm:text-[27px] md:text-[32px] lg:text-[40px] xl:text-[46px]">
                        {item.title}
                      </h3>

                      <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-black/60 sm:text-[14px] sm:leading-6 md:text-[16px] md:leading-7 lg:text-[18px] lg:leading-8">
                        {item.copy}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}