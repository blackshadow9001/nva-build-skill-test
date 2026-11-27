/* 2.2 · First Visit Prep, in the portal. Checklist, temperament, open tips and notes are kept (see ../state.ts). */
import { useState } from "react"
import { Link } from "react-router"
import {
  ChevronLeft, Clock, ExternalLink, MapPin, MessageCircle, Minus, Navigation, Phone, Plus, SquareParking,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFlowState, useNotBuilt, useToast } from "@/app/flow-kit"
import { BRING, DEFAULTS, SLUG, TEAM, type Temper } from "../state"
import { ClinicMap } from "./ClinicMap"

const TIPS = [
  {
    value: "anxious",
    title: "If Waffles gets anxious",
    items: [
      "Practise short car rides in the days before the visit.",
      "Bring a blanket or toy that smells like home.",
      "Skip a big meal beforehand so treats work as rewards.",
      "Ask if you can wait in the car until your room is ready.",
    ],
  },
  {
    value: "reactive",
    title: "If Waffles is aggressive or reactive",
    items: [
      "Let us know ahead so we can plan a quieter entrance or room.",
      "Keep a short, non-retractable leash on arrival.",
      "If Waffles is muzzle-trained, bring the muzzle.",
      "Call the front desk from the parking lot when you arrive.",
    ],
  },
]

const FOOTER = [
  ["Privacy", "Privacy isn't part of this prototype yet."],
  ["Terms", "Terms aren't part of this prototype yet."],
  ["Accessibility", "Accessibility isn't part of this prototype yet."],
  ["Contact us", "Contact us isn't part of this prototype yet."],
]

const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

