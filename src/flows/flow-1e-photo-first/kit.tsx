/* Shared pieces for Flow 1e: state, the NVA mark, hero waves, Waffles' illustrated avatar, pills, profile card.
   Styles live in flow-1e.css (scoped under .f1e). */
import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from "react"
import { Link } from "react-router"
import { Check, ChevronLeft, type LucideIcon } from "lucide-react"
import { useFlowState } from "@/app/flow-kit"
import { screenUrl } from "@/app/registry"
import "./flow-1e.css"

export const SLUG = "flow-1e-photo-first"
export const to = (path = "") => screenUrl(SLUG, path)

/* ---------- State: answers later screens read back ---------- */
export const DEFAULTS = {
  photo: 0,
  name: "Waffles",
  species: "Dog",
  breed: "Golden Retriever",
  age: "10 weeks",
  weight: "14 lb",
  place: "Fremont, Seattle",
  collar: "#d7f36a",
  easy: ["Close to home", "Evening and weekend times", "Book online"],
  calendar: true,
  cost: "A predictable monthly plan",
  help: ["Puppy shots", "Finding a vet"],
  note: "",
  confirmed: false,
}
export type F1eState = typeof DEFAULTS
/** Call once per screen and pass values down: each call keeps its own copy. */
export const useF1e = () => useFlowState<F1eState>(SLUG, DEFAULTS)

export const possessive = (n: string) => (/s$/i.test(n) ? `${n}’` : `${n}’s`)
const shortAge = (a: string) => a.replace(" weeks", " wks").replace(" week", " wk")
export const area = (p: string) => p.split(",")[0]
export const petLine = (s: F1eState) => [s.breed, shortAge(s.age), s.weight].join(" · ")
export function profileLine(s: F1eState) {
  const parts = [s.breed, shortAge(s.age), s.weight]
  if (s.place.includes(",")) parts.push(area(s.place))
  return parts.join(" · ")
}
const EASY_SHORT: Record<string, string> = { "Close to home": "Close by", "Evening and weekend times": "evenings", "Book online": "online", "Video visits": "video", "Short waits": "short waits" }
export const COST_SHORT: Record<string, string> = { "A predictable monthly plan": "Monthly plan", "Pay as I go": "Pay as I go", "Use pet insurance": "Insurance", "Not sure yet": "Deciding later" }
export function easySummary(s: F1eState) {
  if (!s.easy.length) return "No preferences"
  const t = s.easy.map((x) => EASY_SHORT[x] || x).join(" · ")
  return t.charAt(0).toUpperCase() + t.slice(1)
}

/* ---------- Visuals ---------- */
export function Icon({ icon: I, size = 18 }: { icon: LucideIcon; size?: number }) {
  return <I className="icon" size={size} aria-hidden focusable={false} />
}

/** The page column for every screen in this flow. */
export function Screen({ children }: { children: ReactNode }) {
  return <div className="f1e app">{children}</div>
}

/** NVA shield mark. */
export function Mark({ w = 16 }: { w?: number }) {
  return (
    <svg aria-hidden width={w} height={Math.round((w * 30) / 26)} viewBox="0 0 26 30" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <path d="M2 2h22v13c0 6.5-4.8 10.8-11 13C6.8 25.8 2 21.5 2 15V2z" />
      <path d="M6.5 16.5L13 5.5l6.5 11" />
      <path d="M6.5 16.5v3M19.5 16.5v3" />
    </svg>
  )
}

export function Wordmark({ w = 16 }: { w?: number }) {
  return <span className="wordmark"><Mark w={w} />NVA</span>
}

/** Contour lines behind a hero, redrawn to the hero's height. */
export function Waves({ stroke = "rgba(215,243,106,.22)" }: { stroke?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = ref.current
    const hero = svg?.parentElement
    if (!svg || !hero) return
    const draw = () => {
      const h = Math.max(160, hero.offsetHeight || 260)
      const n = Math.min(12, Math.floor((h - 60) / 22))
      let d = ""
      for (let k = 0; k < n; k++) {
        const y = 30 + 16 * k, b = h - 30 - 10 * k
        d += `<path d="M0 ${y} C 120 ${y}, 140 ${b}, 195 ${b} S 270 ${y}, 390 ${y}"/>`
      }
      svg.setAttribute("viewBox", `0 0 390 ${h}`)
      svg.innerHTML = d
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(hero)
    return () => ro.disconnect()
  }, [])
  return <svg ref={ref} className="waves" aria-hidden preserveAspectRatio="none" fill="none" stroke={stroke} strokeWidth="1.2" />
}

