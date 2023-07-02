const Comment = require("../models/comments");
const Post = require("../models/posts");

module.exports.createComments = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    let comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      post: req.body.post,
    });

    post.comments.push(comment);
    post.save();
    if (req.xhr) {
      comment = await comment.populate("user", "name");
      return res.status(200).json({
        data: {
          comment: comment,
        },
        message: "Comment submitted successfully...",
      });
    }
    req.flash("success", "Commented Successfully...");
    return res.redirect("back");
  } catch (err) {
    console.log("Error : ", err);
    return res.redirect("back");
  }
};

module.exports.destroyComments = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.Post;
      comment.deleteOne();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment deleted successfully",
        });
      }
      req.flash("success", "Comment deleted Successfully...");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error : ", err);
    return res.redirect("back");
  }
};
