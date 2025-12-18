import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../../frontend/src/middleware/errorHandler.js";

//GET devuelve todos los usuarios
export async function getUsers(req, res) {
  const users = await fs.readFile("data/users.json", "utf-8");
  res.send(users)
}

//GET devuelve usuario por Id
export async function getUserById(req, res) {
  const usersData = await fs.readFile("data/users.json", "utf-8");
  const users = JSON.parse(usersData);
  const usuario = users.find((user) => user._id === req.params.id)

  if (usuario !== undefined) {
    res.send(usuario)
    return
  }
  res.status(404).send({ "message": "ID de usuario no encontrado" })
}

//POST crea nuevo usuario
export async function createUser(req, res, next) {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await User.create({ name, about, avatar, email, password: hashedPassword });
    res.status(201).send(users);
  }
  catch (err) {
    /* res.status(400).send({ message: "Este usuario ya está registrado" }) */
    next(err);
  }
}

//PATCH  actualiza el perfil
export async function updateProfile(req, res, next) {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id,
      { name, about },
      { new: true, runValidators: true }).orFail();
    res.status(200).send(user);
  } catch (err) {
    next(err);
    /* if (error.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: "Datos de entrada inválidos" });
    }
    res.status(500).send({ message: "Error del servidor" }); */
  };
};

//PATCH actualiza el avatar
export async function updateAvatar(req, res, next) {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id,
      { avatar },
      { new: true, runValidators: true }).orFail();
    res.status(200).send(user);
  } catch (err) {
    next(err);
    /* if (error.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Avatar no encontrado" });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: "Datos de entrada inválidos" });
    }
    res.status(500).send({ message: "Error del servidor" }); */
  };
};

//autentifica el correo y contraseña 
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).send({ message: "Correo electronico y/o contraseña incorrectos" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Correo electronico y/o contraseña incorrectos" })
    }

    const token = jwt.sign({ _id: user._id }, "secretpassword", { expiresIn: "7d" });
    res.send({ token });

  } catch (err) {
    next(err);
    /* res.status(500).send({ message: "Error del servidor" }) */
  }
}

//GET para recibir información sobre el usuario actual
export async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.send({ data: user });
  } catch (err) {
    next(err);
    /* res.status(500).send({ message: "Error en el servidor" }) */
  }
}