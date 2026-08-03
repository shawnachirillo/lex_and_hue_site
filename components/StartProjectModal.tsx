'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

type StartProjectModalProps = {
  open: boolean;
  onClose: () => void;
};

const CONTACT_EMAIL = 'info@lexandhue.com';

export default function StartProjectModal({
  open,
  onClose,
}: StartProjectModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-[680px] overflow-hidden border border-white/15 bg-ink px-6 py-8 text-bone shadow-2xl md:px-10 md:py-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-orange hover:bg-orange hover:text-black"
              aria-label="Close project inquiry"
            >
              <X size={17} />
            </button>

            <p className="pr-14 text-[10px] font-bold uppercase tracking-[.16em] text-orange">
              Start a project
            </p>

            <h2
              id="start-project-modal-title"
              className="mt-5 max-w-[12ch] text-[42px] font-black uppercase leading-[.88] md:text-[62px]"
            >
              The guided inquiry is nearly ready.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
              The full discovery questionnaire is currently being finalized.
              In the meantime, reach out directly and tell me a little about
              your business, what has changed, and what you need next.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/15 pt-7">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Lex%20%26%20Hue%20Project%20Inquiry`}
                className="group inline-flex items-center gap-4 rounded-full bg-orange px-7 py-4 text-[11px] font-bold uppercase text-black transition hover:bg-bone"
              >
                Email Lex &amp; Hue
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <span className="text-sm text-white/45">
                {CONTACT_EMAIL}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}