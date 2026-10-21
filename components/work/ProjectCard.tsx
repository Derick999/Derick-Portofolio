import Image from "next/image";
import Link from "next/link";
import { categories, type Project } from "@/lib/content";

/**
 * Whole card is one link to the case study.
 * Hover: cover slowly zooms in and an arrow fades in. Cover has a fixed
 * aspect ratio (4:3; featured cards go 16:9 on desktop so they fit the
 * screen) so the grid never shifts while images load.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-surface ${
          project.featured ? "md:aspect-[16/9]" : ""
        }`}
      >
        <Image
          src={project.cover}
          alt={`Cover image for ${project.title}`}
          fill
          sizes={
            project.featured
              ? "(min-width: 1152px) 1088px, 100vw"
              : "(min-width: 768px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm font-light text-muted">
            {categories[project.category]} · {project.year}
          </p>
        </div>

        {/* Arrow slides in on hover; always visible on touch screens. */}
        <span
          aria-hidden
          className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-all duration-500 ease-out [@media(hover:hover)]:-translate-x-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
