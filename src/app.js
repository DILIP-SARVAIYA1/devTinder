const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("Database connection successfully established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port number = 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection not successful!!!");
  });
