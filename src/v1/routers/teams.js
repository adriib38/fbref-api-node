const express = require("express");
const teamsController = require("../../controllers/teamsController");
const router = express.Router();

router
  .get("/:teamId", teamsController.getTeamById)
//   .get("/:teamId", competitionsController.handlerEndpoint)

module.exports = router;
