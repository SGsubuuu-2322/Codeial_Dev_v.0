const express = require("express");
const router = express.Router();

console.log("Router has been loaded successfully...");

const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/users", require("./users"));

// For any further routes, access from here...
// router.use("/routeName", require("./routeFile"));

module.exports = router;
