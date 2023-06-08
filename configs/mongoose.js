const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to the db..."));
db.once("open", function () {
  console.log("You'hv successfully connected to the db...");
});

module.exports = db;
