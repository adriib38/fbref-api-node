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

module.exports = {
  getTeamById
};
