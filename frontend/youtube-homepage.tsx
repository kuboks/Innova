import { useState } from "react"
import {
  Search,
  Mic,
  Bell,
  Plus,
  Menu,
  Home,
  Play,
  Clock,
  ThumbsUp,
  TrendingUp,
  Music,
  Film,
  Radio,
  Gamepad2,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("Todo")

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
      isLive: false,
    },
    {
      id: 2,
      title: "Vence A Neymar, Gana 500,000 Dólares",
      channel: "MrBeast",
      views: "9.7 M de visualizaciones",
      timestamp: "hace 4 horas",
      thumbnail: "/placeholder.svg?height=200&width=360",
      duration: "27:53",
      isLive: false,
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
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-xl font-medium">YouTube</span>
            <span className="text-xs text-gray-400 ml-1">MX</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
          <div className="flex items-center flex-1">
            <div className="flex items-center bg-[#121212] border border-gray-600 rounded-full overflow-hidden flex-1 max-w-xl">
              <Input
                placeholder="Buscar"
                className="bg-transparent border-0 text-white placeholder-gray-400 focus-visible:ring-0 px-4 py-2"
              />
              <Button variant="ghost" size="icon" className="bg-[#222222] hover:bg-gray-700 rounded-none px-6">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="ml-2 bg-[#222222] hover:bg-gray-700 rounded-full">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <Plus className="h-6 w-6" />
          </Button>
          <span className="text-sm">Crear</span>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 relative">
            <Bell className="h-6 w-6" />
            <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
              9+
            </Badge>
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 bg-[#0f0f0f] border-r border-gray-800 h-screen overflow-y-auto">
          <nav className="p-3">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 bg-gray-800">
                <Home className="h-5 w-5 mr-3" />
                Inicio
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Play className="h-5 w-5 mr-3" />
                Shorts
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <div className="h-5 w-5 mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
                </div>
                Suscripciones
              </Button>
            </div>

            <div className="mt-6 space-y-1">
              <div className="flex items-center px-3 py-2">
                <span className="text-sm font-medium">Tú</span>
                <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                  <span className="text-lg">{">"}</span>
                </Button>
              </div>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Clock className="h-5 w-5 mr-3" />
                Historial
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <div className="h-5 w-5 mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 border border-current"></div>
                </div>
                Listas de reproduc...
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Clock className="h-5 w-5 mr-3" />
                Ver más tarde
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <ThumbsUp className="h-5 w-5 mr-3" />
                Vídeos que me gus...
              </Button>
            </div>

            <div className="mt-6 space-y-1">
              <div className="px-3 py-2">
                <span className="text-sm font-medium">Explorar</span>
              </div>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <TrendingUp className="h-5 w-5 mr-3" />
                Tendencias
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Music className="h-5 w-5 mr-3" />
                Música
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Film className="h-5 w-5 mr-3" />
                Películas
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Radio className="h-5 w-5 mr-3" />
                En directo
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Gamepad2 className="h-5 w-5 mr-3" />
                Videojuegos
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Category Tabs */}
          <div className="sticky top-0 bg-[#0f0f0f] border-b border-gray-800 z-10">
            <div className="flex items-center gap-3 px-6 py-3 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`whitespace-nowrap rounded-lg ${
                    selectedCategory === category
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-[#272727] text-white hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Videos */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {mainVideos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative mb-3">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      width={360}
                      height={200}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {video.dubbed && (
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <span>🎭</span>
                        <span>Doblado</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white line-clamp-2 group-hover:text-gray-300">{video.title}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-400">{video.channel}</span>
                        {video.verified && (
                          <div className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {video.views && <span>{video.views} • </span>}
                        <span>{video.timestamp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Shorts Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
                <h2 className="text-xl font-medium">Shorts</h2>
                <Button variant="ghost" size="icon" className="ml-auto text-gray-400 hover:text-white">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {shortsVideos.map((short) => (
                  <div key={short.id} className="group cursor-pointer">
                    <div className="relative mb-2">
                      <Image
                        src={short.thumbnail || "/placeholder.svg"}
                        alt={short.title}
                        width={170}
                        height={300}
                        className="w-full aspect-[9/16] object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-gray-300">
                      {short.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{short.views}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
