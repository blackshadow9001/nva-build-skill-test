import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { flows, screenUrl } from "./registry"
import { journey } from "./journey"
import { ScreenPicker } from "./ScreenPicker"
import { ToastProvider } from "./flow-kit"

/** Phone-width column that fills the screen on phones and sits centred on larger screens. */
function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-muted sm:py-0">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-background sm:border-x">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to={screenUrl(journey.start)} replace />} />
          {flows.flatMap((f) =>
            f.screens.map((s) => {
              const Screen = s.component
              const page = f.device === "mobile" ? <MobileShell><Screen /></MobileShell> : <Screen />
              return <Route key={`${f.slug}/${s.id}`} path={screenUrl(f.slug, s.path)} element={page} />
            }),
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ScreenPicker />
      </ToastProvider>
    </BrowserRouter>
  )
}
