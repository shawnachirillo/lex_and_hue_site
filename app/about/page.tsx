import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-bone text-ink">
      {/* INTRO */}
      <section className="px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-black/50">
            About Lex & Hue
          </p>

          <h1 className="mt-10 max-w-[1200px] text-[52px] font-black uppercase leading-[.88] md:text-[82px] lg:text-[112px]">
            Design for the
            <br />
            whole
            <span className="font-serif font-normal italic text-orange">
              {' '}business.
            </span>
          </h1>

          <p className="mt-10 max-w-[720px] text-[18px] leading-8 text-black/60 md:text-[21px]">
            Lex & Hue is a design and technology company working
            across brand, experience, and systems.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-black/15 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.35fr_.65fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em]">
            Why we exist
          </p>

          <div>
            <h2 className="max-w-[900px] text-[40px] font-black uppercase leading-[.92] md:text-[58px] lg:text-[70px]">
              Businesses don&apos;t
              <br />
              experience change
              <br />
              <span className="font-serif font-normal italic text-orange">
                in neat categories.
              </span>
            </h2>

            <div className="mt-10 grid gap-7 text-[16px] leading-7 text-black/60 md:grid-cols-2">
              <p>
                A business can outgrow its identity, its website,
                its customer experience, or the systems holding
                everything together — sometimes all at once.
              </p>

              <p>
                Lex & Hue exists to look across those boundaries.
                We combine strategy, design, and technology to
                determine what actually needs to change and build
                from there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CAPABILITIES */}
      <section className="bg-ink px-5 py-20 text-bone md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-white/50">
            The practice
          </p>

          <div className="mt-12 border-t border-white/15">
            {[
              ['01', 'Brand', 'How the business is understood.'],
              ['02', 'Experience', 'How people experience it.'],
              ['03', 'Systems', 'How the business operates.'],
            ].map(([number, name, description]) => (
              <div
                key={name}
                className="grid gap-4 border-b border-white/15 py-9 md:grid-cols-[80px_.7fr_1fr] md:items-center"
              >
                <span className="text-[10px] text-white/30">
                  {number}
                </span>

                <h2 className="text-[36px] font-black uppercase md:text-[48px]">
                  {name}
                </h2>

                <p className="font-serif text-[22px] italic text-white/55 md:text-[26px]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.35fr_.65fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em]">
            Behind Lex & Hue
          </p>

          <div>
            <h2 className="max-w-[900px] text-[42px] font-black uppercase leading-[.92] md:text-[62px]">
              Built at the intersection
              <br />
              of design
              <span className="font-serif font-normal italic text-orange">
                {' '}and systems.
              </span>
            </h2>

            <p className="mt-9 max-w-[700px] text-[16px] leading-7 text-black/60 md:text-[18px]">
              Lex & Hue was founded by Shawna Chirillo with a
              multidisciplinary approach to brand, digital
              experience, and technology. The work moves between
              visual thinking and systems thinking — because how
              a business presents itself and how it actually works
              should support the same direction.
            </p>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-t border-black/15 px-5 py-16 md:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-black/45">
              Extended practice
            </p>

            <p className="mt-4 max-w-[650px] font-serif text-[24px] italic leading-tight md:text-[30px]">
              We also work alongside independent creative and
              technology partners when a project calls for it.
            </p>
          </div>

          <Link
            href="/partners"
            className="group inline-flex shrink-0 items-center gap-3 text-[11px] font-bold uppercase tracking-[.14em]"
          >
            Meet our partners
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange px-5 py-20 text-black md:px-10 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em]">
            Have something changing?
          </p>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[900px] text-[48px] font-black uppercase leading-[.9] md:text-[72px]">
              Let&apos;s figure out
              <br />
              what it needs.
            </h2>

            <Link
              href="/start-a-project"
              className="group inline-flex items-center gap-3 border-b border-black pb-2 text-[11px] font-bold uppercase tracking-[.14em]"
            >
              Start a project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}