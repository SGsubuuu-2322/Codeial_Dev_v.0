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

module.exports.destroyComments = (req, res) => {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      console.log("There's some technical issues in finding the comment...");
      return res.redirect("back");
    } else if (comment.user == req.user.id) {
      let postId = comment.Post;
      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err) {
          if (err) {
            console.log(
              "There's some technical issue in deleting the comment-id in comments in post..."
            );
            return res.redirect("back");
          }
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
