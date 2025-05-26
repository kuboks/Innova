import { Router } from 'express';

const videosRoutes = Router()

import { 
    getVideos,
    getVideosHome,
    postAgregarVideo,
    postAgregarFavorito,
    getFavoritos
} from '../controllers/videos.controller.js';

videosRoutes.get('/search', getVideos);

videosRoutes.get('/videoshome', getVideosHome);

videosRoutes.post('/agregarvideo', postAgregarVideo);

videosRoutes.post('/agregarfavorito', postAgregarFavorito);

videosRoutes.post('/favoritos', getFavoritos);

export default videosRoutes