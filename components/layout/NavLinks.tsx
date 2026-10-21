"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks } from "@/lib/site";

/** Section ids the navbar links to, e.g. "work" from "/#work". */
const navIds: string[] = navLinks.map((link) => link.href.split("#")[1]);

/** Id of the hero section (see components/sections/Hero.tsx). */
const HERO_ID = "top";

/**
 * Navbar links with an accent pill marking the active section.
 *
 * - On load / at the hero, nothing is highlighted.
 * - Clicking a link highlights it right away and smooth-scrolls there.
 * - Once the hero has scrolled out of the middle of the screen, scroll-spy
 *   takes over: the pill follows the section in the middle band, slides
 *   between links (shared layoutId), and fades out when you scroll back up
 *   to the hero or into a section that has no nav link.
 * - Off the home page (case studies) nothing is highlighted.
 */
export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  // While a click-triggered smooth scroll runs, ignore scroll-spy so the
  // pill goes straight to the target instead of visiting every section between.
  const lockRef = useRef(false);

  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }

    // Watch every section, the hero included: when the hero (or a section
    // without a nav link, like Skills) fills the band, the pill clears.
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id !== HERO_ID && navIds.includes(id) ? id : null);
        }
      },
      // A thin band from 40% to 50% down the viewport counts as "in view".
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    // Back at the very top, always clear, even if the observer's band
    // happens to fall below a short hero (e.g. on wide, short screens).
    const onScroll = () => {
      if (!lockRef.current && window.scrollY < 8) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  function handleClick(event: React.MouseEvent, id: string) {
    const target = document.getElementById(id);
    if (!isHome || !target) return; // Off the home page: normal navigation.

    event.preventDefault();
    setActive(id);
    lockRef.current = true;

    // scroll-margin-top on sections (globals.css) keeps them below the navbar.
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);

    const unlock = () => {
      lockRef.current = false;
      window.removeEventListener("scrollend", unlock);
    };
    window.addEventListener("scrollend", unlock);
    window.setTimeout(unlock, 1200); // Fallback for browsers without scrollend.
  }

  return (
    <ul className="flex items-center gap-0.5 sm:gap-1">
      {navLinks.map((link, i) => {
        const id = navIds[i];
        const isActive = id === active;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={(event) => handleClick(event, id)}
              aria-current={isActive ? "location" : undefined}
              className={`relative block rounded-full px-2.5 py-1.5 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm ${
                isActive
                  ? "text-accent-foreground"
                  : "text-muted hover:bg-hover hover:text-primary"
              }`}
            >
              {/* Pill: slides between links; fades in/out when it appears or clears. */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
              </AnimatePresence>
              <span className="relative">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
