const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

//signup APIs
app.post("/signup", async (req, res) => {
  //create new instance of user model
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User data successfully added 😊");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
//Log in APIs
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Please enter valid Email");
    }
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("User Login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req?.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdatesAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (data?.skills.length > 5) {
      throw new Error("Skills can't allowed more then 5");
    }
    if (!isUpdatesAllowed) {
      throw new Error("Update Not Allowed");
    }
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
