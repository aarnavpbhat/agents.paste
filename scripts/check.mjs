// Usage: npm run check -- https://your-deploy.vercel.app   (defaults to http://localhost:3000)
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SLUGS = ["kim-nails", "the-nail-suite", "marlowe"];
const HEADINGS = [
  "Locations and hours", "Services", "How to book", "Stop point",
  "Pitfalls", "Policies", "Contact fallback", "Rules for agents",
];

async function status(url) {
  try {
    const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    return res.status;
  } catch (e) {
    return `error: ${e.cause?.code || e.message}`;
  }
}

const rows = [];
const add = (slug, check, ok, detail = "") => rows.push({ slug, check, result: ok ? "PASS" : "FAIL", detail });

for (const slug of SLUGS) {
  const meta = JSON.parse(fs.readFileSync(path.join("data", "sites", `${slug}.json`), "utf8"));
  const fileUrl = `${base}/sites/${slug}/agent.md`;

  let body = "";
  try {
    const res = await fetch(fileUrl, { signal: AbortSignal.timeout(15000) });
    body = res.ok ? await res.text() : "";
    add(slug, "agent.md 200", res.status === 200, `${res.status} ${fileUrl}`);
  } catch (e) {
    add(slug, "agent.md 200", false, `error: ${e.cause?.code || e.message}`);
  }

  if (body) {
    const missing = HEADINGS.filter((h) => !new RegExp(`^##\\s+${h}\\s*$`, "mi").test(body));
    add(slug, "8 template headings", missing.length === 0, missing.length ? `missing: ${missing.join(", ")}` : "");

    const leaks = body.split("\n").filter((l) => /555|123 Main/i.test(l) && !/placeholder/i.test(l));
    add(slug, "no unflagged placeholders", leaks.length === 0, leaks.map((l) => l.trim()).join(" | "));
  } else {
    add(slug, "8 template headings", false, "no file");
    add(slug, "no unflagged placeholders", false, "no file");
  }

  if (meta.booking_urls.length === 0) {
    add(slug, "booking URLs reachable", false, "no booking_urls in JSON");
  }
  for (const b of meta.booking_urls) {
    const s = await status(b.url);
    add(slug, `booking URL: ${b.label}`, typeof s === "number" && s >= 200 && s < 400, `${s} ${b.url}`);
  }
}

const w = (k) => Math.max(k.length, ...rows.map((r) => String(r[k]).length));
const [ws, wc, wr] = [w("slug"), w("check"), w("result")];
console.log(`\nagents.paste check against ${base}\n`);
console.log(`${"slug".padEnd(ws)}  ${"check".padEnd(wc)}  ${"result".padEnd(wr)}  detail`);
console.log(`${"-".repeat(ws)}  ${"-".repeat(wc)}  ${"-".repeat(wr)}  ------`);
for (const r of rows) console.log(`${r.slug.padEnd(ws)}  ${r.check.padEnd(wc)}  ${r.result.padEnd(wr)}  ${r.detail}`);

const failed = rows.filter((r) => r.result === "FAIL").length;
console.log(`\n${rows.length - failed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
