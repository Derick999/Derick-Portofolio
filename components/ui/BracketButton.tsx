type BracketButtonProps = {
  href: string;
  children: React.ReactNode;
  /** Adds the `download` attribute (e.g. for a CV file). */
  download?: boolean;
  className?: string;
};

/** Corner position classes; each corner drifts outward on hover. */
const corners = [
  "top-0 left-0 border-t border-l group-hover:-translate-x-1 group-hover:-translate-y-1",
  "top-0 right-0 border-t border-r group-hover:translate-x-1 group-hover:-translate-y-1",
  "bottom-0 left-0 border-b border-l group-hover:-translate-x-1 group-hover:translate-y-1",
  "bottom-0 right-0 border-b border-r group-hover:translate-x-1 group-hover:translate-y-1",
];

/**
 * Text link framed by thin navy corner brackets, like [ Label ].
 * On hover the brackets move slightly outward and the label turns accent.
 */
export function BracketButton({
  href,
  children,
  download,
  className = "",
}: BracketButtonProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      className={`group relative inline-flex h-11 items-center gap-2 px-5 text-[15px] font-medium text-primary transition-colors duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`absolute size-2.5 border-primary transition-[translate,border-color] duration-300 ease-out group-hover:border-accent ${position}`}
        />
      ))}
      {children}
    </a>
  );
}
