'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';


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
        <div className="grid gap-14 border-b border-white/15 pb-14 md:grid-cols-[1.25fr_.7fr_.7fr] md:gap-10 md:pb-16">
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
           
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">
              Navigation
            </p>

            <nav className="mt-6 flex flex-col items-start gap-3 text-sm">
              <Link
                href="/case-studies"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Case Studies
              </Link>

              <Link
                href="/#approach"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Approach
              </Link>

              <Link
                href="/#services"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Services
              </Link>

              <Link
                href="/pricing"
                className="text-white/65 transition-colors hover:text-orange"
              >
                Pricing
              </Link>

              <button
                type="button"
                onClick={openProjectInquiry}
                className="text-left text-white/65 transition-colors hover:text-orange"
              >
                Start a Project
              </button>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">
              Contact
            </p>

            <div className="mt-6">
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

              <p className="mt-3 text-sm text-white/40">
                Milwaukee, Wisconsin
              </p>
            </div>
          </div>
        </div>

       
      </div>
    </footer>
  );
}