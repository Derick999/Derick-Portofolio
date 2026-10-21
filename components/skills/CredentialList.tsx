import { Reveal } from "@/components/ui/Reveal";
import type { Credential } from "@/lib/content";

/**
 * Compact list of certificates/courses: name + issuer on the left, year on
 * the right. Rows with a `url` become links with an external-link icon.
 */
export function CredentialList({ credentials }: { credentials: Credential[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {credentials.map((credential, i) => {
        const content = (
          <>
            <div className="min-w-0">
              <p className="font-medium text-primary">{credential.name}</p>
              <p className="mt-0.5 text-sm font-light text-muted">
                {credential.issuer}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-sm text-muted tabular-nums">
              {credential.year}
              {credential.url && (
                <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
                  <path
                    d="M5.5 2.5h-3v9h9v-3M8 2.5h3.5V6M11.5 2.5 6.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </>
        );
        const row = "flex items-center justify-between gap-6 px-2 py-4 sm:px-3";

        return (
          <Reveal as="li" key={credential.name} delay={i * 0.05} y={12}>
            {credential.url ? (
              <a
                href={credential.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${row} rounded-xl transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-accent`}
              >
                {content}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <div className={row}>{content}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
