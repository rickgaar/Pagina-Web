const express = require("express");
const router = express.Router();


const {registerValidator, changeAvatarValidator, buyAvatarValidator} = require("../validators/auth.validator");

const validateFields = require("../validators/index.middleware");
const authController = require("../controllers/auth.controller");

const {authentication} = require("../middlewares/auth.middlewares");

router.post("/register", registerValidator, validateFields, authController.register)
router.post("/login", authController.login);

router.get("/ranking",authController.ranking);

router.get("/rankingPosition",authentication,authController.rankingPosition);
router.get("/whoami", authentication, authController.whoAmI);
router.patch("/buyAvatar", authentication, buyAvatarValidator, validateFields,authController.buyAvatar );
router.patch("/changeAvatar", authentication, changeAvatarValidator, validateFields,authController.changeAvatar );


module.exports= router;