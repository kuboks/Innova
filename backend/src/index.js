import app from "./app.js";
import dotenv from 'dotenv';
import { sequelize } from "./database/sequelizeConnection.js";

dotenv.config();

const port = process.env.PORT || 8888

async function main() {
    try {
        app.listen(port)
        console.log('Servidor en linea en el puerto:', port)
    } catch (error) {
        
    }
}

main();