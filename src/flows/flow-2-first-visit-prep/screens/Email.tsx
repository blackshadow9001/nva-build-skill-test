/* 2.1 · Confirmation email, as read in webmail. Opening it resets the guide's saved state. */
import { useEffect } from "react"
import { Link } from "react-router"
import { Archive, ArrowRight, CalendarDays, ChevronLeft, Ellipsis, Stethoscope } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useNotBuilt } from "@/app/flow-kit"
import { clearGuideState } from "../state"

export default function Email() {
  const notBuilt = useNotBuilt()
  useEffect(() => clearGuideState(), [])

  return (
    <div className="flex grow flex-col bg-muted">
      <header className="flex min-h-14 items-center justify-between border-b bg-background pr-2 pl-1">
        <Button variant="ghost" className="h-11 gap-1 pr-3 pl-2" onClick={() => notBuilt("The inbox")}>
          <ChevronLeft className="size-5" aria-hidden />Inbox
        </Button>
        <span className="flex gap-1">
          <Button variant="ghost" size="icon" className="size-11" aria-label="Archive" onClick={() => notBuilt("Archive")}><Archive /></Button>
          <Button variant="ghost" size="icon" className="size-11" aria-label="More" onClick={() => notBuilt("More actions")}><Ellipsis /></Button>
        </span>
      </header>

      <div className="flex flex-col gap-3 border-b bg-background p-4">
        <span className="text-lg font-semibold">Waffles' First Visit Prep is ready</span>
        <div className="flex items-center gap-2.5">
          <Avatar aria-hidden><AvatarFallback className="text-xs font-medium text-foreground">NVA</AvatarFallback></Avatar>
          <span className="flex grow flex-col">
            <span className="text-sm font-semibold">Maple Grove Animal Hospital</span>
            <span className="text-xs text-muted-foreground">to Lucy · 9:02 AM</span>
          </span>
        </div>
      </div>

      <main className="grow px-4 py-5">
        <div className="flex flex-col gap-[18px] rounded-xl border bg-card px-5 py-6">
          <span className="text-sm font-bold tracking-[-0.01em]">NVA Pet Care</span>
          <div className="flex flex-col gap-2">
            <h1 className="h3 tracking-[-0.01em] text-balance">Hi Lucy, we can't wait to meet Waffles</h1>
            <p className="text-[15px] leading-6 text-pretty text-muted-foreground">
              Your First Visit Prep list is ready. It covers how to get here, what to bring, and how to help Waffles feel at ease.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg bg-muted p-3.5 text-sm">
            <span className="flex items-center gap-2 font-semibold"><CalendarDays className="size-4" aria-hidden />Tue, Nov 10 · 9:30 AM</span>
            <span className="flex items-center gap-2"><Stethoscope className="size-4" aria-hidden />First visit with Dr. Priya Shah</span>
          </div>
          <Button size="lg" className="h-11 w-full" render={<Link to="/flow-2-first-visit-prep/guide" />} nativeButton={false}>
            Open my prep guide<ArrowRight data-icon="inline-end" />
          </Button>
          <p className="text-xs text-pretty text-muted-foreground">Need to reschedule? Reply to this email or call [CLINIC PHONE].</p>
        </div>
      </main>
    </div>
  )
}
