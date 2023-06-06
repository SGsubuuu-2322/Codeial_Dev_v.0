const express = require("express");
const router = express.Router();

const appController = require("../controllers/app_controller");

router.get("/settings", appController.setting);

module.exports = router;