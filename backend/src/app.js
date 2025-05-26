import express from 'express'
import loginRoutes from './routes/session.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import videosRoutes from './routes/videos.routes.js'

const app= express()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:8880', 'http://localhost:8888', 'http://localhost:5173', 'https://lucid-elegance-production.up.railway.app'],
    methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));


app.get('/', (req, res)=>{
    res.send('Welcome to my api');
});

app.use('/api', loginRoutes);

app.use('/api', videosRoutes);

export default app