// utils/respuestas.js

/**
 * Función para estructurar respuestas estándar de la API
 * @param {boolean} success - Indica si la operación fue exitosa (true/false)
 * @param {string} message - Mensaje breve relacionado con la operación
 * @param {any} data - Datos devueltos por la operación (si corresponde)
 * @param {object|null} error - Información del error (si corresponde)
 * @returns {object} - Estructura estándar de respuesta
 */
export const mensajeRes = (success, message, data = null, error = null) => {
    return {
      success,
      message,
      data,
      error,
    };
  };