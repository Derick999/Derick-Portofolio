/**
 * Typed access to the JSON content in /data.
 * Add or edit items in the JSON files; components import from here.
 * Items with `"placeholder": true` are dummy entries — replace or delete them.
 */
import projectsData from "@/data/projects.json";
import journeyData from "@/data/journey.json";
import recognitionData from "@/data/recognition.json";
import skillsData from "@/data/skills.json";
import credentialsData from "@/data/credentials.json";

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/** Allowed project categories. Labels are what the filter tabs show. */
export const categories = {
  design: "Design",
  "photo-video": "Photo/Video",
  web: "Web",
  ai: "AI",
} as const;

export type Category = keyof typeof categories;

export type CaseStudy = {
  problem: string;
  /** Ordered steps; rendered as a numbered list. */
  process: string[];
  result: string[];
  /** Image paths under /public. Shown at 4:3. */
  gallery: string[];
  /** Optional live URL; leave "" to hide the button. */
  link?: string;
};

export type Project = {
  /** URL id: /work/<slug>. Lowercase, hyphens, unique. */
  slug: string;
  title: string;
  category: Category;
  year: string;
  role: string;
  /** One sentence, shown in metadata and on the case study page. */
  summary: string;
  /** Cover image path under /public. Shown at 4:3. */
  cover: string;
  tools: string[];
  /** Featured cards span the full grid width on desktop. */
  featured: boolean;
  placeholder?: boolean;
  caseStudy: CaseStudy;
};

/**
 * JSON imports widen `category` to string, so check it at build time.
 * A typo in projects.json fails `npm run build` with a clear message
 * instead of silently producing a project no filter can show.
 */
function validateProjects(data: typeof projectsData): Project[] {
  const slugs = new Set<string>();
  for (const p of data) {
    if (!(p.category in categories)) {
      throw new Error(
        `projects.json: "${p.slug}" has unknown category "${p.category}". ` +
          `Use one of: ${Object.keys(categories).join(", ")}.`,
      );
    }
    if (slugs.has(p.slug)) {
      throw new Error(`projects.json: duplicate slug "${p.slug}".`);
    }
    slugs.add(p.slug);
  }
  return data as Project[];
}

/** All projects, in the order they appear in projects.json. */
export const projects = validateProjects(projectsData);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The project after `slug`, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/* ------------------------------------------------------------------ */
/* Journey and other sections                                          */
/* ------------------------------------------------------------------ */

export type JourneyChapter = {
  /** Unique, lowercase. Used as the React key and anchor. */
  id: string;
  /** Short chapter name shown with its number, e.g. "Explore". */
  label: string;
  period: string;
  title: string;
  /** 1–2 sentences. */
  description: string;
  /** Short bullets, shown as pill tags. */
  highlights: string[];
  /** Optional image path under /public; "" for none. Shown at 4:3. */
  image?: string;
};

export type Journey = {
  heading: string;
  subline: string;
  chapters: JourneyChapter[];
  /** Quote card shown after the last chapter. */
  closing: { quote: string };
};

export type Recognition = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  placeholder?: boolean;
};

export type SkillGroup = {
  group: string;
  items: string[];
  placeholder?: boolean;
};

export type Credential = {
  name: string;
  /** "TODO" until known. */
  issuer: string;
  year: string;
  /** Verification / certificate link; "" hides the link icon. */
  url?: string;
};

// `satisfies` makes TypeScript flag a JSON entry that's missing a field.
export const journey = journeyData satisfies Journey;
export const recognition = recognitionData satisfies Recognition[];
export const skills = skillsData satisfies SkillGroup[];
export const credentials = credentialsData satisfies Credential[];
