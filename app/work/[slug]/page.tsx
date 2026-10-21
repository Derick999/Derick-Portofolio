import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import {
  categories,
  getNextProject,
  getProject,
  projects,
} from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/** Pre-render one page per project at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Any slug not in projects.json is a 404 (no on-demand rendering). */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} | ${site.name}`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      images: [{ url: project.cover, width: 1600, height: 1200 }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const next = getNextProject(slug);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Tools", value: project.tools.join(", ") },
  ];

  return (
    <article className="pt-10 pb-24 sm:pt-14">
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>←</span> Back to work
        </Link>

        {/* Title + meta */}
        <Reveal trigger="mount" className="mt-10 max-w-4xl sm:mt-14">
          <p className="text-sm font-medium text-accent">
            {categories[project.category]}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-xl leading-snug font-light text-muted sm:text-2xl">
            {project.summary}
          </p>
        </Reveal>

        <Reveal trigger="mount" delay={0.1}>
          <dl className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium tracking-wide text-muted uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-light">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Full-width cover (slightly wider than the text column). */}
      <Reveal trigger="mount" delay={0.2} className="mx-auto mt-12 max-w-7xl sm:mt-16 sm:px-8">
        <div className="relative aspect-[4/3] overflow-hidden bg-background-alt sm:rounded-[2rem] md:aspect-[16/9]">
          <Image
            src={project.cover}
            alt={`Cover image for ${project.title}`}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Container className="mt-10 sm:mt-16">
        <CaseStudySection index="01" title="Problem">
          <p>{caseStudy.problem}</p>
        </CaseStudySection>

        <CaseStudySection index="02" title="Process">
          <ol className="space-y-6">
            {caseStudy.process.map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="w-8 shrink-0 pt-0.5 text-base font-medium text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CaseStudySection>

        <CaseStudySection index="03" title="Result">
          <ul className="space-y-3">
            {caseStudy.result.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {caseStudy.link && (
            <Button href={caseStudy.link} className="mt-10">
              View live project
            </Button>
          )}
        </CaseStudySection>

        {caseStudy.gallery.length > 0 && (
          <section aria-label="Gallery" className="space-y-6 border-t border-border pt-14 sm:space-y-10 sm:pt-20">
            {caseStudy.gallery.map((src, i) => (
              <Reveal key={src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-background-alt sm:rounded-[2rem]">
                  <Image
                    src={src}
                    alt={`${project.title}, gallery image ${i + 1}`}
                    fill
                    sizes="(min-width: 1152px) 1088px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </section>
        )}

        {/* Next project */}
        <Link
          href={`/work/${next.slug}`}
          className="group mt-24 block border-t border-border pt-12 sm:mt-32"
        >
          <p className="text-sm text-muted">Next project</p>
          <p className="mt-3 flex items-center gap-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            <span className="transition-colors group-hover:text-accent">{next.title}</span>
            <span
              aria-hidden
              className="text-accent transition-transform duration-500 ease-out group-hover:translate-x-2"
            >
              →
            </span>
          </p>
        </Link>
      </Container>
    </article>
  );
}
