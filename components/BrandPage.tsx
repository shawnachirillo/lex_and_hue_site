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
  Menu,
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

const services = [
  [
    '01',
    'Brand Strategy',
    'Positioning, audience, point of view, naming direction, verbal character.',
  ],
  [
    '02',
    'Identity Systems',
    'Logo ecosystems, typography, color, art direction, image language, brand rules.',
  ],
  [
    '03',
    'Digital Experience',
    'Web direction and design that feels like the brand, not a template wearing it.',
  ],
  [
    '04',
    'Relaunch Direction',
    'Launch narrative, rollout, campaign direction, and the handoff into the next chapter.',
  ],
];
const sections = [
  { id: 'top', theme: 'light' },
  { id: 'approach', theme: 'dark' },
  { id: 'services', theme: 'light' },
  { id: 'contact', theme: 'dark' },
  { id: 'footer', theme: 'light' },
] as const;

export default function BrandPage() {
  const [rotation, setRotation] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<
  'light' | 'dark'
>('light');

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
  const sections = [
    { id: 'top', theme: 'light' },
    { id: 'approach', theme: 'dark' },
    { id: 'services', theme: 'light' },
    { id: 'contact', theme: 'dark' },
  ] as const;

  const handleScroll = () => {
    const navOffset = 80;

    for (const section of sections) {
      const element = document.getElementById(
        section.id
      );

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (
        rect.top <= navOffset &&
        rect.bottom > navOffset
      ) {
        setNavTheme(section.theme);
        break;
      }
    }
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  window.addEventListener('resize', handleScroll);

  return () => {
    window.removeEventListener(
      'scroll',
      handleScroll
    );

    window.removeEventListener(
      'resize',
      handleScroll
    );
  };
}, []);
  return (
    <main className="overflow-hidden bg-bone text-ink">

      {/* NAV */}
      <header
  className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 ${
    navTheme === 'light'
      ? 'text-white'
      : 'text-[#1a1715]'
  }`}
>
      <Link
  href="/"
  className="text-sm font-black tracking-[-0.04em]"
>
  LEX & HUE
</Link>

        <nav className="hidden gap-8 text-[11px] uppercase tracking-[.18em] md:flex">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#services">Services</a>
          <Link href="/pricing">
  Pricing
</Link>
          <Link href="/start-a-project">
  Start a project
</Link>
        </nav>

        <button
          aria-label="Open menu"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink p-7 text-bone md:hidden"
          >
            <div className="mb-8 flex flex-col gap-3 text-5xl tracking-[-.06em]">
              <a
                onClick={() =>
                  setMenuOpen(false)
                }
                href="#work"
              >
                Work
              </a>

              <a
                onClick={() =>
                  setMenuOpen(false)
                }
                href="#approach"
              >
                Approach
              </a>

              <a
                onClick={() =>
                  setMenuOpen(false)
                }
                href="#services"
              >
                Services
              </a>

              <Link href="/start-a-project">
  Start a project
</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="max-w-[820px] text-[clamp(3.1rem,5.5vw,6rem)] font-black uppercase leading-[.91] "
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
                <span className="mb-3 text-[14px] font-medium uppercase tracking-[.22em] text-white/">
                  It is time to
                </span>

                <div className="relative h-[1.05em] overflow-hidden text-[clamp(3rem,5vw,5.5rem)] font-black uppercase leading-none tracking-[-.055em] text-orange">
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
  <Link
    href="/start-a-project"
    className="group inline-flex items-center gap-4 rounded-full border border-orange bg-orange px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-transparent hover:text-orange"
  >
    Start a project

    <ArrowUpRight
      size={17}
      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
    />
  </Link>

  <a
    href="#work"
    className="group inline-flex items-center gap-4 rounded-full border border-white/30 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
  >
    View case studies

    <ArrowDownRight
      size={17}
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
    />
  </a>
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
        <div className="flex min-w-max animate-[marquee_22s_linear_infinite] gap-12 text-sm uppercase tracking-[.18em] [@media(prefers-reduced-motion:reduce)]:animate-none">
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
  className="relative min-h-[90vh] overflow-hidden bg-bone text-ink"
>
  <div className="grid min-h-[90vh] lg:grid-cols-[0.46fr_0.54fr]">

    {/* LEFT — STATEMENT */}
    <div className="relative flex flex-col justify-between px-6 py-20 md:px-10 md:py-24 lg:px-14">

      {/* subtle background circles */}
      <div className="pointer-events-none absolute -left-32 top-[28%] h-[420px] w-[420px] rounded-full border border-black/[0.05]" />
      <div className="pointer-events-none absolute -left-20 top-[34%] h-[340px] w-[340px] rounded-full border border-black/[0.05]" />

      <div>
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 flex items-center gap-4"
        >
      

      <TypewriterEyebrow text="The Reality" />

        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -110 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.95,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[680px] text-[clamp(2rem,4vw,5.7rem)] font-black leading-[.92] "
        >
          GROWING BUSINESSES OFTEN REACH A POINT WHERE THINGS NO LONGER FEEL CONNECTED.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: .8,
            delay: 0.18,
            ease: [1, 1, 0.36, 1],
          }}
          className="mt-6 text-[clamp(4rem,3.2vw,3.7rem)] font-black italic leading-none tracking-[-.04em] text-orange"
        >
          Why is that?
        </motion.p>
      </div>

      <motion.p
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-16 max-w-sm text-sm leading-6 text-black/45"
      >
       
      </motion.p>
    </div>

    {/* RIGHT — ACCORDION + CTA */}
<div className="relative flex flex-col justify-center border-l border-black/10 px-6 py-16 md:px-10 lg:px-14">

<div className="w-full">
  <RealityAccordion />
  
</div>

{/* BOTTOM RIGHT CTA */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.75,
    delay: 0.25,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="mt-16 flex justify-end md:mt-20"
>
  <a
    href="#work"
    className="group inline-flex items-center gap-5 border-b border-black pb-2 text-sm font-semibold uppercase tracking-[.16em] transition-colors duration-300 hover:border-orange hover:text-orange"
  >
    View Case Studies
    <ArrowDownRight
      size={18}
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
    />
  </a>
</motion.div>

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

   {/* SERVICES */}
<section
  id="services"
  className="bg-ink px-5 py-24 text-bone md:px-10 md:py-28"
>
  <div className="mx-auto max-w-[1500px]">

    {/* SECTION INTRO */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-14 md:mb-16"
    >
      <div className="mb-5 flex items-center gap-4">
      <TypewriterEyebrow text="What We Build" />

      </div>

      <h2 className="max-w-[900px] text-[clamp(2.8rem,5vw,5.8rem)] font-black uppercase leading-[.92] tracking-[-.06em]">
        The system behind
        <span className="block text-orange">
          the shift.
        </span>
      </h2>

      <p className="mt-6 max-w-xl text-base leading-7 text-white/55 md:text-lg">
        Strategy, identity and experience working together so the brand can support where the business is going next.
      </p>
    </motion.div>

    {/* SERVICES LIST */}
    <div className="border-t border-white/15">
      {services.map(([n, title, desc]) => (
        <ServiceRow
          key={title}
          n={n}
          title={title}
          desc={desc}
        />
      ))}
    </div>

  </div>
  {/* CTA — BOTTOM RIGHT */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.7,
    delay: 0.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="mt-auto flex justify-end pt-16"
>
<Link href="/start-a-project">
  Start a project

    <ArrowUpRight
      size={17}
      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
    />
    
  </Link>
  
</motion.div>
  
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

            <h2 className="mt-5 text-[clamp(4.5rem,11vw,12rem)] font-black uppercase leading-[.8]">
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
  <Link
    href="/start-a-project"
    className="group mt-10 inline-flex items-center gap-4 rounded-full border border-black bg-black px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-transparent hover:text-white"
  >
    Start a project

    <ArrowUpRight
      size={17}
      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
    />
  </Link>

 
</div>


          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
  id="footer"
  className="flex flex-col gap-6 bg-ink px-5 py-8 text-bone md:flex-row md:items-end md:justify-between md:px-10"
>
          LEX & HUE
       

        <div className="text-xs uppercase tracking-[.16em] text-white/55">
          Strategy / Identity / Digital /
          Relaunch
        </div>
      </footer>
    </main>
  );
}

function ServiceRow({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="group w-full border-b border-white/15 py-6 text-left transition-colors duration-300 hover:border-orange/50 md:py-7"
    >
      <div className="grid items-center gap-4 md:grid-cols-[56px_1fr_auto]">

        {/* NUMBER */}
        <span className="text-[11px] text-white/35 transition-colors duration-300 group-hover:text-orange">
          {n}
        </span>

        {/* TITLE + DESCRIPTION */}
        <div>
          <span className="block text-[clamp(1.8rem,3vw,3.2rem)] font-black tracking-[-.045em] text-white transition-colors duration-300 group-hover:text-orange">
            {title}
          </span>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45 md:text-base">
            {desc}
          </p>
        </div>

        {/* PLUS */}
        <motion.span
          animate={{
            rotate: open ? 45 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="text-2xl font-light text-orange"
        >
          +
        </motion.span>
      </div>

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
            <div className="ml-0 mt-5 max-w-2xl text-sm leading-7 text-white/50 md:ml-14">
              Additional detail can go here later.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
function RealityAccordion() {
  const [active, setActive] = useState<number | null>(0);

  const items = [
    {
      label: 'The problem',
      // eyebrow: '01 / Friction',
      title: 'What once felt good enough now creates friction.',
      copy:
        'The website no longer reflects the quality of the work. Messaging has evolved in different directions. Things that once felt simple now take more explanation.',
      word: 'FRICTION',
    },
    {
      label: 'The gap',
      // eyebrow: '02 / Gaps',
      title: 'The business and the brand stop matching.',
      copy:
        'Your offer is stronger. Your experience is better. Your audience has matured. But what people see from the outside still belongs to an earlier version of the business.',
      word: 'GAPS',
    },
    {
      label: 'The drift',
      // eyebrow: '03 / Drift',
      title: 'Growth adds more — without always adding clarity.',
      copy:
        'New services, audiences, ideas and opportunities accumulate over time. Without a system connecting them, the brand begins to feel fragmented instead of expansive.',
      word: 'DRIFT',
    },
    {
      label: 'The shift',
      // eyebrow: 'What comes next',
      title: 'You don’t need to start over.',
      copy:
        'You need the brand to catch up to the business it represents now — with a clearer strategy, stronger identity and an experience built for where you’re going.',
      word: 'EVOLVE',
    },
  ];

  return (
    <div className="border-t border-black/15">
      {items.map((item, index) => {
        const isOpen = active === index;

        return (
          <div
            key={item.label}
            className="border-b border-black/15"
          >
            <button
              type="button"
              onClick={() => setActive(isOpen ? null : index)}
              className="group flex w-full items-center justify-between py-7 text-left md:py-8"
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
                className="text-3xl font-light leading-none text-orange"
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
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="relative mb-8 overflow-hidden border border-black/10 bg-white/40 px-6 py-10 text-black md:px-10 md:py-12">

                    {/* LARGE BACKGROUND WORD */}
                    <div className="pointer-events-none absolute -left-2 top-4 select-none text-[clamp(5rem,10vw,10rem)] font-black leading-[.75] tracking-[-.07em] text-black/[0.045]">
                      {item.word}
                    </div>

                    {/* CONTENT */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 40,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 ml-auto max-w-[570px]"
                    >
                      <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.28em] text-orange">
                      
                      </p>

                      <h3 className="max-w-[520px] text-[clamp(2.2rem,3.4vw,4rem)] font-black leading-[.98] tracking-[-.05em] text-black">
                        {item.title}
                      </h3>

                      <p className="mt-7 max-w-[520px] text-base leading-7 text-black/60 md:text-lg md:leading-8">
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