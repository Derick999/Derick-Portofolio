import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { WorkGrid } from "@/components/work/WorkGrid";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { CredentialList } from "@/components/skills/CredentialList";
import { credentials, journey, projects } from "@/lib/content";

/**
 * Hero, Work and Journey are built; the remaining sections are marked
 * placeholders so navigation and scrolling already work.
 * Order here = order on the page. Tones alternate white / light gray,
 * with Contact (and the footer) as the dark navy feature section.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="work"
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
        <JourneyTimeline journey={journey} />
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
