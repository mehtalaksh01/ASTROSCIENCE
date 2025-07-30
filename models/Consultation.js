const db = require('../config/db');

const createConsultation = (data, callback) => {
  const { name, email, date, message } = data;
  const query = 'INSERT INTO consultations (name, email, date, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, date, message], callback);
};

module.exports = { createConsultation }