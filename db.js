const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',     // or 127.0.0.1
  user: 'root', 
  password: 'nwarah1233', 
  database: 'natures_guardians', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
