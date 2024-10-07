const express = require("express");

const app = express();

app.post("/user", (req, res) => {
  console.log(req.params);
  res.send("data saved to the database");
});
app.get("/user/:userId/:secondId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "dilip", lastName: "Sarvaiya" });
});
app.delete("/user", (req, res) => {
  res.send("data deleted successfully");
});
// app.use("/", (req, res) => {
//   res.send("Hello from dashboard");
// });

app.listen(7777, () => {
  console.log("server running on port 7777");
});
