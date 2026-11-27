/* IP02 · AI reads the photo. Detected fields appear one by one; the button appears after ~3 s. */
import { useEffect, useState } from "react"
import { ArrowRight, Cake, Check, Dna, MapPin, PawPrint, Scale, Sparkles, type LucideIcon } from "lucide-react"
import { BackLink, Cta, Icon, Puppy, Screen, to, useF1e } from "../kit"

const TAGS: [string, number, number, number][] = [["Dog", 30, 54, 0.7], ["Golden Retriever", 170, 14, 1.15], ["~10 weeks", 40, 204, 1.6], ["~14 lb", 230, 166, 2.05]]
const ROWS: [LucideIcon, string, string, number][] = [
  [PawPrint, "Species", "Dog", 0.6],
  [Dna, "Breed", "Golden Retriever · 92% match", 1.1],
  [Cake, "Age", "About 10 weeks", 1.5],
  [Scale, "Weight", "About 14 lb", 2.0],
  [MapPin, "Location", "Fremont, Seattle", 2.4],
]

export default function Reading() {
  const [s] = useF1e()
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2900)
    return () => clearTimeout(t)
  }, [])

  return (
    <Screen>
      <section className="hero" style={{ height: 394 }}>
        <div className="photo" role="img" aria-label="Your photo: a Golden Retriever puppy on the grass" style={{ position: "absolute", inset: 0 }}>
          <span style={{ position: "absolute", left: "50%", top: 56, translate: "-50% 0" }}><Puppy size={250} collar={s.collar} /></span>
        </div>
        <div className="scan-wrap scan-done" aria-hidden><span className="scan" /></div>
        <div aria-hidden style={{ position: "absolute", left: "50%", top: 60, translate: "-50% 0", width: 250, height: 250 }}>
          <svg width="250" height="250" viewBox="0 0 250 250" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M2 30V2h28M220 2h28v28M248 220v28h-28M30 248H2v-28" /></svg>
          <div style={{ position: "absolute", inset: 0, left: -70, width: 390 }}>
            {TAGS.map(([t, x, y, d]) => <span key={t} className="ai-tag" style={{ left: x, top: y, animationDelay: `${d}s` }}><span className="dot" />{t}</span>)}
          </div>
        </div>
        <div className="topbar">
          <BackLink to={to("meet")} glass={false} />
          <span className="status-pill" role="status"><Icon icon={Sparkles} size={14} /><span>{done ? "Photo read" : "Reading the photo"}</span></span>
        </div>
      </section>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-6"><span className="eyebrow">Getting to know them</span><h1 className="title-md">Here's what we can tell.</h1></div>
          <div className="stack gap-12" aria-live="polite">
            {ROWS.map(([I, k, v, d]) => (
              <div key={k} className="in" style={{ display: "flex", alignItems: "center", gap: 12, animationDelay: `${d}s` }}>
                <span className="tile-icon"><Icon icon={I} size={16} /></span>
                <span className="kv"><span className="kv-k">{k}</span><span className="kv-v">{v}</span></span>
                <span className="done-dot pop" style={{ animationDelay: `${d + 0.2}s` }}><Icon icon={Check} size={12} /></span>
              </div>
            ))}
          </div>
          <p className="fine">Location comes from the photo's place tag, only because you chose this photo. You can change any of this next.</p>
        </div>
        <div className="foot">{done && <Cta to={to("confirm")} className="pop">Check the details<Icon icon={ArrowRight} /></Cta>}</div>
      </section>
    </Screen>
  )
}
