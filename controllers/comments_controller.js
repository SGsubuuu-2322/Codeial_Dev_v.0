const Comment = require("../models/comments");
const Post = require("../models/posts");

module.exports.createComments = (req, res) => {
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("There is no such post on which you're commenting...");
    }

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          user: req.user._id,
          post: req.body.post,
        },
        function (err, comment) {
          if (err) {
            console.log(
              "There's some technical issues in creating this comment..."
            );
          }

          if (comment) {
            post.comments.push(comment);
            post.save();
            return res.redirect("back");
          }
        }
      );
    }
  });
};
