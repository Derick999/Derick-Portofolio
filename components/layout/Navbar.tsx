import { navLinks, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/**
 * Sticky, minimal navbar with a translucent blurred background.
 * Pure server component: plain anchor links, no JS needed.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-nav backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-14 items-center justify-between">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {site.name}
        </a>

        <nav aria-label="Main">
          <ul className="flex items-center gap-5 sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] text-muted transition-colors hover:text-foreground sm:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
