# agents.paste

Static Next.js site (App Router, `output: "export"`) that shows agent-ready booking guides (`agent.md`) for three salons.
No API key, no API routes, no database.

- `lib/types.ts`, `lib/sites.ts` — shared contract (read-only for salon agents)
- `data/sites/{slug}.json` — salon metadata and owner flags
- `public/sites/{slug}/agent.md` — the files agents read; `public/llms.txt` lists them
- `npm run build` → `out/`; `npm run serve` serves it on :3000
- `npm run check -- <base url>` — PRD section 4.1 checks
