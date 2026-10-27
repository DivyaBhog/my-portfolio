import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/styles";

/** The single source of page width and side gutters. */
export const containerClasses = "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn(containerClasses, className)} {...props} />;
}
