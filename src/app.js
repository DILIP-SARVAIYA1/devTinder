const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();
app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
  throw new error("abcd");
  // res.send("User api called");
});
app.get("/admin/dashboard", (req, res) => {
  res.send("You are on dashboard");
});
app.get("/admin/portfolio", (req, res) => {
  res.send("You are in PortFolio");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!!!");
  }
});

app.listen(7777, () => {
  console.log("Server running on port number = 7777");
});
