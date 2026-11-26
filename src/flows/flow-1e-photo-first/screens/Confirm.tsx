/* IP03 · Confirm or correct: edit the name; expand a row to correct species, breed, age, weight, location. */
import { useState } from "react"
import { ArrowRight, Cake, Check, ChevronUp, Dna, MapPin, PawPrint, Pencil, Scale, type LucideIcon } from "lucide-react"
import { useToast } from "@/app/flow-kit"
import { BackLink, Cta, HeroBg, Icon, Puppy, Screen, to, useF1e, Wordmark, type F1eState } from "../kit"

type Key = "species" | "breed" | "age" | "weight" | "place"
const DEFS: [Key, LucideIcon, string, boolean, string[]][] = [
  ["species", PawPrint, "Species", true, ["Dog", "Cat", "Something else"]],
  ["breed", Dna, "Breed", true, ["Golden Retriever", "Labrador Retriever", "Golden mix"]],
  ["age", Cake, "Age", false, ["8 weeks", "10 weeks", "12 weeks", "Enter birthday"]],
  ["weight", Scale, "Weight", false, ["12 lb", "14 lb", "16 lb"]],
  ["place", MapPin, "Location", true, ["Fremont, Seattle", "Use a different ZIP", "Don't use location"]],
]
const NOT_BUILT = ["Enter birthday", "Use a different ZIP"]

export default function Confirm() {
  const toast = useToast()
  const [s, patch] = useF1e()
  const [name, setName] = useState(s.name)
  const [open, setOpen] = useState<Key | "">("age")

  function pick(k: Key, v: string) {
    if (NOT_BUILT.includes(v)) return toast("That input isn't part of this prototype yet.")
    patch({ [k]: v } as Partial<F1eState>)
  }

  return (
    <Screen>
      <section className="hero forest on-dark" style={{ height: 204 }}>
        <HeroBg />
        <div className="topbar"><BackLink to={to("reading")} /><Wordmark /><span className="spacer" /></div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 14 }}>
          <span className="photo" role="img" aria-label="Your photo" style={{ width: 96, height: 96, borderRadius: 28, border: "4px solid #fff", boxShadow: "0 6px 18px -10px rgba(15,44,34,.4)" }}>
            <span style={{ position: "absolute", left: "50%", bottom: -8, translate: "-50% 0" }}><Puppy size={86} collar={s.collar} /></span>
          </span>
        </div>
      </section>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-10">
            <h1 className="title-lg">Did we get it right?</h1>
            <p className="lede">Tap anything that's off. Best guesses are marked.</p>
          </div>
          <div className="stack gap-8">
            <label className="label" htmlFor="pet-name">Their name</label>
            <input
              className="field"
              id="pet-name"
              autoComplete="off"
              autoCapitalize="words"
              value={name}
              onChange={(e) => { setName(e.target.value); patch({ name: e.target.value.trim() || "your pet" }) }}
            />
            {name.trim() && <span className="soft-tag pop" style={{ animationDelay: ".4s" }}><Icon icon={Check} size={14} />Lovely name</span>}
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            {DEFS.map(([id, I, label, sure, opts]) => {
              const isOpen = open === id
              return (
                <div key={id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <button type="button" className="row" aria-expanded={isOpen} aria-controls={`opts-${id}`} onClick={() => setOpen(isOpen ? "" : id)}>
                    <span className="tile-icon"><Icon icon={I} size={16} /></span>
                    <span className="kv"><span className="kv-k">{label}</span><span className="kv-v">{s[id]}</span></span>
                    <span className={sure ? "badge" : "badge badge--guess"}>{sure ? "Sure" : "Best guess"}</span>
                    <span style={{ color: "var(--muted)" }}><Icon icon={isOpen ? ChevronUp : Pencil} size={16} /></span>
                  </button>
                  {isOpen && (
                    <div id={`opts-${id}`} role="radiogroup" aria-label={label} className="pop" style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "0 16px 14px 64px", transformOrigin: "top left" }}>
                      {opts.map((o) => (
                        <button key={o} type="button" role="radio" className="chip" aria-checked={s[id] === o} onClick={() => pick(id, o)}>{o}</button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="foot"><Cta to={to("avatar")}><span>Looks right</span><Icon icon={ArrowRight} /></Cta></div>
      </section>
    </Screen>
  )
}
