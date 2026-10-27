import PasteForm from "@/components/PasteForm";
import { SITES } from "@/lib/sites";

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Issue No. 1 · Salons &amp; barbershops</p>
        <h1>Make your salon agent-ready.</h1>
        <p className="dek">
          Paste your booking site. We give you an <code>agent.md</code> file that tells any AI assistant your
          services, prices, hours and exactly how to book, stopping before it commits a customer.
        </p>
        <PasteForm sites={SITES.map(({ slug, name }) => ({ slug, name }))} />
      </section>

      <section className="steps" aria-label="How it works">
        <div>
          <span className="numeral">I</span>
          <h3>Paste</h3>
          <p>Drop in your salon&apos;s website or booking link, any page.</p>
        </div>
        <div>
          <span className="numeral">II</span>
          <h3>Review</h3>
          <p>See your guide exactly as agents will read it, with anything doubtful flagged.</p>
        </div>
        <div>
          <span className="numeral">III</span>
          <h3>Publish</h3>
          <p>Copy or download the file, or point agents at its live URL.</p>
        </div>
      </section>
    </>
  );
}
