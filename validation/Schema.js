const { body } = require("express-validator");

const SignupSchema = [
  body("name").isString().isLength({ max: 20 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 6 }),
];

module.exports = { SignupSchema };
