const db = require("../database");

class Game {
  static getNextGames(d, callback) {
    let q = `SELECT * FROM ( SELECT *, 'laliga' AS league FROM games_laliga UNION ALL SELECT *, 'hypermotion' AS league FROM games_hypermotion UNION ALL SELECT *, 'ligue1' AS league FROM games_ligue1 UNION ALL SELECT *, 'seriea' AS league FROM games_seriea UNION ALL SELECT *, 'premierleague' AS league FROM games_premierleague UNION ALL SELECT *, 'bundesliga' AS league FROM games_bundesliga ) AS combined_games WHERE Score IS NULL AND Date >= ? -- Filtra los partidos posteriores a la fecha ORDER BY Date ASC LIMIT 10; `;

    db.query(q, [d], (err, results) => {
      callback(err, results);
    });
  }
}

module.exports = Game;
