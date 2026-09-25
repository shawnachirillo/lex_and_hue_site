import { partners } from '@/content/partners';

export default function PartnersPage() {
  return (
    <main className="bg-bone text-ink">
      <section className="px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-black/45">
            Partners
          </p>

          <h1 className="mt-10 max-w-[1100px] text-[52px] font-black uppercase leading-[.88] md:text-[82px] lg:text-[108px]">
            Independent
            <br />
            expertise.
            <br />
            <span className="font-serif font-normal italic text-orange">
              Shared direction.
            </span>
          </h1>

          <p className="mt-10 max-w-[680px] text-[17px] leading-8 text-black/60 md:text-[19px]">
            Lex & Hue works with independent creative and technology partners
            when a project benefits from additional specialized expertise.
          </p>
        </div>
      </section>

      <section className="border-t border-black/15 px-5 pb-28 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="grid gap-6 border-b border-black/15 py-10 md:py-12 lg:grid-cols-[80px_1fr] lg:items-start lg:gap-10"
            >
              <span className="text-[10px] font-semibold text-black/35">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h2 className="text-[38px] font-black uppercase leading-none md:text-[52px]">
                {partner.name}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-bone md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.35fr_.65fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-white/45">
            How it works
          </p>

          <p className="max-w-[850px] font-serif text-[30px] italic leading-[1.15] text-white/75 md:text-[42px]">
            The right team is shaped around the work — not the other way
            around.
          </p>
        </div>
      </section>
    </main>
  );
}