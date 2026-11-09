"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Journey } from "@/lib/content";
import { JourneyCard } from "./JourneyCard";

/** "2020 – 2023" → "2020": the big faint year shows the start year. */
function startYear(period: string) {
  return period.split(/\s*[–-]\s*/)[0];
}

/** Matches Tailwind's `lg` breakpoint (side columns appear). */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
}

/**
 * Swipeable stack of paper cards, one per chapter, then the closing quote.
 * - Drag/swipe the top card, or use arrows, ← → keys, or the dots.
 * - Stops at both ends (arrows disable).
 * - Desktop: year + label on the left, card stack in the middle, image or
 *   "first" quote on the right. Phones: one column, image inside the card.
 */
export function JourneyStack({ journey }: { journey: Journey }) {
  const { chapters, closing } = journey;
  const total = chapters.length;
  const reduceMotion = useReducedMotion();
  const desktop = useIsDesktop();

  const [index, setIndex] = useState(0);
  // Direction each passed card flew off (-1 left, 1 right).
  const [dirs, setDirs] = useState<number[]>(() => chapters.map(() => -1));
  const regionRef = useRef<HTMLDivElement>(null);
  const refocus = useRef(false);

  const goTo = useCallback(
    (next: number, dir = -1) => {
      const target = Math.min(Math.max(next, 0), total - 1);
      if (target === index) return;
      // If a card has focus it is about to become inert; hand focus to the new top card.
      refocus.current = document.activeElement?.hasAttribute("data-journey-card") ?? false;
      if (target > index) {
        setDirs((prev) => prev.map((d, i) => (i >= index && i < target ? dir : d)));
      }
      setIndex(target);
    },
    [index, total],
  );

  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    regionRef.current
      ?.querySelectorAll<HTMLElement>("[data-journey-card]")
      [index]?.focus({ preventScroll: true });
  }, [index]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  const chapter = chapters[index];
  const number = String(index + 1).padStart(2, "0");
  const swap = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -10 },
    transition: { duration: 0.3, ease: "easeOut" as const },
  };

  return (
    <div>
      {/* overflow-x-clip: flung cards leave the screen without adding a page scrollbar. */}
      <div
        ref={regionRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Journey chapters"
        onKeyDown={onKeyDown}
        className="grid gap-8 overflow-x-clip pb-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)_minmax(0,1fr)] lg:items-center lg:gap-10"
      >
        {/* Announces the active chapter to screen readers. */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Chapter {index + 1} of {total}: {chapter.label}, {chapter.period}. {chapter.title}
        </p>

        {/* LEFT (phones: above the stack): big faint year + chapter label */}
        <div className="lg:text-right">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={chapter.id} {...swap}>
              <p
                aria-hidden
                className="text-[clamp(4.5rem,18vw,5.5rem)] leading-none font-bold tracking-tighter text-border select-none lg:text-[clamp(4rem,7vw,6.5rem)]"
              >
                {startYear(chapter.period)}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-primary">
                {number} {chapter.label}
              </p>
              <p className="mt-1 text-sm text-muted">{chapter.period}</p>
              {/* Phones only: the "first" quote when there is no image. */}
              {!chapter.image && chapter.first && (
                <p className="mt-3 text-base font-medium text-primary lg:hidden">
                  {chapter.first}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: the stack + controls */}
        <div>
          <div className="relative grid pb-8">
            {chapters.map((c, i) => (
              <JourneyCard
                key={c.id}
                chapter={c}
                index={i}
                total={total}
                depth={i - index}
                exitDir={dirs[i]}
                desktop={desktop}
                canDrag={index < total - 1}
                onFling={(dir) => goTo(index + 1, dir)}
              />
            ))}
          </div>

          <div className="mt-2 flex flex-col items-center gap-5">
            <div className="flex items-center gap-5">
              <ArrowButton direction="prev" disabled={index === 0} onClick={() => goTo(index - 1)} />
              <p className="min-w-16 text-center text-sm font-medium text-primary tabular-nums" aria-hidden>
                {number} <span className="text-muted">/ {String(total).padStart(2, "0")}</span>
              </p>
              <ArrowButton direction="next" disabled={index === total - 1} onClick={() => goTo(index + 1)} />
            </div>

            <div className="flex items-center gap-1.5">
              {chapters.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to chapter ${i + 1}: ${c.label}`}
                  aria-current={i === index ? "true" : undefined}
                  // Large invisible hit area, small visible dot.
                  className="group flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-accent-solid"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-primary" : "w-2 bg-border group-hover:bg-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (desktop only): the chapter's image, or its "first" quote */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={chapter.id} {...swap}>
              {chapter.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-background-alt shadow-soft">
                  <Image
                    src={chapter.image}
                    alt={`${chapter.label}: ${chapter.title}`}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                </div>
              ) : chapter.first ? (
                <figure>
                  <span aria-hidden className="block text-5xl leading-none font-bold text-accent-solid">
                    “
                  </span>
                  <blockquote className="mt-1 text-3xl leading-tight font-semibold tracking-tight text-primary text-balance">
                    {chapter.first}
                  </blockquote>
                </figure>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Closing quote */}
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-20 max-w-3xl rounded-3xl border border-border bg-surface px-7 py-10 text-center shadow-soft sm:mt-28 sm:px-14 sm:py-14"
      >
        <span aria-hidden className="block text-6xl leading-none font-bold text-accent-solid">
          “
        </span>
        <blockquote className="mt-2 text-xl leading-snug font-medium tracking-tight text-primary text-balance sm:text-2xl md:text-3xl">
          {closing.quote}
        </blockquote>
      </motion.figure>
    </div>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous chapter" : "Next chapter"}
      className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors duration-200 hover:bg-accent-solid hover:text-accent-solid-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-solid disabled:pointer-events-none disabled:opacity-35"
    >
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d={direction === "prev" ? "M13 8H3m0 0 4.5-4.5M3 8l4.5 4.5" : "M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
