"use client";

import { motion } from "framer-motion";

export type FilterOption<T extends string> = { value: T; label: string };

type FilterTabsProps<T extends string> = {
  options: FilterOption<T>[];
  active: T;
  onChange: (value: T) => void;
};

/**
 * Minimal pill tabs. The active background is a single shared element
 * (layoutId) that glides between tabs instead of jumping.
 */
export function FilterTabs<T extends string>({
  options,
  active,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      // Scrolls sideways on very narrow screens instead of wrapping.
      className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 [scrollbar-width:none]"
    >
      <div className="inline-flex gap-1 rounded-full border border-border bg-surface p-1">
        {options.map((option) => {
          const isActive = option.value === active;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.value)}
              className={`relative rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-active-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
