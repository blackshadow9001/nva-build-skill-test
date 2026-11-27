// GitHub Pages has no SPA rewrites: serving index.html as 404.html makes deep links work there too.
import fs from "node:fs"
fs.copyFileSync("dist/index.html", "dist/404.html")
