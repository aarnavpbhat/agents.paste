import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import FileViewer from "@/components/FileViewer";
import { SITES, getSite } from "@/lib/sites";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSite(slug);
  return { title: site ? `${site.name} · agents.paste` : "agents.paste" };
}

function readAgentFile(slug: string): string | null {
  const file = path.join(process.cwd(), "public", "sites", slug, "agent.md");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

export default async function SalonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) notFound();
  const markdown = readAgentFile(slug);
  const liveUrl = `/sites/${slug}/agent.md`;

  return (
    <article className="salon">
      <Link href="/" className="back">← Paste another site</Link>
      <p className="eyebrow">Agent guide</p>
      <h1>{site.name}</h1>
      <p className="byline">
        <a href={site.source_url} target="_blank" rel="noreferrer">{site.source_url.replace(/^https?:\/\//, "")}</a>
        <span aria-hidden> · </span>
        {site.last_verified ? `Last verified ${site.last_verified}` : "Not yet verified"}
      </p>

      <dl className="facts">
        <div>
          <dt>Booking provider</dt>
          <dd>{site.provider || "unknown"}</dd>
        </div>
        <div>
          <dt>Booking links</dt>
          <dd>
            {site.booking_urls.length === 0 ? "unknown" : (
              <ul>
                {site.booking_urls.map((b) => (
                  <li key={b.url}><a href={b.url} target="_blank" rel="noreferrer">{b.label}</a></li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>

      {site.flags.length > 0 && (
        <section className="flags" aria-label="Flags for the owner">
          <h2>Check before you publish</h2>
          <ul>
            {site.flags.map((f, i) => (
              <li key={i} className={`chip ${f.kind === "placeholder" ? "red" : "yellow"}`}>
                <span className="chip-kind">{f.kind.replace("_", " ")}</span>
                <span>{f.message}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {markdown ? (
        <FileViewer markdown={markdown} slug={slug} liveUrl={liveUrl} />
      ) : (
        <section className="coming-soon">
          <h2>Coming soon</h2>
          <p>This salon&apos;s <code>agent.md</code> hasn&apos;t been written yet.</p>
        </section>
      )}
    </article>
  );
}
