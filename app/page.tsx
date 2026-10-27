import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { siteConfig } from "@/config/site";

export default function Home() {
  const { github, linkedin, email } = siteConfig.social;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    image: new URL(siteConfig.profileImage, siteConfig.url).toString(),
    email: email ? `mailto:${email}` : undefined,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    sameAs: [github, linkedin].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
