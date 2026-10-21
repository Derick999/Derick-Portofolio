/**
 * Site-wide constants: identity copy and navigation.
 * Section content (projects, journey, …) lives in /data/*.json instead.
 */
export const site = {
  name: "Derick Raditya",
  tagline:
    "Digital marketer who builds it himself: strategy, visuals, web, and AI.",
  subline: "Digital Business Student at UBM · Chairperson of HIMA EXODUS",
  description:
    "Portfolio of Derick Raditya: digital marketing, visual design, photo/video, and AI-assisted web projects.",
} as const;

/**
 * Navbar anchors. The part after "#" must match a section `id` on the home
 * page. The leading "/" makes them work from case study pages too.
 */
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Journey", href: "/#journey" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
