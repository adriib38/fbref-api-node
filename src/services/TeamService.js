const db = require("../database"); // Tu configuración de conexión a la base de datos

class Team {
  static getTeamById(teamName, callback) {
    //1. Get teams league name
    const query1 = `
      SELECT league 
      FROM master_teams
      WHERE squad LIKE ?;
    `;

    db.query(query1, [`%${teamName}%`], (err, results) => {
      if (err) return callback(err);
      if (!results || results.length === 0) {
        return callback(null, []); // Devuelve un arreglo vacío si no hay resultados.
      }

      const leagueTable = results[0].league;

      //2. Get league team row
      const query2 = `SELECT *, ? as league FROM ?? WHERE squad like ?;`;
      db.query(
        query2,
        [leagueTable, leagueTable, `%${teamName}%`],
        (err, results) => {
          if (err) return callback(err);

          callback(null, results[0]);
        }
      );
    });
  }

  static getGamesByTeam(teamName, callback) {
    //1. Get teams league name
    const query1 = `
      SELECT league 
      FROM master_teams
      WHERE squad LIKE ?;
    `;

    db.query(query1, [teamName], (err, results) => {
      if (err) return callback(err);
      if (!results || results.length === 0) {
        return callback(null, []);
      }

      const leagueTable = results[0].league;

      //2. Get league team row
      const query2 = `SELECT * FROM ?? WHERE Home = ? OR Away = ?`;
      db.query(
        query2,
        [`games_${leagueTable}`, teamName, teamName],
        (err, results) => {
          if (err) return callback(err);

          callback(null, results);
        }
      );
    });
  }

  static getGamesByQuery(q, callback) {
    const query = `
      SELECT Squad FROM ( SELECT Squad FROM seriea UNION ALL SELECT Squad FROM laliga UNION ALL SELECT Squad FROM hypermotion UNION ALL SELECT Squad FROM ligue1 UNION ALL SELECT Squad FROM premierleague UNION ALL SELECT Squad FROM bundesliga ) t WHERE Squad LIKE ?;
    `;

    db.query(query, [`${q}%`], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
}

module.exports = Team;
