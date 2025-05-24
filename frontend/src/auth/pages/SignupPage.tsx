import { Link } from "react-router"
import { useState } from "react"

import { cn } from "@/lib/utils"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ImagenLogin from "@/assets/placeholder.svg"

export function SignupPage({ className, ...props }: React.ComponentProps<"div">) {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-balance text-muted-foreground">Crea tu cuenta</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Nombre">Nombre</Label>
                <Input id="Nombre" type="text" placeholder="Juan" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Apellidos">Apellidos</Label>
                <Input id="Apellidos" type="text" placeholder="Martinez Martinez" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Usuario">Usuario</Label>
                <Input id="Usuario" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="flex justify-center py-4">
              <ReCAPTCHA
                sitekey="6Lcf40UrAAAAAAoMFOCzqu7nBoymBpDEn5RgkoEX"
                onChange={handleRecaptchaChange}
                onExpired={() => setRecaptchaToken(null)}
                onError={() => setRecaptchaToken(null)}
              />
            </div>

              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>
              <div className="text-center text-sm">
                Ya tienes una cuenta?{" "}
                <Link to="/auth/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={ImagenLogin}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

