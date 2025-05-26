import { useEffect, useState } from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { VideoGridComponent } from "../components/VideoGridComponent";
import axios from "axios";

export default function HomeLayout() {
const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {

    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:8880/api/session", { withCredentials: true });
        if (response.data.success){
          let nombreUsuario= response.data.data.usuario
          let idUsuario= response.data.data.id_usuario
          localStorage.setItem('usuario', nombreUsuario)
          sessionStorage.setItem('idUsuario', idUsuario)
        }
        return;
      } catch (error) {
      }
    };
    checkSession();
  });

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <main className="pt-16">
        <VideoGridComponent searchQuery={searchQuery}/>
      </main>
    </div>
  )
}