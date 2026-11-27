import type { FlowDef } from "@/app/types"
import Email from "./screens/Email"
import Guide from "./screens/Guide"

const flow: FlowDef = {
  slug: "flow-2-first-visit-prep",
  title: "Flow 2 · First Visit Prep: getting ready for the appointment",
  order: 20,
  status: "draft",
  device: "mobile",
  screens: [
    { id: "2.1", title: "Confirmation email", path: "", artboard: "FVP-Email.dc.html", component: Email },
    { id: "2.2", title: "First Visit Prep", path: "guide", artboard: "FVP-Guide.dc.html", component: Guide },
  ],
}
export default flow
