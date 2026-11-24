#!/usr/bin/env python3
"""Static checks for the prototype repo. Exits non-zero on problems.
  - every href/src in every HTML file resolves to a file in the repo (or is #, http(s), mailto, tel)
  - every flow.json lists screens whose files exist
  - flow.json missingAssets are reported as warnings, not errors
Usage: python3 tools/check.py [repo-root]
"""
import json
import pathlib
import re
import sys
from urllib.parse import urlparse

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
errors, warnings = [], []
ref = re.compile(r'''(?:href|src)\s*=\s*["']([^"'{}]+)["']''')

for page in root.rglob("*.html"):
    if ".git" in page.parts:
        continue
    for target in ref.findall(page.read_text(errors="ignore")):
        u = urlparse(target)
        if u.scheme in ("http", "https", "mailto", "tel", "data", "javascript") or target.startswith("#"):
            continue
        path = (page.parent / u.path).resolve()
        if not path.exists():
            rel = page.relative_to(root)
            msg = f"{rel}: '{target}' not found"
            optional = any(path == (f.parent / a["file"]).resolve()
                           for f in root.glob("flows/*/flow.json")
                           for a in json.loads(f.read_text()).get("missingAssets", []))
            (warnings if optional else errors).append(msg + (" (listed as a missing asset)" if optional else ""))

for f in root.glob("flows/*/flow.json"):
    data = json.loads(f.read_text())
    for s in data.get("screens", []):
        if not (f.parent / s["file"]).exists():
            errors.append(f"{f.relative_to(root)}: screen file '{s['file']}' missing")
    if not (f.parent / "HANDOFF.md").exists():
        warnings.append(f"{f.parent.relative_to(root)}: no HANDOFF.md")

for w in warnings:
    print("warn:", w)
for e in errors:
    print("ERROR:", e)
print(f"{len(errors)} error(s), {len(warnings)} warning(s)")
sys.exit(1 if errors else 0)
