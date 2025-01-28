require('dotenv').config();
const fs = require('fs'); 
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./src/config/database/ca.pem").toString(),
  },
});

pool.on('connection', (connection) => {
  console.log('Conexión con la base de datos');
});

module.exports = pool;
