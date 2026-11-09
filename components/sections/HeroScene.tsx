"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { BracketButton } from "@/components/ui/BracketButton";

type HeroSceneProps = {
  name: string;
  hero: (typeof site)["hero"];
  hasPortrait: boolean;
};

/** Seconds between letters of the giant name. */
const LETTER_STAGGER = 0.04;

/**
 * Layered hero:
 *   z-0  giant name (behind)
 *   z-10 cutout portrait, centered at the bottom, overlapping the name
 *   z-20 headline + buttons (left) and proof lines (right)
 *
 * Desktop (lg+): full-viewport stage, layers absolutely positioned.
 * Mobile: the same elements stack in normal flow — name (two lines),
 * portrait overlapping it, then headline, subline, proof and buttons, centered.
 */
export function HeroScene({ name, hero, hasPortrait }: HeroSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax: as the hero scrolls away, the name drifts down a little,
  // so it appears to move slower than the portrait. Off for reduced motion.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 160]);

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  const [line1, line2] = hero.headline;
  // Everything else starts once the name has mostly landed (< 1s total).
  const afterName = 0.15 + name.length * LETTER_STAGGER;

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex flex-col overflow-hidden bg-background pt-8 lg:block lg:h-[calc(100dvh-3.5rem)] lg:min-h-[44rem] lg:p-0"
    >

      {/* z-0 · Giant name */}
      <motion.div
        style={{ y: nameY }}
        className="relative z-0 text-center lg:absolute lg:inset-x-0 lg:top-[13%]"
      >
        <p className="text-base font-light text-muted sm:text-lg">
          <WordReveal text={hero.intro} delay={0.05} stagger={0.06} />
        </p>
        <h1 className="mt-1 text-[clamp(3.5rem,22vw,13rem)] leading-[0.88] font-extrabold tracking-[-0.055em] text-primary lg:text-[clamp(3.5rem,10.9vw,12.5rem)] lg:whitespace-nowrap">
          <WordReveal
            text={firstName}
            split="letter"
            delay={0.15}
            stagger={LETTER_STAGGER}
            className="block lg:inline"
          />
          <span className="hidden lg:inline"> </span>
          <WordReveal
            text={lastName}
            split="letter"
            delay={0.15 + firstName.length * LETTER_STAGGER}
            stagger={LETTER_STAGGER}
            className="block lg:inline"
          />
        </h1>
      </motion.div>

      {/* z-10 · Cutout portrait: fixed 4:5 box, image anchored to its bottom.
          Hard crop: the bottom edge sits exactly on the bottom of the hero
          (no padding below, no fade), so it "stands" on the next section.
          On phones it comes last (order-last) so that is true there too. */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: afterName - 0.25 }}
        className="relative z-10 order-last mx-auto mt-2 aspect-[4/5] w-[78vw] max-w-[24rem] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:h-[92%] lg:w-auto lg:max-w-none lg:-translate-x-1/2"
      >
        {hasPortrait ? (
          <Image
            src={hero.portrait}
            alt={`Portrait of ${name}`}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 78vw"
            className="object-contain object-bottom"
          />
        ) : (
          <PortraitPlaceholder />
        )}
      </motion.div>

      {/* z-20 · Copy. Mobile: centered flow. Desktop: bottom-left / bottom-right. */}
      <div className="relative z-20 mx-auto max-w-6xl px-5 sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-full lg:pb-14">
        <div className="mt-10 text-center lg:absolute lg:bottom-14 lg:left-14 lg:mt-0 lg:w-[clamp(16rem,22vw,19rem)] lg:text-left">
          <Reveal trigger="mount" delay={afterName}>
            <h2 className="text-[clamp(1.75rem,2.3vw,2.15rem)] leading-[1.08] font-bold tracking-tight lg:whitespace-nowrap">
              <span className="block text-primary">{line1}</span>
              <span className="block text-accent">{line2}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed font-light lg:mx-0">
              {hero.subline}
            </p>
          </Reveal>

          <Reveal
            trigger="mount"
            delay={afterName + 0.15}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <BracketButton href="#work">{hero.primaryCta}</BracketButton>
            <BracketButton href="#contact">{hero.secondaryCta}</BracketButton>
            <BracketButton href={hero.cvPath} download>
              <svg aria-hidden width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.5v8m0 0L4.75 7.25M8 10.5l3.25-3.25M3 13.5h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {hero.cvLabel}
            </BracketButton>
          </Reveal>
        </div>

        <Reveal
          trigger="mount"
          delay={afterName + 0.1}
          className="mt-8 lg:absolute lg:top-[61%] lg:right-14 lg:mt-0"
        >
          <ul
            aria-label="Highlights"
            className="space-y-1.5 text-center text-sm font-light text-muted lg:text-right"
          >
            {hero.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Shown until /public/images/derick-cutout.png exists. */
function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end">
      <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden>
        <circle cx="200" cy="140" r="95" className="fill-tag" />
        <path d="M20 500 C 30 150, 370 150, 380 500 Z" className="fill-tag" />
      </svg>
      <p className="absolute top-[70%] text-xs font-medium tracking-wide text-muted">
        PLACEHOLDER · add derick-cutout.png
      </p>
    </div>
  );
}
