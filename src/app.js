const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server running on port number = 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection not successful!!!");
  });
