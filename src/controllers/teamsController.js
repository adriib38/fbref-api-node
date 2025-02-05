const Team = require("../services/TeamService.js");

const getTeamById = (req, res) => {
  Team.getTeamById(req.params.teamId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error getting team", error: err });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(200).json(results);
  });
}

const getGamesByTeam = (req, res) => {
  Team.getGamesByTeam(req.params.teamId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error getting games by team", error: err });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(200).json(results);
  });
}

const getGamesByQuery = (req, res) => {
  console.log("getGamesByQuery")
  Team.getGamesByQuery(req.params.q, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error getting games by team", error: err });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(200).json(results);
  });
}


module.exports = {
  getTeamById,
  getGamesByTeam,
  getGamesByQuery
};
