import validator from "validator";
import celebrate from "celebrate";

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

//valor de validación de la propiedad link
Joi.string().required().custom(validateUrl);

// Para creacion de cartas
export const validateCard = {
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateURL)
    })
};

// Para registro de usuarios
export const validateUserSignup = {
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateURL),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
};

// Para login
export const validateUserSignin = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
};
