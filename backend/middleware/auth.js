//middleware para la autorización
import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {

    /* const { NODE_ENV, JWT_SECRET } = process.env; */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {

        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.substring(7);
    let payload;



    try {
        payload = jwt.verify(token, "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b");

    } catch (error) {

        return res.status(401).json({ message: "Se requiere autorizacion" })
    }
    req.user = payload;
    next();
}