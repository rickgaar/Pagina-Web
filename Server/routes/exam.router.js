const express = require("express");
const router = express.Router();

const Roles = require("../data/roles.constant.json");




const {endExamValidator,idLessonValidator,createExamValidator,idInParamsValidator, createQuestionValidator, deleteQuestionValidator, createMatchQuestionAnswerValidator, createMultipleQuestionAnswerValidator, deleteAnswerValidator} = require("../validators/exam.validator");



const validateFields = require("../validators/index.middleware");

const {authentication, authorization} = require("../middlewares/auth.middlewares")

const examController = require("../controllers/exam.controller");
 

// Examen

router.get("/:identifier",authentication,authorization(Roles.USER), idInParamsValidator,validateFields,examController.findExamById);
router.post(["/","/:identifier"],authentication,authorization(Roles.ADMIN), idLessonValidator,createExamValidator, validateFields ,examController.saveExam);
router.delete("/:identifier",authentication,authorization(Roles.ADMIN), idLessonValidator,idInParamsValidator, validateFields,examController.deleteExamByID);
router.patch("/visibility/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, validateFields, examController.toggleVisibility );


router.patch("/begin/:identifier",authentication,authorization(Roles.USER), idInParamsValidator, validateFields, examController.beginExam);
router.patch("/end/:identifier",authentication,authorization(Roles.USER), endExamValidator, idInParamsValidator, validateFields, examController.endExam);


//Pregunta

router.get("/question/:identifier", authentication,authorization(Roles.USER),idInParamsValidator,validateFields,examController.examQuestions);
router.post("/questionMultiple/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, createQuestionValidator,validateFields ,examController.saveMultipleQuestion);
router.post("/questionMatch/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, createQuestionValidator,validateFields ,examController.saveMatchQuestion);
router.delete("/questionMultiple/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, deleteQuestionValidator,validateFields,examController.deleteMultipleQuestionByID);
router.delete("/questionMatch/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, deleteQuestionValidator,validateFields,examController.deleteMatchQuestionByID);

//Respuesta
router.post("/questionMultipleAnswer/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, createMultipleQuestionAnswerValidator,validateFields ,examController.saveMultipleQuestionAnswer);
router.post("/questionMatchAnswer/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, createMatchQuestionAnswerValidator,validateFields ,examController.saveMatchQuestionAnswer);
router.delete("/questionMultipleAnswer/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, deleteAnswerValidator,validateFields,examController.deleteMultipleQuestionAnswerByID);
router.delete("/questionMatchAnswer/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, deleteAnswerValidator,validateFields,examController.deleteMatchQuestionAnswerByID);


module.exports = router;