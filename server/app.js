const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const kingdomRouter = require("./routes/kingdomRoutes");

// Setup express app
const app = express();

// Apply CORS config
app.use(cors());

if (process.env === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/kingdoms", kingdomRouter);

// Serves all static files from the build directory.
app.use(express.static(path.join(__dirname, "build")));

// Serves  index.html file on any unknown routes.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Handling unhandled routes (accessing an undefined route...)
app.all("*", (req, res, next) => {
  console.log(`Request Error ${req.originalUrl}`);
  next();
});

module.exports = app;
