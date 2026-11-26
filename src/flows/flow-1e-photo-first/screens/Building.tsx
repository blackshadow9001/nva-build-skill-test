/* IP08 · Building her plan. Automated steps animate in; the button appears after ~3 s. */
import { useEffect, useRef, useState } from "react"
import { ArrowRight, BellRing, Bone, CalendarCheck, CalendarHeart, CalendarRange, CircleCheck, Hospital, House, Syringe, type LucideIcon } from "lucide-react"
import { Cta, HeroBg, Icon, Mark, possessive, Screen, to, useF1e } from "../kit"

const STEPS: [LucideIcon, string, string][] = [
  [CalendarRange, "Puppy year mapped", "4 milestones, starting with 2nd shots on Nov 23"],
  [Hospital, "Held a time at Maple Grove", "Tue 6:00 PM · 1.2 mi · fits your calendar"],
  [CalendarCheck, "Added to your calendar", "We'll release the hold if you don't confirm"],
  [House, "NVA Pet Resort Fremont", "Puppy daycare intro, once shots are done"],
  [BellRing, "Reminders on", "Flea and tick season starts in March here"],
]

export default function Building() {
  const [s] = useF1e()
  const [ready, setReady] = useState(false)
  const cta = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3200)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => { if (ready) cta.current?.querySelector("a")?.focus({ preventScroll: true }) }, [ready])

  return (
    <Screen>
      <section className="hero forest on-dark" style={{ height: 294 }}>
        <HeroBg stroke="rgba(215,243,106,.2)" />
        <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingTop: "calc(26px + env(safe-area-inset-top))" }}>
          <div style={{ position: "relative", width: 230, height: 230 }}>
            <span aria-hidden style={{ position: "absolute", inset: 14, borderRadius: 999, border: "1px dashed rgba(255,255,255,.28)" }} />
            <div className="orbit" aria-hidden>
              <span style={{ left: "calc(50% - 20px)", top: -6 }}><Icon icon={Syringe} /></span>
              <span style={{ left: "calc(100% - 34px)", top: "calc(50% - 20px)" }}><Icon icon={Hospital} /></span>
              <span style={{ left: "calc(50% - 20px)", top: "calc(100% - 34px)" }}><Icon icon={CalendarHeart} /></span>
              <span style={{ left: -6, top: "calc(50% - 20px)" }}><Icon icon={Bone} /></span>
            </div>
            <span className="glass float" style={{ position: "absolute", left: "50%", top: "50%", width: 120, height: 120, margin: -60, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)" }}><Mark w={40} /></span>
          </div>
        </div>
      </section>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-6">
            <span className="eyebrow">Almost there</span>
            <h1 className="title-md">Building {possessive(s.name)} world</h1>
            <p className="lede">Using her photo, your answers and your calendar.</p>
          </div>
          <div className="stack gap-8" aria-live="polite">
            {STEPS.map(([I, t, sub], i) => (
              <div key={t} className="step-card in" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
                <span className="tile-icon tile-icon--lg"><Icon icon={I} /></span>
                <span className="kv"><span className="t">{t}</span><span className="s">{sub}</span></span>
                <span className="ok pop" style={{ animationDelay: `${0.8 + i * 0.5}s` }}><Icon icon={CircleCheck} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="foot" ref={cta}>{ready && <Cta to={to("home")} className="pop"><span>Open {possessive(s.name)} home</span><Icon icon={ArrowRight} /></Cta>}</div>
      </section>
    </Screen>
  )
}
