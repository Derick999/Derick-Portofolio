import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/** Navy footer; continues the navy Contact section above it. */
export function Footer() {
  return (
    <footer className="theme-navy border-t border-border py-10">
      <Container className="text-sm font-light text-muted">
        © {new Date().getFullYear()} {site.name}
      </Container>
    </footer>
  );
}
