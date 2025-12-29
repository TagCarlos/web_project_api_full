import express from "express";
import fs from "fs/promises";
import Card from "../models/card.js";
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from "../controllers/cards.js";
import { celebrate } from "celebrate";
import { validateCard } from "../middleware/validation.js";
import { authToken } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/", getCards);

routes.post("/", authToken, celebrate(validateCard), createCard);

routes.delete("/:id", authToken, deleteCard);

routes.put("/:cardId/likes", authToken, likeCard);

routes.delete("/:cardId/likes", authToken, dislikeCard);

export default routes;