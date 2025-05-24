import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8888

// app.listen(process.env.PORT||8888)
app.listen(port)
console.log('Servidor en linea en el puerto:', port)