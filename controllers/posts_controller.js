const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports.createPosts = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error : ", err);
    return res.redirect("back");
  }
};

module.exports.destroyPosts = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      // .id is used to convert the object id to string
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect("back");
    } else {
      console.log("You're not authorized to do this action...");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error : ", err);
  }
};
