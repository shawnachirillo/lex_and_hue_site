'use client';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  useEffect,
  useState,
} from 'react';

type AnimatedEyebrowProps = {
  phrases: string[];
  loop?: boolean;
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursorClassName?: string;
};


const courier = {
  fontFamily:
    '"Courier New", Courier, monospace',
} as const;

const ease = [0.22, 1, 0.36, 1] as const;


export default function AnimatedEyebrow({
  phrases,
  loop = false,
  className = '',
  typeSpeed = 75,
  deleteSpeed = 45,
  pauseDuration = 1500,
  cursorClassName,

}: AnimatedEyebrowProps) {
  const reduceMotion = useReducedMotion();

  const [phraseIndex, setPhraseIndex] =
    useState(0);

  const [displayedText, setDisplayedText] =
    useState('');

  const [isDeleting, setIsDeleting] =
    useState(false);

  const phrase =
    phrases[phraseIndex] ?? '';

  useEffect(() => {
    if (!phrases.length) return;

    /*
     * Reduced motion:
     * immediately display the first phrase.
     */
    if (reduceMotion) {
      setDisplayedText(phrases[0]);
      return;
    }

    let timeout:
      | ReturnType<typeof setTimeout>
      | undefined;

    /*
     * Finished typing current phrase.
     */
    if (
      !isDeleting &&
      displayedText === phrase
    ) {
      /*
       * One phrase + no loop:
       * leave it displayed.
       */
      if (
        phrases.length === 1 &&
        !loop
      ) {
        return;
      }

      /*
       * Multiple phrases but we've reached
       * the final phrase and looping is off:
       * leave the final phrase displayed.
       */
      if (
        !loop &&
        phraseIndex ===
          phrases.length - 1
      ) {
        return;
      }

      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }

    /*
     * Finished deleting.
     * Move to the next phrase.
     */
    if (
      isDeleting &&
      displayedText === ''
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(false);

        setPhraseIndex((current) => {
          const next = current + 1;

          if (next >= phrases.length) {
            return loop ? 0 : current;
          }

          return next;
        });
      }, 300);

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }

    /*
     * Type or delete one character.
     */
    timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayedText(
            phrase.slice(
              0,
              displayedText.length - 1
            )
          );
        } else {
          setDisplayedText(
            phrase.slice(
              0,
              displayedText.length + 1
            )
          );
        }
      },
      isDeleting
        ? deleteSpeed
        : typeSpeed
    );

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [
    deleteSpeed,
    displayedText,
    isDeleting,
    loop,
    pauseDuration,
    phrase,
    phraseIndex,
    phrases,
    reduceMotion,
    typeSpeed,
  ]);

  if (!phrases.length) {
    return null;
  }

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 10,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        ease,
      }}
      className={`flex min-h-[30px] items-center ${className}`}
    >
      <p
        className="text-[24px] font-bold uppercase leading-none text-current"
        style={courier}
      >
        {displayedText}

        <motion.span
  aria-hidden="true"
  className={`ml-[2px] inline-block h-[22px] w-[2px] translate-y-[3px] ${
    cursorClassName ?? 'bg-orange'
  }`}
          animate={
            reduceMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: [
                    1,
                    1,
                    0,
                    0,
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 0.8,
                  repeat: Infinity,
                  times: [
                    0,
                    0.45,
                    0.5,
                    1,
                  ],
                }
          }
        />
      </p>
    </motion.div>
  );
}