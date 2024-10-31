const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
    type: DataTypes.DATE
  }
}, {
  tableName: 'providers',
  timestamps: false
});

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  providerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Provider,
      key: 'id'
    },
    allowNull: false
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

const searchProviders = async (req, res) => {
  const { specialty, location, availability } = req.query;

  try {
    const providers = await Provider.findAll({
      where: {
        specialty: specialty || null,
        location: location || null,
        availability: availability || null
      }
    });

    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for providers.' });
  }
};

const bookAppointment = async (req, res) => {
  const { providerId } = req.body;

  try {
    const appointment = await Appointment.create({
      providerId,
      userId: req.user.id,
      date: req.body.date,
      time: req.body.time
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while booking the appointment.' });
  }
};

module.exports = {
  searchProviders,
  bookAppointment
};