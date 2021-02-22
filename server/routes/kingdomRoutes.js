const kingdomController = require("../controllers/kingdomController");
const express = require("express");

const router = express.Router();

// Hello World Test Endpoint
router.get("/hello", (req, res, next) => {
  res.send("Hello World");
});

router.get("/", kingdomController.getKingdomBoundaries);
router.get("/:id/summary", kingdomController.getSummary);

module.exports = router;
