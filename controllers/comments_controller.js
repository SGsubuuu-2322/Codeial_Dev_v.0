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
      comment.remove();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error : ", err);
    return res.redirect("back");
  }
};
