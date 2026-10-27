import { ProjectGrid } from "@/components/sections/project-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";
import { publicAsset } from "@/lib/assets";

export function Projects() {
  // Drop image paths that don't exist so cards fall back to a placeholder.
  const resolved = projects.map((project) => ({
    ...project,
    image: project.image ? (publicAsset(project.image) ?? undefined) : undefined,
  }));

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="Projects"
        title="Selected work"
        description="Production websites I've built for clients, plus personal projects."
      />
      <ProjectGrid projects={resolved} />
    </Section>
  );
}
