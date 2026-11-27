import type { FlowDef } from "@/app/types"
import SignIn from "./screens/SignIn"
import Home from "./screens/Home"

const flow: FlowDef = {
  slug: "login-sample",
  title: "Sample · Login: Lucy signs in and lands on her home",
  order: 5,
  status: "ready for build",
  device: "mobile",
  screens: [
    { id: "LG01", title: "Sign in", path: "", artboard: "LG01-SignIn.dc.html", component: SignIn },
    { id: "LG02", title: "Home, signed in", path: "home", artboard: "LG02-Home.dc.html", component: Home },
  ],
  // When the journey links "signed-in" to another flow (see src/app/journey.ts), sign-in continues
  // there; otherwise it lands on this flow's own home.
  exits: { "signed-in": "home" },
}
export default flow
