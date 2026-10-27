"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { findSite } from "@/lib/sites";

export default function PasteForm({ sites }: { sites: { slug: string; name: string }[] }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const site = findSite(url);
    if (site) {
      setError(false);
      router.push(`/s/${site.slug}`);
    } else {
      setError(true);
    }
  }

  return (
    <div className="paste">
      <form onSubmit={onSubmit} className="paste-form">
        <label htmlFor="url" className="sr-only">Your salon&apos;s website</label>
        <input
          id="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://yoursalon.com/booking"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(false); }}
        />
        <button type="submit">Paste</button>
      </form>
      {error && (
        <p className="notice" role="alert">agents.paste supports these 3 salons for now.</p>
      )}
      <div className="salon-buttons">
        <span className="label">Or open one</span>
        {sites.map((s) => (
          <button key={s.slug} type="button" className="ghost" onClick={() => router.push(`/s/${s.slug}`)}>
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
