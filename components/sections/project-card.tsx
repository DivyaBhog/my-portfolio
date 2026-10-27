import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/ui/brand-icons";
import { buttonClasses, cn } from "@/lib/styles";
import type { Project } from "@/types";

// Decorative thumbnails for projects without a screenshot.
const placeholderGradients = [
  "from-violet-600 via-indigo-600 to-blue-600",
  "from-indigo-600 via-violet-600 to-fuchsia-600",
  "from-blue-600 via-indigo-600 to-violet-600",
  "from-fuchsia-600 via-violet-600 to-indigo-600",
];

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
}

export function ProjectCard({ project, index, priority = false }: ProjectCardProps) {
  const { title, description, highlights, category, technologies, image, liveUrl, repoUrl, featured } = project;

  return (
    <article className="group flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-[border-color,box-shadow,translate] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lifted">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        {image ? (
          <Image
            src={image}
            alt={`Screenshot of ${title}`}
            fill
            preload={priority}
            sizes="(min-width: 1200px) 570px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-[scale] duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "flex size-full items-end bg-linear-to-br p-5 transition-[scale] duration-500 ease-out group-hover:scale-[1.04] sm:p-6",
              placeholderGradients[index % placeholderGradients.length],
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-size-[28px_28px]" />
            <span className="relative text-2xl leading-tight font-semibold tracking-tight text-white/95 sm:text-3xl">
              {title}
            </span>
          </div>
        )}

        {featured && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-950 shadow-soft">
            <Star className="size-3 fill-current" aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-1.5 font-mono text-xs tracking-wide text-accent uppercase">{category}</p>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {technologies.map((tech) => (
            <li key={tech} className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
              {tech}
            </li>
          ))}
        </ul>

        {(liveUrl || repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${title} (opens in a new tab)`}
                className={buttonClasses("primary", "sm", "group/link")}
              >
                Live demo
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source code for ${title} on GitHub (opens in a new tab)`}
                className={buttonClasses("secondary", "sm")}
              >
                <GithubIcon className="size-4" />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
