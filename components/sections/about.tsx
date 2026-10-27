import { Compass, GraduationCap, Sparkles, Target } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { cardClasses, cn } from "@/lib/styles";

export function About() {
  const { paragraphs, interests, approach, goals, education } = siteConfig.about;

  return (
    <Section id="about">
      <SectionHeading id="about" eyebrow="About me" title="Crafting interfaces that feel effortless." />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal className="max-w-2xl">
          <div className="space-y-5 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-8 mb-3 text-sm font-semibold tracking-wide text-foreground">What I care about</h3>
          <ul className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-soft"
              >
                {interest}
              </li>
            ))}
          </ul>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StaggerItem>
            <InfoCard icon={<Compass className="size-5" />} title="How I work">
              <ul className="space-y-2">
                {approach.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Sparkles className="mt-1 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </StaggerItem>

          <StaggerItem>
            <InfoCard icon={<Target className="size-5" />} title="Where I'm heading">
              <p>{goals}</p>
            </InfoCard>
          </StaggerItem>

          {education.length > 0 && (
            <StaggerItem className="sm:col-span-2 lg:col-span-1">
              <InfoCard icon={<GraduationCap className="size-5" />} title="Education">
                <ul className="space-y-2">
                  {education.map((item) => (
                    <li key={item.degree}>
                      <p className="font-medium text-foreground">{item.degree}</p>
                      <p>
                        {item.institution} · {item.year}
                        {item.detail && ` · ${item.detail}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </Section>
  );
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className={cn(cardClasses, "group h-full hover:border-accent/40 hover:shadow-lifted")}>
      <div className="mb-3 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110"
        >
          {icon}
        </span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
