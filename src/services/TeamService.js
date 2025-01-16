const db = require('../database'); // Tu configuración de conexión a la base de datos

class Team {
  static getTeamById(teamName, callback) {
    //Get team league 
    const query1 = `
      SELECT league 
      FROM master_teams
      WHERE squad LIKE ?;
    `;

    db.query(query1, [`%${teamName}%`], (err, results) => {
      if (err) return callback(err);

      if (results.length === 0) {
        return callback(null, [err]); 
      }

      const leagueTable = results[0].league;

      //Get league info
      const query2 = `SELECT * FROM ?? WHERE squad = ?;`;

      db.query(query2, [leagueTable, teamName], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      });
    });
  }
}

module.exports = Team;
