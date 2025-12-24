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

routes.delete("/:id", deleteCard);

routes.put("/:cardId/likes", likeCard);

routes.delete("/:cardId/likes", dislikeCard);

export default routes;