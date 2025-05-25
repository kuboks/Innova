import { useState } from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { VideoGridComponent } from "../components/VideoGridComponent";

export default function HomeLayout() {
const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-background">
      <HeaderComponent setSearchQuery={setSearchQuery}/>
      <main className="pt-16">
        <VideoGridComponent searchQuery={searchQuery}/>
      </main>
    </div>
  )
}