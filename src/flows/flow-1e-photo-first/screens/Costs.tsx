/* IP06 · Care costs. Single choice; the tip card changes per choice. Skippable. Step 2 of 3. */
import { Link } from "react-router"
import { ArrowRight, Plus, Sparkles } from "lucide-react"
import { area, Cta, easySummary, Icon, Pills, QuestionHero, Screen, to, useF1e } from "../kit"

const TIPS: Record<string, [string, string]> = {
  "A predictable monthly plan": ["About $45 a month", "Puppy Care Plan covers the shot series, checkups and exams. First-year routine care is usually around $1,100 to $1,400."],
  "Pay as I go": ["About $85 per puppy visit", "Waffles needs 3 to 4 visits before 16 weeks. We'll show prices before you book."],
  "Use pet insurance": ["Plans from about $30 a month", "Insurance helps with accidents and illness. Routine shots usually aren't covered, so many owners pair it with a plan."],
  "Not sure yet": ["We'll show you both", "You'll see plan and per-visit prices side by side, so you can decide later."],
}

export default function Costs() {
  const [s, patch] = useF1e()
  const [big, small] = TIPS[s.cost] ?? TIPS["Not sure yet"]
  return (
    <Screen>
      <QuestionHero step={2} back={to("easy")} s={s} right={<Link to={to("help")} className="skip">Skip</Link>}>
        <span className="tag-glass tag-new pop" style={{ animationDelay: ".5s" }}><Icon icon={Plus} size={12} /><span>{easySummary(s)}</span></span>
      </QuestionHero>
      <section className="sheet">
        <div className="scroll rise">
          <div className="stack gap-10">
            <h1 className="title-lg" id="q">How do you like to handle care costs?</h1>
            <p className="lede">Optional. Change it any time.</p>
          </div>
          <Pills aria-labelledby="q" options={Object.keys(TIPS)} value={s.cost} onChange={(v) => patch({ cost: v as string })} />
          <div className="card card--cream stack gap-8" aria-live="polite" style={{ padding: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "var(--forest)" }}>
              <Icon icon={Sparkles} size={14} /><span>For a Golden puppy near {area(s.place)}</span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-.02em" }}>{big}</span>
            <span style={{ fontSize: 13, lineHeight: "19px", color: "var(--muted)" }}>{small}</span>
          </div>
        </div>
        <div className="foot"><Cta to={to("help")}><span>Continue</span><Icon icon={ArrowRight} /></Cta></div>
      </section>
    </Screen>
  )
}
