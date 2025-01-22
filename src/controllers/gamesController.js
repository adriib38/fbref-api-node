const Game = require("../services/GamesService.js");

const getNextGames = (req, res) => {
  const date = (new Date).toISOString().split('T')[0];
  console.log(date)
  Game.getNextGames(date, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting games", err });
    }
    return res.status(200).json(results);
  });
};

module.exports = {
  getNextGames
};
