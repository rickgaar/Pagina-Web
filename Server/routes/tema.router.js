const express = require("express");
const router = express.Router();

const Roles = require("../data/roles.constant.json");


const {createTemaValidator, idInParamsValidator, idInBodyValidator} = require("../validators/tema.validators");

const validateFields = require("../validators/index.middleware");

const {authentication, authorization} = require("../middlewares/auth.middlewares")

const temaController = require("../controllers/tema.controller");
 


router.get("/:identifier", authentication,authorization(Roles.USER),idInParamsValidator,validateFields,temaController.findById);
router.post(["/","/:identifier"], authentication,authorization(Roles.ADMIN),createTemaValidator,idInBodyValidator, validateFields ,temaController.save);
router.delete("/:identifier", authentication,authorization(Roles.ADMIN),idInParamsValidator,idInBodyValidator, validateFields,temaController.deleteByID);
router.patch("/visibility/:identifier",authentication,authorization(Roles.ADMIN), idInParamsValidator, validateFields, temaController.toggleVisibility );

router.patch("/begin/:identifier",authentication,authorization(Roles.USER), idInParamsValidator, validateFields, temaController.beginTema);
router.patch("/end/:identifier",authentication,authorization(Roles.USER), idInParamsValidator, validateFields, temaController.endTema);



module.exports = router;