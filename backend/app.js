import express from "express";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authToken } from "./middleware/auth.js";
import { login } from "./controllers/users.js";
import { celebrate } from "celebrate";
import { validateUserSignin, validateUserSignup } from "./middleware/validation.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import { createUser } from "../backend/controllers/users.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

/* const { NODE_ENV, JWT_SECRET } = process.env; */

const app = express();
app.use(cors());
/* app.options('*', cors()); */

//se elimina por que ya tenemos autorizacion 
/* app.use((req, res, next) => {
  req.user = {
    _id: '690f52db791168ce6988edf1'
  };

  next();
}); */

app.use(express.json());

//conecta con el servidor de MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb")

app.use(requestLogger);
app.post('/signin', celebrate(validateUserSignin), login);
app.post('/signup', celebrate(validateUserSignup), createUser);
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use((req, res) => {
  res.status(404).json({ "message": "Recurso solicitado no encontrado" })
})
//se cancela por que se utiliza app.post para que acepte solo ese metodo
/* app.use("/signin", Login); */

app.use(errorLogger);

app.listen(3000, function () {
  console.log("Servidor encendido");
});
