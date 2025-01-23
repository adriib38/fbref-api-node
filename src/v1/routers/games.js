const express = require("express");
const gamesController = require("../../controllers/gamesController");
const router = express.Router();

router
  .get("/nextGames", gamesController.getNextGames)

module.exports = router;
