import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-bone text-ink">
      {/* ABOUT */}
      <section className="px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
            <h1 className="font-display text-[48px] uppercase leading-[0.9] md:text-[62px] lg:text-[68px]">
              Design for the
              <br />
              whole{' '}
              <span className="font-editorial text-orange">
                business.
              </span>
            </h1>

            <div className="max-w-[570px] lg:pt-1">
              <p className="font-display text-[21px] leading-[1.25] md:text-[25px]">
                Lex & Hue is a design and technology studio for
                businesses in transition.
              </p>

              <p className="mt-6 max-w-[540px] font-body text-[15px] leading-7 text-black/60">
                We work across brand identity, websites, digital
                experiences, and custom systems — connecting how a
                business presents itself with how it actually works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-ink px-5 py-12 text-bone md:px-10 md:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1fr_1fr_1fr] md:gap-10">
            <h2 className="font-display text-[24px] uppercase leading-none">
              What we do.
            </h2>

            <div>
              <h3 className="font-display text-[17px] uppercase">
                Brand
              </h3>
              <p className="mt-3 font-body text-[13px] leading-6 text-white/55">
                Strategy, identity, positioning, and creative
                direction.
              </p>
            </div>

            <div>
              <h3 className="font-display text-[17px] uppercase">
                Digital
              </h3>
              <p className="mt-3 font-body text-[13px] leading-6 text-white/55">
                Websites, interfaces, and digital experiences.
              </p>
            </div>

            <div>
              <h3 className="font-display text-[17px] uppercase">
                Systems
              </h3>
              <p className="mt-3 font-body text-[13px] leading-6 text-white/55">
                Custom tools, portals, workflows, and automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENCE + CTA */}
      <section className="px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[690px]">
            <p className="font-editorial text-[27px] leading-[1.2] md:text-[32px]">
              One studio looking at the business as a whole,
              <span className="text-orange">
                {' '}not a collection of disconnected pieces.
              </span>
            </p>

            <p className="mt-5 max-w-[590px] font-body text-[13px] leading-6 text-black/55">
              Founded by Shawna Chirillo, Lex & Hue works across
              creative and technical disciplines, bringing in
              independent specialists when a project requires
              additional expertise.
            </p>
          </div>

          <Link
            href="/start-a-project"
            className="group inline-flex shrink-0 items-center gap-3 border-b border-black pb-2 font-body text-[13px] font-bold uppercase"
          >
            Start a project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}