const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

//get profile data from the database
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;
    res.send(logInUser);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
