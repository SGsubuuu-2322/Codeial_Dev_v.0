// importing model for accessing the database...
const User = require("../models/user");

module.exports.profile = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(
        "There's some technical issues in fetching the user from db..."
      );
      return res.redirect("back");
    } else if (user) {
      return res.render("user_file", {
        title: "user_profile_page",
        profile_user: user,
      });
    }
  });
};

module.exports.update = (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      if (err) {
        console.log(
          "There's some technical issues in updating the user details in db..."
        );
        return res.redirect("back");
      } else if (user) {
        console.log("Great!!! your details has been successfully updated...");
        return res.redirect("back");
      }
    });
  } else {
    return res.status(401).send("You're unauthorized to do this action...");
  }
};

module.exports.setting = (req, res) => {
  return res.render("user_file", {
    title: "users_setting_page",
  });
};

// Render the signin page...
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signIn", {
    title: "users_signIn_page",
  });
};

// Render the signup page...
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signUp", {
    title: "users_signUp_page",
  });
};

// Get the sign-up data...
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in signing_up the user...");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user while signing_up...");
          return;
        }
        console.log("The user has been successfully signed_up in app...");
        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("This emailID is already exists try with new one...");
      return res.redirect("back");
    }
  });
};

// Get the sign-in ...
module.exports.createSession = (req, res) => {
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
      return res.redirect("/");
    }
  });
};
