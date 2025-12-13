import express from "express";
import fs from "fs/promises";
import User from "../models/user.js"
import { createUser, getUsers, getUserById, updateProfile, updateAvatar } from "../controllers/users.js";

const routes = express.Router();

routes.get("/:id", getUserById);

routes.get("/", getUsers);

// se elimina por que se creo directo en app.js
/* routes.post("/", createUser); */

routes.patch("/me", updateProfile);

routes.patch("/me/avatar", updateAvatar);

export default routes;