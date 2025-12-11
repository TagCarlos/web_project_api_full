import express from "express";
import fs from "fs/promises";
import Card from "../models/card.js";
import { getCards, createCard, deleteCardById, likeCard, dislikeCard } from "../controllers/cards.js";

const routes = express.Router();

routes.get("/", getCards);

routes.post("/", createCard);

routes.delete("/:id", deleteCardById);

routes.put("/:cardId/likes", likeCard);

routes.delete("/:cardId/likes", dislikeCard);

export default routes;