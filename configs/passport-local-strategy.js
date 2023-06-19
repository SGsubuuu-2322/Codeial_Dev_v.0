// importing passport and passport-local strategy...
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// importing user model for accessing the database...
const User = require("../models/user");

// Making authentication function using passport...
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // Finding the user and establish the identity...
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log(
            "There's some technical issues in signing-in the user..."
          );
          return done(err);
        }

        if (!user || password != user.password) {
          console.log("Your username or password is invalid...");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// Serializing the user to decide which key is needed to be placed in cookies...
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// De-serializing the user to authenticate that particular user in your database from the key in your cookies...
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log(
        "There is some issues in session management in authentication"
      );
      return done(err);
    }

    return done(null, user);
  });
});

// Check if the user is authenticated or not...
passport.checkAuthentication = function (req, res, next) {
  // Check if the user is signed-in then pass on the req to the next function(controller's action)...
  if (req.isAuthenticated()) {
    return next();
  } else {
    // If he/she isn't signned-in redirect him back with an error message...
    return res.redirect("/users/sign-in");
  }
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains current signed-in user details from session cookie and we're just sending this to the res locals for the views...
    res.locals.user = req.user;
  }
  next();
};

// Exporting passport for further using in other files...
module.exports = passport;
