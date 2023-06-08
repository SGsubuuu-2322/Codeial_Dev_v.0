//  Step-1 :- importing and initializing express and express-ejs-layouts and port
const express = require("express");
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./configs/mongoose");

// Step-2 :- Starting or firingup our express server...
const app = express();

// Step-7 :- setting up static files in our app...
app.use(express.static("./assets"));

// Step-6 :- Setting up express-ejs-layouts for rendering layouts...
app.use(expressLayouts);

// Extracts styles and scripts from subpages and putting into the layout page...
app.set("layout extractStyles", true);
app.set("layout extractSripts", true);

// Step-4 :- setting up the express router...
app.use("/", require("./routes"));

// Step-5 :- Setting up the view engine in our app...
app.set("view engine", "ejs");
app.set("views", "./views");

// Step-3 :- Now we'hv to make our server listen to that port...
app.listen(port, (err) => {
  if (err) {
    console.log(`There is some ${err} in listening with that port...`);
  } else {
    console.log(
      `Successfully, your server is listening and it is running live on port : ${port}`
    );
  }
});
