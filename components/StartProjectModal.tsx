'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

type StartProjectModalProps = {
  open: boolean;
  onClose: () => void;
};

type InquiryForm = {
  project_type: string;
  business_name: string;
  website: string;
  description: string;
  changed: string;
  next_direction: string;
  investment: string;
  timing: string;
  contact_name: string;
  email: string;
  extra: string;
};

const initialForm: InquiryForm = {
  project_type: '',
  business_name: '',
  website: '',
  description: '',
  changed: '',
  next_direction: '',
  investment: '',
  timing: '',
  contact_name: '',
  email: '',
  extra: '',
};

const projectTypes = [
  'Brand',
  'Website / Digital Experience',
  'Custom System / Tool',
  'Brand + Website',
  'Not sure yet',
];

const investmentOptions = [
  '$3,500–$5,000',
  '$5,000–$10,000',
  '$10,000+',
  'Not sure yet',
];

const timingOptions = [
  'As soon as possible',
  'Within 1–2 months',
  'Within 3–6 months',
  'Later this year',
  'Still exploring',
];

const TOTAL_STEPS = 8;

export default function StartProjectModal({
  open,
  onClose,
}: StartProjectModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const updateField = (
    field: keyof InquiryForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return Boolean(form.project_type.trim());

      case 2:
        return Boolean(form.business_name.trim());

      case 3:
        return Boolean(form.description.trim());

      case 4:
        return Boolean(form.changed.trim());

      case 5:
        return Boolean(form.next_direction.trim());

      case 6:
        return Boolean(form.investment.trim());

      case 7:
        return Boolean(form.timing.trim());

      case 8:
        return Boolean(
          form.contact_name.trim() &&
            form.email.trim()
        );

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) {
      setError('Please complete this step before continuing.');
      return;
    }

    setError('');
    setStep((current) =>
      Math.min(current + 1, TOTAL_STEPS)
    );
  };

  const previousStep = () => {
    setError('');
    setStep((current) => Math.max(current - 1, 1));
  };

  const resetAndClose = () => {
    setStep(1);
    setForm(initialForm);
    setError('');
    setSubmitting(false);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateStep()) {
      setError('Please add your name and email before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Your inquiry could not be submitted.'
        );
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepHeading
              number="01"
              title="What are we building?"
              description="Choose the closest fit. We can refine the scope together."
            />

            <OptionGrid
              options={projectTypes}
              value={form.project_type}
              onChange={(value) =>
                updateField('project_type', value)
              }
            />
          </>
        );

      case 2:
        return (
          <>
            <StepHeading
              number="02"
              title="Tell us who you are."
              description="A little context helps us understand where the work needs to begin."
            />

            <div className="space-y-6">
              <Field label="Business name">
                <input
                  autoFocus
                  value={form.business_name}
                  onChange={(event) =>
                    updateField(
                      'business_name',
                      event.target.value
                    )
                  }
                  placeholder="Your business"
                  className={inputClass}
                />
              </Field>

              <Field label="Current website — optional">
                <input
                  value={form.website}
                  onChange={(event) =>
                    updateField(
                      'website',
                      event.target.value
                    )
                  }
                  placeholder="yourbusiness.com"
                  className={inputClass}
                />
              </Field>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <StepHeading
              number="03"
              title="Tell us about the business."
              description="What do you do, who do you serve, and what should we understand about the business today?"
            />

            <textarea
              autoFocus
              value={form.description}
              onChange={(event) =>
                updateField(
                  'description',
                  event.target.value
                )
              }
              placeholder="Tell us about the business..."
              rows={6}
              className={textareaClass}
            />
          </>
        );

      case 4:
        return (
          <>
            <StepHeading
              number="04"
              title="What's changed?"
              description="Growth, a new offer, an outdated brand, operational friction — what made now the right time to do something?"
            />

            <textarea
              autoFocus
              value={form.changed}
              onChange={(event) =>
                updateField(
                  'changed',
                  event.target.value
                )
              }
              placeholder="Something has shifted..."
              rows={6}
              className={textareaClass}
            />
          </>
        );

      case 5:
        return (
          <>
            <StepHeading
              number="05"
              title="Where are you going next?"
              description="Describe what you want the business to become, support, or make possible."
            />

            <textarea
              autoFocus
              value={form.next_direction}
              onChange={(event) =>
                updateField(
                  'next_direction',
                  event.target.value
                )
              }
              placeholder="The next version of the business..."
              rows={6}
              className={textareaClass}
            />
          </>
        );

      case 6:
        return (
          <>
            <StepHeading
              number="06"
              title="What's your investment range?"
              description="This helps us recommend a scope that makes sense for the business."
            />

            <OptionGrid
              options={investmentOptions}
              value={form.investment}
              onChange={(value) =>
                updateField('investment', value)
              }
            />
          </>
        );

      case 7:
        return (
          <>
            <StepHeading
              number="07"
              title="What's your timing?"
              description="Tell us when you'd ideally like the work to begin."
            />

            <OptionGrid
              options={timingOptions}
              value={form.timing}
              onChange={(value) =>
                updateField('timing', value)
              }
            />
          </>
        );

      case 8:
        return (
          <>
            <StepHeading
              number="08"
              title="Last thing — how do we reach you?"
              description="We'll review everything you've shared and follow up with the appropriate next step."
            />

            <div className="space-y-6">
              <Field label="Your name">
                <input
                  autoFocus
                  value={form.contact_name}
                  onChange={(event) =>
                    updateField(
                      'contact_name',
                      event.target.value
                    )
                  }
                  placeholder="Your name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      'email',
                      event.target.value
                    )
                  }
                  placeholder="you@business.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Anything else? — optional">
                <textarea
                  value={form.extra}
                  onChange={(event) =>
                    updateField(
                      'extra',
                      event.target.value
                    )
                  }
                  placeholder="Anything else you'd like us to know..."
                  rows={3}
                  className={textareaClass}
                />
              </Field>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              resetAndClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-project-title"
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.985,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex max-h-[94vh] w-full max-w-[860px] flex-col overflow-hidden border border-white/15 bg-ink text-bone shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[.16em] text-orange">
                  Start a project
                </span>

                {!submitted && (
                  <span className="text-[10px] uppercase tracking-[.14em] text-white/35">
                    {String(step).padStart(2, '0')} /{' '}
                    {String(TOTAL_STEPS).padStart(2, '0')}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-orange hover:bg-orange hover:text-black"
                aria-label="Close project inquiry"
              >
                <X size={17} />
              </button>
            </div>

            {!submitted && (
              <div className="h-[2px] bg-white/10">
                <motion.div
                  className="h-full bg-orange"
                  animate={{
                    width: `${(step / TOTAL_STEPS) * 100}%`,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            )}

            <div className="overflow-y-auto px-5 py-8 md:px-12 md:py-12">
              {submitted ? (
                <div className="flex min-h-[460px] flex-col justify-center">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-orange text-black">
                    <Check size={21} />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-orange">
                    Inquiry received
                  </p>

                  <h2
                    id="start-project-title"
                    className="mt-5 max-w-[10ch] text-[46px] font-black uppercase leading-[.88] md:text-[72px]"
                  >
                    Your next chapter starts here.
                  </h2>

                  <p className="mt-7 max-w-xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
                    Thanks, {form.contact_name}. We'll review what
                    you've shared about {form.business_name} and
                    follow up with the appropriate next steps.
                  </p>

                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="mt-9 w-fit rounded-full bg-orange px-7 py-4 text-[11px] font-bold uppercase text-black transition hover:bg-bone"
                  >
                    Back to Lex &amp; Hue
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{
                        opacity: 0,
                        x: 18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -18,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>

                  {error && (
                    <p
                      role="alert"
                      className="mt-6 text-sm text-orange"
                    >
                      {error}
                    </p>
                  )}

                  <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={step === 1 || submitting}
                      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase transition ${
                        step === 1
                          ? 'pointer-events-none opacity-0'
                          : 'text-white/55 hover:text-white'
                      }`}
                    >
                      <ArrowLeft size={15} />
                      Back
                    </button>

                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-4 text-[11px] font-bold uppercase text-black transition hover:bg-bone"
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
                        disabled={submitting}
                        className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-4 text-[11px] font-bold uppercase text-black transition hover:bg-bone disabled:cursor-wait disabled:opacity-60"
                      >
                        {submitting
                          ? 'Sending...'
                          : 'Submit inquiry'}

                        {!submitting && (
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-9">
      <p className="font-mono text-[11px] text-orange">
        {number}
      </p>

      <h2
        id="start-project-title"
        className="mt-4 max-w-[13ch] text-[38px] font-black uppercase leading-[.9] md:text-[58px]"
      >
        {title}
      </h2>

      <p className="mt-5 max-w-xl text-sm leading-6 text-white/55 md:text-base md:leading-7">
        {description}
      </p>
    </div>
  );
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const selected = value === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-[72px] border px-5 py-4 text-left text-sm transition ${
              selected
                ? 'border-orange bg-orange text-black'
                : 'border-white/15 text-white/75 hover:border-white/45 hover:text-white'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em] text-white/45">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  'w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-lg text-white outline-none placeholder:text-white/25 focus:border-orange';

const textareaClass =
  'w-full resize-none border border-white/15 bg-white/[.025] p-4 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-orange';