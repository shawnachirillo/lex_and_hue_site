'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<
    'light' | 'dark'
  >('light');

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
          <Link href="/case-studies">
            Case Studies
          </Link>

          <Link href="/#approach">
            Approach
          </Link>

          <Link href="/#services">
            Services
          </Link>

          <Link href="/pricing">
            Pricing
          </Link>

          <Link href="/start-a-project">
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          aria-label={
            menuOpen ? 'Close menu' : 'Open menu'
          }
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((current) => !current)
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

              <Link
                href="/start-a-project"
                onClick={() => setMenuOpen(false)}
              >
                Start a project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}