import { Reveal } from "./Reveal";

/**
 * Visibly marked "content coming" block, so no real-looking content is
 * invented. Remove once a section is built in a later phase.
 */
export function Placeholder({ note }: { note: string }) {
  return (
    <Reveal>
      <div className="flex min-h-48 items-center justify-center rounded-3xl border border-dashed border-border bg-surface/60 p-8 text-center transition-transform duration-300 ease-out hover:-translate-y-1">
        <p className="text-sm font-light text-muted">
          <span className="mr-2 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            PLACEHOLDER
          </span>
          {note}
        </p>
      </div>
    </Reveal>
  );
}
