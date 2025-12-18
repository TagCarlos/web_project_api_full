import express from "express";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import mongoose from "mongoose";
import Login from "./src/components/Main/components/Login/Login.jsx";
import { celebrate } from "celebrate";
import { validateUserSignin, validateUserSignup } from "../backend/middleware/validation.js";
import { requestLogger, errorLogger } from "../backend/middleware/logger.js";

const app = express();

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
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);
app.post('/signin', celebrate(validateUserSignin), Login);
app.post('/signup', celebrate(validateUserSignup), createUser);

app.use((req, res) => {
  res.status(404).json({ "message": "Recurso solicitado no encontrado" })
})
//se cancela por que se utiliza app.post para que acepte solo ese metodo
/* app.use("/signin", Login); */

app.use(errorLogger);

app.listen(3000, function () {
  console.log("Servidor encendido");
});
