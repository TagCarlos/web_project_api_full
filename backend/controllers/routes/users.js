import express from "express";
import fs from "fs/promises";
import User from "../models/user.js"
import { createUser, getUsers, getUserById, updateProfile, updateAvatar, authToken, getCurrentUser } from "../controllers/users.js";

const routes = express.Router();

routes.get("/:id", authToken, getUserById);

routes.get("/", authToken, getUsers);

// se elimina por que se creo directo en app.js
/* routes.post("/", createUser); */

routes.patch("/me", authToken, updateProfile);

routes.patch("/me/avatar", authToken, updateAvatar);

routes.get("/me", authToken, getCurrentUser);

export default routes;