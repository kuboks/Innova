import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//Filtro de niveles de log
const nivelExacto = (nivelPermitido) => {
  return winston.format((info) => {
    return info.level === nivelPermitido ? info : false;
  })();
};



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

// Configuración de transportes con rotación diaria
const dailyRotateErrorTransport = new DailyRotateFile({
    filename: path.join(logDirError, 'error-%DATE%.log'), // Logs de error rotados diariamente
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d', // Mantener logs de errores por 14 días
    level: 'error',
    format: winston.format.combine(
        nivelExacto('error'),
        winston.format.timestamp(),
        winston.format.prettyPrint({ colorize: false })
    )
});

const dailyRotateInfoTransport = new DailyRotateFile({
    filename: path.join(logDirInfo, 'info-%DATE%.log'), // Logs de información rotados diariamente
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d', // Mantener logs de información por 14 días
    level: 'info',
    format: winston.format.combine(
        nivelExacto('info'),
        winston.format.timestamp(),
        winston.format.prettyPrint({ colorize: false })
    )
});


// Configuración de Winston
export const logger = winston.createLogger({
    level: 'info',
    levels: {
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
        new winston.transports.Console({level: 'error'}), // Transporte para la consola
    ],
});
