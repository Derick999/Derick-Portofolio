import fs from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import { HeroScene } from "./HeroScene";

/**
 * Hero (server part): checks at build time whether the cutout portrait
 * exists in /public, so the page shows a placeholder instead of a broken
 * image until it's added. All copy comes from /data/site.json.
 */
export function Hero() {
  const portraitPath = path.join(process.cwd(), "public", site.hero.portrait);
  const hasPortrait = fs.existsSync(portraitPath);

  return <HeroScene name={site.name} hero={site.hero} hasPortrait={hasPortrait} />;
}
