const {DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    updatedAt:true,
    createdAt:true
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
module.exports=User