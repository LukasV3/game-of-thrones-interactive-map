const kingdomController = require("../controllers/kingdomController");
const express = require("express");

const router = express.Router();

router.get("/", kingdomController.getKingdomBoundaries);
router.get("/:id/summary", kingdomController.getSummary);

module.exports = router;
