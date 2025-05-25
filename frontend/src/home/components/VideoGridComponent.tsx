import axios from "axios";
import { VideoCardComponent } from "./VideoCardComponent"
import { useEffect, useState } from "react";
export function VideoGridComponent({ searchQuery = "" }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          // Llamada a API2: videos con parámetros de búsqueda
          response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
              part: "snippet",
              q: searchQuery,
              type: "video",
              maxResults: 10,
            },
          });
          console.log('busqueda',response.data)
          // Transformamos la respuesta para obtener la estructura que necesita nuestro VideoCardComponent
          setVideos([]);
        } else {
          // Llamada a API1: videos random o populares para Home
          response = await axios.get("http://localhost:8880/api/videoshome", {
            params: {
              part: "snippet",
              type: 'video',
              chart: "mostPopular",
              regionCode: 'MX',
              maxResults: 16,
            },
          });
          console.log('videoshome', response.data.data.items)
          setVideos([]);
        }
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
      setLoading(false);
    };

    fetchVideos();
  }, [searchQuery]); // Se vuelve a ejecutar el efecto si cambia la búsqueda

  if (loading) return <p>Cargando videos...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCardComponent key={video} video={video} />
        ))}
      </div>
    </div>
  )
}
