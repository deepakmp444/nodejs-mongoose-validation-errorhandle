const config = require("../utils/config");
const jwt = require("jsonwebtoken");

const getToken = (userId, email) => {
  return jwt.sign({ userId: userId, email }, config.secretKey, {
    expiresIn: "1day",
  });
};

module.exports = getToken;
