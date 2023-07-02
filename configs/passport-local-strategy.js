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
      passReqToCallback: "true",
    },
    function (req, email, password, done) {
      // Finding the user and establish the identity...
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }

        if (!user || password != user.password) {
          req.flash("error", "Invalid Username | Password");
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
passport.deserializeUser(async function (id, done) {

  try{
    let user = await User.findById(id);
    return done(null, user);
  }catch(err){
    return done(err);
  }
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
