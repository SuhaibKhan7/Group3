const express = require("express");
const syncDatabase = require("./models/index");
const router = require("./routes/user.routes");
require("dotenv").config();
require("./models/assiocation");

const app = express();
app.use(express.json());
app.use("/api/users", router);

const PORT = process.env.PORT || 4000;

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port 3000");
  });
});
