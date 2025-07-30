// app.js

require('dotenv').config();             // Load environment variables
const express = require('express');     // Express framework
const cors = require('cors');           // To handle frontend-backend requests
const mysql = require('mysql2');        // MySQL client
const nodemailer = require('nodemailer'); // For sending email

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'astrology'
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB Connection Error:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

// API route to book a consultation
app.post('/api/book-consultation', (req, res) => {
  const { name, email, birthdate } = req.body;

  if (!name || !email || !birthdate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = 'INSERT INTO consultations (name, email, birthdate) VALUES (?, ?, ?)';
  db.query(sql, [name, email, birthdate], (err, result) => {
    if (err) {
      console.error('❌ MySQL Error:', err);
      return res.status(500).json({ error: 'Database error occurred.' });
    }

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER, // or change to your own recipient
      subject: '📝 New Consultation Booking',
      text:`  New Booking:\n\nName: ${name}\nEmail: ${email}\nBirthdate: ${birthdate}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('📧 Email failed:', error.message);
        // Don't fail the request because of email
      } else {
        console.log('✅ Email sent:', info.response);
      }

      res.status(200).json({
        message: 'Consultation booked successfully!',
        id: result.insertId
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log( `Server running on port ${PORT}` );
});