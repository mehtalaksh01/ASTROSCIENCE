require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const consultationRoutes = require('./routes/consultationRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/consultation', consultationRoutes);

app.get('/', (req, res) => {
  res.send('🔮 Astrology API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
});