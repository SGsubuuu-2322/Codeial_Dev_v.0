const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports.createPosts = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      post = await post.populate("user", "name");
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created successfully...",
      });
    }
    req.flash("success", "Post created Successfully...");
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
      post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted successfully...",
        });
      }
      req.flash("success", "Post deleted Successfully...");
      return res.redirect("back");
    } else {
      console.log("You're not authorized to do this action...");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error : ", err);
  }
};
