/* Illustrated map from the FVP-Guide artboard (no map service in the prototype). Zoom just scales it. */
import type { ReactNode } from "react"
import { Hospital } from "lucide-react"

export function ClinicMap({ zoom, children }: { zoom: number; children?: ReactNode }) {
  return (
    <div
      role="img"
      aria-label="Street map showing Maple Grove Animal Hospital at the corner of Maple Avenue and Grove Street, with a parking lot behind the building and a park to the west"
      className="relative h-[188px] overflow-hidden rounded-lg border bg-muted leading-normal"
    >
      <div aria-hidden className="absolute inset-0 origin-[40%_40%] transition-transform duration-250 *:absolute" style={{ transform: `scale(${zoom})` }}>
        <div className="top-0 left-0 h-[46%] w-[34%] bg-(--color-green-100)" />
        <span className="top-[30px] left-2.5 text-[10px] text-(--color-green-800)">Grove Park</span>
        <div className="top-[46%] right-0 left-0 h-3 bg-background" />
        <span className="top-[calc(46%-1px)] left-2 text-[9px] font-medium text-muted-foreground">Maple Ave</span>
        <div className="top-[82%] right-0 left-0 h-1.5 bg-background" />
        <div className="top-0 bottom-0 left-[34%] w-3 bg-background" />
        <span className="top-[70%] left-[calc(34%+1px)] text-[9px] font-medium text-muted-foreground [writing-mode:vertical-rl]">Grove St</span>
        <div className="top-0 bottom-0 left-[78%] w-1.5 bg-background" />
        <div className="top-3 left-[calc(34%+22px)] h-[52px] w-[70px] rounded bg-border" />
        <div className="top-[calc(46%+22px)] left-[calc(34%+22px)] h-[38px] w-[46px] rounded bg-border" />
        <div className="top-[calc(46%+20px)] left-[calc(34%+74px)] flex h-[42px] w-[52px] items-center justify-center rounded border-[1.5px] border-dashed border-muted-foreground text-[13px] font-bold text-muted-foreground">P</div>
        <div className="top-[calc(46%-40px)] left-[calc(34%+14px)] flex flex-col items-center">
          <span className="flex items-center gap-1.5 rounded-full bg-primary py-1 pr-2 pl-1 text-[11px] font-semibold whitespace-nowrap text-primary-foreground shadow-md">
            <span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground text-primary"><Hospital className="size-3" /></span>
            Maple Grove
          </span>
          <span className="size-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-primary" />
        </div>
      </div>
      {children}
    </div>
  )
}
