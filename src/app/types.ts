import type { ComponentType } from "react"

export type Device = "mobile" | "tablet" | "desktop"

export interface ScreenDef {
  /** Canvas id, e.g. "LG01" */
  id: string
  title: string
  /** Route inside the flow: "" for the entry screen, then "home", "confirm"... */
  path: string
  /** Source artboard on the canvas */
  artboard: string
  component: ComponentType
}

export interface FlowDef {
  slug: string
  title: string
  /** Sort order in the screen picker (flow number: 1e -> 15, samples 90) */
  order: number
  status: "draft" | "in review" | "ready for build" | "built" | "sample"
  device: Device
  screens: ScreenDef[]
  /**
   * Named ways out of this flow, each with the in-flow screen path used when the journey
   * doesn't send that exit to another flow. e.g. { "signed-in": "home" }
   */
  exits?: Record<string, string>
}
