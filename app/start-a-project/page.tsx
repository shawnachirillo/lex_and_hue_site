'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { FormEvent, ReactNode, useMemo, useState } from 'react';

type FormData = {
  projectType: string;
  businessName: string;
  website: string;
  description: string;
  changed: string;
  next: string;
  investment: string;
  timing: string;
  name: string;
  email: string;
  extra: string;
};

const initialData: FormData = {
  projectType: '',
  businessName: '',
  website: '',
  description: '',
  changed: '',
  next: '',
  investment: '',
  timing: '',
  name: '',
  email: '',
  extra: '',
};

const projectTypes = [
  'Rebrand an existing business',
  'Reinvent / reposition my brand',
  'Launch something new',
  'Website design',
  'Brand + website',
  "I'm not entirely sure yet",
];

const investmentOptions = [
  '$3–5k',
  '$5–10k',
  '$10–20k',
  '$20k+',
  "I'm not sure yet",
];

const timingOptions = [
  'As soon as possible',
  'Within 1–2 months',
  'Within 3–6 months',
  "I'm flexible",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function StartAProjectPage() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>(initialData);

  const totalSteps = 6;

  const progress = useMemo(
    () => (step / totalSteps) * 100,
    [step]
  );

  const update = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(data.projectType);

    if (step === 2) {
      return Boolean(
        data.businessName.trim() &&
          data.description.trim()
      );
    }

    if (step === 3) {
      return data.changed.trim().length >= 10;
    }

    if (step === 4) {
      return data.next.trim().length >= 10;
    }

    if (step === 5) {
      return Boolean(
        data.investment &&
          data.timing
      );
    }

    if (step === 6) {
      return Boolean(
        data.name.trim() &&
          /^\S+@\S+\.\S+$/.test(data.email.trim())
      );
    }

    return false;
  }, [data, step]);

  const goNext = () => {
    if (!canContinue || step >= totalSteps) return;

    setDirection(1);
    setStep((current) => current + 1);
  };

  const goBack = () => {
    if (step === 1) {
      setStarted(false);
      return;
    }

    setDirection(-1);
    setStep((current) => current - 1);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (!canContinue) return;

    /*
      CONNECT YOUR FORM SERVICE HERE.

      Examples:
      - API route + Resend
      - Formspree
      - HoneyBook
      - HubSpot
      - Supabase

      For now this just shows the confirmation state.
    */

    console.log(data);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="relative flex min-h-screen overflow-hidden bg-orange px-5 py-6 text-ink md:px-10 md:py-8">
        <AmbientShapes />

        <Link
          href="/"
          className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/30 transition hover:bg-black hover:text-white md:right-10 md:top-8"
          aria-label="Back to Lex & Hue"
        >
          <X size={18} />
        </Link>

        <div className="relative z-10 m-auto w-full max-w-[1500px]">
          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="kicker mb-6"
          >
            Inquiry received / 06 of 06
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="max-w-[9ch] text-[clamp(5rem,14vw,13rem)] font-black uppercase leading-[.78]"
          >
            Good things{' '}
            <span className="font-serif font-normal italic">
              change.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid gap-8 border-t border-black/25 pt-6 md:grid-cols-[1fr_auto] md:items-end"
          >
            <p className="max-w-2xl text-xl leading-relaxed md:text-2xl">
              Thanks for telling us what&apos;s next for{' '}
              <strong>
                {data.businessName || 'your business'}
              </strong>
              . We&apos;ll review the project and be in
              touch within two business days.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-bold uppercase"
            >
              Back to Lex & Hue
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink text-bone">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference text-white md:px-10 md:py-7">
        <Link
          href="/"
          className="text-sm font-black"
        >
          LEX & HUE
        </Link>

        <Link
          href="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 transition hover:bg-white hover:text-black"
          aria-label="Close project inquiry"
        >
          <X size={17} />
        </Link>
      </header>

      <AnimatePresence
        mode="wait"
        custom={direction}
      >
        {!started ? (
          <Intro
            key="intro"
            onStart={() => setStarted(true)}
          />
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-screen flex-col px-5 pb-6 pt-28 md:px-10 md:pb-8 md:pt-32"
          >
            <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
              {/* Progress */}

              <div className="mb-10 md:mb-16">
                <div className="mb-4 flex items-center justify-between text-[10px] uppercase text-white/50 md:text-xs">
                  <span>Start a project</span>

                  <span>
                    {String(step).padStart(2, '0')} /{' '}
                    {String(totalSteps).padStart(2, '0')}
                  </span>
                </div>

                <div className="h-px bg-white/20">
                  <motion.div
                    className="h-px bg-orange"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.55,
                      ease,
                    }}
                  />
                </div>
              </div>

              {/* Question */}

              <div className="flex flex-1 items-center">
                <AnimatePresence
                  mode="wait"
                  custom={direction}
                >
                  <motion.section
                    key={step}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({
                        opacity: 0,
                        y: d > 0 ? 48 : -48,
                      }),

                      center: {
                        opacity: 1,
                        y: 0,
                      },

                      exit: (d: number) => ({
                        opacity: 0,
                        y: d > 0 ? -35 : 35,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.55,
                      ease,
                    }}
                    className="w-full"
                  >
                    {step === 1 && (
                      <StepOne
                        data={data}
                        update={update}
                      />
                    )}

                    {step === 2 && (
                      <StepTwo
                        data={data}
                        update={update}
                      />
                    )}

                    {step === 3 && (
                      <StepText
                        eyebrow="03 / The shift"
                        question="What changed?"
                        hint="Your business evolved. Tell us what’s different now."
                        value={data.changed}
                        onChange={(value) =>
                          update('changed', value)
                        }
                        placeholder="The work has become more sophisticated, but our brand still feels like the company we were three years ago…"
                      />
                    )}

                    {step === 4 && (
                      <StepText
                        eyebrow="04 / The direction"
                        question="Where do you want to go next?"
                        hint="Tell us what the next version should make possible."
                        value={data.next}
                        onChange={(value) =>
                          update('next', value)
                        }
                        placeholder="We want to attract more established clients, raise our rates, and finally feel confident sending people to our website…"
                      />
                    )}

                    {step === 5 && (
                      <StepFive
                        data={data}
                        update={update}
                      />
                    )}

                    {step === 6 && (
                      <StepSix
                        data={data}
                        update={update}
                      />
                    )}
                  </motion.section>
                </AnimatePresence>
              </div>

              {/* Navigation */}

              <div className="mt-10 flex items-end justify-between border-t border-white/20 pt-5">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 text-xs uppercase text-white/60 transition hover:text-white"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canContinue}
                    className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-4 text-xs font-bold uppercase text-ink transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-25 md:px-8"
                  >
                    Continue

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canContinue}
                    className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-4 text-xs font-bold uppercase text-ink transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-25 md:px-8"
                  >
                    Send project

                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </button>
                )}
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    INTRO                                   */
/* -------------------------------------------------------------------------- */

