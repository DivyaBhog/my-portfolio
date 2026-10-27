import type { SkillCategory } from "@/types";

/**
 * Only skills listed on the resume are included. Add SQL, authentication or
 * other backend skills here once you're comfortable claiming them.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Languages and frameworks I build with every day.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js (App Router, SSR, SSG)",
    ],
  },
  {
    title: "Styling",
    description: "Turning designs into consistent, responsive interfaces.",
    skills: ["Tailwind CSS", "Bootstrap", "Responsive Design", "UI Animations"],
  },
  {
    title: "Tools & Deployment",
    description: "How I ship, version and host my work.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Vercel",
      "Hostinger",
      "AI-Assisted Development Tools",
    ],
  },
  {
    title: "APIs & Performance",
    description: "Integrations and the details that make sites fast and findable.",
    skills: [
      "REST APIs",
      "Next.js Route Handlers",
      "Nodemailer",
      "Core Web Vitals",
      "Image Optimization",
      "Semantic HTML & SEO",
    ],
  },
];
