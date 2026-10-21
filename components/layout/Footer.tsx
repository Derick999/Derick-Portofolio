import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="text-sm font-light text-muted">
        © {new Date().getFullYear()} {site.name}
      </Container>
    </footer>
  );
}
