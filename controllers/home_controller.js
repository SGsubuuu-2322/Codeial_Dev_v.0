const Post = require("../models/posts");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", "25");
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });

  // Populate the user of each post...
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        if (err) {
          console.log(
            "There's some technical issues in fetching the users from the db..."
          );
          return res.redirect("back");
        } else if (users) {
          return res.render("home", {
            title: "Home",
            posts: posts,
            all_users: users,
          });
        }
      });
    });
};
