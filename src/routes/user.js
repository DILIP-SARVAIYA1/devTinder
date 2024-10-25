const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoUrl",
  "skills",
  "about",
];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "Your received requests",
      data: receivedRequest,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionData = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionData.map((row) => {
      if (row.toUserId._id.equals(loggedInUser._id)) {
        return row.fromUserId;
      } else {
        return row.toUserId;
      }
    });

    res.send(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 10 : limit;
    const skip = (page - 1) * limit;
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((key) => {
      hideUserFromFeed.add(key.fromUserId.toString());
      hideUserFromFeed.add(key.toUserId.toString());
    });
    const users = await User.find({
      // $and: [
      //   {
      //     _id: { $nin: Array.from(hideUserFromFeed) },
      //   },
      //   {
      //     _id: { $ne: loggedInUser._id },
      //   },
      // ],
      _id: { $nin: [...hideUserFromFeed], $ne: loggedInUser._id },
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
