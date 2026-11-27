/* IP07 · What would help. Multi-select + free text / voice (Web Speech API where supported). Step 3 of 3. */
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mic, Plus } from "lucide-react"
import { useToast } from "@/app/flow-kit"
import { COST_SHORT, Cta, easySummary, Icon, Pills, possessive, QuestionHero, Screen, to, useF1e } from "../kit"

const OPTIONS = ["Puppy shots", "Finding a vet", "House training", "Food and nutrition", "Socializing"]

// Minimal typing for the Web Speech API (not in the DOM lib).
type Recognition = { lang: string; interimResults: boolean; start(): void; stop(): void; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; onerror: () => void }
const SR = (window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition })
const SpeechRecognition = SR.SpeechRecognition || SR.webkitSpeechRecognition

export default function Help() {
  const toast = useToast()
  const [s, patch] = useF1e()
  const [listening, setListening] = useState(false)
  const rec = useRef<Recognition | null>(null)
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => () => rec.current?.stop(), [])

  function mic() {
    if (!SpeechRecognition) { toast("Voice input isn't available in this browser. Type instead."); input.current?.focus(); return }
    if (rec.current) { rec.current.stop(); return }
    const r = new SpeechRecognition()
    r.lang = "en-US"
    r.interimResults = true
    r.onresult = (e) => patch({ note: Array.from(e.results).map((x) => x[0].transcript).join("") })
    r.onend = () => { rec.current = null; setListening(false) }
    r.onerror = () => toast("Couldn't hear that. Try again or type.")
    rec.current = r
    setListening(true)
    r.start()
  }

  return (
    <Screen>
      <QuestionHero step={3} back={to("costs")} s={s}>
        <span className="tag-glass glass">{easySummary(s)}</span>
        <span className="tag-glass tag-new pop" style={{ animationDelay: ".5s" }}><Icon icon={Plus} size={12} /><span>{COST_SHORT[s.cost]}</span></span>
      </QuestionHero>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-10">
            <h1 className="title-lg" id="q">What would help most right now?</h1>
            <p className="lede">Pick any, or just tell us.</p>
          </div>
          <Pills aria-labelledby="q" multi options={OPTIONS} value={s.help} onChange={(v) => patch({ help: v as string[] })} />
          <div className={listening ? "card voice listening" : "card voice"}>
            <label htmlFor="note" className="sr-only">Tell us in your own words</label>
            <input ref={input} id="note" type="text" placeholder="“She chews everything...”" autoComplete="off" value={s.note} onChange={(e) => patch({ note: e.target.value })} />
            <span className="wave" aria-hidden><i /><i /><i /><i /></span>
            <button type="button" className="mic" aria-label={listening ? "Stop listening" : "Speak"} aria-pressed={listening} onClick={mic}><Icon icon={Mic} /></button>
          </div>
        </div>
        <div className="foot"><Cta to={to("building")}><span>Build {possessive(s.name)} plan</span><Icon icon={ArrowRight} /></Cta></div>
      </section>
    </Screen>
  )
}
