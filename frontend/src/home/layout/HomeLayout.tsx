import { HeaderComponent } from "../components/HeaderComponent";
import { VideoGridComponent } from "../components/VideoGridComponent";

export default function HomeLayout() {

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponent />
      <main className="pt-16">
        <VideoGridComponent />
      </main>
    </div>
  )
}