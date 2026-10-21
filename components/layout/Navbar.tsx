import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { NavLinks } from "./NavLinks";

/**
 * Sticky, minimal navbar with a translucent blurred background.
 * Server component; the links (with scroll-spy) are a small client island.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-nav backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-primary transition-colors hover:text-accent"
        >
          {/* Short name on small phones so all four links fit. */}
          <span className="sm:hidden">{site.name.split(" ")[0]}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Main">
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
