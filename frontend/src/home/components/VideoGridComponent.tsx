import { VideoCardComponent } from "./VideoCardComponent"

const mockVideos = [
  {
    id: "1",
    title: "James Corden Comes Clean About Carpool Karaoke",
    channel: "The Late Late Show with James Corden",
    views: "5M views",
    timestamp: "14 hours ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "8:45",
  },
  {
    id: "2",
    title: "KSI WILL FIGHT JAKE PAUL? BEHZINGA ON FUTURE OF YOU...",
    channel: "Sidemen",
    views: "2.1M views",
    timestamp: "14 hours ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "12:30",
  },
  {
    id: "3",
    title: "JAKE PAUL VS ANESONGIB 🥊 LIVE WEIGH IN MIAMI FIGHT",
    channel: "Jake Paul",
    views: "378K views",
    timestamp: "21 hours ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "45:12",
  },
  {
    id: "4",
    title: "Coronavirus: Death toll rises as virus spreads to every Chinese r...",
    channel: "BBC News",
    views: "1M views",
    timestamp: "13 hours ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:22",
  },
  {
    id: "5",
    title: "React Tutorial for Beginners - Complete Course",
    channel: "Programming with Mosh",
    views: "890K views",
    timestamp: "2 days ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "2:15:30",
  },
  {
    id: "6",
    title: "10 JavaScript Tips and Tricks You Should Know",
    channel: "Web Dev Simplified",
    views: "456K views",
    timestamp: "1 day ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:45",
  },
]

export function VideoGridComponent() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockVideos.map((video) => (
          <VideoCardComponent key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
