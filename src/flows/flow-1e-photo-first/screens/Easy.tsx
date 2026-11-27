/* IP05 · What makes care easy. Multi-select + calendar switch. Step 1 of 3. */
import { ArrowRight, CalendarSync } from "lucide-react"
import { Cta, Icon, Pills, possessive, QuestionHero, Screen, to, useF1e } from "../kit"

const OPTIONS = ["Close to home", "Evening and weekend times", "Book online", "Video visits", "Short waits"]

export default function Easy() {
  const [s, patch] = useF1e()
  return (
    <Screen>
      <QuestionHero step={1} back={to("avatar")} s={s}>
        <span className="tag-glass tag-dashed">What makes care easy</span>
      </QuestionHero>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-10">
            <h1 className="title-lg" id="q">What makes care easy for you?</h1>
            <p className="lede">Pick any. {possessive(s.name)} plan will work around them.</p>
          </div>
          <Pills aria-labelledby="q" multi options={OPTIONS} value={s.easy} onChange={(v) => patch({ easy: v as string[] })} />
          <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
            <span className="tile-icon tile-icon--lg tile-icon--cream"><Icon icon={CalendarSync} /></span>
            <span className="stack" style={{ gap: 2, flexGrow: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }} id="cal-label">Connect your calendar</span>
              <span style={{ fontSize: 13, lineHeight: "18px", color: "var(--muted)" }}>We'll only suggest times you're free.</span>
            </span>
            <button type="button" role="switch" className="toggle" aria-labelledby="cal-label" aria-checked={s.calendar} onClick={() => patch({ calendar: !s.calendar })} />
          </div>
        </div>
        <div className="foot"><Cta to={to("costs")}><span>Continue</span><Icon icon={ArrowRight} /></Cta></div>
      </section>
    </Screen>
  )
}
