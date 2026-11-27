#!/usr/bin/env node
/**
 * Install shadcn/ui components (Base UI flavour, the library Syrup uses) into src/components/ui.
 *
 *   node tools/shadcn-sync.mjs button card input field ...
 *
 * Preferred path is the official CLI (`npx shadcn@latest add ...`). This script is the fallback for
 * networks where ui.shadcn.com is blocked but raw.githubusercontent.com is not: it pulls the same
 * source the CLI uses (apps/v4/registry/bases/base/ui/*.tsx) and resolves the style classes
 * (cn-* tokens) from the chosen style sheet (apps/v4/registry/styles/style-<style>.css), which is
 * the transform the CLI performs. Component dependencies (e.g. field -> label, separator) are pulled too.
 *
 * Style: SHADCN_STYLE env (default "vega", shadcn's classic look). Match Syrup's style when known.
 */
import fs from "node:fs";
import path from "node:path";

const RAW = "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry";
const STYLE = process.env.SHADCN_STYLE || "vega";
const OUT = path.resolve("src/components/ui");
const want = process.argv.slice(2);
if (!want.length) {
  console.error("usage: node tools/shadcn-sync.mjs <component> [...]");
  process.exit(1);
}

async function get(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

// Parse ".cn-name { @apply a b c; }" (one level, as in the style sheets) into a map.
function parseStyle(css) {
  const map = new Map();
  const re = /\.(cn-[a-z0-9-]+)\s*\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const applies = [...m[2].matchAll(/@apply\s+([^;]+);/g)].map((a) => a[1].trim());
    if (applies.length) map.set(m[1], applies.join(" "));
  }
  return map;
}

const styleMap = parseStyle(await get(`${RAW}/styles/style-${STYLE}.css`));
fs.mkdirSync(OUT, { recursive: true });

const done = new Set();
const unresolved = new Set();
const npmDeps = new Set(["@base-ui/react", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"]);

async function install(name) {
  if (done.has(name)) return;
  done.add(name);
  let src = await get(`${RAW}/bases/base/ui/${name}.tsx`);
  const deps = [...src.matchAll(/from "@\/registry\/bases\/base\/ui\/([a-z0-9-]+)"/g)].map((m) => m[1]);
  for (const m of src.matchAll(/from "((?:@[a-z0-9-]+\/)?[a-z0-9-]+)[^"]*"/g)) {
    if (!m[1].startsWith("@/") && m[1] !== "react" && m[1] !== "cn") npmDeps.add(m[1]);
  }
  src = src
    .replace(/from "cn"/g, 'from "@/lib/utils"')
    .replace(/@\/registry\/bases\/base\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/bases\/base\/lib\//g, "@/lib/")
    .replace(/@\/registry\/bases\/base\/hooks\//g, "@/hooks/");
  // Icon placeholders -> lucide-react (the icon library Syrup uses), as the CLI does.
  if (src.includes("IconPlaceholder")) {
    const icons = new Set();
    src = src.replace(/<IconPlaceholder([\s\S]*?)\/>/g, (_, attrs) => {
      const name = (attrs.match(/lucide="([A-Za-z0-9]+)"/) || [])[1];
      if (!name) throw new Error(`${name}: icon placeholder without a lucide name`);
      icons.add(name);
      const rest = attrs.replace(/\s*(lucide|tabler|hugeicons|phosphor|remixicon)="[^"]*"/g, "").trim();
      return `<${name}${rest ? " " + rest : ""} />`;
    });
    src = src.replace(/import \{ IconPlaceholder \} from "[^"]+"\n?/, `import { ${[...icons].join(", ")} } from "lucide-react"\n`);
  }
  // Resolve cn-* tokens inside string literals.
  src = src.replace(/(["'`])((?:(?!\1)[^\\]|\\.)*)\1/g, (whole, q, body) => {
    if (!/\bcn-[a-z0-9-]+/.test(body)) return whole;
    const out = body
      .split(/\s+/)
      .map((tok) => {
        if (!/^cn-[a-z0-9-]+$/.test(tok)) return tok;
        if (styleMap.has(tok)) return styleMap.get(tok);
        unresolved.add(tok);
        return "";
      })
      .filter(Boolean)
      .join(" ");
    return q + out + q;
  });
  fs.writeFileSync(path.join(OUT, `${name}.tsx`), src);
  console.log(`  ui/${name}.tsx`);
  for (const d of deps) await install(d);
}

console.log(`shadcn (Base UI, style ${STYLE}) -> src/components/ui`);
for (const n of want) await install(n);

const libDir = path.resolve("src/lib");
fs.mkdirSync(libDir, { recursive: true });
const utils = path.join(libDir, "utils.ts");
if (!fs.existsSync(utils)) {
  fs.writeFileSync(utils, 'import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n');
  console.log("  lib/utils.ts");
}
if (unresolved.size) console.log(`note: ${unresolved.size} marker class(es) have no rule in style-${STYLE} and were dropped: ${[...unresolved].join(", ")}`);
console.log(`npm deps used: ${[...npmDeps].join(" ")}`);
