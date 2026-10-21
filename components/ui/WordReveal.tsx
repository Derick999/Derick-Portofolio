"use client";

import { motion, useReducedMotion } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
};

/**
 * Animates text in word by word on load: fade + rise 20px + blur to sharp.
 * Reduced-motion users get a plain, quick fade of each word.
 * Words are inline-block spans separated by real spaces, so the text still
 * wraps naturally and reads normally to screen readers.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: WordRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            className="inline-block will-change-transform"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 20, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.6,
              ease: "easeOut",
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
