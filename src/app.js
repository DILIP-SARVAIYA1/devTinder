const express = require("express");

const app = express();

app.use("/myname", (req, res) => {
  res.send("my name is Dilip sarvaiya");
});

app.use("/", (req, res) => {
  res.send("Hello from dashboard");
});

app.listen(7777, () => {
  console.log("server running on port 7777");
});
