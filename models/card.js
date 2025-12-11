import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[A-Za-z0-9._~:/?%#\[\]@!$&'()*+,;=]+$/
      },
      message: "Lo sentimos url no aceptada"
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Card = mongoose.model("card", cardSchema);
export default Card;