import path from 'path';
import winston from 'winston';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Verificar existencia de la carpeta de logs de erores
const logDirError = path.join(logDir, '/', 'error');
if (!fs.existsSync(logDirError)) {
    fs.mkdirSync(logDirError);
}

// Verificar existencia de la carpeta de logs de erores
const logDirInfo = path.join(logDir, '/', 'info');
if (!fs.existsSync(logDirInfo)) {
    fs.mkdirSync(logDirInfo);
}

// Formato personalizado
const customFormat = winston.format.printf(({ timestamp, level, message, stack, route }) => {
    return `
        ===== LOG ENTRY =====
        Timestamp: ${timestamp}
        Level: ${level.toUpperCase()}
        Message: ${message}
        Route: ${route || 'N/A'}
        Stack Trace: 
        ${stack || 'No stack trace available'}
        =====================
    `;
});

// Configuración de transportes con rotación diaria
const dailyRotateErrorTransport = new DailyRotateFile({
    filename: path.join(logDirError, 'error-%DATE%.log'), // Logs de error rotados diariamente
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d', // Mantener logs de errores por 14 días
    level: 'error',
});

const dailyRotateInfoTransport = new DailyRotateFile({
    filename: path.join(logDirInfo, 'info-%DATE%.log'), // Logs de información rotados diariamente
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d', // Mantener logs de información por 14 días
    level: 'info',
});


// Configuración de Winston
export const logger = winston.createLogger({
    level: {
        error:0,
        info: 1
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint({ colorize: false }) // Formato JSON indentado
    ),
    transports: [
        dailyRotateErrorTransport, // Transporte con rotación diaria
        dailyRotateInfoTransport,
        new winston.transports.Console(), // Transporte para la consola
    ],
});
