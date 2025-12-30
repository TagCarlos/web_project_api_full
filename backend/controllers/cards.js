import Card from "../models/card.js";
import fs from "fs/promises";

//GET devuelve todas las tarjetas
/* export async function getCards(req, res) {
  const cards = await fs.readFile("data/cards.json", "utf-8");
  res.send(cards)
}; */
export async function getCards(req, res) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las tarjetas" });
  }
}

//POST crea nueva tarjeta
export async function createCard(req, res, next) {

  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });
    res.status(201).send(card)
  } catch (err) {
    next(err);
    /* res.status(400).send({ message: "Error al crear tarjeta" }) */
  }
};

//DELETE borra la carta si eres dueño de la carta
export async function deleteCard(req, res, next) {

  try {
    const { id: cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findById(cardId).orFail();

    if (card.owner.toString() !== userId.toString()) {
      return res.status(403).send({ message: "No tienes permiso para eliminar la tarjeta" });
    }
    await Card.findByIdAndDelete(cardId);
    res.status(200).send(card); //cambiar send por el mensaje de que se elimino con exito
  } catch (err) {

    next(err);

    /* if (error.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Tarjeta no encontrada" })
    }
    res.status(500).send({ message: "Error del servidor" }); */
  }
};

//PUT agrega like a la carta
export const likeCard = async (req, res, next) => {

  try {

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
      { new: true },
    ).orFail();
    res.status(200).send(card);
  } catch (err) {

    next(err);
    /*  if (error.name === 'DocumentNotFoundError') {
       return res.status(404).send({ message: "Tarjeta no encontrada" });
     }
     if (error.name === 'CastError') {
       return res.status(400).send({ message: "ID de tarjeta inválido" });
     }
     res.status(500).send({ message: "Error del servidor" }); */
  };
};

//DELETE quita like a la carta
export const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // elimina _id del array
      { new: true },
    ).orFail();
    res.status(200).send(card);
  } catch (err) {
    next(err);
    /* if (error.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    if (error.name === 'CastError') {
      return res.status(400).send({ message: "ID de tarjeta inválido" });
    }
    res.status(500).send({ message: "Error del servidor" }); */
  }

}
