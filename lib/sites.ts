import type { SiteMeta } from "@/lib/types";
import kim from "@/data/sites/kim-nails.json";
import suite from "@/data/sites/the-nail-suite.json";
import marlowe from "@/data/sites/marlowe.json";

export const SITES = [kim, suite, marlowe] as SiteMeta[];

export function normalizeHost(input: string): string | undefined {
  const raw = input.trim();
  if (!raw) return undefined;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.hostname.toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  } catch {
    return undefined;
  }
}

export function findSite(input: string): SiteMeta | undefined {
  const host = normalizeHost(input);
  if (!host) return undefined;
  return SITES.find((s) => s.hostnames.includes(host));
}

export function getSite(slug: string): SiteMeta | undefined {
  return SITES.find((s) => s.slug === slug);
}
