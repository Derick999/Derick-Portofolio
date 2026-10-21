import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { WorkGrid } from "@/components/work/WorkGrid";
import { projects } from "@/lib/content";

/**
 * Hero and Work are built; the remaining sections are marked placeholders
 * so navigation and scrolling already work. Order here = order on the page.
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

      <Section id="journey" eyebrow="Journey" title="The journey so far.">
        <Placeholder note="Timeline will render from /data/journey.json in Phase 2." />
      </Section>

      <Section id="about" eyebrow="About" title="About me.">
        <Placeholder note="Short bio goes here. Copy to be written by Derick." />
      </Section>

      <Section id="recognition" eyebrow="Recognition" title="Recognition.">
        <Placeholder note="Awards and achievements will render from /data/recognition.json." />
      </Section>

      <Section id="skills" eyebrow="Skills" title="What I work with.">
        <Placeholder note="Skills will render from /data/skills.json in Phase 2." />
      </Section>

      <Section id="lab" eyebrow="Lab" title="Lab.">
        <Placeholder note="Experiments and AI-assisted builds will go here." />
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let’s talk.">
        <Placeholder note="Contact links (email, Instagram, LinkedIn) to be added." />
      </Section>
    </>
  );
}
