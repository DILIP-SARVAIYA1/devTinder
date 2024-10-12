const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //create new instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User data successfully added 😊");
  } catch (err) {
    res.status(400).send("data not successfully saved!!! 😭");
  }
});

app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const users = await User.find({ emailId: emailId });
  try {
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  // const emailId = req.body.emailId;
  const users = await User.find({});
  try {
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
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
