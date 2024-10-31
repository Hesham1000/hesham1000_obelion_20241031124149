const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db', // Updated from 'localhost' to 'db'
  port: 3306,
  dialect: 'mysql',
});

// Define Provider model
const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'providers',
  timestamps: false,
});

// Define Appointment model
const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'appointments',
  timestamps: false,
});

// Middleware to handle database connection errors
router.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Search providers
router.get('/providers/search', async (req, res) => {
  const { specialty, location, availability } = req.query;

  if (!specialty || !location || !availability) {
    return res.status(400).json({ error: 'Missing search criteria' });
  }

  try {
    const providers = await Provider.findAll({
      where: { specialty, location, availability },
    });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search providers' });
  }
});

// Book appointment
router.post('/appointments/book', async (req, res) => {
  const { providerId, date, time, userId } = req.body;

  if (!providerId || !date || !time || !userId) {
    return res.status(400).json({ error: 'Provider ID, date, time, and user ID are required' });
  }

  try {
    const appointment = await Appointment.create({ providerId, date, time, userId });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

module.exports = router;