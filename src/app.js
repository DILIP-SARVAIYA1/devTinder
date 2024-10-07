const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
  console.log("Admin data access request hit the API");
  const token = "abc";
  if (token === "abc") {
    // res.send("All the data sent");
    next();
  } else {
    res.status(404).send("You are not Admin");
  }
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
