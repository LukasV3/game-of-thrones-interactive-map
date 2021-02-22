const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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

// Handling unhandled routes (accessing an undefined route...)
app.all("*", (req, res, next) => {
  console.log(`Request Error ${req.originalUrl}`);
  next();
});

module.exports = app;
