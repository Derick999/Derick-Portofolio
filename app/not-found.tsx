import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center py-24">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">
        Page not found.
      </h1>
      <p className="mt-4 text-lg font-light text-muted">
        This page doesn’t exist or has moved.
      </p>
      <Button href="/#work" className="mt-10">
        Back to work
      </Button>
    </Container>
  );
}
