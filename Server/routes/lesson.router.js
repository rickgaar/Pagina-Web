const express = require("express");
const router = express.Router();


const Roles = require("../data/roles.constant.json");

const {createLessonValidator, idInParamsValidator} = require("../validators/lesson.validators");
const validateFields = require("../validators/index.middleware");


const {authentication, authorization} = require("../middlewares/auth.middlewares")

const lessonController = require("../controllers/lesson.controller");
 

router.get("/", authentication,authorization(Roles.USER),lessonController.findAll);



router.get("/topics/:identifier",authentication,authorization(Roles.USER), idInParamsValidator,validateFields,lessonController.lessonTopics);

router.get("/exams/:identifier",authentication,authorization(Roles.USER), idInParamsValidator,validateFields,lessonController.lessonExams);


router.post(["/","/:identifier"], authentication, authorization(Roles.ADMIN),createLessonValidator, validateFields ,lessonController.save);

router.delete("/:identifier", authentication,authorization(Roles.ADMIN),idInParamsValidator, validateFields,lessonController.deleteByID)
router.patch("/visibility/:identifier", authentication,authorization(Roles.ADMIN),idInParamsValidator, validateFields, lessonController.toggleVisibility );

router.patch("/begin/:identifier",authentication,authorization(Roles.USER), idInParamsValidator, validateFields, lessonController.beginLesson);
router.patch("/end/:identifier",authentication,authorization(Roles.USER), idInParamsValidator, validateFields, lessonController.endLesson);



module.exports = router;