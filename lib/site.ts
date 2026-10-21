/**
 * Site-wide identity copy (name, role, hero text, proof points) lives in
 * /data/site.json so it can be edited without touching components.
 * Section content (projects, journey, …) lives in the other /data/*.json files.
 */
import siteData from "@/data/site.json";

export const site = siteData;

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
