import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { work } from '@/content/work';

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return work.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkPage({
  params,
}: WorkPageProps) {
  const { slug } = await params;

  const project = work.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-bone text-ink">
      {/* HERO */}
      <section className="px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[1500px]">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-black/45 transition-colors hover:text-orange"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Selected work
          </Link>

          <div className="mt-14 grid gap-10 lg:grid-cols-[.3fr_.7fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-orange">
                {project.eyebrow}
              </p>

              <p className="mt-4 text-[10px] text-black/35">
                {project.index}
              </p>
            </div>

            <div>
              <h1 className="text-[58px] font-black uppercase leading-[.85] md:text-[90px] lg:text-[120px]">
                {project.title}
              </h1>

              <p className="mt-10 max-w-[760px] font-serif text-[26px] italic leading-[1.15] text-black/60 md:text-[34px]">
                {project.copy}
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-black/55"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT IMAGE */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[55vh] overflow-hidden bg-black md:min-h-[75vh]">
            <Image
              src={project.image}
              alt={`${project.title} project`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="border-t border-black/15 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.3fr_.7fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-black/45">
            Overview
          </p>

          <p className="max-w-[900px] font-serif text-[30px] italic leading-[1.2] md:text-[42px]">
            {project.overview}
          </p>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="bg-ink px-5 py-20 text-bone md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.3fr_.7fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-white/45">
            The challenge
          </p>

          <div>
            <h2 className="max-w-[850px] text-[40px] font-black uppercase leading-[.92] md:text-[60px]">
              What needed
              <br />
              <span className="font-serif font-normal italic text-orange">
                to change.
              </span>
            </h2>

            <p className="mt-8 max-w-[720px] text-[16px] leading-8 text-white/60">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTION */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.3fr_.7fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-black/45">
            Direction
          </p>

          <div>
            <h2 className="max-w-[850px] text-[40px] font-black uppercase leading-[.92] md:text-[60px]">
              The response.
            </h2>

            <p className="mt-8 max-w-[720px] text-[16px] leading-8 text-black/60">
              {project.direction}
            </p>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="bg-orange px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.3fr_.7fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-black/50">
            Outcome
          </p>

          <p className="max-w-[900px] font-serif text-[30px] italic leading-[1.2] text-black md:text-[42px]">
            {project.outcome}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-5 py-16 text-bone md:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[700px] font-serif text-[28px] italic leading-tight md:text-[36px]">
            Have a business going through its own shift?
          </p>

          <Link
            href="/start-a-project"
            className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.14em] text-orange"
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