const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    ca: process.env.SSL_CA_CERTIFICATE.replace(/\\n/g, '\n'),
  },
  waitForConnections: true,
  connectionLimit: 10,
  timeout: 10000,
  queueLimit: 0,
});


module.exports = pool;