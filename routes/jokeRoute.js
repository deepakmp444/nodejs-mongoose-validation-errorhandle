const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const getJokes = require("../controllers/jokesController");

router.get("/random-joke", isLoggedIn,getJokes);

module.exports = router;
