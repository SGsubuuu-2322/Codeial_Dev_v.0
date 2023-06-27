const Post = require("../models/posts");

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

      console.log("Great!!! you'hv created a post successfully...");
      return res.redirect("back");
    }
  );
};
