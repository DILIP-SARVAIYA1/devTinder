const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};
const validateEditProfileData = (req) => {
  const allowedField = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedField.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
