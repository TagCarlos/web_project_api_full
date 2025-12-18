export const errorHandler = (err, req, res, next) => {
    console.error('Error interno:', err);

    // Respuesta para errores específicos
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: "Datos inválidos"
        });
    }

    // Error genérico
    res.status(500).json({
        message: "Error interno del servidor"
    });
};