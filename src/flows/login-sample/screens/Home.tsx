/* LG02 · Home, signed in. */
import { useState } from "react"
import { useNavigate } from "react-router"
import { Bell, Calendar, ChevronRight, Dog, House, LogOut, MapPin, PawPrint, Sparkles, Syringe, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotBuilt, useToast } from "@/app/flow-kit"
import { AppHeader } from "./AppHeader"

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
}

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Waffles prototype//EN", "BEGIN:VEVENT",
    "UID:waffles-checkup@prototype", "DTSTART:20261112T093000", "DTEND:20261112T101500",
    "SUMMARY:Waffles: annual check-up with Dr. Patel", "LOCATION:Vaughan Animal Hospital",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n")
  const a = document.createElement("a")
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }))
  a.download = "waffles-check-up.ics"
  a.click()
  URL.revokeObjectURL(a.href)
}

const tabs = [
  { id: "home", label: "Home", Icon: House },
  { id: "pets", label: "Pets", Icon: PawPrint },
  { id: "visits", label: "Visits", Icon: Calendar },
  { id: "account", label: "Account", Icon: User },
]

export default function Home() {
  const navigate = useNavigate()
  const toast = useToast()
  const notBuilt = useNotBuilt()
  const [tab, setTab] = useState("home")

  return (
    <>
      <AppHeader
        actions={
          <>
            <Button variant="ghost" size="icon" className="size-11" aria-label="Notifications" onClick={() => toast("No new notifications.")}>
              <Bell />
            </Button>
            <Button variant="ghost" size="icon" className="size-11" aria-label="Sign out" onClick={() => navigate("/login-sample?entry=returning")}>
              <LogOut />
            </Button>
          </>
        }
      />
      <main className="flex grow flex-col gap-5 px-5 py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="h3 text-foreground">{greeting()}, Lucy</h1>
            <p className="text-sm text-muted-foreground">Here's what's coming up for Waffles.</p>
          </div>
          <Badge variant="secondary"><Sparkles data-icon="inline-start" />Member</Badge>
        </div>

        <Card size="sm" className="cursor-pointer transition-colors hover:bg-accent" onClick={() => notBuilt("Waffles' profile")}>
          <CardContent className="flex items-center gap-3.5">
            <div role="img" aria-label="Photo: Waffles" className="flex size-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-[calc(var(--radius)*1.4)] bg-muted text-[10px] text-muted-foreground">
              <Dog className="size-[22px]" aria-hidden />Photo
            </div>
            <div className="flex grow flex-col gap-0.5">
              <span className="text-base font-semibold text-foreground">Waffles</span>
              <span className="text-[13px] text-muted-foreground">Golden retriever · 4 years · Adult</span>
            </div>
            <ChevronRight className="size-[18px] text-muted-foreground" aria-hidden />
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Next visit</CardTitle>
            <CardDescription>Annual check-up with Dr. Patel</CardDescription>
            <CardAction><Badge variant="outline">Booked</Badge></CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5 text-sm text-foreground">
            <span className="flex items-center gap-2"><Calendar className="size-[18px] text-muted-foreground" aria-hidden />Thu, Nov 12 · 9:30 AM</span>
            <span className="flex items-center gap-2"><MapPin className="size-[18px] text-muted-foreground" aria-hidden />Vaughan Animal Hospital</span>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => notBuilt("Rescheduling")}>Reschedule</Button>
            <Button variant="ghost" size="sm" onClick={() => { downloadIcs(); toast("Calendar file downloaded.") }}>Add to calendar</Button>
          </CardFooter>
        </Card>

        <Alert>
          <Syringe />
          <AlertTitle>Rabies booster due in 2 weeks</AlertTitle>
          <AlertDescription>Book it with the check-up to save a trip.</AlertDescription>
        </Alert>
      </main>
      <nav aria-label="App" className="sticky bottom-0 grid grid-cols-4 border-t bg-background px-1 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom))]">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-current={tab === id ? "page" : undefined}
            onClick={() => { setTab(id); if (id !== "home") notBuilt(label) }}
            className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-[11px] text-muted-foreground aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
          >
            <Icon className="size-[22px]" aria-hidden />{label}
          </button>
        ))}
      </nav>
    </>
  )
}
