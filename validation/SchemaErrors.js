const { validationResult } = require("express-validator");

const SchemaErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.errors[0].path + " " + errors.errors[0].msg,
    });
  }
  next();
};

module.exports = SchemaErrors;
