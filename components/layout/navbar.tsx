"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { containerClasses } from "@/components/ui/container";
import { EASE_OUT } from "@/components/ui/reveal";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks, siteConfig } from "@/config/site";
import { buttonClasses, cn, focusRing, iconButtonClasses } from "@/lib/styles";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const initials = siteConfig.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );

  // Highlight the link for whichever section is in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-border/70 bg-background/80 backdrop-blur-lg"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className={cn(containerClasses, "flex h-16 items-center justify-between gap-4")}>
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className={cn("group flex min-w-0 items-center gap-2.5 rounded-lg font-semibold tracking-tight", focusRing)}
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand font-mono text-sm text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6"
          >
            {initials}
          </span>
          <span className="truncate">{siteConfig.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <li key={href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-muted"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    "after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive ? "text-foreground after:hidden" : "text-muted-foreground hover:text-foreground",
                    focusRing,
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {/* Wrapper handles visibility; buttonClasses sets its own display. */}
          <div className="hidden lg:block">
            <a href="#contact" className={buttonClasses("primary", "sm")}>
              Let&apos;s talk
            </a>
          </div>
          <button
            type="button"
            className={cn(iconButtonClasses, "text-foreground lg:hidden")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="border-t border-border/70 lg:hidden"
          >
            <ul className={cn(containerClasses, "flex flex-col gap-1 py-4")}>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active === href ? "true" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active === href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      focusRing,
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href="#contact" onClick={() => setOpen(false)} className={buttonClasses("primary", "md", "w-full")}>
                  Let&apos;s talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