/** Hero background layers: forest gradient comes from the parent's .forest class. */
export function HeroBg({ stroke }: { stroke?: string }) {
  return <><div className="flute" /><Waves stroke={stroke} /></>
}

export function BackLink({ to: path, glass = true }: { to: string; glass?: boolean }) {
  return (
    <Link to={path} aria-label="Back" className={glass ? "icon-btn glass" : "icon-btn"}>
      <Icon icon={ChevronLeft} size={20} />
    </Link>
  )
}

/** Waffles' illustrated avatar. */
export function Puppy({ size, collar, label }: { size: number; collar: string; label?: string }) {
  const i = "p" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const head = "M80 30 C 113 30, 128 54, 126 82 C 124 111, 105 128, 80 128 C 55 128, 36 111, 34 82 C 32 54, 47 30, 80 30 Z"
  const band = "M49 119 C 64 131, 96 131, 111 119 L 114 129 C 97 141, 63 141, 46 129 Z"
  return (
    <svg className="puppy" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })} width={size} height={size} viewBox="0 0 160 160">
      <defs>
        <radialGradient id={`hd${i}`} cx="42%" cy="30%" r="78%"><stop offset="0" stopColor="#f7d7a3" /><stop offset=".5" stopColor="#e3ad69" /><stop offset=".85" stopColor="#b87d3e" /><stop offset="1" stopColor="#94602b" /></radialGradient>
        <linearGradient id={`er${i}`} x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stopColor="#c58b4c" /><stop offset=".6" stopColor="#9c6630" /><stop offset="1" stopColor="#6f4520" /></linearGradient>
        <radialGradient id={`mz${i}`} cx="46%" cy="32%" r="70%"><stop offset="0" stopColor="#fff6e6" /><stop offset=".7" stopColor="#f0d7ad" /><stop offset="1" stopColor="#d9b47f" /></radialGradient>
        <radialGradient id={`ns${i}`} cx="38%" cy="28%" r="75%"><stop offset="0" stopColor="#6b5444" /><stop offset=".45" stopColor="#2b1e15" /><stop offset="1" stopColor="#0e0906" /></radialGradient>
        <radialGradient id={`ey${i}`} cx="38%" cy="32%" r="70%"><stop offset="0" stopColor="#5a3f2a" /><stop offset=".6" stopColor="#1a110b" /><stop offset="1" stopColor="#070403" /></radialGradient>
        <linearGradient id={`cl${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".28" /></linearGradient>
        <radialGradient id={`rm${i}`} cx="50%" cy="45%" r="55%"><stop offset=".72" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#5a3412" stopOpacity=".35" /></radialGradient>
        <filter id={`sh${i}`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <ellipse cx="80" cy="152" rx="44" ry="7" fill="#0b2a20" opacity=".28" filter={`url(#sh${i})`} />
      <g className="pp-earL"><path d="M42 48 C 22 54, 13 92, 27 112 C 39 120, 51 100, 55 70 Z" fill={`url(#er${i})`} /><path d="M40 60 C 30 70, 27 92, 33 104" stroke="#5e3a1a" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
      <g className="pp-earR"><path d="M118 48 C 138 54, 147 92, 133 112 C 121 120, 109 100, 105 70 Z" fill={`url(#er${i})`} /><path d="M120 60 C 130 70, 133 92, 127 104" stroke="#5e3a1a" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
      <path d={head} fill={`url(#hd${i})`} />
      <path d={head} fill={`url(#rm${i})`} />
      <ellipse cx="66" cy="46" rx="20" ry="9" fill="#fff" opacity=".22" transform="rotate(-14 66 46)" />
      <ellipse cx="80" cy="100" rx="26" ry="19" fill={`url(#mz${i})`} />
      <g className="pp-eyes">
        <circle cx="61" cy="78" r="6.6" fill={`url(#ey${i})`} /><circle cx="99" cy="78" r="6.6" fill={`url(#ey${i})`} />
        <ellipse cx="63.4" cy="75.4" rx="2.4" ry="2" fill="#fff" opacity=".95" /><ellipse cx="101.4" cy="75.4" rx="2.4" ry="2" fill="#fff" opacity=".95" />
        <circle cx="58.6" cy="80.6" r=".9" fill="#fff" opacity=".6" /><circle cx="96.6" cy="80.6" r=".9" fill="#fff" opacity=".6" />
      </g>
      <path d="M70 90 C 70 85, 90 85, 90 90 C 90 96, 84 99, 80 99 C 76 99, 70 96, 70 90 Z" fill={`url(#ns${i})`} />
      <ellipse cx="76" cy="88.6" rx="4" ry="1.8" fill="#fff" opacity=".35" />
      <path d="M80 99 L80 104 M71 105 C 75 109, 80 108, 80 104 C 80 108, 85 109, 89 105" stroke="#3a281b" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8" />
      <path className="pp-collar" d={band} fill={collar} />
      <path d={band} fill={`url(#cl${i})`} />
      <path d="M73 133 h14 v7 c0 4.5 -3.5 7 -7 8.2 c-3.5 -1.2 -7 -3.7 -7 -8.2 z" fill="#123b2d" /><path d="M73 133 h14 v3 h-14 z" fill="#fff" opacity=".18" />
      <path d="M76.5 142 L80 136.5 L83.5 142" stroke="#d7f36a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Choice pills: single (radio) or multi (pressed) ---------- */
export function Pills({ options, value, multi, onChange, ...aria }: {
  options: string[]
  value: string | string[]
  multi?: boolean
  onChange: (v: string | string[]) => void
  "aria-labelledby": string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isOn = (o: string) => (multi ? (value as string[]).includes(o) : value === o)
  function toggle(o: string) {
    if (!multi) return onChange(o)
    const list = value as string[]
    onChange(list.includes(o) ? list.filter((x) => x !== o) : [...list, o])
  }
  // Arrow keys move between radios in single-choice groups.
  function onKeyDown(e: KeyboardEvent) {
    if (multi || !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return
    const btns = Array.from(ref.current?.querySelectorAll("button") ?? [])
    const i = btns.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    e.preventDefault()
    const n = (i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : btns.length - 1)) % btns.length
    btns[n].focus()
    onChange(options[n])
  }
  return (
    <div ref={ref} role={multi ? "group" : "radiogroup"} className="stack gap-10" onKeyDown={onKeyDown} {...aria}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className="pill"
          {...(multi ? { "aria-pressed": isOn(o) } : { role: "radio", "aria-checked": isOn(o), tabIndex: isOn(o) ? 0 : -1 })}
          onClick={() => toggle(o)}
        >
          <span className="ck"><Icon icon={Check} size={16} /></span>{o}
        </button>
      ))}
    </div>
  )
}

