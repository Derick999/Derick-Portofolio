type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-medium " +
  "transition-[transform,background-color,color,opacity] duration-200 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Navy filled / navy outline; both turn accent blue on hover.

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
  secondary:
    "border border-primary text-primary hover:border-accent hover:bg-accent hover:text-accent-foreground",
} as const;

/**
 * Pill-shaped link button. Rendered as <a> because every button in the
 * portfolio navigates (anchors, mailto, external links).
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
