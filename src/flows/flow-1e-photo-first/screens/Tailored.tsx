/* IP09 · Waffles' home (tailored). The held visit can be confirmed in one tap; greeting by time of day. */
import { useState } from "react"
import { Bell, CalendarCheck, Camera, CloudRain, GraduationCap, House, Siren, Sprout, Video, type LucideIcon } from "lucide-react"
import { useNotBuilt, useToast } from "@/app/flow-kit"
import { HeroBg, Icon, Mark, petLine, Puppy, Screen, useF1e, Wordmark } from "../kit"

const NVA: [LucideIcon, string, string, string, string][] = [
  [House, "#fde7cf", "#7a3a10", "Pet Resort daycare", "Fremont · puppy intro after shots"],
  [GraduationCap, "#f6defd", "#6b2a5b", "Puppy class", "Saturdays · starts Dec 5"],
  [Siren, "#dff2f0", "#044f59", "24/7 emergency", "Ethos Seattle · 4.1 mi"],
  [Video, "#eef5cf", "#1f4a3a", "Video vet", "Quick questions, any hour"],
]

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
}

export default function Tailored() {
  const toast = useToast()
  const notBuilt = useNotBuilt()
  const [s, patch] = useF1e()
  const [bump, setBump] = useState(0) // replays the card's pop on confirm
  const dim = "rgba(242,245,238,.82)"

  return (
    <Screen>
      <main className="home-main">
        <section className="hero forest on-dark" style={{ padding: "calc(14px + env(safe-area-inset-top)) 20px 64px" }}>
          <HeroBg stroke="rgba(215,243,106,.16)" />
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Wordmark />
            <span style={{ display: "flex", gap: 8 }}>
              <button type="button" className="icon-btn glass" aria-label="Notifications" onClick={() => toast("No new notifications.")}><Icon icon={Bell} size={16} /></button>
              <button type="button" className="avatar-letter" aria-label="Lucy's account" style={{ border: 0, cursor: "pointer" }} onClick={() => toast("Account settings aren't part of this prototype.")}>L</button>
            </span>
          </div>
          <div className="rise" style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
            <div style={{ position: "relative", width: 132, height: 132, flexShrink: 0 }}>
              <svg aria-hidden width="132" height="132" viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#d7f36a" strokeWidth="2.5" strokeLinecap="round" className="ring" transform="rotate(-90 50 50)" />
              </svg>
              <span style={{ position: "absolute", left: "50%", top: "50%", margin: "-50px 0 0 -54px" }}><Puppy size={108} collar={s.collar} label="Waffles' avatar" /></span>
            </div>
            <div className="stack" style={{ gap: 4, minWidth: 0 }}>
              <span style={{ fontSize: 13, color: dim }}>{greeting()}, Lucy</span>
              <h1 style={{ fontSize: 36, lineHeight: "38px", letterSpacing: "-.03em" }}>{s.name}</h1>
              <span style={{ fontSize: 13, color: dim }}>{petLine(s)}</span>
              <span style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 5, marginTop: 4, padding: "4px 10px", borderRadius: 999, background: "rgba(215,243,106,.16)", color: "var(--lime)", fontSize: 12, fontWeight: 600 }}>
                <Icon icon={Sprout} size={12} />Puppy year · week 10 of 52
              </span>
            </div>
          </div>
        </section>
        <div className="sheet home-sheet rise">
          <section key={bump} aria-label="Needs you" className={bump ? "held pop" : "held"}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="held-eyebrow"><span className="dot" /><span>{s.confirmed ? `Booked for ${s.name}` : "Held for Waffles"}</span></span>
              <span style={{ fontSize: 12, color: "rgba(251,248,239,.75)" }}>{s.confirmed ? "Added to your calendar" : "Expires in 24 hrs"}</span>
            </div>
            <div className="stack" style={{ gap: 4 }}>
              <span style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600 }}>2nd puppy shots · Tue, Nov 17, 6:00 PM</span>
              <span style={{ fontSize: 13, lineHeight: "19px", color: "rgba(251,248,239,.8)" }}>Maple Grove Animal Hospital, 1.2 mi. Dr. Ruiz sees lots of Golden puppies and checks hips early.</span>
            </div>
            {s.confirmed ? (
              <button type="button" className="ghost ghost--dark ghost--block" onClick={() => notBuilt("Rescheduling")}><Icon icon={CalendarCheck} size={16} />Manage visit</button>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <button type="button" className="cta cta--lime" onClick={() => { patch({ confirmed: true }); setBump((n) => n + 1); toast("Booked. See you Tuesday at 6:00 PM.") }}>Confirm in one tap</button>
                <button type="button" className="ghost ghost--dark" onClick={() => notBuilt("Other times")}>Other times</button>
              </div>
            )}
          </section>
          <section aria-label="Growth" className="card stack gap-12" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>Growing right on track</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>From her photos</span>
            </div>
            <svg role="img" aria-label="Weight from 8 to 10 weeks: 9, 11.5, 14 lb, inside the typical Golden range" viewBox="0 0 320 90" style={{ width: "100%", height: 90 }}>
              <path d="M0 70 C 80 62, 160 46, 320 22 L 320 52 C 160 70, 80 80, 0 84 Z" fill="var(--lime-soft)" />
              <path d="M10 74 C 90 66, 170 50, 300 34" fill="none" stroke="#0f2c22" strokeWidth="2.5" strokeLinecap="round" className="ring" style={{ strokeDasharray: 300, strokeDashoffset: 300 }} />
              <circle cx="300" cy="34" r="6" fill="#d7f36a" stroke="#0f2c22" strokeWidth="2" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
              <span>8 wks · 9 lb</span><span>Typical range shaded</span><span style={{ color: "var(--ink)", fontWeight: 600 }}>Now · 14 lb</span>
            </div>
            <button type="button" className="ghost ghost--block" style={{ height: 44 }} onClick={() => notBuilt("Weekly photo check-ins")}><Icon icon={Camera} size={16} />Snap a weekly photo</button>
          </section>
          <h2 style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 600 }}>Around NVA for {s.name}</h2>
          <div className="nva-grid">
            {NVA.map(([I, bg, fg, t, sub]) => (
              <button key={t} type="button" className="card nva-card" onClick={() => notBuilt(t)}>
                <span className="nva-ico" style={{ background: bg, color: fg }}><Icon icon={I} /></span>
                <span style={{ fontSize: 15, lineHeight: "19px", fontWeight: 600 }}>{t}</span>
                <span style={{ fontSize: 12, lineHeight: "16px", color: "var(--muted)" }}>{sub}</span>
              </button>
            ))}
          </div>
          <section aria-label="Local" style={{ display: "flex", gap: 12, padding: 16, borderRadius: 22, background: "var(--cream)" }}>
            <span style={{ display: "flex", color: "var(--forest)" }}><Icon icon={CloudRain} size={20} /></span>
            <span className="stack" style={{ gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Rainy week in Fremont</span>
              <span style={{ fontSize: 13, lineHeight: "19px", color: "var(--muted)" }}>Puddles raise leptospirosis risk. We added a lepto vaccine question to Tuesday's visit.</span>
            </span>
          </section>
        </div>
      </main>
      <button type="button" className="fab" aria-label="Ask NVA about Waffles" onClick={() => toast("The chat isn't part of this flow yet.")}>
        <span className="fab-mark"><Mark w={18} /></span><span>Ask about {s.name}</span>
      </button>
    </Screen>
  )
}
