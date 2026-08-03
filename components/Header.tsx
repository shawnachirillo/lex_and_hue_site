'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const QUESTIONNAIRE_READY = false;
const CONTACT_EMAIL = 'info@lexandhue.com';
export const OPEN_PROJECT_INQUIRY_EVENT = 'open-project-inquiry';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryPreviewOpen, setInquiryPreviewOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const sections = [
      { id: 'top', theme: 'light' },
      { id: 'approach', theme: 'dark' },
      { id: 'services', theme: 'light' },
      { id: 'contact', theme: 'dark' },
      { id: 'footer', theme: 'light' },
    ] as const;

    const handleScroll = () => {
      const navOffset = 80;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= navOffset && rect.bottom > navOffset) {
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const openInquiry = () => {
      setMenuOpen(false);
      setInquiryPreviewOpen(true);
    };

    window.addEventListener(
      OPEN_PROJECT_INQUIRY_EVENT,
      openInquiry
    );

    return () => {
      window.removeEventListener(
        OPEN_PROJECT_INQUIRY_EVENT,
        openInquiry
      );
    };
  }, []);

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

  const openInquiry = () => {
    setMenuOpen(false);
    setInquiryPreviewOpen(true);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 ${
          navTheme === 'light'
            ? 'text-white'
            : 'text-[#1a1715]'
        }`}
      >
        <Link
          href="/"
          className="text-[14px] font-black"
          onClick={() => setMenuOpen(false)}
        >
          LEX & HUE
        </Link>

        <nav className="hidden gap-8 text-[11px] uppercase md:flex">
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/#approach">Approach</Link>
          <Link href="/#services">Services</Link>
          <Link href="/pricing">Pricing</Link>

          {QUESTIONNAIRE_READY ? (
            <Link href="/start-a-project">
              Start a project
            </Link>
          ) : (
            <button
              type="button"
              onClick={openInquiry}
              className="text-left uppercase"
            >
              Start a project
            </button>
          )}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          className="md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

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
            <nav className="mb-8 flex flex-col gap-3 text-[48px]">
              <Link
                href="/case-studies"
                onClick={() => setMenuOpen(false)}
              >
                Case Studies
              </Link>

              <Link
                href="/#approach"
                onClick={() => setMenuOpen(false)}
              >
                Approach
              </Link>

              <Link
                href="/#services"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>

              {QUESTIONNAIRE_READY ? (
                <Link
                  href="/start-a-project"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a project
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openInquiry}
                  className="text-left"
                >
                  Start a project
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
              aria-labelledby="global-project-inquiry-title"
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 18,
                scale: 0.985,
              }}
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
                id="global-project-inquiry-title"
                className="mt-5 max-w-[12ch] text-[42px] font-black uppercase leading-[.88] md:text-[62px]"
              >
                The guided inquiry is nearly ready.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
                The full discovery questionnaire is currently being
                finalized. In the meantime, reach out directly and tell
                me a little about your business, what has changed, and
                what you need next.
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
    </>
  );
}