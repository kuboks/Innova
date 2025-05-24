import React from "react"
import { useState } from "react"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import Image from "@/assets/placeholder.svg"

interface Video {
  id: string
  title: string
  channel: string
  views: string
  timestamp: string
  thumbnail: string
  duration: string
}

interface VideoCardProps {
  video: Video
}

export function VideoCardComponent({ video }: VideoCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking favorite button
    setIsFavorite(!isFavorite)
  }

  const handleVideoClick = () => {
    alert(`🎬 Video: ${video.title}\n📺 Canal: ${video.channel}\n👀 Vistas: ${video.views}\n⏰ ${video.timestamp}`)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-0" onClick={handleVideoClick}>
        {/* Thumbnail */}
        <div className="relative aspect-video group">
          <img src={Image} alt={video.title} className="object-cover" />

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-red/80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-black/60 hover:bg-black/80 border-0"
              onClick={toggleFavorite}
            >
              <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-white"}`} />
            </Button>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-3">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{video.channel.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm line-clamp-2 mb-1 flex-1">{video.title}</h3>
                {/* Mobile favorite button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0 md:hidden"
                  onClick={toggleFavorite}
                >
                  <Star
                    className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{video.channel}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{video.views}</span>
                <span>•</span>
                <span>{video.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
