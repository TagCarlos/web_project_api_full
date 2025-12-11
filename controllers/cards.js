import Card from "../models/card.js";

//GET devuelve todas las tarjetas
export async function getCards(req, res) {
  const cards = await fs.readFile("data/cards.json", "utf-8");
  res.send(cards)
};

//POST crea nueva tarjeta
export async function createCard(req, res) {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });
    res.status(201).send(card)
  } catch (error) {
    res.status(400).send({ message: "Error al crear tarjeta" })
  }
};

//DELETE borra la carta por Id de usuario
export async function deleteCardById(req, res) {
  try {
    const { id: cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId).orFail();
    res.status(200).send(card);

  } catch (error) {
    if (error === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Tarjeta no encontrada" })
    }
    res.status(500).send({ message: "Error del servidor" });
  }
};

//PUT agrega like a la carta
export const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
      { new: true },
    ).orFail();
    res.status(200).send(card);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    if (error.name === 'CastError') {
      return res.status(400).send({ message: "ID de tarjeta inválido" });
    }
    res.status(500).send({ message: "Error del servidor" });
  };
};

//DELETE quita like a la carta
export const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // elimina _id del array
      { new: true },
    ).orFail();
    res.status(200).send(card);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    if (error.name === 'CastError') {
      return res.status(400).send({ message: "ID de tarjeta inválido" });
    }
    res.status(500).send({ message: "Error del servidor" });
  }

}
