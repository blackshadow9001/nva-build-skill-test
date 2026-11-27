# Sample · Login — handoff notes

**Status:** ready for build · **Device:** mobile · **Route:** `/login-sample` (the app's start screen)
**Source:** sandbox canvas, page "login (sample)", artboards LG01–LG02 (checksums in `source.json`)
**Components:** shadcn/ui (Base UI) from `src/components/ui`: Button, Field, Input, Avatar, Separator, Card, Badge, Alert.

| # | Screen | Route | What happens |
|---|---|---|---|
| LG01 | Sign in | `/login-sample` | New visitor by default; `?entry=returning` shows "Welcome back, Lucy". Validates email and password (8+ characters). Sign in / Apple / Google take the `signed-in` exit. |
| LG02 | Home, signed in | `/login-sample/home` | Greeting by time of day, next visit card, "Add to calendar" downloads an .ics, sign out returns to the returning state. |

**Journey:** the `signed-in` exit continues to whichever flow `src/app/journey.ts` links it to (Flow 1e). With no link it lands on LG02.

**Swap points:** `SignIn.tsx` → `submit()` and `sso()` timeouts become real auth calls.

**Not built:** forgot password (shows "We'll email you a link to reset your password."), create account, reschedule, notifications, other tabs (show a toast).

**Open question:** LG01 now says "ACME Pet Care" (canvas update, 2026-11-26), but LG02 Home on the canvas still says "NVA Pet Care", so the brand changes between the two screens. Update LG02 on the canvas, then re-publish.
