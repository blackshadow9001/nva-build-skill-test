/**
 * How flows join into one app, like the real product.
 * - start: the flow the app opens on.
 * - links: "<flow>:<exit>" -> the flow it continues into. An exit with no link falls back to
 *   the screen the flow itself names for it (FlowDef.exits).
 * This is the only file that joins flows together; keep edits to it in their own small PRs.
 */
export const journey = {
  start: "login-sample",
  links: {
    "login-sample:signed-in": "flow-1e-photo-first",
  } as Record<string, string>,
}
