import express from 'express'
import loginRoutes from './routes/session.routes.js'
import cookieParser from 'cookie-parser'
// import videosRoutes from './routes/videos.routes.js'

const app= express()

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('Welcome to my api');
});

app.use('/api', loginRoutes);

// app.use('/api', videosRoutes);

export default app