function Intro({
    onStart,
  }: {
    onStart: () => void;
  }) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          y: -24,
        }}
        transition={{
          duration: 0.45,
        }}
        className="flex min-h-screen px-5 pb-10 pt-28 md:px-10 md:pt-32"
      >
        <div className="mx-auto flex w-full max-w-[1500px] items-center">
          <div className="w-full max-w-[980px]">
  
            <p className="mb-7 text-[10px] font-medium uppercase tracking-[.14em] text-white/45">
              New business / Start here
            </p>
  
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                ease,
              }}
              className="max-w-[900px] text-[clamp(3.8rem,7.2vw,7.8rem)] font-black uppercase leading-[.84] "
            >
              Let&apos;s work 
              <br />
              together
  
              <span className="mt-2 block font-serif text-[.58em] font-normal italic normal-case leading-[.82] text-orange">
              Tell us about your business.
              </span>
            </motion.h1>
  
            <motion.div
              initial={{
                opacity: 0,
                y: 22,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.14,
                ease,
              }}
              className="mt-10 max-w-[620px] border-t border-white/20 pt-6"
            >
              <p className="max-w-xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
                Tell us a little about your business and
                where it&apos;s headed. No polished brief
                required.
              </p>
  
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onStart}
                  className="group inline-flex items-center gap-3 rounded-full bg-orange px-7 py-4 text-[10px] font-bold uppercase text-ink transition duration-300 hover:scale-[1.02]"
                >
                  Start
  
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
  
                <span className="text-[9px] uppercase text-white/35">
                  About 3 minutes
                </span>
              </div>
            </motion.div>
  
          </div>
        </div>
      </motion.section>
    );
  }
/* -------------------------------------------------------------------------- */
/*                                  HEADINGS                                  */
/* -------------------------------------------------------------------------- */

