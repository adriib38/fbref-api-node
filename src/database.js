const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  timeout: 20000,
  ssl: {
    ca: process.env.DB_SSL_CA,
  },
  connectTimeout: 20000,
  queueLimit: 0,
});

module.exports = pool;