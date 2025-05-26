import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Eye, EyeOff, Lock, AlertCircle } from "lucide-react"
import { useState } from "react"

export function NewPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const passwordsMatch = password === confirmPassword && password.length > 0
  const isPasswordStrong = password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordsMatch && isPasswordStrong) {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">¡Contraseña actualizada!</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
              </div>
              <Button className="w-full" onClick={() => (window.location.href = "/login")}>
                Ir al inicio de sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Crear nueva contraseña</CardTitle>
          <CardDescription>
            Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Indicador de fortaleza de contraseña */}
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`h-1 flex-1 rounded ${password.length >= 8 ? "bg-green-500" : "bg-gray-200"}`} />
                    <div className={`h-1 flex-1 rounded ${isPasswordStrong ? "bg-green-500" : "bg-gray-200"}`} />
                    <div
                      className={`h-1 flex-1 rounded ${isPasswordStrong && password.length >= 12 ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  </div>
                  
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  className="pl-10 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Validación de coincidencia */}
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  {passwordsMatch ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      Las contraseñas coinciden
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      Las contraseñas no coinciden
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={!passwordsMatch}>
              Actualizar contraseña
            </Button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Consejo de seguridad:</strong> Usa una combinación de letras, números y símbolos. Evita usar
              información personal como fechas de nacimiento o nombres.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
