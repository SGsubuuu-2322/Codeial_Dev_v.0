module.exports.profile = (req, res) => {
  res.render("user_file", {
    title: "user_profile_page",
  });
};
module.exports.setting = (req, res) => {
  res.render("user_file", {
    title: "users_setting_page",
  });
};
