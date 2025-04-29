const Profile = require("./profile.models");
const User = require("./user.models");

User.hasOne(Profile, {
  foreignKey: "userId",
});
