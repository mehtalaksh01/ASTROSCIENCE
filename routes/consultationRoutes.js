const express = require('express');
const router = express.Router();

// Dummy POST route for booking consultation
router.post('/book', (req, res) => {
  const { name, email, birthdate } = req.body;
  if (!name || !email || !birthdate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  res.status(200).json({ message: 'Consultation booked successfully!', data: req.body });
});

module.exports = router;