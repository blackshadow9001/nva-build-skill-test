# Flow 2 · First Visit Prep: handoff notes

**Status:** draft · **Device:** mobile (390px design width, centred column up to 480px on larger screens)
**Design system:** Syrup (shad). Canvas tokens copied as-is to `tokens.css`; components rewritten as plain CSS in `flow.css`.
**Source:** sandbox canvas, page "Flow 1 · Vet Finder", Flow 2 row, artboards FVP-Email and FVP-Guide (checksums in `flow.json`).
**Persona / timepoint:** Lucy, 5 days before Waffles' first visit (Tue, Nov 10 · 9:30 AM, Dr. Priya Shah, Maple Grove Animal Hospital).

## Screens

| # | Screen | File | What happens |
|---|---|---|---|
| 2.1 | Confirmation email | `index.html` | The clinic's email as read in webmail. "Open my prep guide" goes to the guide. Inbox, Archive and More show a toast. Opening this screen resets the guide's saved state. |
| 2.2 | First Visit Prep | `fvp-guide.html` | Back arrow returns to the email. The jump bar sticks to the top and scrolls to Visit info / Pet prep / Care team. The "What to bring" checklist updates the "Your prep" progress bar (starts at 2 of 6). Temperament is a single choice (default Anxious); picking Anxious or Reactive opens the matching tips. Tips accordion items open and close independently (Anxious open by default). Notes textarea is kept. Map + / − zoom the illustrated map. Get directions, Call clinic, Open in Maps, Message the care team and footer links show a toast. |

Device chrome from the artboards (status bar, browser toolbar and URL bar) is not ported.

## State kept

`sessionStorage["flow-2-first-visit-prep"]` → `{ bring: {b1..b6: bool}, temper: "calm"|"anxious"|"reactive", open: ["anxious", "reactive"], notes: string }`. Cleared when the email (entry screen) loads.

## Data

All copy and data come from the artboards: visit date and time, vet, clinic name, the six checklist items (two pre-checked), care team, tips. Nothing was made up. Placeholders kept exactly as on the canvas: `[CLINIC PHONE]`, `[CLINIC ADDRESS]`, `[PARKING DETAILS, e.g. free lot behind the building]`, `[VET TECH NAME]`, `[CLIENT CARE NAME]`.

## Tweaks → URL

None on the canvas.

## Swap points for engineering

- `app.js` → `BRING` / `TEAM` arrays: replace with the appointment's prep checklist and the care team from the booking.
- Checklist, temperament and notes: currently session-only; persist to the pet's record and share notes with the care team ("Shared with Waffles' care team before the visit").
- Map: illustrated placeholder; swap for a real map + directions deep link once the address exists.
- Call clinic / reschedule: `tel:` link once the phone number exists.
- "In 5 days" badge and dates are static.

## Not built

Inbox and email actions, directions, calling, maps, messaging the care team, record upload ("Upload them in the portal"), footer pages.

## Assets to add

None. The map is drawn in CSS like on the canvas.

## Open questions

- Fill the placeholders above (phone, address, parking, vet tech and client care names) on the canvas, then re-publish.
- The screen shows NVA branding ("NVA Pet Care", "© 2026 National Veterinary Associates"), carried over from the artboards as-is. Confirm that's intended for this prototype.
- nva-review hasn't been run on these artboards in this session.
