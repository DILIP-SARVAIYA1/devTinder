const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dilipsarvaiya:LoBRDTMx5rPTlvCs@namastenodejs.qxjng.mongodb.net/devTinder"
  );
  console.log("Database connection successfully established");
};
module.exports = connectDB;
