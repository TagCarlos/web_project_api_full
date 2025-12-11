import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[A-Za-z0-9._~:/?%#\[\]@!$&'()*+,;=]+$/
      },
      message: "Lo sentimos url no aceptada"
    },
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