const Profile = require("../models/profile.models");
const User = require("../models/user.models");

const createUser = async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  const user = await User.create({
    firstName,
    lastName,
  });
  const profile = await Profile.create({
    bio,
    userId: user.id,
  });

  res.send(user);
};
const getUser = async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Profile,
    },
  });
};
module.exports = { createUser, getUser };
