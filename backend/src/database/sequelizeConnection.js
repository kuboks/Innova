import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import { logger } from "../config/logger.js";
import initModels from "../models/init-models.js";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE_LOCAL, process.env.DB_USER_LOCAL, process.env.DB_PASSWORD_LOCAL, {
    host: process.env.DB_SERVER_LOCAL,
    // port: 5432,  Ajusta según tu base de datos
    dialect: 'mssql', // Cambia a 'mysql', 'mssql', etc.
    logging: (msg) => logger.info(msg), // Puedes usar 'false' para desactivar logs
    timezone: '+00:00', // Define la zona horaria (UTC en este caso)
    pool: {
        max: 10, // Máximo de conexiones
        min: 2, // Mínimo de conexiones
        acquire: 30000, // Tiempo máximo para intentar conexión
        idle: 10000 // Tiempo de inactividad antes de cerrar conexión
    },
    retry: {
        max: 5 // Intentará reconectarse hasta 5 veces en caso de fallo
    },
    define: {
        timestamps: false, // Agrega 'createdAt' y 'updatedAt' a los modelos
        freezeTableName: true, // Evita que Sequelize pluralice los nombres de las tablas
        underscored: false // Usa guiones bajos en lugar de camelCase
    },
    benchmark: true, // Muestra el tiempo de ejecución de cada consulta
    query: {
        raw: false // Devuelve los resultados sin procesar
    }
});
const models = initModels(sequelize);

export { sequelize, models };