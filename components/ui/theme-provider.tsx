"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// next-themes injects a blocking script that applies the saved theme before
// paint (no flash). React 19 warns when a Client Component renders a <script>;
// making it inert on the client silences that while the server copy still runs.
const scriptProps = { type: typeof window === "undefined" ? "text/javascript" : "text/plain" };

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {/* Animations are skipped for visitors who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
