import express from "express";
import fs from "fs/promises";
import User from "../models/user.js"
import { createUser, getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser } from "../controllers/users.js";
import { authToken } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/me", authToken, getCurrentUser);
routes.patch("/me", authToken, updateProfile);
routes.patch("/me/avatar", authToken, updateAvatar);
routes.get("/", authToken, getUsers);
routes.get("/:id", authToken, getUserById);


// se elimina por que se creo directo en app.js
/* routes.post("/", createUser); */




export default routes;