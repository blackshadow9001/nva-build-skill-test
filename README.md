# Waffles 2.0 prototype

One click-through app built from the Claude Design canvas, the way the real product will feel: it opens at sign-in and continues through the flows the journey links together.

React + TypeScript + Vite · Tailwind CSS v4 · shadcn/ui on Base UI (the same library Syrup uses) · React Router.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
npm run check     # repo checks (flows, checksums, journey)
```

## Flows

| Flow | Status | Route | Screens | Handoff |
|---|---|---|---|---|
| Sample · Login: Lucy signs in and lands on her home | ready for build | `/login-sample` (start) | 2 | [notes](src/flows/login-sample/HANDOFF.md) |
| Flow 1e · Photo-first intake: Waffles' photo fills in her profile | in review | `/flow-1e-photo-first` | 10 | [notes](src/flows/flow-1e-photo-first/HANDOFF.md) |
| Flow 2 · First Visit Prep: getting ready for the appointment | draft | `/flow-2-first-visit-prep` | 2 | [notes](src/flows/flow-2-first-visit-prep/HANDOFF.md) |

Journey: sign-in → Flow 1e. Flow 2 isn't linked yet; open it from the screen picker.

## Reviewing

- The app starts at `/`, which goes to the journey's first screen (sign-in).
- **Jump to any screen:** press Ctrl/⌘ + K, or add `?screens` to any URL. Hidden from the app itself; includes "Restart the journey".
- Canvas tweaks are URL options, listed in each flow's `HANDOFF.md` (e.g. `/login-sample?entry=returning`).

## How it's organised

```
src/
  app/                      app shell: routing, journey, screen picker, flow helpers
    journey.ts              which flow the app starts on, and how flows hand over to each other
  components/ui/            shadcn/ui components (Base UI), installed with the shadcn CLI or tools/shadcn-sync.mjs
  styles/syrup-tokens.css   Syrup tokens copied from the canvas (don't edit by hand)
  flows/<flow>/             one flow per folder, self-contained
    flow.tsx                screens, routes, exits (registers itself; no central list)
    screens/*.tsx           one component per canvas artboard
    source.json             canvas source, artboard checksums, tweaks, missing assets
    HANDOFF.md              notes for engineering
```

- Flows never import from each other. Publishing or updating one flow only changes its own folder.
- Shared pieces (`components/ui`, `styles/syrup-tokens.css`) change in their own PR when Syrup changes.
- `journey.ts` is the one file that joins flows; changes to it go in small, separate PRs.

## Hosting

- **Netlify:** `netlify.toml` builds with `npm run build` and publishes `dist`. Every pull request gets a Deploy Preview.
- **GitHub Pages (optional):** build with `BASE_PATH=/<repo>/`; `404.html` is generated so deep links work.
