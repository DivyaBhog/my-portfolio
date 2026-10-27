import type { Project } from "@/types";

/**
 * Add screenshots to /public/projects and reference them with `image`.
 * `repoUrl` is omitted where no public repository was provided — the GitHub
 * button only appears when a URL is set.
 */
export const projects: Project[] = [
  {
    slug: "urbanetek",
    title: "URBANETEK Digital Platform",
    description:
      "A complete company website built in Next.js with reusable components, semantic HTML and automated enquiry handling.",
    highlights: [
      "Custom click-triggered navigation dropdowns",
      "Server-side API routes that email enquiries via Nodemailer",
      "Images optimized with next/image for better Lighthouse scores",
    ],
    category: "Client Work",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer"],
    liveUrl: "https://www.urbanetekib.com/",
    featured: true,
  },
  {
    slug: "shree-jeteshwar-steel-arts",
    title: "Shree Jeteshwar Steel Arts",
    description:
      "A responsive multi-page business website with validated lead forms and quick WhatsApp contact.",
    highlights: [
      "Multi-page layouts with a component-based structure",
      "SEO meta tags and Open Graph previews",
      "Validated lead forms and WhatsApp chat buttons",
    ],
    category: "Client Work",
    technologies: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://www.shreejeteshwarsteelarts.com/",
  },
  {
    slug: "kosan-energy",
    title: "Kosan Energy",
    description:
      "A clean, mobile-responsive corporate website presenting industrial gas and energy solutions.",
    highlights: [
      "Modular sections that simplify complex engineering services",
      "Clear navigation menus",
      "Optimized assets for smooth scrolling and fast loads",
    ],
    category: "Client Work",
    technologies: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://kosanenergy.com/",
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    description:
      "This site — a typed, themeable Next.js portfolio with a validated, rate-limited contact form.",
    highlights: [
      "Light and dark themes with next-themes",
      "Contact form validated with Zod and delivered through Resend",
      "Data-driven sections that are easy to update",
    ],
    category: "Personal",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Resend"],
    // PLACEHOLDER: add `liveUrl` after deploying and `repoUrl` after pushing to GitHub.
  },
];
