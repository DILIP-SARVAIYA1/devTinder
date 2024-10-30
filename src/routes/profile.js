const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

//get profile data from the database
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;
    res.send(logInUser);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;
    if (!validateEditProfileData(req)) {
      send.status(400).send("Update req is not valid!!!");
    }
    Object.keys(req.body).forEach((key) => (logInUser[key] = req.body[key]));
    await logInUser.save();
    res.send(logInUser);
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

module.exports = profileRouter;
