import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador"
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[A-Za-z0-9._~:/?%#\[\]@!$&'()*+,;=]+$/
      },
      message: "Lo sentimos url no aceptada"
    },
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Formato de email invalido o incorrecto"
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

export default User;