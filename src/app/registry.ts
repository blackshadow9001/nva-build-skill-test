import type { FlowDef } from "./types"

// Every flow registers itself by living in src/flows/<slug>/flow.tsx. No central list to edit,
// so two flows published at the same time never conflict here.
const modules = import.meta.glob<{ default: FlowDef }>("../flows/*/flow.tsx", { eager: true })

export const flows: FlowDef[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

export const flowBySlug = (slug: string) => flows.find((f) => f.slug === slug)

export const screenUrl = (slug: string, path = "") => `/${slug}${path ? `/${path}` : ""}`
