// @ts-nocheck
// @ts-ignore
/* eslint-disable */
const db = require('../config/db');
const nodemailer = require('nodemailer');

exports.bookConsultation = (req, res) => {
  const { name, email, birthdate } = req.body;

  // Validate input
  if (!name || !email || !birthdate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // SQL query to insert consultation data
  const sql = 'INSERT INTO consultations (name, email, birthdate) VALUES (?, ?, ?)';
  db.query(sql, [name, email, birthdate], (err, result) => {
    if (err) {
      console.error('❌ MySQL Error:', err);
      return res.status(500).json({ error: 'Database error occurred.' });
    }
  
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER || 'advocaterajivmehta@gmail.com',
        pass: process.env.MAIL_PASS
      }
    });

    // Email details
    const mailOptions = {
      from: process.env.MAIL_USER || 'advocaterajivmehta@gmail.com',
      to: process.env.MAIL_USER || 'advocaterajivmehta@gmail.com', 
      subject: ` New Consultation Booking`,
      text:`  New Booking Received:\n\nName: ${name}\nEmail: ${email}\nBirthdate: ${birthdate}`
    };

    // Send email
    transporter.sendMail(mailOptions, (emailErr, info) => {
      if (emailErr) {
        console.error('📧 Email sending failed:', emailErr.message);
        // Not failing request, since DB insert succeeded
      } else {
        console.log('✅ Email sent:', info.response);
      }

      // Respond to client regardless of email outcome
      res.status(200).json({
        message: 'Consultation booked successfully!',
        id: result.insertId
      });
    });
})}
