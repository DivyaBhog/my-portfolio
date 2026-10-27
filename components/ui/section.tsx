import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/styles";

interface SectionProps {
  id: string;
  children: ReactNode;
  /** "muted" adds a subtle band to separate alternating sections. */
  tone?: "default" | "muted";
  className?: string;
}

/** Consistent vertical rhythm and container for every page section. */
export function Section({ id, children, tone = "default", className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "muted" && "border-y border-border/60 bg-muted/50",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
