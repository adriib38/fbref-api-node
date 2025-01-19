const db = require("../database");

class Competition {
  static getClassification(c, callback) {
    let q = `SELECT * FROM ${c}`;
    db.query(q, [c], (err, results) => {
      callback(err, results);
    });
  }

  static getStats(c, callback) {
    let q = `SELECT * FROM statsteam_${c}`;
    db.query(q, [c], (err, results) => {
      callback(err, results);
    });
  }

  static getGames(c, callback) {
    let q = `SELECT * FROM games_${c}`;
    db.query(q, [c], (err, results) => {
      callback(err, results);
    });
  }
}

module.exports = Competition;
