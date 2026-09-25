'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const CONTACT_EMAIL = 'info@lexandhue.com';
const OPEN_PROJECT_INQUIRY_EVENT = 'open-project-inquiry';

function openProjectInquiry() {
  window.dispatchEvent(
    new CustomEvent(OPEN_PROJECT_INQUIRY_EVENT)
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-white/15 bg-ink text-bone"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-14 border-b border-white/15 pb-14 md:grid-cols-[1.35fr_.7fr_.7fr_.7fr] md:gap-10 md:pb-16">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/images/LAH_white_logo.png"
                alt="Lex & Hue"
                width={260}
                height={90}
                priority
                className="h-auto w-[210px] md:w-[250px]"
              />
            </Link>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.16em] text-orange">
              Design &amp; Technology Co.
            </p>

            <p className="mt-4 max-w-[330px] text-lg leading-7 text-white/55">
              We design how your business looks, feels, and operates.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">
              Explore
            </p>

            <nav className="mt-6 flex flex-col items-start gap-3 text-sm">
              <Link
                href="/#work"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Work
              </Link>

              <Link
                href="/#capabilities"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Capabilities
              </Link>

              <Link
                href="/about"
                className="text-white/65 transition-colors hover:text-orange"
              >
                About
              </Link>

              <Link
                href="/pricing"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* PARTNERS */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">
              Partners
            </p>

            <nav className="mt-6 flex flex-col items-start gap-3 text-sm">
              <Link
                href="/partners"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Status: Available
              </Link>

              <Link
                href="/partners"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Kairo
              </Link>

              <Link
                href="/partners"
                className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-orange transition-opacity hover:opacity-65"
              >
                View partners
                <ArrowUpRight size={13} />
              </Link>
            </nav>
          </div>

          {/* CONNECT */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">
              Connect
            </p>

            <div className="mt-6 flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={openProjectInquiry}
                className="text-left text-sm text-white/65 transition-colors hover:text-orange"
              >
                Start a Project
              </button>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-orange"
              >
                {CONTACT_EMAIL}

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <p className="pt-2 text-sm text-white/40">
                Milwaukee, Wisconsin
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Lex &amp; Hue</p>

          <p>Design &amp; Technology Co.</p>
        </div>
      </div>
    </footer>
  );
}