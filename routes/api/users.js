const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const {
  joiSignupSchema,
  joiLoginSchema,
  joisubscriptionUpdateSchema,
} = require("../../models");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joisubscriptionUpdateSchema),
  ctrlWrapper(ctrl.subscriptionUpdate)
);

module.exports = router;
