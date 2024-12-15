const express = require("express");
const competitionsController = require("../../controllers/competitionsController");
const router = express.Router();

router
  .get("/", competitionsController.getCompetitions)
  .get("/:competitionId", competitionsController.getCompetitionsEndpoints)
  .get("/:competitionId/:endpoint", competitionsController.handlerEndpoint)

module.exports = router;
