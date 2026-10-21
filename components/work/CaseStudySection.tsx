import { Reveal } from "@/components/ui/Reveal";

type CaseStudySectionProps = {
  /** Small number shown above the heading, e.g. "01" */
  index: string;
  title: string;
  children: React.ReactNode;
};

/**
 * One block of a case study (Problem, Process, …).
 * Desktop: heading in a narrow left column, content on the right.
 */
export function CaseStudySection({ index, title, children }: CaseStudySectionProps) {
  return (
    <Reveal>
      <section className="grid gap-6 border-t border-border py-14 sm:py-20 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <p className="text-sm font-medium text-accent">{index}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="text-lg leading-relaxed font-light sm:text-xl">
          {children}
        </div>
      </section>
    </Reveal>
  );
}
