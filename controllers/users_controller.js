// importing model for accessing the database...
const User = require("../models/user");

module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    return res.render("user_file", {
      title: "user_profile_page",
      profile_user: user,
    });
  } catch (err) {
    console.log("Error : ", err);
  }
};

module.exports.update = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findByIdAndUpdate(req.params.id, req.body);

      req.flash("success", "Your profile has been Successfully...");
      return res.redirect("back");
    } else {
      return res.status(401).send("You're unauthorized to do this action...");
    }
  } catch (err) {
    console.log("Error", err);
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
module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Both the passwords aren't matching...");
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);

      req.flash("success", "User created Successfully...");
      return res.redirect("/users/sign-in");
    } else {
      req.flash(
        "error",
        "Sorry this email already exists|Try with other one..."
      );
      return res.redirect("back");
    }
  } catch (err) {
    Console.log("Error : ", err);
  }
};

// Get the sign-in ...
module.exports.createSession = (req, res) => {
  req.flash("success", "Signed_In Successfully...");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Signed_Out Successfully...");
      return res.redirect("/");
    }
  });
};
