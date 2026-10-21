"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
// Static import: Next reads width/height at build time (zero layout shift)
// and generates a tiny blur placeholder automatically.
import heroImage from "@/public/images/derick.jpg";

/**
 * The hero portrait: fades in with a slight scale on load, then drifts
 * very gently on scroll (parallax). Parallax is disabled for reduced motion.
 */
export function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 → 1 as the photo travels from its resting spot to leaving the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle: the image moves at most 40px slower than the page.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      // aspect-ratio reserves the exact space before the image loads.
      className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-[2rem] bg-background-alt shadow-[0_30px_80px_-30px_rgb(11_31_58/0.35)] sm:max-w-sm md:max-w-none"
    >
      {/* Slightly oversized so parallax never reveals the edges. */}
      <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
        <Image
          src={heroImage}
          alt="Portrait of Derick Raditya"
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
