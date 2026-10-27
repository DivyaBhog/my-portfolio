import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 max-w-2xl sm:mb-12 lg:mb-14">
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="text-[1.75rem] leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
