#!/usr/bin/env node
// Repo checks run in CI and by the publish skill. Exit 1 on errors.
// Every flow folder has flow.tsx, source.json and HANDOFF.md; screen ids in flow.tsx match source.json;
// journey links point at flows that exist (a missing target is a warning: the exit falls back).
import fs from "node:fs"
import path from "node:path"

const root = path.resolve("src/flows")
const errors = [], warnings = []
const slugs = fs.existsSync(root) ? fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory()) : []

for (const slug of slugs) {
  const dir = path.join(root, slug)
  for (const f of ["flow.tsx", "source.json", "HANDOFF.md"]) if (!fs.existsSync(path.join(dir, f))) errors.push(`${slug}: missing ${f}`)
  if (!fs.existsSync(path.join(dir, "flow.tsx")) || !fs.existsSync(path.join(dir, "source.json"))) continue
  const tsx = fs.readFileSync(path.join(dir, "flow.tsx"), "utf8")
  if (!tsx.includes(`slug: "${slug}"`)) errors.push(`${slug}: flow.tsx slug doesn't match its folder`)
  const ids = [...tsx.matchAll(/id: "([^"]+)"/g)].map((m) => m[1])
  const src = JSON.parse(fs.readFileSync(path.join(dir, "source.json"), "utf8"))
  for (const id of ids) if (!src.artboards?.[id]) errors.push(`${slug}: screen ${id} has no artboard checksum in source.json`)
  for (const id of Object.keys(src.artboards || {})) if (!ids.includes(id)) errors.push(`${slug}: source.json lists ${id} but flow.tsx has no such screen`)
  for (const a of src.missingAssets || []) warnings.push(`${slug}: asset still to add: ${a.file}`)
  for (const m of tsx.matchAll(/from "\.\.\/([^/"]+)\//g)) errors.push(`${slug}: imports from another flow (${m[1]}); flows must stay self-contained`)
}

const journey = fs.readFileSync("src/app/journey.ts", "utf8")
const start = (journey.match(/start: "([^"]+)"/) || [])[1]
if (!slugs.includes(start)) errors.push(`journey start "${start}" is not a flow`)
for (const m of journey.matchAll(/"([a-z0-9-]+):([a-z0-9-]+)": "([a-z0-9-]+)"/g)) {
  if (!slugs.includes(m[1])) warnings.push(`journey: ${m[1]} isn't published yet`)
  if (!slugs.includes(m[3])) warnings.push(`journey: ${m[1]}:${m[2]} -> ${m[3]} isn't published yet (falls back inside ${m[1]})`)
}

warnings.forEach((w) => console.log("warn:", w))
errors.forEach((e) => console.log("ERROR:", e))
console.log(`${slugs.length} flow(s) · ${errors.length} error(s) · ${warnings.length} warning(s)`)
process.exit(errors.length ? 1 : 0)
