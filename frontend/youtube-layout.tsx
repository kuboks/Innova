import { useState } from "react"
import { YouTubeHeader } from "./components/youtube-header"
import { YouTubeSidebar } from "./components/youtube-sidebar"
import { CategoryTabs } from "./components/category-tabs"
import { MainVideos } from "./components/main-videos"
import { ShortsSection } from "./components/shorts-section"

export default function YouTubeLayout() {
  const [selectedCategory, setSelectedCategory] = useState("Todo")

  // Data de ejemplo - puedes reemplazar esto con datos reales
  const categories = [
    "Todo",
    "Música",
    "Videojuegos",
    "The Living Tombstone",
    "Mixes",
    "Pódcasts",
    "Five Nights at Freddy's",
    "Series de televisión",
    "Álbumes",
  ]

  const mainVideos = [
    {
      id: 1,
      title: "Mix: The Living Tombstone - Sunburn",
      channel: "The Living Tombstone y más",
      timestamp: "Actualizada hoy",
      thumbnail: "/placeholder.svg?height=200&width=360",
      duration: "Mix",
    },
    {
      id: 2,
      title: "Vence A Neymar, Gana 500,000 Dólares",
      channel: "MrBeast",
      views: "9.7 M de visualizaciones",
      timestamp: "hace 4 horas",
      thumbnail: "/placeholder.svg?height=200&width=360",
      duration: "27:53",
      verified: true,
      dubbed: true,
    },
  ]

  const shortsVideos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    thumbnail: `/placeholder.svg?height=300&width=170`,
    title: `Short Video ${i + 1}`,
    views: `${Math.floor(Math.random() * 1000)}K views`,
  }))

  return (
    <div className="min-h-screen">
      {/* Header */}
      <YouTubeHeader />

      <div className="flex">
        {/* Sidebar */}
        <YouTubeSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Content Area */}
          <div className="p-6">
            {/* Main Videos */}
            <MainVideos videos={mainVideos} />

            {/* Shorts Section */}
            <ShortsSection shorts={shortsVideos} />
          </div>
        </main>
      </div>
    </div>
  )
}
