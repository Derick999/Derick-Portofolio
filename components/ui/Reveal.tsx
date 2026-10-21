"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating; use to stagger siblings. */
  delay?: number;
  /** Vertical travel in px (spec: 16–24). */
  y?: number;
  /**
   * "view" (default): animate when scrolled into view, once.
   * "mount": animate immediately on page load (used in the hero).
   */
  trigger?: "view" | "mount";
  as?: "div" | "li" | "span";
};

/**
 * Fade + slide-up on scroll. Only opacity/transform are animated, so it never
 * causes layout shift. Reduced-motion users get a plain fade (see MotionProvider).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  trigger = "view",
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const visible = { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      {...(trigger === "mount"
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
