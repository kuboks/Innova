import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ImagenLogin from "@/assets/placeholder.svg"
import { useState } from "react"

import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha"

export function LoginPage({ className, ...props }: React.ComponentProps<"div">, ) {
  
  const [usuarioEmail, setUsuarioEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const apiKey = import.meta.env.VITE_KEY_CAPTCHA;
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!recaptchaToken) {
      alert("Por favor, completa el reCAPTCHA antes de registrar tu cuenta.");
      return;
    }
    try {
      const response = await axios.post(import.meta.env.VITE_URL_API_LOGIN, {
        UsuarioEmail: usuarioEmail,
        Contraseña: password
      }, {
        withCredentials: true
      })
      if(response.data.success){
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-balance text-muted-foreground">Incia sesion con tu cuenta</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Usuario o correo</Label>
                <Input id="email" type="text" value={usuarioEmail} onChange={(e) => setUsuarioEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/auth/recuperar-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex justify-center py-4">
                <ReCAPTCHA
                  sitekey={apiKey}
                  onChange={handleRecaptchaChange}
                  onExpired={() => setRecaptchaToken(null)}
                  onError={() => setRecaptchaToken(null)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                No tienes una cuenta?{" "}
                <Link to="/auth/signup" className="underline underline-offset-4">
                  Sign up
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

