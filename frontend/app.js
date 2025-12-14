import express from "express";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import mongoose from "mongoose";
import Login from "./src/components/Main/components/Login/Login.jsx";

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

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use((req, res) => {
  res.status(404).json({ "message": "Recurso solicitado no encontrado" })
})
//se cancela por que se utiliza app.post para que acepte solo ese metodo
/* app.use("/signin", Login); */

app.post('/signin', Login);
app.post('/signup', createUser);

app.listen(3000, function () {
  console.log("Servidor encendido");
});
