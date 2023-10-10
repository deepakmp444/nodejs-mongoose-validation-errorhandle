const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  userProfile,
  userLogout,
} = require("../controllers/usersController");
const { SignupSchema, LoginSchema } = require("../validation/Schema");
const SchemaErrors = require("../validation/SchemaErrors");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/signup", SignupSchema, SchemaErrors, userSignup);
router.post("/login", LoginSchema, SchemaErrors, userLogin);
router.get("/me", isLoggedIn, userProfile);
router.post("/logout", isLoggedIn, userLogout);

module.exports = router;
