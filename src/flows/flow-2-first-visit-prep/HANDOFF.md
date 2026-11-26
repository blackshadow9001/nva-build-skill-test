# Flow 2 · First Visit Prep — handoff notes

**Status:** draft · **Device:** mobile · **Route:** `/flow-2-first-visit-prep`
**Source:** sandbox canvas, page "Flow 1 · Vet Finder", Flow 2 row, artboards FVP-Email and FVP-Guide (checksums in `source.json`)
**Components:** shadcn/ui (Base UI) from `src/components/ui`: Button, Avatar, Badge, Card, Alert, Progress, Checkbox, ToggleGroup, Accordion, Field, Textarea, Item, Separator. The illustrated map is `screens/ClinicMap.tsx` (Tailwind, Syrup tokens).
**Persona / timepoint:** Lucy, 5 days before Waffles' first visit (Tue, Nov 10 · 9:30 AM, Dr. Priya Shah, Maple Grove Animal Hospital).

| # | Screen | Route | What happens |
|---|---|---|---|
| 2.1 | Confirmation email | `/flow-2-first-visit-prep` | The clinic's email as read in webmail. "Open my prep guide" goes to the guide. Inbox, Archive and More show a toast. Opening this screen resets the guide's saved state. |
| 2.2 | First Visit Prep | `/flow-2-first-visit-prep/guide` | Back arrow returns to the email. The jump bar sticks to the top and scrolls to Visit info / Pet prep / Care team. The "What to bring" checklist updates the "Your prep" progress bar (starts at 2 of 6). Temperament is a single choice (default Anxious); picking Anxious or Reactive opens the matching tips. Tips open and close independently (Anxious open by default). Notes are kept. Map + / − zoom the illustrated map. Get directions, Call clinic, Open in Maps, Message the care team and footer links show a toast. |

Device chrome from the artboards (status bar, browser toolbar and URL bar) is not ported.

**State kept:** `sessionStorage["proto:flow-2-first-visit-prep"]` → `{ bring: {b1..b6: bool}, temper: "calm"|"anxious"|"reactive", open: string[], notes: string }` (see `state.ts`). Cleared when the email loads, and by "Restart the journey" in the screen picker.

**Data:** all copy and data come from the artboards. Placeholders kept exactly as on the canvas: `[CLINIC PHONE]`, `[CLINIC ADDRESS]`, `[PARKING DETAILS, e.g. free lot behind the building]`, `[VET TECH NAME]`, `[CLIENT CARE NAME]`.

**Tweaks → URL:** none on the canvas.

**Journey:** not linked from another flow yet; reach it from the screen picker (Ctrl/⌘ + K). Linking it is a separate change to `src/app/journey.ts`.

**Swap points:**
- `state.ts` → `BRING` / `TEAM`: replace with the appointment's prep checklist and the care team from the booking.
- Checklist, temperament and notes are session-only; persist them to the pet's record and share notes with the care team.
- Map: illustrated placeholder; swap for a real map and directions deep link once the address exists.
- Call clinic / reschedule: `tel:` link once the phone number exists. "In 5 days" and the dates are static.

**Not built:** inbox and email actions, directions, calling, maps, messaging the care team, record upload, footer pages.

**Open questions:**
- Fill the placeholders above on the canvas, then re-publish.
- The screens show NVA branding ("NVA Pet Care", "© 2026 National Veterinary Associates"), carried over from the artboards. Confirm that's intended.
- nva-review hasn't been run on these artboards.
