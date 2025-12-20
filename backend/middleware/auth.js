//middleware para la autorización
export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.substring(7);
    let payload;

    try {
        payload = jwt.verify(token, "secretpassword");
    } catch (error) {
        return res.status(401).json({ message: "Se requiere autorizacion" })
    }
    req.user = payload;
    next();
}