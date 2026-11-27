/* Hidden screen picker for reviews and QA. Opens with Ctrl/⌘ + K, or ?screens in the URL.
   It is not visible in the app itself: the prototype always starts at the journey's first screen. */
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { flows, screenUrl } from "./registry"
import { journey } from "./journey"
import { resetAllFlowState } from "./flow-kit"

export function ScreenPicker() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (new URLSearchParams(location.search).has("screens")) setOpen(true)
  }, [location.search])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (url: string) => {
    setOpen(false)
    navigate(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Jump to a screen</DialogTitle>
          <DialogDescription>For reviews only. The prototype itself starts at sign-in.</DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          onClick={() => {
            resetAllFlowState()
            go(screenUrl(journey.start))
          }}
        >
          Restart the journey
        </Button>
        <div className="flex flex-col gap-5">
          {flows.map((f) => (
            <section key={f.slug} className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground">
                {f.title} <span className="font-normal text-muted-foreground">· {f.status}</span>
              </h3>
              {f.screens.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(screenUrl(f.slug, s.path))}
                  className="flex min-h-11 items-center gap-3 rounded-md px-2 text-left text-sm text-foreground hover:bg-muted"
                >
                  <span className="w-12 shrink-0 text-muted-foreground tabular-nums">{s.id}</span>
                  {s.title}
                </button>
              ))}
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
