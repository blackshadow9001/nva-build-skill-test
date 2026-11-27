/* IP04 · Avatar reveal: pick a collar colour; "Try another look" cycles it. */
import { useRef, useState, type KeyboardEvent } from "react"
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react"
import { BackLink, Cta, Icon, possessive, Puppy, Screen, to, useF1e, Waves, Wordmark } from "../kit"

const COLLARS: [string, string][] = [["#d7f36a", "Lime"], ["#1f5240", "Forest"], ["#efe6d3", "Sand"], ["#2e3430", "Charcoal"]]

export default function Avatar() {
  const [s, patch] = useF1e()
  const [look, setLook] = useState(0) // remounts the avatar to replay its pop
  const swatches = useRef<(HTMLButtonElement | null)[]>([])
  const cur = Math.max(0, COLLARS.findIndex(([hex]) => hex === s.collar))
  const pick = (i: number) => patch({ collar: COLLARS[i][0] })

  function onKeyDown(e: KeyboardEvent) {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (cur + d + COLLARS.length) % COLLARS.length
    pick(n)
    swatches.current[n]?.focus()
  }

  return (
    <Screen>
      <section className="hero forest on-dark" style={{ height: 364 }}>
        <div className="flute" />
        <div aria-hidden style={{ position: "absolute", left: "50%", top: 184, width: 320, height: 320, margin: -160, borderRadius: 999, background: "radial-gradient(circle,rgba(215,243,106,.28) 0%,rgba(215,243,106,0) 65%)" }} />
        <Waves stroke="rgba(215,243,106,.18)" />
        <div className="topbar"><BackLink to={to("confirm")} /><Wordmark /><span className="spacer" /></div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 16 }}>
          <svg aria-hidden width="230" height="230" viewBox="0 0 100 100" style={{ position: "absolute", top: "50%", left: "50%", margin: -115 }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#d7f36a" strokeWidth="1.2" strokeLinecap="round" className="ring" transform="rotate(-90 50 50)" />
          </svg>
          <span key={look} className="pop" style={{ position: "relative", animationDelay: look ? "0s" : ".9s" }}>
            <span className="float" style={{ display: "block" }}><Puppy size={190} collar={s.collar} label={`${possessive(s.name)} NVA avatar`} /></span>
          </span>
        </div>
      </section>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-10">
            <span className="eyebrow">Your pet, NVA edition</span>
            <h1 className="title-lg">Here's {s.name}.</h1>
            <p className="lede">Made from her photo. You'll see her on her profile and in reminders.</p>
          </div>
          <div className="stack gap-10">
            <span className="label" id="collar-label">Pick her collar</span>
            <div className="swatches" role="radiogroup" aria-labelledby="collar-label" onKeyDown={onKeyDown}>
              {COLLARS.map(([hex, label], i) => (
                <button
                  key={hex}
                  ref={(el) => { swatches.current[i] = el }}
                  type="button"
                  role="radio"
                  className="swatch"
                  aria-label={label}
                  aria-checked={i === cur}
                  tabIndex={i === cur ? 0 : -1}
                  style={{ background: hex }}
                  onClick={() => pick(i)}
                />
              ))}
            </div>
          </div>
          <div className="note"><Icon icon={Sparkles} /><span>Updates as she grows. Add a new photo any time and her avatar, weight and size estimates refresh.</span></div>
        </div>
        <div className="foot">
          <Cta to={to("easy")}><span>Love it</span><Icon icon={ArrowRight} /></Cta>
          <button type="button" className="ghost ghost--block" onClick={() => { pick((cur + 1) % COLLARS.length); setLook((n) => n + 1) }}>
            <Icon icon={RefreshCw} size={16} />Try another look
          </button>
        </div>
      </section>
    </Screen>
  )
}
