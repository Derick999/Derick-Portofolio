"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, type Category, type Project } from "@/lib/content";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import { ProjectCard } from "./ProjectCard";

type Filter = Category | "all";

const filterOptions: FilterOption<Filter>[] = [
  { value: "all", label: "All" },
  ...(Object.entries(categories) as [Category, string][]).map(
    ([value, label]) => ({ value, label }),
  ),
];

/**
 * Filter tabs + project grid. On filter change, leaving cards fade out,
 * remaining cards glide to their new spot (layout), new cards fade up.
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  // Full-width featured cards only make sense in the full list.
  const allowFeatured = filter === "all";

  return (
    <div>
      <FilterTabs options={filterOptions} active={filter} onChange={setFilter} />

      <motion.ul layout className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              className={
                allowFeatured && project.featured ? "md:col-span-2" : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                // Small stagger between neighbours, capped so late cards don't lag.
                delay: Math.min(i, 3) * 0.08,
                layout: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <ProjectCard
                project={{ ...project, featured: allowFeatured && project.featured }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center text-sm font-light text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
