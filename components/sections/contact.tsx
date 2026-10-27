import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site";
import { cardClasses, cn } from "@/lib/styles";

const iconBadge =
  "grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110";

export function Contact() {
  const { email } = siteConfig.social;

  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        eyebrow="Contact"
        title="Let's build something together"
        description="Have a project, role or question in mind? Send a message and I'll get back to you."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-8">
        <Stagger className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {email && (
            <StaggerItem className="sm:col-span-2 lg:col-span-1">
              <a
                href={`mailto:${email}`}
                className={cn(cardClasses, "group flex items-center gap-4 hover:border-accent/40 hover:shadow-lifted")}
              >
                <span aria-hidden="true" className={iconBadge}>
                  <Mail className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">Email</span>
                  <span className="block font-medium break-all transition-colors group-hover:text-accent">
                    {email}
                  </span>
                </span>
              </a>
            </StaggerItem>
          )}
          <StaggerItem>
            <div className={cn(cardClasses, "group flex h-full items-center gap-4")}>
              <span aria-hidden="true" className={iconBadge}>
                <MapPin className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted-foreground">Location</span>
                <span className="block font-medium">{siteConfig.location}</span>
              </span>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={cn(cardClasses, "h-full")}>
              <p className="mb-3 text-sm text-muted-foreground">Find me online</p>
              <SocialLinks />
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.1} className={cn(cardClasses, "relative sm:p-8")}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
