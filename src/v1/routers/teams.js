const express = require("express");
const teamsController = require("../../controllers/teamsController");
const router = express.Router();

router
  .get("/:teamId", teamsController.getTeamById)
  .get("/:teamId/games", teamsController.getGamesByTeam)
  .get("/q/:q", teamsController.getGamesByQuery)
module.exports = router;
