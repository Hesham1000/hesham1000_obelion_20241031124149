const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// configure sequelize for MySQL database connection
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
});

// Define the provider model
const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'providers',
  timestamps: false
});

// Define the appointment model
const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

// Function to handle search providers request
router.get('/providers', async (req, res) => {
  try {
    const { specialty, location, availability } = req.query;
    const providers = await Provider.findAll({
      where: {
        specialty: specialty,
        location: location,
        availability: availability
      }
    });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching providers' });
  }
});

// Function to handle booking appointment
router.post('/appointments', async (req, res) => {
  try {
    const { providerId, date, time } = req.body;
    const newAppointment = await Appointment.create({ providerId, date, time, userId: 1 }); // assuming userId is provided or handled elsewhere
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Error booking appointment' });
  }
});

// Function to handle viewing availability
router.get('/appointments/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    const appointments = await Appointment.findAll({
      where: {
        providerId: providerId
      }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching availability' });
  }
});

module.exports = router;