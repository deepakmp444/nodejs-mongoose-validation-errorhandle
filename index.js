const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const errorHandler = require("./middleware/errorHandler");
const userRoute = require("./routes/userRoute");
const jokeRoute = require("./routes/jokeRoute");

const app = express();

mongoose
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in DB: " + err.message));

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(cookieParser());

// route
app.use("/api/users/", userRoute);
app.use("/api/", jokeRoute);

// Error handling middleware
app.use(errorHandler);

// Stop crashing
process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
