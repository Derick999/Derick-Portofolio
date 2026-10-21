"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global Framer Motion settings.
 * reducedMotion="user" makes every animation skip transforms (movement)
 * when the OS has "reduce motion" enabled; opacity fades still apply.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
