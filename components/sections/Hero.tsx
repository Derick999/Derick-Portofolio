import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HeroPhoto } from "./HeroPhoto";

/**
 * Hero: photo is the focal point.
 * Mobile: photo on top, text below. Desktop (md+): text left, photo right.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="pt-10 pb-20 sm:pt-16 md:pt-24 md:pb-32"
    >
      <Container className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16 lg:gap-24">
        {/* Photo first in the DOM so it sits on top on mobile; moved right on desktop. */}
        <div className="md:order-last">
          <HeroPhoto />
        </div>

        <div className="text-center md:text-left">
          <Reveal trigger="mount" delay={0.15}>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl">
              {site.name}
            </h1>
          </Reveal>

          <Reveal trigger="mount" delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-snug font-light text-balance sm:text-2xl md:mx-0 lg:text-[1.75rem]">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal trigger="mount" delay={0.4}>
            <p className="mt-5 text-sm font-light text-muted sm:text-base">
              {site.subline}
            </p>
          </Reveal>

          <Reveal
            trigger="mount"
            delay={0.5}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row md:justify-start"
          >
            <Button href="#work">Lihat Karya</Button>
            <Button href="#contact" variant="secondary">
              Kontak
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
