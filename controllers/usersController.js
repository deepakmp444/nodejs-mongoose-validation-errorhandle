const User = require("../models/User");
const cookiesToken = require("../utils/CookieToken");
const { hasPassword, getPassword } = require("../utils/hashingPassword");
const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const uPassword = await hasPassword(password);
    await User.create({
      name,
      email,
      password: uPassword,
    });

    return res.status(200).json({ message: "Signup successfully", data: null });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ data: null, message: "Email not found" });

    const isPasswordCorrect = await getPassword(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ data: null, message: "Your credentials wrong!" });
    } else {
      cookiesToken(user, res);
    }
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

const userProfile = async (req, res) => {
  try {
    const details = req.details;
    return res.status(200).json({ data: details, message: null });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { sameSite: "none", secure: true })
      .json({
        data: null,
        message: "logout successfully",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { userSignup, userLogin, userProfile , userLogout};
