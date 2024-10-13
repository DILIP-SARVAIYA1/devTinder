const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

//push data to database
app.post("/signup", async (req, res) => {
  //create new instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User data successfully added 😊");
  } catch (err) {
    res.status(400).send("data not successfully saved!!! 😭 " + err);
  }
});
//get data from the database
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
//find data from the database
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
//delete data from the database
app.delete("/user", async (req, res) => {
  const id = req.body.id;
  const data = await User.findByIdAndDelete(id);
  console.log(data);

  try {
    res.send("User delete successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update the data from the database
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
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
