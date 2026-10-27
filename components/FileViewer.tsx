"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function stripFrontmatter(md: string): { front: string | null; body: string } {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? { front: m[1], body: md.slice(m[0].length) } : { front: null, body: md };
}

export default function FileViewer({ markdown, slug, liveUrl }: { markdown: string; slug: string; liveUrl: string }) {
  const [tab, setTab] = useState<"rendered" | "raw">("rendered");
  const [copied, setCopied] = useState(false);
  const { front, body } = stripFrontmatter(markdown);

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = markdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}-agent.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="viewer">
      <div className="viewer-bar">
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === "rendered"} onClick={() => setTab("rendered")}>Rendered</button>
          <button role="tab" aria-selected={tab === "raw"} onClick={() => setTab("raw")}>Raw</button>
        </div>
        <div className="actions">
          <button onClick={copy}>{copied ? "Copied" : "Copy"}</button>
          <button onClick={download}>Download</button>
          <a href={liveUrl} target="_blank" rel="noreferrer" className="button">Live file ↗</a>
        </div>
      </div>
      {tab === "rendered" ? (
        <div className="prose">
          {front && <pre className="frontmatter"><code>{front}</code></pre>}
          <ReactMarkdown remarkPlugins={[remarkGfm]}
            components={{ table: ({ children }) => <div className="table-wrap"><table>{children}</table></div> }}>
            {body}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="raw"><code>{markdown}</code></pre>
      )}
    </section>
  );
}
