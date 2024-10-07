const adminAuth = (req, res, next) => {
  console.log("Admin data access request hit the API");
  const token = "abc";
  if (token === "abc") {
    // res.send("All the data sent");
    next();
  } else {
    res.status(401).send("You are not Admin");
  }
};

module.exports = {
  adminAuth,
};
