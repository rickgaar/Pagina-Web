const {body} = require("express-validator");
const validators = {};
const passwordRegexp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/; 

validators.registerValidator = [
    body("nombre")
    .notEmpty().withMessage("El nombre de usuario es requerido")
    .isLength({min: 4, max: 30}).withMessage("El usuario tiene que tener como minimo 4 caracteres y como maximo 30 caracteres"),
    body("correo")
    .notEmpty().withMessage("El correo es requerido")
    .isEmail().withMessage("El formato del correo es incorrecto"),
    body("password")
    .notEmpty().withMessage("El password es requerido")
    .matches(passwordRegexp).withMessage("El password tiene un formato incorrecto")
];


validators.changeAvatarValidator = [
    body("avatar")
    .notEmpty().withMessage("El avatar es requerido")
    .isURL().withMessage("El avatar tiene que ser una url")
];

validators.buyAvatarValidator = [
    body("avatar")
    .notEmpty().withMessage("El avatar es requerido")
    .isURL().withMessage("El avatar tiene que ser una url"),
    body("puntos")
    .notEmpty().withMessage("Es necesario saber cuanto vale el avatar")
    .isInt({min:0}).withMessage("Los puntos tienen que ser un numero entero mayor o igual a cero")
];


module.exports = validators;