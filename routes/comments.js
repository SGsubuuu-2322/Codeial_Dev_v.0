const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controller");

router.post(
  "/create",
  passport.checkAuthentication,
  commentsController.createComments
);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  commentsController.destroyComments
);
module.exports = router;
