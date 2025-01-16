const Team = require("../services/TeamService.js");

const getTeamById = (req, res) => {
  Team.getTeamById(req.params.teamId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting team", err });
    }
    return res.status(200).json(results);
  });
};

module.exports = {
  getTeamById
};
