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
          deletePost($(" .delete-post-btn", newPost));
        },
        error: function (error) {
          console.log(error);
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
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  };

  createPost();
}
