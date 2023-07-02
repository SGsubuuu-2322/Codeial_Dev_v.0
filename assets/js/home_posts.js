{
  // Method to submit the form data for new post through AJAX...
  let createPost = function () {
    let postForm = $("#new-post-form");
    postForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: postForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          showNotificaton("Post created successfully");
          deletePost($(" .delete-post-btn", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // Method to create that submitted post(New Post) onto DOM...
  let newPostDom = function (post) {
    return $(`
    <li id="post-${post._id}">
  <p>
    <small>
      <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
    </small>
    ${post.content}
    <br />
    <small>-${post.user.name}</small>
  </p>

  <div id="posts-comments">
    <form action="/comments/create" method="post">
      <input
        type="text"
        name="content"
        placeholder="Type here to add a comment..."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>

    <div class="posts-comments-list">
      <ul id="posts-comments-${post._id}">
       
      </ul>
    </div>
  </div>
</li>

    `);
  };

  // Method to delete the post from the Dom...
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          showNotificaton("Post deleted successfully");
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();

  // Method to submit the form data for new Comment through AJAX and create that comment on DOM...
  let createComment = function () {
    let commentForm = $("#new-comment-form");
    commentForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: commentForm.serialize(),
        success: function (data) {
          console.log(data);
          let newComment = displayNewComment(data.data.comment);
          $("#posts-comments-list>ul").prepend(newComment);
          showNotificaton("Comment created successfully");
          deleteComment($(" .delete-comment-btn", newComment));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  // Method to convert that submitted comment into HTML_TEXT...
  let displayNewComment = function (comment) {
    return $(`
    <li id="comment-${comment._id}">
  <p>
    <small>
     
      <a class="delete-comment-btn" href="/comments/destroy/${comment._id}"
        >X</a
      >
    </small>
    ${comment.content}
    <br />
    <small>@${comment.user.name}</small>
  </p>
</li>

    `);
  };

  // Method to delete the submitted comment on DOM...
  let deleteComment = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          showNotificaton("Comment deleted successfully");
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  createComment();

  let showNotificaton = function (msg) {
    new Noty({
      theme: "relax",
      text: msg,
      type: "success",
      layout: "topRight",
      timeout: 1500,
    }).show();
  };
}
