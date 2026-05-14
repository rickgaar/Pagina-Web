const { body, param } = require("express-validator");
const validators = {};

validators.createExamValidator = [
    param("identifier")
        .optional()
        .notEmpty().withMessage("Se requiere un id")
        .isMongoId().withMessage("El id debe de ser un mongo id"),
    body("descripcion").notEmpty().withMessage("Se requiere colocar una descripcion")
        .isLength({ max: 400 }).withMessage("La descripcion puede tener como maximo 400 caracteres"),
    body("nombre")
        .notEmpty().withMessage("Se requiere colocar un nombre")
        .isLength({ max: 30 }).withMessage("El maximo numero de caracteres del nombre es 30"),
    body("ponderacion")
        .isInt({ min: 0 }).withMessage("La ponderacion tiene que ser un numero entero"),
    body("tipo")
        .notEmpty().withMessage("Se requiere colocar un tipo")
        .isLength({ max: 10 }).withMessage("El maximo numero de caracteres del nombre es 10"),
    body("temaId").toArray()
        .isArray({ max: 10 }).withMessage("Los temas tienen que ser un arreglo y tiene que tener un tamano maximo de 10"),
    body("temaId.*")
        .not()
        .isArray()
        .isMongoId().withMessage("Tiene que ser un arreglo de ids")
]


validators.idInParamsValidator = [
    param("identifier")
        .notEmpty().withMessage("Se requiere un id")
        .isMongoId().withMessage("El id debe de ser un mongo id")
]

validators.createQuestionValidator = [
    body("enunciado").notEmpty().withMessage("Se requiere colocar una descripcion")
        .isLength({ max: 250 }).withMessage("La descripcion puede tener como maximo 250 caracteres"),
    body("idPregunta")
        .optional()
        .notEmpty().withMessage("Se requiere el id de la pregunta")
        .isMongoId().withMessage("El id de la pregunta debe de ser un mongo id"),
    body("idTema")
        .notEmpty().withMessage("Se requiere el id del tema")
        .isMongoId().withMessage("El id del tema debe de ser un mongo id"),
    body("imagenPregunta").optional()
        .notEmpty().withMessage("Se necesita una imagen")
        .isURL().withMessage("La imagen tiene que ser una URL")
]


validators.idLessonValidator = [
    body("idLeccion")
    .notEmpty().withMessage("Se requiere un id")
    .isMongoId().withMessage("El id debe de ser un mongo id")
]

validators.endExamValidator=[
    body("fecha_hora_inicio")
    .notEmpty().withMessage("Se requiere la fecha de inicio del examen")
    .isISO8601().toDate().withMessage("Tien que ser un objeto de tipo Date"),
    body("calificacion")
    .notEmpty().withMessage("Se requiere una calificacion")
    .isFloat({min:0,max:10}).withMessage("La calificacion debe de ser un numero entre 0 y 10")
]


validators.deleteQuestionValidator = [
    body("idPregunta")
        .notEmpty().withMessage("Se requiere el id de la pregunta")
        .isMongoId().withMessage("El id de la pregunta debe de ser un mongo id")
]
validators.createMultipleQuestionAnswerValidator = [
    body("descripcion").notEmpty().withMessage("Se requiere colocar una descripcion")
        .isLength({ max: 250 }).withMessage("La descripcion puede tener como maximo 120 caracteres"),
    body("idRespuesta")
        .optional()
        .notEmpty().withMessage("Se requiere el id de la respuesta")
        .isMongoId().withMessage("El id de la respuesta debe de ser un mongo id"),
    body("idPregunta")
        .notEmpty().withMessage("Se requiere el id de la pregunta")
        .isMongoId().withMessage("El id de la pregunta debe de ser un mongo id"),
    body("imagenRespuesta").optional()
        .notEmpty().withMessage("Se necesita una imagen")
        .isURL().withMessage("La imagen tiene que ser una URL"),
    body("correcta")
    .notEmpty().withMessage("Se necesita saber si la respuesta es correcta o incorrecta")
    .isInt({min:0,max:1}).withMessage("Correcta tiene que ser un numero entre 1(correcta) y 0(incorrecta)")
]

validators.createMatchQuestionAnswerValidator = [
    body("descripcion").notEmpty().withMessage("Se requiere colocar una descripcion")
        .isLength({ max: 250 }).withMessage("La descripcion puede tener como maximo 120 caracteres"),
    body("idRespuesta")
        .optional()
        .notEmpty().withMessage("Se requiere el id de la respuesta")
        .isMongoId().withMessage("El id de la respuesta debe de ser un mongo id"),
    body("idPregunta")
        .notEmpty().withMessage("Se requiere el id de la pregunta")
        .isMongoId().withMessage("El id de la pregunta debe de ser un mongo id"),
    body("imagenRespuesta").optional()
        .notEmpty().withMessage("Se necesita una imagen")
        .isURL().withMessage("La imagen tiene que ser una URL"),
    body("tipo")
    .notEmpty().withMessage("Se necesita el tipo de la respuesta")
    .isInt({min:1, max: 5}).withMessage("El tipo tiene que ser un entero entre 1 y 5")
]

validators.deleteAnswerValidator = [
    body("idPregunta")
        .notEmpty().withMessage("Se requiere el id de la pregunta")
        .isMongoId().withMessage("El id de la pregunta debe de ser un mongo id"),
    body("idRespuesta")
        .notEmpty().withMessage("Se requiere el id de la respuesta")
        .isMongoId().withMessage("El id de la respuesta debe de ser un mongo id")
]

module.exports = validators;