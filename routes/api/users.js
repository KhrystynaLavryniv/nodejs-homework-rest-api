const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatarsUpdate)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.veryfyEmail));

router.post("/verify", ctrlWrapper(ctrl.resendEmail));

module.exports = router;
