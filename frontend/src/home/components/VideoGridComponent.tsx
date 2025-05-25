import axios from "axios";
import { VideoCardComponent } from "./VideoCardComponent"
import { useEffect, useState } from "react";

interface VideoItem {
  id: { videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface VideoData {
  videoId: string;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailDefault: string;
  thumbnailMedium: string;
  thumbnailHigh: string;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export function VideoGridComponent({ searchQuery = "" }) {

  let listaVideos=[]
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     setLoading(true);
  //     try {
  //       let response;
  //       if (searchQuery) {
  //         // Peticion de consulta con criterio de busqueda
  //         response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
  //           params: {
  //             part: "snippet",
  //             q: searchQuery,
  //             type: "video",
  //             maxResults: 10,
  //           },
  //         });
  //         // Obtnecion de los datos que vienen de la la api
  //         listaVideos= response.data.data.items.map((item:VideoItem) => ({
  //           videoId: item.id.videoId,
  //           publishedAt: item.snippet.publishedAt,
  //           channelId: item.snippet.channelId,
  //           title: item.snippet.title,
  //           description: item.snippet.description,
  //           thumbnailDefault: item.snippet.thumbnails.default.url,
  //           thumbnailMedium: item.snippet.thumbnails.medium.url,
  //           thumbnailHigh: item.snippet.thumbnails.high.url,
  //           channelTitle: item.snippet.channelTitle,
  //           liveBroadcastContent: item.snippet.liveBroadcastContent,
  //           publishTime: item.snippet.publishTime,
  //         }));
  //       } else {
  //         // Llamada a API1: videos random o populares para Home
  //         response = await axios.get("http://localhost:8880/api/videoshome", {
  //           params: {
  //             part: "snippet",
  //             type: 'video',
  //             chart: "mostPopular",
  //             regionCode: 'MX',
  //             maxResults: 16,
  //           },
  //         });
  //         console.log('videoshome', response.data.data.items)
          
  //         listaVideos= response.data.data.items.map((item:VideoItem) => ({
  //           videoId: item.id.videoId,
  //           publishedAt: item.snippet.publishedAt,
  //           channelId: item.snippet.channelId,
  //           title: item.snippet.title,
  //           description: item.snippet.description,
  //           thumbnailDefault: item.snippet.thumbnails.default.url,
  //           thumbnailMedium: item.snippet.thumbnails.medium.url,
  //           thumbnailHigh: item.snippet.thumbnails.high.url,
  //           channelTitle: item.snippet.channelTitle,
  //           liveBroadcastContent: item.snippet.liveBroadcastContent,
  //           publishTime: item.snippet.publishTime,
  //         }));
  //       }
  //       setVideos(listaVideos);
  //     } catch (error) {
  //       console.error("Error al obtener los videos:", error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchVideos();
  // }, [searchQuery]); // Se vuelve a ejecutar el efecto si cambia la búsqueda

  if (loading) return <p>Cargando videos...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(videos).map((video:VideoData) => (
          <VideoCardComponent key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  )
}
