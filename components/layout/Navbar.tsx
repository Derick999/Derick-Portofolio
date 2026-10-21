import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/**
 * Sticky, minimal navbar with a translucent blurred background.
 * Server component; Link gives client-side navigation from case study pages.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-nav backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-primary transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-5 sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-muted transition-colors hover:text-accent sm:text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
