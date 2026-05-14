const {body, param} = require("express-validator");
const validators = {};

validators.createTemaValidator = [
param("identifier")
.optional()
.notEmpty().withMessage("Se requiere un id")
.isMongoId().withMessage("El id debe de ser un mongo id"),
body("contenido").notEmpty().withMessage("Se requiere colocar contenido")
.isLength({max: 2500}).withMessage("El contenido puede tener como maximo 2500 caracteres"),
body("nombre")
.notEmpty().withMessage("Se requiere colocar un nombre")
.isLength({max: 30}).withMessage("El maximo numero de caracteres del nombre es 30"),
body("ponderacion")
.isInt({min:0}).withMessage("La ponderacion tiene que ser un numero entero"),
body("imagen").optional().toArray()
.isArray({max:5}).withMessage("Las imagenes tienen que ser un arreglo y tiene que tener un tamano maximo de 5"),
body("imagen.*")
.not()
.isArray()
.isURL().withMessage("Tiene que ser un arreglo de urls")
]


validators.idInParamsValidator = [
    param("identifier")
    .notEmpty().withMessage("Se requiere un id")
    .isMongoId().withMessage("El id debe de ser un mongo id")
]


validators.idInBodyValidator = [
    body("idLeccion")
    .notEmpty().withMessage("Se requiere un id")
    .isMongoId().withMessage("El id debe de ser un mongo id")
]


module.exports = validators;