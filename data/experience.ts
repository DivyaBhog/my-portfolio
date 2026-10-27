import type { Experience } from "@/types";

/** Most recent first. Leave `end` undefined for a current role. */
export const experience: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Ervon Technology Pvt Ltd",
    location: "Mumbai, Maharashtra",
    start: "March 2026",
    responsibilities: [
      "Built and launched 2 production corporate websites from scratch using Next.js and Tailwind CSS.",
      "Created clean, responsive and interactive UI components with smooth animations using modern React.",
      "Refined layouts, responsive breakpoints and spacing grids for pixel-consistent results across mobile, tablet and desktop.",
      "Architected lead-capture modals and integrated serverless API routes with Nodemailer for automated enquiry emails.",
      "Developed type-safe modular components using TypeScript interfaces and props.",
      "Managed code and shipped regular updates with Git and GitHub.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Nodemailer", "Git"],
  },
];
