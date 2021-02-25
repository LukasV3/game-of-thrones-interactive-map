const mongoose = require("mongoose");

const kingdomSchema = new mongoose.Schema({
  gid: Number,
  name: {
    type: String,
  },
  claimedBy: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["MultiPolygon", "Point"],
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of arrays of numbers
    },
  },
  summary: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("Kingdom", kingdomSchema);
