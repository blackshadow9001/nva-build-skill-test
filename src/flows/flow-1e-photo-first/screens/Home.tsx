/* IP00 · Homepage, Get Started. Starting here clears earlier answers. */
import { useEffect, useState } from "react"
import { ArrowRight, Menu } from "lucide-react"
import { useToast } from "@/app/flow-kit"
import { Cta, DEFAULTS, Icon, Mark, Puppy, Screen, to, useF1e, Waves } from "../kit"

// The canvas photo can't be exported by tools: drop it in ../assets/hero.jpg. Until then an illustration shows.
const heroUrl = Object.values(
  import.meta.glob<string>("../assets/hero.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" }),
)[0]

export default function Home() {
  const toast = useToast()
  const [, patch] = useF1e()
  const [photoOk, setPhotoOk] = useState(!!heroUrl)
  useEffect(() => patch(DEFAULTS), [patch])

  return (
    <Screen>
      <section className="hero" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>
          {photoOk ? (
            <img
              src={heroUrl}
              alt="A smiling NVA team member holds a scruffy gray dog on a city sidewalk"
              onError={() => setPhotoOk(false)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 30%" }}
            />
          ) : (
            <div className="forest" style={{ position: "absolute", inset: 0 }}>
              <div className="flute" /><Waves />
              <span className="float" style={{ position: "absolute", left: "50%", top: "52%", translate: "-50% -50%" }}>
                <Puppy size={200} collar={DEFAULTS.collar} label="An illustrated golden puppy" />
              </span>
            </div>
          )}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(15,44,34,.45) 0%,rgba(15,44,34,0) 30%)" }} />
          <div className="topbar on-dark" style={{ position: "absolute", left: 0, right: 0, top: 0, color: "#fff" }}>
            <span className="wordmark" style={{ gap: 10, fontSize: 15, letterSpacing: ".2em" }}><Mark w={22} />NVA</span>
            <button type="button" className="icon-btn" aria-label="Menu" onClick={() => toast("The site menu isn't part of this prototype.")}>
              <Icon icon={Menu} />
            </button>
          </div>
        </div>
        <div className="sheet" style={{ flex: "none" }}>
          <div className="rise stack gap-14" style={{ padding: "32px 20px calc(20px + env(safe-area-inset-bottom))" }}>
            <span className="eyebrow">Pet care, made personal</span>
            <h1 className="title-xl">Care that grows with them.</h1>
            <p style={{ fontSize: 16, lineHeight: "24px", color: "var(--muted)", maxWidth: 325 }}>One photo and a few taps. We'll shape everything around your pet, from the first visit on.</p>
            <Cta to={to("meet")} style={{ marginTop: 6 }}><span>Get Started with NVA</span><Icon icon={ArrowRight} /></Cta>
            <button type="button" className="text-link" style={{ background: "none", border: 0, cursor: "pointer" }} onClick={() => toast("Sign-in isn't part of this flow. See the login sample.")}>
              I already have an account
            </button>
          </div>
        </div>
      </section>
    </Screen>
  )
}
