const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    updatedAt: true,
    createdAt: true,
  }
);

// `sequelize.define` also returns the model
console.log(Profile === sequelize.models.Profile); // true
module.exports = Profile;
