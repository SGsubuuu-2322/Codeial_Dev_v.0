const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports.createPosts = (req, res) => {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (!post || err) {
        console.log("There is some issue in creating post...");
      }

      console.log("Great!!! you'hv successfully created a post...");
      return res.redirect("back");
    }
  );
};

module.exports.destroyPosts = (req, res) => {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("There's some technical issues in finding that posts...");
    } else if (post.user == req.user.id) {
      // .id is used to convert the object id to string
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        console.log(
          "The comments related to that post are also deleted from DB..."
        );
        return res.redirect("back");
      });
    } else {
      console.log("You're not authorized to do this action...");
      return res.redirect("back");
    }
  });
};
