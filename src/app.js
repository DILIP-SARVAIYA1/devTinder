const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();
app.use("/admin", adminAuth);

app.post("/user", (req, res) => {
  res.send("User api called");
});
app.get("/admin/dashboard", (req, res) => {
  res.send("You are on dashboard");
});
app.get("/admin/portfolio", (req, res) => {
  res.send("You are in PortFolio");
});

app.listen(7777, () => {
  console.log("Server running on port number = 7777");
});
