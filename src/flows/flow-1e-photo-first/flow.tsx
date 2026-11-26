import type { FlowDef } from "@/app/types"
import Home from "./screens/Home"
import Meet from "./screens/Meet"
import Reading from "./screens/Reading"
import Confirm from "./screens/Confirm"
import Avatar from "./screens/Avatar"
import Easy from "./screens/Easy"
import Costs from "./screens/Costs"
import Help from "./screens/Help"
import Building from "./screens/Building"
import Tailored from "./screens/Tailored"

const flow: FlowDef = {
  slug: "flow-1e-photo-first",
  title: "Flow 1e · Photo-first intake: Waffles' photo fills in her profile",
  order: 15,
  status: "in review",
  device: "mobile",
  screens: [
    { id: "IP00", title: "Homepage, Get Started", path: "", artboard: "IP00-Home.dc.html", component: Home },
    { id: "IP01", title: "Meet your pet: add a photo", path: "meet", artboard: "IP01-Meet.dc.html", component: Meet },
    { id: "IP02", title: "AI reads the photo", path: "reading", artboard: "IP02-Reading.dc.html", component: Reading },
    { id: "IP03", title: "Confirm or correct", path: "confirm", artboard: "IP03-Confirm.dc.html", component: Confirm },
    { id: "IP04", title: "Avatar reveal", path: "avatar", artboard: "IP04-Avatar.dc.html", component: Avatar },
    { id: "IP05", title: "What makes care easy", path: "easy", artboard: "IP05-Easy.dc.html", component: Easy },
    { id: "IP06", title: "Care costs", path: "costs", artboard: "IP06-Costs.dc.html", component: Costs },
    { id: "IP07", title: "What would help", path: "help", artboard: "IP07-Help.dc.html", component: Help },
    { id: "IP08", title: "Building her plan", path: "building", artboard: "IP08-Building.dc.html", component: Building },
    { id: "IP09", title: "Waffles' home (tailored)", path: "home", artboard: "IP09-Home.dc.html", component: Tailored },
  ],
}
export default flow
