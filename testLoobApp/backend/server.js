const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use('/api', authRoutes);
app.use('/api', providerRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', paymentRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
