const mysql = require('mysql2');
//connection to the mysql database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '',
  database: 'e.tracker12'
});

module.exports = db;