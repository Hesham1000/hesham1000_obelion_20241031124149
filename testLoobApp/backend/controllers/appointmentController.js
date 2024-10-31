const { Provider, Appointment } = require('../models');
const { Op } = require('sequelize');

exports.searchProviders = async (req, res) => {
  try {
    const { specialty, location, availability } = req.query;
    const providers = await Provider.findAll({
      where: {
        specialty: { [Op.like]: `%${specialty}%` },
        location: { [Op.like]: `%${location}%` },
        availability: { [Op.like]: `%${availability}%` }
      }
    });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for providers.' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { userId, date, time } = req.body;

    const appointment = await Appointment.create({
      providerId,
      userId,
      date,
      time,
      status: 'pending'
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while booking the appointment.' });
  }
};
In the models definition:

// models/Provider.js
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    specialty: DataTypes.STRING,
    location: DataTypes.STRING,
    availability: DataTypes.DATE
  }, {
    tableName: 'providers'
  });

  Provider.associate = function(models) {
    // associations can be defined here
  };

  return Provider;
};

// models/Appointment.js
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    providerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  }, {
    tableName: 'appointments'
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.Provider, {
      foreignKey: 'providerId',
      targetKey: 'id'
    });
  };

  return Appointment;
};

In your `config.js` or wherever the database host is specified, replace 'localhost' with 'db':

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'database_development',
    host: 'db',
    dialect: 'mysql'
  },
  // other environments...
};