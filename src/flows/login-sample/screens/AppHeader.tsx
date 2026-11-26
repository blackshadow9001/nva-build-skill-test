import { PawPrint } from "lucide-react"
import type { ReactNode } from "react"

/** brand: LG01 says "ACME Pet Care" since the 2026-11-26 canvas update; LG02 still says "NVA Pet Care" (see HANDOFF). */
export function AppHeader({ actions, brand = "NVA Pet Care" }: { actions?: ReactNode; brand?: string }) {
  return (
    <header className="sticky top-0 z-10 flex min-h-14 items-center justify-between border-b bg-background py-1.5 pr-2.5 pl-5">
      <span className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-[calc(var(--radius)*0.8)] bg-primary text-primary-foreground">
          <PawPrint className="size-[18px]" aria-hidden />
        </span>
        <span className="text-base font-bold tracking-[-0.01em] text-foreground">{brand}</span>
      </span>
      <span className="flex items-center gap-0.5">{actions ?? <span className="size-11" aria-hidden />}</span>
    </header>
  )
}
