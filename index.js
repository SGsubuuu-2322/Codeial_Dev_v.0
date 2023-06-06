//  Step-1 :- importing and initializing express and port
const express = require("express");
const port = 8000;

// Step-2 :- Starting or firingup our express server...
const app = express();

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
