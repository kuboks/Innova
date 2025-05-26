import { BrowserRouter, Routes, Route, Navigate } from "react-router"

import { AuthLayout } from "./auth/layout/AuthLayout"
import { LoginPage } from "./auth/pages/LoginPage"
import { SignupPage } from "./auth/pages/SignupPage"
import HomeLayout from "./home/layout/HomeLayout"
import ResetPassword from "./auth/pages/ResetPassword"

export const AppRouter = () => {
  

  return (
    <BrowserRouter key={window.location.pathname}>
      <Routes>
        <Route index element={<HomeLayout/>}/>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage/>} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/recuperar-password" element={<ResetPassword/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>

    </BrowserRouter>
  )
}