function StepHeading({
  eyebrow,
  question,
  hint,
}: {
  eyebrow: string;
  question: string;
  hint?: string;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="kicker mb-4 text-orange">
        {eyebrow}
      </p>

      <h2 className="max-w-[13ch] text-[clamp(3.2rem,7.5vw,7.5rem)] font-black leading-[.88]">
        {question}
      </h2>

      {hint && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-xl">
          {hint}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  OPTIONS                                   */
/* -------------------------------------------------------------------------- */

function OptionButton({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-20 w-full items-center justify-between border-b border-white/20 py-5 text-left text-xl transition md:min-h-24 md:text-3xl ${
        selected
          ? 'text-orange'
          : 'text-white hover:text-orange'
      }`}
    >
      <span>{children}</span>

      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
          selected
            ? 'border-orange bg-orange text-ink'
            : 'border-white/30 group-hover:border-orange'
        }`}
      >
        {selected && (
          <Check
            size={14}
            strokeWidth={3}
          />
        )}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    STEP 1                                  */
/* -------------------------------------------------------------------------- */

function StepOne({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.48fr_.52fr] lg:gap-20">
      <StepHeading
        eyebrow="01 / The project"
        question="What are we working on?"
        hint="Pick the closest fit. We can sort out the details together."
      />

      <div className="border-t border-white/20">
        {projectTypes.map((option) => (
          <OptionButton
            key={option}
            selected={data.projectType === option}
            onClick={() =>
              update('projectType', option)
            }
          >
            {option}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    STEP 2                                  */
/* -------------------------------------------------------------------------- */

function StepTwo({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.45fr_.55fr] lg:gap-20">
      <StepHeading
        eyebrow="02 / The business"
        question="Tell us what you built."
        hint="We want the version you’d explain to a smart friend — not a pitch deck."
      />

      <div className="space-y-7">
        <Field
          label="Business name *"
          value={data.businessName}
          onChange={(value) =>
            update('businessName', value)
          }
          placeholder="Your business"
        />

        <Field
          label="Website / Instagram"
          value={data.website}
          onChange={(value) =>
            update('website', value)
          }
          placeholder="https://"
        />

        <TextAreaField
          label="What does the business do? *"
          value={data.description}
          onChange={(value) =>
            update('description', value)
          }
          placeholder="A few sentences is plenty."
          rows={4}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 TEXT STEPS                                 */
/* -------------------------------------------------------------------------- */

function StepText({
  eyebrow,
  question,
  hint,
  value,
  onChange,
  placeholder,
}: {
  eyebrow: string;
  question: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.45fr_.55fr] lg:gap-20">
      <StepHeading
        eyebrow={eyebrow}
        question={question}
        hint={hint}
      />

      <div className="lg:pt-12">
        <textarea
          autoFocus
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows={8}
          className="min-h-[260px] w-full resize-none border-0 border-b border-white/30 bg-transparent px-0 py-4 text-2xl leading-relaxed text-white outline-none placeholder:text-white/22 focus:border-orange md:min-h-[340px] md:text-4xl"
        />

        <div className="mt-3 flex justify-between gap-4 text-[10px] uppercase text-white/35">
          <span>
            Speak plainly. No brand jargon required.
          </span>

          <span>
            {value.length} chars
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    STEP 5                                  */
/* -------------------------------------------------------------------------- */

function StepFive({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => void;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <StepHeading
          eyebrow="05 / The practical stuff"
          question="Investment & timing."
          hint="This helps us recommend the right scope before we talk."
        />
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase text-white/45">
            Investment
          </p>

          <div className="border-t border-white/20">
            {investmentOptions.map((option) => (
              <OptionButton
                key={option}
                selected={
                  data.investment === option
                }
                onClick={() =>
                  update(
                    'investment',
                    option
                  )
                }
              >
                {option}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase text-white/45">
            Timing
          </p>

          <div className="border-t border-white/20">
            {timingOptions.map((option) => (
              <OptionButton
                key={option}
                selected={
                  data.timing === option
                }
                onClick={() =>
                  update('timing', option)
                }
              >
                {option}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    STEP 6                                  */
/* -------------------------------------------------------------------------- */

function StepSix({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.45fr_.55fr] lg:gap-20">
      <StepHeading
        eyebrow="06 / Almost there"
        question="Who should we talk to?"
        hint="We’ll review the fit, the scope, and where your business is headed before we reply."
      />

      <div className="space-y-7">
        <Field
          label="Your name *"
          value={data.name}
          onChange={(value) =>
            update('name', value)
          }
          placeholder="Name"
        />

        <Field
          label="Email *"
          value={data.email}
          onChange={(value) =>
            update('email', value)
          }
          placeholder="you@business.com"
          type="email"
        />

        <TextAreaField
          label="Anything else we should know?"
          value={data.extra}
          onChange={(value) =>
            update('extra', value)
          }
          placeholder="A deadline, a big idea, a concern, a useful detail…"
          rows={4}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    FIELDS                                  */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase text-white/45">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full border-0 border-b border-white/30 bg-transparent px-0 py-4 text-2xl text-white outline-none placeholder:text-white/20 focus:border-orange md:text-3xl"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase text-white/45">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none border-0 border-b border-white/30 bg-transparent px-0 py-4 text-xl leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-orange md:text-2xl"
      />
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SUCCESS SHAPES                               */
/* -------------------------------------------------------------------------- */

function AmbientShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -right-32 -top-40 h-[40rem] w-[40rem] rounded-full border border-black/20"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 44,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-[-15rem] left-[8%] h-[32rem] w-[32rem] rounded-full border border-black/15"
      />
    </div>
  );
}