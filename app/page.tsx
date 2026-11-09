import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { WorkGrid } from "@/components/work/WorkGrid";
import { JourneyStack } from "@/components/journey/JourneyStack";
import { CredentialList } from "@/components/skills/CredentialList";
import { credentials, journey, projects } from "@/lib/content";

/**
 * Hero, Work and Journey are built; the remaining sections are marked
 * placeholders so navigation and scrolling already work.
 * Order here = order on the page. Work sits directly under the hero on navy
 * (the cropped portrait "stands" on it); Journey and the rest are white /
 * light gray; Contact (and the footer) are navy again.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="work"
        tone="navy"
        eyebrow="Work"
        title="Selected Work"
        intro="Branding, visuals, web, and AI projects, each with the story behind it."
      >
        <WorkGrid projects={projects} />
      </Section>

      <Section
        id="journey"
        tone="alt"
        title={journey.heading}
        intro={journey.subline}
      >
        <JourneyStack journey={journey} />
      </Section>

      <Section id="about" eyebrow="About" title="About me.">
        <Placeholder note="Short bio goes here. Copy to be written by Derick." />
      </Section>

      <Section id="recognition" tone="alt" eyebrow="Recognition" title="Recognition.">
        <Placeholder note="Awards and achievements will render from /data/recognition.json." />
      </Section>

      <Section id="skills" eyebrow="Skills" title="What I work with.">
        <Placeholder note="Skills will render from /data/skills.json in Phase 2." />

        <div className="mt-20">
          <h3 className="text-sm font-medium text-accent">Credentials</h3>
          <div className="mt-5">
            <CredentialList credentials={credentials} />
          </div>
        </div>
      </Section>

      <Section id="lab" tone="alt" eyebrow="Lab" title="Lab.">
        <Placeholder note="Experiments and AI-assisted builds will go here." />
      </Section>

      <Section id="contact" tone="navy" eyebrow="Contact" title="Let’s talk.">
        <Placeholder note="Contact links (email, Instagram, LinkedIn) to be added." />
      </Section>
    </>
  );
}
