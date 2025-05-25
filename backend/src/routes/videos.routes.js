import { Router } from 'express';

const videosRoutes = Router()

import { 
    getVideos,
    getVideosHome,
    postAgregarVideo,
    postAgregarFavorito
} from '../controllers/videos.controller.js';

videosRoutes.get('/search', getVideos);

videosRoutes.get('/videoshome', getVideosHome);

videosRoutes.post('/agregarvideo', postAgregarVideo);

videosRoutes.post('/agregarfavorito', postAgregarFavorito);

export default videosRoutes