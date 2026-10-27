export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
}

/**
 * `null` hides the availability badge entirely. Only set a status that is
 * actually true — the site never assumes you are looking for work.
 */
export type AvailabilityStatus = "available" | "limited" | null;

export interface Availability {
  status: AvailabilityStatus;
  label: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  detail?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  location: string;
  /** Absolute production URL, used for metadata, sitemap and Open Graph. */
  url: string;
  /** Path inside /public, e.g. "/profile.png". */
  profileImage: string;
  profileImageAlt: string;
  /** Path inside /public, e.g. "/resume.pdf". */
  resumeFile: string;
  social: SocialLinks;
  availability: Availability;
  about: {
    paragraphs: string[];
    interests: string[];
    approach: string[];
    goals: string;
    education: Education[];
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export type ProjectCategory = "Client Work" | "Personal";

export interface Project {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  category: ProjectCategory;
  technologies: string[];
  /** Optional screenshot in /public/projects. A styled placeholder is shown when absent. */
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  start: string;
  /** Omit for a current position. */
  end?: string;
  responsibilities: string[];
  technologies: string[];
}
