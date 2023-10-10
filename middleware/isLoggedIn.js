const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/User.js");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ data: null, message: `please Login` });
    }
    const { userId } = jwt.verify(token, config.secretKey);
    req.details = await User.findOne({
      _id: userId,
    });
    req.details.password = undefined;
    req.details.__v = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isLoggedIn;
