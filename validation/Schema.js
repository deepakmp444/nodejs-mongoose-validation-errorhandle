const { body } = require("express-validator");

const SignupSchema = [
  body("name").isString().isLength({ max: 20 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 6 }),
];

const LoginSchema = [
  body("email").notEmpty().isEmail().normalizeEmail(),
  body("password").notEmpty().isLength({ min: 6 }),
];

module.exports = { SignupSchema, LoginSchema };
