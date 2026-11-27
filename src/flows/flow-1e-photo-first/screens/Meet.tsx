/* IP01 · Meet your pet: pick one of 3 photos, or take / choose one (previews in tile 1). */
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { ArrowRight, Camera, Check, Images, Lock } from "lucide-react"
import { useToast } from "@/app/flow-kit"
import { BackLink, Cta, HeroBg, Icon, Puppy, Screen, to, useF1e, Wordmark } from "../kit"

const TONES = [undefined, "hue-rotate(-8deg) brightness(1.05)", "saturate(.8) brightness(.92)"]

export default function Meet() {
  const toast = useToast()
  const [s, patch] = useF1e()
  const [picked, setPicked] = useState<string | null>(null)
  const camera = useRef<HTMLInputElement>(null)
  const library = useRef<HTMLInputElement>(null)
  const tiles = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => () => { if (picked) URL.revokeObjectURL(picked) }, [picked])

  function onKeyDown(e: KeyboardEvent) {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (s.photo + d + TONES.length) % TONES.length
    patch({ photo: n })
    tiles.current[n]?.focus()
  }

  function usePicked(input: HTMLInputElement) {
    const f = input.files?.[0]
    if (!f) return
    setPicked(URL.createObjectURL(f))
    patch({ photo: 0 })
    toast("Photo added. We'll read it next.")
  }

  return (
    <Screen>
      <section className="hero forest on-dark" style={{ height: 282 }}>
        <HeroBg />
        <div className="topbar"><BackLink to={to()} /><Wordmark /><span className="spacer" /></div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 22 }}>
          <span className="breathe" aria-hidden style={{ position: "absolute", top: "50%", left: "50%", width: 200, height: 200, margin: -100, borderRadius: 999, border: "1.5px dashed rgba(215,243,106,.5)" }} />
          <span className="glass" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 150, height: 150, borderRadius: 999, color: "var(--lime)" }}><Icon icon={Camera} size={40} /></span>
        </div>
      </section>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-10">
            <h1 className="title-lg">We'd love to meet your pet.</h1>
            <p className="lede">Add a photo and we'll take it from there. No long forms.</p>
          </div>
          <div className="stack gap-12">
            <span id="photos-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 14, fontWeight: 600 }}>
              Pets we spotted in your recent photos
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: "var(--muted)" }}><Icon icon={Lock} size={12} />On device</span>
            </span>
            <div className="photo-grid" role="radiogroup" aria-label="Choose a photo" onKeyDown={onKeyDown}>
              {TONES.map((tone, i) => {
                const own = i === 0 && picked
                return (
                  <button
                    key={i}
                    ref={(el) => { tiles.current[i] = el }}
                    type="button"
                    role="radio"
                    className="photo-opt"
                    aria-checked={s.photo === i}
                    tabIndex={s.photo === i ? 0 : -1}
                    aria-label={own ? "Your photo" : `Photo ${i + 1} of your dog`}
                    onClick={() => patch({ photo: i })}
                  >
                    <span className="photo" style={tone ? { filter: tone } : undefined}>
                      {own && <img className="user-photo" alt="Your photo" src={picked} />}
                    </span>
                    {!own && <span className="puppy-wrap"><Puppy size={84} collar={s.collar} /></span>}
                    <span className="tick"><Icon icon={Check} size={14} /></span>
                  </button>
                )
              })}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button type="button" className="ghost" onClick={() => camera.current?.click()}><Icon icon={Camera} size={16} />Take a photo</button>
            <button type="button" className="ghost" onClick={() => library.current?.click()}><Icon icon={Images} size={16} />Library</button>
          </div>
          <input ref={camera} type="file" accept="image/*" capture="environment" hidden onChange={(e) => usePicked(e.currentTarget)} />
          <input ref={library} type="file" accept="image/*" hidden onChange={(e) => usePicked(e.currentTarget)} />
        </div>
        <div className="foot"><Cta to={to("reading")}><span>Use this photo</span><Icon icon={ArrowRight} /></Cta></div>
      </section>
    </Screen>
  )
}
