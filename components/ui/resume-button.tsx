import { Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { publicAsset } from "@/lib/assets";
import { buttonClasses } from "@/lib/styles";

/** Renders a disabled, clearly-labelled button when the PDF is missing from /public. */
export function ResumeButton({ variant = "secondary" }: { variant?: "primary" | "secondary" }) {
  const href = publicAsset(siteConfig.resumeFile);

  if (!href) {
    return (
      <button type="button" disabled className={buttonClasses(variant)} title="Resume file not found">
        <Download className="size-4" aria-hidden="true" />
        Resume unavailable
      </button>
    );
  }

  return (
    <a href={href} download className={buttonClasses(variant)}>
      <Download className="size-4" aria-hidden="true" />
      Download resume
    </a>
  );
}
