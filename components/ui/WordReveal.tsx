"use client";

import { motion, useReducedMotion } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  /** Seconds before the first word/letter starts. */
  delay?: number;
  /** Seconds between words (or letters). */
  stagger?: number;
  /** Animate each word (default) or each letter. */
  split?: "word" | "letter";
};

/**
 * Animates text in on load: fade + rise 20px + blur to sharp, one word or
 * one letter at a time. Reduced-motion users get a plain, quick fade.
 * Words are separated by real spaces (and letters of a word never break
 * apart), so the text wraps naturally and reads normally to screen readers.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  split = "word",
}: WordRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  const piece = (content: string, index: number, key: number) => (
    <motion.span
      key={key}
      className="inline-block will-change-transform"
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(8px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.6,
        ease: "easeOut",
        delay: delay + index * stagger,
      }}
    >
      {content}
    </motion.span>
  );

  // Running letter count, so letter delays continue across words.
  let letterIndex = 0;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          {split === "letter" ? (
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, j) => piece(char, letterIndex++, j))}
            </span>
          ) : (
            piece(word, i, i)
          )}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
