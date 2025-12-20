import validator from "validator";
import celebrate from "celebrate";

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

//valor de validación de la propiedad link
celebrate.Joi.string().required().custom(validateURL);

// Para creacion de cartas
export const validateCard = {
    body: celebrate.Joi.object().keys({
        name: celebrate.Joi.string().required().min(2).max(30),
        link: celebrate.Joi.string().required().custom(validateURL)
    })
};

// Para registro de usuarios
export const validateUserSignup = {
    body: celebrate.Joi.object().keys({
        name: celebrate.Joi.string().min(2).max(30),
        about: celebrate.Joi.string().min(2).max(30),
        avatar: celebrate.Joi.string().custom(validateURL),
        email: celebrate.Joi.string().required().email(),
        password: celebrate.Joi.string().required()
    })
};

// Para login
export const validateUserSignin = {
    body: celebrate.Joi.object().keys({
        email: celebrate.Joi.string().required().email(),
        password: celebrate.Joi.string().required()
    })
};
