import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/config/site";
import { cn, iconButtonClasses } from "@/lib/styles";

export function SocialLinks({ className }: { className?: string }) {
  const { github, linkedin, email } = siteConfig.social;
  const links = [
    github && { label: "GitHub", href: github, icon: GithubIcon, external: true },
    linkedin && { label: "LinkedIn", href: linkedin, icon: LinkedinIcon, external: true },
    email && { label: "Email", href: `mailto:${email}`, icon: Mail, external: false },
  ].filter((link) => !!link);

  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            title={label}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className={cn(iconButtonClasses, "transition-[color,border-color,translate] hover:-translate-y-0.5")}
          >
            <Icon className="size-[18px] transition-transform duration-200 group-hover:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  );
}
