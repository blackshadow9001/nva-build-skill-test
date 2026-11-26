/* Small helpers every flow uses: journey exits, per-flow state, toasts, placeholders. */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useNavigate } from "react-router"
import { journey } from "./journey"
import { flowBySlug, screenUrl } from "./registry"

/** Leave the current flow by a named exit: follows the journey, else the flow's own fallback screen. */
export function useExit(slug: string) {
  const navigate = useNavigate()
  return useCallback(
    (exit: string) => {
      const next = journey.links[`${slug}:${exit}`]
      if (next && flowBySlug(next)) return navigate(screenUrl(next))
      const fallback = flowBySlug(slug)?.exits?.[exit]
      navigate(screenUrl(slug, fallback ?? ""))
    },
    [navigate, slug],
  )
}

/** State that later screens of the same flow read back. Kept per tab in sessionStorage. */
export function useFlowState<T extends object>(slug: string, defaults: T) {
  const key = `proto:${slug}`
  const [state, setState] = useState<T>(() => {
    try {
      return { ...defaults, ...JSON.parse(sessionStorage.getItem(key) || "{}") }
    } catch {
      return defaults
    }
  })
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    try { sessionStorage.setItem(key, JSON.stringify(state)) } catch { /* storage off */ }
  }, [key, state])
  const patch = useCallback((p: Partial<T>) => setState((s) => ({ ...s, ...p })), [])
  return [state, patch] as const
}

export function resetAllFlowState() {
  try {
    Object.keys(sessionStorage).filter((k) => k.startsWith("proto:")).forEach((k) => sessionStorage.removeItem(k))
  } catch { /* storage off */ }
}

type Toast = { id: number; text: string }
const ToastCtx = createContext<(text: string) => void>(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([])
  const show = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setItems((t) => [...t, { id, text }])
    setTimeout(() => setItems((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 mx-auto flex w-[min(358px,calc(100vw-32px))] flex-col gap-2">
        {items.map((t) => (
          <div key={t.id} className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border bg-background px-4 py-3 text-sm shadow-lg">
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

/** For links to screens that aren't built yet ("#forgot" on the canvas). */
export function useNotBuilt() {
  const toast = useToast()
  return (what: string) => toast(`${what} isn't part of this prototype yet.`)
}
