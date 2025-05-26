import { useState } from "react"
import { Link } from "react-router"
import { ArrowLeft, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Component() {
    const [usuarioEmail, setUsuarioEmail] = useState("");
    const handleEnviarCorreo= async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/auth/login" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <CardTitle className="text-2xl font-bold">Recuperar contraseña</CardTitle>
          </div>
          <CardDescription>Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEnviarCorreo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="tu@ejemplo.com" className="pl-10"
                    value={usuarioEmail} onChange={(e) => setUsuarioEmail(e.target.value)} required />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Enviar enlace de recuperación
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <Link to="/auth/login" className="text-primary underline hover:no-underline">
                Volver al inicio de sesión
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Si no recibes el email en unos minutos, revisa tu carpeta de spam o correo no
              deseado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}