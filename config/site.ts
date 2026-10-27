import type { NavLink, SiteConfig } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PERSONALIZE HERE
 *  Everything personal on the site is read from this file and from the files in
 *  /data (skills, projects, experience). Details below were taken from the
 *  resume in /public. Anything marked `PLACEHOLDER` still needs your input.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const siteConfig: SiteConfig = {
  name: "Divya Bhogle",
  shortName: "Divya",
  title: "Frontend Developer",
  tagline:
    "I build fast, responsive and accessible web experiences with React, Next.js and TypeScript — clean interfaces backed by thoughtful, maintainable code.",
  location: "Mumbai, Maharashtra",

  // PLACEHOLDER: set NEXT_PUBLIC_SITE_URL in Vercel once you have a domain.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  // Replace the file in /public to change the photo. A monogram is shown if it is missing.
  profileImage: "/profile.png",
  profileImageAlt: "Portrait of Divya Bhogle",

  // Replace the PDF in /public (keep this path in sync). The download button
  // is disabled automatically if the file is missing.
  resumeFile: "/Divya_Bhogle_FrontendDeveloper_Resume.pdf",

  social: {
    github: "https://github.com/DivyaBhog",
    linkedin: "https://www.linkedin.com/in/divyabhogle29/",
    email: "divyabhogle09@gmail.com",
  },

  // Set `status` to "available" or "limited" to show the badge in the hero.
  // Left as `null` so the site doesn't claim you are job-hunting.
  availability: {
    status: null,
    label: "Open to frontend opportunities",
  },

  about: {
    paragraphs: [
      "I'm a frontend developer based in Mumbai, currently building production websites at Ervon Technology. I work mostly with React, Next.js (App Router, SSR and SSG), TypeScript and Tailwind CSS.",
      "I enjoy taking a website from a blank repository to a launched product — structuring reusable components, getting responsive layouts pixel-consistent across devices, and wiring up the serverless routes that turn visitors into enquiries.",
    ],
    interests: [
      "Component architecture",
      "Responsive, accessible UI",
      "Web performance & Core Web Vitals",
      "SEO-friendly, semantic markup",
    ],
    approach: [
      "Type-safe, modular components that are easy to extend",
      "Mobile-first layouts tested across breakpoints",
      "Performance budgets: optimized images and lean bundles",
    ],
    // PLACEHOLDER: rewrite this in your own words.
    goals:
      "I want to keep deepening my expertise in the React and Next.js ecosystem, take on more complex product work, and grow into a frontend engineer who owns features end to end.",
    education: [
      {
        degree: "B.Sc. Information Technology",
        institution: "Mulund College of Commerce, Mumbai",
        year: "2025",
        detail: "CGPA 8.57 / 10",
      },
    ],
  },
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
