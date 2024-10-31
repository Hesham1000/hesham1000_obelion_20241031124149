const Sequelize = require('sequelize');

const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db', // Ensure host is 'db'
  port: 3306,
  dialect: 'mysql',
});

// Define the Appointment model
const Appointment = sequelize.define('Appointment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
  },
});

const sendSMS = async (to, message) => {
  try {
    const result = await someSMSService.send({
      to,
      message,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to send SMS');
  }
};

module.exports = { sendSMS, Appointment };