const mysql = require('mysql2');
const fs = require('fs');

//const ca = process.env.SSL_CA_CERTIFICATE;


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync("ca-certificate.crt"),
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  debug: ['ComQueryPacket', 'RowDataPacket', 'OkPacket', 'ErrorPacket']
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("¡Conexión exitosa!");
    connection.release();
  }
});

module.exports = pool;
