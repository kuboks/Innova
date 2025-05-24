import mssql from 'mssql';
import dotenv from 'dotenv';


dotenv.config();

const connectionSettings={
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options:{
        encrypt: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0,  // Número mínimo de conexiones en el pool
        idleTimeoutMillis: 300000 // Tiempo máximo que una conexión puede estar inactiva antes de cerrarse
    }

};

export async function getConnection(){
    try {
        const pool = await mssql.connect(connectionSettings)
        return pool;
    } catch (error) {
        console.error(error);
    }
}