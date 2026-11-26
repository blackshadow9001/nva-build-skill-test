/* LG01 · Sign in. Tweak "Returning user" -> ?entry=returning (canvas default: New). */
import { useState, type FormEvent } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { Eye, EyeOff } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useExit, useNotBuilt, useToast } from "@/app/flow-kit"
import { AppHeader } from "./AppHeader"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignIn() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const exit = useExit("login-sample")
  const notBuilt = useNotBuilt()
  const toast = useToast()
  const returning = params.get("entry") === "returning"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [busy, setBusy] = useState<string | null>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!returning) {
      if (!email.trim()) next.email = "Enter your email address."
      else if (!EMAIL.test(email.trim())) next.email = "Enter an email like name@example.com."
    }
    if (!password) next.password = "Enter your password."
    else if (password.length < 8) next.password = "Passwords are at least 8 characters."
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy("Signing in…")
    setTimeout(() => exit("signed-in"), 700) // Swap for the real auth request.
  }

  function sso(provider: string) {
    setBusy(`Connecting to ${provider}…`)
    setTimeout(() => exit("signed-in"), 900)
  }

  return (
    <>
      <AppHeader brand="ACME Pet Care" />
      <main className="flex grow flex-col gap-6 px-5 pt-8 pb-6">
        {returning ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar size="lg">
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h1 className="h3 text-foreground">Welcome back, Lucy</h1>
              <p className="text-sm text-muted-foreground">Sign in to see Waffles' visits and reminders.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h1 className="h3 text-foreground">Sign in to ACME Pet Care</h1>
            <p className="text-sm text-muted-foreground">Your pets' care records, visits and reminders in one place.</p>
          </div>
        )}

        <form onSubmit={submit} noValidate className="flex flex-col gap-6">
          <FieldGroup>
            {returning ? (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <div className="flex h-9 items-center justify-between gap-2 rounded-md border bg-muted pr-0.5 pl-3 text-sm text-foreground">
                  <span>lucy@example.com</span>
                  <Button type="button" variant="link" size="sm" onClick={() => navigate("/login-sample")}>
                    Not you?
                  </Button>
                </div>
              </Field>
            ) : (
              <Field data-invalid={!!errors.email || undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  aria-invalid={!!errors.email || undefined}
                  onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })) }}
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
            )}
            <Field data-invalid={!!errors.password || undefined}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <button type="button" onClick={() => toast("We'll email you a link to reset your password.")} className="text-sm text-muted-foreground underline underline-offset-3">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="pr-10"
                  value={password}
                  aria-invalid={!!errors.password || undefined}
                  onChange={(e) => { setPassword(e.target.value); setErrors((x) => ({ ...x, password: undefined })) }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-0.5 right-0.5 text-muted-foreground"
                  aria-label={show ? "Hide password" : "Show password"}
                  aria-pressed={show}
                  onClick={() => setShow((s) => !s)}
                >
                  {show ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-3">
            <Button type="submit" size="lg" className="w-full" disabled={!!busy}>
              {busy ?? "Sign in"}
            </Button>
            <div className="flex items-center gap-3 text-xs text-muted-foreground" role="presentation">
              <Separator className="flex-1" />
              <span>or</span>
              <Separator className="flex-1" />
            </div>
            <Button type="button" variant="outline" size="lg" className="w-full" disabled={!!busy} onClick={() => sso("Apple")}>
              Continue with Apple
            </Button>
            <Button type="button" variant="outline" size="lg" className="w-full" disabled={!!busy} onClick={() => sso("Google")}>
              Continue with Google
            </Button>
          </div>
        </form>

        <p className="mt-auto text-center text-sm text-muted-foreground">
          New here?{" "}
          <button type="button" onClick={() => notBuilt("Account creation")} className="font-medium text-foreground underline underline-offset-3">
            Create an account
          </button>
        </p>
      </main>
    </>
  )
}
