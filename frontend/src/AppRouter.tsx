import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"

import { AuthLayout } from "./auth/layout/AuthLayout"
import { LoginPage } from "./auth/pages/LoginPage"
import { SignupPage } from "./auth/pages/SignupPage"
import HomeLayout from "./home/layout/HomeLayout"
import axios from 'axios'

export const AppRouter = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Session activa',user);
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:8880/api/session", { withCredentials: true });
        
        setUser(response.data);
        
      } catch (error) {
        console.error("No hay sesión activa", error);
        setUser(null);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeLayout/>}/>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage/>} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>

    </BrowserRouter>
  )
}
