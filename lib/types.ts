export type Flag = {
  kind: "placeholder" | "price_range" | "conflict" | "missing" | "js_only" | "request_booking";
  message: string;      // plain English for the owner
  source_url: string;   // page where it was seen
};

export type SiteMeta = {
  slug: string;                 // "kim-nails" | "the-nail-suite" | "marlowe"
  name: string;
  hostnames: string[];          // without www, e.g. ["kimnailsandbeautylounge.com"]
  source_url: string;
  provider: string;             // e.g. "Squarespace Scheduling", or "unknown"
  booking_urls: { label: string; url: string }[];
  flags: Flag[];
  last_verified: string;        // "2026-10-26"
};
