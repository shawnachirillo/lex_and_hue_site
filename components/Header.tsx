'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import StartProjectModal from '@/components/StartProjectModal';

export const OPEN_PROJECT_INQUIRY_EVENT = 'open-project-inquiry';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const sections = [
      { id: 'top', theme: 'light' },
      { id: 'capabilities', theme: 'dark' },
      { id: 'work', theme: 'light' },
      { id: 'approach', theme: 'dark' },
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
    const handleOpenInquiry = () => {
      setMenuOpen(false);
      setInquiryOpen(true);
    };

    window.addEventListener(
      OPEN_PROJECT_INQUIRY_EVENT,
      handleOpenInquiry
    );

    return () => {
      window.removeEventListener(
        OPEN_PROJECT_INQUIRY_EVENT,
        handleOpenInquiry
      );
    };
  }, []);

  const openInquiry = () => {
    setMenuOpen(false);
    setInquiryOpen(true);
  };

  const closeInquiry = () => {
    setInquiryOpen(false);
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
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="relative block h-[34px] w-[120px]"
          aria-label="Lex & Hue home"
        >
          <Image
            src="/images/LH_final_logo_white.png"
            alt="Lex & Hue"
            fill
            priority
            sizes="120px"
            className={`object-contain object-left transition-[filter] duration-500 ${
              navTheme === 'dark' ? 'brightness-0' : ''
            }`}
          />
        </Link>

        {/* DESKTOP */}
        <nav className="hidden items-center gap-8 text-[11px] uppercase md:flex">
          <Link
            href="/#work"
            className="transition-opacity hover:opacity-55"
          >
            Work
          </Link>

          <Link
            href="/#capabilities"
            className="transition-opacity hover:opacity-55"
          >
            Capabilities
          </Link>

          <Link
            href="/about"
            className="transition-opacity hover:opacity-55"
          >
            About
          </Link>

          <Link
            href="/pricing"
            className="transition-opacity hover:opacity-55"
          >
            Pricing
          </Link>

          <button
            type="button"
            onClick={openInquiry}
            className="text-left uppercase transition-opacity hover:opacity-55"
          >
            Start a project
          </button>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink p-7 text-bone md:hidden"
          >
            <nav className="mb-8 flex flex-col gap-3 text-[48px] leading-[.95]">
              <Link
                href="/#work"
                onClick={() => setMenuOpen(false)}
              >
                Work
              </Link>

              <Link
                href="/#capabilities"
                onClick={() => setMenuOpen(false)}
              >
                Capabilities
              </Link>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>

              <button
                type="button"
                onClick={openInquiry}
                className="text-left"
              >
                Start a project
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <StartProjectModal
        open={inquiryOpen}
        onClose={closeInquiry}
      />
    </>
  );
}