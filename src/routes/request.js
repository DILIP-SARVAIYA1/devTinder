const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();
// send connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sending the connection request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter;
