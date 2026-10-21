import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/WordReveal";
import { HeroPhoto } from "./HeroPhoto";

/** Seconds between headline words (shared so line 2 continues line 1). */
const WORD_STAGGER = 0.08;

/**
 * Hero: fills one screen on desktop. Text left, photo right (md+);
 * photo on top on mobile. All copy comes from /data/site.json.
 */
export function Hero() {
  const { hero } = site;
  const [line1, line2] = hero.headline;
  const line1Words = line1.split(" ").length;
  // Everything after the headline starts once its last word is on its way.
  const afterHeadline =
    0.1 + (line1Words + line2.split(" ").length) * WORD_STAGGER;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="flex items-center pt-8 pb-16 sm:pt-12 md:min-h-[calc(100dvh-3.5rem)] md:py-16"
    >
      <Container className="grid items-center gap-10 md:grid-cols-[1.35fr_0.65fr] md:gap-14 lg:gap-20">
        {/* Photo first in the DOM so it sits on top on mobile; moved right on desktop. */}
        <div className="md:order-last">
          <HeroPhoto />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-[2.6rem] leading-[1.05] font-bold tracking-tighter sm:text-6xl md:text-[3.25rem] lg:text-[4rem] xl:text-[4.5rem]">
            <WordReveal text={line1} delay={0.1} stagger={WORD_STAGGER} className="block" />
            <WordReveal
              text={line2}
              delay={0.1 + line1Words * WORD_STAGGER}
              stagger={WORD_STAGGER}
              className="block text-accent"
            />
          </h1>

          <Reveal trigger="mount" delay={afterHeadline}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-snug font-light text-balance sm:text-xl md:mx-0 lg:text-2xl">
              {hero.subline}
            </p>
          </Reveal>

          <Reveal trigger="mount" delay={afterHeadline + 0.1}>
            {/* Stacked on phones; one dotted row on wider screens. The dot
                trails each item so a wrapped line never starts with one. */}
            <ul
              aria-label="Highlights"
              className="mt-6 flex flex-col gap-1 text-sm font-light text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 md:justify-start"
            >
              {hero.proof.map((item, i) => (
                <li key={item} className="sm:flex sm:items-center sm:gap-x-2">
                  {item}
                  {i < hero.proof.length - 1 && (
                    <span aria-hidden className="hidden sm:inline">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            trigger="mount"
            delay={afterHeadline + 0.2}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            <Button href="#work" className="w-full sm:w-auto">
              {hero.primaryCta}
            </Button>
            <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
              {hero.secondaryCta}
            </Button>
            <a
              href={hero.cvPath}
              download
              className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[15px] font-medium text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:mt-0 sm:ml-2"
            >
              <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.5v8m0 0L4.75 7.25M8 10.5l3.25-3.25M3 13.5h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {hero.cvLabel}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
