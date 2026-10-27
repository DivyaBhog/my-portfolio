import { cacheLife } from "next/cache";

/**
 * Cache Components forbids reading the clock during prerender, so the year is
 * computed inside a cache scope and refreshed daily.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
