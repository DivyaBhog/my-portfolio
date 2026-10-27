"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "@/components/sections/project-card";
import { staggerItem } from "@/components/ui/reveal";
import { cn, focusRing } from "@/lib/styles";
import type { Project, ProjectCategory } from "@/types";

type Filter = "All" | ProjectCategory;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const categories: Filter[] = ["All", ...new Set(projects.map((project) => project.category))];
  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      {/* "All" plus at least two categories, otherwise filtering is pointless. */}
      {categories.length > 2 ? (
        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2 sm:mb-10">
          {categories.map((category) => {
            const count =
              category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
            const selected = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                  selected
                    ? "border-transparent text-background"
                    : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground",
                  focusRing,
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{category}</span>
                <span
                  className={cn(
                    "relative rounded-full px-1.5 text-xs tabular-nums",
                    selected ? "bg-background/20" : "bg-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul
        className="grid gap-5 sm:gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              variants={staggerItem}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              className="flex min-w-0"
            >
              <ProjectCard project={project} index={projects.indexOf(project)} priority={index < 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
