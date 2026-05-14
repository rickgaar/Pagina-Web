const {body, param} = require("express-validator");
const validators = {};

validators.createLessonValidator = [
param("identifier")
.optional()
.notEmpty().withMessage("Se requiere un id")
.isMongoId().withMessage("El id debe de ser un mongo id"),
body("area_estudio").notEmpty().withMessage("Se requiere colocar una area de estudio"),
body("nombre")
.notEmpty().withMessage("Se requiere colocar un nombre")
.isLength({max: 30}).withMessage("El maximo numero de caracteres del nombre es 30"),
body("imagen")
.notEmpty().withMessage("Se requiere colocar una imagen")
.isURL().withMessage("La imagen tiene que ser una url")
];
validators.idInParamsValidator = [
    param("identifier")
    .notEmpty().withMessage("Se requiere un id")
    .isMongoId().withMessage("El id debe de ser un mongo id")
]
module.exports = validators;