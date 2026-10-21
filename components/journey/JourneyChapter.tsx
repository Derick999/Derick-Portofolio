"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { JourneyChapter as Chapter } from "@/lib/content";

type JourneyChapterProps = {
  chapter: Chapter;
  index: number;
};

/**
 * One chapter on the timeline: dot on the line, a card with the story, and
 * an optional image on the opposite side (desktop) or below (mobile).
 * Even chapters sit left of the line on desktop, odd chapters right.
 */
export function JourneyChapter({ chapter, index }: JourneyChapterProps) {
  const ref = useRef<HTMLLIElement>(null);
  // "Active" once the chapter crosses 55% of the viewport height, the same
  // point the drawn line reaches (see JourneyTimeline). The huge top margin
  // keeps it active after it scrolls off the top.
  const active = useInView(ref, { margin: "100000px 0px -45% 0px" });

  const number = String(index + 1).padStart(2, "0");
  const isRight = index % 2 === 1;

  return (
    <li
      ref={ref}
      className="relative grid gap-6 pl-12 md:grid-cols-2 md:gap-x-24 md:pl-0"
    >
      {/* Dot on the line: scales up and fills navy when active. */}
      <motion.span
        aria-hidden
        animate={{ scale: active ? 1.25 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`absolute top-9 left-[11px] z-10 size-4 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 md:left-1/2 ${
          active ? "border-primary bg-primary" : "border-muted/40 bg-surface"
        }`}
      />

      {/* Story card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={isRight ? "md:col-start-2" : "md:col-start-1"}
      >
        <article className="relative overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-soft transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-9">
          {/* Big faint chapter number in the corner. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 right-5 text-[6.5rem] leading-none font-bold tracking-tighter text-border select-none sm:text-[8rem]"
          >
            {number}
          </span>

          <div className="relative">
            <p className="text-sm font-medium text-accent">
              {number} {chapter.label}
              <span className="font-light text-muted"> · {chapter.period}</span>
            </p>
            {/* Right padding keeps long titles clear of the big number. */}
            <h3 className="mt-3 pr-16 text-2xl font-semibold tracking-tight sm:pr-28 sm:text-3xl">
              {chapter.title}
            </h3>
            <p className="mt-4 leading-relaxed font-light">
              {chapter.description}
            </p>

            {chapter.highlights.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {chapter.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-tag px-3 py-1.5 text-[13px] text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </motion.div>

      {/* Optional image: opposite side of the line on desktop. */}
      {chapter.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-background-alt md:row-start-1 ${
            isRight ? "md:col-start-1" : "md:col-start-2"
          }`}
        >
          <Image
            src={chapter.image}
            alt={`${chapter.label}: ${chapter.title}`}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </motion.div>
      )}
    </li>
  );
}
