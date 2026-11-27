# Flow 1e · Photo-first intake — handoff notes

**Status:** in review · **Device:** mobile · **Route:** `/flow-1e-photo-first`
**Source:** sandbox canvas, page "Flow 1 · Vet Finder", artboards IP00–IP09 (checksums in `source.json`)
**Design system:** Artevis palette (custom, not Syrup). The canvas styles are in `flow-1e.css`, scoped under `.f1e` (keyframes prefixed `f1e-`) so they can't affect other flows. Shared pieces (state, NVA mark, hero waves, Waffles' illustrated avatar, choice pills, profile card) are in `kit.tsx`.
**Persona / timepoint:** Lucy Brooks, first-time pet parent · Waffles, female Golden Retriever, puppy (about 10 weeks)

| # | Screen | Route | What happens |
|---|---|---|---|
| IP00 | Homepage, Get Started | `/flow-1e-photo-first` | Entry. Starting here clears saved answers. "I already have an account" shows a toast. |
| IP01 | Meet your pet | `…/meet` | Pick one of 3 photos, or take / choose one (opens the device picker; previews in tile 1). |
| IP02 | AI reads the photo | `…/reading` | Scan animation; detected fields appear one by one; the button appears after ~3 s. |
| IP03 | Confirm or correct | `…/confirm` | Edit the name; expand a row to correct species, breed, age, weight, location. |
| IP04 | Avatar reveal | `…/avatar` | Pick a collar colour; "Try another look" cycles it. |
| IP05 | What makes care easy | `…/easy` | Multi-select + calendar switch. Step 1 of 3. |
| IP06 | Care costs | `…/costs` | Single choice; the tip card changes per choice. Skippable. Step 2 of 3. |
| IP07 | What would help | `…/help` | Multi-select + free text / voice (Web Speech API where supported). Step 3 of 3. |
| IP08 | Building her plan | `…/building` | Automated steps animate in; the button appears after ~3 s. |
| IP09 | Waffles' home | `…/home` | The held visit can be confirmed in one tap; greeting by time of day. |

**Journey:** Sample · Login's `signed-in` exit continues here (`src/app/journey.ts`).

**State (what a real build needs to persist):** `sessionStorage["proto:flow-1e-photo-first"]` (see `DEFAULTS` in `kit.tsx`): `name, species, breed, age, weight, place, collar, easy[], calendar, cost, help[], note, confirmed, photo`. Later screens read these (profile card, chips, home hero). A photo picked on IP01 previews for that visit only and isn't saved.

**Data on screen:**
- From the reference doc (fixed): Lucy, Waffles, Golden Retriever, puppy timepoint, Seattle area.
- Made up for this flow: Maple Grove Animal Hospital, Dr. Ruiz, Tue Nov 17 6:00 PM, prices in the costs tip, puppy class Dec 5.
- Clinical copy (the lepto line on IP09) needs `[vet-approved content]` before it ships.

**Not built (shows a toast):** sign-in, site menu, other visit times, rescheduling, chat ("Ask about Waffles"), notifications, account, NVA service tiles, birthday and ZIP inputs.

**Assets still to add:** `assets/hero.jpg` — the IP00 homepage photo. Download it from the canvas and save it in this flow's `assets/` folder; it's picked up automatically. An illustrated fallback shows until then.

**Open questions:**
- Avatar: the newer canvas version uses generated avatar images with a style tweak; this export uses the illustrated SVG avatar from the sandbox version.
- Review findings from nva-review (shared canvas, Nov 20) still open: brand name, plan naming, status colours, artboard sizes on IP08–IP10.
