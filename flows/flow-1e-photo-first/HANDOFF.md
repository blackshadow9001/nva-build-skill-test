# Flow 1e · Photo-first intake — handoff notes

**Status:** in review · **Device:** mobile (390 wide, fills a phone; centred 480px column on larger screens)
**Source:** Claude Design sandbox canvas, page "Flow 1 · Vet Finder", artboards IP00–IP09 (checksums in `flow.json`)
**Persona / timepoint:** Lucy Brooks, first-time pet parent · Waffles, female Golden Retriever, puppy (about 10 weeks)

## Screens

| # | Screen | File | What happens |
|---|---|---|---|
| IP00 | Homepage, Get Started | `index.html` | Entry. Starting here clears saved answers. |
| IP01 | Meet your pet | `ip01-meet.html` | Pick one of 3 photos, or take/choose one (opens the device picker; previews in tile 1). |
| IP02 | AI reads the photo | `ip02-reading.html` | Scan animation; detected fields appear one by one; button appears after ~3 s. |
| IP03 | Confirm or correct | `ip03-confirm.html` | Edit name; expand a row to correct species, breed, age, weight, location. |
| IP04 | Avatar reveal | `ip04-avatar.html` | Pick collar colour; "Try another look" cycles it. |
| IP05 | What makes care easy | `ip05-easy.html` | Multi-select + calendar switch. Step 1 of 3. |
| IP06 | Care costs | `ip06-costs.html` | Single choice; tip card changes per choice. Skippable. Step 2 of 3. |
| IP07 | What would help | `ip07-help.html` | Multi-select + free text / voice (Web Speech API where supported). Step 3 of 3. |
| IP08 | Building her plan | `ip08-building.html` | Automated steps animate in; button appears after ~3 s. |
| IP09 | Waffles' home | `ip09-home.html` | Held visit can be confirmed in one tap; greeting by time of day. |

## State (what a real build needs to persist)

Kept in `sessionStorage` under `nva-flow-1e` (see `app.js`): `name, species, breed, age, weight, place, collar, easy[], calendar, cost, help[], note, confirmed, photo`. Later screens read these (profile card, chips, home hero).

## Data on screen

- From the reference doc (fixed): Lucy, Waffles, Golden Retriever, puppy timepoint, Seattle area.
- Made up for this flow: Maple Grove Animal Hospital, Dr. Ruiz, Tue Nov 17 6:00 PM, prices in the costs tip, puppy class Dec 5.
- Clinical copy (lepto line on IP09) needs `[vet-approved content]` before it ships.

## Not built (shows a message instead)

Sign-in, site menu, other visit times, rescheduling, chat ("Ask about Waffles"), notifications, account, NVA service tiles.

## Assets still to add

- `assets/hero.jpg` — the IP00 homepage photo. Download it from the canvas and save it here. An illustrated fallback shows until then.

## Open questions

- Avatar: the newer canvas version uses generated avatar images with a style tweak; this export uses the illustrated SVG avatar from the sandbox version.
- Review findings from nva-review (shared canvas, Nov 20) still open: brand name, plan naming, status colours, artboard sizes on IP08–IP10.