/* ---------- Questions header (IP05–IP07): back, step dots, profile summary ---------- */
export function QuestionHero({ step, back, right, s, children }: {
  step: 1 | 2 | 3
  back: string
  right?: ReactNode
  s: F1eState
  /** Tags after "Golden puppy" and the area */
  children: ReactNode
}) {
  return (
    <section className="hero forest on-dark" style={{ paddingBottom: 62 }}>
      <HeroBg />
      <div className="topbar">
        <BackLink to={back} />
        <span className="progress" role="progressbar" aria-label={`Step ${step} of 3`} aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
          {[1, 2, 3].map((n) => <span key={n} className={n < step ? "done" : n === step ? "current" : ""} />)}
        </span>
        {right ?? <span className="spacer" />}
      </div>
      <div className="profile glass rise">
        <div className="profile-head">
          <span className="photo thumb" role="img" aria-label={`${possessive(s.name)} photo`}>
            <span className="puppy-wrap"><Puppy size={46} collar={s.collar} /></span>
          </span>
          <span className="stack" style={{ gap: 2, minWidth: 0 }}>
            <span className="profile-name">{possessive(s.name)} profile</span>
            <span className="profile-sub">{profileLine(s)}</span>
          </span>
        </div>
        <div className="tags">
          <span className="tag-glass glass">Golden puppy</span>
          <span className="tag-glass glass">{area(s.place)}</span>
          {children}
        </div>
      </div>
    </section>
  )
}

/** The primary button at the foot of a sheet, as a link to the next screen. */
export function Cta({ to: path, children, ...rest }: { to: string; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <Link to={path} className={["cta", rest.className].filter(Boolean).join(" ")} style={rest.style}>{children}</Link>
}
