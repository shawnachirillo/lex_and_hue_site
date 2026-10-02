import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

import {
  work,
  type WorkItem,
  type WorkSection,
  type VisualAsset,
  type ProjectTheme,
} from '@/content/work';

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

const display = {
  fontFamily:
    '"neue-haas-grotesk-display", sans-serif',
  fontWeight: 700,
} as const;

const courier = {
  fontFamily:
    '"Courier New", Courier, monospace',
} as const;

const editorial = {
  fontFamily:
    'var(--font-instrument-serif), Georgia, serif',
  fontStyle: 'italic',
  fontWeight: 400,
} as const;

const defaultTheme: ProjectTheme = {
  background: '#252422',
  surface: '#f8f4eb',
  foreground: '#f8f4eb',
  muted: '#d7c5b4',
  accent: '#fd5100',
};

export default async function WorkPage({
  params,
}: WorkPageProps) {
  const { slug } = await params;

  const projectIndex = work.findIndex(
    (item) => item.slug === slug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = work[projectIndex];

  const nextProject =
    work[(projectIndex + 1) % work.length];

  const theme =
    project.theme ?? defaultTheme;

  return (
    <main className="bg-[#f8f4eb] text-[#252422]">
      <ProjectHeader
        project={project}
        theme={theme}
      />

      {project.sections?.map(
        (section, index) => (
          <SectionRenderer
            key={`${section.type}-${index}`}
            section={section}
            project={project}
            theme={theme}
          />
        )
      )}

      <NextProject
        project={nextProject}
        theme={theme}
      />
    </main>
  );
}

/* =========================================================
   PROJECT HEADER
========================================================= */

function ProjectHeader({
  project,
  theme,
}: {
  project: WorkItem;
  theme: ProjectTheme;
}) {
  return (
    <header className="bg-[#252422] px-5 pb-16 pt-28 text-[#f8f4eb] md:px-10 md:pb-20 md:pt-32 lg:px-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex items-center justify-between">
          <Link
            href="/#work"
            className="group flex items-center gap-2 text-[10px] uppercase text-[#f8f4eb]/40 transition-colors hover:text-[#f8f4eb]"
            style={courier}
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />

            Work
          </Link>

          <p
            className="text-[10px] uppercase text-[#f8f4eb]/35"
            style={courier}
          >
            {project.index} /{' '}
            {String(work.length).padStart(2, '0')}
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p
              className="text-[10px] uppercase"
              style={{
                ...courier,
                color: theme.accent,
              }}
            >
              {project.type}
            </p>

            <h1
              className="mt-5 max-w-[1200px] text-[58px] uppercase leading-[0.82] md:text-[88px] lg:text-[118px]"
              style={display}
            >
              {project.title}
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4">
            <p
              className="max-w-[500px] text-[22px] leading-[1.08] text-[#f8f4eb]/85 md:text-[27px]"
              style={editorial}
            >
              {project.copy}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {project.services.map(
                (service) => (
                  <span
                    key={service}
                    className="text-[10px] uppercase text-[#f8f4eb]/40"
                    style={courier}
                  >
                    {service}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   SECTION ROUTER
========================================================= */

function SectionRenderer({
  section,
  project,
  theme,
}: {
  section: WorkSection;
  project: WorkItem;
  theme: ProjectTheme;
}) {
  switch (section.type) {
    case 'hero-image':
      return (
        <HeroImage
          section={section}
          theme={theme}
        />
      );

    case 'split':
      return (
        <SplitComposition
          section={section}
          theme={theme}
        />
      );

    case 'editorial-grid':
      return (
        <EditorialGrid
          section={section}
          theme={theme}
        />
      );

    case 'logo-field':
      return (
        <LogoField
          section={section}
          theme={theme}
          project={project}
        />
      );

    case 'identity-grid':
      return (
        <IdentityGrid
          section={section}
          theme={theme}
        />
      );

    case 'product-showcase':
      return (
        <ProductShowcase
          section={section}
          theme={theme}
        />
      );

    case 'digital-showcase':
      return (
        <DigitalShowcase
          section={section}
          theme={theme}
        />
      );

    case 'note':
      return (
        <NoteBlock section={section} />
      );

    case 'statement':
      return (
        <Statement
          section={section}
          theme={theme}
        />
      );

    case 'outcome':
      return (
        <Outcome
          section={section}
          theme={theme}
        />
      );

    default:
      return null;
  }
}

/* =========================================================
   VISUAL ASSET

   Real image OR intentional placeholder.

   This is what lets us art-direct before every final
   project asset exists.
========================================================= */

function Asset({
  asset,
  className = '',
  imageClassName = 'object-cover',
  dark = false,
}: {
  asset: VisualAsset;
  className?: string;
  imageClassName?: string;
  dark?: boolean;
}) {
  if (asset.kind === 'image') {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
      >
        <Image
          src={asset.image.src}
          alt={asset.image.alt}
          fill
          sizes="100vw"
          className={imageClassName}
          style={{
            objectPosition:
              asset.image.objectPosition ??
              'center',
          }}
        />

        {asset.label && (
          <div
            className="absolute bottom-3 left-3 bg-[#252422]/80 px-2 py-1 text-[8px] uppercase text-[#f8f4eb]"
            style={courier}
          >
            {asset.label}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border ${
        dark
          ? 'border-[#f8f4eb]/15 bg-[#1d1c1a]'
          : 'border-[#252422]/15 bg-[#ebe6dc]'
      } ${className}`}
    >
      <div className="max-w-[260px] px-8 text-center">
        <p
          className={`text-[10px] uppercase ${
            dark
              ? 'text-[#f8f4eb]/65'
              : 'text-[#252422]/60'
          }`}
          style={courier}
        >
          {asset.label}
        </p>

        {asset.note && (
          <p
            className={`mt-3 text-[9px] leading-4 ${
              dark
                ? 'text-[#f8f4eb]/30'
                : 'text-[#252422]/35'
            }`}
            style={courier}
          >
            {asset.note}
          </p>
        )}

        <div
          className={`mx-auto mt-6 h-px w-10 ${
            dark
              ? 'bg-[#f8f4eb]/20'
              : 'bg-[#252422]/20'
          }`}
        />
      </div>
    </div>
  );
}

/* =========================================================
   COPY CAPTION

   Copy follows the imagery.
   It does NOT create its own giant section.
========================================================= */

function CompositionCopy({
  copy,
  theme,
}: {
  copy?: {
    label?: string;
    heading?: string;
    body?: string;
  };
  theme: ProjectTheme;
}) {
  if (!copy) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-12">
      <div className="md:col-span-3">
        {copy.label && (
          <p
            className="text-[10px] uppercase text-[#252422]/40"
            style={courier}
          >
            {copy.label}
          </p>
        )}
      </div>

      <div className="md:col-span-3">
        {copy.heading && (
          <p
            className="max-w-[360px] text-[13px] font-bold uppercase leading-5"
            style={courier}
          >
            {copy.heading}
          </p>
        )}
      </div>

      <div className="md:col-span-5 md:col-start-8">
        {copy.body && (
          <p
            className="max-w-[600px] text-[12px] leading-6 text-[#252422]/55"
            style={courier}
          >
            {copy.body}
          </p>
        )}
      </div>

      <div
        className="hidden"
        style={{
          color: theme.accent,
        }}
      />
    </div>
  );
}

/* =========================================================
   HERO IMAGE
========================================================= */

function HeroImage({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'hero-image' }
  >;
  theme: ProjectTheme;
}) {
  const height =
    section.height === 'screen'
      ? 'h-[88vh]'
      : section.height === 'medium'
        ? 'h-[62vh]'
        : 'h-[76vh]';

  if (!section.inset) {
    return (
      <section
        className="bg-[#f8f4eb]"
        style={{
          borderBottomColor:
            theme.accent,
        }}
      >
        <Asset
          asset={section.image}
          className={`w-full min-h-[520px] ${height}`}
        />

        {section.caption && (
          <div className="mx-auto max-w-[1800px] px-5 py-3 md:px-10 lg:px-12">
            <p
              className="text-[9px] uppercase text-[#252422]/35"
              style={courier}
            >
              {section.caption}
            </p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="bg-[#f8f4eb] py-12 md:py-20">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <Asset
          asset={section.image}
          className={`min-h-[520px] ${height}`}
        />
      </div>
    </section>
  );
}

/* =========================================================
   SPLIT
========================================================= */

function SplitComposition({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'split' }
  >;
  theme: ProjectTheme;
}) {
  let columns =
    'md:grid-cols-2';

  if (
    section.ratio === 'left-heavy'
  ) {
    columns =
      'md:grid-cols-[1.35fr_0.65fr]';
  }

  if (
    section.ratio === 'right-heavy'
  ) {
    columns =
      'md:grid-cols-[0.65fr_1.35fr]';
  }

  return (
    <section className="bg-[#f8f4eb] py-16 md:py-24">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <div
          className={`grid gap-3 md:gap-4 ${columns}`}
        >
          <Asset
            asset={section.left}
            className="aspect-[4/5] md:min-h-[760px]"
          />

          <Asset
            asset={section.right}
            className="aspect-[4/5] md:min-h-[760px]"
          />
        </div>

        <CompositionCopy
          copy={section.copy}
          theme={theme}
        />
      </div>
    </section>
  );
}

/* =========================================================
   EDITORIAL GRID
========================================================= */

function EditorialGrid({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'editorial-grid' }
  >;
  theme: ProjectTheme;
}) {
  const heroRight =
    section.heroSide === 'right';

  return (
    <section className="bg-[#f8f4eb] py-16 md:py-28">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <div className="grid gap-3 md:grid-cols-12 md:gap-4">
          <div
            className={`${
              heroRight
                ? 'md:order-2'
                : 'md:order-1'
            } md:col-span-8`}
          >
            <Asset
              asset={section.hero}
              className="aspect-[4/5] md:min-h-[980px]"
            />
          </div>

          <div
            className={`grid gap-3 md:col-span-4 md:gap-4 ${
              heroRight
                ? 'md:order-1'
                : 'md:order-2'
            }`}
          >
            <Asset
              asset={section.secondary}
              className="aspect-square"
            />

            {section.tertiary && (
              <Asset
                asset={section.tertiary}
                className="aspect-square"
              />
            )}
          </div>
        </div>

        <CompositionCopy
          copy={section.copy}
          theme={theme}
        />
      </div>
    </section>
  );
}

/* =========================================================
   LOGO FIELD
========================================================= */

function LogoField({
  section,
  theme,
  project,
}: {
  section: Extract<
    WorkSection,
    { type: 'logo-field' }
  >;
  theme: ProjectTheme;
  project: WorkItem;
}) {
  const height =
    section.height === 'medium'
      ? 'h-[58vh]'
      : 'h-[78vh]';

  const background =
    section.background ??
    theme.background;

  const foreground =
    section.foreground ??
    theme.foreground;

  return (
    <section className="bg-[#f8f4eb] py-16 md:py-28">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <div className="mb-4 flex justify-between gap-5">
          <p
            className="text-[10px] uppercase text-[#252422]/40"
            style={courier}
          >
            {section.label ??
              'Primary Identity'}
          </p>

          <p
            className="text-[10px] uppercase text-[#252422]/30"
            style={courier}
          >
            {project.title}
          </p>
        </div>

        <div
          className={`relative flex min-h-[520px] items-center justify-center overflow-hidden ${height}`}
          style={{
            backgroundColor: background,
            color: foreground,
          }}
        >
          {section.logo.kind ===
          'image' ? (
            <div className="relative h-[42%] w-[68%]">
              <Image
                src={
                  section.logo.image.src
                }
                alt={
                  section.logo.image.alt
                }
                fill
                sizes="70vw"
                className="object-contain"
              />
            </div>
          ) : (
            <Asset
              asset={section.logo}
              dark
              className="h-full w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   IDENTITY GRID
========================================================= */

function IdentityGrid({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'identity-grid' }
  >;
  theme: ProjectTheme;
}) {
  return (
    <section className="bg-[#f8f4eb] py-16 md:py-28">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {section.assets.map(
            (asset, index) => (
              <Asset
                key={index}
                asset={asset}
                className={`${
                  index === 0
                    ? 'aspect-[16/10] md:col-span-2'
                    : 'aspect-[4/3]'
                }`}
              />
            )
          )}
        </div>

        <CompositionCopy
          copy={section.copy}
          theme={theme}
        />
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT SHOWCASE
========================================================= */

function ProductShowcase({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'product-showcase' }
  >;
  theme: ProjectTheme;
}) {
  const heroRight =
    section.heroSide === 'right';

  return (
    <section className="bg-[#f8f4eb] py-16 md:py-28">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <div className="grid gap-3 md:grid-cols-12 md:gap-4">
          <div
            className={`md:col-span-8 ${
              heroRight
                ? 'md:order-2'
                : 'md:order-1'
            }`}
          >
            <Asset
              asset={section.hero}
              className="aspect-[4/5] md:min-h-[980px]"
            />
          </div>

          <div
            className={`grid gap-3 md:col-span-4 md:gap-4 ${
              heroRight
                ? 'md:order-1'
                : 'md:order-2'
            }`}
          >
            {section.details?.map(
              (asset, index) => (
                <Asset
                  key={index}
                  asset={asset}
                  className="aspect-square"
                />
              )
            )}
          </div>
        </div>

        <CompositionCopy
          copy={section.copy}
          theme={theme}
        />
      </div>
    </section>
  );
}

/* =========================================================
   DIGITAL
========================================================= */

function DigitalShowcase({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'digital-showcase' }
  >;
  theme: ProjectTheme;
}) {
  return (
    <section className="bg-[#f8f4eb] py-16 md:py-28">
      <div className="mx-auto w-[94vw] max-w-[1800px]">
        <Asset
          asset={section.desktop}
          className="aspect-[16/10] md:min-h-[760px]"
        />

        {(section.mobile ||
          section.secondary) && (
          <div className="mt-4 grid items-start gap-4 md:grid-cols-12">
            {section.secondary && (
              <div className="md:col-span-8">
                <Asset
                  asset={
                    section.secondary
                  }
                  className="aspect-[4/3]"
                />
              </div>
            )}

            {section.mobile && (
              <div
                className={
                  section.secondary
                    ? 'md:col-span-4'
                    : 'md:col-span-4 md:col-start-9'
                }
              >
                <Asset
                  asset={
                    section.mobile
                  }
                  className="aspect-[9/16]"
                />
              </div>
            )}
          </div>
        )}

        <CompositionCopy
          copy={section.copy}
          theme={theme}
        />
      </div>
    </section>
  );
}

/* =========================================================
   NOTE
========================================================= */

function NoteBlock({
  section,
}: {
  section: Extract<
    WorkSection,
    { type: 'note' }
  >;
}) {
  return (
    <section className="bg-[#f8f4eb] px-5 py-20 md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 border-t border-[#252422]/20 pt-4 md:grid-cols-12">
          <div className="md:col-span-3">
            {section.label && (
              <p
                className="text-[10px] uppercase text-[#252422]/40"
                style={courier}
              >
                {section.label}
              </p>
            )}
          </div>

          <div className="md:col-span-3">
            {section.heading && (
              <p
                className="text-[13px] font-bold uppercase"
                style={courier}
              >
                {section.heading}
              </p>
            )}
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p
              className="max-w-[620px] text-[13px] leading-7 text-[#252422]/60"
              style={courier}
            >
              {section.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STATEMENT
========================================================= */

function Statement({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'statement' }
  >;
  theme: ProjectTheme;
}) {
  const dark =
    section.theme !== 'light';

  const background =
    section.theme === 'project'
      ? theme.background
      : dark
        ? '#252422'
        : '#f8f4eb';

  const foreground = dark
    ? '#f8f4eb'
    : '#252422';

  return (
    <section
      className="px-5 py-28 md:px-10 md:py-40 lg:px-12"
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      <div className="mx-auto max-w-[1800px]">
        <p
          className="max-w-[1300px] text-[44px] uppercase leading-[0.9] md:text-[70px] lg:text-[94px]"
          style={display}
        >
          {section.text}

          {section.accent && (
            <>
              {' '}

              <span
                className="normal-case"
                style={{
                  ...editorial,
                  color: theme.accent,
                }}
              >
                {section.accent}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   OUTCOME
========================================================= */

function Outcome({
  section,
  theme,
}: {
  section: Extract<
    WorkSection,
    { type: 'outcome' }
  >;
  theme: ProjectTheme;
}) {
  return (
    <section className="bg-[#f8f4eb] px-5 py-28 md:px-10 md:py-36 lg:px-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-10 border-t border-[#252422]/20 pt-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <p
              className="text-[10px] uppercase text-[#252422]/40"
              style={courier}
            >
              Outcome
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p
              className="max-w-[900px] text-[22px] leading-[1.35] md:text-[28px]"
              style={courier}
            >
              {section.body}
            </p>

            <div
              className="mt-12 h-[3px] w-20"
              style={{
                backgroundColor:
                  theme.accent,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NEXT PROJECT
========================================================= */

function NextProject({
  project,
  theme,
}: {
  project: WorkItem;
  theme: ProjectTheme;
}) {
  return (
    <section className="bg-[#252422] px-5 py-20 text-[#f8f4eb] md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-16 border-t border-[#f8f4eb]/15 pt-4 md:grid-cols-12">
          <div className="md:col-span-8">
            <p
              className="text-[10px] uppercase text-[#f8f4eb]/35"
              style={courier}
            >
              Next Project
            </p>

            <Link
              href={`/work/${project.slug}`}
              className="group mt-8 inline-flex items-end gap-5"
            >
              <span
                className="text-[42px] uppercase leading-[0.88] md:text-[64px] lg:text-[82px]"
                style={display}
              >
                {project.title}
              </span>

              <ArrowRight
                size={30}
                className="mb-1 transition-transform duration-300 group-hover:translate-x-2"
                style={{
                  color: theme.accent,
                }}
              />
            </Link>
          </div>

          <div className="flex flex-col justify-end md:col-span-4 md:items-end">
            <p
              className="text-[10px] uppercase text-[#f8f4eb]/35"
              style={courier}
            >
              Have something changing?
            </p>

            <Link
              href="/start-a-project"
              className="group mt-5 inline-flex items-center gap-3 text-[11px] uppercase"
              style={{
                ...courier,
                color: theme.accent,
              }}
            >
              Start a Project

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}