export default function Guide() {
  const toast = useToast()
  const notBuilt = useNotBuilt()
  const [state, patch] = useFlowState(SLUG, DEFAULTS)
  const [zoom, setZoom] = useState(1)

  const done = BRING.filter((b) => state.bring[b.id]).length
  const pct = Math.round((done / BRING.length) * 100)

  function pickTemper(v: Temper) {
    const open = (v === "anxious" || v === "reactive") && !state.open.includes(v) ? [...state.open, v] : state.open
    patch({ temper: v, open })
  }

  return (
    <div className="flex grow flex-col leading-[1.6]">
      <header className="flex items-center justify-between border-b py-1.5 pr-5 pl-2">
        <Button variant="ghost" size="icon" className="size-11" aria-label="Back to email" render={<Link to="/flow-2-first-visit-prep" />} nativeButton={false}>
          <ChevronLeft className="size-5" />
        </Button>
        <span className="text-base font-bold tracking-[-0.01em]">NVA Pet Care</span>
        <Avatar size="sm" aria-label="Lucy"><AvatarFallback className="font-medium text-foreground">L</AvatarFallback></Avatar>
      </header>

      <main className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <Badge variant="secondary">In 5 days</Badge>
          <h1 className="h2 tracking-[-0.02em]">First Visit Prep</h1>
          <p className="text-[15px] leading-[22px] text-pretty text-muted-foreground">Everything you need for Waffles' visit on Tue, Nov 10 at 9:30 AM.</p>
        </div>

        <Progress value={pct} className="gap-x-3 gap-y-2 leading-normal [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-primary/20">
          <ProgressLabel>Your prep</ProgressLabel>
          <ProgressValue className="text-[13px]">{() => `${done} of ${BRING.length} done`}</ProgressValue>
        </Progress>

        <nav aria-label="Jump to a section" className="sticky top-0 z-5 -mx-5 flex items-center gap-2 border-b bg-background px-5 leading-normal">
          <span className="text-xs font-medium whitespace-nowrap text-muted-foreground">Jump to</span>
          {[["visit-info", "Visit info"], ["pet-prep", "Pet prep"], ["care-team", "Care team"]].map(([id, label]) => (
            <Button key={id} variant="link" size="sm" className="h-11 px-1" onClick={() => jumpTo(id)}>{label}</Button>
          ))}
        </nav>

        <h2 id="visit-info" className="h4 scroll-mt-16">Visit info</h2>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="font-semibold">Clinic info</CardTitle>
            <CardDescription>Maple Grove Animal Hospital</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            <ClinicMap zoom={zoom}>
              <span className="absolute top-2 right-2 flex flex-col gap-1">
                <Button variant="outline" size="icon-sm" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(z + 0.25, 2))}><Plus className="size-3.5" /></Button>
                <Button variant="outline" size="icon-sm" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}><Minus className="size-3.5" /></Button>
              </span>
              <Button variant="outline" size="xs" className="absolute right-2 bottom-2" onClick={() => toast("Maps open once the clinic address is added.")}>
                <ExternalLink data-icon="inline-start" />Open in Maps
              </Button>
            </ClinicMap>
            <span className="flex min-h-[26px] items-center gap-2.5"><MapPin className="size-4 shrink-0" aria-hidden />[CLINIC ADDRESS]</span>
            <span className="flex min-h-[26px] items-center gap-2.5"><Clock className="size-4 shrink-0" aria-hidden />Please arrive 10 minutes early to check in</span>
            <span className="flex min-h-[26px] items-center gap-2.5"><Phone className="size-4 shrink-0" aria-hidden />[CLINIC PHONE]</span>
          </CardContent>
          <CardFooter className="gap-2 *:flex-1">
            <Button className="h-9" onClick={() => toast("Directions open once the clinic address is added.")}><Navigation data-icon="inline-start" className="size-3.5" />Get directions</Button>
            <Button variant="outline" className="h-9" onClick={() => toast("Calling works once the clinic phone number is added.")}><Phone data-icon="inline-start" className="size-3.5" />Call clinic</Button>
          </CardFooter>
        </Card>

        <Alert>
          <SquareParking />
          <AlertTitle>Parking</AlertTitle>
          <AlertDescription>[PARKING DETAILS, e.g. free lot behind the building]. Keep Waffles leashed from car to door.</AlertDescription>
        </Alert>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="font-semibold">What to bring</CardTitle>
            <CardDescription>Check things off as you pack</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {BRING.map((b) => (
              <div key={b.id} className="flex min-h-11 items-start gap-2.5">
                <Checkbox
                  id={b.id}
                  className="mt-0.5"
                  aria-describedby={`${b.id}-note`}
                  checked={!!state.bring[b.id]}
                  onCheckedChange={(v) => patch({ bring: { ...state.bring, [b.id]: v } })}
                />
                <span className="flex flex-col gap-px">
                  <label htmlFor={b.id} className="cursor-pointer text-sm leading-5 font-medium">{b.label}</label>
                  <span id={`${b.id}-note`} className="text-[13px] leading-[18px] text-muted-foreground">{b.note}</span>
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Separator />

        <section id="pet-prep" aria-labelledby="pet-prep-title" className="flex scroll-mt-16 flex-col gap-3">
          <h2 id="pet-prep-title" className="h4">Pet prep</h2>
          <p id="temper-q" className="text-sm text-muted-foreground">How does Waffles usually handle new places and people?</p>
          <ToggleGroup
            aria-labelledby="temper-q"
            variant="outline"
            spacing={0}
            className="w-full"
            value={[state.temper]}
            onValueChange={(v) => { if (v[0]) pickTemper(v[0] as Temper) }}
          >
            {(["calm", "anxious", "reactive"] as const).map((t) => (
              <ToggleGroupItem key={t} value={t} className="h-11 flex-1 capitalize aria-pressed:bg-accent aria-pressed:text-accent-foreground">{t}</ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Accordion multiple value={state.open} onValueChange={(v) => patch({ open: v as string[] })} className="rounded-lg border px-3.5">
            {TIPS.map((tip) => (
              <AccordionItem key={tip.value} value={tip.value}>
                <AccordionTrigger className="min-h-12 items-center py-3.5 hover:underline-offset-4">{tip.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex list-disc flex-col gap-1.5 pl-[18px] text-sm leading-5">
                    {tip.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Field>
            <FieldLabel htmlFor="notes">Anything else we should know?</FieldLabel>
            <Textarea
              id="notes"
              aria-describedby="notes-desc"
              placeholder="e.g. Nervous around other dogs, loves peanut butter"
              value={state.notes}
              onChange={(e) => patch({ notes: e.target.value })}
            />
            <FieldDescription id="notes-desc">Shared with Waffles' care team before the visit.</FieldDescription>
          </Field>
        </section>

        <Separator />

        <section id="care-team" aria-labelledby="care-team-title" className="flex scroll-mt-16 flex-col gap-3">
          <h2 id="care-team-title" className="h4">Care team</h2>
          <p className="text-sm text-muted-foreground">The people you'll meet on Tuesday.</p>
          <ItemGroup className="gap-0 rounded-lg border">
            {TEAM.map((t, i) => (
              <Item key={t.initials} role="listitem" className={i ? "rounded-none border-t-border" : undefined}>
                <ItemMedia><Avatar aria-hidden><AvatarFallback className="text-xs font-medium text-foreground">{t.initials}</AvatarFallback></Avatar></ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{t.name}</ItemTitle>
                  <ItemDescription>{t.role}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
          <Button size="lg" className="h-11 w-full" onClick={() => notBuilt("Messaging the care team")}>
            <MessageCircle data-icon="inline-start" />Message the care team
          </Button>
        </section>
      </main>

      <footer className="mt-auto flex flex-col gap-2.5 bg-muted px-5 pt-4 pb-5 text-xs leading-4 text-muted-foreground">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4">
          {FOOTER.map(([label, msg]) => (
            <button key={label} type="button" className="inline-flex min-h-11 items-center underline hover:text-foreground" onClick={() => toast(msg)}>{label}</button>
          ))}
        </nav>
        <span>© 2026 National Veterinary Associates</span>
      </footer>
    </div>
  )
}
