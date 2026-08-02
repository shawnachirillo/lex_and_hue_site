'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
} from 'lucide-react';
import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';

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

type StartProjectModalProps = {
  open: boolean;
  onClose: () => void;
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

export default function StartProjectModal({
  open,
  onClose,
}: StartProjectModalProps) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [data, setData] = useState<FormData>(initialData);

  const totalSteps = 6;

  const progress = useMemo(
    () => (step / totalSteps) * 100,
    [step]
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, isSubmitting]);

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
      return Boolean(data.investment && data.timing);
    }

    if (step === 6) {
      return Boolean(
        data.name.trim() &&
          /^\S+@\S+\.\S+$/.test(data.email.trim())
      );
    }

    return false;
  }, [data, step]);

  const resetForm = () => {
    setStarted(false);
    setStep(1);
    setDirection(1);
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
    setData(initialData);
  };

  const closeModal = () => {
    if (isSubmitting) return;

    resetForm();
    onClose();
  };

  const goNext = () => {
    if (!canContinue || step >= totalSteps) return;

    setDirection(1);
    setStep((current) => current + 1);
    setSubmitError('');
  };

  const goBack = () => {
    if (step === 1) {
      setStarted(false);
      return;
    }

    setDirection(-1);
    setStep((current) => current - 1);
    setSubmitError('');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canContinue || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_type: data.projectType,
          business_name: data.businessName,
          website: data.website,
          description: data.description,
          changed: data.changed,
          next_direction: data.next,
          investment: data.investment,
          timing: data.timing,
          contact_name: data.name,
          email: data.email,
          extra: data.extra,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'Your inquiry could not be sent.'
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Start a project with Lex & Hue"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.35, ease }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-white/15 bg-ink text-bone shadow-2xl"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-white/15 px-5 py-4 md:px-7">
              <div>
                <p className="text-xs font-black tracking-tight">
                  LEX & HUE
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[.14em] text-white/40">
                  Start a project
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Close project inquiry"
              >
                <X size={17} />
              </button>
            </header>

            {submitted ? (
              <SuccessState
                businessName={data.businessName}
                onClose={closeModal}
              />
            ) : !started ? (
              <Intro onStart={() => setStarted(true)} />
            ) : (
              <motion.form
                onSubmit={submit}
                className="flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="shrink-0 px-5 pt-5 md:px-8 md:pt-6">
                  <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[.12em] text-white/45">
                    <span>Project inquiry</span>

                    <span>
                      {String(step).padStart(2, '0')} /{' '}
                      {String(totalSteps).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="h-px bg-white/15">
                    <motion.div
                      className="h-px bg-orange"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.45, ease }}
                    />
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.section
                      key={step}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({
                          opacity: 0,
                          x: d > 0 ? 24 : -24,
                        }),
                        center: {
                          opacity: 1,
                          x: 0,
                        },
                        exit: (d: number) => ({
                          opacity: 0,
                          x: d > 0 ? -18 : 18,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease }}
                    >
                      {step === 1 && (
                        <StepOne data={data} update={update} />
                      )}

                      {step === 2 && (
                        <StepTwo data={data} update={update} />
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
                        <StepFive data={data} update={update} />
                      )}

                      {step === 6 && (
                        <StepSix data={data} update={update} />
                      )}
                    </motion.section>
                  </AnimatePresence>

                  {submitError && (
                    <p
                      role="alert"
                      className="mt-6 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                    >
                      {submitError}
                    </p>
                  )}
                </div>

                <footer className="flex shrink-0 items-center justify-between border-t border-white/15 px-5 py-4 md:px-8">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.08em] text-white/55 transition hover:text-white"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canContinue}
                      className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-3 text-[10px] font-bold uppercase text-ink transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      Continue
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canContinue || isSubmitting}
                      className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-3 text-[10px] font-bold uppercase text-ink transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      {isSubmitting ? 'Sending…' : 'Send project'}
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </button>
                  )}
                </footer>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Intro({
  onStart,
}: {
  onStart: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-0 flex-1 items-center overflow-y-auto px-5 py-10 md:px-10 md:py-14"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-5 text-[9px] font-medium uppercase tracking-[.14em] text-orange">
          New business / Start here
        </p>

        <h1 className="max-w-[12ch] text-[clamp(3rem,7vw,6.2rem)] font-black uppercase leading-[.85]">
          Let&apos;s work
          <br />
          together
          <span className="mt-2 block font-serif text-[.55em] font-normal italic normal-case leading-[.9] text-orange">
            Tell us about your business.
          </span>
        </h1>

        <div className="mt-8 max-w-xl border-t border-white/15 pt-5">
          <p className="text-base leading-7 text-white/60 md:text-lg">
            Tell us a little about your business and where it&apos;s
            headed. No polished brief required.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onStart}
              className="group inline-flex items-center gap-3 rounded-full bg-orange px-7 py-3.5 text-[10px] font-bold uppercase text-ink transition hover:scale-[1.02]"
            >
              Start
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <span className="text-[9px] uppercase text-white/35">
              About 3 minutes
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SuccessState({
  businessName,
  onClose,
}: {
  businessName: string;
  onClose: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-0 flex-1 items-center overflow-y-auto bg-orange px-6 py-12 text-ink md:px-12"
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className="mb-5 text-[9px] font-bold uppercase tracking-[.14em]">
          Inquiry received
        </p>

        <h2 className="font-serif text-5xl leading-[.9] md:text-7xl">
          Thank you.
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl">
          Your inquiry for{' '}
          <strong>{businessName || 'your business'}</strong> has
          been submitted successfully.
        </p>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/65 md:text-base">
          We&apos;ll review the details and be in touch within two
          business days.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-full bg-black px-7 py-3 text-[10px] font-bold uppercase text-white transition hover:opacity-80"
        >
          Close
        </button>
      </div>
    </motion.section>
  );
}

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
    <div className="mb-7">
      <p className="mb-3 text-[9px] font-medium uppercase tracking-[.13em] text-orange">
        {eyebrow}
      </p>

      <h2 className="max-w-[14ch] text-[clamp(2.4rem,5vw,4.8rem)] font-black leading-[.9]">
        {question}
      </h2>

      {hint && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          {hint}
        </p>
      )}
    </div>
  );
}

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
      className={`group flex min-h-16 w-full items-center justify-between border-b border-white/15 py-4 text-left text-base transition md:text-xl ${
        selected
          ? 'text-orange'
          : 'text-white hover:text-orange'
      }`}
    >
      <span>{children}</span>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
          selected
            ? 'border-orange bg-orange text-ink'
            : 'border-white/30 group-hover:border-orange'
        }`}
      >
        {selected && <Check size={12} strokeWidth={3} />}
      </span>
    </button>
  );
}

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
    <div className="grid gap-8 lg:grid-cols-[.43fr_.57fr] lg:gap-14">
      <StepHeading
        eyebrow="01 / The project"
        question="What are we working on?"
        hint="Pick the closest fit. We can sort out the details together."
      />

      <div className="border-t border-white/15">
        {projectTypes.map((option) => (
          <OptionButton
            key={option}
            selected={data.projectType === option}
            onClick={() => update('projectType', option)}
          >
            {option}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

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
    <div className="grid gap-8 lg:grid-cols-[.43fr_.57fr] lg:gap-14">
      <StepHeading
        eyebrow="02 / The business"
        question="Tell us what you built."
        hint="We want the version you’d explain to a smart friend — not a pitch deck."
      />

      <div className="space-y-6">
        <Field
          label="Business name *"
          value={data.businessName}
          onChange={(value) => update('businessName', value)}
          placeholder="Your business"
        />

        <Field
          label="Website / Instagram"
          value={data.website}
          onChange={(value) => update('website', value)}
          placeholder="https://"
        />

        <TextAreaField
          label="What does the business do? *"
          value={data.description}
          onChange={(value) => update('description', value)}
          placeholder="A few sentences is plenty."
          rows={4}
        />
      </div>
    </div>
  );
}

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
    <div className="grid gap-8 lg:grid-cols-[.43fr_.57fr] lg:gap-14">
      <StepHeading
        eyebrow={eyebrow}
        question={question}
        hint={hint}
      />

      <div>
        <textarea
          autoFocus
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={7}
          className="min-h-56 w-full resize-none border-0 border-b border-white/30 bg-transparent px-0 py-4 text-xl leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-orange md:text-2xl"
        />

        <div className="mt-3 flex justify-between gap-4 text-[9px] uppercase text-white/35">
          <span>Speak plainly. No brand jargon required.</span>
          <span>{value.length} chars</span>
        </div>
      </div>
    </div>
  );
}

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
    <div className="grid gap-8 lg:grid-cols-[.38fr_.62fr] lg:gap-14">
      <StepHeading
        eyebrow="05 / The practical stuff"
        question="Investment & timing."
        hint="This helps us recommend the right scope before we talk."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[.1em] text-white/45">
            Investment
          </p>

          <div className="border-t border-white/15">
            {investmentOptions.map((option) => (
              <OptionButton
                key={option}
                selected={data.investment === option}
                onClick={() => update('investment', option)}
              >
                {option}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[.1em] text-white/45">
            Timing
          </p>

          <div className="border-t border-white/15">
            {timingOptions.map((option) => (
              <OptionButton
                key={option}
                selected={data.timing === option}
                onClick={() => update('timing', option)}
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
    <div className="grid gap-8 lg:grid-cols-[.43fr_.57fr] lg:gap-14">
      <StepHeading
        eyebrow="06 / Almost there"
        question="Who should we talk to?"
        hint="We’ll review the fit, the scope, and where your business is headed before we reply."
      />

      <div className="space-y-6">
        <Field
          label="Your name *"
          value={data.name}
          onChange={(value) => update('name', value)}
          placeholder="Name"
        />

        <Field
          label="Email *"
          value={data.email}
          onChange={(value) => update('email', value)}
          placeholder="you@business.com"
          type="email"
        />

        <TextAreaField
          label="Anything else we should know?"
          value={data.extra}
          onChange={(value) => update('extra', value)}
          placeholder="A deadline, a big idea, a concern, a useful detail…"
          rows={4}
        />
      </div>
    </div>
  );
}

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
      <span className="mb-2 block text-[9px] uppercase tracking-[.1em] text-white/45">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-0 border-b border-white/30 bg-transparent px-0 py-3 text-xl text-white outline-none placeholder:text-white/20 focus:border-orange md:text-2xl"
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
      <span className="mb-2 block text-[9px] uppercase tracking-[.1em] text-white/45">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none border-0 border-b border-white/30 bg-transparent px-0 py-3 text-base leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-orange md:text-lg"
      />
    </label>
  );
}
