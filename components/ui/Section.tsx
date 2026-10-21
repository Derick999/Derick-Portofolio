import { Container } from "./Container";
import { Reveal } from "./Reveal";

type SectionProps = {
  /** Anchor id used by the navbar, e.g. "work" → #work */
  id: string;
  /** Small label above the title, e.g. "01 · Work" */
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  /**
   * Background: "default" white, "alt" light cool gray (for alternating
   * sections), "navy" dark feature section with light text.
   */
  tone?: "default" | "alt" | "navy";
  className?: string;
};

const tones = {
  default: "bg-background",
  alt: "bg-background-alt",
  navy: "theme-navy",
} as const;

/**
 * Standard page section: generous vertical spacing, eyebrow + big heading,
 * optional intro, then content. Header reveals on scroll.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "default",
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`py-24 sm:py-32 ${tones[tone]} ${className}`}
    >
      <Container>
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium text-accent">{eyebrow}</p>
          )}
          <h2
            id={`${id}-title`}
            className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-5 text-lg font-light leading-relaxed text-muted sm:text-xl">
              {intro}
            </p>
          )}
        </Reveal>
        {children && <div className="mt-14 sm:mt-16">{children}</div>}
      </Container>
    </section>
  );
}
