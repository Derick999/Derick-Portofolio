/**
 * Typed access to the JSON content in /data.
 * Add or edit items in the JSON files; components import from here.
 * Items with `"placeholder": true` are dummy entries — replace or delete them.
 */
import projectsData from "@/data/projects.json";
import journeyData from "@/data/journey.json";
import recognitionData from "@/data/recognition.json";
import skillsData from "@/data/skills.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  tags: string[];
  /** Path under /public, e.g. "/images/projects/my-project.jpg" */
  image: string;
  /** External/case-study URL; empty string if none */
  link: string;
  featured: boolean;
  placeholder?: boolean;
};

export type JourneyItem = {
  period: string;
  title: string;
  organization: string;
  description: string;
  placeholder?: boolean;
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

// `satisfies` makes TypeScript flag a JSON entry that's missing a field.
export const projects = projectsData satisfies Project[];
export const journey = journeyData satisfies JourneyItem[];
export const recognition = recognitionData satisfies Recognition[];
export const skills = skillsData satisfies SkillGroup[];
