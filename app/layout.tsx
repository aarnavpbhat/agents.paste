import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "agents.paste — agent-ready booking guides for salons",
  description: "Paste your salon's URL and get an agent.md that tells AI agents how to book with you.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body>
        <header className="masthead">
          <div className="wrap masthead-inner">
            <Link href="/" className="wordmark">agents<span>.</span>paste</Link>
            <span className="kicker">Booking guides for AI agents</span>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="colophon">
          <div className="wrap">
            <span>agents.paste · v0.1</span>
            <a href="/llms.txt">llms.txt</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
