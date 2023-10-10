const bcrypt = require("bcryptjs");
const hasPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);
  return secPass;
};

const getPassword = async (password, userPassword) => {
  const checkedPassword = await bcrypt.compare(password, userPassword);
  return checkedPassword;
};

module.exports = { hasPassword, getPassword };
