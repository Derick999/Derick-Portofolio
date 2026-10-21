"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import type { Journey } from "@/lib/content";
import { JourneyChapter } from "./JourneyChapter";

/**
 * Vertical timeline. A faint track runs the full height; a navy line on top
 * "draws" itself as you scroll (scaleY follows scroll progress).
 * Desktop: line in the center, chapters alternate sides.
 * Mobile: line on the left, chapters stacked.
 */
export function JourneyTimeline({ journey }: { journey: Journey }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the timeline's top reaches 55% of the viewport, 1 when its bottom
  // does, so the tip of the line always sits at 55% of the screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 55%"],
  });

  const linePosition = "absolute top-0 bottom-0 left-[11px] w-px md:left-1/2 md:-translate-x-1/2";

  return (
    <div>
      <div ref={ref} className="relative">
        <span aria-hidden className={`${linePosition} bg-border`} />
        <motion.span
          aria-hidden
          style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
          className={`${linePosition} origin-top bg-primary`}
        />

        <ol className="space-y-14 md:space-y-24">
          {journey.chapters.map((chapter, i) => (
            <JourneyChapter key={chapter.id} chapter={chapter} index={i} />
          ))}
        </ol>
      </div>

      {/* Closing quote */}
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-20 max-w-3xl rounded-3xl border border-border bg-surface px-7 py-10 text-center shadow-soft sm:mt-28 sm:px-14 sm:py-14"
      >
        <span aria-hidden className="block text-6xl leading-none font-bold text-accent">
          “
        </span>
        <blockquote className="mt-2 text-xl leading-snug font-medium tracking-tight text-primary text-balance sm:text-2xl md:text-3xl">
          {journey.closing.quote}
        </blockquote>
      </motion.figure>
    </div>
  );
}
