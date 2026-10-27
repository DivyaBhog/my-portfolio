import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Returns the public path if the file exists in /public, otherwise null, so
 * the UI can degrade gracefully when the resume or photo hasn't been added.
 */
export function publicAsset(publicPath: string): string | null {
  const relative = publicPath.replace(/^\/+/, "");
  if (!relative || relative.includes("..")) return null;
  return existsSync(path.join(process.cwd(), "public", relative)) ? publicPath : null;
}
