import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ResumeButton } from "@/components/ui/resume-button";
import { ScaleIn, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site";
import { publicAsset } from "@/lib/assets";
import { buttonClasses, cn } from "@/lib/styles";

export function Hero() {
  const { name, title, tagline, location, availability, profileImageAlt } = siteConfig;
  const photo = publicAsset(siteConfig.profileImage);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      {/* Decorative glow, clipped by the section so it never causes horizontal scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[34rem] w-[min(64rem,180vw)] -translate-x-1/2 rounded-full bg-radial from-brand-from/15 via-brand-via/5 to-transparent blur-2xl dark:from-brand-from/25"
      />

      <Container className="grid items-center gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-16">
        <Stagger stagger={0.09}>
          {availability.status && (
            <StaggerItem>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-soft">
                <span className="relative flex size-2.5">
                  <span
                    className={cn(
                      "absolute inline-flex size-full animate-ping rounded-full opacity-60",
                      availability.status === "available" ? "bg-success" : "bg-amber-500",
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex size-2.5 rounded-full",
                      availability.status === "available" ? "bg-success" : "bg-amber-500",
                    )}
                  />
                </span>
                {availability.label}
              </p>
            </StaggerItem>
          )}

          <StaggerItem>
            <p className="font-mono text-sm tracking-wide text-accent">Hi, I&apos;m {name.split(" ")[0]} 👋</p>
          </StaggerItem>

          <StaggerItem>
            <h1
              id="hero-heading"
              className="mt-4 text-[2.25rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl md:text-[2.75rem] lg:text-6xl"
            >
              {name}
              <span className="text-gradient mt-1 block pb-1">{title}</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              {tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {location}
            </p>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <a href="#projects" className={buttonClasses("primary", "md", "group")}>
              Explore my work
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <ResumeButton />
          </StaggerItem>

          <StaggerItem>
            <SocialLinks className="mt-8" />
          </StaggerItem>
        </Stagger>

        <ScaleIn delay={0.15} className="mx-auto w-full max-w-[18rem] sm:max-w-xs md:max-w-none">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-2.5 rotate-3 rounded-[2rem] bg-brand opacity-40 blur-md sm:-inset-3"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-muted shadow-lifted">
              {photo ? (
                <Image
                  src={photo}
                  alt={profileImageAlt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 440px, (min-width: 768px) 300px, 288px"
                  className="object-cover object-[50%_30%]"
                />
              ) : (
                <div className="grid size-full place-items-center bg-brand">
                  <span className="text-6xl font-semibold text-white/90" role="img" aria-label={profileImageAlt}>
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </div>
        </ScaleIn>
      </Container>
    </section>
  );
}
