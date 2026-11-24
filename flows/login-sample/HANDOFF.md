# Sample · Login — handoff notes

**Status:** sample · **Device:** mobile · **Design system:** Syrup (shad) tokens, rewritten as plain CSS in `styles.css`
**Source:** sandbox canvas, page "login (sample)", artboards LG01–LG02 (checksums in `flow.json`)

## Screens

| # | Screen | File | What happens |
|---|---|---|---|
| LG01 | Sign in | `index.html` | New visitor by default; `?entry=returning` shows "Welcome back, Lucy" with email remembered. Validates email and password (8+ characters). Sign in / Apple / Google simulate a request, then go to Home. |
| LG02 | Home, signed in | `home.html` | Greeting by time of day, next visit card, "Add to calendar" downloads an .ics file, bottom tabs, sign out returns to the returning-user state. |

## Tweaks → URL

| Canvas tweak | URL |
|---|---|
| Returning user: Returning / New (default New) | `index.html?entry=returning` |

## Swap points for engineering

- `app.js` → `form submit`: replace the `setTimeout` with your auth request.
- Social sign-in buttons: replace the simulated redirect.

## Not built

Forgot password, create account, reschedule, notifications, other tabs.
