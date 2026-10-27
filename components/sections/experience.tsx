import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";
import { cardClasses, cn } from "@/lib/styles";

export function Experience() {
  return (
    <Section id="experience" tone="muted">
      <SectionHeading id="experience" eyebrow="Experience" title="Where I've worked" />

      {/* ::before draws the timeline rail through the centre of each marker. */}
      <Stagger
        as="ol"
        className="relative space-y-8 pl-10 before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-border sm:pl-14 sm:before:left-5"
      >
        {experience.map((job) => (
          <StaggerItem as="li" key={`${job.company}-${job.start}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-5 -left-10 grid size-8 place-items-center rounded-full border border-border bg-card text-accent shadow-soft sm:-left-14 sm:size-10"
            >
              <Briefcase className="size-4" />
            </span>

            <div className={cn(cardClasses, "sm:p-8 hover:border-accent/40 hover:shadow-lifted")}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold sm:text-xl">{job.role}</h3>
                  <p className="mt-1 font-medium text-accent">{job.company}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground md:flex-col md:items-end md:text-right">
                  <p className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap text-foreground">
                    <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
                    {job.start} – {job.end ?? "Present"}
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                    {job.location}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                {job.technologies.map((tech) => (
                  <li key={tech} className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
