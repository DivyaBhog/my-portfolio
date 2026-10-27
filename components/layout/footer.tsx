import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CurrentYear } from "@/components/ui/current-year";
import { SocialLinks } from "@/components/ui/social-links";
import { navLinks, siteConfig } from "@/config/site";
import { cn, focusRing } from "@/lib/styles";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="grid gap-10 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-12">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {siteConfig.title} based in {siteConfig.location}.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-sm font-semibold">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={cn("rounded text-muted-foreground transition-colors hover:text-accent", focusRing)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col-reverse items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p className="text-center sm:text-left">
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground",
              focusRing,
            )}
          >
            Back to top
            <ArrowUp className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
