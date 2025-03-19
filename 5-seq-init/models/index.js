const sequelize = require("../config/database");
const User = require("./user.models");

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await User.sync({ alter: true });
    console.log("The table for the User model was just (re)created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = syncDatabase;
