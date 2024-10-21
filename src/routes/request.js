const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");

const requestRouter = express.Router();
// send connection request
requestRouter.post("/request/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const validStatus = ["ignored", "interested"];
    if (!validStatus.includes(status)) {
      return res.status(400).send("Invalid status !!!");
    }
    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res.status(400).send("Invalid UserId !!!");
    }
    const userExistInDb = await User.findById(toUserId);
    if (!userExistInDb) {
      return res.status(400).send({
        message: "User does not exist !!!",
      });
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).send({
        message: "Request has been already sent !!!",
      });
    }
    const requestData = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    await requestData.save();
    res.send(`${req.user.firstName}, your connection request has been sent`);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter;
