"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;

/** Shared viewport settings: animate once, slightly before the element is fully visible. */
const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

type Tag = "div" | "li" | "ul" | "ol" | "article";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}

/** Fades content up once as it scrolls into view. Opacity and transform only, so no layout shift. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
}

/** Gentle fade + scale, used for the hero portrait. */
export function ScaleIn({ children, className, delay = 0 }: Omit<RevealProps, "as">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
}

/** Parent that reveals its `StaggerItem` children one after another. */
export function Stagger({ children, className, as = "div", stagger = 0.08 }: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={staggerItem}>
      {children}
    </Component>
  );
}
