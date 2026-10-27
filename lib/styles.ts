export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Shared keyboard focus style for every interactive element. */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base = cn(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow,filter,scale] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  focusRing,
);

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white shadow-soft hover:shadow-lifted hover:brightness-110",
  secondary: "border border-border bg-card text-foreground shadow-soft hover:border-accent/50 hover:text-accent",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm sm:text-[0.9375rem]",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

/** Round icon button used for the theme toggle, menu button and social links. */
export const iconButtonClasses = cn(
  "group inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent",
  focusRing,
);

/** Base card surface: same radius, border, padding and hover across sections. */
export const cardClasses =
  "rounded-2xl border border-border bg-card p-5 shadow-soft transition-[border-color,box-shadow,translate] duration-300 ease-out sm:p-6";
