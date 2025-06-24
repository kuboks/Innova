import { logger } from "../config/logger.js"; // Asegúrate de importar Winston correctamente
import { mensajeRes } from '../utils/respuesta.js'

const errorMiddleware = (err, req, res, next) => {
    // Determinar el código de estado HTTP
    const statusCode = err.statusCode || 500;

    //Registro del error en el logger
    logger.error({
        method: req.method,
        message: err.message,
        data: req.body,
        route: req.originalUrl,
        stack: err.stack,
        ip: req.ip,
    })

    // Enviar una respuesta estructurada al cliente
    if (statusCode ===500) {
        res.status(statusCode).json(
        mensajeRes(
                false,
                "Ocurrió un error en el servidor",
                null,
                process.env.NODE_ENV === "development" ? err.message : "Error interno"
            ))
    }else{
        res.status(statusCode).json(
            mensajeRes(
                false,
                err.message,
                null,
                process.env.NODE_ENV === "development" ? err.message : "Error interno"
            ))
    }
};

export default errorMiddleware;