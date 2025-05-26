import axios from "axios";
import { VideoCardComponent } from "./VideoCardComponent"
import { useEffect, useState } from "react";

export interface VideoItem {
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

export interface VideoData {
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

  useEffect(() => {
    const obtenerDatosIniciales = async () => {
      let response;
      setLoading(true);
      try {
        response = await axios.get(import.meta.env.VITE_URL_API_VIDEOSHOME, {
        params: {
          part: "snippet",
          type: 'video',
          chart: "mostPopular",
          regionCode: 'MX',
          maxResults: 16,
        },
      });
      listaVideos= response.data.data.items.map((item:VideoItem) => ({
        videoId: item.id.videoId,
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailDefault: item.snippet.thumbnails.default.url,
        thumbnailMedium: item.snippet.thumbnails.medium.url,
        thumbnailHigh: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
        publishTime: item.snippet.publishTime,
      }));
      setVideos(listaVideos);
      } catch (error) {
        console.error("Error al obtener los videos Home:", error);
      }
      setLoading(false)
    };

    obtenerDatosIniciales();
  }, []);
  
  useEffect(() => {
    if (!searchQuery) return;

    const obtenerDatosBusqueda = async () => {
      let response;
    setLoading(true);
    try {
      response = await axios.get(import.meta.env.VITE_URL_API_SEARCH, {
        params: {
          part: "snippet",
          q: searchQuery,
          type: "video",
          maxResults: 10,
        },
      });
      // Obtnecion de los datos que vienen de la la api
      listaVideos= response.data.data.items.map((item:VideoItem) => ({
        videoId: item.id.videoId,
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailDefault: item.snippet.thumbnails.default.url,
        thumbnailMedium: item.snippet.thumbnails.medium.url,
        thumbnailHigh: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
        publishTime: item.snippet.publishTime,
      }));
      setVideos(listaVideos);
    } catch (error) {
      console.error("Error al obtener los videos seach:", error);
    }
    setLoading(false);
    };

    obtenerDatosBusqueda();
  }, [searchQuery]);


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
