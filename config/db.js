const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'your_db_name'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

module.exports = db;