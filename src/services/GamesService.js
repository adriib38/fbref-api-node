const db = require("../database");

class Game {
  static getNextGames(d, callback) {
    let q = `SELECT * FROM ( SELECT Home, Away, Date, Score, Time, Venue, 'laliga' AS league FROM games_laliga UNION ALL SELECT Home, Away, Date, Score, Time, Venue, 'hypermotion' AS league FROM games_hypermotion UNION ALL SELECT Home, Away, Date, Score, Time, Venue, 'ligue1' AS league FROM games_ligue1 UNION ALL SELECT Home, Away, Date, Score, Time, Venue, 'seriea' AS league FROM games_seriea UNION ALL SELECT Home, Away, Date, Score, Time, Venue, 'premierleague' AS league FROM games_premierleague UNION ALL SELECT Home, Away, Date, Score, Time, Venue, 'bundesliga' AS league FROM games_bundesliga ) AS combined_games WHERE Score IS NULL AND DATE >= ? ORDER BY DATE LIMIT 30;`;

    db.query(q, [d], (err, results) => {
      callback(err, results);
    });
  }
}

module.exports = Game;
