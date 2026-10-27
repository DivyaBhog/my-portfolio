import { Code2, Palette, Rocket, Zap, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillCategories } from "@/data/skills";
import { cardClasses, cn } from "@/lib/styles";

const icons: LucideIcon[] = [Code2, Palette, Rocket, Zap];

export function Skills() {
  return (
    <Section id="skills" tone="muted">
      <SectionHeading
        id="skills"
        eyebrow="Skills"
        title="My toolkit"
        description="The languages, frameworks and tools I use to design, build and ship websites."
      />

      <Stagger as="ul" className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {skillCategories.map((category, index) => {
          const Icon = icons[index % icons.length];
          return (
            <StaggerItem
              as="li"
              key={category.title}
              className={cn(cardClasses, "group sm:p-7 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lifted")}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{category.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
