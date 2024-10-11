const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  //create new instance of user model
  const user = new User({
    firstName: "Dilip",
    lastName: "Sarvaiya",
    emailId: "dilipsarvaiya992@gmail.com",
    password: "Dilip@123",
  });
  try {
    await user.save();
    res.send("User data successfully added 😊");
  } catch (err) {
    res.status(400).send("data not successfully saved!!! 😭");
  }
});

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
