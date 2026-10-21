"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { navLinks } from "@/lib/site";

/** Section ids the navbar links to, e.g. "work" from "/#work". */
const navIds: string[] = navLinks.map((link) => link.href.split("#")[1]);

/**
 * Navbar links with scroll-spy. On the home page, the link for the section
 * crossing the middle band of the screen is active; an accent pill slides
 * between links (shared layoutId). On case study pages, "Work" is active.
 */
export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  // While a click-triggered smooth scroll runs, ignore the observer so the
  // pill goes straight to the target instead of visiting every section between.
  const lockRef = useRef(false);

  useEffect(() => {
    if (!isHome) return;

    // Watch every section (not just nav ones) so that when e.g. the hero or
    // Skills fills the band, no nav item stays wrongly highlighted.
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(navIds.includes(id) ? id : null);
          }
        }
      },
      // A thin band from 40% to 50% down the viewport counts as "in view".
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  const current = isHome ? active : pathname.startsWith("/work") ? "work" : null;

  return (
    <ul className="flex items-center gap-0.5 sm:gap-1">
      {navLinks.map((link, i) => {
        const id = navIds[i];
        const isActive = id === current;
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
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 36 }
                  }
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
