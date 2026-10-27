# agents.paste: 60-second demo

Replace `$SITE` with the production URL (e.g. `https://agents-paste.vercel.app`).

1. **Kim Nails (0:00–0:15).** Open `$SITE`. Paste `https://www.kimnailsandbeautylounge.com/booking` and press **Paste**.
   Point at the yellow **request booking** chip ("Agents will report this as pending until the salon texts to
   confirm") and the **conflict** chip: two different phone numbers on the same site.
2. **The Nail Suite (0:15–0:30).** Click **← Paste another site**. Paste `https://www.thenailsuites.com/menu`.
   "A plain fetch of this menu returns nothing; here it is as plain Markdown." Point at the red **placeholder** chip
   (a 555 phone in the footer) and the address conflict (San Francisco footer vs Berkeley booking page).
   Click **Raw**, then **Copy**.
3. **Agent run (0:30–0:50).** Click **Live file ↗** (opens `$SITE/sites/the-nail-suite/agent.md`). Give that URL to an
   AI agent with: "Book a gel manicure Saturday afternoon." Show it following the numbered steps and stopping at the
   stop point to ask for approval.
4. **Close (0:50–1:00).** "Next: paste any salon URL and get a verified file in minutes" (PRD section 9.4).

Backup if a salon is not ready: Marlowe (`https://hellomarlowe.com/`) shows two locations, a phone CONFLICT chip, and the full file.
