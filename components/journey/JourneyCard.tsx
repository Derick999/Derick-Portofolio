"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion";
import type { JourneyChapter } from "@/lib/content";

/** Where a card sits relative to the top card: 0 = top, 1 = next, 2 = after that. */
function stackTarget(depth: number, index: number, desktop: boolean, noTilt: boolean) {
  const d = Math.min(Math.max(depth, 0), 2);
  const tilt = index % 2 === 0 ? 1.5 : -1.5; // neighbours lean opposite ways
  return {
    y: [0, 12, 24][d],
    scale: [1, 0.96, 0.92][d],
    rotate: d === 0 || noTilt ? 0 : tilt,
    // Phones: cards behind peek out to the right (px).
    x: desktop ? 0 : [0, 36, 54][d],
    opacity: depth >= 3 ? 0 : 1,
  };
}

type JourneyCardProps = {
  chapter: JourneyChapter;
  index: number;
  total: number;
  /** Position relative to the active card: <0 passed, 0 active, >0 behind. */
  depth: number;
  /** Which way a passed card flew off (-1 left, 1 right). */
  exitDir: number;
  desktop: boolean;
  canDrag: boolean;
  /** Called when the active card is flung; dir is -1/1. */
  onFling: (dir: number, velocity: number) => void;
};

/**
 * One paper card in the stack. Two nested layers:
 *  - outer: stack position (lower, smaller, tilted when behind) + fade
 *  - inner: horizontal drag / fly-off, with a tilt that follows the drag
 * All motion is driven by motion values so a flung card keeps the speed
 * of the swipe. Reduced motion: no tilt, and cards fade instead of flying off.
 */
export function JourneyCard({
  chapter,
  index,
  total,
  depth,
  exitDir,
  desktop,
  canDrag,
  onFling,
}: JourneyCardProps) {
  const reduceMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const releaseVelocity = useRef(0);
  const start = stackTarget(depth, index, desktop, reduceMotion);

  const stackX = useMotionValue(start.x);
  const stackY = useMotionValue(start.y);
  const scale = useMotionValue(start.scale);
  const rotate = useMotionValue(start.rotate);
  const opacity = useMotionValue(start.opacity);
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-320, 0, 320], reduceMotion ? [0, 0, 0] : [-9, 0, 9]);

  // Move to the right place whenever the stack changes.
  useEffect(() => {
    const t = stackTarget(depth, index, desktop, reduceMotion);
    const spring = reduceMotion
      ? { duration: 0.2 }
      : { type: "spring" as const, stiffness: 260, damping: 26 };
    const fade = { duration: reduceMotion ? 0.2 : 0.3 };
    const passed = depth < 0;
    const fly = (ref.current?.offsetWidth ?? 400) * 1.3;

    const controls = [
      animate(stackX, t.x, spring),
      animate(stackY, t.y, spring),
      animate(scale, t.scale, spring),
      animate(rotate, t.rotate, spring),
      animate(opacity, passed ? 0 : t.opacity, fade),
      // Passed cards fly off the way they were thrown (or just fade);
      // everything else returns to centre.
      animate(
        dragX,
        passed && !reduceMotion ? exitDir * fly : 0,
        reduceMotion
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 180, damping: 24, velocity: releaseVelocity.current },
      ),
    ];
    releaseVelocity.current = 0;
    return () => controls.forEach((c) => c.stop());
  }, [depth, index, desktop, reduceMotion, exitDir, stackX, stackY, scale, rotate, opacity, dragX]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const { offset, velocity } = info;
    const thrown = Math.abs(offset.x) > 110 || Math.abs(velocity.x) > 500;
    if (thrown) {
      const dir = Math.abs(offset.x) > 20 ? Math.sign(offset.x) : Math.sign(velocity.x);
      releaseVelocity.current = velocity.x;
      onFling(dir || -1, velocity.x);
    } else {
      animate(dragX, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  const isTop = depth === 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      style={{
        x: stackX,
        y: stackY,
        scale,
        rotate,
        opacity,
        // Passed cards sit above so they can fly over the stack.
        zIndex: depth < 0 ? 100 + index : total - depth,
      }}
      className="[grid-area:1/1] w-[86%] self-stretch lg:w-full"
      // Only the active card is reachable by keyboard / screen reader.
      inert={!isTop}
    >
      <motion.div
        style={{ x: dragX, rotate: dragRotate }}
        drag={isTop && canDrag ? "x" : false}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        data-journey-card
        tabIndex={isTop ? 0 : -1}
        role="group"
        aria-roledescription="slide"
        aria-label={`Chapter ${index + 1} of ${total}: ${chapter.label}`}
        className={`h-full rounded-[1.75rem] border border-border bg-surface outline-none focus-visible:ring-2 focus-visible:ring-accent-solid focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt ${
          isTop
            ? "shadow-lift " + (canDrag ? "cursor-grab active:cursor-grabbing" : "")
            : "shadow-soft"
        }`}
      >
        {/* Content fades out while the card is behind another, so only the
            blank paper edge peeks out. */}
        <div
          className={`flex h-full flex-col p-6 transition-opacity duration-300 select-none sm:p-9 ${
            depth > 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          {chapter.image && (
            // Phones only: on desktop the image sits beside the stack.
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl bg-background-alt lg:hidden">
              <Image
                src={chapter.image}
                alt={`${chapter.label}: ${chapter.title}`}
                fill
                sizes="80vw"
                draggable={false}
                className="object-cover"
              />
            </div>
          )}

          <p className="text-sm font-medium text-accent-solid">
            {number} {chapter.label}
            <span className="font-light text-muted"> · {chapter.period}</span>
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {chapter.title}
          </h3>
          <p className="mt-4 leading-relaxed font-light">{chapter.description}</p>

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
      </motion.div>
    </motion.div>
  );
}
